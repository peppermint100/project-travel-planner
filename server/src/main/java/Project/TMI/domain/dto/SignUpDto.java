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
    private String userImage;
    private List roles;

    @Builder
    public SignUpDto(String email, String password, String name, String userImage, List roles) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.userImage = userImage;
        this.roles = roles;
    }

    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .userImage(userImage)
                .roles(roles)
                .build();
    }
}
