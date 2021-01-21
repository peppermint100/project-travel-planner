package Project.TMI.controller;

import Project.TMI.advice.exception.CEmptyValueException;
import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.domain.User;
import Project.TMI.domain.dto.PlanSaveDto;
import Project.TMI.model.CreatePlanSuccess;
import Project.TMI.model.Success;
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
    @PostMapping("/createPlan")
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
}
