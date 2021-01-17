package Project.TMI.domain.PlanDetail;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Position {

    @Id @GeneratedValue
    private Long positionId;

    private int lat;
    private int lng;

}
