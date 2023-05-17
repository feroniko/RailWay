package feronikk.repository;

import feronikk.entity.Role;
import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import feronikk.entity.WorkinTimesName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByTableNumeber(int tableNumeber);


    List<User> findByRoleHashId(int roleHashId);

    List<User> findAllByWorkingTimeAndRoleHashId(WorkinTimesName workingTime, int roleHashId);

    List<User> findAllByWorkPlace(WorkPlace workPlace);










}
