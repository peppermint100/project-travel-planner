package Project.TMI.domain.PlanDetail;

import Project.TMI.dto.AccommodationSaveDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@SuperBuilder //상속받은 객체의 builder를 한번에 생성하기 위함
@NoArgsConstructor
@Getter
@DiscriminatorValue("1")
public class Accommodation extends Detail {

    @Embedded
    private Position location;

    //숙박이름
    private String accommodationName;

    //입실시간
    @JsonFormat(pattern = "hh:mm:ss", timezone = "Asia/Seoul")
    private LocalTime timeCheckIn;

    //퇴실시간
    @JsonFormat(pattern = "hh:mm:ss", timezone = "Asia/Seoul")
    private LocalTime timeCheckOut;

    //퇴실날짜
    @Temporal(TemporalType.DATE)
    private Date checkOutDate;

    //feature 객실 제공 ex)WIFI, 침대, 수건 ...
    @ElementCollection
    @CollectionTable(name = "feature", joinColumns = @JoinColumn(name = "detailId"))
    @Column(name = "features")
    @Enumerated(EnumType.ORDINAL)
    private List<Feature> feature = new ArrayList<>();

    public void updateAccommodation(AccommodationSaveDto accommodationSaveDto) {
        updateDetail(accommodationSaveDto.getDate(), accommodationSaveDto.getNeeds(), accommodationSaveDto.getComment());
        this.location = accommodationSaveDto.getLocation();
        this.accommodationName = accommodationSaveDto.getAccommodationName();
        this.timeCheckIn = accommodationSaveDto.getTimeCheckIn();
        this.timeCheckOut = accommodationSaveDto.getTimeCheckOut();
        this.checkOutDate = accommodationSaveDto.getCheckOutDate();
        this.feature = accommodationSaveDto.getFeature();
    }
}
