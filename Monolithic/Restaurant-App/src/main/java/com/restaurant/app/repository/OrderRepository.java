package com.restaurant.app.repository;

import com.restaurant.app.entity.OrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<OrderDetails , Integer> {

    OrderDetails findByOrderId(Integer orderId);

    void deleteByOrderId(Integer orderId);

    List<OrderDetails> findByUserEmail(String UserEmail);
}
