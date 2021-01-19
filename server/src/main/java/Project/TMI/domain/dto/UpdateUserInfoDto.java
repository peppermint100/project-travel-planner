package Project.TMI.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateUserInfoDto {

    private String name;
    private String phone;

    @Builder
    public UpdateUserInfoDto(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }
}
