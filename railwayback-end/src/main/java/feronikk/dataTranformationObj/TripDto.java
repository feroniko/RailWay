package feronikk.dataTranformationObj;

import feronikk.entity.Train;
import feronikk.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TripDto {


    private Long train_id;

    private LocalDate startsWith;

    private Long user_id;
}
