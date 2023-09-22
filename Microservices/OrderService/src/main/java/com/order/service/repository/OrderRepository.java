package com.order.service.repository;

import com.order.service.entity.OrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<OrderDetails, Integer> {

    OrderDetails findByOrderId(Integer orderId);

    void deleteByOrderId(Integer orderId);

    List<OrderDetails> findByUserEmail(String UserEmail);
}

