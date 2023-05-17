package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.FixingTimeDto;
import feronikk.dataTranformationObj.TrainDto;
import feronikk.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/train")
@CrossOrigin(value = "*", maxAge = 3600)
public class TrainController {

    @Autowired
    TrainService trainService;

    @PostMapping("/add_train")
    public HttpEntity<?> addTrain(@RequestBody TrainDto trainDto){
        ApiResponse apiResponse = trainService.addTrain(trainDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

//    @PutMapping("/update_train/{train_id}")
//    private HttpEntity<?> updateDataTrain(@PathVariable Long train_id, @RequestPart(value = "trainData") TrainDto trainDto, @RequestPart(value = "file") MultipartFile multipartFile){
//        ApiResponse apiResponse = trainService.updateDataTrain(trainDto,multipartFile,train_id);
//        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
//    }

    @GetMapping("/getAllTrains")
    public HttpEntity<?> getAllTrains(){
        ApiResponse apiResponse = trainService.getAllTrains();
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }



    @GetMapping("/getAllFixingTimes/{master_id}")
    public HttpEntity<?> getAllFixingTimes(@PathVariable Long master_id){
        ApiResponse apiResponse = trainService.getAllFixingTimesByWorkPlaceId(master_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/getById/{train_id}")
    public HttpEntity<?> getById(@PathVariable Long train_id){
        ApiResponse apiResponse = trainService.getById(train_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

}
