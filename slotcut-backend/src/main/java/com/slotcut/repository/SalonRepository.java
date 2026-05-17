package com.slotcut.repository;

import com.slotcut.entity.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface SalonRepository extends JpaRepository<Salon, UUID> {
    List<Salon> findByOwnerId(UUID ownerId);
    List<Salon> findByCity(String city);
}
