import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/navbar/Navbar";
import { userAuthToken } from "../utils/user.token";
import { UserContext } from "../context/userContext";

const Profile = () => {
  const [user] = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: user?.username ? user?.username : "",
    firstName: user?.firstName ? user?.firstName : "",
    lastName: user?.lastName ? user?.lastName : "",
    email: user?.email ? user?.email : "",
    contact: user?.contact ? user?.contact : "",
    address: user?.address ? user?.address : "",
  });

  const [profile, setProfile] = useState()

  const onInputChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/update-user/` + user?._id,
        formData
      );
      toast.success("Profile Updated");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const changeProfile = async (file) => {
    const formData = new FormData()
    console.log(formData)
    formData.append('profile', file)
    try {
      await axios.put(
        `http://localhost:5000/api/update-profile/` + user?._id, formData);
      toast.success("Profile Updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              {
                profile ?
                  <>
                    <img src={URL.createObjectURL(profile)} alt="avatar"
                      class="rounded-circle img-fluid" style={{ width: "150px", height: '150px', objectFit: 'cover' }} />

                  </>
                  :
                  user?.profile ?
                    <>
                      <img src={`http://localhost:5000/${user?.profile}`} alt="avatar"
                        class="rounded-circle img-fluid" style={{ width: "150px", height: '150px', objectFit: 'cover' }} />

                    </>
                    :
                    <>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                        class="rounded-circle img-fluid" style={{ width: "150px", height: '150px', objectFit: 'cover' }} />

                    </>

              }
              <i style={{ position: 'absolute', fontSize: '15px', height: '30px', width: '30px', top: '25%', left: '63%', textAlign: 'center' }} onClick={() => {
                document.getElementById('image').click()
              }} className=" bg-primary d-flex justify-content-center align-items-center rounded-circle text-light text-center">
                <i className="fas fa-pen"></i>
              </i>
              <h5 class="my-3">{user?.username}</h5>
              <p class="text-muted mb-1">{user?.email}</p>
              <p class="text-muted mb-1">{user?.contact}</p>
              <p class="text-muted mb-4">{user?.address}</p>
            </div>
          </div>
        </div>
        <div
          className="col-md-8 mx-auto d-block pb-3"

        >
          <div className="rounded border p-4">
            <h5 className="text-secondary">User Profile</h5>
            <div className="my-3">
              <div className="row my-3">
                <div className="col">
                  <label className="text-s" htmlFor="">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={formData?.firstName}
                    onChange={(e) => onInputChange(e)}
                    className="form-control rounded text-secondary"
                    type="text"
                    placeholder={
                      user?.firstName ? user?.firstName : "Enter First Name here"
                    }
                  />
                </div>
                <div className="col">
                  <label className="text-s" htmlFor="">
                    Last Name
                  </label>
                  <input
                    onChange={(e) => onInputChange(e)}
                    value={formData?.lastName}
                    name="lastName"
                    className="form-control rounded text-secondary"
                    type="text"
                    placeholder={
                      user?.lastName ? user?.lastName : "Enter Last Name here"
                    }
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col">
                  <label className="text-s" htmlFor="">
                    Email
                  </label>
                  <input
                    onChange={(e) => onInputChange(e)}
                    value={formData.email}
                    name="email"
                    className="form-control rounded text-secondary"
                    type="text"
                    placeholder={user?.email}
                  />
                </div>
                <div className="col">
                  <label className="text-s" htmlFor="">
                    Username
                  </label>
                  <input
                    onChange={(e) => onInputChange(e)}
                    value={formData?.username}
                    name="username"
                    className="form-control rounded text-secondary"
                    type="text"
                    placeholder={
                      user?.username ? user?.username : "Enter username here"
                    }
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col">
                  <div className="col">
                    <label className="text-s" htmlFor="">
                      Phone
                    </label>
                    <input
                      onChange={(e) => onInputChange(e)}
                      value={formData?.contact}
                      name="contact"
                      className="form-control rounded text-secondary"
                      type="text"
                      placeholder={
                        user?.contact ? user?.contact : "Enter contact here"
                      }
                    />
                  </div>
                </div>
                <div className="col">
                  <label className="text-s" htmlFor="">
                    Address
                  </label>
                  <input
                    onChange={(e) => onInputChange(e)}
                    value={formData?.address}
                    name="address"
                    className="form-control rounded text-secondary"
                    type="text"
                    placeholder={
                      user?.address ? user?.address : "Enter address here"
                    }
                  />
                </div>

              </div>
              <div className="col mb-3">
                <input
                  id="image"
                  onChange={(e) => {
                    setProfile(e.target.files[0])
                    changeProfile(e.target.files[0])
                  }}
                  name="profile"
                  className="form-control rounded text-secondary d-none"
                  type="file"
                  placeholder={
                    user?.profile ? user?.profile : "Enter address here"
                  }
                />
              </div>
              <div>
                <button
                  onClick={() => updateUser()}
                  className="btn btn-primary btn-sm rounded py-2 px-3"
                >
                  Update
                </button>
                <button className="btn btn-sm border-secondary rounded py-2 px-3 mx-3 text-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
