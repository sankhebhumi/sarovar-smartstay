package com.sarovar.smartstay.dto;

import java.util.Map;

public class StaffingInsightDTO {
    private String title;
    private Map<String, Integer> recommendedStaffCounts;
    private String reason;

    public StaffingInsightDTO() {}

    public StaffingInsightDTO(String title, Map<String, Integer> recommendedStaffCounts, String reason) {
        this.title = title;
        this.recommendedStaffCounts = recommendedStaffCounts;
        this.reason = reason;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Map<String, Integer> getRecommendedStaffCounts() { return recommendedStaffCounts; }
    public void setRecommendedStaffCounts(Map<String, Integer> recommendedStaffCounts) { this.recommendedStaffCounts = recommendedStaffCounts; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
