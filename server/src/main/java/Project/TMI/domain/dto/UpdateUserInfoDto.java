package Project.TMI.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateUserInfoDto {

    private String name;
    private String password;
    private String userImage;

    @Builder
    public UpdateUserInfoDto(String name, String password, String userImage) {
        this.name = name;
        this.password = password;
        this.userImage = userImage;
    }
}
