package com.twecom.service;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twecom.config.TwilioConfig;
import com.twecom.model.OtpDto;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class OtpService {
	 
//	 public static final String ACCOUNT_SID = "AC5607b1ed2915c5db75e6a7242a1a0604";
//	 public static final String AUTH_TOKEN = "bee22201c3b138bf1784a5ced07f7cf5";


	    Map<String, String> otpMap = new HashMap<>();

	    public String sendOTPForPasswordReset(OtpDto otpDto) {


//	            PhoneNumber to = new PhoneNumber(otpDto.getPhoneNumber());
//	            PhoneNumber from = new PhoneNumber("+12535232062");
	            String otp = generateOTP();
	            String otpMessage = "Dear Customer , Your OTP is ##" + otp + "##. Use this Passcode to complete your transaction. Thank You.";
//	            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
//	            Message message = Message.creator(
//	                    to,
//	                    from,
//	                    otpMessage)
//	                .create();
	            

	            System.out.println(otpDto.getUserName()+"---"+otp);
	            otpMap.put(otpDto.getUserName(), otp);
	            return otpMessage;
	    }

	    public String validateOTP(String userInputOtp, String userName) {
	        if (userInputOtp.equals(otpMap.get(userName))) {
	            otpMap.remove(userName,userInputOtp);
	            return "Valid OTP please proceed with your transaction !";
	        } else {
	            throw new IllegalArgumentException("Invalid otp please retry !");
	        }
	    }

	    //6 digit otp
	    private String generateOTP() {
	        return new DecimalFormat("000000")
	                .format(new Random().nextInt(999999));
	    }

}
