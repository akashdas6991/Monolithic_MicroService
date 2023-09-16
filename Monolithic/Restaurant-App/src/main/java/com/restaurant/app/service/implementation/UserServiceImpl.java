package com.restaurant.app.service.implementation;

import com.restaurant.app.entity.CustomUserDetails;
import com.restaurant.app.entity.OrderDetails;
import com.restaurant.app.repository.OrderRepository;
import com.restaurant.app.repository.UserRepository;
import com.restaurant.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public ModelMap userUpdate(CustomUserDetails customUserDetails)
    {
        ModelMap response = new ModelMap();

        //find user in db
        CustomUserDetails customUserDetailsFound = userRepository.findByUserEmail(customUserDetails.getUserEmail());

        if(customUserDetailsFound != null)
        {
            //find user in db ,if user found , update data
            customUserDetailsFound.setUserNamee(customUserDetails.getUserNamee());
            customUserDetailsFound.setUserMobile(customUserDetails.getUserMobile());
            customUserDetailsFound.setUserPassword(customUserDetails.getUserPassword());

            //find user in db ,if user found , update data , save in db
            CustomUserDetails customUserDetailsUpdated = userRepository.save(customUserDetailsFound);

            //find user in db ,if user found , update data , save in db , give updated user data
            response.put("userNamee",customUserDetailsUpdated.getUserNamee());
            response.put("userEmail",customUserDetailsUpdated.getUserEmail());
            response.put("userMobile",customUserDetailsUpdated.getUserMobile());
            response.put("message", "User updated successfully");
            response.put("httpStatus", HttpStatus.OK);
        }
        else
        {
            //find user in db ,if user not found , give not found
            response.put("message", "User does not exist.");
            response.put("httpStatus", HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @Override
    public ModelMap userDelete(CustomUserDetails customUserDetails)
    {
        ModelMap response = new ModelMap();

        //find user in db
        CustomUserDetails customUserDetailsFound = userRepository.findByUserEmail(customUserDetails.getUserEmail());

        if(customUserDetailsFound != null)
        {
            //find user in db , if user found , delete user data
            userRepository.delete(customUserDetails);

            //find user in db , if user found , delete user data , find again to confirm
            CustomUserDetails customUserDetailsFindCheck = userRepository.findByUserEmail(customUserDetails.getUserEmail());

            if(customUserDetailsFindCheck == null)
            {
                //find user in db , if user found , delete user data , find again to confirm , if user not found , deletion successful
                response.put("httpStatus", HttpStatus.OK);
                response.put("message", "User deleted successfully");
            }
            else
            {
                //find user in db , if user found , delete user data , find again to confirm , if user found , deletion failed
                response.put("httpStatus", HttpStatus.NOT_ACCEPTABLE);
                response.put("message", "User cannot be deleted.");
            }
        }
        else
        {
            //find user in db , if user not found , give user not found
            response.put("message", "User does not exist.");
            response.put("httpStatus", HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @Override
    public ModelMap userView(CustomUserDetails customUserDetails)
    {
        ModelMap response = new ModelMap();

        //find user in db
        CustomUserDetails customUserDetailsFound = userRepository.findByUserEmail(customUserDetails.getUserEmail());

        if(customUserDetailsFound != null)
        {
            //find user in db , if user found , give user data
            response.put("userNamee",customUserDetailsFound.getUserNamee());
            response.put("userEmail",customUserDetailsFound.getUserEmail());
            response.put("userMobile",customUserDetailsFound.getUserMobile());
            response.put("message", "User found.");
            response.put("httpStatus", HttpStatus.FOUND);
        }
        else
        {
            //find user in db , if user not found , give user not found
            response.put("message", "User does not exist.");
            response.put("httpStatus", HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @Override
    public List<OrderDetails> userOrderList(CustomUserDetails customUserDetails)
    {
       List<OrderDetails> userOrderList =  orderRepository.findByUserEmail(customUserDetails.getUserEmail());

       return userOrderList;
    }

    @Override
    public List<CustomUserDetails> userListWithOrderList() {

        List<CustomUserDetails> userListWithOrderList =  userRepository.findAll() ;

        //get order list of all user

        return userListWithOrderList;
    }
}
