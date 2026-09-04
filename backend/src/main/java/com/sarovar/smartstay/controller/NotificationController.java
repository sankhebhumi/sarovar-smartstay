package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping(path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamNotifications() {
        return notificationService.subscribe();
    }

    @PostMapping("/broadcast")
    public void broadcastNotification(@RequestBody Map<String, String> payload) {
        String title = payload.getOrDefault("title", "Sarovar System Update");
        String message = payload.getOrDefault("message", "System event triggered.");
        String type = payload.getOrDefault("type", "INFO");
        notificationService.sendNotification(title, message, type);
    }
}
