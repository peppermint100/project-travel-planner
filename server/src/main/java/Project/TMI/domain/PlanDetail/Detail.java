package Project.TMI.domain.PlanDetail;

import Project.TMI.domain.Plan;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
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
