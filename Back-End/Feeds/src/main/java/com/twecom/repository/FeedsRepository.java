package com.twecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.Feeds;

public interface FeedsRepository extends JpaRepository<Feeds, Integer>{
	
Feeds findByName (String name);
}
