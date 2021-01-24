package Project.TMI.domain.PlanDetail;

import lombok.Builder;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@SuperBuilder //상속받은 객체의 builder를 한번에 생성하기 위함
public class Traffic extends Detail{

    @Enumerated(EnumType.STRING)
    private Transpotation transpotation;

    @OneToOne
    private Position locationStart;

    @OneToOne
    private Position locationArrive;

    private LocalDateTime timeStart;
    private LocalDateTime timeArrive;

}
