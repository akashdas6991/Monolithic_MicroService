package com.restaurant.app.service;

import com.restaurant.app.entity.CustomUserDetails;
import com.restaurant.app.entity.OrderDetails;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
public interface UserService {

    ModelMap userUpdate(CustomUserDetails customUserDetails);

    ModelMap userDelete(CustomUserDetails customUserDetails);

    ModelMap userView(CustomUserDetails customUserDetails);

    List<OrderDetails> userOrderList(CustomUserDetails customUserDetails);

    List<CustomUserDetails> userListWithOrderList();

}
