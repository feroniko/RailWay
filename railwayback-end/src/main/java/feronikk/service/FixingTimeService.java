package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.FixingTimeDto;
import feronikk.dataTranformationObj.FixingTimeHelperDto;
import feronikk.entity.*;
import feronikk.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FixingTimeService {

    @Autowired
    TripRepository tripRepository;

    @Autowired
    FixingNameRepository fixingNameRepository;

    @Autowired
    CategoryNameRepository categoryNameRepository;

    @Autowired
    FixingTimeRepository fixingTimeRepository;

    @Autowired
    FixingTimeHelperRepository fixingTimeHelperRepository;

    @Autowired
    UserRepository userRepository;


    public ApiResponse addFixingTimeService(Long driver_id, FixingTimeDto fixingTimeDto) {
        List<Trips> trips = tripRepository.findAllByUserId(driver_id);
        Trips trips1 = trips.get(trips.size() -1);
        Train train =  trips1.getTrain();
        WorkPlace workPlace = train.getWorkPlace();
        List<String> fixingTypesName = fixingTimeDto.getFixingTypes_id();
        List<FixingTypes > fixingTypes = new ArrayList<>();
        for (String fixingName : fixingTypesName) {
            FixingTypes fixingTypes1 = fixingNameRepository.findByNameOfFixing(fixingName);
            fixingTypes.add(fixingTypes1);
        }
        FixingTime fixingTime = new FixingTime(
                categoryNameRepository.findById(fixingTimeDto.getCategoryOfFixing_id()).orElseThrow(()-> new ResourseNotFoundExeption("not found")),
                train,
                fixingTypes,
                workPlace,
                new Date()
        );
        fixingTimeRepository.save(fixingTime);
        return new ApiResponse("saved",true);
    }

    public ApiResponse getOneFixingTime(Long fixingtime_id) {
        Optional<FixingTime> fixingTime = fixingTimeRepository.findById(fixingtime_id);
        return fixingTime.map(time -> new ApiResponse("FixingTime", true, time)).orElseGet(() -> new ApiResponse("not found", false));
    }

    public ApiResponse attchUserToFixingType(FixingTimeHelperDto fixingTimeHelperDto, Long fixingType_id, Long fixingTime_id) {
        Optional<User> user = userRepository.findById(fixingTimeHelperDto.getUser_id());
        if (!user.isPresent())
            return new ApiResponse("not found",false);
        Optional<FixingTypes> fixingTypes = fixingNameRepository.findById(fixingType_id);
        if (!fixingTypes.isPresent())
            return new ApiResponse("not found",false);
        User user1 = user.get();
        FixingTypes fixingTypes1 = fixingTypes.get();

        Optional<FixingTime> fixingTime = fixingTimeRepository.findById(fixingTime_id);
        if (!fixingTime.isPresent())
            return new ApiResponse("not found",false);
        FixingTime fixingTime1 =  fixingTime.get();
        FixingTimeHelper fixingTimeHelper = new FixingTimeHelper(
                Arrays.asList(user1),
                Arrays.asList(fixingTypes1),
                fixingTime1
        );
        fixingTimeHelperRepository.save(fixingTimeHelper);
        return new ApiResponse("Saved",true);

    }

    public ApiResponse getOneFixingTimeHelper(Long fixingTime_id) {
        Optional<FixingTime> fixingTime = fixingTimeRepository.findById(fixingTime_id);
        if (!fixingTime.isPresent())
            return new ApiResponse("not found",false);
        FixingTimeHelper fixingTimeHelper = fixingTimeHelperRepository.findByFixingTime(fixingTime.get());
        return new ApiResponse("Fixing Time Helper",true,fixingTimeHelper);
    }
}
