package com.twecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {

}
