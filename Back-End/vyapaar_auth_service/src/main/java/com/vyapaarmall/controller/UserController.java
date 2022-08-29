package com.vyapaarmall.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.vyapaarmall.model.LoginCredentials;
import com.vyapaarmall.model.User;
import com.vyapaarmall.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/register")
	public void register(@RequestBody User user) {
		userService.registerUser(user);
	}
	
	@PostMapping("/login")
	public User login(@RequestBody LoginCredentials creds) {
		return userService.loginUser(creds);
	}
	
//	@GetMapping("/verify-token/{token}")
//	public boolean verifyToken(@PathVariable String token) {
//	boolean verifiedToken = false;
//
//	if (token != null ) {
//	try {
//	// String token = header.substring(SecurityConstants.TOKEN_PREFIX.length());
//	Algorithm algorithm =Algorithm.HMAC256("secret".getBytes());
//	JWTVerifier verifier=JWT.require(algorithm).build();
//	DecodedJWT decodedJWT = verifier.verify(token);
//	String username=decodedJWT.getSubject();
//	if(username!=null) {
//	verifiedToken = true;
//	}
//	}catch(Exception ex) {
//
//	}
//	}
//	return verifiedToken;
//	}
}
