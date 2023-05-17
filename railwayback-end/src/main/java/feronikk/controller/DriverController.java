package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.DriverDto;
import feronikk.service.DriverService;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/driver")
@CrossOrigin(value = "*", maxAge = 3600)
public class DriverController {


    final
    DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping("/addDriver")
    public HttpEntity<?> addDriver(@RequestBody  DriverDto driverDto){
        ApiResponse apiResponse = driverService.addDriver(driverDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/get_driver")
    public HttpEntity<?> getALlDrivers(){
        ApiResponse apiResponse = driverService.getAllDrivers();
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }
}
