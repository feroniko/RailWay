package feronikk.dataTranformationObj;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EditingDataDto {

    private String username;

    private String password;

    private String prePassword;

    private String fullName;

    private LocalDate dateOfBirth;

    private int tableNumber;

    private int gradeNumber;

    private Long workPlace_id;

    private int workingTime_id;

}
