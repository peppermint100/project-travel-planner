package Project.TMI.advice.exception;

public class CPlanAlreadySharedExcption extends RuntimeException {
    public CPlanAlreadySharedExcption(String msg, Throwable t) {
        super(msg, t);
    }
    public CPlanAlreadySharedExcption(String msg) {
        super(msg);
    }
    public CPlanAlreadySharedExcption() {
        super();
    }
}
