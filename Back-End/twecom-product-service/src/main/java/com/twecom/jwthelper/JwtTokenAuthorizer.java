package com.twecom.jwthelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import com.twecom.model.ResponseModel;

public class JwtTokenAuthorizer {
	
	@Autowired
	private RestTemplate restTemplate;
	
	public ResponseModel isTokenValid(String token) {
		try {
		ResponseModel rm = restTemplate
				.getForEntity("http://localhost:9090/auth-service/auth/verify-token", ResponseModel.class).getBody();
		if(rm.isSuccess()) {
			return rm;
		}else {
			throw new RuntimeException("Invalid JWT Token");
		}
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),403,false,"Unauthorized");
		}
	}

}
