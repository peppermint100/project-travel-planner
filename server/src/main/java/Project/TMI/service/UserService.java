package Project.TMI.service;

import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.domain.dto.UpdatePasswordDto;
import Project.TMI.domain.dto.SignUpDto;
import Project.TMI.domain.User;
import Project.TMI.domain.dto.UpdateUserInfoDto;
import Project.TMI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    //유저 저장
    @Transactional
    public void userSave(SignUpDto signUpDto){
        userRepository.save(signUpDto.toEntity());
    }

    //userId를 이용한 유저 정보 조회
    public Optional<User> findById(Long userId){
        return userRepository.findById(userId);
    }

    //email을 이용한 유저 정보 조회
    public Optional<User> findOneUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    //비밀번호 변경
    @Transactional
    public void userPasswordUpdate(Long userId, UpdatePasswordDto passwordDto){
        //userId를 통해 유저 엔티티를 가져옵니다.
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        //비밀번호를 passwordEncoder이용해 암호화 해줍니다.
        String encodePassword = passwordEncoder.encode(passwordDto.getPassword());
        //비밀번호 변경 실행
        user.updatePassword(encodePassword);
    }

    //유저 정보 변경
    @Transactional
    public void userInfoUpdate(Long userId, UpdateUserInfoDto userInfoDto){
        //userId를 통해 유저 엔티티를 가져옵니다.
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        //유저정보 변경 실행
        user.updateUserInfo(userInfoDto.getName(), userInfoDto.getPhone());
    }

    //임시비밀번호 생성
    public String createNewPassword(){
        String newPassword = UUID.randomUUID().toString();//UUID 생성
        newPassword = newPassword.substring(0,6);//6자리로 잘라냄
        return newPassword;
    }
}
