package feronikk.entity;

import feronikk.entity.abcEntities.AbcLongEntity;
import feronikk.entity.enumuration.AttachmentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Attachment extends AbcLongEntity {

    private String name;

    private String extension;

    private String contentType;

    private Long size;

    private String uploadFolder;

    private String hashId;

    @Enumerated(EnumType.STRING)
    private AttachmentStatus attachmentStatus;


    @OneToOne(mappedBy = "attachment", cascade = CascadeType.ALL)
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Attachment that = (Attachment) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
