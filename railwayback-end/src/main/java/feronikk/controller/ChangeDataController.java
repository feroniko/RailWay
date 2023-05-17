package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.DataDto;

import feronikk.service.ChangeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(value = "*", maxAge = 3600)
public class ChangeDataController {

    @Autowired
    ChangeDataService changeDataService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PreAuthorize("hasAuthority('CAN_DO_OWNER_ROLE')")
    @PutMapping("/change_admin_data")
    public HttpEntity<?> changeDataAdmin(@RequestBody DataDto adminDto){
        ApiResponse apiResponse = changeDataService.changeData(adminDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @PreAuthorize("hasAuthority('CAN_DO_OWNER_ROLE')")
    @PutMapping("/change_owner_data")
    public HttpEntity<?> changeDataOwner(@RequestBody DataDto dataDto){
        ApiResponse apiResponse = changeDataService.changeDataOwner(dataDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }




}
