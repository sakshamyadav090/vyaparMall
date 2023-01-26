package com.vyapaarmall.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vyapaarmall.model.Role;
import com.vyapaarmall.model.Status;
import com.vyapaarmall.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByEmail(String email);
	User findByMobileNumber(String mobileNumber);
	List<User> findByStatus(Status status);
	List<User> findByRole(Role roleId);
	
	
}
