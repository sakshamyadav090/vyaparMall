package com.vyapaarmall.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vyapaarmall.model.BusinessType;
import com.vyapaarmall.repository.BusinessTypeRepository;
import com.vyapaarmall.security.config.SecurityConstant;

@Service
public class BusinessTypeService {
	@Autowired
	private BusinessTypeRepository repo;
	
	@Autowired
	private UserService userService;
	
	public List<BusinessType> getBusinessTypes(String header) {
		String token = header.substring(SecurityConstant.TOKEN_PREFIX.length());
		userService.verifyToken(token);
		
		return repo.findAll();
	}
}
