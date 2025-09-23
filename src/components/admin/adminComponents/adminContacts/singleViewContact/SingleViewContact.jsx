import moment from "moment";
import { useEffect, useMemo } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  clearContactError,
  getSingleContact,
} from "../../../../../redux/features/contact/contactSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

// Contact information display component
const ContactInfoRow = ({ label, value }) => (
  <div className="mb-4">
    <span className="font-medium font-gothamNarrow text-gray-700">
      {label}:{" "}
    </span>
    <span className="text-gray-900">{value}</span>
  </div>
);

const SingleViewContact = () => {
  const { loading, error, contact } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const { id } = useParams();

  // Memoize formatted date to prevent unnecessary recalculations
  const formattedDate = useMemo(() => {
    return contact?.date_joined
      ? moment(contact.date_joined).format("dddd, D MMM YYYY")
      : "";
  }, [contact?.date_joined]);

  // Handle error clearing
  useEffect(() => {
    if (error) {
      dispatch(clearContactError());
    }
  }, [dispatch, error]);

  // Fetch contact data
  useEffect(() => {
    if (id && !contact) {
      dispatch(getSingleContact(id));
    }
  }, [dispatch, id, contact]);

  // Early return for no data
  if (!loading && !contact) {
    return (
      <div className="font-gothamNarrow px-8 mt-8">
        <h1 className="text-xl text-gray-600">No Contact Data Found</h1>
      </div>
    );
  }

  return (
    <>
      <MetaData title="Baltra Admin Dashboard - Contact View" />

      {/* Header with back navigation */}
      <header className="font-gothamNarrow px-8 mt-8 md:mt-4">
        <Link
          to="/baltra-admin-dashboard/all-contact-message-List"
          className="inline-flex items-center font-gothamNarrow text-blue-600 hover:text-blue-800 transition-colors duration-200"
          aria-label="Go back to contact list"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          View Contact List
        </Link>
      </header>

      {/* Main content */}
      <main className="font-gothamNarrow">
        {loading ? (
          <FormSkeleton />
        ) : (
          <section className="bg-white container mx-auto px-8 py-6 my-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold font-gothamNarrow text-gray-800 mb-6 border-b pb-3">
              Contact Information
            </h2>

            <div className="space-y-1">
              <ContactInfoRow label="Name" value={contact?.name || "N/A"} />
              <ContactInfoRow label="Email" value={contact?.email || "N/A"} />
              <ContactInfoRow label="Phone" value={contact?.phone || "N/A"} />
              <ContactInfoRow
                label="Message"
                value={contact?.note || "No message provided"}
              />
              <ContactInfoRow
                label="Created At"
                value={formattedDate || "Date unavailable"}
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default SingleViewContact;
