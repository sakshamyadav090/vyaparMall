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
  // public static VERIFY_TOKEN = ApiUrls.API_ENDPOINT + '';



}
