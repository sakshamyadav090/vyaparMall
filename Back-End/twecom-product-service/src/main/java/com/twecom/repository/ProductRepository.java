package com.twecom.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.ApprovalStatus;
import com.twecom.model.Product;

public interface ProductRepository extends JpaRepository<Product,Integer> {
	List<Product> findBypSupplierId(int supplierId);
	List<Product> findByIsApproved(ApprovalStatus status);
}
