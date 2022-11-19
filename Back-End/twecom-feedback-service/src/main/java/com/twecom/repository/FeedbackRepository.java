package com.twecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{
	
	List<Feedback> findByProductId(int productId);
	List<Feedback> findByUserIdAndProductId(int userId, int productId);

}
