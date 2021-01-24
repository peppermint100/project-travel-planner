package Project.TMI.domain.PlanDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Position {

    @Id @GeneratedValue
    private Long positionId;

    private int lat;
    private int lng;

    @Builder
    public Position(int lat, int lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
