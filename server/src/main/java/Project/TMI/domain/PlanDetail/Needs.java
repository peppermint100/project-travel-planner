package Project.TMI.domain.PlanDetail;

import javax.persistence.*;

@Entity
public class Needs {

    @Id @GeneratedValue
    private Long needsId;

    private String need;

    @ManyToOne
    @JoinColumn(name = "detailId")
    private Detail detail;
}
