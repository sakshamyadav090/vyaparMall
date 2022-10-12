package com.twecom.model;

import lombok.Data;

@Data
public class OtpDto {
	private String phoneNumber;
    private String userName;
    private String oneTimePassword;
}
