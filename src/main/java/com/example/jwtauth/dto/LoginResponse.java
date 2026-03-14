package com.example.jwtauth.dto;

public record LoginResponse(String token, String tokenType, long expiresInSeconds) {
}
