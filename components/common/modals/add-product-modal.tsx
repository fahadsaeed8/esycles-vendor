"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProductAPI,
  getAllBrandsAPI,
  getAllColorsAPI,
  getAllModelsAPI,
  getAllProductsAPI,
  getAllShippingMethodAPI,
} from "../../../services/api";
import { toast } from "react-toastify";
import ReactModal from "../react-modal";
import { Cross, X, Upload, Info } from "lucide-react";

interface AddProductModalProps {
  openAddProductModal: boolean;
  setOpenAddProductModal: (item: boolean) => void;
}

interface Option {
  _id: string;
  name: string;
}

const AddProductModal = ({
  openAddProductModal,
  setOpenAddProductModal,
}: AddProductModalProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { data: shippingMethod, isLoading } = useQuery({
    queryKey: ["shippingMethods"],
    queryFn: getAllShippingMethodAPI,
  });

  const { data, refetch } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProductsAPI,
  });

  // Fetch brands, models, and colors
  const { data: brandsResponse } = useQuery({
    queryKey: ["getAllBrands"],
    queryFn: getAllBrandsAPI,
  });

  const { data: modelsResponse } = useQuery({
    queryKey: ["getAllModels"],
    queryFn: getAllModelsAPI,
  });

  const { data: colorsResponse } = useQuery({
    queryKey: ["getAllColors"],
    queryFn: getAllColorsAPI,
  });

  const brands: Option[] = brandsResponse?.data || [];
  const models: Option[] = modelsResponse?.data || [];
  const colors: Option[] = colorsResponse?.data || [];

  const mutation = useMutation({
    mutationFn: (data: FormData) => addProductAPI(data),
    onSuccess: (res) => {
      console.log("add product response", res);
      toast.success("Product added successfully");
      refetch();
      setOpenAddProductModal(false);
      formik.resetForm();
      setImagePreviews([]);
    },
    onError: (err: any) => {
      const errorMsg =
        err.response?.data?.message || "Error while adding product";
      toast.error(errorMsg);
      console.log("add product error", err);
    },
  });

  // Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Product title is required"),
    model: Yup.string().required("Please select a model"),
    brand: Yup.string().required("Please select a brand"),
    seller: Yup.string().required("Seller name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    old_price: Yup.number()
      .typeError("Old price must be a number")
      .positive("Old price must be positive")
      .optional(),
    stock: Yup.number()
      .typeError("Stock must be a number")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .required("Stock is required"),
    type: Yup.string().required("Please select a product type"),
    shipping_method: Yup.string().required("Please select a product type"),
    foldable: Yup.boolean().typeError("Foldable must be true or false"),
    wattage: Yup.number()
      .typeError("Wattage must be a number")
      .positive("Wattage must be positive")
      .optional(),
    model_code: Yup.string().optional(),
    sku: Yup.string().optional(),
    sku_code: Yup.string().optional(),
    color: Yup.string().required("Please select a color"),
    images: Yup.mixed<File[]>()
      .test("fileCount", "At least one image is required", (value) => {
        const files = value as File[] | undefined;
        return !!files && files.length > 0;
      })
      .test("fileType", "Unsupported file format", (value) => {
        const files = value as File[] | undefined;
        if (!files || files.length === 0) return true;
        return files.every((file) =>
          ["image/jpeg", "image/png", "image/gif"].includes(file.type)
        );
      }),

    shipping: Yup.string().optional(),
    return_policy: Yup.boolean().typeError(
      "Return policy must be true or false"
    ),
    customization_options: Yup.string().optional(),
    MOQ: Yup.number()
      .typeError("MOQ must be a number")
      .integer("MOQ must be an integer")
      .min(1, "MOQ must be at least 1")
      .required("Minimum order quantity is required"),
    installmentMonth: Yup.number()
      .typeError("Installment months must be a number")
      .integer("Installment months must be an integer")
      .min(0, "Installment months cannot be negative")
      .optional(),
  });

  // ---- Formik ----
  const formik = useFormik({
    initialValues: {
      title: "",
      model: "",
      brand: "",
      seller: "",
      price: "",
      old_price: "",
      stock: "",
      type: "",
      foldable: "",
      wattage: "",
      model_code: "",
      sku: "",
      sku_code: "",
      color: "",
      images: [] as File[],
      shipping: "",
      return_policy: "",
      shipping_method: "",
      customization_options: "",
      MOQ: "",
      installmentMonth: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Create FormData object instead of JSON
      const formData = new FormData();

      // Append all fields to formData (except images)
      Object.keys(values).forEach((key) => {
        if (key !== "images") {
          formData.append(key, values[key as keyof typeof values] as string);
        }
      });

      // Append image files separately
      values.images.forEach((file: File) => {
        formData.append("images", file);
      });

      // Convert numeric values to numbers
      formData.set("price", String(Number(values.price)));
      formData.set("stock", String(Number(values.stock)));
      formData.set("MOQ", String(Number(values.MOQ)));
      formData.set("shipping", values.shipping_method);

      if (values.old_price) {
        formData.set("old_price", String(Number(values.old_price)));
      }

      if (values.wattage) {
        formData.set("wattage", String(Number(values.wattage)));
      }

      if (values.installmentMonth) {
        formData.set(
          "installmentMonth",
          String(Number(values.installmentMonth))
        );
      }

      // Boolean fields
      formData.set("foldable", values.foldable === "true" ? "true" : "false");
      formData.set(
        "return_policy",
        values.return_policy === "true" ? "true" : "false"
      );
      formData.set("is_active", "true");

      console.log("📦 Form Data:");
      // Log form data for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      // Make sure your API function accepts FormData
      mutation.mutate(formData);
    },
  });

  // ---- Handle Image Upload ----
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    // Generate previews
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);

    // Update formik values with the actual File objects
    formik.setFieldValue("images", [...formik.values.images, ...newFiles]);
  };

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };

  // Product types (replace with your actual enum values)
  const productTypes = [
    { value: "BICYCLES", label: "BICYCLES" },
    { value: "EBIKES", label: "EBIKES" },
    { value: "ESCOOTERS", label: "ESCOOTERS" },
    { value: "ESKATEBOARDS", label: "ESKATEBOARDS" },
    { value: "HOVERBOARDS", label: "HOVERBOARDS" },
    { value: "EXERCISE BICYCLES", label: "EXERCISE BICYCLES" },
  ];

  return (
    <ReactModal
      modalIsOpen={openAddProductModal}
      setIsOpen={setOpenAddProductModal}
    >
      <div className="w-full min-w-[660px] p-5 max-w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          <button
            onClick={() => setOpenAddProductModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-5">
          {/* Text Inputs */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Product Title *</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product title"
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.title}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Seller *</label>
            <input
              type="text"
              name="seller"
              value={formik.values.seller}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seller name"
            />
            {formik.touched.seller && formik.errors.seller && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.seller}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {formik.touched.price && formik.errors.price && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.price}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Old Price ($)</label>
            <input
              type="number"
              name="old_price"
              value={formik.values.old_price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {formik.touched.old_price && formik.errors.old_price && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.old_price}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formik.values.stock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
            {formik.touched.stock && formik.errors.stock && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.stock}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">MOQ *</label>
            <input
              type="number"
              name="MOQ"
              value={formik.values.MOQ}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Minimum order quantity"
              min="1"
            />
            {formik.touched.MOQ && formik.errors.MOQ && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.MOQ}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Wattage</label>
            <input
              type="number"
              name="wattage"
              value={formik.values.wattage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product wattage"
              min="0"
            />
            {formik.touched.wattage && formik.errors.wattage && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.wattage}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Installment Months
            </label>
            <input
              type="number"
              name="installmentMonth"
              value={formik.values.installmentMonth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Number of months"
              min="0"
            />
            {formik.touched.installmentMonth &&
              formik.errors.installmentMonth && (
                <span className="text-red-500 text-xs mt-1">
                  {formik.errors.installmentMonth}
                </span>
              )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Model Code</label>
            <input
              type="text"
              name="model_code"
              value={formik.values.model_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Model code"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">SKU</label>
            <input
              type="text"
              name="sku"
              value={formik.values.sku}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Stock keeping unit"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">SKU Code</label>
            <input
              type="text"
              name="sku_code"
              value={formik.values.sku_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="SKU code"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Shipping Info</label>
            <input
              type="text"
              name="shipping"
              value={formik.values.shipping}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shipping details"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Customization Options
            </label>
            <input
              type="text"
              name="customization_options"
              value={formik.values.customization_options}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Customization options"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Brand *</label>
            <select
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {formik.touched.brand && formik.errors.brand && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.brand}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Model *</label>
            <select
              name="model"
              value={formik.values.model}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model._id} value={model._id}>
                  {model.name}
                </option>
              ))}
            </select>
            {formik.touched.model && formik.errors.model && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.model}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Color *</label>
            <select
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Color</option>
              {colors.map((color) => (
                <option key={color._id} value={color._id}>
                  {color.name}
                </option>
              ))}
            </select>
            {formik.touched.color && formik.errors.color && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.color}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Product Type *</label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              {productTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {formik.touched.type && formik.errors.type && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.type}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Foldable</label>
            <select
              name="foldable"
              value={formik.values.foldable}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {formik.touched.foldable && formik.errors.foldable && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.foldable}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Return Policy</label>
            <select
              name="return_policy"
              value={formik.values.return_policy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {formik.touched.return_policy && formik.errors.return_policy && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.return_policy}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Shipping Method</label>
            <select
              name="shipping_method"
              value={formik.values.shipping_method}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option</option>

              {shippingMethod?.shippingMethods?.map((item, index) => {
                return (
                  <option key={index} value={item?._id}>
                    {item?.name} {item?.description}
                  </option>
                );
              })}
            </select>
            {formik.touched.shipping_method &&
              formik.errors.shipping_method && (
                <span className="text-red-500 text-xs mt-1">
                  {formik.errors.shipping_method}
                </span>
              )}
          </div>

          {/* Image Upload Field */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              Product Images *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="images-upload"
              />
              <label
                htmlFor="images-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-blue-500 font-medium">
                  Click to upload
                </span>
                <span className="text-gray-500 text-sm">or drag and drop</span>
                <span className="text-gray-400 text-xs mt-1">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>

            {formik.touched.images && formik.errors.images && (
              <span className="text-red-500 text-xs mt-1">
                {formik.errors.images as string}
              </span>
            )}

            {/* Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Uploaded Images</h3>
                <div className="flex flex-wrap gap-3">
                  {imagePreviews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 border rounded-md overflow-hidden group"
                    >
                      <img
                        src={src}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute cursor-pointer top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setOpenAddProductModal(false)}
              className="mr-3 px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-yellow-600 text-black cursor-pointer font-medium px-5 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {mutation.isPending ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddProductModal;
