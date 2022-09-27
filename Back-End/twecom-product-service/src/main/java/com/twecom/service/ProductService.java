package com.twecom.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twecom.jwthelper.JwtTokenAuthorizer;
import com.twecom.model.Product;
import com.twecom.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repo;
	
	@Autowired
	private JwtTokenAuthorizer authorizer;
	
	public List<Product> getAllProduct(){
		return repo.findAll();
	}
	
	public List<Product> getProductByUser(String token){
		int userId = authorizer.isTokenValid(token);
		 return repo.findBypSupplierId(userId);
		}
	
	public Product getByProductId(int pId) {
		return repo.findById(pId).get();
	}
	
	public Product addProduct(Product p, String token) {
		int userId = authorizer.isTokenValid(token);
		p.setPSupplierId(userId);
		return repo.save(p);
	}

	public Product updateProduct(Product p, String token) {
		int userId = authorizer.isTokenValid(token);
		if(p.getPSupplierId()==userId) {
			p.setModifiedAt(new Date());
			return repo.save(p);
		}else {
			throw new RuntimeException("Product Not Found");
		}
		
	}
	
	public String deleteProduct(int pId, String token) {
		int userId = authorizer.isTokenValid(token);
		Product pr=repo.findById(pId).get();
		//pr.setModifiedBy(pId);
		pr.setIsDeleted(1);
		pr.setModifiedAt(new Date());
		repo.save(pr);
		return "Deleted Successfully!";
	}
}
