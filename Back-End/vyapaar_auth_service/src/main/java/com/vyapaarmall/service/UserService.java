package com.vyapaarmall.service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.vyapaarmall.exception.UserException;
import com.vyapaarmall.model.User;
import com.vyapaarmall.repository.UserRepository;
import com.vyapaarmall.security.config.SecurityConstant;



@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
		    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
	
	public User registerUser(User user) {
		if(repo.findByEmail(user.getEmail())!=null 
				|| repo.findByMobileNumber(user.getMobileNumber())!=null) {
			throw new UserException("User Already Registered");
		}
		user.setPassword(bCryptPasswordEncoder
				.encode(user.getPassword()));
		return repo.save(user);
		
	}
	
	public User findUserByUserName(String username) {
		
		User user = null;
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(username);
		if(matcher.find()) {
			user = repo.findByEmail(username);
		}else {
			user = repo.findByMobileNumber(username);
		}
		
		if(user==null) {
			throw new UserException("Inavalid Username or Password");
		}
		
		return user;
				
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = null;
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(username);
		if(matcher.find()) {
			user = repo.findByEmail(username);
		}else {
			user = repo.findByMobileNumber(username);
		}
		if(user==null ) {
			throw new UserException("Inavalid Username or Password");
		}
		
		 return new org.springframework.security.core.userdetails.User(username, user.getPassword(), new ArrayList<>());
	}
	
	public User verifyToken(String token) {
		User user = null;
		if (token != null ) {
			Algorithm algorithm =Algorithm.HMAC256(SecurityConstant.SECRET.getBytes());
			JWTVerifier verifier=JWT.require(algorithm).build();
			DecodedJWT decodedJWT = verifier.verify(token);
			String username=decodedJWT.getSubject();
			if(username!=null) {					
				user = findUserByUserName(username);
			}
		}
		return user;
	}
	public List<String> fetchImage () {
		
		List<String> img = new ArrayList<>();
		List<User> U = repo.findAll();
		for(int i=0;i<U.size();i++){
     img.add(U.get(i).getImages());
   }
		return img;	
		
	}
	
}
