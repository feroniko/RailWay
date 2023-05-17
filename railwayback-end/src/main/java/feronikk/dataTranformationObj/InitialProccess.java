package feronikk.dataTranformationObj;

import feronikk.entity.CategoryOfFixing;
import feronikk.entity.FixingTypes;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class InitialProccess {

    private Date comeAt;

    private Long train_id;

    private Set<FixingTypes> fixingType_id;


    private Long categoryOfFixing_id;
}
