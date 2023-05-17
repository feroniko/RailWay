package feronikk.dataTranformationObj;

import feronikk.entity.CategoryOfFixing;
import feronikk.entity.FixingTypes;
import feronikk.entity.User;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
public class FixingTimeDto {

    private List<String> fixingTypes_id;


    private Long categoryOfFixing_id;






}
