package com.slotcut.service;

import com.slotcut.entity.Salon;
import com.slotcut.repository.SalonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SalonService {
    private final SalonRepository salonRepository;
    
    public Salon getSalonById(UUID salonId) {
        return salonRepository.findById(salonId)
                .orElseThrow(() -> new RuntimeException("Salon not found"));
    }
    
    public List<Salon> getSalonsByOwner(UUID ownerId) {
        return salonRepository.findByOwnerId(ownerId);
    }
    
    public List<Salon> getSalonsByCity(String city) {
        return salonRepository.findByCity(city);
    }
    
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }
    
    public Salon createSalon(Salon salon) {
        return salonRepository.save(salon);
    }
    
    public Salon updateSalon(UUID salonId, Salon salonDetails) {
        Salon salon = getSalonById(salonId);
        
        if (salonDetails.getName() != null) salon.setName(salonDetails.getName());
        if (salonDetails.getAddress() != null) salon.setAddress(salonDetails.getAddress());
        if (salonDetails.getCity() != null) salon.setCity(salonDetails.getCity());
        if (salonDetails.getPhone() != null) salon.setPhone(salonDetails.getPhone());
        if (salonDetails.getBio() != null) salon.setBio(salonDetails.getBio());
        if (salonDetails.getImageUrl() != null) salon.setImageUrl(salonDetails.getImageUrl());
        
        return salonRepository.save(salon);
    }
}
