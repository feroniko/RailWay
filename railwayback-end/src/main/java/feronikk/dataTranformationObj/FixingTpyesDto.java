package feronikk.dataTranformationObj;

import feronikk.entity.CategoryOfFixing;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class FixingTpyesDto {

    private String name;

    Set<Long> categoryOfFixing_id;


}
