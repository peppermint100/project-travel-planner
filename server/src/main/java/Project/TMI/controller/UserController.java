package Project.TMI.controller;

import Project.TMI.advice.exception.*;
import Project.TMI.config.security.JwtTokenProvider;
import Project.TMI.domain.dto.MailDto;
import Project.TMI.domain.dto.SignUpDto;
import Project.TMI.domain.User;
import Project.TMI.domain.dto.UpdateUserInfoDto;
import Project.TMI.model.*;
import Project.TMI.service.MailService;
import Project.TMI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    //1. 연결확인
    @GetMapping(value = "/check-connection")
    public ResponseEntity<Success> checkConnection() {
        return new ResponseEntity<>(new Success(true, "연결 성공"), HttpStatus.OK);
    }


    //2. 회원가입
    @PostMapping(value = "/signup")
    public ResponseEntity<Success> signUp(@RequestParam String email, @RequestParam String password,
                                          @RequestParam String passwordConfirm, @RequestParam String name) {

        //입력 정보 중 비어있는 값이 있을 때
        if (email.isEmpty() || name.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty()) {
            throw new CEmptyValueException();
        }

        //입력한 비밀번호 두가지가 다를 때
        if (!password.equals(passwordConfirm)) {
            throw new CPasswordConfirmException();
        }

        userService.userSave(
                SignUpDto.builder()
                        .email(email)
                        .password(passwordEncoder.encode(password))
                        .name(name)
                        .roles(Collections.singletonList("ROLE_USER"))
                        .build()
        );

        return new ResponseEntity<>(new Success(true, "가입 성공"), HttpStatus.OK);
    }

    //3. 로그인
    @PostMapping(value = "/signin")
    public ResponseEntity<SignInSuccess> signIn(@RequestParam String email, @RequestParam String password) {

        //빈값확인
        if (email.isEmpty() || password.isEmpty()) {
            throw new CEmptyValueException();
        }

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

    //4. 로그인 유지
    @PostMapping(value = "/me")
    public ResponseEntity<MeSuccess> me() {
        // SecurityContext에서 인증받은 회원의 정보를 얻어온다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userService.findOneUserByEmail(email).orElseThrow(CUserNotFoundException::new);

        MeSuccess meSuccess = MeSuccess.builder()
                .success(true)
                .msg("정보조회 성공")
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .build();

        return new ResponseEntity<>(meSuccess, HttpStatus.OK);
    }

    //5. 임시비밀번호 생성 및 메일 전송
    @PostMapping(value = "/sendMailPassword")
    public ResponseEntity<Success> sendMailPassword(@RequestParam String name, @RequestParam String email) {

        //비어있는 값을 확인
        if (name.isEmpty() || email.isEmpty()) {
            throw new CEmptyValueException();
        }

        //이메일부터 탐색 만약 null일 경우 CUserNotFoundException
        User user = userService.findOneUserByEmail(email).orElseThrow(CUserNotFoundException::new);

        //이메일 탐색이후 이름비교 만약 다를경우 CUserNotFoundException
        if (!user.getName().equals(name)) {
            throw new CUserNotFoundException();
        }

        //새로운 비밀번호를 생성해 Dto에 담아줍니다.
        String newPassword = userService.createNewPassword();
        UpdateUserInfoDto userInfoDto = UpdateUserInfoDto.builder()
                .password(newPassword)
                .name(name)
                .build();

        //비밀번호 변경 실행
        userService.userInfoUpdate(user.getUserId(), userInfoDto);

        //이메일 메시지 생성
        MailDto mailDto = new MailDto();
        mailDto.setAddress(email);
        mailDto.setTitle("[travel planner] 임시 비밀번호입니다.");
        mailDto.setMessage("임시 비밀번호는 " + newPassword + " 입니다.");

        //이메일을 전송합니다.
        mailService.mailSend(mailDto);

        return new ResponseEntity<>(new Success(true, "임시비밀번호 이메일 전송 성공"), HttpStatus.OK);
    }

    //6. 회원정보 변경,
    @PostMapping(value = "/updateUserInfo")
    public ResponseEntity<Success> updateUserInfo(@RequestParam(defaultValue = "0") Long userId, @RequestParam String passwordBefore,
                                                  @RequestParam String password, @RequestParam String passwordConfirm,
                                                  @RequestParam String name) {

        //필수 입력값 들중에 빈 칸이 있을 경우
        if (passwordBefore.isEmpty() || name.isEmpty() || userId == 0) {
            throw new CEmptyValueException();
        }

        //만약 새로운 비밀번호 입력값들 중 하나라도 입력이 되어 있다면 ==============================
        if (!password.isEmpty() || !passwordConfirm.isEmpty()) {

            //비밀번호 입력값중 하나의 값만 입력이 되어 있을 때 오류
            if ((!password.isEmpty() && passwordConfirm.isEmpty()) || (password.isEmpty() && !passwordConfirm.isEmpty())) {
                throw new CEmptyValueException();
            }

            //새로 변경할 비밀번호 두가지가 다를 경우 오류
            if (!password.equals(passwordConfirm)) {
                throw new CPasswordConfirmException();
            }

            //빈값이 없으면 Id를 이용해 유저 정보를 가져옵니다.
            User user = userService.findById(userId).orElseThrow(CUserNotFoundException::new);

            //현재 비밀번호가 틀렸을 경우 오류, 기본으로 값이 입력되어 있을 것이라 발생하기 쉽지 않지만 일단 두었습니다.
            if (!passwordEncoder.matches(passwordBefore, user.getPassword())) {
                throw new CPasswordDisMatchException();
            }
            //회원정보 변경 진행
            UpdateUserInfoDto userInfoDto = UpdateUserInfoDto.builder()
                    .password(password)
                    .name(name)
                    .build();
            userService.userInfoUpdate(userId, userInfoDto);

            return new ResponseEntity<>(new Success(true, "회원정보(비밀번호포함) 변경 성공"), HttpStatus.OK);
        }
        //이름만 변경이 되고 비밀번호 관련값은 입력하지 않았을 경우 ==============================
        //빈값이 없으면 Id를 이용해 유저 정보를 가져옵니다.
        User user = userService.findById(userId).orElseThrow(CUserNotFoundException::new);

        //현재 비밀번호가 틀렸을 경우 오류, 기본으로 값이 입력되어 있을 것이라 발생하기 쉽지 않지만 일단 두었습니다.
        if (!passwordEncoder.matches(passwordBefore, user.getPassword())) {
            throw new CPasswordDisMatchException();
        }

        //회원정보 변경 진행
        UpdateUserInfoDto userInfoDto = UpdateUserInfoDto.builder()
                .password(passwordBefore)
                .name(name)
                .build();
        userService.userInfoUpdate(userId, userInfoDto);

        return new ResponseEntity<>(new Success(true, "회원정보 변경 성공"), HttpStatus.OK);
    }

}


