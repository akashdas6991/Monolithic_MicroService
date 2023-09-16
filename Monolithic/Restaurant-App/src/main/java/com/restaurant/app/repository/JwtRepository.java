package com.restaurant.app.repository;

import com.restaurant.app.entity.JwtDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtRepository extends JpaRepository<JwtDetails, Integer> {

    JwtDetails findByUserEmail(String userEmail);

}
