create TABLE VM_USER_MST(
    USER_ID int (22) AUTO_INCREMENT,
    ROLE_ID int (5),
    IS_ACTIVE boolean DEFAULT true,
    CREATED_DATE datetime DEFAULT SYSDATE,
    MODIFIED_BY int(22),
    MODIFIED_DATE datetime,
    CITY varchar(15),
    STATE varchar(15),
    PINCODE int(10),
    F_NAME varchar(25),
    L_NAME varchar(25),
    MOBILE_NUMBER int (20),
    E_MAIL VARCHAR (50),
    PASSWORD VARCHAR(50),
    GST VARCHAR(20),
    FIRM_NAME VARCHAR (50),
    PAN_NUMBER VARCHAR (15),
    AADHAAR_NUMBER INT (15),
    NATURE_OF_BUSINESS VARCHAR (30),
    
    PRIMARY KEY (USER_ID)
)
