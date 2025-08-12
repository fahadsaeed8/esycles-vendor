"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Layers,
  ShoppingCart,
  Settings,
  ChevronDown,
  Package,
  Users,
  BarChart,
  CreditCard,
  Store,
  Megaphone,
  ChartNoAxesCombined,
  Mail,
  FileSearch,
  Gavel,
  Briefcase,
  Star,
  Truck,
  Receipt,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import SideProfilePopUp from "../../popup/side-profile-popup";

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  link?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/",
  },
  { label: "Profile", icon: <User size={18} />, link: "/profile" },
  {
    label: "Categories",
    icon: <Layers size={18} />,
    link: "/categories",
    subItems: [
      { label: "Bicycles", link: "/categories/bicycles" },
      { label: "Exercise Bicycles", link: "/categories/exercise-bicycles" },
      { label: "E-bikes", link: "/categories/e-bikes" },
      { label: "E-scooters", link: "/categories/e-scooters" },
      { label: "Scooters", link: "/categories/scooters" },
      { label: "E-skateboards", link: "/categories/e-skateboards" },
      { label: "Skateboards", link: "/categories/skateboards" },
      { label: "Hoverboards", link: "/categories/hoverboards" },
      { label: "Racing", link: "/categories/racing" },
      { label: "Rentals/Mobility", link: "/categories/rentals-mobility" },
      { label: "Accessories", link: "/categories/accessories" },
      { label: "Apparel", link: "/categories/apparel" },
      { label: "Jobs", link: "/categories/jobs" },
      { label: "Nutrition", link: "/categories/nutrition" },
      { label: "Parts", link: "/categories/parts" },
      { label: "Supplies", link: "/categories/supplies" },
      { label: "Tradeshows/Conventions", link: "/categories/tradeshows" },
      { label: "Tools", link: "/categories/tools" },
    ],
  },
  {
    label: "Products",
    icon: <Package size={18} />,
    link: "/products",
    subItems: [
      { label: "Add New product", link: "/products/add" },
      { label: "All Products", link: "/products/all" },
      { label: "In House Products", link: "/products/inhouse" },
      { label: "Bulk Import", link: "/products/bulk-import" },
      { label: "Categories", link: "/products/categories" },
      { label: "Category based discount", link: "/products/category-discount" },
      { label: "Attributes", link: "/products/attributes" },
      { label: "Colors", link: "/products/colors" },
      { label: "Product Reviews", link: "/products/reviews" },
      {
        label: "Seller products",
        link: "/products/seller-products",
        subItems: [
          {
            label: "Physical Products",
            link: "/products/seller-products/physical",
          },
          {
            label: "Digital products",
            link: "/products/seller-products/digital",
          },
        ],
      },
      {
        label: "Size guide",
        link: "/products/size-guide",
        subItems: [
          { label: "Size chart", link: "/products/size-guide/size-chart" },
        ],
      },
      {
        label: "Brands",
        link: "/products/brands",
        subItems: [
          { label: "All Brands", link: "/products/brands/all" },
          { label: "Brand Bulk Import", link: "/products/brands/bulk-import" },
        ],
      },
    ],
  },
  { label: "Orders", icon: <ShoppingCart size={18} />, link: "/orders" },
  {
    label: "Payments",
    icon: <CreditCard size={18} />,
    link: "/payments",
    subItems: [
      { label: "Payment History", link: "/payments/history" },
      { label: "Payment Method", link: "/payments/method" },
    ],
  },
  {
    label: "Sales",
    icon: <CreditCard size={18} />,
    link: "/sales",
    subItems: [
      { label: "All Orders", link: "/sales/all-orders" },
      { label: "Inhouse Orders", link: "/sales/inhouse-orders" },
      { label: "Seller Orders", link: "/sales/seller-orders" },
    ],
  },
  {
    label: "Customers",
    icon: <Users size={18} />,
    link: "/customers",
    subItems: [
      { label: "Customer list", link: "/customers/list" },
      { label: "Classified products", link: "/customers/classified-products" },
      { label: "Classified packages", link: "/customers/classified-packages" },
    ],
  },
  {
    label: "Sellers",
    icon: <Store size={18} />,
    link: "/sellers",
    subItems: [
      { label: "All sellers", link: "/sellers/all" },
      { label: "Payout", link: "/sellers/payout" },
      { label: "Payout Requests", link: "/sellers/payout-requests" },
      { label: "Seller Commission", link: "/sellers/commission" },
      { label: "Seller Packages", link: "/sellers/packages" },
      { label: "Seller verification form", link: "/sellers/verification" },
    ],
  },
  {
    label: "Reports",
    icon: <BarChart size={18} />,
    link: "/reports",
    subItems: [
      { label: "In house product sale", link: "/reports/inhouse-product-sale" },
      { label: "Seller products sale", link: "/reports/seller-products-sale" },
      { label: "Products stock", link: "/reports/products-stock" },
      { label: "Products wish list", link: "/reports/wishlist" },
      { label: "User searches", link: "/reports/user-searches" },
      { label: "Commission history", link: "/reports/commission-history" },
      { label: "Wallet recharge history", link: "/reports/wallet-recharge" },
    ],
  },
  {
    label: "Marketing",
    icon: <Megaphone size={18} />,
    link: "/marketing",
    subItems: [
      { label: "Flash deals", link: "/marketing/flash-deals" },
      { label: "Dynamic pop-up", link: "/marketing/dynamic-popup" },
      { label: "Custom Alert", link: "/marketing/custom-alert" },
      { label: "Newsletters", link: "/marketing/newsletters" },
      { label: "Coupon", link: "/marketing/coupon" },
    ],
  },
  {
    label: "Affiliate system",
    icon: <ChartNoAxesCombined size={18} />,
    link: "/affiliate-system",
    subItems: [
      {
        label: "Affiliate registration form",
        link: "/affiliate-system/registration",
      },
      {
        label: "Affiliate congratulations",
        link: "/affiliate-system/congratulations",
      },
      { label: "Affiliate users", link: "/affiliate-system/users" },
      { label: "Referral users", link: "/affiliate-system/referrals" },
      {
        label: "Affiliate withdrawals request",
        link: "/affiliate-system/withdrawals",
      },
      { label: "Affiliate logs", link: "/affiliate-system/logs" },
    ],
  },
  {
    label: "Subscription",
    icon: <CreditCard size={18} />,
    link: "/subscription",
  },
  { label: "Messages", icon: <Mail size={18} />, link: "/messages" },
  {
    label: "Advertisement",
    icon: <Megaphone size={18} />,
    link: "/advertisement",
  },
  {
    label: "Classified Ad",
    icon: <FileSearch size={18} />,
    link: "/classified-ad",
  },
  {
    label: "Auctions",
    icon: <Gavel size={18} />,
    link: "/auctions",
    subItems: [
      { label: "Add New Auction Product", link: "/auctions/add" },
      { label: "All Auction Products", link: "/auctions/all" },
      { label: "Inhouse Auction Products", link: "/auctions/inhouse" },
      { label: "Seller Auction Products", link: "/auctions/seller" },
      { label: "Products Auction Orders", link: "/auctions/orders" },
    ],
  },
  {
    label: "Project Bidding",
    icon: <Briefcase size={18} />,
    link: "/project-bidding",
  },
  { label: "RFQ", icon: <FileSearch size={18} />, link: "/rfq" },
  {
    label: "Rating & Reviews",
    icon: <Star size={18} />,
    link: "/rating-reviews",
  },
  { label: "Shipping", icon: <Truck size={18} />, link: "/shipping" },
  { label: "Tax", icon: <Receipt size={18} />, link: "/tax" },
  { label: "Settings", icon: <Settings size={18} />, link: "/settings" },
  { label: "Go to Store", icon: <Store size={18} />, link: "/" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = (link?: string) => {
    if (!link) return false;
    if (link === "/") {
      return pathname === "/";
    }
    return pathname === link || pathname.startsWith(link + "/");
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      setOpenDropdowns((prev) =>
        prev.includes(item.label)
          ? prev.filter((i) => i !== item.label)
          : [...prev, item.label]
      );
    }
  };

  const renderMenu = (items: MenuItem[], level: number = 0) => {
    return items.map((item) => (
      <li key={item.label}>
        {!item.subItems ? (
          <Link
            href={item.link || "#"}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm transition ${
              isActive(item.link)
                ? `${
                    level === 0 ? "bg-[#febd69] text-black" : "text-[#febd69]"
                  } active-menu-item`
                : "hover:bg-white/10 text-gray-200"
            }`}
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </Link>
        ) : (
          <div>
            <button
              onClick={() => handleMenuClick(item)}
              className={`flex items-center justify-between mb-1 w-full px-4 py-2 rounded-md text-sm cursor-pointer transition ${
                isActive(item.link) || openDropdowns.includes(item.label)
                  ? "bg-[#febd69] text-black"
                  : "hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition ${
                  openDropdowns.includes(item.label) ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdowns.includes(item.label) && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-6"
                >
                  {renderMenu(item.subItems, level + 1)}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </li>
    ));
  };

  useEffect(() => {
    const openParents: string[] = [];

    const checkSubItems = (items: MenuItem[], parentLabel?: string) => {
      for (const item of items) {
        if (item.subItems) {
          checkSubItems(item.subItems, item.label);
        }
        if (item.link && pathname.startsWith(item.link)) {
          if (parentLabel && !openParents.includes(parentLabel)) {
            openParents.push(parentLabel);
          }
        }
      }
    };

    checkSubItems(menuItems);
    setOpenDropdowns(openParents);
  }, [pathname]);

  useEffect(() => {
    const activeItem = document.querySelector(".active-menu-item");
    if (activeItem && sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const offsetTop = (activeItem as HTMLElement).offsetTop;
      sidebar.scrollTo({
        top: offsetTop - 100, // adjust offset as needed
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-1 left-2 z-40">
        {!mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md bg-transparent text-white"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:relative z-30 w-[244px] min-w-[244px] max-w-[244px] h-screen overflow-y-auto 
        bg-gradient-to-t from-gray-500 to-[#232F3E] shadow-lg text-white p-4 hide-scrollbar
        transform transition-transform duration-300 ease-in-out
        ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end mb-2">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo */}
        <Image
          src="/icons/white-logo-latest.png"
          width={120}
          height={60}
          alt="Logo"
          className="w-fit h-fit cursor-pointer mb-2 !mx-auto"
        />

        {/* User Profile */}
        <div className="w-full flex justify-between items-center border-b border-gray-400 pb-4 mb-4">
          <div className="flex gap-2 items-center">
            <Image
              src="/icons/profile-active.jpg"
              width={35}
              height={35}
              alt="Logo"
              className="w-[35px] h-[35px] rounded-full cursor-pointer"
            />
            <div className="text-start">
              <p className="font-semibold text-sm">John Doe</p>
              <span className="text-xs text-gray-300">Admin</span>
            </div>
          </div>
          <SideProfilePopUp />
          {/* <EllipsisVertical className="w-5 h-[25px] cursor-pointer text-gray-300" /> */}
        </div>

        {/* Menu Items */}
        <ul className="space-y-1">{renderMenu(menuItems)}</ul>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
