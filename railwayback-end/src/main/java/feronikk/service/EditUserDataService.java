package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.EditingDataDto;
import feronikk.entity.User;
import feronikk.repository.UserRepository;
import feronikk.repository.WorkPlaceRepository;
import feronikk.repository.WorkinTimesNameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EditUserDataService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    WorkPlaceRepository workPlaceRepository;

    @Autowired
    WorkinTimesNameRepository workinTimesNameRepository;

    public ApiResponse editDataUser(Long user_id, EditingDataDto editingDataDto) {
//        Optional<User> user = userRepository.findById(user_id);
//        if (!editingDataDto.getPassword().equals(editingDataDto.getPrePassword()))
//            return new ApiResponse("Passwords not match",false);
//        if (!user.isPresent())
//            return new ApiResponse("not found",false);
//        if (userRepository.existsByUsername(editingDataDto.getUsername()))
//            return new ApiResponse("Choose another userame",false);
//        if (userRepository.existsByTableNumeber(editingDataDto.getTableNumber()))
//            return new ApiResponse("Choose another table number",false);
//        User getUser = user.get();
//        if (!editingDataDto.getUsername().equals(""))
//            getUser.setUsername(editingDataDto.getUsername());
//        if (!editingDataDto.getPassword().equals("")) {
//            getUser.setPassword(editingDataDto.getPassword());
//            getUser.setPasswordToShow(editingDataDto.getPassword());
//        }
//        if (!editingDataDto.getFullName().equals(""))
//            getUser.setFullname(editingDataDto.getFullName());
//        if(!(editingDataDto.getDateOfBirth() == null))
//            getUser.setAge(editingDataDto.getDateOfBirth());
//        if (!(editingDataDto.getTableNumber() <= 0))
//            getUser.setTableNumeber(editingDataDto.getTableNumber());
//        if (!(editingDataDto.getGradeNumber() <= 0))
//            getUser.setGradeNumber(editingDataDto.getGradeNumber());
//        if (!(editingDataDto.getWorkPlace_id() <= 0))
//            getUser.setWorkPlace(workPlaceRepository.findById(editingDataDto.getWorkPlace_id()).orElseThrow(()-> new ResourseNotFoundExeption("not found")));
//        if (!(editingDataDto.getWorkingTime_id() <= 0))
//            getUser.setWorkingTime(editingDataDto.getWorkingTime_id());
//        userRepository.save(getUser);
        return new ApiResponse("saved",true);
    }

    public ApiResponse getUserByid(Long user_id) {
        Optional<User> user = userRepository.findById(user_id);
        if (user.isPresent())
            return new ApiResponse("User",true,user.get());
        return new ApiResponse("Error",false);
    }
}
