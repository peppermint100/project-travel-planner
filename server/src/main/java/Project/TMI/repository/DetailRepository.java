package Project.TMI.repository;

import Project.TMI.domain.PlanDetail.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailRepository<T extends Detail> extends JpaRepository<T, Long> {
}
