package com.twecom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication @EnableEurekaClient
public class TwecomProductServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TwecomProductServiceApplication.class, args);
	}

}
