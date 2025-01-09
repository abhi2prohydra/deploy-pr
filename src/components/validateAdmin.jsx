import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function validateAdmin(AdminCB) {

      function notify(){
              Swal.fire({
                title: 'Please Login First',
                text: 'You are not login yet ',
                icon: 'warning',
                confirmButtonText: 'Cool'
              })
            }
    

  return (props)=>{
    let navigate = useNavigate()
        let data = JSON.parse(localStorage.getItem('admin_login_status'))
    
        useEffect(()=>{
            if(data.status){
                navigate('/admin')
            }
            else{
                notify()
                navigate('/admin/login')
            }
        },[])

    return <AdminCB  {...props} admin={data}/>
  }
}

export default validateAdmin