import React, { useEffect, useMemo, useRef, useState } from "react";
import validateAdmin from "./validateAdmin";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Admin({ admin }) {
  function notify() {
    Swal.fire({
      title: "Deleted Successfully",
      text: "now this user can not be login with their informations  ",
      icon: "success",
      confirmButtonText: "Ok",
    });
  }

  let [user, setUser] = useState([]);
  let localUsers = JSON.parse(localStorage.getItem("hydra_user"));
  let [click, setClick] = useState(false);
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  useMemo(() => {
    if (click) {
      setUser(localUsers);
    } else {
      setUser([]);
    }
    // console.log(localUsers);
  }, [click]);

  function edit(id, user) {
    navigate(`/update/${id}`, { state: user });
  }
  function deluser(id) {
    let sure = confirm("are you sure want to delete this user");
    if (sure) {
      let remainingUsers = localUsers.filter((item, idx) => {
        return idx != id;
      });
      localStorage.setItem("hydra_user", JSON.stringify(remainingUsers));
      setUser(remainingUsers);
      notify()
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-sm-8 col-10  mx-auto text-center p-3 rounded-3 shadow mt-3 mb-2">
            <h6 className="mb-3">
              <MdOutlineAdminPanelSettings className="fs-1 text-success" />{" "}
              Welcome To Admin Zone
            </h6>
            <img
              src="https://img.freepik.com/free-vector/man-having-online-job-interview_52683-43379.jpg?t=st=1736232907~exp=1736236507~hmac=a26f479d8be8a122325634d18163a3e8be30acdd6dcf2470226d2e25f728675a&w=826"
              className="mb-3 rounded-circle shadow border border-success object-fit-cover "
              style={{ width: "200px", height: "200px" }}
              alt=""
            />
            <div className="text-success fw-semibold">
              <span className="text-danger fw-bolder">Admin Name : </span>{" "}
              {admin.name}{" "}
            </div>
            <div className="text-success fw-semibold">
              <span className="text-danger fw-bolder">Admin Email : </span>{" "}
              {admin.email}
            </div>
          </div>
        </div>
        <div className="ps-5">
          <button
            onClick={() => {
              setClick(!click);
            }}
            className={
              click ? "btn btn-outline-info" : "btn btn-outline-success"
            }
          >
            {click ? "Hide Users" : "View Users"}
          </button>
        </div>
        <div className="row">
          <div className="col-12 mt-3">
            <table className="table text-center table-light">
              <thead>
                <tr>
                  <th scope="col">Sr. No. </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">
                    Password{" "}
                    <span
                      className=" pointer ps-3"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{show ? item.password : "******"}</td>
                    <td>
                      <button
                        onClick={() => edit(index, item)}
                        className="btn btn-outline-info"
                      >
                        Edit
                      </button>{" "}
                      <button
                        onClick={() => deluser(index)}
                        className="btn btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default validateAdmin(Admin);
