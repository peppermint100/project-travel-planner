package Project.TMI.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeSuccess {

    private boolean success;
    private String msg;
    private Long userId;
    private String email;
    private String name;
    private String userImage;

    @Builder
    public MeSuccess(boolean success, String msg, long userId, String email, String name, String userImage) {
        this.success = success;
        this.msg = msg;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.userImage = userImage;
    }
}
