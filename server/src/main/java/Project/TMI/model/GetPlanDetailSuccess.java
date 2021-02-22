package Project.TMI.model;

import Project.TMI.domain.Plan;
import Project.TMI.domain.PlanDetail.Detail;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetPlanDetailSuccess {

    private boolean success;
    private String msg;
    private Plan plan;
    private List<Detail> details;

    @Builder
    public GetPlanDetailSuccess(boolean success, String msg, Plan plan, List<Detail> details) {
        this.success = success;
        this.msg = msg;
        this.plan = plan;
        this.details = details;
    }
}
