package Project.TMI.domain.PlanDetail;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Room extends Detail{

    @OneToOne
    @JoinColumn(name="positionId")
    private Position location;

    private String comment;

    private LocalDateTime timeCheckIn;
    private LocalDateTime timeCheckOut;

    //feature 객실 제공 ex)WIFI, 침대, 수건 ...

}
