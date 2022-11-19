package com.twecom.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.config.RepositoryBeanDefinitionParser;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twecom.jwthelper.JwtTokenAuthorizer;
import com.twecom.model.ApprovalStatus;
import com.twecom.model.Faq;
import com.twecom.model.Image;
import com.twecom.model.Product;
import com.twecom.model.ProductById;
import com.twecom.model.ProductList;
import com.twecom.repository.FaqRepository;
import com.twecom.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repo;
//	@Autowired
//	private Image;
	
	@Autowired
	private JwtTokenAuthorizer authorizer;
	
	@Autowired
	private FaqRepository faqRes;
	
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
	
	public Map<String,Object> getByProductId(int pId) {
		ProductById pl=new ProductById();
		List<Faq> faqs=faqRes.FindByProductId(pId);
		
		  Map<String,Object> map  =new HashMap();
		  map.put("faqList",faqs);
		  map.put("product",pl.List(repo.findById(pId).get()));
		  return map;
	}
	
	public Product addProduct(Product p,String[] faq,MultipartFile[] image, String token) throws IOException {
		
		int userId = authorizer.isTokenValid(token);
		String[] images=new String[image.length];
		for(int i=0;i<image.length;i++) {
			String fileName = StringUtils.cleanPath(image[i].getOriginalFilename());
			if(fileName.contains("..")) {
				throw new RuntimeException("Invalid Filename");
			}
			images[i] = Base64.getEncoder().encodeToString(image[i].getBytes());
		}
		Image im = new Image();
		im.setDeleted(false);
		for(int i=0;i<images.length;i++) {
			if(i==0) im.setImageOne(images[i]);
			if(i==1) im.setImageTwo(images[i]);
			if(i==2) im.setImageThree(images[i]);
		}
		
		//p.setPImage(images);
		p.setPImage(im);
		p.setPSupplierId(userId);
		
		for(int i=0;i<faq.length;i++) {
		Faq fq = new ObjectMapper().readValue(faq[i], Faq.class);
		fq.setProductId(p.getPId());
		fq.setDeleted(false);
		faqRes.save(fq);
		}
		
		return repo.save(p);
	}

	public Product updateProduct(String prod,String[] faq, MultipartFile images[], String token) throws IOException {
		Product product = new ObjectMapper().readValue(prod, Product.class);
		int userId = authorizer.isTokenValid(token);
		if(product.getPSupplierId()==userId) {
			product.setModifiedAt(new Date());
			return addProduct(product,faq,images,token);
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

	public List<ProductList> fetchUnapprovedProducts(String token) {
//		int userId = authorizer.isTokenValid(token);
//		if(userId!=1) {
//			throw new RuntimeException("Unauthorized User");
//		}
		List<ProductList> proList=new ArrayList<>();
		List<Product> list=repo.findByIsApproved(ApprovalStatus.PENDING);
		if(list.isEmpty()) {
			throw new RuntimeException("No products Found");
		}
		list.forEach((n) -> {
			ProductList pl=new ProductList();
			if(n.getIsDeleted()==0) {
				proList.add(pl.List(n));
			}
		});
		
		 return proList;
//		return null;
	}

	public Object approvedProducts(String token, Product product) {
		int userId = authorizer.isTokenValid(token);
//		if(roleId!=1) {
//		throw news RuntimeException("Unauthorized User");
//	}
		Product dbProduct = repo.findById(product.getPId()).get();
		dbProduct.setIsApproved(ApprovalStatus.APPROVED);
		repo.save(dbProduct);
		return null;
	}
}
