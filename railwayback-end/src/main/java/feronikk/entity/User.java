package feronikk.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import feronikk.entity.abcEntities.AbcLongEntity;

import feronikk.entity.enumuration.Permissions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")
public class User extends AbcLongEntity implements UserDetails {


    private String fullname;

    @Column(nullable = false,unique = true)
    private String username;


    private String passwordToShow;
    private LocalDate age;

    @Column(nullable = false)
    private String password;

    @JsonIgnore
    @OneToOne
    private Role role;

    @OneToOne(fetch = FetchType.LAZY)
    private Attachment attachment;

    @Column(unique = true)
    private int tableNumeber;

    private int gradeNumber;

    @ManyToOne
    private WorkPlace workPlace;


    @ManyToOne
    private WorkinTimesName workingTime;

    private int roleHashId;

    private  boolean enabled;

    private String phoneNumber;






    public User(String fullname, String username, LocalDate age, String password, Role role, int tableNumeber, boolean enabled) {
        this.fullname = fullname;
        this.username = username;
        this.age = age;
        this.password = password;
        this.role = role;
        this.tableNumeber = tableNumeber;
        this.enabled = enabled;
    }


    public User(String username) {
        this.username = username;
    }



    public User(String fullname, int roleHashId, String username, LocalDate age, String password, Role role, Attachment attachment, int tableNumeber, int gradeNumber, boolean enabled) {
        this.fullname = fullname;
        this.username = username;
        this.age = age;
        this.password = password;
        this.role = role;
        this.attachment = attachment;
        this.tableNumeber = tableNumeber;
        this.gradeNumber = gradeNumber;
        this.enabled = enabled;
        this.roleHashId=roleHashId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       List<Permissions> permissions = this.role.getPermissions();
       List<GrantedAuthority> grantedAuthority = new ArrayList<>();
        for (Permissions permission : permissions) {
            grantedAuthority.add(new SimpleGrantedAuthority(permission.name()));
        }
        return grantedAuthority;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    //EqualHashCode method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return getId() != null && Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
