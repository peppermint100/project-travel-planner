package Project.TMI.config.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override //ExceptionController로 요청을 보냄
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException ex) throws IOException{
        response.sendRedirect("/exception/entrypoint");
    }
}
