package com.twecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twecom.model.Feeds;
import com.twecom.repository.FeedsRepository;
@Service
public class FeedService {
	@Autowired 
	private FeedsRepository feedRepo;

	public Feeds getTerms() {
		
		return feedRepo.findByName("Terms");
	}

}
