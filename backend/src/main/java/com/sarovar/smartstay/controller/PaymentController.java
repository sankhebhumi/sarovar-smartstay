package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.entity.Payment;
import com.sarovar.smartstay.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(@RequestBody Map<String, Object> body, Principal principal) {
        Long bookingId = Long.parseLong(body.get("bookingId").toString());
        String method = body.get("paymentMethod") != null ? body.get("paymentMethod").toString() : "UPI";
        BigDecimal amount = body.get("amount") != null ? new BigDecimal(body.get("amount").toString()) : null;
        String username = principal != null ? principal.getName() : "GUEST";

        return ResponseEntity.ok(paymentService.processPayment(bookingId, method, amount, username));
    }
}
