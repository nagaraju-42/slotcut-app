package com.slotcut.repository;

import com.slotcut.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByStudentId(UUID studentId);
    List<Booking> findBySalonId(UUID salonId);
    List<Booking> findBySalonIdAndBookingDate(UUID salonId, LocalDate bookingDate);
}
