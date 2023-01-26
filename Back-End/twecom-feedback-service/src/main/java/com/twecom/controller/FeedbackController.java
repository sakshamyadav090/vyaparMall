package com.twecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twecom.model.Feedback;
import com.twecom.model.ResponseModel;
import com.twecom.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@PostMapping("/add")
	public ResponseModel addFeedback(
			@RequestParam("data") String data,
			@RequestParam("images") MultipartFile[] images,
			@RequestHeader("Authorization") String token) {
		try {
			Feedback feedback = new ObjectMapper().readValue(data, Feedback.class);
			return new ResponseModel(
					feedbackService.addFeedback(feedback,images,token),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),401,false,"Error Occured");
		}
	}
	
	@GetMapping("/product/{pId}")
	public ResponseModel getAllFeedbacksByProduct(@PathVariable int pId) {
		try {
			return new ResponseModel(
					feedbackService.getFeedbacksByProductId(pId),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),404,false,"Not Found");
		}
	}

	@GetMapping("/{fId}")
	public ResponseModel getFeedbackById(@PathVariable int fId) {
		try {
			return new ResponseModel(
					feedbackService.getFeedbackId(fId),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),404,false,"Not Found");
		}
	}
	
	@GetMapping("/user/product/{pId}")
	public ResponseModel getAllFeedbacksByUser(@RequestHeader("Authorization") String token, @PathVariable int pId) {
		try {
			return new ResponseModel(
					feedbackService.getFeedbacksByUserId(token, pId),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),404,false,"Not Found");
		}
	}
	
	@GetMapping("/unapproved")
	public ResponseModel getUnapprovedFeedbacks(@RequestHeader("Authorization") String token) {
		try {
			return new ResponseModel(
					feedbackService.getUnapprovedFeedbacks(token),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),404,false,"Not Found");
		}
	}
	
	@PutMapping("/approveOrDeny")
	public ResponseModel approveOrDeny(@RequestHeader("Authorization") String token,@RequestBody Feedback feed) {
		try {
			return new ResponseModel(
					feedbackService.approveOrDeny(token, feed),200,true,"Fetched Successfully");
		}catch(Exception e) {
			return new ResponseModel(
					e.getMessage(),404,false,"Not Found");
		}
	}
}
