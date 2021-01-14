package Project.TMI.advice.exception;

public class CSignInFailedException extends RuntimeException {
    public CSignInFailedException(String msg, Throwable t) {
        super(msg, t);
    }

    public CSignInFailedException(String msg) {
        super(msg);
    }

    public CSignInFailedException() {
        super();
    }
}
