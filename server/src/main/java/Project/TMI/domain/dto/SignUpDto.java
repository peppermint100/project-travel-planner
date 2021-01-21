package Project.TMI.domain.dto;

import Project.TMI.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SignUpDto {

    private String email;
    private String password;
    private String name;
    private List roles;

    @Builder
    public SignUpDto(String email, String password, String name, List roles) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.roles = roles;
    }

    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .roles(roles)
                .build();
    }
}
