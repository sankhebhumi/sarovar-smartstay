package com.sarovar.smartstay.dto;

import java.math.BigDecimal;

public class InventoryPredictionDTO {
    private String itemCode;
    private String itemName;
    private BigDecimal currentStock;
    private BigDecimal predicted7DayDemand;
    private String unit;
    private String riskLevel; // HIGH, MEDIUM, LOW
    private BigDecimal recommendedReorderQty;
    private String explanation;

    public InventoryPredictionDTO() {}

    public String getItemCode() { return itemCode; }
    public void setItemCode(String itemCode) { this.itemCode = itemCode; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public BigDecimal getCurrentStock() { return currentStock; }
    public void setCurrentStock(BigDecimal currentStock) { this.currentStock = currentStock; }

    public BigDecimal getPredicted7DayDemand() { return predicted7DayDemand; }
    public void setPredicted7DayDemand(BigDecimal predicted7DayDemand) { this.predicted7DayDemand = predicted7DayDemand; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public BigDecimal getRecommendedReorderQty() { return recommendedReorderQty; }
    public void setRecommendedReorderQty(BigDecimal recommendedReorderQty) { this.recommendedReorderQty = recommendedReorderQty; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
