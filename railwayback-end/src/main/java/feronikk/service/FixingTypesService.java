package feronikk.service;

import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.FixingTypesDto;
import feronikk.entity.FixingTypes;
import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import feronikk.repository.FixingNameRepository;
import feronikk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FixingTypesService {

    @Autowired
    FixingNameRepository fixingNameRepository;
    @Autowired
    UserRepository userRepository;
    public ApiResponse addFixingName(FixingTypesDto fixingTypesDto, Long master_id) {
        if (fixingTypesDto.getFixingName().equals(""))
            return new ApiResponse("Please fill inputs",false);
        FixingTypes fixingTypes = new FixingTypes();
        fixingTypes.setNameOfFixing(fixingTypesDto.getFixingName());
        Optional<User> user = userRepository.findById(master_id);
        if (!user.isPresent())
            return new ApiResponse("Not Found",false);
        User user1 = user.get();
        WorkPlace workPlace = user1.getWorkPlace();
        fixingTypes.setWorkPlace(workPlace);
        fixingNameRepository.save(fixingTypes);
        return new ApiResponse("Saved",true);
    }

    public ApiResponse getAllFixingTypes(Long master_id) {
        Optional<User> master = userRepository.findById(master_id);
        if (!master.isPresent())
            return new ApiResponse("Master not found",false);
        User user = master.get();
        WorkPlace workPlace = user.getWorkPlace();
        List<FixingTypes> fixingTypesList = fixingNameRepository.findAllByWorkPlace(workPlace);
        return new ApiResponse("Fixing Types",true,fixingTypesList);
    }
}
