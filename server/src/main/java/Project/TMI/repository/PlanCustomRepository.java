package Project.TMI.repository;

import Project.TMI.domain.Plan;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface PlanCustomRepository{
    List<Plan> findSharedPlans(Long userId);
}
