package Project.TMI.service.security;


import Project.TMI.advice.exception.CUserNotFoundException;
import Project.TMI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetails loadUserByUsername(String userPk){
        return userRepository.findById(Long.valueOf(userPk)).orElseThrow(CUserNotFoundException::new);
    }
}
