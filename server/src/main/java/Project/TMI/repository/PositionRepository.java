package Project.TMI.repository;

import Project.TMI.domain.PlanDetail.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
}
