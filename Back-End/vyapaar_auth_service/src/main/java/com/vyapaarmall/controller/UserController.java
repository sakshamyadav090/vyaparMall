package com.vyapaarmall.controller;



import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vyapaarmall.model.ResponseModel;
import com.vyapaarmall.model.User;
import com.vyapaarmall.security.config.SecurityConstant;
import com.vyapaarmall.service.BusinessTypeService;
import com.vyapaarmall.service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BusinessTypeService btService;
	
	
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
	
	@PostMapping("/register/Admin")
	public ResponseModel registerAdmin(@RequestBody User user,@RequestHeader("Authorization") String token) {
		
		try {
		return new ResponseModel(
				userService.registerAdmin(user,token),201,true,"Admin Created");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),404,false,"Failed to Create Admin");
		}
	}
	
//	@GetMapping("/suppliers/unapproved")
//	public ResponseModel getUnapprovedSuppliers(@RequestHeader("Authorization") String token) {
//		try {
//			return new ResponseModel(
//					userService.getUnapprovedSuppliers(token), 200, true, "User updated");
//		} catch(Exception e) {
//			return new ResponseModel(
//					e.getMessage(), 403, false, "Unauthorized");
//		}
//	}
//	
	
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
	
	@PutMapping("/deleteAdmin/{id}")
	public ResponseModel DeleteAdmin(@PathVariable int id,@RequestHeader("Authorization") String token) {
		try {
			return new ResponseModel(
					userService.deleteAdmin(id,token), 200, true, "Admin List Updated");
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
	
	@GetMapping("/businessTypes")
	public ResponseModel getAllBusinessTypes(@RequestHeader("Authorization") String token) {
		try {
			return new ResponseModel(
					btService.getBusinessTypes(token), 200, true, "Fetch Success");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 404, false, "Fetch Failed");
		}
	}
	
	@GetMapping("/adminList")
	public ResponseModel getAllAdminList(@RequestHeader("Authorization") String token) {
		try {
			return new ResponseModel(
					userService.getAdminList(token), 200, true, "Fetch Success");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 404, false, "Fetch Failed");
		}
	}
	
	@GetMapping("/user/{id}")
	public ResponseModel getUserById(@RequestHeader("Authorization") String token,@PathVariable int id) {
		try {
			return new ResponseModel(
					userService.getUserById(token, id), 200, true, "Fetch Success");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 404, false, "Fetch Failed");
		}
	}
	
	@PutMapping("/user/approve")
	public ResponseModel approveUser(@RequestHeader("Authorization") String token, @RequestBody User user) {
		try {
			return new ResponseModel(
					userService.approveUser(token, user), 200, true, "User updated");
		} catch(Exception e) {
			return new ResponseModel(
					e.getMessage(), 404, false, "Update Failed");
		}
	}
	
}
