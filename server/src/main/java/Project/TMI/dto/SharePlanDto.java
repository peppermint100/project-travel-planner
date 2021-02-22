package Project.TMI.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class SharePlanDto {

    //입력값
    private Long planId;
    private Long userId;
    private String email;

    public SharePlanDto(Long planId, Long userId, String email) {
        this.planId = planId;
        this.userId = userId;
        this.email = email;
    }
}
