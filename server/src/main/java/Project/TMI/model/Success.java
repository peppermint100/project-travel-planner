package Project.TMI.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Success {

    private boolean success;
    private String msg;

    @Builder //기본 성공 Response 폼, 혹시나? 테스트 할 때 필요할 수도 있으니 success를 고정해 두지 않았습니다.
    public Success(boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }
}
