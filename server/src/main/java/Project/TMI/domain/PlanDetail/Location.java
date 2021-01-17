package Project.TMI.domain.PlanDetail;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Location extends Detail{

    @OneToOne
    @JoinColumn(name="positionId")
    private Position location;

    private String comment;

    private LocalDateTime time;

}
