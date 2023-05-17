package feronikk.entity;

import feronikk.entity.abcEntities.AbcLongEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Trips extends AbcLongEntity {

    @ManyToOne
    private Train train;

    private LocalDate startsWith;

    @ManyToOne
    private User user;

    @ManyToOne
    private WorkPlace workPlace;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Trips trips = (Trips) o;
        return getId() != null && Objects.equals(getId(), trips.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
