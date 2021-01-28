package Project.TMI.model;

import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetPlansSuccess {

    private boolean success;
    private String msg;
    private List<Plan> plans;
    private List<SharedPlan> sharedPlans;

    @Builder
    public GetPlansSuccess(boolean success, String msg, List<Plan> plans, List<SharedPlan> sharedPlans) {
        this.success = success;
        this.msg = msg;
        this.plans = plans;
        this.sharedPlans = sharedPlans;
    }
}
