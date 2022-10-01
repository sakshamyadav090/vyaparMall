package com.twecom.service;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
	
	public Product addProduct(Product p,MultipartFile[] image, String token) throws IOException {
		
		int userId = authorizer.isTokenValid(token);
		String images="";
		for(int i=0;i<3;i++) {
			String fileName = StringUtils.cleanPath(image[i].getOriginalFilename());
			if(fileName.contains("..")) {
				throw new RuntimeException("Invalid Filename");
			}
			images = images + Base64.getEncoder().encodeToString(image[i].getBytes()) + ";";
		}
		
		p.setPImage(images);
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

//	public String getImage(int pId) {
//		Product p= repo.findById(pId).get();
//		return p.getPImage();
//	}
}
