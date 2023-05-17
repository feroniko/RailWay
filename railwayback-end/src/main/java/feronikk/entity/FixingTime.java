package feronikk.entity;

import feronikk.entity.abcEntities.AbcLongEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class FixingTime extends AbcLongEntity {



    @ManyToOne
    private CategoryOfFixing categoryOfFixing;

    @ManyToOne
    private Train train;

    @ManyToMany
    private List<FixingTypes> fixingTypes;

    @ManyToOne
    private  WorkPlace workPlace;

    private Date fixingDate;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FixingTime that = (FixingTime) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
