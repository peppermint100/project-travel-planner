package Project.TMI.advice.exception;

public class CPlanNotSharedMeException extends RuntimeException {

    public CPlanNotSharedMeException(String msg, Throwable t) {
        super(msg, t);
    }
    public CPlanNotSharedMeException(String msg) {
        super(msg);
    }
    public CPlanNotSharedMeException() {
        super();
    }


}
