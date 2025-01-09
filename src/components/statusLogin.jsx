import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



function statusLogin(Check) {


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
    let data = JSON.parse(localStorage.getItem('login_status'))

    useEffect(()=>{
        if(data.status){
            navigate('/profile')
        }
        else{
            notify()
            navigate('/login')
        }
    },[])
    
    
    return <Check {...props} user={data} />
  }
}

export default statusLogin