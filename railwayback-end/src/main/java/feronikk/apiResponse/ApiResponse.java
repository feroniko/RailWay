package feronikk.apiResponse;

import feronikk.entity.Train;
import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import feronikk.entity.WorkinTimesName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ApiResponse {

    private String message;
    private boolean success;
    private Object permissions;

    private String token;

    private Object object;


    private Object workinTimes;

    private List<User> userList;

    private List<Train> trainList;

    private Long id;

    private WorkinTimesName workingTime;
    private WorkPlace workPlace;


    public ApiResponse(String message, boolean success, Object permissions, String token, Object object, Object workinTimes, List<User> userList, List<Train> trainList, Long id) {
        this.message = message;
        this.success = success;
        this.permissions = permissions;
        this.token = token;
        this.object = object;
        this.workinTimes = workinTimes;
        this.userList = userList;
        this.trainList = trainList;
        this.id = id;
        this.workPlace=workPlace;
    }

    public ApiResponse(String message, boolean success, Object permissions, String token, Long id, WorkPlace workPlace) {
        this.message = message;
        this.success = success;
        this.permissions = permissions;
        this.token = token;
        this.id = id;
        this.workPlace = workPlace;
    }

    public ApiResponse(String message, boolean success, String token, List<Train> trainList) {
        this.message = message;
        this.success = success;
        this.token = token;
        this.trainList = trainList;
    }

    public ApiResponse(String message, boolean success, Object object, Object workinTimes) {
        this.message = message;
        this.success = success;
        this.object = object;
        this.workinTimes = workinTimes;
    }

    public ApiResponse(String message, boolean success, Object permissions, String token, Long id) {
        this.message = message;
        this.success = success;
        this.permissions = permissions;
        this.token = token;
        this.id = id;
    }

    public ApiResponse(String message, boolean success, Object object, Object workinTimes, List<User> userList) {
        this.message = message;
        this.success = success;
        this.object = object;
        this.workinTimes = workinTimes;
        this.userList = userList;
    }

    public ApiResponse(String message, boolean success, List<User> userList) {
        this.message = message;
        this.success = success;
        this.userList = userList;
    }


    public ApiResponse(String message, boolean success, Object object, List<User> userList) {
        this.message = message;
        this.success = success;
        this.object = object;
        this.userList = userList;
    }

    public ApiResponse(String message, boolean success, Object permissions, String token) {
        this.message = message;
        this.success = success;
        this.permissions = permissions;
        this.token = token;
    }

    public ApiResponse(String message, Object object) {
        this.message = message;
        this.object = object;
    }


    public ApiResponse(String message, boolean success, Object permissions) {
        this.message = message;
        this.success = success;
        this.permissions = permissions;
    }

    public ApiResponse(String accessToken, boolean success, String message) {
        this.message = message;
        this.success = success;
        this.token = accessToken;
    }

    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }


}
