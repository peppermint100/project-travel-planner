package Project.TMI.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePlanSuccess {

    private boolean success;
    private String msg;
    private String placeImage;
    private Long planId;

    @Builder
    public CreatePlanSuccess(boolean success, String msg, String placeImage, Long planId) {
        this.success = success;
        this.msg = msg;
        this.placeImage = placeImage;
        this.planId = planId;
    }
}
