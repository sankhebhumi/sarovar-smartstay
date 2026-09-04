package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.dto.RoomStatusRequest;
import com.sarovar.smartstay.entity.Room;
import com.sarovar.smartstay.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Room> updateRoomStatus(@PathVariable Long id, @RequestBody RoomStatusRequest request, Principal principal) {
        String username = principal != null ? principal.getName() : "STAFF";
        return ResponseEntity.ok(roomService.updateRoomStatus(id, request, username));
    }
}
