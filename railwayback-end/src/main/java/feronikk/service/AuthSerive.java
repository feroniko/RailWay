package feronikk.service;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.LoginDto;
import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import feronikk.entity.WorkinTimesName;
import feronikk.entity.enumuration.Permissions;
import feronikk.repository.UserRepository;
import feronikk.repository.WorkinTimesNameRepository;
import feronikk.tokenProvider.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class AuthSerive  implements UserDetailsService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    WorkinTimesNameRepository workinTimesNameRepository;
    @Autowired
    TokenProvider tokenProvider;
    public ApiResponse loginUser(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDto.getUsername(), loginDto.getPassword()
            ));
            User user = (User)authentication.getPrincipal();
            List<Permissions> permissions = user.getRole().getPermissions();
            String token = tokenProvider.generateToken(loginDto.getUsername(),permissions);
            Long id = user.getId();
            WorkPlace workPlace = user.getWorkPlace();
            return new ApiResponse("token",true,permissions,token,id,workPlace);

        }catch (Exception e){
            return new ApiResponse("Username or password incorrect ",false);
        }
    }


    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElse(null);
    }
}
