package Project.TMI.advice;

import Project.TMI.advice.exception.*;
import Project.TMI.model.Failure;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestControllerAdvice //모든 컨트롤러에서 Exception 발생시 여기서 가져와서 처리하게 됩니다. controller를 특정 할수도 있습니다.
public class ExceptionAdvice {

    //최상위 Exception 객체로 아래 모든 경우에 포함되지 않을 때 실행됩니다.
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Failure> defaultException(HttpServletRequest request, Exception e) {
        return new ResponseEntity<>(new Failure("알수없는 오류입니다."), HttpStatus.OK);
    }

    //공부필요
    @ExceptionHandler(CAuthenticationEntryPointException.class)
    public ResponseEntity<Failure> authenticationEntryPointException(HttpServletRequest request, CAuthenticationEntryPointException e) {
        return new ResponseEntity<>(new Failure("authenticationEntryPointException"), HttpStatus.OK);
    }

    //공부필요
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Failure> accessDeniedException(HttpServletRequest request, AccessDeniedException e) {
        return new ResponseEntity<>(new Failure("accessDeniedException"), HttpStatus.OK);
    }

    //SignUp
    @ExceptionHandler(CSignUpPasswordConfirmException.class)
    protected ResponseEntity<Failure> CSignInPasswordConfirmException(HttpServletRequest request, CSignUpPasswordConfirmException e) {
        return new ResponseEntity<>(new Failure("비밀번호와 비밀번호 확인의 값이 다릅니다."), HttpStatus.OK);
    }

    @ExceptionHandler(CSignUpEmptyValueException.class)
    protected ResponseEntity<Failure> CSignUpEmptyValueException(HttpServletRequest request, CSignUpEmptyValueException e) {
        return new ResponseEntity<>(new Failure("입력하지 않은 값이 있습니다. 다시 확인해 주세요."), HttpStatus.OK);
    }

    //SignIn
    @ExceptionHandler(CSignInFailedException.class)
    protected ResponseEntity<Failure> CSignInFailedException(HttpServletRequest request, CSignInFailedException e) {
        return new ResponseEntity<>(new Failure("계정이 존재하지 않거나, 비밀번호가 올바르지 않습니다."), HttpStatus.OK);
    }

    //User 조회 오류
    @ExceptionHandler(CUserNotFoundException.class)
    protected ResponseEntity<Failure> CUserNotFoundException(HttpServletRequest request, CUserNotFoundException e) {
        return new ResponseEntity<>(new Failure("해당 이메일을 가진 계정이 존재하지 않습니다."), HttpStatus.OK);
    }
}
