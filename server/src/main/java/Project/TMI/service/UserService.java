package Project.TMI.service;

import Project.TMI.domain.dto.SignUpDto;
import Project.TMI.domain.User;
import Project.TMI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void userSave(SignUpDto signUpDto){
        userRepository.save(signUpDto.toEntity());
    }

    //email을 이용한 유저 정보 조회
    public Optional<User> findOneUserByEmail(String email){ return userRepository.findByEmail(email); }
}
