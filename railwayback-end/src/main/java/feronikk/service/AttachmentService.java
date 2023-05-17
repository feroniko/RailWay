package feronikk.service;

import feronikk.entity.Attachment;
import feronikk.entity.enumuration.AttachmentStatus;
import feronikk.repository.AttachmentRepositroy;
import org.hashids.Hashids;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class AttachmentService {
    @Autowired
    AttachmentRepositroy attachmentRepositroy;

    private final Hashids hashid;

    @Value("${sprin.upload.folder}")
    private String upladFolder;

    public AttachmentService() {
        this.hashid = new Hashids(getClass().getName(),6);
    }

    public Attachment saveFile(MultipartFile multipartFile, String baseFolder) {
        Attachment attachment = new Attachment();
        attachment.setName(multipartFile.getOriginalFilename());
        attachment.setContentType(multipartFile.getContentType());
        attachment.setSize(multipartFile.getSize());
        attachment.setExtension(getExtension(multipartFile.getOriginalFilename()));
        attachment.setAttachmentStatus(AttachmentStatus.DRAFT);
        attachmentRepositroy.save(attachment);
        String path = "";
        path = String.format("%s/railway/%s", this.upladFolder,baseFolder);

        File file = new File(path);
        if (!file.exists() && file.mkdirs())
            System.out.println("Created");

        attachment.setHashId(hashid.encode(attachment.getId()));

        String localPath = String.format("/railway/%s/%s.%s",baseFolder,attachment.getHashId(),attachment.getExtension() );
        attachment.setUploadFolder(localPath);
        attachmentRepositroy.save(attachment);
        file = file.getAbsoluteFile();
        File fileNow = new File(file,String.format("%s.%s",attachment.getHashId(),attachment.getExtension()));
        try {
            multipartFile.transferTo(fileNow);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return attachment;
    }

    public String getExtension(String fileName){
        String extension = null;
        if (fileName != null && !fileName.isEmpty()){
            int dot = fileName.lastIndexOf('.');
            if (dot > 0 && dot <= fileName.length() -2){
                extension = fileName.substring(dot+1);
            }
        }
        return extension;
    }



}
