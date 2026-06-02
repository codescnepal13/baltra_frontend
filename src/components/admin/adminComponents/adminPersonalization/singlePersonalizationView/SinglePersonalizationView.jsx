import moment from "moment";
import { useEffect } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearAdminError,
  singlePersonalizationView,
} from "../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

const SinglePersonalizationView = () => {
  const { loading, error, personalizationSingleView } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) dispatch(clearAdminError());
  }, [dispatch, error]);

  useEffect(() => {
    if (id) dispatch(singlePersonalizationView({ personalization_id: id }));
  }, [dispatch, id]);

  if (loading) return <FormSkeleton />;
  if (!personalizationSingleView)
    return (
      <div className="flex items-center justify-center py-20 text-sm text-gray-400">
        No personalization data found.
      </div>
    );

  const {
    customer_name,
    product_name,
    text,
    placement,
    font_style,
    color,
    size,
    status,
    main_image,
    created_at,
  } = personalizationSingleView;

  return (
    <>
      <MetaData title="Personalization Details" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 pb-10">
        {/* Back Link */}
        <Link
          to="/baltra-admin-dashboard/all/customize-products"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors py-6"
        >
          <HiOutlineArrowLeftCircle size={16} />
          Back to customize products
        </Link>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-1">
                Order #{id?.slice(-4)}
              </p>
              <h1
                className="text-2xl font-light tracking-tight text-gray-900"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Customer Personalization
              </h1>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Body */}
          <div className="grid md:grid-cols-2 divide-x divide-gray-100">
            {/* Left — Info */}
            <div className="p-8">
              <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-5">
                Details
              </p>

              <div className="divide-y divide-gray-100">
                <InfoRow label="Customer" value={customer_name} />
                <InfoRow label="Product" value={product_name} />
                <InfoRow label="Custom text" value={text} italic />
                <InfoRow label="Placement" value={placement} />
                <InfoRow label="Font style" value={font_style} />
                <InfoRow label="Size" value={size} />

                {/* Color */}
                <div className="flex items-center gap-0 py-3">
                  <span className="text-xs font-medium text-gray-500 w-28 flex-shrink-0">
                    Color
                  </span>
                  {color ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs font-mono text-gray-400">
                        {color}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-2 text-gray-400">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-xs">
                  {moment(created_at).format("dddd, D MMMM YYYY • h:mm A")}
                </span>
              </div>
            </div>

            {/* Right — Image */}
            <div className="p-8">
              <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-5">
                Product preview
              </p>
              <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden aspect-[4/5] flex items-center justify-center group">
                <img
                  src={main_image}
                  alt="Personalized Product"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Sub-components
const InfoRow = ({ label, value, italic }) => (
  <div className="flex items-start gap-0 py-3">
    <span className="text-xs font-medium text-gray-500 w-28 flex-shrink-0 pt-0.5">
      {label}
    </span>
    <span className={`text-sm text-gray-800 ${italic ? "italic" : ""}`}>
      {value ? (italic ? `"${value}"` : value) : "—"}
    </span>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-50  text-amber-700",
    approved: "bg-green-50  text-green-700",
    rejected: "bg-red-50    text-red-700",
  };
  const dots = {
    pending: "bg-amber-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide capitalize ${styles[status] || "bg-gray-100 text-gray-600"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-gray-400"}`}
      />
      {status}
    </span>
  );
};

export default SinglePersonalizationView;
