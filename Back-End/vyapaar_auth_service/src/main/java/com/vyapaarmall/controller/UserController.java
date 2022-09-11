package com.vyapaarmall.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vyapaarmall.model.ResponseModel;
import com.vyapaarmall.model.User;
import com.vyapaarmall.service.UserService;

@RestController
@RequestMapping("/auth")
//@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/register")
	public ResponseModel register(@RequestBody User user) {
		
		try {
		return new ResponseModel(
				userService.registerUser(user),201,true,"User Created");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),404,false,"Failed to Create User");
		}
	}
	
	
	@GetMapping("/verify-token/{token}")
	public ResponseModel verifyToken(@PathVariable String token) {
	try {
		return new ResponseModel(
				userService.verifyToken(token), 200, true, "Token Verified");
	} catch(Exception e) {
		return new ResponseModel(
				e.getMessage(), 404, false, "Please provide a valid token");
	}
	}
}
