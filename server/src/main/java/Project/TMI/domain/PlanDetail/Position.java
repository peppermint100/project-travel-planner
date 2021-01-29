package Project.TMI.domain.PlanDetail;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@NoArgsConstructor
public class Position {

    private int lat;
    private int lng;

    public Position(int lat, int lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
