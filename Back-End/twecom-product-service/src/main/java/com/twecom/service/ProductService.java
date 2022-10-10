package com.twecom.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twecom.jwthelper.JwtTokenAuthorizer;
import com.twecom.model.Product;
import com.twecom.model.ProductById;
import com.twecom.model.ProductList;
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
	
	public List<ProductList> getProductBySupplier(String token){
		int userId = authorizer.isTokenValid(token);
		List<ProductList> proList=new ArrayList<>();
		List<Product> list=repo.findBypSupplierId(userId);
		list.forEach((n) -> {
			ProductList pl=new ProductList();
			if(n.getIsDeleted()==0) {
				proList.add(pl.List(n));
			}
		});
		
		 return proList;
		}
	
	public ProductById getByProductId(int pId) {
		ProductById pl=new ProductById();
		return pl.List(repo.findById(pId).get());
	}
	
	public Product addProduct(Product p,MultipartFile[] image, String token) throws IOException {
		
		int userId = authorizer.isTokenValid(token);
		String images="";
		for(int i=0;i<image.length;i++) {
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

	public Product updateProduct(String prod, MultipartFile images[], String token) throws IOException {
		Product product = new ObjectMapper().readValue(prod, Product.class);
		int userId = authorizer.isTokenValid(token);
		if(product.getPSupplierId()==userId) {
			product.setModifiedAt(new Date());
			return addProduct(product,images,token);
		}else {
			throw new RuntimeException("Product Not Found");
		}
		
	}
	
	public String deleteProduct(int pId, String token) {
		int userId = authorizer.isTokenValid(token);
		Product pr=repo.findById(pId).get();
		if(pr.getPSupplierId()==userId) {
			throw new RuntimeException("Product Not Found");
		}
		pr.setIsDeleted(1);
		pr.setModifiedAt(new Date());
		repo.save(pr);
		return "Deleted Successfully!";		
	}
}
