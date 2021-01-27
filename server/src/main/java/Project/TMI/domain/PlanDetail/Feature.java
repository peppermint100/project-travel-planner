package Project.TMI.domain.PlanDetail;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Getter
@Entity
public class Feature {

    @Id @GeneratedValue
    private Long featureId;

    private boolean wifi;
    private boolean kitchen;
    private boolean tv;
    private boolean elevator;

    //필요할 경우 추가
    @OneToOne(mappedBy = "feature")
    private accommodation accommodation;
}
