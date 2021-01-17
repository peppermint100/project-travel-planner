package Project.TMI.controller.dto;

import Project.TMI.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.List;

@Getter
@Setter
public class SignUpDto {

    private String email;
    private String password;
    private String phone;
    private String name;
    private List roles;

    @Builder
    public SignUpDto(String email, String password, String phone, String name, List roles) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.roles = roles;
    }

    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .phone(phone)
                .roles(roles)
                .build();
    }
}
