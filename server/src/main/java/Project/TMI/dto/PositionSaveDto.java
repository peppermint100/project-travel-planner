package Project.TMI.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PositionSaveDto {

    private int lat;
    private int lng;

    @Builder
    public PositionSaveDto(int lat, int lng) {
        this.lat = lat;
        this.lng = lng;
    }

}
