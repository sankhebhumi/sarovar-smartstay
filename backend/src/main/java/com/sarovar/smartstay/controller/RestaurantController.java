package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.dto.OrderRequest;
import com.sarovar.smartstay.entity.MenuCategory;
import com.sarovar.smartstay.entity.MenuItem;
import com.sarovar.smartstay.entity.Order;
import com.sarovar.smartstay.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/categories")
    public ResponseEntity<List<MenuCategory>> getCategories() {
        return ResponseEntity.ok(restaurantService.getAllCategories());
    }

    @GetMapping("/menu")
    public ResponseEntity<List<MenuItem>> getMenu() {
        return ResponseEntity.ok(restaurantService.getAllMenuItems());
    }

    @GetMapping("/menu/category/{categoryId}")
    public ResponseEntity<List<MenuItem>> getMenuByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(restaurantService.getMenuItemsByCategory(categoryId));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders() {
        return ResponseEntity.ok(restaurantService.getAllOrders());
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest request, Principal principal) {
        String username = principal != null ? principal.getName() : "CUSTOMER";
        return ResponseEntity.ok(restaurantService.placeOrder(request, username));
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status, Principal principal) {
        String username = principal != null ? principal.getName() : "RESTAURANT_STAFF";
        return ResponseEntity.ok(restaurantService.updateOrderStatus(orderId, status, username));
    }
}
