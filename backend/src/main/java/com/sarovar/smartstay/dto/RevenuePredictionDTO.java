package com.sarovar.smartstay.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class RevenuePredictionDTO {
    private BigDecimal currentMonthlyRevenue;
    private BigDecimal predictedMonthlyRevenue;
    private double expectedGrowthPercentage;
    private List<Map<String, Object>> monthlyTrends;
    private String explanation;

    public RevenuePredictionDTO() {}

    public BigDecimal getCurrentMonthlyRevenue() { return currentMonthlyRevenue; }
    public void setCurrentMonthlyRevenue(BigDecimal currentMonthlyRevenue) { this.currentMonthlyRevenue = currentMonthlyRevenue; }

    public BigDecimal getPredictedMonthlyRevenue() { return predictedMonthlyRevenue; }
    public void setPredictedMonthlyRevenue(BigDecimal predictedMonthlyRevenue) { this.predictedMonthlyRevenue = predictedMonthlyRevenue; }

    public double getExpectedGrowthPercentage() { return expectedGrowthPercentage; }
    public void setExpectedGrowthPercentage(double expectedGrowthPercentage) { this.expectedGrowthPercentage = expectedGrowthPercentage; }

    public List<Map<String, Object>> getMonthlyTrends() { return monthlyTrends; }
    public void setMonthlyTrends(List<Map<String, Object>> monthlyTrends) { this.monthlyTrends = monthlyTrends; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
