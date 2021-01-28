package Project.TMI.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="SharedPlan")
public class SharedPlan {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sharedPlanId;

    //userID(fk)
    private Long userId;

    //plan
    @OneToOne
    @JoinColumn(name="planId")
    private Plan plan;

}
