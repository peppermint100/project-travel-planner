package Project.TMI.domain.PlanDetail;

import Project.TMI.dto.TranspotationSaveDto;
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
@DiscriminatorValue("transpotation")
public class Transpotation extends Detail {

    @Enumerated(EnumType.STRING)
    private TranspotationType transpotationType;

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

    public void updateTranspotation(TranspotationSaveDto transpotationSaveDto) {
        updateDetail(transpotationSaveDto.getDate(), transpotationSaveDto.getNeeds(), transpotationSaveDto.getComment());
        this.transpotationType = transpotationSaveDto.getTranspotationType();
        this.locationStart = transpotationSaveDto.getLocationStart();
        this.locationArrive = transpotationSaveDto.getLocationArrive();
        this.timeStart = transpotationSaveDto.getTimeStart();
        this.timeArrive = transpotationSaveDto.getTimeArrive();
    }
}
