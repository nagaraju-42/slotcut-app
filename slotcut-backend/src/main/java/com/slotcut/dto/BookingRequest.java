package com.slotcut.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    @NotNull(message = "Salon ID is required")
    private UUID salonId;
    
    @NotNull(message = "Service ID is required")
    private UUID serviceId;
    
    @NotNull(message = "Booking date is required")
    private LocalDate bookingDate;
    
    @NotBlank(message = "Start time is required")
    private String startTime;
    
    @NotBlank(message = "End time is required")
    private String endTime;
    
    @NotBlank(message = "Student name is required")
    private String studentName;
    
    @NotBlank(message = "Student phone is required")
    private String studentPhone;
    
    private String notes;
}
