package com.sarovar.smartstay.dto;

public class OrderItemDTO {
    private Long menuItemId;
    private Integer quantity;

    public OrderItemDTO() {}

    public OrderItemDTO(Long menuItemId, Integer quantity) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
    }

    public Long getMenuItemId() { return menuItemId; }
    public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
