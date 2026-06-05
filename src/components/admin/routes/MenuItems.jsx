import { BsListCheck, BsMinecartLoaded } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import { GrCatalog } from "react-icons/gr";
import { HiOutlinePhone, HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineDashboardCustomize,
  MdOutlineShoppingCart,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

export const FULL_ACCESS_ROLES = ["admin"];

export const hasAccess = (allowedRoles, role) => {
  if (!allowedRoles || allowedRoles.length === 0) return false;
  if (!role) return false;
  if (FULL_ACCESS_ROLES.includes(role)) return true;
  return allowedRoles.includes(role);
};

export const filterMenu = (items, role) =>
  items
    .filter((item) => hasAccess(item.allowedRoles, role))
    .map((item) => ({
      ...item,
      children: item.children
        ? item.children.filter((child) => hasAccess(child.allowedRoles, role))
        : undefined,
    }))
    .filter((item) => !item.children || item.children.length > 0);

// ✅ Hook — safe to use useSelector here
export const useMenuItems = () => {
  const { customer } = useSelector((state) => state.auth);
  const role = customer?.role;

  const allItems = [
    {
      key: "/admin/dashboard",
      icon: <MdOutlineDashboardCustomize />,
      label: "Dashboard",
      allowedRoles: ["admin", "product_incharge", "service_incharge"],
    },
    {
      key: "Product Inventory",
      icon: <BsMinecartLoaded />,
      label: "Product Inventory",
      allowedRoles: ["admin", "product_incharge"],
      children: [
        {
          key: "all-category-List",
          icon: <BsListCheck />,
          label: "Category List",
          allowedRoles: ["admin", "product_incharge"],
        },
        {
          key: "all-sub-category-List",
          icon: <BsListCheck />,
          label: "SubCategory List",
          allowedRoles: ["admin", "product_incharge"],
        },
        {
          key: "all-products-list",
          icon: <BsListCheck />,
          label: "Baltra Products",
          allowedRoles: ["admin", "product_incharge"],
        },
        {
          key: "all-QrProducts-list",
          icon: <BsListCheck />,
          label: "QR List",
          allowedRoles: ["admin"], // admin only
        },
      ],
    },
    {
      key: "Customer Products",
      icon: <MdOutlineShoppingCart />,
      label: "Customer Products",
      allowedRoles: ["admin", "product_incharge", "service_incharge"],
      children: [
        {
          key: "all-customer-products-list",
          icon: <BsListCheck />,
          label: "Customer Products List",
          allowedRoles: ["admin", "product_incharge"],
        },
        {
          key: "all/products-complaints-list",
          icon: <BsListCheck />,
          label: "Product Complaints",
          allowedRoles: ["admin", "service_incharge"],
        },
      ],
    },
    {
      key: "Customer Profiles",
      icon: <HiOutlineUserGroup />,
      label: "Customer Profiles",
      allowedRoles: ["admin", "product_incharge"],
      children: [
        {
          key: "all-customer-List",
          icon: <BsListCheck />,
          label: "All Customers",
          allowedRoles: ["admin", "product_incharge"],
        },
      ],
    },
    {
      key: "Warranty Package",
      icon: <VscWorkspaceTrusted />,
      label: "Warranty Package",
      allowedRoles: ["admin", "service_incharge"],
      children: [
        {
          key: "all/warranty-package-list",
          icon: <BsListCheck />,
          label: "Warranty Package",
          allowedRoles: ["admin", "service_incharge"],
        },
      ],
    },
    {
      key: "Warrranty Complaints",
      icon: <MdOutlineTrackChanges />,
      label: "Warranty Complaints",
      allowedRoles: ["admin", "service_incharge"],
      children: [
        {
          key: "all/warranty-status-list",
          icon: <BsListCheck />,
          label: "Warranty Complaints",
          allowedRoles: ["admin", "service_incharge"],
        },
      ],
    },
    {
      key: "Contacts",
      icon: <HiOutlinePhone />,
      label: "Contacts",
      allowedRoles: ["admin", "product_incharge"],
      children: [
        {
          key: "all-contact-message-List",
          icon: <BsListCheck />,
          label: "Contact List",
          allowedRoles: ["admin", "product_incharge"],
        },
      ],
    },
    {
      key: "Personalize Setting",
      icon: <RiImageEditLine />,
      label: "Personalize Setting",
      allowedRoles: ["admin", "product_incharge"],
      children: [
        {
          key: "all/customize-products",
          icon: <BsListCheck />,
          label: "Customize Products",
          allowedRoles: ["admin", "product_incharge"],
        },
        {
          key: "all/bulk-quote-products",
          icon: <BsListCheck />,
          label: "BulkQuote Products",
          allowedRoles: ["admin", "product_incharge"],
        },
      ],
    },
    {
      key: "settings",
      icon: <IoSettingsOutline />,
      label: "Settings",
      allowedRoles: ["admin"],
      children: [
        {
          key: "all/e-catalog-list",
          icon: <GrCatalog />,
          label: "E-Catalog",
          allowedRoles: ["admin"],
        },
        {
          key: "all/manage-roles",
          icon: <FaUserShield />,
          label: "Manage Roles",
          allowedRoles: ["admin"],
        },
      ],
    },
  ];

  return filterMenu(allItems, role);
};
