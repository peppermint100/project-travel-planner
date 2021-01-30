package Project.TMI.dto;

import Project.TMI.domain.PlanDetail.Activity;
import Project.TMI.domain.PlanDetail.Position;
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
public class ActivitySaveDto {

    private Date date;
    private List<String> needs;
    private Long planId;
    private String comment;

    private Position location;
    private int locationLat;
    private int locationLng;

    private String activityName;
    private LocalTime time;

    @Builder
    public ActivitySaveDto(Date date, List<String> needs, Long planId, String comment, Position location, int locationLat, int locationLng, String activityName, LocalTime time) {
        this.date = date;
        this.needs = needs;
        this.planId = planId;
        this.comment = comment;
        this.location = location;
        this.locationLat = locationLat;
        this.locationLng = locationLng;
        this.activityName = activityName;
        this.time = time;
    }

    public Activity toEntity(){
        return Activity.builder()
                .date(date)
                .needs(needs)
                .planId(planId)
                .comment(comment)
                .location(location)
                .time(time)
                .activityName(activityName)
                .build();
    }
}
