package com.rating.service.services;

import com.rating.service.entities.Rating;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RatingService {

    //create
    public Rating createRating(Rating rating);

    //get all ratings
    public List<Rating> getAllRating();

    //get single rating by user id
    public List<Rating> getRatingByUserId(String userId);

    //get single rating by rating id
    public Rating getRatingByRatingId(String ratingId);


    //delete by rating id
    public void deleteRatingByRatingId(String ratingId);

    //update
    public Rating updateRating(Rating rating);
}
