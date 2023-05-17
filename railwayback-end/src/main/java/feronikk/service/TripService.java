package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.TripDto;
import feronikk.entity.Trips;
import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import feronikk.repository.TrainRepository;
import feronikk.repository.TripRepository;
import feronikk.repository.UserRepository;
import feronikk.repository.WorkPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    TripRepository tripRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TrainRepository trainRepository;

    public  ApiResponse getAllTrips() {
        List<Trips> tripsList =    tripRepository.findAll();
        return new ApiResponse("Trips",true,tripsList);
    }

    public ApiResponse addNewTrip(TripDto tripDto) {
        if (tripDto.getUser_id() == null) {
            return new ApiResponse("Please choose driver", false);
        }
        Trips trips = new Trips();
        trips.setUser(userRepository.findById(tripDto.getUser_id()).orElseThrow(()-> new ResourseNotFoundExeption("User not found")));
        trips.setStartsWith(tripDto.getStartsWith());
        trips.setTrain(trainRepository.findById(tripDto.getTrain_id()).orElseThrow(()-> new ResourseNotFoundExeption("Train Not found")));
        Long user_id = tripDto.getUser_id();
        Optional<User> byId = userRepository.findById(user_id);
        if (!byId.isPresent())
            return new ApiResponse("User not found",false);
        User user = byId.get();
        WorkPlace workPlace = user.getWorkPlace();
        trips.setWorkPlace(workPlace);
        tripRepository.save(trips);
        return new ApiResponse("Saved",true);
    }


    public ApiResponse getAllTripsToWorkPalce(Long master_id) {
        Optional<User> master = userRepository.findById(master_id);
        if (!master.isPresent())
            return new ApiResponse("master not found",false);
        User user = master.get();
        WorkPlace workPlace = user.getWorkPlace();
        List<Trips> tripsList = tripRepository.findAllByWorkPlace(workPlace);
        return new ApiResponse("Trips",true,tripsList);
    }
}
