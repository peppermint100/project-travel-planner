package Project.TMI.domain.PlanDetail;

import javax.persistence.*;
import java.util.Date;

@Entity
@DiscriminatorValue("accommodation")
public class Accommodation extends Detail{

    @Embedded
    private Position location;

    //숙박이름
    private String accommodationName;

    //입실시간
    @Temporal(TemporalType.TIME)
    private Date timeCheckIn;

    //퇴실시간
    @Temporal(TemporalType.TIME)
    private Date timeCheckOut;

    //퇴실날짜
    @Temporal(TemporalType.DATE)
    private Date checkOutDate;

    //feature 객실 제공 ex)WIFI, 침대, 수건 ...
    @Enumerated(EnumType.STRING)
    private Feature feature;
}
