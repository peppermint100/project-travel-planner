package Project.TMI.domain.dto;

import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import lombok.*;

@Data
public class SharePlanDto {

    //입력값
    private Long planId;
    private String email;

    //entity만들 값
    private Plan plan;
    private Long userId;

    @Builder
    public SharePlanDto(Plan plan, Long userId) {
        this.plan = plan;
        this.userId = userId;
    }

    public SharedPlan toEntity(){
        return SharedPlan.builder()
                .plan(plan)
                .userId(userId)
                .build();
    }
}
