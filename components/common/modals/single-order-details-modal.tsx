"use client";

import { format } from "date-fns";
import ReactModal from "../react-modal";

type Product = {
  _id: string;
  title: string;
  model: string;
  brand: string;
  model_code: string;
  sku: string;
  sku_code: string;
  color: string;
  product_size: number;
  wattage: string;
  images: string[];
  old_price?: number;
  price: number;
  MOQ?: number;
  stock: number;
  return_policy: boolean;
  customization_options?: string[];
  installmentMonth?: number;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
};

type OrderItem = {
  product: Product;
  price: number;
  quantity: number;
};

type ShippingAddress = {
  address: string;
  building: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  label: string;
};

type ShippingMethod = {
  name: string;
  description: string;
  cost: number;
  estimated_days: number;
};

type User = {
  email: string;
  _id: string;
};

export type OrderResponse = {
  _id: string;
  createdAt: string;
  order_status: string;
  payment_status: string;
  order_source: string;
  total_price: number;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  shipping_method: ShippingMethod;
  user: User;
};

export default function SingleOrderDetailsModal({
  order,
  showSingleOrder,
  setShowSingleOrder,
}: {
  order: OrderResponse;
  showSingleOrder: boolean;
  setShowSingleOrder: (item: boolean) => void;
}) {
  return (
    <ReactModal modalIsOpen={showSingleOrder} setIsOpen={setShowSingleOrder}>
      <div className="max-w-5xl max-h-[90vh] overflow-y-auto mx-auto p-6 space-y-6 text-black bg-white">
        {/* Order Summary Header */}
        <div className="border-b-2 border-orange-500 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <h2 className="text-2xl font-bold">
              Order #{order?._id.slice(-6)}
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700 border border-orange-300">
                {order?.order_source === "shop_now" ? "Pending" : "Paid"}
              </span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:gap-6">
            {/* <p>
              Placed on:{" "}
              <span className="font-medium">
                {format(new Date(order?.createdAt), "dd MMM yyyy, hh:mm a")}
              </span>
            </p> */}

            <p>
              Total:{" "}
              <span className="font-bold text-orange-600">
                ${order?.total_price}
              </span>
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Products */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold border-b border-gray-300 pb-2">
              Products
            </h3>

            {order?.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* Left: Image */}
                <div className="flex-shrink-0 w-28 h-28 bg-white border border-orange-200 rounded-lg overflow-hidden">
                  <img
                    src={item.product.images?.[0] || "/no-image.png"}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Middle: Product Info */}
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-lg">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    Model Code: {item.product.model_code}
                  </p>
                  <p className="text-sm text-gray-600">
                    SKU: {item.product.sku_code}
                  </p>
                  <p className="text-sm text-gray-600">
                    Brand: {item.product.brand}
                  </p>
                  <p className="text-sm text-gray-600">
                    Color: {item.product.color}
                  </p>
                  <p className="text-sm text-gray-600">
                    Size: {item.product.product_size}
                  </p>
                  <p className="text-sm text-gray-600">
                    Wattage: {item.product.wattage}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {item.product.stock}
                  </p>
                  <p className="text-sm text-gray-600">
                    Return Policy:{" "}
                    {item.product.return_policy ? (
                      <span className="text-green-600 font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Not Available
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    MOQ: {item.product.MOQ}
                  </p>
                  <p className="text-sm text-gray-600">
                    Customization:{" "}
                    {item.product.customization_options?.join(", ")}
                  </p>
                </div>

                {/* Right: Price & Qty */}
                <div className="text-right space-y-1">
                  {item.product.old_price && (
                    <p className="text-sm line-through text-gray-400">
                      ${item.product.old_price}
                    </p>
                  )}
                  <p className="text-xl font-bold text-orange-600">
                    ${item.product.price}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Qty: {item.quantity}
                  </p>
                  {item.product.installmentMonth && (
                    <p className="text-xs text-gray-500">
                      Installments: {item.product.installmentMonth} months
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Shipping + Customer */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="border border-gray-300 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-orange-600 mb-2">
                Shipping Address
              </h4>
              <p>{order?.shipping_address.building}</p>
              <p>{order?.shipping_address.address}</p>
              <p>
                {order?.shipping_address.city}, {order?.shipping_address.state},{" "}
                {order?.shipping_address.country} -{" "}
                {order?.shipping_address.postcode}
              </p>
              <p className="text-sm text-gray-600">
                Label: {order?.shipping_address.label}
              </p>
            </div>

            {/* Shipping Method */}
            <div className="border border-gray-300 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-orange-600 mb-2">
                Shipping Method
              </h4>
              <p className="font-medium">{order?.shipping_method.name}</p>
              <p className="text-sm text-gray-600">
                {order?.shipping_method.description}
              </p>
              <p className="text-sm">
                Estimated: {order?.shipping_method.estimated_days} days
              </p>
              <p className="font-semibold text-orange-600">
                Cost: ${order?.shipping_method.cost}
              </p>
            </div>

            {/* Customer Info */}
            <div className="border border-gray-300 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-orange-600 mb-2">Customer</h4>
              <p>Email: {order?.user.email}</p>
              <p>User ID: {order?.user._id}</p>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
