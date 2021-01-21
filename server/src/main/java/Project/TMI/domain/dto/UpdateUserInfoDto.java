package Project.TMI.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateUserInfoDto {

    private String name;
    private String password;

    @Builder
    public UpdateUserInfoDto(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
