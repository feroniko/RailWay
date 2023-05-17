package feronikk.controller;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.EditingDataDto;
import feronikk.service.EditUserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/edit_userData")
@CrossOrigin(value = "*", maxAge = 3600)
public class EditUserDataController {

    @Autowired
    EditUserDataService editUserDataService;

    @PutMapping("/editData/{user_id}")
    public HttpEntity<?> editUserData(@PathVariable Long user_id, EditingDataDto editingDataDto){
        ApiResponse apiResponse = editUserDataService.editDataUser(user_id,editingDataDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/getUser/{user_id}")
    public HttpEntity<?> getUserById(@PathVariable Long user_id){
        ApiResponse apiResponse = editUserDataService.getUserByid(user_id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }


}
