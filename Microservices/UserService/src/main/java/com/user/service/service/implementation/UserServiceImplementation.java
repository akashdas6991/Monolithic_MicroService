package com.user.service.service.implementation;

import com.user.service.entity.UserDetails;
import com.user.service.repository.UserRepository;
import com.user.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    //@Autowired
    //private OrderRepository orderRepository;

    @Override
    public ModelMap userUpdate(UserDetails userDetails)
    {
        ModelMap response = new ModelMap();

        //find user in db
        UserDetails userDetailsFound = userRepository.findByUserEmail(userDetails.getUserEmail());

        if(userDetailsFound != null)
        {
            //find user in db ,if user found , update data
            userDetailsFound.setUserNamee(userDetails.getUserNamee());
            userDetailsFound.setUserMobile(userDetails.getUserMobile());
            userDetailsFound.setUserPassword(userDetails.getUserPassword());

            //find user in db ,if user found , update data , save in db
            UserDetails customUserDetailsUpdated = userRepository.save(userDetailsFound);

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
    public ModelMap userDelete(UserDetails userDetails)
    {
        ModelMap response = new ModelMap();

        //find user in db
        UserDetails userDetailsFound = userRepository.findByUserEmail(userDetails.getUserEmail());

        if(userDetailsFound != null)
        {
            //find user in db , if user found , delete user data
            userRepository.delete(userDetails);

            //find user in db , if user found , delete user data , find again to confirm
            UserDetails userDetailsFindCheck = userRepository.findByUserEmail(userDetails.getUserEmail());

            if(userDetailsFindCheck == null)
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
    public ModelMap userView(UserDetails userDetails)
    {
        ModelMap response = new ModelMap();

        //find user in db
        UserDetails userDetailsFound = userRepository.findByUserEmail(userDetails.getUserEmail());

        if(userDetailsFound != null)
        {
            //find user in db , if user found , give user data
            response.put("userNamee",userDetailsFound.getUserNamee());
            response.put("userEmail",userDetailsFound.getUserEmail());
            response.put("userMobile",userDetailsFound.getUserMobile());
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

    //    @Override
    //    public List<OrderDetails> userOrderList(CustomUserDetails customUserDetails)
    //    {
    //        List<OrderDetails> userOrderList =  orderRepository.findByUserEmail(customUserDetails.getUserEmail());
    //
    //        return userOrderList;
    //    }

    @Override
    public List<UserDetails> userListWithOrderList() {

        List<UserDetails> userListWithOrderList =  userRepository.findAll() ;

        //get order list of all user

        return userListWithOrderList;
    }
}
