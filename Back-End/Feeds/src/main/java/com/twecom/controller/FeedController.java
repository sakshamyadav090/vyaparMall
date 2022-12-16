package com.twecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.twecom.model.Promotion;
import com.twecom.model.ResponseModel;
import com.twecom.service.FeedService;

@RestController
@CrossOrigin("*")
@RequestMapping("/feeds")
public class FeedController {
	@Autowired
	private FeedService feedService;
	
	@GetMapping("/terms")
	public ResponseModel getCategories(){
		try {
			return new ResponseModel(
					feedService.getTerms(),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),401,false,"Unable to Fetch");
		}
	}
	
	@PostMapping("/promotion/add")
	public ResponseModel addPromotion(@RequestParam("pData") String data,
			@RequestParam("file") MultipartFile image,
			@RequestHeader("Authorization") String token) {
		try {
			return new ResponseModel(
					feedService.addPromotion(token, image, data),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),401,false,"Unable to Fetch");
		}
	}
	
	
}
