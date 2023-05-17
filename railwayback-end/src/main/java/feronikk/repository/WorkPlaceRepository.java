package feronikk.repository;

import feronikk.entity.User;
import feronikk.entity.WorkPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface WorkPlaceRepository extends JpaRepository<WorkPlace,Long> {

    boolean existsByUsername(String username);

   Optional<WorkPlace> findById(Long id);

   boolean existsByNameaOfWorkPlace(String nameaOfWorkPlace);







}
