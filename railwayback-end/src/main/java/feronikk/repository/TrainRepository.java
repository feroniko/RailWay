package feronikk.repository;

import feronikk.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainRepository extends JpaRepository<Train,Long> {

    boolean existsByName(String name);

    Optional<Train> findByName(String name);


}
