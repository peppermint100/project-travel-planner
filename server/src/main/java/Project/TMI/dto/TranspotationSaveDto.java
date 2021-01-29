package Project.TMI.dto;

import Project.TMI.domain.PlanDetail.Position;
import Project.TMI.domain.PlanDetail.Transpotation;
import Project.TMI.domain.PlanDetail.TranspotationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TranspotationSaveDto {

    private Date date;
    private List<String> needs;
    private Long planId;
    private String comment;

    private TranspotationType transpotationType;
    private Position locationStart;
    private Position locationArrive;

    private LocalTime timeStart;
    private LocalTime timeArrive;

    private int locationStartLat;
    private int locationStartLng;
    private int locationArriveLat;
    private int locationArriveLng;

    @Builder
    public TranspotationSaveDto(Date date, List<String> needs, Long planId, String comment, TranspotationType transpotationType, Position locationStart, Position locationArrive, LocalTime timeStart, LocalTime timeArrive, int locationStartLat, int locationStartLng, int locationArriveLat, int locationArriveLng) {
        this.date = date;
        this.needs = needs;
        this.planId = planId;
        this.comment = comment;
        this.transpotationType = transpotationType;
        this.locationStart = locationStart;
        this.locationArrive = locationArrive;
        this.timeStart = timeStart;
        this.timeArrive = timeArrive;
        this.locationStartLat = locationStartLat;
        this.locationStartLng = locationStartLng;
        this.locationArriveLat = locationArriveLat;
        this.locationArriveLng = locationArriveLng;
    }

    public Transpotation toEntity(){
        return Transpotation.builder()
                .date(date)
                .needs(needs)
                .planId(planId)
                .comment(comment)
                .transpotationType(transpotationType)
                .locationStart(locationStart)
                .locationArrive(locationArrive)
                .timeStart(timeStart)
                .timeArrive(timeArrive)
                .build();
    }
}
