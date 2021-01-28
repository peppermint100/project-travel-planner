package Project.TMI.controller;

import Project.TMI.advice.exception.CEmptyValueException;
import Project.TMI.advice.exception.CPlanNotFoundException;
import Project.TMI.advice.exception.CPlanNotSharedMeException;
import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import Project.TMI.domain.User;
import Project.TMI.domain.dto.PlanSaveDto;
import Project.TMI.domain.dto.SharePlanDto;
import Project.TMI.model.*;
import Project.TMI.service.PlanService;
import Project.TMI.service.S3Service;
import Project.TMI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins="*")
@RequestMapping("/plan")
@RequiredArgsConstructor
@RestController
public class PlanController {

    private final PlanService planService;
    private final UserService userService;
    private final S3Service s3Service;

    /** My Plan */
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
                .userId(userId)
                .planName(planName)
                .placeImage(imgPath)
                .planOwner(user.getName()) //planOwner 추가
                .createdAt(realTime)
                .build();

        //플랜 생성 후 planId 가져옴.
        Long planId = planService.planSave(planDto);

        return new ResponseEntity(new CreatePlanSuccess(true, "플랜생성 성공", imgPath, planId), HttpStatus.OK);
    }

    //2. 플랜 삭제
    @DeleteMapping(value = "/deletePlan/{planId}")
    public ResponseEntity<Success> deletePlan(@PathVariable Long planId){

        //planId의 plan이 존재하지 않는다면.
        if(planService.findById(planId) == null){
            throw new CPlanNotFoundException();
        }

        planService.planDelete(planId);

        return new ResponseEntity<>(new Success(true, "플랜삭제 성공"), HttpStatus.OK);
    }

    //3. 플랜리스트 가져오기 (공유받은플랜 포함)
    @GetMapping(value = "/getPlans/{userId}")
    public ResponseEntity<GetPlansSuccess> getPlans(@PathVariable Long userId){

        User user = userService.findById(userId).orElseThrow(CUserNotFoundException::new);
        List<Plan> plans = planService.plansGet(userId);
        List<SharedPlan> sharedPlans = planService.sharedPlansGet(userId);

        return new ResponseEntity<>(new GetPlansSuccess(true, "플랜리스트 가져오기 성공", plans, sharedPlans), HttpStatus.OK);
    }

    /** Shared Plan */
    //4. 플랜 공유하기
    @PostMapping(value = "/sharePlan")
    public ResponseEntity<SharePlanSuccess> sharePlan(@RequestBody SharePlanDto sharePlanDto){

        /** 내 정보를 토큰으로 가져온다면
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userService.findByEmail(email).orElseThrow(CUserNotFoundException::new);
        */

        User user = userService.findByEmail(sharePlanDto.getEmail()).orElseThrow(CUserNotFoundException::new);

        //만약 현재 내 계정과 공유하려는 계정이 같다면 공유불가.
        if(sharePlanDto.getUserId().equals(user.getUserId())){
            throw new CPlanNotSharedMeException();
        }

        Long sharePlanId = planService.planShare(sharePlanDto);

        return new ResponseEntity<>(new SharePlanSuccess(true, "플랜공유 성공", sharePlanId), HttpStatus.OK);
    }

    //5. 공유플랜리스트 가져오기
    @GetMapping(value = "/getSharedPlans/{userId}")
    public ResponseEntity<GetSharedPlansSuccess> getSharedPlans(@PathVariable Long userId){

        List<SharedPlan> sharedPlans = planService.sharedPlansGet(userId);

        return new ResponseEntity<>(new GetSharedPlansSuccess(true, "공유플랜리스트 가져오기 성공", sharedPlans), HttpStatus.OK);
    }

    //6. 공유된플랜 삭제
    @DeleteMapping(value = "/deleteSharedPlan/{sharedPlanId}")
    public ResponseEntity<Success> deleteSharedPlan(@PathVariable Long sharedPlanId){

        planService.sharedPlanDelete(sharedPlanId);

        return new ResponseEntity<>(new Success(true, "공유받은플랜 삭제 성공"), HttpStatus.OK);
    }
}
