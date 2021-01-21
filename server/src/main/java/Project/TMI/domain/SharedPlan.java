package Project.TMI.domain;

import javax.persistence.*;

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
