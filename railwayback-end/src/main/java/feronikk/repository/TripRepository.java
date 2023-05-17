package feronikk.repository;

import feronikk.entity.Train;
import feronikk.entity.Trips;
import feronikk.entity.WorkPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trips,Long> {

    List<Trips> findAllByWorkPlace(WorkPlace workPlace);

    List<Trips> findAllByUserId(Long user_id);

}
