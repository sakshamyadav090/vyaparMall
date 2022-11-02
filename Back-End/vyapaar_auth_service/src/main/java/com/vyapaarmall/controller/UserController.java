package com.vyapaarmall.controller;



import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vyapaarmall.model.ResponseModel;
import com.vyapaarmall.model.User;
import com.vyapaarmall.security.config.SecurityConstant;
import com.vyapaarmall.service.UserService;

@RestController
@RequestMapping("/auth")
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
	
	@GetMapping("/suppliers/unapproved")
	public ResponseModel getUnapprovedSuppliers(@RequestHeader("Authorization") String token) {
		try {
			return new ResponseModel(
					userService.getUnapprovedSuppliers(token), 200, true, "User updated");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 403, false, "Unauthorized");
		}
	}
	
	
	@GetMapping("/verify-token")
	public ResponseModel verifyToken(HttpServletRequest req) {
		String header = req.getHeader(SecurityConstant.HEADER_STRING);
		String token = header.substring(SecurityConstant.TOKEN_PREFIX.length());
		try {
			return new ResponseModel(
					userService.verifyToken(token), 200, true, "Token Verified");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 404, false, "Please provide a valid token");
		}
	}
	
	@PutMapping("/user/updateUser")
	public ResponseModel updateUser(@RequestBody User user) {
		try {
			return new ResponseModel(
					userService.updateUser(user), 200, true, "User updated");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 404, false, "Update Failed");
		}
	}
	
	@PatchMapping("/user/updatePassword")
	public ResponseModel updatePassword(@RequestBody User user) {
		try {
			return new ResponseModel(
					userService.updatePassword(user), 200, true, "User updated");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 404, false, "Update Failed");
		}
	}
	
}
