package com.user.service.controller;

import com.user.service.entities.User;
import com.user.service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    //create user
    @PostMapping("/user/create")
    public ResponseEntity<User> createUser(@RequestBody User user)
    {
        User newUser = userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    //all user get
    @GetMapping("/user/list")
    public ResponseEntity<List<User>> getAllUserList(){

        List<User> userList = userService.getUserList();

        return  ResponseEntity.ok(userList);
    }

    //single user get
    @GetMapping("/user/get/{userId}")
    public ResponseEntity<User> getSingleUser(@PathVariable String userId)
    {
        User user = userService.getUser(userId);

        //call the rating service and get the ratings based on the given user id

        return ResponseEntity.ok(user);
    }

    //single user delete
    @GetMapping("/user/delete/{userId}")
    public ResponseEntity deleteUser(@PathVariable String userId)
    {
        userService.deleteUser(userId);

        return  ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
    }

    //single user update
    @PostMapping("/user/update")
    public ResponseEntity updateUser(@RequestBody User updateUser)
    {
        // Retrieve the entity object
        User user = userService.getUser(updateUser.getUserId());

        //update
        if(user != null)
        {
            user.setName(updateUser.getName());
            user.setEmail(updateUser.getEmail());
            user.setAbout(updateUser.getAbout());
        }

        User updatedUser = userService.updateUser(user);

        return ResponseEntity.ok(updatedUser);
    }
}
