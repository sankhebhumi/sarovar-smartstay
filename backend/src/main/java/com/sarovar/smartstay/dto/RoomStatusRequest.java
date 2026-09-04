package com.sarovar.smartstay.dto;

public class RoomStatusRequest {
    private String status;
    private String housekeepingStatus;

    public RoomStatusRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getHousekeepingStatus() { return housekeepingStatus; }
    public void setHousekeepingStatus(String housekeepingStatus) { this.housekeepingStatus = housekeepingStatus; }
}
