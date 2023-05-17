package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.CategoryOfFixingDto;
import feronikk.service.CatagoryOfFixingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Past;

@RestController
@RequestMapping("/api/fixinTypeCategory")
@CrossOrigin(value = "*", maxAge = 3600)
public class CatagoryOfFixingController {

    final
    CatagoryOfFixingService catagoryOfFixingService;

    public CatagoryOfFixingController(CatagoryOfFixingService catagoryOfFixingService) {
        this.catagoryOfFixingService = catagoryOfFixingService;
    }

    @PreAuthorize("hasAuthority('CAN_DO_MASTER_ROLE')")
    @PostMapping("/addCategoryFixing/{master_id}")
    public HttpEntity<?>    addCategoryOfFixing(@RequestBody CategoryOfFixingDto categoryOfFixingDto, @PathVariable Long master_id){
        ApiResponse apiResponse =catagoryOfFixingService.addCategoryName(categoryOfFixingDto,master_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }


    @GetMapping("/getAllFixinTypes/{master_id}")
    public HttpEntity<?> getAllFixingTypes(@PathVariable Long master_id){
        ApiResponse apiResponse = catagoryOfFixingService.getAllFixingTypes(master_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }


}
