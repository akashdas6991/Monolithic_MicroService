package com.user.service.service;

import com.user.service.entity.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
public interface UserService {

    ModelMap userUpdate(UserDetails userDetails);

    ModelMap userDelete(UserDetails userDetails);

    ModelMap userView(UserDetails userDetails);

    //List<OrderDetails> userOrderList(UserDetails customUserDetails);

    List<UserDetails> userListWithOrderList();

}
