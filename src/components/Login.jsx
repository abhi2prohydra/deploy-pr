import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2'

const schema = yup
  .object()
  .shape({
    email: yup.string().required().email().min(8).max(30),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  })
  .required();

function Login() {

  // swal alert definition 
  
    function notify(){
      Swal.fire({
        title: 'Login Successfully',
        text: 'Enjoy your day. You are our trusted member ',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    }
    
    function notifyG(){
      Swal.fire({
        title: 'Authentication Failed',
        text: 'User not found Please check the Email and Password',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
    }

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });


  let navigate =  useNavigate()

  // matchData function definition
  function matchData(data){
    let localData = JSON.parse(localStorage.getItem('hydra_user')) || []
    let validUser = localData.find((item)=>item.email === data.email && item.password === data.password)
    if(validUser){
      notify()
      navigate('/profile', {state: validUser})
      let isLoggedIn = JSON.parse(localStorage.getItem('login_status'))
      isLoggedIn = {...validUser, status:true }
      localStorage.setItem('login_status', JSON.stringify(isLoggedIn))
    }
    else{
      notifyG()
    }

    
    
  }
  return (
    <>
       <div className="row">
      <div className=" bg-light p-5 shadow mx-auto rounded-3 mt-5  col-10 col-sm-8 col-md-6 col-lg-4">
      <h3 className='text-center text-success mb-4'>Login <span className='text-danger '>Now!</span></h3>
      <form onSubmit={handleSubmit((d) => matchData(d))}>
          
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
            placeholder="Enter your pswd..."
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
          <button  className="btn btn-outline-success form-control mt-4 mb-3">
           Login
          </button>
          </form>
      <p>don't have an account ? <span onClick={()=> navigate('/register')} className='text-decoration-underline text-info login'>Register</span></p>
      </div>
    </div>
    </>
  )
}

export default Login