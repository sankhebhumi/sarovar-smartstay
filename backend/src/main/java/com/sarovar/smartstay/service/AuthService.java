package com.sarovar.smartstay.service;

import com.sarovar.smartstay.dto.AuthRequest;
import com.sarovar.smartstay.dto.AuthResponse;
import com.sarovar.smartstay.dto.RegisterRequest;
import com.sarovar.smartstay.entity.Customer;
import com.sarovar.smartstay.entity.Role;
import com.sarovar.smartstay.entity.User;
import com.sarovar.smartstay.repository.CustomerRepository;
import com.sarovar.smartstay.repository.RoleRepository;
import com.sarovar.smartstay.repository.UserRepository;
import com.sarovar.smartstay.security.JwtTokenProvider;
import com.sarovar.smartstay.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private SecurityAuditService securityAuditService;

    public AuthResponse authenticateUser(AuthRequest loginRequest, String ipAddress) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsernameOrEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            securityAuditService.logEvent(
                    userDetails.getUsername(),
                    "USER_LOGIN",
                    ipAddress != null ? ipAddress : "127.0.0.1",
                    "SUCCESS",
                    0,
                    "User authenticated successfully via JWT"
            );

            return new AuthResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), userDetails.getFullName(), roles);

        } catch (Exception ex) {
            securityAuditService.logEvent(
                    loginRequest.getUsernameOrEmail(),
                    "FAILED_LOGIN_ATTEMPT",
                    ipAddress != null ? ipAddress : "127.0.0.1",
                    "FAILED",
                    35,
                    "Invalid password or username specified"
            );
            throw new RuntimeException("Invalid username/email or password.");
        }
    }

    @Transactional
    public User registerUser(RegisterRequest registerRequest, String ipAddress) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email Address is already in use!");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFullName(registerRequest.getFullName());
        user.setPhone(registerRequest.getPhone());

        String roleName = registerRequest.getRole() != null ? registerRequest.getRole() : "ROLE_CUSTOMER";
        Role userRole = roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.findByName("ROLE_CUSTOMER")
                .orElseGet(() -> roleRepository.save(new Role(5L, "ROLE_CUSTOMER"))));

        user.setRoles(Collections.singleton(userRole));
        User savedUser = userRepository.save(user);

        // If registered as customer, auto-create Customer entity record
        if ("ROLE_CUSTOMER".equals(roleName)) {
            Customer customer = new Customer();
            customer.setUser(savedUser);
            customer.setName(savedUser.getFullName());
            customer.setEmail(savedUser.getEmail());
            customer.setPhone(savedUser.getPhone());
            customerRepository.save(customer);
        }

        securityAuditService.logEvent(
                savedUser.getUsername(),
                "USER_REGISTER",
                ipAddress != null ? ipAddress : "127.0.0.1",
                "SUCCESS",
                0,
                "New user registered with role: " + roleName
        );

        return savedUser;
    }
}
