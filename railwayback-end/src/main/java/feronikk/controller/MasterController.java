package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.MasterDto;
import feronikk.entity.Attachment;
import feronikk.entity.User;
import feronikk.repository.UserRepository;
import feronikk.service.MasterService;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/master")
@CrossOrigin(value = "*", maxAge = 3600)
public class MasterController {

    final
    MasterService masterService;

    final
    UserRepository userRepository;

    public MasterController(MasterService masterService, UserRepository userRepository) {
        this.masterService = masterService;
        this.userRepository = userRepository;
    }


    @PostMapping(value = "/add_master")
    public HttpEntity<?> addMaster(@RequestBody MasterDto masterDto){
        ApiResponse apiResponse = masterService.addMaster(masterDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }





    @PreAuthorize(value = "hasAuthority('CAN_DO_ADMIN_ROLE')")
    @GetMapping("/getMasters")
    public HttpEntity<?> getAllMasters1(){
        ApiResponse apiResponse = masterService.getAllMasters1();
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);

    }





}
