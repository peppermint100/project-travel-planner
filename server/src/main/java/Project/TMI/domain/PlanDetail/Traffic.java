package Project.TMI.domain.PlanDetail;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
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
