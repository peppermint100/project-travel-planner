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

    //user
    private Long userId;

    //plan
    private Long planId;


}
