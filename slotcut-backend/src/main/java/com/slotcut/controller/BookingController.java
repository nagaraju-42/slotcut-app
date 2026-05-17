package com.slotcut.controller;

import com.slotcut.dto.BookingRequest;
import com.slotcut.entity.Booking;
import com.slotcut.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookingController {
    private final BookingService bookingService;
    
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody BookingRequest request) {
        try {
            Booking booking = bookingService.createBooking(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating booking: " + e.getMessage());
        }
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentBookings(@PathVariable UUID studentId) {
        try {
            List<Booking> bookings = bookingService.getStudentBookings(studentId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching bookings: " + e.getMessage());
        }
    }
    
    @GetMapping("/salon/{salonId}")
    public ResponseEntity<?> getSalonBookings(@PathVariable UUID salonId) {
        try {
            List<Booking> bookings = bookingService.getSalonBookings(salonId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching bookings: " + e.getMessage());
        }
    }
    
    @GetMapping("/salon/{salonId}/today")
    public ResponseEntity<?> getTodayBookings(@PathVariable UUID salonId) {
        try {
            List<Booking> bookings = bookingService.getTodayBookings(salonId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching today's bookings: " + e.getMessage());
        }
    }
    
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBooking(@PathVariable UUID bookingId) {
        try {
            Booking booking = bookingService.getBookingById(bookingId);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Booking not found: " + e.getMessage());
        }
    }
    
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable UUID bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok("Booking cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error cancelling booking: " + e.getMessage());
        }
    }
}
