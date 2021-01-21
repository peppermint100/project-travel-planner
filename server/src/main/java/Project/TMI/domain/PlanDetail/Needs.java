package Project.TMI.domain.PlanDetail;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Needs {

    @Id @GeneratedValue
    private Long needsId;

    private String need;

    @ManyToOne
    @JoinColumn(name = "detailId")
    private Detail detail;
}
