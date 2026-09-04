package com.sarovar.smartstay.service;

import com.sarovar.smartstay.dto.BookingRequest;
import com.sarovar.smartstay.entity.Booking;
import com.sarovar.smartstay.entity.Customer;
import com.sarovar.smartstay.entity.Payment;
import com.sarovar.smartstay.entity.Room;
import com.sarovar.smartstay.repository.BookingRepository;
import com.sarovar.smartstay.repository.CustomerRepository;
import com.sarovar.smartstay.repository.PaymentRepository;
import com.sarovar.smartstay.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private SecurityAuditService securityAuditService;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    @Transactional
    public Booking createBooking(BookingRequest request, String username) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + request.getRoomId()));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + request.getCustomerId()));

        // Conflict check: prevent booking if room is occupied/reserved for selected period
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                request.getRoomId(), request.getCheckInDate(), request.getCheckOutDate()
        );
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room " + room.getRoomNumber() + " is already booked for the selected dates!");
        }

        long nights = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (nights <= 0) nights = 1;

        BigDecimal totalAmount = room.getPricePerNight().multiply(new BigDecimal(nights));

        Booking booking = new Booking();
        booking.setBookingReference("BK-" + System.currentTimeMillis() % 1000000);
        booking.setCustomer(customer);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setNumberOfGuests(request.getNumberOfGuests());
        booking.setSpecialRequests(request.getSpecialRequests());
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus("CONFIRMED");
        booking.setPaymentStatus("PAID"); // Simulated payment

        // Update room status to RESERVED
        room.setStatus("RESERVED");
        roomRepository.save(room);

        // Record simulated payment
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setCustomer(customer);
        payment.setAmount(totalAmount);
        payment.setPaymentMethod("UPI");
        payment.setPaymentStatus("PAID");
        payment.setTransactionReference("TXN-SIM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        
        Booking savedBooking = bookingRepository.save(booking);
        paymentRepository.save(payment);

        securityAuditService.logEvent(
                username != null ? username : "USER",
                "CREATE_BOOKING",
                "127.0.0.1",
                "SUCCESS",
                0,
                "Booking " + savedBooking.getBookingReference() + " created for Room " + room.getRoomNumber()
        );

        return savedBooking;
    }

    @Transactional
    public Booking checkIn(Long bookingId, String username) {
        Booking booking = getBookingById(bookingId);
        booking.setBookingStatus("CHECKED_IN");
        
        Room room = booking.getRoom();
        room.setStatus("OCCUPIED");
        roomRepository.save(room);

        Booking updated = bookingRepository.save(booking);

        securityAuditService.logEvent(
                username != null ? username : "RECEPTIONIST",
                "CHECK_IN",
                "127.0.0.1",
                "SUCCESS",
                0,
                "Checked-in customer " + booking.getCustomer().getName() + " to Room " + room.getRoomNumber()
        );

        return updated;
    }

    @Transactional
    public Booking checkOut(Long bookingId, String username) {
        Booking booking = getBookingById(bookingId);
        booking.setBookingStatus("CHECKED_OUT");

        Room room = booking.getRoom();
        room.setStatus("CLEANING");
        room.setHousekeepingStatus("DIRTY");
        roomRepository.save(room);

        Booking updated = bookingRepository.save(booking);

        securityAuditService.logEvent(
                username != null ? username : "RECEPTIONIST",
                "CHECK_OUT",
                "127.0.0.1",
                "SUCCESS",
                0,
                "Checked-out booking " + booking.getBookingReference() + ". Room " + room.getRoomNumber() marked for CLEANING."
        );

        return updated;
    }
}
