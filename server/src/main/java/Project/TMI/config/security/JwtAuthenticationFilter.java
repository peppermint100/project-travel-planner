package Project.TMI.config.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtAuthenticationFilter extends GenericFilterBean {

    private JwtTokenProvider jwtTokenProvider;

    //jwt Provider 주입
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    //Request로 들어오는 Jwt Token의 유효성을 검증(jwtTokenProvider.validateToken)하는 filter를 filterChain에 등록합니다.
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        // jwtTokenProvider.resolveToken 를 이용해 header에 있는 토큰을 꺼냄
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

        // 토큰이 존재하고, jwtTokenProvider.validateToken 를 이용해 유효성이 검중되었다면
        if (token != null && jwtTokenProvider.validateToken(token)) {

            Authentication auth = jwtTokenProvider.getAuthentication(token);

            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }
}
