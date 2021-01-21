package Project.TMI.advice.exception;

public class CPasswordNotInputException extends RuntimeException {

    public CPasswordNotInputException(String msg, Throwable t) {
        super(msg, t);
    }
    public CPasswordNotInputException(String msg) {
        super(msg);
    }
    public CPasswordNotInputException() {
        super();
    }


}
