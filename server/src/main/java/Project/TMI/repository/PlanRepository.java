package Project.TMI.repository;

import Project.TMI.domain.Plan;
import Project.TMI.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findAllByUserId(Long userId);
}
