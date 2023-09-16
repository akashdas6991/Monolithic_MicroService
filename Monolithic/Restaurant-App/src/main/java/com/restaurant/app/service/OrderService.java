package com.restaurant.app.service;

import com.restaurant.app.entity.OrderDetails;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
public interface OrderService {

    ModelMap orderSave(OrderDetails orderDetails);

    ModelMap orderDelete(OrderDetails orderDetails);

    ModelMap orderView(OrderDetails orderDetails);

    List<OrderDetails> orderList();
}
