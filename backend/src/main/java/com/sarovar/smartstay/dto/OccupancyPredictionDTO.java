package com.sarovar.smartstay.dto;

import java.util.List;
import java.util.Map;

public class OccupancyPredictionDTO {
    private double currentOccupancyPercentage;
    private double predictedTomorrowPercentage;
    private double predictedWeekendPercentage;
    private List<Map<String, Object>> weeklyForecast;
    private String explanation;

    public OccupancyPredictionDTO() {}

    public double getCurrentOccupancyPercentage() { return currentOccupancyPercentage; }
    public void setCurrentOccupancyPercentage(double currentOccupancyPercentage) { this.currentOccupancyPercentage = currentOccupancyPercentage; }

    public double getPredictedTomorrowPercentage() { return predictedTomorrowPercentage; }
    public void setPredictedTomorrowPercentage(double predictedTomorrowPercentage) { this.predictedTomorrowPercentage = predictedTomorrowPercentage; }

    public double getPredictedWeekendPercentage() { return predictedWeekendPercentage; }
    public void setPredictedWeekendPercentage(double predictedWeekendPercentage) { this.predictedWeekendPercentage = predictedWeekendPercentage; }

    public List<Map<String, Object>> getWeeklyForecast() { return weeklyForecast; }
    public void setWeeklyForecast(List<Map<String, Object>> weeklyForecast) { this.weeklyForecast = weeklyForecast; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
