package com.user.service.services;

import com.user.service.entities.User;

import java.util.List;

public interface UserService
{
    //create user
    User saveUser(User user);

    //get all user
    List<User> getUserList();

    //get single user of given userId
    User getUser(String userId);

    //delete single user of given userId
    void deleteUser(String userId);

    //update single user of given userId
    User updateUser(User user);

}
