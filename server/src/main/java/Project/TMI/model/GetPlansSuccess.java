package Project.TMI.model;

import Project.TMI.domain.Plan;
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

    @Builder
    public GetPlansSuccess(boolean success, String msg, List<Plan> plans) {
        this.success = success;
        this.msg = msg;
        this.plans = plans;
    }
}
