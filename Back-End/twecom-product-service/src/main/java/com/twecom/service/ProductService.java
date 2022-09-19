package com.twecom.service;

import java.util.Date;
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
	
	public List<Product> getProductByUser(int id){
		 return repo.findBypSupplierId(id);
		}
	
	public Product getByProductId(int pId) {
		return repo.findById(pId).get();
	}
	
	public Product addProduct(Product p) {
		return repo.save(p);
	}

	public Product updateProduct(Product p) {
		p.setModifiedAt(new Date());
		return repo.save(p);
	}
	
	public String deleteProduct(int pId) {
		Product pr=repo.findById(pId).get();
		//pr.setModifiedBy(pId);
		pr.setIsDeleted(1);
		pr.setModifiedAt(new Date());
		repo.save(pr);
		return "Deleted Successfully!";
	}
}
