package com.twecom.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twecom.model.OtpDto;
import com.twecom.repository.OTPRepository;

@Service
public class OtpService {
	
	@Autowired
	private OTPRepository otpRepo;
	 
//	 public static final String ACCOUNT_SID = "AC5607b1ed2915c5db75e6a7242a1a0604";
//	 public static final String AUTH_TOKEN = "bee22201c3b138bf1784a5ced07f7cf5";


	    Map<String, String> otpMap = new HashMap<>();

	    public String sendOTPForPasswordReset(OtpDto otpDto) {


//	            PhoneNumber to = new PhoneNumber(otpDto.getPhoneNumber());
//	            PhoneNumber from = new PhoneNumber("+12535232062");
	            String otp = new String(OTP(6));
	            String otpMessage = "Dear Customer , Your OTP is ##" + otp + "##. Use this Passcode to complete your transaction. Thank You.";
//	            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
//	            Message message = Message.creator(
//	                    to,
//	                    from,
//	                    otpMessage)
//	                .create();
	            otpDto.setOneTimePassword(otp);
	            otpRepo.save(otpDto);

	            System.out.println(otpDto.getPhoneNumber()+"---"+otp);
	            otpMap.put(otpDto.getPhoneNumber(), otp);
	            return otpMessage;
	    }

	    public String validateOTP(String userInputOtp, String userName) {
	    	OtpDto otpDto = otpRepo.findById(userName).get();
	    	System.out.println(otpDto.getOneTimePassword());
	    	System.out.println(userInputOtp);
	    	System.out.println(userInputOtp.equals(otpDto.getOneTimePassword()));
	        if (userInputOtp.equals(otpDto.getOneTimePassword())) {
	        	otpRepo.deleteById(userName);
	            return "Valid OTP please proceed with your transaction !";
	        } else {
	            throw new IllegalArgumentException("Invalid otp please retry !");
	        }
	    }

//	    //6 digit otp
//	    private String generateOTP() {
//	        return new DecimalFormat("000000")
//	                .format(new Random().nextInt(999999));
//	    }
	    
	    private char[] OTP(int len)
		{
			String numbers = "123456789";
			Random rndm_method = new Random();
			char[] otp = new char[len];
			for (int i = 0; i < len; i++)
			{
				otp[i] = numbers.charAt(rndm_method.nextInt(numbers.length()));
			}
			return otp;
		}

}
