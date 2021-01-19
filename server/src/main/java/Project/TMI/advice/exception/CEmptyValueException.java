package Project.TMI.advice.exception;

public class CEmptyValueException extends RuntimeException{
    public CEmptyValueException(String msg, Throwable t){
        super(msg, t);
    }
    public CEmptyValueException(String msg){
        super(msg);
    }
    public CEmptyValueException(){
        super();
    }
}