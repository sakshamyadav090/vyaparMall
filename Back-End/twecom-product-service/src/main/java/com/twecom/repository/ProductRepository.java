package com.twecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.Product;

public interface ProductRepository extends JpaRepository<Product,Integer> {

}
