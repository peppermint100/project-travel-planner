package Project.TMI.dto;

import Project.TMI.domain.PlanDetail.Activity;
import Project.TMI.domain.PlanDetail.Position;
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
public class ActivitySaveDto {

    @FutureOrPresent(message = "과거의 날짜는 설정할 수 없습니다.")
    @NotNull(message = "해당 계획의 날짜를 설정해 주세요.")
    private Date date;
    private List<String> needs;
    @NotNull(message = "planId 값이 비었습니다.")
    private Long planId;
    private String comment;

    private Position location;
    @NotNull(message = "활동 위치를 선택해 주세요.")
    private int locationLat;
    @NotNull(message = "활동 위치를 선택해 주세요.")
    private int locationLng;

    @NotNull(message = "활동 이름을 입력해 주세요.")
    private String activityName;
    @NotNull(message = "시작 시간을 입력해 주세요.")
    private LocalTime timeStart;

    @Builder
    public ActivitySaveDto(Date date, List<String> needs, Long planId, String comment, Position location, int locationLat, int locationLng, String activityName, LocalTime timeStart) {
        this.date = date;
        this.needs = needs;
        this.planId = planId;
        this.comment = comment;
        this.location = location;
        this.locationLat = locationLat;
        this.locationLng = locationLng;
        this.activityName = activityName;
        this.timeStart = timeStart;
    }

    public Activity toEntity(){
        return Activity.builder()
                .date(date)
                .time(timeStart)
                .needs(needs)
                .planId(planId)
                .comment(comment)
                .location(location)
                .timeStart(timeStart)
                .activityName(activityName)
                .build();
    }
}
