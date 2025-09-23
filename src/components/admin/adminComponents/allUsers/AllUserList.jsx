import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { FaPencilAlt, FaSearch, FaTrashAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAdminError,
  deleteMultipleUsersRole,
  deleteUserRole,
  getAllUserList,
} from "../../../../redux/features/admin/adminSlice";
import UserPagination from "../adminPagination/userPagination/UserPagination";
import DeleteUserPopUp from "./deleteUserPopUp/DeleteUserPopUp";

const AllUserList = () => {
  const { loading, error, allUsers } = useSelector((state) => state.admin);
  const userPagination =
    useSelector((state) => state.admin.userPagination) || {};
  const { page, total_pages, results_per_page } = userPagination;

  const dispatch = useDispatch();
  const [selectGender, setSelectGender] = useState("All");
  const [searchUserName, setSearchUserName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsersId, setSelectedUsersId] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allUsersIds = allUsers.map((user) => user.id);
      setSelectedUsersId(allUsersIds);
    } else {
      setSelectedUsersId([]);
    }
  };

  const handleSelectUser = (event, userId) => {
    if (event.target.checked) {
      setSelectedUsersId((prev) => [...prev, userId]);
    } else {
      setSelectedUsersId((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleMultipleDelete = () => {
    if (selectedUsersId.length > 0) {
      dispatch(
        deleteMultipleUsersRole({
          user_ids: selectedUsersId,
          enqueueSnackbar,
        })
      ).then(() => {
        dispatch(getAllUserList(page));
      });

      setSelectedUsersId([]);
    }
  };

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };
  const handleDeleteConfirm = () => {
    if (selectedUserId !== null) {
      dispatch(deleteUserRole({ user_id: selectedUserId, enqueueSnackbar }));
      setSelectedUserId(null);
    }
  };

  const handleSearch = () => {
    dispatch(getAllUserList({ firstname: searchUserName }));
  };

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(getAllUserList(newPage));
    },
    [dispatch]
  );

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);
  useEffect(() => {
    dispatch(
      getAllUserList({
        gender: selectGender === "All" ? "" : selectGender,
      })
    );
  }, [dispatch, selectGender]);
  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-8 py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold font-gothamNarrow">User List</h2>
        </div>
        <div className="bg-[#FFFFFF] px-2 py-1">
          <div className="flex mb-2 text-xs">
            <div className="relative mr-2 flex items-center">
              <input
                type="text"
                placeholder="Search by User Name"
                className="w-42 pl-4 pr-10 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-red-500 focus:ring-gray-300 font-gothamNarrow"
                onChange={(e) => setSearchUserName(e.target.value)}
              />
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 ml-1 inline-flex items-center rounded-sm font-gothamNarrow"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
            <div className="relative mr-2 flex items-center">
              <select
                className="w-42 font-gothamNarrow pl-4 pr-10 py-2 border text-sm border-gray-300 rounded-sm focus:outline-none focus:border-red-500 focus:ring-gray-300"
                value={selectGender}
                onChange={(e) => setSelectGender(e.target.value)}
              >
                <option value="All">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="bg-white font-sans table-container hide-scrollbar overflow-x-auto">
            {selectedUsersId?.length > 0 && (
              <button
                className="h-4 w-4 text-red-600 hover:text-red-700"
                onClick={handleMultipleDelete}
              >
                <FaTrashAlt />
              </button>
            )}
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="font-gothamNarrow">
                <tr>
                  <th className="px-4 py-2 font-gothamNarrow text-sm font-semibold text-black whitespace-nowrap border-gray-300 border-l border-r accent-red-500">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        allUsers?.length > 0 &&
                        selectedUsersId?.length === allUsers?.length
                      }
                    />
                  </th>
                  <th className="px-4 py-2 font-gothamNarrow text-left text-sm font-semibold text-black">
                    S.N.
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    Avatar
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    User Name
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    Email
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    ContactNo
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    Gender
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    Role
                  </th>

                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    CreatedAt
                  </th>
                  <th className="px-4 py-3 font-gothamNarrow text-left text-sm font-semibold text-black border-l border-r border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-gray-800 border-t-gray-800"></div>
                    </td>
                  </tr>
                ) : allUsers && allUsers?.length > 0 ? (
                  allUsers &&
                  allUsers?.map((adminUser, index) => (
                    <tr
                      key={adminUser.id}
                      className="hover:bg-[#FFF0E5] hover:shadow-sm border-t border-b border-r border-l border-gray-300 cursor-pointer"
                    >
                      <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500 accent-red-500">
                        <input
                          type="checkbox"
                          checked={selectedUsersId.includes(adminUser.id)}
                          onChange={(e) => handleSelectUser(e, adminUser.id)}
                        />
                      </td>
                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-xs text-gray-500">
                        {page != null && results_per_page != null
                          ? (page - 1) * results_per_page + index + 1
                          : ""}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                        <img
                          src={adminUser?.image_url}
                          alt={`User Photo ${adminUser?.name}`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminUser.firstname} {adminUser.lastname}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminUser.email}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminUser?.contact}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminUser?.gender ? adminUser?.gender : "-"}
                      </td>

                      <td className="px-4 py-1 whitespace-nowrap text-sm font-gothamNarrow text-[#000000]">
                        {adminUser.role}
                      </td>

                      <td className="px-4 font-gothamNarrow py-1 whitespace-nowrap text-sm text-[#000000]">
                        {moment(adminUser.date_joined).format(
                          "dddd, D MMM YYYY"
                        )}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500 border-b border-gray-300">
                        <div className="flex space-x-2">
                          <Link
                            to={`/baltra-admin-dashboard/single-user-view/${adminUser.id}`}
                          >
                            <FaPencilAlt
                              className="text-green-500 hover:text-green-700"
                              title="Edit"
                            />
                          </Link>
                          <FaTrash
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete"
                            onClick={() => handleOpenModal(adminUser.id)}
                          />
                          {selectedUserId !== null && (
                            <DeleteUserPopUp
                              onClose={handleCloseModal}
                              onConfirm={handleDeleteConfirm}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="text-gray-500 text-sm font-gothamNarrow"
                      colSpan={12}
                      style={{ textAlign: "center" }}
                    >
                      No Data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {total_pages !== null && total_pages > 1 ? (
            <div className="flex justify-end mt-0">
              <UserPagination
                currentPage={page}
                totalPages={total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default AllUserList;
