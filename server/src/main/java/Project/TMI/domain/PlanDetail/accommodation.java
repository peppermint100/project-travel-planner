package Project.TMI.domain.PlanDetail;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@DiscriminatorValue("accommodation")
public class accommodation  extends Detail{

    @OneToOne
    @JoinColumn(name="positionId") //위치
    private Position location;

    //숙박이름
    private String activityName;

    //입실시간
    private LocalDateTime timeCheckIn;

    //퇴실시간
    private LocalDateTime timeCheckOut;

    //퇴실날짜
    private Date checkOutDate;

    //feature 객실 제공 ex)WIFI, 침대, 수건 ...
    @OneToOne
    @JoinColumn(name="featureId")
    private Feature feature;
}
