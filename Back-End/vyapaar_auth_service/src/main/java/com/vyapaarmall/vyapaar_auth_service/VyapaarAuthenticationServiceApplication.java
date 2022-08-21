package com.vyapaarmall.vyapaar_auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class VyapaarAuthenticationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(VyapaarAuthenticationServiceApplication.class, args);
	}

}
