import { axiosInstance, handleAPIRequest } from "./axiosInstance";

// export const getProfileAPI = async () => {
//   const res = await axiosInstance.get("api/profile");
//   return res.data;
// };

export const getProfileAPI = () =>
  handleAPIRequest(axiosInstance.get, "api/profile");

export const addProductAPI = (data) =>
  handleAPIRequest(axiosInstance.post, "api/products", data);

export const updateProductAPI = (id, data) =>
  handleAPIRequest(axiosInstance.patch, `api/products/${id}`, data);

export const uploadBulkProductAPI = (data) =>
  handleAPIRequest(axiosInstance.post, `api/products/bulk-upload`, data);

export const getAllProductsAPI = () =>
  handleAPIRequest(axiosInstance.get, "api/my-products");

export const deleteProductsAPI = (id) =>
  handleAPIRequest(axiosInstance.delete, `api/products/${id}`);

export const getAllBrandsAPI = () =>
  handleAPIRequest(axiosInstance.get, "api/brands");

export const getAllModelsAPI = () =>
  handleAPIRequest(axiosInstance.get, "api/models");

export const getAllColorsAPI = () =>
  handleAPIRequest(axiosInstance.get, "api/colors");

export const getVendorOrders = () =>
  handleAPIRequest(axiosInstance.get, "api/vendor/orders");

export const updateOrderStatus = (id, data) =>
  handleAPIRequest(axiosInstance.patch, `api/order/${id}/status`, data);

export const returnOrderAPI = (status) =>
  handleAPIRequest(
    axiosInstance.get,
    `api/vendor/return-orders/?status=${status}`
  );

export const updatereturnOrderStatusAPI = (data) =>
  handleAPIRequest(axiosInstance.post, `api/vendor/return-orders/status`, data);

export const createShippingMethodAPI = (data) =>
  handleAPIRequest(axiosInstance.post, "api/shipping", data);

export const getAllShippingMethodAPI = () =>
  handleAPIRequest(axiosInstance.get, "api/all_shippings");

export const getSingleShippingMethodAPI = (id) =>
  handleAPIRequest(axiosInstance.get, `api/shipping/${id}`);

export const updateShippingMethodAPI = (id, data) =>
  handleAPIRequest(axiosInstance.patch, `api/shipping/${id}`, data);

export const deleteShippingMethodAPI = (id) =>
  handleAPIRequest(axiosInstance.delete, `api/shipping/${id}`);

export const getNotificationAPI = () =>
  handleAPIRequest(axiosInstance.get, `api/notifications`);
