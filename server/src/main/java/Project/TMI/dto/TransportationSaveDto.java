package Project.TMI.dto;

import Project.TMI.domain.PlanDetail.Position;
import Project.TMI.domain.PlanDetail.Transportation;
import Project.TMI.domain.PlanDetail.TransportationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TransportationSaveDto {

    @FutureOrPresent(message = "과거의 날짜는 설정할 수 없습니다.")
    @NotNull(message = "해당 계획의 날짜를 설정해 주세요.")
    private Date date;

    private List<String> needs;

    @NotNull(message = "planId 값이 비었습니다.")
    private Long planId;
    private String comment;

    @NotNull(message = "교통수단을 선택해 주세요.")
    private TransportationType transportationType;

    private Position locationStart;
    private Position locationArrive;

    @NotNull(message = "출발 시간을 설정해 주세요.")
    private LocalTime timeStart;
    @NotNull(message = "도착 시간을 설정해 주세요.")
    private LocalTime timeArrive;

    @NotNull(message = "출발 지점을 선택해 주세요.")
    private int locationStartLat;
    @NotNull(message = "출발 지점을 선택해 주세요.")
    private int locationStartLng;
    @NotNull(message = "도착 지점을 선택해 주세요.")
    private int locationArriveLat;
    @NotNull(message = "도착 지점을 선택해 주세요.")
    private int locationArriveLng;

    @Builder
    public TransportationSaveDto(Date date, List<String> needs, Long planId, String comment, TransportationType transportationType, Position locationStart, Position locationArrive, LocalTime timeStart, LocalTime timeArrive, int locationStartLat, int locationStartLng, int locationArriveLat, int locationArriveLng) {
        this.date = date;
        this.needs = needs;
        this.planId = planId;
        this.comment = comment;
        this.transportationType = transportationType;
        this.locationStart = locationStart;
        this.locationArrive = locationArrive;
        this.timeStart = timeStart;
        this.timeArrive = timeArrive;
        this.locationStartLat = locationStartLat;
        this.locationStartLng = locationStartLng;
        this.locationArriveLat = locationArriveLat;
        this.locationArriveLng = locationArriveLng;
    }

    public Transportation toEntity(){
        return Transportation.builder()
                .date(date)
                .time(timeStart)
                .needs(needs)
                .planId(planId)
                .comment(comment)
                .transportationType(transportationType)
                .locationStart(locationStart)
                .locationArrive(locationArrive)
                .timeStart(timeStart)
                .timeArrive(timeArrive)
                .build();
    }
}
