package Project.TMI.repository;

import Project.TMI.domain.PlanDetail.Detail;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailRepository<T extends Detail> extends JpaRepository<T, Long> {
    List<Detail> findAllByPlanId(Long planId, Sort sortByDateAndTime);
}
