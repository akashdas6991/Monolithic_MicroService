package com.user.service.services;

import com.user.service.entities.Rating;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;

@FeignClient(name = "RATING-SERVICE")
public interface RatingService {

    @GetMapping("/ratings/rating/user/{userId}")
    public ArrayList<Rating> getRating(@PathVariable String userId);


}
