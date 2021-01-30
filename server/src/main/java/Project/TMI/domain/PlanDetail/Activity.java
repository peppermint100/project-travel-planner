package Project.TMI.domain.PlanDetail;

import javax.persistence.*;
import java.util.Date;

@Entity
@DiscriminatorValue("activity")
public class Activity extends Detail{

    @Embedded
    private Position location;

    //시간
    @Temporal(TemporalType.TIME)
    private Date time;

    //활동명
    private String activityName;
}
