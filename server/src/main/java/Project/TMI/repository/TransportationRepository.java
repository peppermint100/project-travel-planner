package Project.TMI.repository;

import Project.TMI.domain.PlanDetail.Transportation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportationRepository extends JpaRepository<Transportation, Long> {
}
