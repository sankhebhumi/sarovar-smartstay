package com.sarovar.smartstay.repository;

import com.sarovar.smartstay.entity.SecurityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecurityLogRepository extends JpaRepository<SecurityLog, Long> {
    List<SecurityLog> findTop50ByOrderByIdDesc();
    List<SecurityLog> findByStatus(String status);
    long countByStatus(String status);
    List<SecurityLog> findByUsername(String username);
}
