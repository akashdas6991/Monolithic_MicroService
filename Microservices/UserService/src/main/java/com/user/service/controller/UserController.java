package com.user.service.controller;


import com.user.service.entity.UserDetails;
import com.user.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "${restaurant.app.mobile.web.url}")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user/update")
    private ResponseEntity<ModelMap> userUpdate(@RequestBody UserDetails customUserDetails){

        ModelMap response = userService.userUpdate(customUserDetails);

        return  ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/user/delete")
    private ResponseEntity<ModelMap> userDelete(@RequestBody UserDetails customUserDetails){

        ModelMap response = userService.userDelete(customUserDetails);

        return  ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/user/view")
    private ResponseEntity<ModelMap> userView(@RequestBody UserDetails customUserDetails){

        ModelMap response = userService.userView(customUserDetails);

        return  ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    //    @PostMapping("/user/order/list")
    //    private ResponseEntity<List<OrderDetails>> userOrderList(@RequestBody CustomUserDetails customUserDetails){
    //
    //        List<OrderDetails> response = userService.userOrderList(customUserDetails);
    //
    //        return  ResponseEntity.status(HttpStatus.OK).body(response);
    //    }

    @GetMapping("/user/list")
    private ResponseEntity<List<UserDetails>> userListWithOrderList(){

        List<UserDetails> response = userService.userListWithOrderList();

        return  ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
