package feronikk.anotatsion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourseNotFoundExeption  extends RuntimeException{

    private final String description;

    public ResourseNotFoundExeption(String description) {
        this.description = description;
    }
}
