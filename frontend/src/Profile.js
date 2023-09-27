import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { USERS_BASE_URL } from "./Constants";

const Profile = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [searchUsername, setSearchUsername] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    username: auth().username,
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    const getUser = async () => {
      console.log("Fetching user data...");
      try {
        const response = await axios.get(
          `${USERS_BASE_URL}/api/users/${auth().username}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("_auth")}`,
            },
          }
        );
        setUser(response.data);
        setIsLoading(false);
        setIsUpdated(false);
      } catch (error) {
        setIsLoading(true);
      }
    };
    if (!user || isUpdated) {
      getUser();
    }
  }, [user, isUpdated, navigate, auth]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${USERS_BASE_URL}/api/users/${searchUsername}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        }
      );
      setFoundUser(response.data);
    } catch (error) {
      console.error("User not found:", error);
      setFoundUser(null);
    }
  };

  const handleEdit = () => {
    // Open the edit modal and pre-fill data
    setEditedUser({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    // Close the edit modal
    setIsEditModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${USERS_BASE_URL}/api/users`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        }
      );
      console.log("User updated:", response.data);
      setIsUpdated(true);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert(`Error updating user! ${error.response.data.error}`);
    }
  };

  const handleDelete = () => {
    // Send a DELETE request to delete the user's account
    try {
      axios
        .delete(`${USERS_BASE_URL}/api/users/${auth().username}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        })
        .then((response) => {
          console.log("User deleted:", response.data);
          alert("User deleted");
          signOut();
        });
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`Error deleting user! ${error.response.data.error}`);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <p className="text-red-500">User data not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full mb-4 md:mb-0">
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">
            Search Username
          </label>
          <div className="flex">
            <input
              type="text"
              name="searchUsername"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Search
            </button>
          </div>
        </div>
        {foundUser ? (
          <div>
            <h3 className="text-xl font-bold mt-4">Found User</h3>
            <p>Username: {foundUser.username}</p>
            <p>First Name: {foundUser.firstname}</p>
            <p>Last Name: {foundUser.lastname}</p>
            <p>Email: {foundUser.email}</p>
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>
      <div className="p-8"></div>
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold mb-4">User Profile</h2>
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 mb-2"
          >
            Edit
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Username</label>
          <p className="mt-1">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">First Name</label>
          <p className="mt-1">{user.firstname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Last Name</label>
          <p className="mt-1">{user.lastname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Email</label>
          <p className="mt-1">{user.email}</p>
        </div>
        <div className="mb-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300 mb-2"
          >
            Delete Account
          </button>
        </div>
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={handleEditModalClose}
          contentLabel="Edit User Data"
        >
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Username</label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={editedUser.firstname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstname: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={editedUser.lastname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastname: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">{/* Add more form fields as needed */}</div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleEditModalClose}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
