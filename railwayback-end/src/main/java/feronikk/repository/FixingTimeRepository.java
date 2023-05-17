package feronikk.repository;

import feronikk.entity.FixingTime;
import feronikk.entity.Train;
import feronikk.entity.WorkPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FixingTimeRepository extends JpaRepository<FixingTime,Long> {
    List<FixingTime> findAllByWorkPlace(WorkPlace workPlace);
}
