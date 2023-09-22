package com.user.service.repository;

import com.user.service.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDetails, String> {

    UserDetails findByUserEmail(String email);

}
