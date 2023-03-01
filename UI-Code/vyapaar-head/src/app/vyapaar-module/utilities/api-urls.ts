import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class ApiUrls {
  public static API_ENDPOINT:string=sessionStorage.getItem("baseUrl");
  public static IMD_AUTH_ENDPOINT:string=sessionStorage.getItem("imdAuthUrl");
  public static IMD_PROD_ENDPOINT:string=sessionStorage.getItem("imdProdUrl");
  public static IMD_OTP_ENDPOINT:string=sessionStorage.getItem("imdOtpUrl");
  public static IMD_FEEDB_ENDPOINT:string=sessionStorage.getItem("imdFeedbUrl");

  public static LOGIN = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'login';
  public static REGISTER = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/register';
  public static VERIFY_TOKEN = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/verify-token';
  public static UPDATE_USER = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/user/updateUser';
  public static ADMIN_LIST = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/adminList';
  public static DELETE_ADMIN = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/deleteAdmin/';
  public static REGISTER_ADMIN = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/register/Admin';
  public static GET_BY_USER_ID = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/user/';
  public static APPROVE_USER = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/user/approve';
  public static UNAPPROVED_SUPPLIER = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/suppliers/unapproved';
  public static BUSINESS_LIST = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/businessTypes';
  public static PASSWORD_UPDATE = ApiUrls.API_ENDPOINT + ApiUrls.IMD_AUTH_ENDPOINT + 'auth/user/updatePassword';
  
  public static DENY_PRODUCT = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/deny';
  public static PRODUCT_LIST_BY_SUPPLIER = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/supplier';
  public static CATEGORY_LIST = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'category';
  public static SAVE_PRODUCT = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/add';
  public static DELETE_PRODUCT = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/delete/';
  public static GET_BY_PRODUCT_ID = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/getProduct/';
  public static UNAPPROVED_PRODUCTS = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/unapproved';
  public static ADD_CATEGORY = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'category/add';
  public static APPROVE_PRODUCT = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/approve';
  public static UPDATE_PRODUCT = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/update';
  public static APPROVED_PRODUCT_LIST = ApiUrls.API_ENDPOINT + ApiUrls.IMD_PROD_ENDPOINT + 'product/list';
  
  public static SEND_OTP = ApiUrls.API_ENDPOINT+ ApiUrls.IMD_OTP_ENDPOINT +'genarateOTP';
  public static VALIDATE_OTP = ApiUrls.API_ENDPOINT+ ApiUrls.IMD_OTP_ENDPOINT +'validateOTP';

  public static UNAPPROVED_FEEDBACKS = ApiUrls.API_ENDPOINT + ApiUrls.IMD_FEEDB_ENDPOINT + 'feedback/unapproved';
  public static GET_BY_Feedback_ID = ApiUrls.API_ENDPOINT + ApiUrls.IMD_FEEDB_ENDPOINT + 'feedback/';
  public static APPROVE_OR_DENY_FEEDBACK = ApiUrls.API_ENDPOINT + ApiUrls.IMD_FEEDB_ENDPOINT + 'feedback/approveOrDeny';

  public static TERMS = 'http://localhost:8120/feeds/terms';
  public static ADD_PROMOTION = 'http://localhost:8120/feeds/promotion/add';
  public static BANNER_LIST = 'http://localhost:8120/feeds/promotion';

  public static GET_PINCODE = 'https://api.postalpincode.in/pincode/';
  



}
