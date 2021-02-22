package Project.TMI.model;

import Project.TMI.domain.PlanDetail.Detail;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetAllDetailSuccess {

    private boolean success;
    private String msg;
    private List<Detail> details;

    @Builder
    public GetAllDetailSuccess(boolean success, String msg, List<Detail> details) {
        this.success = success;
        this.msg = msg;
        this.details = details;
    }
}
