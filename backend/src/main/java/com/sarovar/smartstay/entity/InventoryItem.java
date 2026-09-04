package com.sarovar.smartstay.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "inventory")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_code", nullable = false, unique = true, length = 20)
    private String itemCode;

    @Column(name = "item_name", nullable = false, length = 100)
    private String itemName;

    @Column(nullable = false, length = 50)
    private String category; // Provisions, Dairy, Vegetables, Beverages, Bakery, Cleaning

    @Column(name = "current_quantity", nullable = false)
    private BigDecimal currentQuantity;

    @Column(nullable = false, length = 20)
    private String unit; // kg, liters, packets, pieces

    @Column(name = "minimum_stock_level", nullable = false)
    private BigDecimal minimumStockLevel;

    @Column(length = 100)
    private String supplier;

    @Column(name = "cost_per_unit", nullable = false)
    private BigDecimal costPerUnit;

    @Column(name = "last_restocked")
    private LocalDate lastRestocked;

    // NORMAL, LOW, CRITICAL
    @Column(length = 20)
    private String status = "NORMAL";

    public InventoryItem() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemCode() { return itemCode; }
    public void setItemCode(String itemCode) { this.itemCode = itemCode; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getCurrentQuantity() { return currentQuantity; }
    public void setCurrentQuantity(BigDecimal currentQuantity) { this.currentQuantity = currentQuantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public BigDecimal getMinimumStockLevel() { return minimumStockLevel; }
    public void setMinimumStockLevel(BigDecimal minimumStockLevel) { this.minimumStockLevel = minimumStockLevel; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    public BigDecimal getCostPerUnit() { return costPerUnit; }
    public void setCostPerUnit(BigDecimal costPerUnit) { this.costPerUnit = costPerUnit; }

    public LocalDate getLastRestocked() { return lastRestocked; }
    public void setLastRestocked(LocalDate lastRestocked) { this.lastRestocked = lastRestocked; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
