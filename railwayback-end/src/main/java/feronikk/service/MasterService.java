package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.appConstants.AppConstants;
import feronikk.dataTranformationObj.   MasterDto;
import feronikk.entity.Attachment;
import feronikk.entity.User;
import feronikk.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MasterService {

    final
    PasswordEncoder passwordEncoder;
    final
    UserRepository userRepository;
    final
    AttachmentService attachmentService;

    final
    WorkPlaceRepository workPlaceRepository;
    final
    RoleRepository roleRepository;

    final
    AttachmentRepositroy attachmentRepositroy;

    @Autowired
    WorkinTimesNameRepository workinTimesNameRepository;

    public MasterService(PasswordEncoder passwordEncoder, UserRepository userRepository, AttachmentService attachmentService, WorkPlaceRepository workPlaceRepository, RoleRepository roleRepository, AttachmentRepositroy attachmentRepositroy) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.attachmentService = attachmentService;
        this.workPlaceRepository = workPlaceRepository;
        this.roleRepository = roleRepository;
        this.attachmentRepositroy = attachmentRepositroy;
    }

    public ApiResponse addMaster( MasterDto masterDto) {
        if (masterDto.getUsername().equals("") )
            return new ApiResponse("Please fill username",false);
        if ( masterDto.getPassword().equals(""))
            return new ApiResponse("Please fill Password",false);
        if (masterDto.getPrePassword().equals("") )
            return new ApiResponse("Please fill prePassword",false);
        if(masterDto.getFullname().equals(""))
            return new ApiResponse("Please fill fullname",false);
        if (masterDto.getTableNumeber() <= 0 )
            return new ApiResponse("Please fill table number",false);
        if (masterDto.getGradeNumber() <= 0)
            return new ApiResponse("Please fill grade number",false);
        if (userRepository.existsByUsername(masterDto.getUsername()))
            return new ApiResponse("This kind of username already in use",false);
        if (!masterDto.getPassword().equals(masterDto.getPrePassword()))
            return new ApiResponse("Passwords not match",false);
        if (userRepository.existsByTableNumeber(masterDto.getTableNumeber()))
            return new ApiResponse("Table number already in use",false);
       if (masterDto.getPhoneNumber().equals(""))
           return new ApiResponse("Please fill phone Number",false);
       if (userRepository.existsByPhoneNumber(masterDto.getPhoneNumber()))
           return new ApiResponse("Please choose another phone number",false);
        User user = new User(
                masterDto.getFullname(),
                masterDto.getUsername(),
                masterDto.getPassword(),
                masterDto.getAge(),
                passwordEncoder.encode(masterDto.getPassword()),
                roleRepository.findByName(AppConstants.MASTER),
                null,
                masterDto.getTableNumeber(),
                masterDto.getGradeNumber(),
               workPlaceRepository.findById(masterDto.getWorkPlace_id()).orElseThrow(() -> new ResourseNotFoundExeption("Not found")),
                workinTimesNameRepository.findById(masterDto.getWorkingTime()).orElseThrow(()-> new ResourseNotFoundExeption("not")),
                4,
                true,
                masterDto.getPhoneNumber()
        );
        userRepository.save(user);
        return new ApiResponse("Saved",true);
    }




    public ApiResponse getAllMasters1() {
        List<User> users = userRepository.findByRoleHashId(4);
        return new ApiResponse("User",true,users);
    }


}


