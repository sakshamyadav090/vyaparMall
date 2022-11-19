package com.twecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	Category findByNameIgnoreCase(String name);
}
