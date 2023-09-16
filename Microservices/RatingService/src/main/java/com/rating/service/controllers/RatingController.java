package com.rating.service.controllers;

import com.rating.service.entities.Rating;
import com.rating.service.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping("/rating/create")
    public ResponseEntity<Rating> createRating(@RequestBody Rating rating)
    {
        Rating createdRating = ratingService.createRating(rating);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdRating);
    }

    @GetMapping("/rating/list")
    public ResponseEntity<List<Rating>> getAllRatings()
    {
        List<Rating> ratingList = ratingService.getAllRating();

        return ResponseEntity.ok(ratingList);
    }

    @GetMapping("/rating/{ratingId}")
    public ResponseEntity<Rating> getRatingByRatingId(@PathVariable String rating)
    {
        return ResponseEntity.ok(ratingService.getRatingByRatingId(rating));
    }

    @GetMapping("/rating/user/{userId}")
    public ResponseEntity<List<Rating>> getRatingByUserId(@PathVariable String userId)
    {
        return ResponseEntity.ok(ratingService.getRatingByUserId(userId));
    }

    @GetMapping("/rating/delete/{ratingId}")
    public ResponseEntity<String> deleteRatingByRatingId(@PathVariable String rating)
    {
        ratingService.deleteRatingByRatingId(rating);

        return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
    }

    @PostMapping("/rating/update")
    public ResponseEntity<Rating> updateRating(@RequestBody Rating updateRating)
    {
        Rating existingRating = ratingService.getRatingByRatingId(updateRating.getRatingId());

        if(!existingRating.equals(null))
        {
            existingRating.setFeedback(updateRating.getFeedback());
            existingRating.setHotelId(updateRating.getHotelId());
            existingRating.setUserId(updateRating.getUserId());
            existingRating.setRating(updateRating.getRating());

        }
        else
        {
            throw new RuntimeException("rating id not found");

        }
        Rating rating = ratingService.updateRating(existingRating);

        return ResponseEntity.ok(rating) ;

    }
}
