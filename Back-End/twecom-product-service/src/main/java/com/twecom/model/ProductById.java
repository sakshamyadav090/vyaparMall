package com.twecom.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Base64;

import javax.imageio.ImageIO;

@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ProductById {

	private int id;
	private String name; 
	private int priceStart;
	private int priceEnd;
	private String[] image;
	private int quantity;
	private String category;
	private String description;
	private String origin;
	private String manufacturer;
	
	public ProductById List(Product p){
		this.id=p.getPId();
		this.name=p.getPName();
		this.priceStart=p.getPPriceStartRange();
		this.priceEnd=p.getPPriceEndRange();
		this.image = p.getPImage().split(";");
		this.quantity=p.getQuantity();
		this.category=p.getCategory().getName();
		this.description=p.getPDescription();
		this.origin=p.getPOrigin();
		this.manufacturer=p.getPManufacturer();
		return this;
		
	}
	
	
}
