package feronikk.repository;

import feronikk.entity.WorkPlace;
import feronikk.entity.WorkinTimesName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkinTimesNameRepository extends JpaRepository<WorkinTimesName,Long> {

   List<WorkinTimesName> findByWorkPlace_id(Long workPlace_id);

    boolean existsByNameOfWorkingTiime(String nameOfWorkingTiime);

    List<WorkinTimesName> findAllByWorkPlace(WorkPlace workPlace);
}
