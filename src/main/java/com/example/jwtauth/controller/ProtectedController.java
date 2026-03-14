package com.example.jwtauth.controller;

import java.time.Instant;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/protected")
public class ProtectedController {

    @GetMapping("/profile")
    public Map<String, String> profile(Authentication authentication) {
        return Map.of(
                "message", "Protected route accessed successfully.",
                "username", authentication.getName(),
                "timestamp", Instant.now().toString()
        );
    }
}
