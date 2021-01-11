package Project.TMI.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BasicSuccess {

    private boolean success;
    private String msg;

    @Builder
    public BasicSuccess(boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }
}
