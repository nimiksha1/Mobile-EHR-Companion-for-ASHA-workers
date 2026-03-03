package com.example.EHR.config;

import com.example.EHR.entity.User;
import com.example.EHR.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@example.com");
            admin.setPhone("+1111111111");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.UserRole.ADMIN);
            userRepository.save(admin);
            System.out.println("✅ Admin user created: admin@example.com / admin123");
        }
    }
}
