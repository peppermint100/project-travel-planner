package Project.TMI.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignInSuccess{

    private boolean success;
    private String msg;
    private String token;

    @Builder
    public SignInSuccess(boolean success, String msg, String token) {
        this.success = success;
        this.msg = msg;
        this.token = token;
    }
}
