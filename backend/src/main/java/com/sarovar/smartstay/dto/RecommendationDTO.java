package com.sarovar.smartstay.dto;

import com.sarovar.smartstay.entity.MenuItem;
import java.util.List;

public class RecommendationDTO {
    private String title;
    private String explanation;
    private List<MenuItem> recommendedItems;

    public RecommendationDTO() {}

    public RecommendationDTO(String title, String explanation, List<MenuItem> recommendedItems) {
        this.title = title;
        this.explanation = explanation;
        this.recommendedItems = recommendedItems;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public List<MenuItem> getRecommendedItems() { return recommendedItems; }
    public void setRecommendedItems(List<MenuItem> recommendedItems) { this.recommendedItems = recommendedItems; }
}
