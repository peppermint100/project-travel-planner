package Project.TMI.advice.exception;

public class CSignUpEmailExistException extends RuntimeException {

    public CSignUpEmailExistException(String msg, Throwable t) {
        super(msg, t);
    }
    public CSignUpEmailExistException(String msg) {
        super(msg);
    }
    public CSignUpEmailExistException() {
        super();
    }


}
