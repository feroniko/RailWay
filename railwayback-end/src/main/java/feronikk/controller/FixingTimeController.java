package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.FixingTimeDto;
import feronikk.dataTranformationObj.FixingTimeHelperDto;
import feronikk.service.FixingTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/addFixingTime")
@CrossOrigin(value = "*", maxAge = 3600)
public class FixingTimeController {

    @Autowired
    FixingTimeService fixingTimeService;


    @PostMapping("/addFixingTime/{driver_id}")
    public HttpEntity<?> addFixingTime(@PathVariable Long driver_id, @RequestBody FixingTimeDto fixingTimeDto){
        ApiResponse apiResponse = fixingTimeService.addFixingTimeService(driver_id,fixingTimeDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @PostMapping("/attachUsertoFixingType/{fixingType_id}/{fixingTime_id}")
    public HttpEntity<?> attachUserToFixingType(@RequestBody FixingTimeHelperDto fixingTimeHelperDto, @PathVariable Long fixingType_id, @PathVariable Long fixingTime_id){
        ApiResponse apiResponse = fixingTimeService.attchUserToFixingType(fixingTimeHelperDto,fixingType_id,fixingTime_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/getOneFixingTime/{fixingtime_id}")
    public HttpEntity<?> getOneFixingTime(@PathVariable Long fixingtime_id){
        ApiResponse apiResponse = fixingTimeService.getOneFixingTime(fixingtime_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/getOneFixingTimeHelper/{fixingTime_id}")
    public HttpEntity<?> getOneFixingTimeHelper(@PathVariable Long fixingTime_id){
        ApiResponse apiResponse = fixingTimeService.getOneFixingTimeHelper(fixingTime_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }


}
