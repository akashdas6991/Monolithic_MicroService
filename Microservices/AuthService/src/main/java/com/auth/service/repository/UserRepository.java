package com.auth.service.repository;

import com.auth.service.entity.CustomUserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<CustomUserDetails, String> {

    CustomUserDetails findByUserEmail(String email);

}
