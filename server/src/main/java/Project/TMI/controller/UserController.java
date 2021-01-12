package Project.TMI.controller;

import Project.TMI.advice.exception.CEmailSigninFailedException;
import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.advice.exception.PasswordConfirmNotSameException;
import Project.TMI.config.security.JwtTokenProvider;
import Project.TMI.entity.User;
import Project.TMI.model.*;
import Project.TMI.repository.UserJpaRepository;
import Project.TMI.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class WebController {

    private final UserJpaRepository userJpaRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ResponseService responseService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping(value="check-connection") //서버가 실행 중인지 체크
    public ResponseEntity<BasicSuccess> checkConnection(){

        BasicSuccess basicSuccess = BasicSuccess.builder()
                .success(true)
                .msg("success")
                .build();

        return ResponseEntity.ok().body(basicSuccess);
    }

    //회원가입
    @PostMapping(value="signup")
    public ResponseEntity<BasicSuccess> signUp(@RequestParam String email, @RequestParam String password,
                                                @RequestParam String passwordConfirm, @RequestParam String name, @RequestParam String phone){

        if(email.isEmpty() || name.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty() || phone.isEmpty()){
            BasicSuccess basicSuccess = BasicSuccess.builder().success(false).msg("빈 칸을 전부 채워주세요.").build();
            return ResponseEntity.ok().body(basicSuccess);
        }

        //입력한 비밀번호 두가지가 다를 때
        if(!password.equals(passwordConfirm)){
            BasicSuccess basicSuccess = BasicSuccess.builder().success(false).msg("두 비밀번호가 일치하지 않습니다.").build();
            return ResponseEntity.ok().body(basicSuccess);
//            throw new PasswordConfirmNotSameException();
        }

        userJpaRepository.save(
                User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .phone(phone)
                .roles(Collections.singletonList("ROLE_USER"))
                .build());

        BasicSuccess basicSuccess = BasicSuccess.builder()
                .success(true)
                .msg("signUp success")
                .build();

        return ResponseEntity.ok().body(basicSuccess);
    }

    //로그인
    @PostMapping(value="signin")
    public ResponseEntity<SignInSuccess> signIn(@RequestParam String email, @RequestParam String password){

        User user = userJpaRepository.findByEmail(email).orElseThrow(CEmailSigninFailedException::new);
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new CEmailSigninFailedException();
        }

        SignInSuccess signInSuccess = SignInSuccess.builder()
                .success(true)
                .msg("signIn success")
                .token(jwtTokenProvider.createToken(String.valueOf(user.getId()), user.getRoles()))
                .build();

        return ResponseEntity.ok().body(signInSuccess);
    }



    //내정보 조회
    @PostMapping(value="me")
    public ResponseEntity<MeSuccess> myInfo(){
        // SecurityContext에서 인증받은 회원의 정보를 얻어온다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userJpaRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);

        MeSuccess meSuccess = MeSuccess.builder()
                .success(true)
                .msg("myInfo success")
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .build();

        return ResponseEntity.ok().body(meSuccess);
    }

}
