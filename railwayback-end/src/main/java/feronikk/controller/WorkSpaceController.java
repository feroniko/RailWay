package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.WorkPlaceDto;
import feronikk.service.WorkPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workPlace")
@CrossOrigin(value = "*", maxAge = 3600)
public class WorkSpaceController {

    @Autowired
    WorkPlaceService workPlaceService;



    //add data of workplace
    @PreAuthorize(value = "hasAuthority('CAN_DO_ADMIN_ROLE')")
    @PostMapping(   "/add-workplace")
    public HttpEntity<?> addWorkPlace(@RequestBody WorkPlaceDto workPlaceDto){
        ApiResponse apiResponse = workPlaceService.addWorkPlace(workPlaceDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }


    //edit data of workplace
    @PreAuthorize(value = "hasAuthority('CAN_DO_ADMIN_ROLE')")
    @PutMapping("/edit-workplace/{workPlaceId}")
    public HttpEntity<?> editWorkPlace(@RequestBody WorkPlaceDto workPlaceDto, @PathVariable Long workPlaceId){
        ApiResponse apiResponse = workPlaceService.editWorkPlace(workPlaceDto,workPlaceId);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    //getAll  workplaces

    @GetMapping("/get_workplace")
    public HttpEntity<?> getAllWorkPlaces(){
        ApiResponse apiResponse = workPlaceService.getAllWorkPlaces();
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }






    @GetMapping("/getOneWorkPlace/{workPlace_id}")
    public HttpEntity<?> getOneWorkPlace(@PathVariable Long workPlace_id){
        ApiResponse apiResponse = workPlaceService.getOneWorkPlace(workPlace_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/getWorkingTimes/{workPlaceName}")
    public HttpEntity<?> getWorkingTimes(@PathVariable String workPlaceName){
        ApiResponse apiResponse = workPlaceService.getWorkingTimes(workPlaceName);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }


}
