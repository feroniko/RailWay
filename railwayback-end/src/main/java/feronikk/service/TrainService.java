package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.FixingTimeDto;
import feronikk.dataTranformationObj.TrainDto;
import feronikk.entity.*;
import feronikk.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TrainService {

    final
    TrainRepository trainRepository;

    final
    WorkPlaceRepository workPlaceRepository;

    final
    PasswordEncoder passwordEncoder;

    final
    AttachmentService attachmentService;

    @Autowired
    TripRepository tripRepository;

    @Autowired
    FixingTimeRepository fixingTimeRepository;
    @Autowired
    FixingNameRepository fixingNameRepository;

    @Autowired
    CategoryNameRepository categoryNameRepository;

    @Autowired
    UserRepository userRepository;

    public TrainService(TrainRepository trainRepository, WorkPlaceRepository workPlaceRepository, PasswordEncoder passwordEncoder, AttachmentService attachmentService) {
        this.trainRepository = trainRepository;
        this.workPlaceRepository = workPlaceRepository;
        this.passwordEncoder = passwordEncoder;
        this.attachmentService = attachmentService;
    }



    public ApiResponse addTrain(TrainDto trainDto) {
        if (trainDto.getName().equals(""))
            return new ApiResponse("Please fill name of train",false);
        if (trainRepository.existsByName(trainDto.getName()))
            return new ApiResponse("Train name  already in use",false);
        Train train = new Train();
        train.setName(trainDto.getName());
        train.setWorkPlace(workPlaceRepository.findById(trainDto.getWorkPlace_id()).orElseThrow(()-> new ResourseNotFoundExeption("not founf")));
        trainRepository.save(train);
        return new ApiResponse("Train saved", true);
    }

    public ApiResponse getAllTrains() {
        List<Train> trains = trainRepository.findAll();
        return new ApiResponse("Trains",true,trains);
    }



    public ApiResponse getAllFixingTimesByWorkPlaceId(Long master_id) {
        Optional<User> user = userRepository.findById(master_id);
        if (!user.isPresent())
            return new ApiResponse("Not found",false);
        User user1 = user.get();
        WorkPlace workPlace = user1.getWorkPlace();
        List<FixingTime> fixingTimeList = new ArrayList<>();
        for (FixingTime fixingTime : fixingTimeRepository.findAllByWorkPlace(workPlace)) {
            fixingTimeList.add(fixingTime);
        }

        return new ApiResponse("FixingTimes",true,fixingTimeList);
    }

    public ApiResponse getById(Long train_id) {
        Optional<Train> train = trainRepository.findById(train_id);
        if (train.isPresent())
            return new ApiResponse("Train",true,train);
        return null;
    }


//    public ApiResponse updateDataTrain(TrainDto trainDto, MultipartFile multipartFile, Long train_id) {
//        Optional<Train> trainOptional = trainRepository.findById(train_id);
//        if (!trainOptional.isPresent())
//            return new ApiResponse("Train not found",false);
//        Train train = trainOptional.get();
//        if ()
//        return null;
//    }
}
