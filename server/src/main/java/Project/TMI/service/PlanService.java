package Project.TMI.service;

import Project.TMI.advice.exception.CPlanNotFoundException;
import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import Project.TMI.domain.User;
import Project.TMI.dto.PlanSaveDto;
import Project.TMI.dto.SharePlanDto;
import Project.TMI.repository.PlanRepository;
import Project.TMI.repository.SharedPlanRepository;
import Project.TMI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final SharedPlanRepository sharedPlanRepository;
    private final UserRepository userRepository;


    public Plan findById(Long planId){
        return planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);
    }

    /** My Plan */
    @Transactional //플랜 생성
    public Long planSave(PlanSaveDto planDto){
        //planDto를 이용한 plan생성
        Plan plan = planRepository.save(planDto.toEntity());
        return plan.getPlanId();
    }

    //플랜리스트 가져오기
    public List<Plan> plansGet(Long userId){
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        return user.getUserPlans();
    }

    @Transactional //플랜 삭제하기
    public void planDelete(Long planId){
        Plan plan = planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);
        planRepository.delete(plan);
    }

    /** Shared Plan */
    @Transactional //플랜 공유하기
    public Long planShare(SharePlanDto sharePlanDto){

        Long planId = sharePlanDto.getPlanId();
        String email = sharePlanDto.getEmail();

        //Exception
        Plan plan = planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);
        User user = userRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);

        SharedPlan sharedPlan = SharedPlan.builder()
                .plan(plan)
                .userId(user.getUserId())
                .build();

        SharedPlan result = sharedPlanRepository.save(sharedPlan);

        return result.getSharedPlanId();
    }

    //공유받은플랜 리스트 가져오기
    public List<SharedPlan> sharedPlansGet(Long userId){

        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);

        return user.getSharedPlans();
    }

    //해당 회원에게 해당 계획이 공유되어있는지 판단하는 메소드
    public SharedPlan getSharedPlan(Long userId, Long planId){

        Plan plan = planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);

        SharedPlan sharedPlan = sharedPlanRepository.findByUserIdAndPlan(userId, plan);

        return sharedPlan;
    }


    @Transactional //공유받은플랜 삭제하기
    public void sharedPlanDelete(Long sharedPlanId){

        //sharedPlanId를 이용한 엔티티 찾기
        SharedPlan sharedPlan = sharedPlanRepository.findById(sharedPlanId).orElseThrow(CPlanNotFoundException::new);
        //찾은 엔티티를 삭제해줍니다.
        sharedPlanRepository.delete(sharedPlan);
    }
}
