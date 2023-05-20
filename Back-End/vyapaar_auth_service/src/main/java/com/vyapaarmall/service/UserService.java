package com.vyapaarmall.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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
import com.vyapaarmall.model.AdminList;
import com.vyapaarmall.model.Role;
import com.vyapaarmall.model.Status;
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
	
	public Map<String,String> registerUser(User user) {
		if(repo.findByEmail(user.getEmail())!=null 
				|| repo.findByMobileNumber(user.getMobileNumber())!=null) {
			throw new UserException("User Already Registered");
		}
		user.setPassword(bCryptPasswordEncoder
				.encode(user.getPassword()));
		user.setCreatedBy(user.getFirstName()+ " "+ user.getLastName());
		user.setModifiedBy(user.getFirstName()+ " "+ user.getLastName());
		if(user.getRole().getRoleId()!=2) {
			user.setStatus(Status.ACTIVE);
		}
		repo.save(user);
		Algorithm algo = Algorithm.HMAC256(SecurityConstant.SECRET.getBytes());
		
		String access_token = JWT.create()
				.withSubject(user.getMobileNumber())
				.withExpiresAt(new Date(System.currentTimeMillis()+ SecurityConstant.TOKEN_EXPIRE_TIME))
				.withIssuedAt(new Date())
				.withClaim("username", new ArrayList<>())
				.sign(algo);
		
		Map<String,String> response = new HashMap<>();
		response.put("access_token", access_token);
		response.put("userId", user.getMobileNumber());
		return response;
		
	}
	
	public User registerAdmin(User user, String header) {
		String token = header.substring(SecurityConstant.TOKEN_PREFIX.length());
		User dbUser = verifyToken(token);
		if(dbUser.getRole().getRoleId()!=0) {
			throw new RuntimeException("Cannot create Admins");
		}
		if(repo.findByEmail(user.getEmail())!=null 
				|| repo.findByMobileNumber(user.getMobileNumber())!=null) {
			throw new UserException("User Already Registered");
		}
		user.setPassword(bCryptPasswordEncoder
				.encode(user.getPassword()));
		user.setCreatedBy(dbUser.getFirstName()+ " "+ dbUser.getLastName());
		user.setModifiedBy(dbUser.getFirstName()+ " "+ dbUser.getLastName());
		user.setRole(new Role(1));
		user.setStatus(Status.ACTIVE);
		
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
	
	public User updateUser(User user) {
		User dbUser = repo.findById(user.getId()).get();
		if(dbUser==null) {
			throw new UserException("Inavalid Operation");
		}
		user.setStatus(dbUser.getStatus());
		user.setCreatedBy(dbUser.getCreatedBy());
		user.setCreatedDate(dbUser.getCreatedDate());
		user.setRole(dbUser.getRole());
		user.setModifiedDate(new Date());
		user.setPassword(bCryptPasswordEncoder
				.encode(dbUser.getPassword()));
		return repo.save(user);
	}
	
	public User deleteAdmin(int id, String header) {
		String token = header.substring(SecurityConstant.TOKEN_PREFIX.length());
		User db = verifyToken(token);
		if(db.getRole().getRoleId()!=0) {
			throw new RuntimeException("Unauthorized User");
		}
		User dbUser = repo.findById(id).get();
		if(dbUser==null) {
			throw new UserException("Inavalid Operation");
		}
		dbUser.setStatus(Status.INACTIVE);
		return repo.save(dbUser);
	}
	
	public String updatePassword(User user) {
		User dbUser = findUserByUserName(user.getMobileNumber());
		dbUser.setPassword(bCryptPasswordEncoder
				.encode(user.getPassword()));
		repo.save(dbUser);
		return "Password Updated";
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

	public List<User> getUnapprovedSuppliers(String header) {
		String token = header.substring(SecurityConstant.TOKEN_PREFIX.length()); 
		User dbUser = verifyToken(token);
		if(dbUser.getRole().getRoleId()!=1) {
			throw new RuntimeException("Unauthorized User");
		}
		List<User> unapprovedUsers = repo.findByStatus(Status.PENDING);
		
		return unapprovedUsers
		.stream()
		.filter(user -> user.getRole().getRoleId()==2)
		.collect(Collectors.toList());
	}

	public List<AdminList> getAdminList(String header) {
		String token = header.substring(SecurityConstant.TOKEN_PREFIX.length()); 
		User dbUser = verifyToken(token);
		if(dbUser.getRole().getRoleId()!=0) {
			throw new RuntimeException("Unauthorized User");
		}
		Role r= new Role(1);
		List<User> adminList = repo.findByRole(r);
		List<AdminList> al=new ArrayList(); 
		for(User u:adminList) {
			AdminList adLi =new AdminList();
			if(u.getStatus().equals(Status.ACTIVE)) {
			adLi.List(u);
			al.add(adLi);
			}
		}
		
		return al;
	}
	
	public User getUserById(String token, int id) {
		
		return repo.findById(id).get();
	}

	public String approveUser(String header, User user) {
		String token = header.substring(SecurityConstant.TOKEN_PREFIX.length());
		User db = verifyToken(token);
		if(db.getRole().getRoleId()!=1) {
			throw new RuntimeException("Unauthorized User");
		}
		User dbUser = repo.findById(user.getId()).get();
		dbUser.setStatus(user.getStatus());
		repo.save(dbUser);
		return "Approved";
	}
	
	

	
}
