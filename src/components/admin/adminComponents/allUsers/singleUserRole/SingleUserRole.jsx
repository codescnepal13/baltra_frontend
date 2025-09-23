import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAdminError,
  getSingleUser,
  updateUserRole,
} from "../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../layout/metaData/MetaData";
import FormSkeleton from "../../adminLayout/formSkeleton/FormSkeleton";

const SingleUserRole = () => {
  const { user, loading, isLoading, error } = useSelector(
    (state) => state.admin
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setImage(file);
    };
  }, []);

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key, user[key]);
      });
      setAvatarPreview(user?.image_url);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(id));
    }
  }, [dispatch, id]);

  const onSubmit = (editData) => {
    const formData = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      if (value !== user[key]) {
        formData.append(key, value);
      }
    });
    if (image) {
      formData.append("image", image);
    }
    dispatch(updateUserRole({ id, formData, enqueueSnackbar, navigate }));
  };
  return (
    <>
      <MetaData title="Baltra-admin-dashboard-SingleCustomerView" />
      <div className="font-gothamNarrow px-8 mt-8 md:mt-4 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all-user-List"
          className="flex items-center font-gothamNarrow "
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          View user List
        </Link>
      </div>
      {loading ? (
        <FormSkeleton />
      ) : (
        <div className="bg-[#ffffff] py-1 my-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex px-8 my-10 h-screen"
          >
            <div className="lg:w-1/2 ">
              <div className="mb-4">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  firstName
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    name="firstname"
                    placeholder="Please enter firstname"
                    {...register("firstname")}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  lastName
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    name="lastname"
                    placeholder="Please enter lastname"
                    {...register("lastname")}
                  />
                </label>
              </div>

              <div className="mb-4 w-full ">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Email Address
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    name="email"
                    placeholder="Please enter your email"
                    {...register("email")}
                  />
                </label>
              </div>

              <div className="mb-4 w-full">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Phone Number
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    name="contact"
                    placeholder="Please enter your phoneNo"
                    {...register("contact")}
                  />
                </label>
              </div>

              <div className="mb-4 w-full">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  BirthDay
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="date"
                    name="dob"
                    placeholder="Please enter your mobileNo"
                    {...register("dob")}
                  />
                </label>
              </div>

              <div className="mb-4 w-full">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Gender
                  <select
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    name="gender"
                    {...register("gender")}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>
              <div className="mb-4 w-full">
                <label className="text-sm font-normal block mb-2 text-[#000000]">
                  Role
                  <input
                    className="border border-gray-400 p-2 w-full h-10 rounded focus:outline-none focus:border-red-500 font-gothamNarrow"
                    type="text"
                    name="role"
                    placeholder="Please enter your phoneNo"
                    {...register("role")}
                    disabled
                  />
                </label>
              </div>

              <button
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-8 rounded-sm mt-4 relative font-gothamNarrow"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                Save Changes
              </button>
            </div>
            <div className="lg:w-1/3 relative hidden sm:block">
              <div className="absolute inset-y-0 right-0 p-5">
                <div className="my-5">
                  <div className="md:w-56 md:h-56 border border-gray-400 relative mx-auto">
                    <>
                      <label
                        htmlFor="imgFile"
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                      >
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="profile"
                            className="object-cover w-full h-full cursor-pointer"
                          />
                        ) : (
                          <span>Upload Image</span>
                        )}
                      </label>
                      <input
                        id="imgFile"
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SingleUserRole;
