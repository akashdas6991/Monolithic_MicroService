package com.restaurant.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("order_details")
public class OrderDetails {


    @MongoId
    private int orderId;
    private String orderName;
    private float orderRating;
    private String orderItems;
    private String orderFeedback;
    private String userEmail;

}
