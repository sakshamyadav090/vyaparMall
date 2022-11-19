package com.twecom.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "otp")
@Data @NoArgsConstructor @AllArgsConstructor
public class OtpDto {
	@Id
	private String phoneNumber;
    private String oneTimePassword;
}
