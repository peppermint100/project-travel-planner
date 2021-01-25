package Project.TMI.service;

import Project.TMI.advice.exception.CPlanNotFoundException;
import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import Project.TMI.domain.User;
import Project.TMI.domain.dto.PlanSaveDto;
import Project.TMI.domain.dto.SharePlanDto;
import Project.TMI.repository.PlanCustomRepository;
import Project.TMI.repository.PlanRepository;
import Project.TMI.repository.SharedPlanRepository;
import Project.TMI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final PlanCustomRepository planCustomRepository;
    private final SharedPlanRepository sharedPlanRepository;
    private final UserRepository userRepository;


    public Plan findById(Long planId){
        return planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);
    }

    /** My Plan */
    //플랜 생성
    @Transactional
    public Long planSave(PlanSaveDto planDto){
        //planDto를 이용한 plan생성
        Plan plan = planRepository.save(planDto.toEntity());
        return plan.getPlanId();
    }

    //플랜리스트 가져오기
    public List<Plan> plansGet(Long userId){
        return planRepository.findAllByUserId(userId);
    }

    //플랜 삭제하기
    @Transactional
    public void planDelete(Long planId){
        Plan plan = planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);
        planRepository.delete(plan);
    }

    /** Shared Plan */
    //플랜 공유하기
    public Long planShare(SharePlanDto sharePlanDto){

        Long planId = sharePlanDto.getPlanId();
        String email = sharePlanDto.getEmail();

        User byEmail = userRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);

        SharedPlan sharedPlan = SharedPlan.builder()
                .planId(planId)
                .userId(byEmail.getUserId())
                .build();

        SharedPlan result = sharedPlanRepository.save(sharedPlan);

        return result.getSharedPlanId();
    }

    //공유받은플랜 리스트 가져오기
    public List<Plan> sharedPlansGet(Long userId){
        return planCustomRepository.findSharedPlans(userId);
    }

    //공유받은플랜 삭제하기
    public void sharedPlanDelete(Long planId, Long userId){
        SharedPlan sharedPlan = sharedPlanRepository.findByPlanIdAndUserId(planId, userId).orElseThrow(CPlanNotFoundException::new);
        sharedPlanRepository.delete(sharedPlan);

    }
}
