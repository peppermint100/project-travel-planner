package Project.TMI.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    @Value("${spring.jwt.secret}")
    private String secretKey;

    //토큰 유효시간 설정
    private long tokenValidMilisecond = 1000L * 60 * 120; //토큰 유효시간 2시간으로 설정

    private final UserDetailsService userDetailsService;

    @PostConstruct //암호화된 secretKey 생성
    protected void init() { secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());}

    //jwt 토큰 생성
    public String createToken(String userPk, List<String> roles){

        Claims claims = Jwts.claims().setSubject(userPk); //User의 pk값을 가지고 jwt claim을 생성
        claims.put("roles", roles);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)  //claim 데이터
                .setIssuedAt(now)   //token 발행시간
                .setExpiration(new Date(now.getTime() + tokenValidMilisecond)) //token 유효시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) //암호화 알고리즘 선택, secret값 세팅
                .compact();
    }

    //jwt 토큰으로 인증정보 조회
    public Authentication getAuthentication(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    //jwt 토큰에서 회원구별 정보 추출
    public String getUserPk(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    //Request의 Header에서 token 파싱 : "X-AUTH-TOKEN: jwt토큰"
    public String resolveToken(HttpServletRequest req) { return req.getHeader("X-AUTH-TOKEN"); }

    //jwt 토큰의 유효성과 만료일자 확인
    public boolean validateToken(String jwtToken){
        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
