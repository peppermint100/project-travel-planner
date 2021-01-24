package Project.TMI.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SharePlanSuccess {

    private boolean success;
    private String msg;
    private Long sharePlanId;

    @Builder
    public SharePlanSuccess(boolean success, String msg, Long sharePlanId) {
        this.success = success;
        this.msg = msg;
        this.sharePlanId = sharePlanId;
    }
}
