package Project.TMI.domain.dto;

import Project.TMI.domain.Plan;
import Project.TMI.domain.User;
import lombok.Builder;

import java.time.LocalDateTime;

public class PlanSaveDto {

    private User user;
    private String planName;
    private String placeImage;
    private LocalDateTime createdAt;

    @Builder
    public PlanSaveDto(User user, String planName, String placeImage, LocalDateTime createdAt) {
        this.user = user;
        this.planName = planName;
        this.placeImage = placeImage;
        this.createdAt = createdAt;
    }


    public Plan toEntity(){
        return Plan.builder()
                .user(user)
                .planName(planName)
                .placeImage(placeImage)
                .createdAt(createdAt)
                .build();
    }
}
