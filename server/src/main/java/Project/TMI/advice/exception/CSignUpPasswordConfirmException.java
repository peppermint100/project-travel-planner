package Project.TMI.advice.exception;

public class CSignUpPasswordConfirmException extends RuntimeException {
    public CSignUpPasswordConfirmException(String msg, Throwable t) {
        super(msg, t);
    }

    public CSignUpPasswordConfirmException(String msg) {
        super(msg);
    }

    public CSignUpPasswordConfirmException() {
        super();
    }
}
