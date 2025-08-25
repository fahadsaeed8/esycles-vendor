import { axiosInstance, handleAPIRequest } from "./axiosInstance";

export const getProfileAPI = async () => {
  const res = await axiosInstance.get("api/profile");
  return res.data;
};

export const addProductAPI = (data) =>
  handleAPIRequest(axiosInstance.post, "api/products", data);

export const updateProductAPI = (data) =>
  handleAPIRequest(axiosInstance.patch, "api/products", data);

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
