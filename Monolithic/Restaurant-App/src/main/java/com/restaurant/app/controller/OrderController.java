package com.restaurant.app.controller;

import com.restaurant.app.entity.OrderDetails;
import com.restaurant.app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "${restaurant.app.mobile.web.url}")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order/save")
    private ResponseEntity<ModelMap> orderSave(@RequestBody OrderDetails orderDetails){

        ModelMap response = orderService.orderSave(orderDetails);

        return  ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/order/delete")
    private ResponseEntity<ModelMap> orderDelete(@RequestBody OrderDetails orderDetails){

        ModelMap response = orderService.orderDelete(orderDetails);

        return  ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/order/view")
    private ResponseEntity<ModelMap> orderView(@RequestBody OrderDetails orderDetails){

        ModelMap response = orderService.orderView(orderDetails);

        return  ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @GetMapping("/order/list")
    private ResponseEntity<List<OrderDetails>> orderList(){

        List<OrderDetails> response = orderService.orderList();

        return  ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
