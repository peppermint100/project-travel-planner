package Project.TMI.dto;

import Project.TMI.domain.Plan;
import lombok.Builder;

import java.util.Date;

public class PlanSaveDto {

    private Long userId;
    private String planName;
    private String placeImage;
    private String planOwner;
    private Date createdAt;

    @Builder
    public PlanSaveDto(Long userId, String planName, String planOwner, String placeImage, Date createdAt) {
        this.userId = userId;
        this.planName = planName;
        this.placeImage = placeImage;
        this.planOwner = planOwner;
        this.createdAt = createdAt;
    }


    public Plan toEntity(){
        return Plan.builder()
                .userId(userId)
                .planName(planName)
                .placeImage(placeImage)
                .planOwner(planOwner)
                .createdAt(createdAt)
                .build();
    }
}
