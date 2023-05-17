package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.TripDto;
import feronikk.service.TripService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(value = "*", maxAge = 3600)
public class TripController {

    @Autowired
    TripService tripService;

    @PostMapping("/addTrip")
    public HttpEntity<?> addNewTrip(@RequestBody TripDto tripDto){
        ApiResponse apiResponse = tripService.addNewTrip(tripDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/getAllTrips")
    public HttpEntity<?> getAllTrains(){
        ApiResponse apiResponse = tripService.getAllTrips();
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/api/getAllTripsToWorkPlace/{master_id}")
    public HttpEntity<?> getAllTripsToWorkPalce(@PathVariable Long master_id){
        ApiResponse apiResponse = tripService.getAllTripsToWorkPalce(master_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }




}
