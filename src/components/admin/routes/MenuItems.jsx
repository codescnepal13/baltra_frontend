import {
  MdOutlineDashboardCustomize,
  MdOutlineShoppingCart,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { BsMinecartLoaded } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { HiOutlinePhone } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { GrCatalog } from "react-icons/gr";
import { RiImageEditLine } from "react-icons/ri";

export const items = [
  {
    key: "/admin/dashboard",
    icon: (
      <div className="fs-4">
        <MdOutlineDashboardCustomize />
      </div>
    ),
    label: "Dashboard",
    linkTo: "/nepal-cashmere/admin-dashboard",
  },

  {
    key: "Product Inventory",
    icon: (
      <div className="fs-4">
        <BsMinecartLoaded />
      </div>
    ),
    label: "Product Inventory",
    children: [
      {
        key: "all-category-List",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "Category List",
      },
      {
        key: "all-sub-category-List",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "SubCategory List",
      },
      {
        key: "all-products-list",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "Baltra Products",
      },
      {
        key: "all-QrProducts-list",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "QR List",
      },
    ],
  },
  {
    key: "Customer Products",
    icon: (
      <div className="fs-4">
        <MdOutlineShoppingCart />
      </div>
    ),
    label: "Customer Products",
    children: [
      {
        key: "all-customer-products-list",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "Customer products List",
      },
      {
        key: "all/products-complaints-list",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "product complaints",
      },
    ],
  },
  {
    key: "User Profiles",
    icon: (
      <div className="fs-4">
        <HiOutlineUserGroup />
      </div>
    ),
    label: "User Profiles",
    children: [
      {
        key: "all-customer-List",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "All Customers",
      },
      {
        key: "all-user-List",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "All Users",
      },
    ],
  },
  {
    key: "Warranty Package",
    icon: (
      <div className="fs-4">
        <VscWorkspaceTrusted />
      </div>
    ),
    label: "Warranty Package",
    children: [
      {
        key: "all/warranty-package-list",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "Warranty Package",
      },
    ],
  },
  {
    key: "Warrranty Complaints",
    icon: (
      <div className="fs-4">
        <MdOutlineTrackChanges  />
      </div>
    ),
    label: "Warrranty Complaints",
    children: [
      {
        key: "all/warranty-status-list",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "Warrranty Complaints",
      },
    ],
  },

  {
    key: "Contacts",
    icon: (
      <div className="fs-4">
        <HiOutlinePhone />
      </div>
    ),
    label: "Contacts",
    children: [
      {
        key: "all-contact-message-List",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "Contact List",
      },
    ],
  },

  {
    key: "Personalize Setting",
    icon: (
      <div className="fs-4">
        <RiImageEditLine />
      </div>
    ),
    label: "Personalize Setting",
    children: [
      {
        key: "all/customize-products",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "Customize products",
      },

      {
        key: "all/bulk-quote-products",
        icon: (
          <div className="fs-4">
            <BsListCheck />
          </div>
        ),
        label: "BulkQuote products",
      },
    ],
  },

  {
    key: "settings",
    icon: (
      <div className="fs-4">
        <IoSettingsOutline />
      </div>
    ),
    label: "Settings",
    children: [
      {
        key: "all/e-catalog-list",
        icon: (
          <div className="fs-4">
            <GrCatalog />
          </div>
        ),
        label: "E-Catalog",
      },
    ],
  },
];
