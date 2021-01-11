package Project.TMI.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonResult {

    //성공여부 true, false
    private boolean success;

    //상태메시지
//    private int status;

    //응답 메시지
    private String msg;

}
