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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Train extends AbcLongEntity {

    @Column(nullable = false,unique = true)
    private String name;

    @Column(unique = true)
    private String username;

    private String password;

    private String toShowPassword;

    @ManyToOne
    private WorkPlace workPlace;






    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Train train = (Train) o;
        return getId() != null && Objects.equals(getId(), train.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
