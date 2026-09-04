package com.sarovar.smartstay.service;

import com.sarovar.smartstay.entity.Booking;
import com.sarovar.smartstay.entity.Payment;
import com.sarovar.smartstay.repository.BookingRepository;
import com.sarovar.smartstay.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SecurityAuditService securityAuditService;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Transactional
    public Payment processPayment(Long bookingId, String paymentMethod, BigDecimal amount, String username) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setCustomer(booking.getCustomer());
        payment.setAmount(amount != null ? amount : booking.getTotalAmount());
        payment.setPaymentMethod(paymentMethod != null ? paymentMethod : "UPI");
        payment.setPaymentStatus("PAID");
        payment.setTransactionReference("TXN-" + paymentMethod.toUpperCase() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        booking.setPaymentStatus("PAID");
        bookingRepository.save(booking);

        Payment saved = paymentRepository.save(payment);

        securityAuditService.logEvent(
                username != null ? username : "GUEST",
                "PROCESS_PAYMENT",
                "127.0.0.1",
                "SUCCESS",
                0,
                "Payment of ₹" + saved.getAmount() + " processed via " + paymentMethod + " for booking " + booking.getBookingReference()
        );

        return saved;
    }
}
