package feronikk.repository;

import feronikk.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachmentRepositroy extends JpaRepository<Attachment,Long> {

    Attachment findByHashId(String hashId);
}
