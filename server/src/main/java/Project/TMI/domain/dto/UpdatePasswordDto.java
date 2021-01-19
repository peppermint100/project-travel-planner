package Project.TMI.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdatePasswordDto {
    private String password;

    @Builder
    public UpdatePasswordDto(String password) {
        this.password = password;
    }
}
