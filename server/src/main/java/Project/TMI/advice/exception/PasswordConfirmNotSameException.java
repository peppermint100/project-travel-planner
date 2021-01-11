package Project.TMI.advice.exception;

public class PasswordConfirmNotSameException extends RuntimeException{
    public PasswordConfirmNotSameException(String msg, Throwable t) {
        super(msg, t);
    }

    public PasswordConfirmNotSameException(String msg) {
        super(msg);
    }

    public PasswordConfirmNotSameException() {
        super();
    }
}
