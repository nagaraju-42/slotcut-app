package com.slotcut.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private UUID userId;
    private String phoneNumber;
    private String userType;
    private String accessToken;
    private String refreshToken;
    private long expiresIn;
}
