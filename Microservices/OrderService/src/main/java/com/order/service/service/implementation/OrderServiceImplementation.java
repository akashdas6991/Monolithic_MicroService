package com.order.service.service.implementation;

import com.order.service.entity.OrderDetails;
import com.order.service.repository.OrderRepository;
import com.order.service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
public class OrderServiceImplementation implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public ModelMap orderSave(OrderDetails orderDetails) {

        ModelMap response = new ModelMap();

        OrderDetails orderDetailsSaved = new OrderDetails();

        OrderDetails orderDetailsFound = orderRepository.findByOrderId(orderDetails.getOrderId());

        if( orderDetailsFound != null)
        {
            orderDetailsFound.setOrderFeedback(orderDetails.getOrderFeedback());
            orderDetailsFound.setOrderItems(orderDetails.getOrderItems());
            orderDetailsFound.setOrderName(orderDetails.getOrderName());
            orderDetailsFound.setOrderRating(orderDetails.getOrderRating());

            orderDetailsSaved = orderRepository.save(orderDetailsFound);

            response.put("message","Order updated successfully");
            response.put("httpStatus", HttpStatus.OK);
        }
        else
        {
            orderDetails.setOrderId((int) Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));

            orderDetailsSaved = orderRepository.save(orderDetails);

            response.put("message","Order created successfully");
            response.put("httpStatus", HttpStatus.CREATED);
        }

        response.put("orderId",orderDetailsSaved.getOrderId());
        response.put("orderName",orderDetailsSaved.getOrderName());
        response.put("orderFeedback",orderDetailsSaved.getOrderFeedback());
        response.put("orderItems",orderDetailsSaved.getOrderItems());
        response.put("orderRating",orderDetailsSaved.getOrderRating());
        response.put("userEmail",orderDetailsSaved.getUserEmail());

        return response;
    }

    @Override
    public ModelMap orderDelete(OrderDetails orderDetails) {

        ModelMap response = new ModelMap();

        OrderDetails orderDetailsFound = orderRepository.findByOrderId(orderDetails.getOrderId());

        if(orderDetailsFound != null)
        {
            orderRepository.deleteByOrderId(orderDetails.getOrderId());

            OrderDetails orderDetailsFindCheck = orderRepository.findByOrderId(orderDetails.getOrderId());

            if(orderDetailsFindCheck == null)
            {
                response.put("message","Order deleted successfully.");
                response.put("httpStatus", HttpStatus.OK);
            }
            else
            {
                response.put("message","Order cannot be deleted.");
                response.put("httpStatus", HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else
        {
            response.put("message","Order does not exist.");
            response.put("httpStatus", HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @Override
    public ModelMap orderView(OrderDetails orderDetails) {

        ModelMap response = new ModelMap();

        OrderDetails orderDetailsFound = orderRepository.findByOrderId(orderDetails.getOrderId());

        if(orderDetailsFound != null)
        {
            response.put("orderId",orderDetailsFound.getOrderId());
            response.put("orderName",orderDetailsFound.getOrderName());
            response.put("orderFeedback",orderDetailsFound.getOrderFeedback());
            response.put("orderItems",orderDetailsFound.getOrderItems());
            response.put("orderRating",orderDetailsFound.getOrderRating());
            response.put("userEmail",orderDetailsFound.getUserEmail());
            response.put("message","Order found.");
            response.put("httpStatus", HttpStatus.FOUND);
        }
        else
        {
            response.put("message","Order not found.");
            response.put("httpStatus", HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @Override
    public List<OrderDetails> orderList() {

        return orderRepository.findAll();
    }
}

