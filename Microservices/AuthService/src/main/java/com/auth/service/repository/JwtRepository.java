package com.auth.service.repository;

import com.auth.service.entity.JwtDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtRepository extends JpaRepository<JwtDetails, Integer> {

    JwtDetails findByUserEmail(String userEmail);

}
