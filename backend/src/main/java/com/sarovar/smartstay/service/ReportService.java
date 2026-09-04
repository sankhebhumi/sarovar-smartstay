package com.sarovar.smartstay.service;

import com.sarovar.smartstay.entity.Booking;
import com.sarovar.smartstay.entity.MenuItem;
import com.sarovar.smartstay.entity.Order;
import com.sarovar.smartstay.entity.Room;
import com.sarovar.smartstay.repository.BookingRepository;
import com.sarovar.smartstay.repository.MenuItemRepository;
import com.sarovar.smartstay.repository.OrderRepository;
import com.sarovar.smartstay.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    public String generateOccupancyCsv() {
        StringBuilder sb = new StringBuilder();
        sb.append("Room Number,Floor,Category,Price Per Night,Status,Housekeeping Status\n");

        List<Room> rooms = roomRepository.findAll();
        for (Room r : rooms) {
            sb.append(r.getRoomNumber()).append(",")
              .append(r.getFloor()).append(",")
              .append(r.getRoomType() != null ? r.getRoomType().getName() : "Standard").append(",")
              .append(r.getPricePerNight()).append(",")
              .append(r.getStatus()).append(",")
              .append(r.getHousekeepingStatus()).append("\n");
        }
        return sb.toString();
    }

    public String generateFinancialCsv() {
        StringBuilder sb = new StringBuilder();
        sb.append("Booking Ref,Customer,Check-In,Check-Out,Total Amount,Booking Status,Payment Status\n");

        List<Booking> bookings = bookingRepository.findAll();
        for (Booking b : bookings) {
            sb.append(b.getBookingReference()).append(",")
              .append(b.getCustomer() != null ? b.getCustomer().getName() : "Guest").append(",")
              .append(b.getCheckInDate()).append(",")
              .append(b.getCheckOutDate()).append(",")
              .append(b.getTotalAmount()).append(",")
              .append(b.getBookingStatus()).append(",")
              .append(b.getPaymentStatus()).append("\n");
        }
        return sb.toString();
    }

    public String generateRestaurantCsv() {
        StringBuilder sb = new StringBuilder();
        sb.append("Order Number,Type,Subtotal,Tax (5%),Total Amount,Order Status\n");

        List<Order> orders = orderRepository.findAll();
        for (Order o : orders) {
            sb.append(o.getOrderNumber()).append(",")
              .append(o.getOrderType()).append(",")
              .append(o.getSubtotal()).append(",")
              .append(o.getTax()).append(",")
              .append(o.getTotalAmount()).append(",")
              .append(o.getOrderStatus()).append("\n");
        }
        return sb.toString();
    }
}
