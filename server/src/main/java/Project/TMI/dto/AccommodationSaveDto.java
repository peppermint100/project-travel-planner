package Project.TMI.dto;

import Project.TMI.domain.PlanDetail.Accommodation;
import Project.TMI.domain.PlanDetail.Feature;
import Project.TMI.domain.PlanDetail.Position;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AccommodationSaveDto {

    private Date date;
    private LocalTime time;
    private List<String> needs;
    private Long planId;
    private String comment;

    private Position location;
    private int locationLat;
    private int locationLng;

    private String accommodationName;
    private LocalTime timeCheckIn;
    private LocalTime timeCheckOut;
    private Date checkOutDate;
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
