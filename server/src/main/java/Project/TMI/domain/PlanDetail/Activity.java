package Project.TMI.domain.PlanDetail;

import Project.TMI.dto.ActivitySaveDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import java.time.LocalTime;

@Entity
@SuperBuilder //상속받은 객체의 builder를 한번에 생성하기 위함
@NoArgsConstructor
@Getter
@DiscriminatorValue("2")
public class Activity extends Detail {

    @Embedded
    private Position location;

    //시간
    @JsonFormat(pattern = "hh:mm:ss", timezone = "Asia/Seoul")
    private LocalTime timeStart;

    //활동명
    private String activityName;

    public void updateActivity(ActivitySaveDto activitySaveDto) {
        updateDetail(activitySaveDto.getDate(), activitySaveDto.getNeeds(), activitySaveDto.getComment());
        this.location = activitySaveDto.getLocation();
        this.timeStart = activitySaveDto.getTimeStart();
        this.activityName = activitySaveDto.getActivityName();
    }
}
