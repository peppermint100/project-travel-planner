package Project.TMI.repository;

import Project.TMI.domain.PlanDetail.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
}
