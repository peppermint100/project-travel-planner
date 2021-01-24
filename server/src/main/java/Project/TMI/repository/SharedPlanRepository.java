package Project.TMI.repository;

import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SharedPlanRepository extends JpaRepository<SharedPlan, Long> {

    List<Plan> findAllByUserId(Long userId);

}
