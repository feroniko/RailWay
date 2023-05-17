package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.FixingTypesDto;
import feronikk.service.FixingTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fixingTypes")
@CrossOrigin(value = "*", maxAge = 3600)
public class FixingTypesCOntroller {

    @Autowired
    FixingTypesService fixingTypesService;

    @PostMapping("/add_Fixingtypes/{master_id}")
    public HttpEntity<?> addTypes(@RequestBody FixingTypesDto fixingTypesDto,@PathVariable Long master_id){
        ApiResponse apiResponse = fixingTypesService.addFixingName(fixingTypesDto,master_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/api/getAllNameFixing/{master_id}")
    public HttpEntity<?> getALlFixingNames(@PathVariable Long master_id){
        ApiResponse apiResponse = fixingTypesService.getAllFixingTypes(master_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }


}
