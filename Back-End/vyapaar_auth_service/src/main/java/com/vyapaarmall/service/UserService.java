package com.vyapaarmall.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vyapaarmall.exception.UserException;
import com.vyapaarmall.model.LoginCredentials;
import com.vyapaarmall.model.User;
import com.vyapaarmall.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
	private UserRepository repo;
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
		    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
	
	public void registerUser(User user) {
		if(repo.findByeMail(user.geteMail())!=null 
				|| repo.findByMobileNumber(user.getMobileNumber())!=null) {
			throw new UserException("User Already Registered");
		}
		repo.save(user);
	}
	
	public User loginUser(LoginCredentials creds) {
		
		User user = null;
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(creds.getUserName());
		if(matcher.find()) {
			user = repo.findByeMail(creds.getUserName());
		}else {
			user = repo.findByMobileNumber(creds.getUserName());
		}
		
		if(user==null || !(user.getPassword().equals(creds.getPassword()))) {
			throw new UserException("Inavalid Username or Password");
		}
		
		return user;
				
	}
}
