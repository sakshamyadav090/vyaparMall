package com.vyapaarmall.service;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vyapaarmall.exception.UserException;
import com.vyapaarmall.model.LoginCredentials;
import com.vyapaarmall.model.User;
import com.vyapaarmall.repository.UserRepository;


@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
		    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
	
	public void registerUser(User user) {
		if(repo.findByeMail(user.geteMail())!=null 
				|| repo.findByMobileNumber(user.getMobileNumber())!=null) {
			throw new UserException("User Already Registered");
		}
		user.setPassword(bCryptPasswordEncoder
				.encode(user.getPassword()));
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

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = null;
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(username);
		if(matcher.find()) {
			user = repo.findByeMail(username);
		}else {
			user = repo.findByMobileNumber(username);
		}
		
		if(user==null ) {
			throw new UserException("Inavalid Username or Password");
		}
//		
//		return user;
//		return null;
		 return new org.springframework.security.core.userdetails.User(user.getUserId()+":"+username, user.getPassword(), new ArrayList<>());
	}
}
