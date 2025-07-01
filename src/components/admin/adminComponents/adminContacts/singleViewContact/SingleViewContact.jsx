import React, { useEffect } from "react";
import MetaData from "../../../../layout/metaData/MetaData";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearContactError,
  getSingleContact,
} from "../../../../../redux/features/contact/contactSlice";

const SingleViewContact = () => {
  const { loading, error, contact } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      dispatch(clearContactError());
    }
    if (id) {
      dispatch(getSingleContact(id));
    }
  }, [dispatch, error, id]);
  if (!contact) return <h1 className="font-gothamNarrow">No Data Found</h1>;
  return (
    <>
      <MetaData title="Baltra-admin-dashboard-ContactView" />
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all-contact-message-List"
          className="flex items-center font-gothamNarrow "
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          View Contact List
        </Link>
      </div>
      {loading ? (
        <FormSkeleton />
      ) : (
        <div className="font-gothamNarrow bg-[#ffffff] container px-8 py-4 my-5">
          <h2 className="text-xl font-semibold font-gothamNarrow ">
            Contact Information
          </h2>
          <div className="space-y-4 my-5">
            <div>
              <span className="font-medium font-gothamNarrow">Name: </span>
              <span>{contact?.name}</span>
            </div>
            <div>
              <span className="font-medium font-gothamNarrow">Email: </span>
              <span>{contact?.email}</span>
            </div>
            <div>
              <span className="font-medium font-gothamNarrow">Phone: </span>
              <span>{contact?.phone}</span>
            </div>
            <div>
              <span className="font-medium font-gothamNarrow">Message: </span>
              <span>{contact?.note}</span>
            </div>
            <div>
              <span className="font-medium font-gothamNarrow">
                Created At:{" "}
              </span>
              <span>
                {moment(contact.updatedAt).format("dddd, D MMM YYYY")}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleViewContact;
