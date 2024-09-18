const baseUrl = "http://localhost:5283/api/";
const endPoints = {
  product: {
    base: `${baseUrl}`,
    list: `${baseUrl}Product/getallproducts`,
    listByCategory: `${baseUrl}ProductCategory/byCategory`,
    search: `${baseUrl}Product/search`,
  },
  customer: {
    base: `${baseUrl}`,
    list: `${baseUrl}Customer/getallcustomers`,
  },
  order: {
    base: `${baseUrl}`,
    list: `${baseUrl}Order/getallorders`,
    byCustomer: `${baseUrl}Order/getorderbycustomer`,
    createDetails: `${baseUrl}Order/createdetials`,
  },
  orderDetails: {
    base: `${baseUrl}`,
    list: `${baseUrl}OrderDetail/getallorderdetail`,
  },
  category: {
    base: `${baseUrl}`,
    list: `${baseUrl}Category/getallcategories`,
  },
  authentication: {
    login: `${baseUrl}User/login`,
    register: `${baseUrl}User/register`,
  },
};

export default endPoints;
