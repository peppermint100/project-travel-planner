package Project.TMI.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Failure {

    private boolean success;
    private String msg;

    @Builder //기본 실패 Response 폼, success 값을 false로 고정해놓았습니다.
    public Failure(String msg) {
        this.success = false;
        this.msg = msg;
    }
    
}
