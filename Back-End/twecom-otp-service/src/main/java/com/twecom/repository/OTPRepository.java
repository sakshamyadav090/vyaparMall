package com.twecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twecom.model.OtpDto;

public interface OTPRepository extends JpaRepository<OtpDto, String>{

}
