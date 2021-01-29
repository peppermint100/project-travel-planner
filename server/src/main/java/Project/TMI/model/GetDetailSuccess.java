package Project.TMI.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetDetailSuccess {

    private boolean success;
    private String msg;
    private Object detail;

    @Builder
    public GetDetailSuccess(boolean success, String msg, Object detail) {
        this.success = success;
        this.msg = msg;
        this.detail = detail;
    }
}
