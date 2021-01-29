package Project.TMI.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity(name="Plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long planId;

    private String planName;
    private String placeImage;
    private String planOwner;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    //userId(fk)
    private Long userId;

    //==================================================================================================================
    @Builder
    public Plan(String planName, String placeImage, String planOwner, Date createdAt, Long userId) {
        this.planName = planName;
        this.placeImage = placeImage;
        this.planOwner = planOwner;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}
