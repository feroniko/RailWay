package feronikk.repository;

import feronikk.entity.FixingTypes;
import feronikk.entity.WorkPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FixingNameRepository extends JpaRepository<FixingTypes,Long> {

    List<FixingTypes> findAllByWorkPlace(WorkPlace workPlace);

    FixingTypes findByNameOfFixing(String nameOfFixing);
}
