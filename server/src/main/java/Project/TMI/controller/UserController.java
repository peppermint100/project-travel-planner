package Project.TMI.controller;

import Project.TMI.advice.exception.CSignUpEmptyValueException;
import Project.TMI.advice.exception.CSignInFailedException;
import Project.TMI.advice.exception.CSignUpPasswordConfirmException;
import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.config.security.JwtTokenProvider;
import Project.TMI.domain.dto.SignUpDto;
import Project.TMI.domain.User;
import Project.TMI.model.*;
import Project.TMI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    //서버가 실행 중인지 체크
    @GetMapping(value = "/check-connection")
    public ResponseEntity<Success> checkConnection() {
        return new ResponseEntity<>(new Success(true, "연결 성공"), HttpStatus.OK);
    }

    //회원가입
    @PostMapping(value = "/signup")
    public ResponseEntity<Success> signUp(@RequestParam String email, @RequestParam String password,
                                          @RequestParam String passwordConfirm, @RequestParam String name, @RequestParam String phone) {

        //입력 정보 중 비어있는 값이 있을 때
        if (email.isEmpty() || name.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty() || phone.isEmpty()) {
            throw new CSignUpEmptyValueException();
        }

        //입력한 비밀번호 두가지가 다를 때
        if (!password.equals(passwordConfirm)) {
            throw new CSignUpPasswordConfirmException();
        }

        userService.userSave(
                SignUpDto.builder()
                        .email(email)
                        .password(passwordEncoder.encode(password))
                        .name(name)
                        .phone(phone)
                        .roles(Collections.singletonList("ROLE_USER"))
                        .build()
        );

        return new ResponseEntity<>(new Success(true, "가입 성공"), HttpStatus.OK);
    }

    //로그인
    @PostMapping(value = "/signin")
    public ResponseEntity<SignInSuccess> signIn(@RequestParam String email, @RequestParam String password) {

        System.out.println(email + password);

        //만약 email로 조회가능한 User가 존재하지 않는다면 CSignInFailedException 발생시킵니다. orElseThrow는 반환값이 Optional일 때 사용할 수 있는 에러처리 입니다.
        User user = userService.findOneUserByEmail(email).orElseThrow(CSignInFailedException::new);

        //만약 비밀번호가 틀렸을 때에도 위와 동일하게 CSignInFailedException 를 발생시킵니다.
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new CSignInFailedException();
        }

        //로그인한 정보로 토큰 생성
        String token = jwtTokenProvider.createToken(String.valueOf(user.getUserId()), user.getRoles());

        return new ResponseEntity<>(new SignInSuccess(true, "로그인 성공", token), HttpStatus.OK);
    }

    //내 정보 조회
    @PostMapping(value = "/me")
    public ResponseEntity<MeSuccess> myInfo() {
        // SecurityContext에서 인증받은 회원의 정보를 얻어온다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userService.findOneUserByEmail(email).orElseThrow(CUserNotFoundException::new);

        MeSuccess meSuccess = MeSuccess.builder()
                .success(true)
                .msg("정보 조회 성공")
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .build();

        return new ResponseEntity<>(meSuccess, HttpStatus.OK);
    }

}
