package feronikk.initialData;

import feronikk.appConstants.AppConstants;
import feronikk.entity.Role;
import feronikk.entity.User;


import feronikk.entity.enumuration.Permissions;
import feronikk.repository.RoleRepository;
import feronikk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static feronikk.entity.enumuration.Permissions.*;

@Component
public class InitialData implements CommandLineRunner {

    @Value("${spring.sql.init.mode}")
    public String initialMode;

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
            if (initialMode.equals("always")){
            Role mineRole = roleRepository.save(new Role(
                    AppConstants.MINE,
                    Arrays.asList(Permissions.values())
            ));

            Role ownerRole = roleRepository.save(new Role(
                    AppConstants.OWNER,
                    Arrays.asList(CAN_DO_ADMIN_ROLE,CAN_DO_OWNER_ROLE,CAN_DO_DRIVER_ROLE,CAN_DO_MASTER_ROLE,CAN_DO_WORKER_ROLE)
            ));

            Role adminRole = roleRepository.save(new Role(
                    AppConstants.ADMIN,
                    Arrays.asList(CAN_DO_ADMIN_ROLE,CAN_DO_DRIVER_ROLE,CAN_DO_MASTER_ROLE,CAN_DO_WORKER_ROLE)
            ));

            Role masterRole = roleRepository.save(new Role(
                    AppConstants.MASTER,
                    Arrays.asList(CAN_DO_MASTER_ROLE,CAN_DO_WORKER_ROLE)
            ));

            Role driverRole = roleRepository.save(new Role(
                    AppConstants.DRIVER,
                    Collections.singletonList(CAN_DO_DRIVER_ROLE)
            ));

            Role workerRole = roleRepository.save(new Role(
                    AppConstants.WORKER,
                    Collections.singletonList(CAN_DO_WORKER_ROLE)
            ));

            Role camera_man = roleRepository.save(new Role(
                    AppConstants.CAMERA_MAN,
                    Collections.singletonList(CAN_DO_CAMERA_MAN_ROLE)
            ));

            userRepository.save(new User(
                    "DIlshod Fayzullayev",
                    "feronikk",
                    LocalDate.of(2000,04,3),
                    passwordEncoder.encode("feronikk"),
                    mineRole,
                    123456,
                    true
            ));


            userRepository.save(new User(
                    "OwerOfCompany",
                    "owner",
                    LocalDate.of(2000,12,02),
                    passwordEncoder.encode("owner"),
                    ownerRole,
                    12345,
                    true
            ));


            userRepository.save(new User(
                    "Admin",
                    "admin",
                    LocalDate.of(2000,12,20),
                    passwordEncoder.encode("admin"),
                    adminRole,
                    324234,
                    true
            ));
                userRepository.save(new User(
                        "cameraMan",
                        "cameraMan",
                        LocalDate.of(2000,12,20),
                        passwordEncoder.encode("cameraMan"),
                        camera_man,
                        3242314,
                        true
                ));

        }
    }
}
