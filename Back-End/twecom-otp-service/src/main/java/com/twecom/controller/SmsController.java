package com.twecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.twecom.model.OtpDto;
import com.twecom.service.OtpService;

@RestController
public class SmsController {

	@Autowired
	private OtpService service;
	
	
	@PostMapping("/genarateOTP")
	public String genrateOTP(@RequestBody OtpDto otpDto) {
		
		return service.sendOTPForPasswordReset(otpDto);
		
	}
	
	@PostMapping("/validateOTP")
	public String validateOTP(@RequestBody OtpDto otpDto) {
		
		return service.validateOTP(otpDto.getOneTimePassword(), otpDto.getUserName());
		
	}
}
