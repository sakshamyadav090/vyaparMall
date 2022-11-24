import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class ApiUrls {
  public static API_ENDPOINT:string=sessionStorage.getItem("baseUrl");

  public static LOGIN = ApiUrls.API_ENDPOINT + 'auth-service/login';
  public static REGISTER = ApiUrls.API_ENDPOINT + 'auth-service/auth/register';
  public static VERIFY_TOKEN = ApiUrls.API_ENDPOINT + 'auth-service/auth/verify-token';
  public static UPDATE_USER = ApiUrls.API_ENDPOINT + 'auth-service/auth/user/updateUser';
  public static PRODUCT_LIST_BY_SUPPLIER = ApiUrls.API_ENDPOINT + 'product-service/product/supplier';
  public static CATEGORY_LIST = ApiUrls.API_ENDPOINT + 'product-service/category';
  public static SAVE_PRODUCT = ApiUrls.API_ENDPOINT + 'product-service/product/add';
  public static DELETE_PRODUCT = ApiUrls.API_ENDPOINT + 'product-service/product/delete/';
  public static GET_BY_PRODUCT_ID = ApiUrls.API_ENDPOINT + 'product-service/product/getProduct/';
  public static UNAPPROVED_SUPPLIER = ApiUrls.API_ENDPOINT + 'auth-service/auth/suppliers/unapproved';
  public static UNAPPROVED_PRODUCTS = ApiUrls.API_ENDPOINT + 'product-service/product/unapproved';
  // public static SEND_OTP = ApiUrls.API_ENDPOINT + 'otp-service/genarateOTP';
  public static SEND_OTP = 'http://localhost:8110/genarateOTP';
  // public static VALIDATE_OTP = ApiUrls.API_ENDPOINT + 'otp-service/validateOTP';
  public static VALIDATE_OTP = 'http://localhost:8110/validateOTP';
  public static GET_PINCODE = 'https://api.postalpincode.in/pincode/';
  public static BUSINESS_LIST = ApiUrls.API_ENDPOINT + 'auth-service/auth/businessTypes';
  public static PASSWORD_UPDATE = ApiUrls.API_ENDPOINT + 'auth-service/auth/user/updatePassword';
  public static ADD_CATEGORY = ApiUrls.API_ENDPOINT + 'product-service/category/add';
  public static APPROVE_PRODUCT = ApiUrls.API_ENDPOINT + 'product-service/product/approve';
  public static GET_BY_USER_ID = ApiUrls.API_ENDPOINT + 'auth-service/auth/user/';

  public static APPROVE_USER = ApiUrls.API_ENDPOINT + 'auth-service/auth/user/approve';

  // public static VERIFY_TOKEN = ApiUrls.API_ENDPOINT + '';



}
