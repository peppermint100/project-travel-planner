package Project.TMI.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
