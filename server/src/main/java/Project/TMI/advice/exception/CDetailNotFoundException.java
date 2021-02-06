package Project.TMI.advice.exception;

public class CDetailNotFoundException extends RuntimeException {

    public CDetailNotFoundException(String msg, Throwable t) {
        super(msg, t);
    }
    public CDetailNotFoundException(String msg) {
        super(msg);
    }
    public CDetailNotFoundException() {
        super();
    }


}
