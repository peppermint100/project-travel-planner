package Project.TMI.domain;

import Project.TMI.domain.PlanDetail.Detail;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Getter
@NoArgsConstructor
@Entity(name="Plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long planId;

    private String planName;
    private String placeImage;
    private LocalDateTime createdAt;

    //userId(fk)
    private Long userId;

    //디테일
    @OneToMany(mappedBy = "planId")
    private List<Detail> details = new ArrayList<>();

    //==================================================================================================================
    @Builder
    public Plan(String planName, String placeImage, LocalDateTime createdAt, Long userId) {
        this.planName = planName;
        this.placeImage = placeImage;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}
