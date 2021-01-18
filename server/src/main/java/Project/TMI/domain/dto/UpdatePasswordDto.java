package Project.TMI.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UpdatePasswordDto {
    private String password;

    @Builder
    public UpdatePasswordDto(String password) {
        this.password = password;
    }
}
