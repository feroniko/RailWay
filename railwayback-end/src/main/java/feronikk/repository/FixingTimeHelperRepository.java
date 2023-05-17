package feronikk.repository;

import feronikk.entity.FixingTime;
import feronikk.entity.FixingTimeHelper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FixingTimeHelperRepository extends JpaRepository<FixingTimeHelper,Long> {

    FixingTimeHelper findByFixingTime(FixingTime fixingTime);
}
