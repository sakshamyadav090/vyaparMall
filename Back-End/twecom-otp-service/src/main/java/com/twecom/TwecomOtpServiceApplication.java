package com.twecom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class TwecomOtpServiceApplication extends SpringBootServletInitializer {
	
//	@Autowired
//	private TwilioConfig twilioConfig;
//
//	@PostConstruct
//	public void initTwilio(){
//		Twilio.init(twilioConfig.getAccountSid(),twilioConfig.getAuthToken());
//	}
	
	public static void main(String[] args) {
		SpringApplication.run(TwecomOtpServiceApplication.class, args);
	}

}
