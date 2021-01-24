package Project.TMI.service;

import Project.TMI.advice.exception.CPlanNotFoundException;
import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import Project.TMI.domain.dto.PlanSaveDto;
import Project.TMI.domain.dto.SharePlanDto;
import Project.TMI.repository.PlanRepository;
import Project.TMI.repository.SharedPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final SharedPlanRepository sharedPlanRepository;

    public Plan findById(Long planId){
        return planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);
    }

    //plan생성
    @Transactional
    public Long planSave(PlanSaveDto planDto){
        //planDto를 이용한 plan생성
        Plan plan = planRepository.save(planDto.toEntity());
        return plan.getPlanId();
    }

    //plan 삭제하기
    @Transactional
    public void planDelete(Long planId){
        Plan plan = planRepository.findById(planId).orElseThrow(CPlanNotFoundException::new);
        planRepository.delete(plan);
    }

    //planList 가져오기
    public List<Plan> plansGet(Long userId){
        return planRepository.findAllByUserId(userId);
    }

    //planList 가져오기
    public List<Plan> sharedPlansGet(Long userId){
        return sharedPlanRepository.findAllByUserId(userId);
    }

    //plan 공유하기
    public Long planShare(SharePlanDto sharePlanDto){
        SharedPlan sharePlan = sharedPlanRepository.save(sharePlanDto.toEntity());
        return sharePlan.getSharedPlanId();
    }
}
