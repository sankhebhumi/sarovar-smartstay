package com.sarovar.smartstay.repository;

import com.sarovar.smartstay.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingReference(String bookingReference);
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByBookingStatus(String bookingStatus);
    
    List<Booking> findByCheckInDate(LocalDate checkInDate);
    List<Booking> findByCheckOutDate(LocalDate checkOutDate);

    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId AND b.bookingStatus IN ('CONFIRMED', 'CHECKED_IN') AND ((b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate))")
    List<Booking> findConflictingBookings(@Param("roomId") Long roomId, @Param("checkInDate") LocalDate checkInDate, @Param("checkOutDate") LocalDate checkOutDate);
}
