package feronikk.tokenProvider;

import feronikk.entity.Role;
import feronikk.entity.enumuration.Permissions;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class TokenProvider {

    private static final  long expireTime = 1000 * 60 * 60 * 24;
    private static final  String secretKey  = "BuSecretKeyXechkimBilmasin42343243@!312312321sdfefefefefv423432432#@!@$$#!E";

    public String generateToken(String username, List<Permissions> permissions){
        Date expireDate = new Date(System.currentTimeMillis() + expireTime);
        String token = Jwts
                .builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .claim("permissions",permissions)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
        return token;
    }

    public String getUsernameFromToken(String token){
      try {
          String username = null;
          username = Jwts
                  .parser()
                  .setSigningKey(secretKey)
                  .parseClaimsJws(token)
                  .getBody()
                  .getSubject();
          return username;
      }catch (Exception e){
          return null;
      }
    }
}
