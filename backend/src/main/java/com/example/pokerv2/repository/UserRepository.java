package com.example.pokerv2.repository;

import com.example.pokerv2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);
    Optional<User> findByUserIdAndPassword(String userId, String password);
}
