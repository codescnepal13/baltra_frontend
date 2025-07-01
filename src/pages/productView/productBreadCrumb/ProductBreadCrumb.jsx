import React from "react";
import { Link } from "react-router-dom";

const ProductBreadCrumb = ({ links }) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {links.map((link, index) => (
            <li key={index} className="breadcrumb-item">
              {index === links.length - 1 ? (
                <span className="font-gothamNarrow text-[#000000] text-sm capitalize cursor-pointer">
                  {link.name}
                </span>
              ) : (
                <Link to={link.path}>{link.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default ProductBreadCrumb;
