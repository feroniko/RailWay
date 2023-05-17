package feronikk.dataTranformationObj;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class DriverDto {

    private String fullname;

    private String username;

    private LocalDate age;

    private String password;

    private int tableNumeber;

    private int gradeNumber;

//    private WorkPlace workPlace;

    private  boolean enabled;

    private String prePassword;

    private Long workPlace_id;

    private int workingTime;

    private String phoneNumber;
}
