package Project.TMI.domain.PlanDetail;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="detailType")
@SuperBuilder //상속받은 객체의 builder를 한번에 생성하기 위함
public class Detail {

    @Id
    @GeneratedValue
    private Long detailId;

    //날짜
    @Temporal(TemporalType.DATE)
    private Date date;

    //준비물
    @ElementCollection
    @CollectionTable(name = "needs", joinColumns = @JoinColumn(name ="detailId"))
    @Column(name="need")
    private List<String> needs = new ArrayList<>();

    private String comment;

    //planId(fk)
    private Long planId;

    @Enumerated(EnumType.STRING)
    @Column(name = "detailType", insertable = false, updatable = false)
    private DetailType detailType;

    public void updateDetail(Date date, List<String> needs, String comment) {
        this.date = date;
        this.needs = needs;
        this.comment = comment;
    }
}
