package com.sarovar.smartstay.repository;

import com.sarovar.smartstay.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomNumber(String roomNumber);
    List<Room> findByStatus(String status);
    List<Room> findByHousekeepingStatus(String housekeepingStatus);
    long countByStatus(String status);
}
