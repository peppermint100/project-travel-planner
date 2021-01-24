package Project.TMI.domain.dto;

import Project.TMI.domain.Plan;
import Project.TMI.domain.User;
import lombok.Builder;

import java.time.LocalDateTime;

public class PlanSaveDto {

    private Long userId;
    private String planName;
    private String placeImage;
    private LocalDateTime createdAt;

    @Builder
    public PlanSaveDto(Long userId, String planName, String placeImage, LocalDateTime createdAt) {
        this.userId = userId;
        this.planName = planName;
        this.placeImage = placeImage;
        this.createdAt = createdAt;
    }


    public Plan toEntity(){
        return Plan.builder()
                .userId(userId)
                .planName(planName)
                .placeImage(placeImage)
                .createdAt(createdAt)
                .build();
    }
}
