package Project.TMI.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class SharedPlan {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sharedPlanId;

    //planId
    @OneToOne
    @JoinColumn(name="sharedPlan")
    private Plan plan;

    //userId
    @ManyToOne
    @JoinColumn(name="sharedPlans")
    private User user;

}
