package com.sarovar.smartstay.service;

import com.sarovar.smartstay.entity.InventoryItem;
import com.sarovar.smartstay.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<InventoryItem> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public InventoryItem getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with ID: " + id));
    }

    public InventoryItem saveInventoryItem(InventoryItem item) {
        // Auto-calculate status based on minimum stock level
        if (item.getCurrentQuantity().compareTo(item.getMinimumStockLevel()) < 0) {
            item.setStatus("CRITICAL");
        } else if (item.getCurrentQuantity().compareTo(item.getMinimumStockLevel().multiply(new java.math.BigDecimal("1.3"))) < 0) {
            item.setStatus("LOW");
        } else {
            item.setStatus("NORMAL");
        }
        return inventoryRepository.save(item);
    }
}
