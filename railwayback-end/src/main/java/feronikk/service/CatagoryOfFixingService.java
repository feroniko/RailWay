package feronikk.service;

import feronikk.anotatsion.ResourseNotFoundExeption;
import feronikk.apiResponse.ApiResponse;
import feronikk.dataTranformationObj.CategoryOfFixingDto;
import feronikk.entity.CategoryOfFixing;
import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import feronikk.repository.CategoryNameRepository;
import feronikk.repository.UserRepository;
import feronikk.repository.WorkPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatagoryOfFixingService {

    @Autowired
    CategoryNameRepository categoryNameRepository;

    @Autowired
    WorkPlaceRepository workPlaceRepository;
    @Autowired
    UserRepository userRepository;
    public ApiResponse addCategoryName(CategoryOfFixingDto categoryOfFixingDto, Long master_id) {
       if (categoryOfFixingDto.getDurationOfFixing() <= 0)
           return new ApiResponse("Please fill inputs",false);
       if (categoryOfFixingDto.getCatetgoryName().equals(""))
           return new ApiResponse("Please fill input",false);
       CategoryOfFixing categoryOfFixing = new CategoryOfFixing();
       categoryOfFixing.setNameOfCategory(categoryOfFixingDto.getCatetgoryName());
       categoryOfFixing.setDurationOfFixingCategory(categoryOfFixingDto.getDurationOfFixing());
        Optional<User> userMaster = userRepository.findById(master_id);
        if (!userMaster.isPresent())
            return new ApiResponse("Please choose user",false);
        User user = userMaster.get();
        WorkPlace workPlace = user.getWorkPlace();
        categoryOfFixing.setWorkPlace(workPlace);
        categoryNameRepository.save(categoryOfFixing);
        return new ApiResponse("Category name saved",true);
    }

    public ApiResponse getAllFixingTypes(Long master_id) {
        Optional<User> optionalUser = userRepository.findById(master_id);
        if (!optionalUser.isPresent())
            return new ApiResponse("Please fill master",false);
        User user = optionalUser.get();
        WorkPlace workPlace = user.getWorkPlace();
        List<CategoryOfFixing> categoryOfFixings = categoryNameRepository.findAllByWorkPlace(workPlace);
        return new ApiResponse("FixingTypes",true,categoryOfFixings);
    }
}
