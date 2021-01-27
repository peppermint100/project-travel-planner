package Project.TMI.domain.PlanDetail;

import lombok.Builder;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@SuperBuilder //상속받은 객체의 builder를 한번에 생성하기 위함
@DiscriminatorValue("traffic")
public class Traffic extends Detail{

    @Enumerated(EnumType.STRING)
    private Transpotation transpotationsType;

    @OneToOne
    private Position locationStart;

    @OneToOne
    private Position locationArrive;

    private Time timeStart;
    private Time timeArrive;

}
