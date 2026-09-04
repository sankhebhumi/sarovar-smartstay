package com.sarovar.smartstay.controller;

import com.sarovar.smartstay.dto.*;
import com.sarovar.smartstay.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @Autowired
    private AIService aiService;

    @GetMapping("/recommendations/{customerId}")
    public ResponseEntity<RecommendationDTO> getFoodRecommendations(@PathVariable Long customerId) {
        return ResponseEntity.ok(aiService.getFoodRecommendations(customerId));
    }

    @GetMapping("/public/recommendations")
    public ResponseEntity<RecommendationDTO> getPublicFoodRecommendations() {
        return ResponseEntity.ok(aiService.getFoodRecommendations(1L));
    }

    @GetMapping("/inventory-predictions")
    public ResponseEntity<List<InventoryPredictionDTO>> getInventoryPredictions() {
        return ResponseEntity.ok(aiService.getInventoryPredictions());
    }

    @GetMapping("/occupancy-prediction")
    public ResponseEntity<OccupancyPredictionDTO> getOccupancyPrediction() {
        return ResponseEntity.ok(aiService.getOccupancyPrediction());
    }

    @GetMapping("/revenue-prediction")
    public ResponseEntity<RevenuePredictionDTO> getRevenuePrediction() {
        return ResponseEntity.ok(aiService.getRevenuePrediction());
    }

    @GetMapping("/staffing-insights")
    public ResponseEntity<StaffingInsightDTO> getStaffingInsights() {
        return ResponseEntity.ok(aiService.getStaffingInsights());
    }
}
