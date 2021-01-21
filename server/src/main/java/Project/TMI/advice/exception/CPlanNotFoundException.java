package Project.TMI.advice.exception;

public class CPlanNotFoundException extends RuntimeException {

    public CPlanNotFoundException(String msg, Throwable t) {
        super(msg, t);
    }
    public CPlanNotFoundException(String msg) {
        super(msg);
    }
    public CPlanNotFoundException() {
        super();
    }


}
