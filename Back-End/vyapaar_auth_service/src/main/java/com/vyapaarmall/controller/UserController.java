package com.vyapaarmall.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
