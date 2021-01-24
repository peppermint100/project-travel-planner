package Project.TMI.domain.PlanDetail;

import Project.TMI.domain.Plan;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@SuperBuilder //상속받은 객체의 builder를 한번에 생성하기 위함
public class Detail {

    @Id
    @GeneratedValue
    private Long detailId;

    private LocalDateTime time;

    //준비물
    @OneToMany(mappedBy = "detail")
    private List<Needs> needs = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "planId")
    private Plan plan;
}
