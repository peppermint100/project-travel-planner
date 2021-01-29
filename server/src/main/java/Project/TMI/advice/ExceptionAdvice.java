package Project.TMI.advice;

import Project.TMI.advice.exception.*;
import Project.TMI.model.Failure;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    //인증 받지 않은 사람이 요청을 했을 때
    @ExceptionHandler(CAuthenticationEntryPointException.class)
    public ResponseEntity<Failure> CAuthenticationEntryPointException(HttpServletRequest request, CAuthenticationEntryPointException e) {
        return new ResponseEntity<>(new Failure("인증에 실패 하였습니다."), HttpStatus.OK);
    }

    //인증을 받았으나 해당 요청에 대한 권한이 없을 때 발생
    @ExceptionHandler(CAccessDeniedException.class)
    public ResponseEntity<Failure> CAccessDeniedException(HttpServletRequest request, CAccessDeniedException e) {
        return new ResponseEntity<>(new Failure("접근 권한이 없습니다."), HttpStatus.OK);
    }

    //SignUp
    @ExceptionHandler(CPasswordConfirmException.class)
    protected ResponseEntity<Failure> CSignInPasswordConfirmException(HttpServletRequest request, CPasswordConfirmException e) {
        return new ResponseEntity<>(new Failure("비밀번호와 비밀번호 확인의 값이 다릅니다."), HttpStatus.OK);
    }

    //이미 존재하는 이메일.
    @ExceptionHandler(CSignUpEmailExistException.class)
    protected ResponseEntity<Failure> CSignUpEmailExistException(HttpServletRequest request, CSignUpEmailExistException e) {
        return new ResponseEntity<>(new Failure("이미 존재하는 이메일 입니다."), HttpStatus.OK);
    }

    @ExceptionHandler(CEmptyValueException.class)
    protected ResponseEntity<Failure> CSignUpEmptyValueException(HttpServletRequest request, CEmptyValueException e) {
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
        return new ResponseEntity<>(new Failure("해당 유저아이디를 가진 계정이 존재하지 않습니다."), HttpStatus.OK);
    }

    //비밀번호 불일치 오류
    @ExceptionHandler(CPasswordDisMatchException.class)
    protected ResponseEntity<Failure> CPasswordDisMatchException(HttpServletRequest request, CPasswordDisMatchException e) {
        return new ResponseEntity<>(new Failure("현재 비밀번호가 일치하지 않습니다."), HttpStatus.OK);
    }

    @ExceptionHandler(CPasswordNotInputException.class)
    protected ResponseEntity<Failure> CPasswordNotInputException(HttpServletRequest request, CPasswordNotInputException e) {
        return new ResponseEntity<>(new Failure("회원정보를 변경하려면 비밀번호를 입력 해주세요."), HttpStatus.OK);
    }

    //========================================================================================================================================
    //========================================================================================================================================
    //Plan

    //Plan 조회 오류
    @ExceptionHandler(CPlanNotFoundException.class)
    protected ResponseEntity<Failure> CPlanNotFoundException(HttpServletRequest request, CPlanNotFoundException e) {
        return new ResponseEntity<>(new Failure("해당 Plan을 찾을 수 없습니다."), HttpStatus.OK);
    }

    //Plan 조회 오류
    @ExceptionHandler(CPlanAlreadySharedExcption.class)
    protected ResponseEntity<Failure> CPlanAlreadySharedExcption(HttpServletRequest request, CPlanAlreadySharedExcption e) {
        return new ResponseEntity<>(new Failure("해당 회원에게 이미 공유된 계획입니다."), HttpStatus.OK);
    }

    //Plan 조회 오류
    @ExceptionHandler(CPlanNotSharedMeException.class)
    protected ResponseEntity<Failure> CPlanNotSharedMeException(HttpServletRequest request, CPlanNotSharedMeException e) {
        return new ResponseEntity<>(new Failure("자신에게 Plan을 공유할 수 없습니다."), HttpStatus.OK);
    }
}
