package Project.TMI.service;

import Project.TMI.controller.dto.SignUpDto;
import Project.TMI.entity.User;
import Project.TMI.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserJpaRepository userJpaRepository;

    @Transactional
    public void userSave(SignUpDto signUpDto){
        userJpaRepository.save(signUpDto.toEntity());
    }

    //email을 이용한 유저 정보 조회
    public Optional<User> findOneUserByEmail(String email){ return userJpaRepository.findByEmail(email); }
}
