package feronikk.repository;

import feronikk.entity.CategoryOfFixing;
import feronikk.entity.WorkPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryNameRepository  extends JpaRepository<CategoryOfFixing,Long> {

    boolean existsByNameOfCategory(String nameOfCategory);

    List<CategoryOfFixing> findAllByWorkPlace(WorkPlace workPlace);

    CategoryOfFixing findByNameOfCategory(String nameOfCategory);

}
