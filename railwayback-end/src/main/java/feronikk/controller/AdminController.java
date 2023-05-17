package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @PreAuthorize("hasAuthority('CAN_DO_ADMIN_ROLE')")
    @GetMapping("/get")
    public ApiResponse getAll(){
        return new ApiResponse("Admin Board",true);
    }
}
