package com.twecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twecom.model.Category;
import com.twecom.model.ResponseModel;
import com.twecom.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("")
	public ResponseModel getCategories(){
		try {
			return new ResponseModel(
					categoryService.getCategoryList(),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),401,false,"Unable to Fetch");
		}
	}
	
	@PostMapping("/add")
	public ResponseModel addCategory(@RequestBody Category category){
		try {
			return new ResponseModel(
					categoryService.addCategory(category),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),400,false,"Unable to Fetch");
		}
	}
	
}
