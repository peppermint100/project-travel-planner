package Project.TMI.domain.PlanDetail;

import Project.TMI.dto.TransportationSaveDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@SuperBuilder //상속받은 객체의 builder를 한번에 생성하기 위함
@NoArgsConstructor
@Getter
@DiscriminatorValue("0")
public class Transportation extends Detail {

    @Enumerated(EnumType.ORDINAL)
    private TransportationType transportationType;

    @Embedded
    @AttributeOverride(name = "lat", column = @Column(name = "startLat"))
    @AttributeOverride(name = "lng", column = @Column(name = "startLng"))
    private Position locationStart;

    @Embedded
    @AttributeOverride(name = "lat", column = @Column(name = "arriveLat"))
    @AttributeOverride(name = "lng", column = @Column(name = "arriveLng"))
    private Position locationArrive;

    @JsonFormat(pattern = "hh:mm:ss", timezone = "Asia/Seoul")
    private LocalTime timeStart;

    @JsonFormat(pattern = "hh:mm:ss", timezone = "Asia/Seoul")
    private LocalTime timeArrive;

    public void updateTransportation(TransportationSaveDto transportationSaveDto) {
        updateDetail(transportationSaveDto.getDate(), transportationSaveDto.getNeeds(), transportationSaveDto.getComment());
        this.transportationType = transportationSaveDto.getTransportationType();
        this.locationStart = transportationSaveDto.getLocationStart();
        this.locationArrive = transportationSaveDto.getLocationArrive();
        this.timeStart = transportationSaveDto.getTimeStart();
        this.timeArrive = transportationSaveDto.getTimeArrive();
    }
}
