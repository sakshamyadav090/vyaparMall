package com.twecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.twecom.model.OtpDto;
import com.twecom.model.ResponseModel;
import com.twecom.service.OtpService;

@RestController
@CrossOrigin("*")
public class SmsController {

	@Autowired
	private OtpService service;
	
	
	@PutMapping("/genarateOTP")
	public ResponseModel genrateOTP(@RequestBody OtpDto otpDto) {
		try {
			return new ResponseModel(service.sendOTPForPasswordReset(otpDto),200,true,"Success");
		}catch(Exception ex) {
			return new ResponseModel(ex.getMessage(),200,true,"Failed");
		}
		
	}
	
	@PutMapping("/validateOTP")
	public ResponseModel validateOTP(@RequestBody OtpDto otpDto) {
		try {
			return new ResponseModel(service.validateOTP(otpDto.getOneTimePassword(), otpDto.getPhoneNumber()),200,true,"Success");
		}catch(Exception ex) {
			return new ResponseModel(ex.getMessage(),200,false,"Failed");
		}
		
	}
}
