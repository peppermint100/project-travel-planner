package Project.TMI.advice.exception;

public class CPasswordDisMatchException extends RuntimeException {

    public CPasswordDisMatchException(String msg, Throwable t) {
        super(msg, t);
    }
    public CPasswordDisMatchException(String msg) {
        super(msg);
    }
    public CPasswordDisMatchException() {
        super();
    }


}
