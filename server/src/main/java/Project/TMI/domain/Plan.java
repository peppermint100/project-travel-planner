package Project.TMI.domain;

import Project.TMI.domain.PlanDetail.Detail;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long planId;

    private String planName;
    private String placeImage;
    private LocalDateTime createdAt;

    //플랜주인
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    //디테일
    @OneToMany(mappedBy = "plan")
    private List<Detail> details = new ArrayList<>();

    //공유된 플랜
    @OneToOne
    private SharedPlan sharedPlan;
}
