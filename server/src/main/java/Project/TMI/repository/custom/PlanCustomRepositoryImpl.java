package Project.TMI.repository.custom;

import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import Project.TMI.repository.PlanCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class PlanCustomRepositoryImpl implements PlanCustomRepository {

    @Autowired
    EntityManager em;

    //userId를 이용한 공유받은 플랜리스트 가져오기
    public List<Plan> findSharedPlans(Long userId){
        String sqlString = "select p from Plan p where p.planId in (select sp.planId from SharedPlan sp where sp.userId=:userId)";

        return em.createQuery(sqlString, Plan.class)
                .setParameter("userId", userId)
                .getResultList();
    }

}
