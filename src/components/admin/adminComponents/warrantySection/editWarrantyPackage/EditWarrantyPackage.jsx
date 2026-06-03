import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineCurrencyRupee,
  HiOutlinePencilSquare,
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineTag,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAdminError,
  dropdownSubCategoryList,
  editWarrantyForm,
  singleWarrantyProduct,
} from "../../../../../redux/features/admin/adminSlice";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

const Field = ({ label, error, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-600">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
        {error}
      </p>
    )}
  </div>
);

const inputClass = (hasErr) =>
  `w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg bg-gray-50 text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:bg-white ${
    hasErr
      ? "border-red-300 focus:border-red-400"
      : "border-gray-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-100"
  }`;

const EditWarrantyPackage = () => {
  const { subCategoryList, error, warrantyPackage, isLoading, isProcessing } =
    useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    period: "",
    type: "",
    amt: "",
    offers: "",
    subcategory: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOffersChange = (event, editor) => {
    const data = editor.getData();
    setForm((prev) => ({ ...prev, offers: data }));
    if (errors.offers) setErrors((prev) => ({ ...prev, offers: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.subcategory)
      newErrors.subcategory = "Please select a subcategory";
    if (!form.period) newErrors.period = "Enter product duration";
    if (!form.type) newErrors.type = "Enter package type";
    if (!form.amt) newErrors.amt = "Enter warranty amount";
    if (
      !form.offers ||
      form.offers === "<p><br></p>" ||
      form.offers === "<p>&nbsp;</p>"
    )
      newErrors.offers = "Describe the package offers";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      enqueueSnackbar("Please fill all required fields", { variant: "error" });
      return;
    }
    const sanitizedWarrantyValue = {
      ...form,
      offers: form.offers.replace(/<\/?p>/g, ""),
    };
    dispatch(
      editWarrantyForm({
        form_id: id,
        warrantyValue: sanitizedWarrantyValue,
        enqueueSnackbar,
        navigate,
      }),
    );
  };

  // Populate form when data loads
  useEffect(() => {
    if (warrantyPackage) {
      const offersContent = warrantyPackage.offers || "";
      const wrappedOffers = offersContent.trim().startsWith("<p>")
        ? offersContent
        : `<p>${offersContent}</p>`;
      setForm({
        period: warrantyPackage.period || "",
        type: warrantyPackage.type || "",
        amt: warrantyPackage.amt || "",
        offers: wrappedOffers,
        subcategory: warrantyPackage.subcategory || "",
      });
    }
  }, [warrantyPackage]);

  useEffect(() => {
    if (id) dispatch(singleWarrantyProduct({ form_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(dropdownSubCategoryList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  if (isLoading) return <FormSkeleton />;

  return (
    <div className="font-gothamNarrow max-w-screen-2xl mx-auto px-4 py-6">
      {/* ── Back link ── */}
      <Link
        to="/baltra-admin-dashboard/all/warranty-package-list"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors mb-5"
      >
        <HiOutlineArrowLeft size={15} />
        Back to warranty packages
      </Link>

      {/* ── Page header ── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
          <HiOutlinePencilSquare size={20} className="text-amber-500" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            Edit warranty package
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Update the details for this package
          </p>
        </div>
      </div>

      {/* ── Form card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* top accent */}
        <div className="h-1 w-full bg-amber-400" />

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Subcategory */}
            <Field label="Subcategory" required error={errors.subcategory}>
              <div className="relative">
                <HiOutlineSquares2X2
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  className={
                    inputClass(errors.subcategory) +
                    " appearance-none pr-8 cursor-pointer"
                  }
                >
                  <option value="">Select subcategory</option>
                  {subCategoryList?.length > 0 ? (
                    subCategoryList.map((s) => (
                      <option key={s.subcategory_id} value={s.subcategory_id}>
                        {s.subcategory_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading categories…</option>
                  )}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                  ▾
                </span>
              </div>
            </Field>

            {/* Duration */}
            <Field label="Duration" required error={errors.period}>
              <div className="relative">
                <HiOutlineCalendar
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  name="period"
                  value={form.period}
                  onChange={handleChange}
                  placeholder="e.g. 1 Year, 2 Years"
                  className={inputClass(errors.period)}
                />
              </div>
            </Field>

            {/* Package type */}
            <Field label="Package type" required error={errors.type}>
              <div className="relative">
                <HiOutlineTag
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  placeholder="e.g. Standard, Premium, Gold"
                  className={inputClass(errors.type)}
                />
              </div>
            </Field>

            {/* Amount */}
            <Field label="Package price" required error={errors.amt}>
              <div className="relative">
                <HiOutlineCurrencyRupee
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  name="amt"
                  value={form.amt}
                  onChange={handleChange}
                  placeholder="Enter amount in Rs"
                  className={inputClass(errors.amt)}
                />
              </div>
            </Field>

            {/* Offers — full width */}
            <div className="md:col-span-2">
              <Field label="Package offers" required error={errors.offers}>
                <div
                  className={`rounded-lg overflow-hidden border transition-colors ${
                    errors.offers ? "border-red-300" : "border-gray-200"
                  }`}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={form.offers}
                    onChange={handleOffersChange}
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="border-t border-gray-100 mt-6 pt-5 flex items-center gap-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <HiOutlineShieldCheck size={15} />
                  Save changes
                </>
              )}
            </button>

            <Link to="/baltra-admin-dashboard/all/warranty-package-list">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWarrantyPackage;
