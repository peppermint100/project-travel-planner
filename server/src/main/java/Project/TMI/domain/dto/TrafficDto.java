package Project.TMI.domain.dto;

import Project.TMI.domain.Plan;
import Project.TMI.domain.PlanDetail.Needs;
import Project.TMI.domain.PlanDetail.Position;
import Project.TMI.domain.PlanDetail.Traffic;
import Project.TMI.domain.PlanDetail.Transpotation;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TrafficDto {

    //Detail
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime time;
    private List<Needs> needs;
    private Plan plan;

    //Traffic
    private Transpotation transpotation;
    private Position locationStart;
    private Position locationArrive;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timeStart;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timeArrive;


    @Builder
    public TrafficDto(LocalDateTime time, List<Needs> needs, Plan plan, Transpotation transpotation, Position locationStart, Position locationArrive, LocalDateTime timeStart, LocalDateTime timeArrive) {
        this.time = time;
        this.needs = needs;
        this.plan = plan;
        this.transpotation = transpotation;
        this.locationStart = locationStart;
        this.locationArrive = locationArrive;
        this.timeStart = timeStart;
        this.timeArrive = timeArrive;
    }

    public Traffic toEntity(){
        return Traffic.builder()
                .time(time)
                .needs(needs)
                .plan(plan)
                .transpotation(transpotation)
                .locationStart(locationStart)
                .locationArrive(locationArrive)
                .timeStart(timeStart)
                .timeArrive(timeArrive)
                .build();
    }
}
