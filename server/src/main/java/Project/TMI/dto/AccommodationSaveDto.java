package Project.TMI.dto;

import Project.TMI.domain.PlanDetail.Accommodation;
import Project.TMI.domain.PlanDetail.Feature;
import Project.TMI.domain.PlanDetail.Position;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AccommodationSaveDto {

    @FutureOrPresent(message = "과거의 날짜는 설정할 수 없습니다.")
    @NotNull(message = "해당 계획의 날짜를 설정해 주세요.")
    private Date date;
    private List<String> needs;

    @NotNull(message = "planId 값이 비었습니다.")
    private Long planId;
    private String comment;

    private Position location;
    @NotNull(message = "숙박 지점을 선택해 주세요.")
    private int locationLat;
    @NotNull(message = "숙박 지점을 선택해 주세요.")
    private int locationLng;

    @NotNull(message = "숙소명을 입력해 주세요.")
    private String accommodationName;

    @NotNull(message = "체크인 시간을 입력해 주세요.")
    private LocalTime timeCheckIn;
    @NotNull(message = "체크아웃 시간을 입력해 주세요.")
    private LocalTime timeCheckOut;
    @NotNull(message = "체크아웃 날짜를 입력해 주세요.")
    private Date checkOutDate;

    @NotNull(message = "편의시설을 선택해 주세요.")
    private List<Feature> feature = new ArrayList<>();

    @Builder
    public AccommodationSaveDto(Date date, List<String> needs, Long planId, String comment, Position location, int locationLat, int locationLng, String accommodationName, LocalTime timeCheckIn, LocalTime timeCheckOut, Date checkOutDate, List<Feature> feature) {
        this.date = date;
        this.needs = needs;
        this.planId = planId;
        this.comment = comment;
        this.location = location;
        this.locationLat = locationLat;
        this.locationLng = locationLng;
        this.accommodationName = accommodationName;
        this.timeCheckIn = timeCheckIn;
        this.timeCheckOut = timeCheckOut;
        this.checkOutDate = checkOutDate;
        this.feature = feature;
    }

    public Accommodation toEntity(){
        return Accommodation.builder()
                .date(date)
                .time(timeCheckIn)
                .needs(needs)
                .planId(planId)
                .comment(comment)
                .location(location)
                .accommodationName(accommodationName)
                .timeCheckIn(timeCheckIn)
                .timeCheckOut(timeCheckOut)
                .checkOutDate(checkOutDate)
                .feature(feature)
                .build();
    }
}
