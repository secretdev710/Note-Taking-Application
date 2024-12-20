import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../utility/fetchData";

const Profile = (props) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const { response, data } = await fetchData('/api/auth/getuserinfo');
      if (!response.ok) {
        navigate('/login');
      }
      else {
        const user = data;
        console.log(typeof user.created_at);
        setUserInfo({
          ...user,
          created_at: new Date(user.created_at).toLocaleDateString(),
          updated_at: new Date(user.updated_at).toLocaleDateString()
        });
      }
    }
    getUserInfo();
  }, []);

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleclick = async (e) => {
    e.preventDefault();
    const { response } = await fetchData('/api/auth/updateuser', { name: userInfo.name, email: userInfo.email });
    if (!response.ok) {
      props.showAlert('Something went wrong', 'danger');
    }
    else {
      props.showAlert('Profile updated successfully', 'success');
    }
  }

  return (
    <div>
      <div className="sm:mx-auto sm:my-12 sm:max-w-md m-[12%]">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-500 to-yellow-500">Edit your profile</h1>
        <div className="my-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-200">
            Username
          </label>
          <input
            type="text"
            defaultValue={userInfo.name}
            className="mt-1 p-2 text-black w-full border rounded-md"
            id="name"
            name="name"
            placeholder="Set your UserName"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="block text-lg font-medium text-gray-200">
            Email
          </label>
          <textarea
            className="mt-1 p-2 text-black w-full border rounded-md"
            defaultValue={userInfo.email}
            id="email"
            name="email"
            placeholder="Set your email"
            rows="1"
            onChange={onChange}
          ></textarea>
        </div>
        <div className="my-3 flex justify-between">
          <p className="text-sm text-gray-400">Created on: {userInfo.created_at}</p>
          <p className="text-sm text-gray-400">Last updated on: {userInfo.updated_at}</p>
        </div>
        <button type="button" className=" w-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 focus:outline-none text-white text-md uppercase font-bold shadow-md rounded-lg mx-auto px-4 py-2" onClick={handleclick}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Profile