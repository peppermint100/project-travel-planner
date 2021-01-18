package Project.TMI.advice.exception;

public class CSignUpEmptyValueException extends RuntimeException{
    public CSignUpEmptyValueException(String msg, Throwable t){
        super(msg, t);
    }
    public CSignUpEmptyValueException(String msg){
        super(msg);
    }
    public CSignUpEmptyValueException(){
        super();
    }
}