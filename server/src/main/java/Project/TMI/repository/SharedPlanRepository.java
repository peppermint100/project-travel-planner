package Project.TMI.repository;

import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import Project.TMI.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SharedPlanRepository extends JpaRepository<SharedPlan, Long> {
    Optional<SharedPlan> findByPlanIdAndUserId(Long planId, Long userId);
}
