package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.dto.BookingRequest;
import com.sarovar.smartstay.entity.Booking;
import com.sarovar.smartstay.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> getBookingsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(bookingService.getBookingsByCustomer(customerId));
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest request, Principal principal) {
        String username = principal != null ? principal.getName() : "CUSTOMER";
        return ResponseEntity.ok(bookingService.createBooking(request, username));
    }

    @PutMapping("/{id}/check-in")
    public ResponseEntity<Booking> checkIn(@PathVariable Long id, Principal principal) {
        String username = principal != null ? principal.getName() : "RECEPTIONIST";
        return ResponseEntity.ok(bookingService.checkIn(id, username));
    }

    @PutMapping("/{id}/check-out")
    public ResponseEntity<Booking> checkOut(@PathVariable Long id, Principal principal) {
        String username = principal != null ? principal.getName() : "RECEPTIONIST";
        return ResponseEntity.ok(bookingService.checkOut(id, username));
    }
}
