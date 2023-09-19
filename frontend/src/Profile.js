import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ userID }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleEdit = () => {
    const updatedName = prompt("Enter new name:", user.name);
    const updatedEmail = prompt("Enter new email:", user.email);

    if (updatedName !== null && updatedEmail !== null) {
      const updatedUser = { ...user, name: updatedName, email: updatedEmail };
      setUser(updatedUser);
    }
  };

  const handleDelete = () => {
    // Send a DELETE request to delete the user's account
    fetch(`https://jsonplaceholder.typicode.com/users/${userID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        window.location.reload();
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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

  if (!userID) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
          <label className="block text-gray-600 font-medium">Name</label>
          <p className="mt-1">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Email</label>
          <p className="mt-1">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">User ID</label>
          <p className="mt-1">{userID}</p>
        </div>
        <div className="mb-8">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 mb-2"
          >
            Back to Home
          </Link>
        </div>
        <div className="mb-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300 mb-2"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
