package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.appConstants.AppConstants;
import feronikk.dataTranformationObj.DriverDto;
import feronikk.entity.User;
import feronikk.entity.enumuration.Permissions;
import feronikk.repository.RoleRepository;
import feronikk.repository.UserRepository;
import feronikk.repository.WorkPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@Service
public class DriverService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    AttachmentService attachmentService;

    @Autowired
    WorkPlaceRepository workPlaceRepository;
    public ApiResponse addDriver(DriverDto driverDto) {
        if (driverDto.getUsername().equals("") )
            return new ApiResponse("Please fill username",false);
        if ( driverDto.getPassword().equals(""))
            return new ApiResponse("Please fill Password",false);
        if (driverDto.getPrePassword().equals("") )
            return new ApiResponse("Please fill prePassword",false);
        if(driverDto.getFullname().equals(""))
            return new ApiResponse("Please fill fullname",false);
        if (driverDto.getTableNumeber() <= 0 )
            return new ApiResponse("Please fill table number",false);
        if (driverDto.getGradeNumber() <= 0)
            return new ApiResponse("Please fill grade number",false);
        if (userRepository.existsByUsername(driverDto.getUsername()))
            return new ApiResponse("This kind of username already in use",false);
        if (!driverDto.getPassword().equals(driverDto.getPrePassword()))
            return new ApiResponse("Passwords not match",false);
        if (userRepository.existsByTableNumeber(driverDto.getTableNumeber()))
            return new ApiResponse("Table number already in use",false);
        if (driverDto.getPhoneNumber().equals(""))
            return new ApiResponse("Plaese fill phone Number",false);
        if (userRepository.existsByPhoneNumber(driverDto.getPhoneNumber()))
            return new ApiResponse("Please choose another number",false);
        User user = new User(
                driverDto.getFullname(),
                driverDto.getUsername(),
                driverDto.getPassword(),
                driverDto.getAge(),
                passwordEncoder.encode(driverDto.getPassword()),
                roleRepository.findByName(AppConstants.DRIVER),
                null,
                driverDto.getTableNumeber(),
                driverDto.getGradeNumber(),
                workPlaceRepository.findById(driverDto.getWorkPlace_id()).orElseThrow(() -> new ResourseNotFoundExeption("Not found")),
                null,
                5,
                true,
                driverDto.getPhoneNumber()
        );
        userRepository.save(user);
        return new ApiResponse("Saved",true);
    }

    public ApiResponse getAllDrivers() {
        List<User> byRoleHashId = userRepository.findByRoleHashId(5);
        return new ApiResponse("workers",true,byRoleHashId);
    }
}
