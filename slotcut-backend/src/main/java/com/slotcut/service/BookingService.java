package com.slotcut.service;

import com.slotcut.dto.BookingRequest;
import com.slotcut.entity.Booking;
import com.slotcut.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    
    public Booking createBooking(UUID studentId, BookingRequest request) {
        Booking booking = Booking.builder()
                .studentId(studentId)
                .salonId(request.getSalonId())
                .serviceId(request.getServiceId())
                .bookingDate(request.getBookingDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .studentName(request.getStudentName())
                .studentPhone(request.getStudentPhone())
                .notes(request.getNotes())
                .status(Booking.BookingStatus.CONFIRMED)
                .build();
        
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getStudentBookings(UUID studentId) {
        return bookingRepository.findByStudentId(studentId);
    }
    
    public List<Booking> getSalonBookings(UUID salonId) {
        return bookingRepository.findBySalonId(salonId);
    }
    
    public List<Booking> getTodayBookings(UUID salonId) {
        return bookingRepository.findBySalonIdAndBookingDate(salonId, LocalDate.now());
    }
    
    public Booking getBookingById(UUID bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    public Booking updateBookingStatus(UUID bookingId, Booking.BookingStatus status) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    
    public void cancelBooking(UUID bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
}
