package feronikk.service;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.WorkPlaceDto;
import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import feronikk.entity.WorkinTimesName;
import feronikk.repository.RoleRepository;
import feronikk.repository.UserRepository;
import feronikk.repository.WorkPlaceRepository;
import feronikk.repository.WorkinTimesNameRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class WorkPlaceService {

    final WorkPlaceRepository workPlaceRepository;
    final PasswordEncoder passwordEncoder;

    final
    UserRepository userRepository;

    final
    RoleRepository roleRepository;

    final
    WorkinTimesNameRepository workinTimesNameRepository;



    public WorkPlaceService(WorkPlaceRepository workPlaceRepository, PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository, WorkinTimesNameRepository workinTimesNameRepository) {
        this.workPlaceRepository = workPlaceRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.workinTimesNameRepository = workinTimesNameRepository;
    }

    // adding workplace
    public ApiResponse addWorkPlace(WorkPlaceDto workPlaceDto)  throws NullPointerException{
        // checking name of workplace and username is exsists  or not and passwords
        if (workPlaceDto.getWorkPlaceName() == ""  || workPlaceDto.getWorkinTimesNames().isEmpty())
            return new ApiResponse("Please fill everything",false);
        WorkinTimesName workinTimesNames = new WorkinTimesName();
        if (workPlaceRepository.existsByNameaOfWorkPlace(workPlaceDto.getWorkPlaceName())) {
            return new ApiResponse("Please choose another name",false);
        }
        for (String workingTimeList : workPlaceDto.getWorkinTimesNames()) {
            if (workingTimeList.isEmpty())
                return new ApiResponse("Please fill every thing",false);
        }

        String prevWorkingTimeName = " ";
        for (String workinTimesNamed : workPlaceDto.getWorkinTimesNames()) {
            if (workinTimesNameRepository.existsByNameOfWorkingTiime(workinTimesNamed)) {
                return new ApiResponse("You have got already working time name ",false);
            }
            if (prevWorkingTimeName .equals(workinTimesNamed)) {
                return new ApiResponse("Please choose another working time name you dublicate names",false);
            }
            prevWorkingTimeName=workinTimesNamed;

        }
        // Creating workplace
        WorkPlace workPlace = new WorkPlace();
        workPlace.setNameaOfWorkPlace(workPlaceDto.getWorkPlaceName());

        workPlaceRepository.save(workPlace);
        Long workPlaceId = workPlace.getId();
        Optional<WorkPlace> workPlaceRepositoryById = workPlaceRepository.findById(workPlaceId);
        WorkPlace workPlace1 = workPlaceRepositoryById.get();
        for (String workinTimesName : workPlaceDto.getWorkinTimesNames()) {

            workinTimesNames = new WorkinTimesName();
            workinTimesNames.setNameOfWorkingTiime(workinTimesName);
            workinTimesNames.setWorkPlace(workPlace1);
            workinTimesNameRepository.save(workinTimesNames);
        }




        return new ApiResponse("Saved workplace",true);
    }


    // editing workplace
    public ApiResponse editWorkPlace(WorkPlaceDto workPlaceDto, Long workPlaceId) {
//        Optional<WorkPlace> optionalWorkPlace = workPlaceRepository.findById(workPlaceId);
//       if (!optionalWorkPlace.isPresent())
//           return new ApiResponse("You do not have this kind of workplace",false) ;
//
//       if (workPlaceDto.getWorkPlaceName() .equals("")  )
//            return new ApiResponse("Please fill eveything",false);
//        List<String> workinTimesNames = workPlaceDto.getWorkinTimesNames();
//        for (String workinTimesName : workinTimesNames) {
//            if (workinTimesName.isEmpty())
//                return new ApiResponse("Please fill eveything",false);
//            if (workinTimesNameRepository.existsByNameOfWorkingTiime(workinTimesName))
//                return new ApiResponse("Please choose another workin time",false);
//        }
//        WorkPlace workPlace = optionalWorkPlace.get();
//
//        workPlace.setNameaOfWorkPlace(workPlaceDto.getWorkPlaceName());
//
//        WorkPlace savedWorkPlace = workPlaceRepository.save(workPlace);
//
//        for (String timesName : workinTimesNames) {
//            List<WorkinTimesName> byWorkPlace_id = workinTimesNameRepository.findByWorkPlace_id(savedWorkPlace.getId());
//            for (WorkinTimesName workinTimesName : byWorkPlace_id) {
//                workinTimesName.setWorkPlace(savedWorkPlace);
//                workinTimesName.setNameOfWorkingTiime(workPlaceDto.getWorkPlaceName());
//            }
//        }
        return new ApiResponse("Updated work place data",true);
    }

    public ApiResponse getAllWorkPlaces() {
        List<WorkPlace> workPlaceList = workPlaceRepository.findAll();
        if (workPlaceList.isEmpty())
            return new ApiResponse("You do not have workplaces",false);
        List<List<WorkinTimesName>> workingTimesNames = new ArrayList<>();
        for (WorkPlace workPlace : workPlaceList) {
            List<WorkinTimesName> workinTimesNames = workinTimesNameRepository.findAllByWorkPlace(workPlace);
            workingTimesNames.add(workinTimesNames);
        }
        return new ApiResponse("Workplaces",true,workPlaceList,workingTimesNames,null);
    }


    public ApiResponse deleteWorkSpace(Long workPlace_id) {
        workPlaceRepository.deleteById(workPlace_id);
        return new ApiResponse("Work place deleted",true);
    }


    public ApiResponse getOneWorkPlace(Long workPlace_id) {
        Optional<WorkPlace> workPlaceOptional = workPlaceRepository.findById(workPlace_id);
        if (!workPlaceOptional.isPresent())
            return new ApiResponse("WorkPlace not found",false);
        WorkPlace workPlace = workPlaceOptional.get();
        List<WorkinTimesName> worKingTimesNameList = workinTimesNameRepository.findByWorkPlace_id(workPlace_id);
        List<User> allUsers = userRepository.findAllByWorkPlace(workPlace);
        return new ApiResponse("WorkPlace",true,workPlace,worKingTimesNameList);

    }

    public ApiResponse getWorkingTimes(String workPlaceName) {

        return null;
    }
}
