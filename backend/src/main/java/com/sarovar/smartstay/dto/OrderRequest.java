package com.sarovar.smartstay.dto;

import java.util.List;

public class OrderRequest {
    private Long customerId;
    private Long roomId;
    private String orderType; // DINE_IN, ROOM_SERVICE, TAKEAWAY
    private List<OrderItemDTO> items;

    public OrderRequest() {}

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getOrderType() { return orderType; }
    public void setOrderType(String orderType) { this.orderType = orderType; }

    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
}
