package com.sarovar.smartstay.service;

import com.sarovar.smartstay.dto.OrderRequest;
import com.sarovar.smartstay.dto.OrderItemDTO;
import com.sarovar.smartstay.entity.*;
import com.sarovar.smartstay.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private MenuCategoryRepository menuCategoryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private SecurityAuditService securityAuditService;

    public List<MenuCategory> getAllCategories() {
        return menuCategoryRepository.findAll();
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public List<MenuItem> getMenuItemsByCategory(Long categoryId) {
        return menuItemRepository.findByCategoryId(categoryId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order placeOrder(OrderRequest request, String username) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("Order must contain at least one menu item!");
        }

        Order order = new Order();
        order.setOrderNumber("ORD-" + System.currentTimeMillis() % 1000000);
        order.setOrderType(request.getOrderType() != null ? request.getOrderType() : "DINE_IN");
        order.setOrderStatus("PLACED");
        order.setPaymentStatus("PAID");

        if (request.getCustomerId() != null) {
            customerRepository.findById(request.getCustomerId()).ifPresent(order::setCustomer);
        }
        if (request.getRoomId() != null) {
            roomRepository.findById(request.getRoomId()).ifPresent(order::setRoom);
        }

        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemDTO itemDto : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemDto.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu Item not found with ID: " + itemDto.getMenuItemId()));

            BigDecimal itemSubtotal = menuItem.getPrice().multiply(new BigDecimal(itemDto.getQuantity()));
            subtotal = subtotal.add(itemSubtotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setUnitPrice(menuItem.getPrice());
            orderItem.setSubtotal(itemSubtotal);
            orderItems.add(orderItem);
        }

        BigDecimal tax = subtotal.multiply(new BigDecimal("0.05")).setScale(2, RoundingMode.HALF_UP); // 5% GST
        BigDecimal total = subtotal.add(tax).setScale(2, RoundingMode.HALF_UP);

        order.setSubtotal(subtotal);
        order.setTax(tax);
        order.setTotalAmount(total);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        securityAuditService.logEvent(
                username != null ? username : "CUSTOMER",
                "PLACE_RESTAURANT_ORDER",
                "127.0.0.1",
                "SUCCESS",
                0,
                "Order " + savedOrder.getOrderNumber() + " placed for ₹" + total
        );

        return savedOrder;
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String newStatus, String username) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setOrderStatus(newStatus);
        Order updated = orderRepository.save(order);

        securityAuditService.logEvent(
                username != null ? username : "RESTAURANT_STAFF",
                "UPDATE_ORDER_STATUS",
                "127.0.0.1",
                "SUCCESS",
                0,
                "Order " + order.getOrderNumber() + " status changed to: " + newStatus
        );

        return updated;
    }
}
