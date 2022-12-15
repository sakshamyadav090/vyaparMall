package com.twecom.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.twecom.jwthelper.JwtTokenAuthorizer;
import com.twecom.model.Feedback;
import com.twecom.model.ResponseModel;
import com.twecom.model.Status;
import com.twecom.repository.FeedbackRepository;

@Service
public class FeedbackService {
	
	@Autowired
	private FeedbackRepository repo;
	@Autowired
	private JwtTokenAuthorizer authorizer;
	@Autowired
	private RestTemplate restTemplate;

	public Feedback addFeedback(Feedback feedback, MultipartFile[] images, String token) throws IOException {
		int userId = authorizer.isTokenValid(token);
		if(!isProductAvailable(feedback.getProductId())) {
			throw new RuntimeException("Product Not Found");
		}
		
		String imagesArr="";
		for(int i=0;i<images.length;i++) {
			String fileName = StringUtils.cleanPath(images[i].getOriginalFilename());
			if(fileName.contains("..")) {
				throw new RuntimeException("Invalid Filename");
			}
			imagesArr = imagesArr + Base64.getEncoder().encodeToString(images[i].getBytes()) + ";";
		}
		
		feedback.setImages(imagesArr);
//		feedback.setUserId(userId);
		return repo.save(feedback);
	}
	
	public List<Feedback> getFeedbacksByProductId(int pId) {
		System.out.println(pId);
		if(!isProductAvailable(pId)) {
			throw new RuntimeException("Product Not Found");
		}
		
		return repo.findByProductId(pId);
	}
	
	public List<Feedback> getFeedbacksByUserId(String token, int pId) {
		int userId = authorizer.isTokenValid(token);
		
		return repo.findByProductId( pId);
	}
	
	public boolean isProductAvailable(int id) {
		String url = "http://localhost:9090/product-service/product/getProduct/" + id;
		ResponseModel rm =  restTemplate.getForEntity(url, ResponseModel.class).getBody();
		return rm.isSuccess();
	}

	public List<Feedback> getUnapprovedFeedbacks(String token) {
//		int userId = authorizer.isTokenValid(token);
		
		return repo.findByStatus(Status.PENDING);
	}

	public Feedback getFeedbackId(int fId) {
		return repo.findById(fId).get();
	}

	public String approveOrDeny(String token, Feedback feed) {
//		int userId = authorizer.isTokenValid(token);
//		if(roleid!=admin) {
//			
//		}
		Feedback feedback = repo.findById(feed.getId()).get();
		if(feedback ==null) {
			throw new RuntimeException("No feedback Found");
		}
		feedback.setStatus(feed.getStatus());
		repo.save(feedback);
		return feed.getStatus().name();
	}

	
}
