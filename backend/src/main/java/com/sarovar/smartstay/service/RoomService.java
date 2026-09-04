package com.sarovar.smartstay.service;

import com.sarovar.smartstay.dto.RoomStatusRequest;
import com.sarovar.smartstay.entity.Room;
import com.sarovar.smartstay.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private SecurityAuditService securityAuditService;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));
    }

    public List<Room> getRoomsByStatus(String status) {
        return roomRepository.findByStatus(status);
    }

    @Transactional
    public Room updateRoomStatus(Long id, RoomStatusRequest request, String username) {
        Room room = getRoomById(id);
        if (request.getStatus() != null) {
            room.setStatus(request.getStatus());
        }
        if (request.getHousekeepingStatus() != null) {
            room.setHousekeepingStatus(request.getHousekeepingStatus());
            
            // If housekeeping marks room CLEAN, automatically update main status to AVAILABLE if it was CLEANING
            if ("CLEAN".equalsIgnoreCase(request.getHousekeepingStatus()) && "CLEANING".equalsIgnoreCase(room.getStatus())) {
                room.setStatus("AVAILABLE");
            }
        }
        Room updated = roomRepository.save(room);

        securityAuditService.logEvent(
                username != null ? username : "STAFF",
                "UPDATE_ROOM_STATUS",
                "127.0.0.1",
                "SUCCESS",
                0,
                "Room " + room.getRoomNumber() + " status updated to: " + room.getStatus() + " (Housekeeping: " + room.getHousekeepingStatus() + ")"
        );

        return updated;
    }
}
