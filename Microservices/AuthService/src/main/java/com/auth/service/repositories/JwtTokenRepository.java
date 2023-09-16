package com.auth.service.repositories;

import com.auth.service.entities.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtTokenRepository extends JpaRepository<JwtToken, Integer> {

    JwtToken findByUser(String user);

}
