package com.auth.service.repositories;

import com.auth.service.entities.CustomUserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<CustomUserDetails, String> {

    CustomUserDetails findByEmail(String email);

}
