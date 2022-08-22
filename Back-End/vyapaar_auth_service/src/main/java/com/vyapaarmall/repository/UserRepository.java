package com.vyapaarmall.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vyapaarmall.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByeMail(String eMail);
	User findByMobileNumber(String mobileNumber);
}
