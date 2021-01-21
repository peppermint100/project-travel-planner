package Project.TMI.controller;

import Project.TMI.advice.exception.CEmptyValueException;
import Project.TMI.advice.exception.CPlanNotFoundException;
import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.domain.Plan;
import Project.TMI.domain.User;
import Project.TMI.domain.dto.PlanSaveDto;
import Project.TMI.model.CreatePlanSuccess;
import Project.TMI.model.Success;
import Project.TMI.repository.PlanRepository;
import Project.TMI.service.PlanService;
import Project.TMI.service.S3Service;
import Project.TMI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RequestMapping("/plan")
@RequiredArgsConstructor
@RestController
public class PlanController {

    private final PlanService planService;
    private final UserService userService;
    private final S3Service s3Service;

    //1.플랜 생성
    @PostMapping(value = "/createPlan")
    public ResponseEntity<CreatePlanSuccess> createPlan(@RequestParam String planName,
                                                        @RequestParam(defaultValue = "0") Long userId,
                                                        MultipartFile placeImage) throws IOException {

        //빈값을 확인합니다.
        if (planName.isEmpty() || placeImage.isEmpty() || userId == 0) {
            throw new CEmptyValueException();
        }

        //시간을 담아줍니다.
        LocalDateTime realTime = LocalDateTime.now();

        //S3에 이미지 업로드 후 링크 가져옴.
        String imgPath = s3Service.upload(placeImage);
        User user = userService.findById(userId).orElseThrow(CUserNotFoundException::new);

        //Dto 생성
        PlanSaveDto planDto = PlanSaveDto.builder()
                .user(user)
                .planName(planName)
                .placeImage(imgPath)
                .createdAt(realTime)
                .build();

        //플랜 생성 후 planId 가져옴.
        Long planId = planService.planSave(planDto);

        return new ResponseEntity(new CreatePlanSuccess(true, "플랜생성 성공", imgPath, planId), HttpStatus.OK);
    }

    //2. 플랜 삭제
    @PostMapping(value = "/deletePlan")
    public ResponseEntity<Success> deletePlan(@RequestParam(defaultValue = "0") Long planId){

        //planId가 비어있다면,
        if(planId == 0){
            throw new CEmptyValueException();
        }

        //planId의 plan이 존재하지 않는다면.
        if(planService.findById(planId) == null){
            throw new CPlanNotFoundException();
        }

        planService.planDelete(planId);

        return new ResponseEntity<>(new Success(true, "플랜삭제 성공"), HttpStatus.OK);
    }
}
