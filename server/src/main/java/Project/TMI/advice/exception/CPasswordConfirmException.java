package Project.TMI.advice.exception;

public class CPasswordConfirmException extends RuntimeException {
    public CPasswordConfirmException(String msg, Throwable t) {
        super(msg, t);
    }
    public CPasswordConfirmException(String msg) {
        super(msg);
    }
    public CPasswordConfirmException() {
        super();
    }
}
