package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.appConstants.AppConstants;
import feronikk.dataTranformationObj.MainDataOfUser;
import feronikk.dataTranformationObj.UserDto;
import feronikk.entity.User;
import feronikk.entity.WorkinTimesName;
import feronikk.entity.enumuration.Permissions;
import feronikk.repository.RoleRepository;
import feronikk.repository.UserRepository;
import feronikk.repository.WorkPlaceRepository;
import feronikk.repository.WorkinTimesNameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {

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
    @Autowired
    WorkinTimesNameRepository workinTimesNameRepository;


    public ApiResponse addWorker(UserDto userDto) {
        if (userDto.getTableNumeber() > 99999999)
            return new ApiResponse("Please enter low tablenumber",false);
        if (userDto.getWorkPlace_id() <= 0)
            return new ApiResponse("Please add new workplace first of all",false);
        if (userDto.getUsername().equals("") )
            return new ApiResponse("Please fill username",false);
        if ( userDto.getPassword().equals(""))
            return new ApiResponse("Please fill Password",false);
        if (userDto.getPrePassword().equals("") )
            return new ApiResponse("Please fill prePassword",false);
        if(userDto.getFullname().equals(""))
            return new ApiResponse("Please fill fullname",false);
        if (userDto.getTableNumeber() <= 0 )
            return new ApiResponse("Please fill table number",false);
        if (userDto.getGradeNumber() <= 0)
            return new ApiResponse("Please fill grade number",false);
        if (userRepository.existsByUsername(userDto.getUsername()))
            return new ApiResponse("This kind of username already in use",false);
        if (!userDto.getPassword().equals(userDto.getPrePassword()))
            return new ApiResponse("Passwords not match",false);
        if (userRepository.existsByTableNumeber(userDto.getTableNumeber()))
            return new ApiResponse("Table number already in use",false);
        if (userDto.getPhoneNumber().equals(""))
            return new ApiResponse("Please fill phone Number",false);
        if (userRepository.existsByPhoneNumber(userDto.getPhoneNumber()))
            return new ApiResponse("please choose another phone number",false);
        User user = new User(
                userDto.getFullname(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getAge(),
                passwordEncoder.encode(userDto.getPassword()),
                roleRepository.findByName(AppConstants.WORKER),
                null,
                userDto.getTableNumeber(),
                userDto.getGradeNumber(),
                workPlaceRepository.findById(userDto.getWorkPlace_id()).orElseThrow(() -> new ResourseNotFoundExeption("Not found")),
                workinTimesNameRepository.findById(userDto.getWorkingTime()).orElseThrow(()-> new ResourseNotFoundExeption("not")),
                6,
                true,
                userDto.getPhoneNumber()
        );
        userRepository.save(user);
        return new ApiResponse("Saved",true);
    }

    public ApiResponse getWorkerProfile(Long workerId) {
        Optional<User> optionalWorker = userRepository.findById(workerId);
        if (!optionalWorker.isPresent())
            return new ApiResponse("Sorry Error",false);
        return new ApiResponse("User",true,optionalWorker);
    }


    public ApiResponse getAllWorkers() {
        List<User> roleHashId = userRepository.findByRoleHashId(6);
        return new ApiResponse("Users",true,roleHashId);
    }

    public ApiResponse getAllWorkerListByWorkingTime(Long master_id) {
        Optional<User> optionalmaster = userRepository.findById(master_id);
        if (!optionalmaster.isPresent())
            return new ApiResponse("Ypu do not have master",false);
        User user = optionalmaster.get();
        WorkinTimesName workingTime = user.getWorkingTime();
        List<User> users_WorkersList = userRepository.findAllByWorkingTimeAndRoleHashId(workingTime, 6);
        return new ApiResponse("Workers",true,users_WorkersList);
    }


}
