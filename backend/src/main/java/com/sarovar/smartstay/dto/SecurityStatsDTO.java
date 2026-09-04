package com.sarovar.smartstay.dto;

public class SecurityStatsDTO {
    private long totalSuccessfulLogins;
    private long totalFailedAttempts;
    private int activeSessions;
    private long suspiciousActivitiesCount;
    private String threatLevel; // LOW, MODERATE, ELEVATED, SEVERE

    public SecurityStatsDTO() {}

    public long getTotalSuccessfulLogins() { return totalSuccessfulLogins; }
    public void setTotalSuccessfulLogins(long totalSuccessfulLogins) { this.totalSuccessfulLogins = totalSuccessfulLogins; }

    public long getTotalFailedAttempts() { return totalFailedAttempts; }
    public void setTotalFailedAttempts(long totalFailedAttempts) { this.totalFailedAttempts = totalFailedAttempts; }

    public int getActiveSessions() { return activeSessions; }
    public void setActiveSessions(int activeSessions) { this.activeSessions = activeSessions; }

    public long getSuspiciousActivitiesCount() { return suspiciousActivitiesCount; }
    public void setSuspiciousActivitiesCount(long suspiciousActivitiesCount) { this.suspiciousActivitiesCount = suspiciousActivitiesCount; }

    public String getThreatLevel() { return threatLevel; }
    public void setThreatLevel(String threatLevel) { this.threatLevel = threatLevel; }
}
