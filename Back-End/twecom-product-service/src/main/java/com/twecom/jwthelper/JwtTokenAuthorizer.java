package com.twecom.jwthelper;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.twecom.model.ResponseModel;

@Component
public class JwtTokenAuthorizer {
	
	@Autowired
	private RestTemplate restTemplate;
	 
	public int isTokenValid(String token) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.set("Authorization", token);

			HttpEntity<String> entity = new HttpEntity<>("body", headers);

			ResponseModel rm = restTemplate.
					exchange("http://localhost:9090/auth-service/auth/verify-token", HttpMethod.GET, entity, ResponseModel.class).getBody();
			if(rm.isSuccess()) {
				String id = rm.getData().toString().substring(8,10).trim();
				if(id.contains(",")) {
					return Character.getNumericValue(id.charAt(0));
				}
				return Integer.parseInt(id);
				 
			}else {
				throw new RuntimeException("Invalid JWT Token");
			}
		}catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
	


}
