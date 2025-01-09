import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2'

const schema = yup
  .object()
  .shape({
    name: yup.string().required().min(3).max(20),
    email: yup.string().required().email().min(8).max(30),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  })
  .required();


function RegisterAdmin() {

     // swal alert definition 
    
      function notify(){
        Swal.fire({
          title: 'Registered as an Admin',
          text: 'Now you can login with your registered "email" and "password" ',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      }
    

    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        resolver: yupResolver(schema),
      });

     // saveData function definition 
  function saveData(data) {
    let localData = JSON.parse(localStorage.getItem('hydra_admin'))
    let arr  = ''
    if(localData == null){
      arr = [data]
    }
    else{
      arr = [...localData, data]
    }
  
    localStorage.setItem('hydra_admin', JSON.stringify(arr))
    
    console.log(data);
    reset()
    notify()
    navigate('/admin/login')
    
  }


  return (
    <>
    <h5 className='text-center text-success'>Admin Registration </h5>
     <div className="row">
        <div className=" bg-light p-5 shadow mx-auto rounded-3 mt-5  col-10 col-sm-8 col-md-6 col-lg-4">
          <h3 className="text-center text-success mb-4">
            Register <span className="text-danger ">Now!</span>
          </h3>
          <form onSubmit={handleSubmit((d) => saveData(d))}>
          <input
            {...register("name")}
            className="form-control mt-3 "
            type="text"
            placeholder="Enter your name..."
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <input
            {...register("email")}
            className="form-control mt-3 "
            type="email"
            placeholder="Enter your email..."
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            className="form-control mt-3 "
            type="password"
            placeholder="Create pswd..."
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
          <button className="btn btn-outline-success form-control mt-4 mb-3">
            Register
          </button>
          </form>
          <p>
            Already have an account ?{" "}
            <span
              onClick={()=>navigate("/admin/login")}
              className="text-decoration-underline text-info login"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterAdmin