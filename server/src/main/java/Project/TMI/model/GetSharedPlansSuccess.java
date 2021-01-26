package Project.TMI.model;

import Project.TMI.domain.Plan;
import Project.TMI.domain.SharedPlan;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetSharedPlansSuccess {

    private boolean success;
    private String msg;
    private List<SharedPlan> sharedPlans;

    @Builder
    public GetSharedPlansSuccess(boolean success, String msg, List<SharedPlan> sharedPlans) {
        this.success = success;
        this.msg = msg;
        this.sharedPlans = sharedPlans;
    }
}
