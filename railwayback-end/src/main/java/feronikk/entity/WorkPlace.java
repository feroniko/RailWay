package feronikk.entity;

import feronikk.entity.abcEntities.AbcLongEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class WorkPlace extends AbcLongEntity {

    private String nameaOfWorkPlace;

    private String username;

    private String password;



    public WorkPlace(String nameaOfWorkPlace) {
        this.nameaOfWorkPlace = nameaOfWorkPlace;
    }

    //EqualHashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        WorkPlace workPlace = (WorkPlace) o;
        return getId() != null && Objects.equals(getId(), workPlace.getId());
    }



    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
