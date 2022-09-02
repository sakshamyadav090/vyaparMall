package com.twecom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twecom.model.Product;
import com.twecom.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repo;
	
	public List<Product> getAllProduct(){
	 return repo.findAll();
	}
	
	public Product getByProductId(int pId) {
		return repo.findById(pId).get();
	}

}
