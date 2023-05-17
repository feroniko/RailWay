package feronikk.dataTranformationObj;



import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;


@Getter
@Setter
public class UserDto {

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

    private Long workingTime;

    private String phoneNumber;
}
