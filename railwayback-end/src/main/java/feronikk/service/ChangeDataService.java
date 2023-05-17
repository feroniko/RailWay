package feronikk.service;

import feronikk.apiResponse.ApiResponse;
import feronikk.appConstants.AppConstants;
import feronikk.dataTranformationObj.DataDto;
import feronikk.entity.User;
import feronikk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class     ChangeDataService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    private ApiResponse getApiResponse(DataDto dataDto, Optional<User> optionalUser) {
        if (userRepository.existsByUsername(dataDto.getUsername()))
            return new ApiResponse("Please choose another username",false);
        if (!optionalUser.isPresent()) {
            return new ApiResponse("Error",false);
        }
        User user = optionalUser.get();
        if (dataDto.getUsername() != null)
            user.setUsername(dataDto.getUsername());
        if (dataDto.getPassword() != null)
            user.setPassword(passwordEncoder.encode(dataDto.getPassword()));
        userRepository.save(user);
        return new ApiResponse("Saved",true);
    }

    public ApiResponse changeData(DataDto dataDto) {

        return null;
    }


    public ApiResponse changeDataOwner(DataDto dataDto) {
        return null;
    }

    public User getDataOfAdmin() {
        return null;
    }



    public User getDataOfOwner() {
        return null;
    }
}


