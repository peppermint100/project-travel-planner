package Project.TMI.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //jwtTokenProvider 의존성 주입
    private final JwtTokenProvider jwtTokenProvider;

    //jpa 는 실행을 했지만 권한이 없어서 return 안됨
    //이거 문제가 아님
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable() //기본 security 설정 사용X
                .csrf().disable()      //csrf 보안 설정 사용X
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //jwt token으로 인증할 것이므로 세션이 필요X 생성안함

                .and()
                .authorizeRequests()
//                 //user부분 작업 끝나면 이걸로 변경해야할듯(로그인, 회원가입, 접속체크, 비밀번호찾기)
//                .antMatchers("/user/signup","/user/signin","/user/check-connection","/user/sendMailPassword").permitAll()
                .antMatchers("/user/**","/plan/**","/detail/**").permitAll() //현재는 테스트의 편리함을 위해 이렇게 사용
                .antMatchers(HttpMethod.GET, "/exception/**").permitAll() //추가적으로 Get요청을 허용해야 할 경우 여기에 추가해줍니다. "test"처럼
                .anyRequest().hasRole("USER")

                .and()
                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler()) //accessDeniedHandler, 권한이 없는 접근일 때에 발생시킬 동작
                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint()) //authenticationEntryPoint, 인증과정에서 실패하거나, 인증헤더를 넘겨주지 않았을때 발생시킬 동작

                .and()                  //JwtAuthenticationFilter jwt 토큰을 검증하기 위한 페이지, jwtTokenProvider 받아온 토큰을 정제해서 JwtAuthenticationFilter에 넘겨줌,
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class); //UsernamePasswordAuthenticationFilter 로그인에서 인증을 처리하는 필터.

    }
}
