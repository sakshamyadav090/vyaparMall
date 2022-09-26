package com.twecom.controller;


import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.twecom.model.Product;
import com.twecom.model.ResponseModel;
import com.twecom.service.ProductService;

@RestController
public class ProductController {

	org.slf4j.Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	@Autowired
	private ProductService ps;
	
	
	
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
	
	@GetMapping("/product/list/{userId}")
	public ResponseModel getProductListByUser(@PathVariable int userId){
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.getProductByUser(userId),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Fetch");
			
		}
		return responseModel;
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
	 
	@PostMapping("/product/add")
	public ResponseModel addProduct(@RequestBody Product p) {
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.addProduct(p),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Save");
			
		}
		return responseModel;
		
	}
	
	@DeleteMapping("/product/delete/{pId}")
	public ResponseModel addProduct(@PathVariable int pId) {
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.deleteProduct(pId),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Delete");
			
		}
		return responseModel;
		
	}
	
	@PutMapping("/product/update")
	public ResponseModel updateProduct(@RequestBody Product p) {
		ResponseModel responseModel;
		try {
			responseModel = new ResponseModel(
			ps.updateProduct(p),200,true,"Fetched Successfully");
		}catch(Exception e){
			logger.error(e.getMessage());
			responseModel = new ResponseModel(
					e.getMessage(),200,false,"Unable to Save");
			
		}
		return responseModel;
		
	}

}
