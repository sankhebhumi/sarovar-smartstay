package com.sarovar.smartstay.repository;

import com.sarovar.smartstay.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategoryId(Long categoryId);
    List<MenuItem> findByAvailable(boolean available);
    List<MenuItem> findByNameContainingIgnoreCase(String keyword);
}
