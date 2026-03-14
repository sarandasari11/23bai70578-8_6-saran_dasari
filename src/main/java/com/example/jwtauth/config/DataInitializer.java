package com.example.jwtauth.config;

import com.example.jwtauth.model.User;
import com.example.jwtauth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String demoUsername = "user123";
            if (!userRepository.existsByUsername(demoUsername)) {
                User user = new User(demoUsername, passwordEncoder.encode("password123"));
                userRepository.save(user);
            }
        };
    }
}
