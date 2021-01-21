package Project.TMI.service;

import Project.TMI.domain.Plan;
import Project.TMI.domain.dto.PlanSaveDto;
import Project.TMI.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    //plan생성
    @Transactional
    public Long planSave(PlanSaveDto planDto){
        //planDto를 이용한 plan생성
        Plan plan = planRepository.save(planDto.toEntity());
        return plan.getPlanId();
    }
}
