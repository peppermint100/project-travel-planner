package Project.TMI.domain.PlanDetail;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@DiscriminatorValue("activity")
public class activity extends Detail{

    @OneToOne
    @JoinColumn(name="positionId") //위치
    private Position location;

    //시간
    private Time time;

    //활동명
    private String activityName;
}
