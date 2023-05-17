package feronikk.dataTranformationObj;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LoginDto {


    private String username;


    private String password;

}
