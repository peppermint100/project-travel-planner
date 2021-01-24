package Project.TMI.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@Builder
@Entity
public class SharedPlan {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sharedPlanId;

    //planId
    @OneToOne(mappedBy = "sharedPlan")
    private Plan plan;

    //userId
    private Long userId;

}
