package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.dto.AuthRequest;
import com.sarovar.smartstay.dto.AuthResponse;
import com.sarovar.smartstay.dto.RegisterRequest;
import com.sarovar.smartstay.entity.User;
import com.sarovar.smartstay.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest loginRequest, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        AuthResponse response = authService.authenticateUser(loginRequest, ipAddress);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest registerRequest, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        User createdUser = authService.registerUser(registerRequest, ipAddress);
        return ResponseEntity.ok(createdUser);
    }
}
