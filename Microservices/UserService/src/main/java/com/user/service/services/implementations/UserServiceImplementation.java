package com.user.service.services.implementations;

import com.user.service.entities.Rating;
import com.user.service.entities.User;
import com.user.service.exceptions.ResourceNotFoundException;
import com.user.service.repositories.UserRepository;
import com.user.service.services.RatingService;
import com.user.service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class UserServiceImplementation implements UserService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RatingService ratingService;

    @Override
    public User saveUser(User user) {

        String randomUserId = UUID.randomUUID().toString();

        user.setUserId(randomUserId);

        return userRepository.save(user);
    }

    @Override
    public List<User> getUserList() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String userId) {

        User user = userRepository.findById(userId).orElseThrow( () -> new ResourceNotFoundException( "User not found." ));

        //call the rating service and get the ratings based on the given user id

        //1 - using RestTemplate

        //ArrayList<Rating> ratings =  restTemplate.getForObject("http://localhost:8082/ratings/rating/user/"+userId, ArrayList.class);

        //using app name instead of host:port using restTemplate load balanced
        //ArrayList<Rating> ratings =  restTemplate.getForObject("http://RATING-SERVICE/ratings/rating/user/"+userId, ArrayList.class);

        //2 - using feign client (declarative HTTP web client Developed by netflix)

        ArrayList<Rating> ratings = ratingService.getRating(userId);

        user.setRatings(ratings);

        return user;


    }

    @Override
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(User user) {

        return userRepository.save(user);
    }
}
