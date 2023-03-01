package com.twecom.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twecom.model.Feeds;
import com.twecom.model.Promotion;
import com.twecom.repository.FeedsRepository;
import com.twecom.repository.PromotionRepository;
@Service
public class FeedService {
	@Autowired 
	private FeedsRepository feedRepo;
	
	@Autowired 
	private PromotionRepository promotionRepo;

	public Feeds getTerms() {
		
		return feedRepo.findByName("Terms");
	}

	public Promotion addPromotion(String token,MultipartFile image, String data) throws IOException {
		
//		int userId = authorizer.isTokenValid(token);
		String feedImage = null;
		
		if(image!=null) {
			String fileName = StringUtils.cleanPath(image.getOriginalFilename());
			if(fileName.contains("..")) {
				throw new RuntimeException("Invalid Filename");
			}
			feedImage = Base64.getEncoder().encodeToString(image.getBytes());
		}
		
		Promotion promo = new ObjectMapper().readValue(data, Promotion.class);
		promo.setImage(feedImage);
		
		return promotionRepo.save(promo);
	}

	public List<Promotion> getAllPromotion() {
		return promotionRepo.findAll();
	}

}
