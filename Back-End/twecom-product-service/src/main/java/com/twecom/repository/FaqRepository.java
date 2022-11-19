package com.twecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.Faq;

public interface FaqRepository extends JpaRepository<Faq, Integer> {
	List<Faq> findByProductId(int pId);
}
