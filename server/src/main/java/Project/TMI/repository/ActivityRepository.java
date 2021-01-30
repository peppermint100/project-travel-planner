package Project.TMI.repository;

import Project.TMI.domain.PlanDetail.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
