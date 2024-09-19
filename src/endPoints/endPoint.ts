const baseUrl = "http://localhost:5283/api/";
const endPoints = {
  product: {
    base: `${baseUrl}Product`,
    list: `${baseUrl}Product/getallproducts`,
    listByCategory: `${baseUrl}ProductCategory/byCategory`,
    search: `${baseUrl}Product/search`,
  },
  customer: {
    base: `${baseUrl}Customer`,
    byUserId: `${baseUrl}Customer/getbyuserid`,
    list: `${baseUrl}Customer/getallcustomers`,
  },
  order: {
    base: `${baseUrl}Order`,
    list: `${baseUrl}Order/getallorders`,
    byCustomer: `${baseUrl}Order/getorderbycustomer`,
    createDetails: `${baseUrl}Order/createdetails`,
  },
  orderDetails: {
    base: `${baseUrl}OrderDetail`,
    list: `${baseUrl}OrderDetail/getallorderdetail`,
  },
  category: {
    base: `${baseUrl}Category`,
    list: `${baseUrl}Category/getallcategories`,
  },
  authentication: {
    login: `${baseUrl}User/login`,
    register: `${baseUrl}User/register`,
  },
};

export default endPoints;
