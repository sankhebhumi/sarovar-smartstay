package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.dto.SecurityStatsDTO;
import com.sarovar.smartstay.entity.SecurityLog;
import com.sarovar.smartstay.service.SecurityAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/security")
@CrossOrigin(origins = "*")
public class SecurityController {

    @Autowired
    private SecurityAuditService securityAuditService;

    @GetMapping("/logs")
    public ResponseEntity<List<SecurityLog>> getSecurityLogs() {
        return ResponseEntity.ok(securityAuditService.getRecentLogs());
    }

    @GetMapping("/stats")
    public ResponseEntity<SecurityStatsDTO> getSecurityStats() {
        return ResponseEntity.ok(securityAuditService.getSecurityStats());
    }
}
