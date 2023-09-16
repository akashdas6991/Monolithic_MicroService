package com.rating.service.services.implementations;

import com.rating.service.entities.Rating;
import com.rating.service.repositories.RatingRepository;
import com.rating.service.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImplementation implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public Rating createRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getAllRating() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> getRatingByUserId(String userId) {
        return ratingRepository.findByUserId(userId);
    }

    @Override
    public Rating getRatingByRatingId(String ratingId) {
        return  ratingRepository.findById(ratingId).get();
    }

    @Override
    public void deleteRatingByRatingId(String ratingId) {

        ratingRepository.deleteById(ratingId);
    }

    @Override
    public Rating updateRating(Rating rating) {
        return null;
    }
}
