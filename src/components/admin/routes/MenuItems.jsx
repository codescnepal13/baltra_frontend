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

export const items = [
  {
    key: "/admin/dashboard",
    icon: <MdOutlineDashboardCustomize />,
    label: "Dashboard",
  },
  {
    key: "Product Inventory",
    icon: <BsMinecartLoaded />,
    label: "Product Inventory",
    children: [
      {
        key: "all-category-List",
        icon: <BsListCheck />,
        label: "Category List",
      },
      {
        key: "all-sub-category-List",
        icon: <BsListCheck />,
        label: "SubCategory List",
      },
      {
        key: "all-products-list",
        icon: <BsListCheck />,
        label: "Baltra Products",
      },
      { key: "all-QrProducts-list", icon: <BsListCheck />, label: "QR List" },
    ],
  },
  {
    key: "Customer Products",
    icon: <MdOutlineShoppingCart />,
    label: "Customer Products",
    children: [
      {
        key: "all-customer-products-list",
        icon: <BsListCheck />,
        label: "Customer Products List",
      },
      {
        key: "all/products-complaints-list",
        icon: <BsListCheck />,
        label: "Product Complaints",
      },
    ],
  },
  {
    key: "Customer Profiles",
    icon: <HiOutlineUserGroup />,
    label: "Customer Profiles",
    children: [
      {
        key: "all-customer-List",
        icon: <BsListCheck />,
        label: "All Customers",
      },
    ],
  },
  {
    key: "Warranty Package",
    icon: <VscWorkspaceTrusted />,
    label: "Warranty Package",
    children: [
      {
        key: "all/warranty-package-list",
        icon: <BsListCheck />,
        label: "Warranty Package",
      },
    ],
  },
  {
    key: "Warrranty Complaints",
    icon: <MdOutlineTrackChanges />,
    label: "Warrranty Complaints",
    children: [
      {
        key: "all/warranty-status-list",
        icon: <BsListCheck />,
        label: "Warranty Complaints",
      },
    ],
  },
  {
    key: "Contacts",
    icon: <HiOutlinePhone />,
    label: "Contacts",
    children: [
      {
        key: "all-contact-message-List",
        icon: <BsListCheck />,
        label: "Contact List",
      },
    ],
  },
  {
    key: "Personalize Setting",
    icon: <RiImageEditLine />,
    label: "Personalize Setting",
    children: [
      {
        key: "all/customize-products",
        icon: <BsListCheck />,
        label: "Customize Products",
      },
      {
        key: "all/bulk-quote-products",
        icon: <BsListCheck />,
        label: "BulkQuote Products",
      },
    ],
  },
  {
    key: "settings",
    icon: <IoSettingsOutline />,
    label: "Settings",
    children: [
      { key: "all/e-catalog-list", icon: <GrCatalog />, label: "E-Catalog" },
      {
        key: "all/manage-roles",
        icon: <FaUserShield />,
        label: "Manage Roles",
      },
    ],
  },
];
