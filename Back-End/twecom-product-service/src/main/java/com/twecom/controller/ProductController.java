package com.twecom.controller;


import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twecom.model.Product;
import com.twecom.model.ResponseModel;
import com.twecom.repository.ProductRepository;
import com.twecom.service.ProductService;


@RestController
public class ProductController {

	org.slf4j.Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	@Autowired
	private ProductService ps;
	

	@Autowired
	private ProductRepository repo;
	
	@PostMapping("/product/add")
	public ResponseModel addProduct( 
			@RequestParam("data") String prod, 
			@RequestParam("file") MultipartFile[] image,
			@RequestHeader("Authorization") String token) {
		
//		JSONPObject json = new JSONPObject(prod, token);
		  
		
		ResponseModel responseModel;
		try {
			Product p = new ObjectMapper().readValue(prod, Product.class);
			responseModel = new ResponseModel(
			ps.addProduct(p,image,token),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Save");
			
		}
		return responseModel;
		
	}
	
	@GetMapping("/product/supplier")
	public ResponseModel getProductListByUser(@RequestHeader("Authorization") String token){
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.getProductBySupplier(token),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Fetch");
			
		}
		return responseModel;
	}
	
	@GetMapping("/product/list")
	public ResponseModel getAllProductList(){
		ResponseModel responseModel;
		try {
			
			responseModel = new ResponseModel(
			ps.getAllProduct(),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Fetch");
			
		}
		return responseModel;
	}
	
	@GetMapping("/product/{pId}/image")
	@ResponseBody
	public String getProductImage(@PathVariable int pId, HttpServletResponse response) throws IOException {
//		response.setContentType(MediaType.IMAGE_PNG_VALUE);
		Product p= repo.findById(pId).get();
		
		return p.getPImage();
		
//		System.out.println(p.getPImage().toString());
//		response.getOutputStream().write(p.getPImage());
//		response.getOutputStream().close();
		
	}
	
	@GetMapping("/product/getProduct/{pId}")
	public ResponseModel getById(@PathVariable int pId) {
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.getByProductId(pId),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Fetch");
			
		}
		return responseModel;
	}
	
	@PutMapping("/product/update")
	public ResponseModel updateProduct(@RequestParam("data") String prod, 
			@RequestParam("file") MultipartFile[] image, 
			@RequestHeader("Authorization") String token) {
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.updateProduct(prod,image,token),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Save");
			
		}
		return responseModel;
		
	}
	
	@DeleteMapping("/product/delete/{pId}")
	public ResponseModel addProduct(@PathVariable int pId, @RequestHeader("Authorization") String token) {
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.deleteProduct(pId,token),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Delete");
			
		}
		return responseModel;
		
	}
	
	@GetMapping("/product/unapproved")
	public ResponseModel getUnapprovedProducts(@RequestHeader("Authorization") String token) {
		try {
			return new ResponseModel(
			ps.fetchUnapprovedProducts(token),200,true,"Fetched Successfully");
		}catch(Exception e){
			return new ResponseModel(
					e.getMessage(),200,false,"Unable to Delete");
		}
	}

}
