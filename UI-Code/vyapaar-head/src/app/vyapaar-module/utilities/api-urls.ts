import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class ApiUrls {
  public static API_ENDPOINT:string=sessionStorage.getItem("baseUrl");

  public static LOGIN = ApiUrls.API_ENDPOINT + 'http://localhost:8080/login';
  public static REGISTER = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/register';
  public static VERIFY_TOKEN = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/verify-token';
  public static UPDATE_USER = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/user/updateUser';
  public static UNAPPROVED_SUPPLIER = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/suppliers/unapproved';
  public static BUSINESS_LIST = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/businessTypes';
  public static PASSWORD_UPDATE = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/user/updatePassword';
  public static ADMIN_LIST = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/adminList';
  public static DELETE_ADMIN = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/deleteAdmin/';
  public static REGISTER_ADMIN = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/register/Admin';
  public static GET_BY_USER_ID = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/user/';
  public static APPROVE_USER = ApiUrls.API_ENDPOINT + 'http://localhost:8080/auth/user/approve';

  public static PRODUCT_LIST_BY_SUPPLIER = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/supplier';
  public static CATEGORY_LIST = ApiUrls.API_ENDPOINT + 'http://localhost:8090/category';
  public static SAVE_PRODUCT = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/add';
  public static DELETE_PRODUCT = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/delete/';
  public static GET_BY_PRODUCT_ID = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/getProduct/';
  public static UNAPPROVED_PRODUCTS = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/unapproved';
  public static ADD_CATEGORY = ApiUrls.API_ENDPOINT + 'http://localhost:8090/category/add';
  public static APPROVE_PRODUCT = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/approve';
  public static UPDATE_PRODUCT = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/update';
  public static DENY_PRODUCT = ApiUrls.API_ENDPOINT + 'http://localhost:8090/product/deny';

  public static SEND_OTP = ApiUrls.API_ENDPOINT+'http://localhost:8110/genarateOTP';
  public static VALIDATE_OTP = ApiUrls.API_ENDPOINT+'http://localhost:8110/validateOTP';

  public static UNAPPROVED_FEEDBACKS = ApiUrls.API_ENDPOINT + 'http://localhost:8100/feedback/unapproved';
  public static GET_BY_Feedback_ID = ApiUrls.API_ENDPOINT + 'http://localhost:8100/feedback/';
  public static APPROVE_OR_DENY_FEEDBACK = ApiUrls.API_ENDPOINT + 'http://localhost:8100/feedback/approveOrDeny';
  
  public static ADD_PROMOTION = 'http://localhost:8120/feeds/promotion/add';
  public static TERMS = 'http://localhost:8120/feeds/terms';

  public static GET_PINCODE = 'https://api.postalpincode.in/pincode/';




}
