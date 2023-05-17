package feronikk.dataTranformationObj;

import feronikk.entity.WorkinTimesName;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WorkPlaceDto {

    private String workPlaceName;


    private List<String> workinTimesNames;


}
