package com.slotcut.controller;

import com.slotcut.entity.Salon;
import com.slotcut.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/salons")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class SalonController {
    private final SalonService salonService;
    
    @GetMapping
    public ResponseEntity<?> getAllSalons() {
        try {
            List<Salon> salons = salonService.getAllSalons();
            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching salons: " + e.getMessage());
        }
    }
    
    @GetMapping("/{salonId}")
    public ResponseEntity<?> getSalon(@PathVariable UUID salonId) {
        try {
            Salon salon = salonService.getSalonById(salonId);
            return ResponseEntity.ok(salon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Salon not found: " + e.getMessage());
        }
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<?> getOwnerSalons(@PathVariable UUID ownerId) {
        try {
            List<Salon> salons = salonService.getSalonsByOwner(ownerId);
            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching salons: " + e.getMessage());
        }
    }
    
    @GetMapping("/city/{city}")
    public ResponseEntity<?> getSalonsByCity(@PathVariable String city) {
        try {
            List<Salon> salons = salonService.getSalonsByCity(city);
            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching salons: " + e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createSalon(@RequestBody Salon salon) {
        try {
            Salon created = salonService.createSalon(salon);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating salon: " + e.getMessage());
        }
    }
    
    @PutMapping("/{salonId}")
    public ResponseEntity<?> updateSalon(
            @PathVariable UUID salonId,
            @RequestBody Salon salonDetails) {
        try {
            Salon updated = salonService.updateSalon(salonId, salonDetails);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error updating salon: " + e.getMessage());
        }
    }
}
