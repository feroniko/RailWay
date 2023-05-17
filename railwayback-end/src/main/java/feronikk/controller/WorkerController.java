package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.MainDataOfUser;
import feronikk.dataTranformationObj.UserDto;
import feronikk.entity.User;
import feronikk.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/worker")
@CrossOrigin(value = "*", maxAge = 3600)
public class WorkerController {

    @Autowired
    WorkerService workerService;




    @PreAuthorize("hasAuthority('CAN_DO_MASTER_ROLE')")
    @PostMapping("/addWorker")
    public HttpEntity<?> addingDataOfWorker(@RequestBody UserDto userDto){
        ApiResponse apiResponse = workerService.addWorker(userDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAuthority('CAN_DO_MASTER_ROLE')")
    @GetMapping("/get_all-workersList")
    public HttpEntity<?> getAllWorkers(){
        ApiResponse apiResponse = workerService.getAllWorkers();
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAuthority('CAN_DO_MASTER_ROLE')")
    @GetMapping("/get_workelistByWorkingTime/{master_id}")
    public HttpEntity<?> getAllWorkersByWorkingTime(@PathVariable Long master_id){
        ApiResponse apiResponse = workerService.getAllWorkerListByWorkingTime(master_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }




}
