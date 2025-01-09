import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import statusLogin from './StatusLogin'
import Swal from 'sweetalert2'

function Profile({user}) {
  let navigate = useNavigate()
  function logout(){
   let sure =  confirm("are you sure want to logout")
   if(sure){
    user.status = false
    localStorage.setItem('login_status', JSON.stringify(user))
    navigate('/')
   }
  }

  function github(){
    Swal.fire({
      title: "Submit your Github username",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const githubUrl = `
            https://api.github.com/users/${login}
          `;
          const response = await fetch(githubUrl);
          if (!response.ok) {
            return Swal.showValidationMessage(`
              ${JSON.stringify(await response.json())}
            `);
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  }

  function gitCall(){
    github()
  }

  return (
    <>
    <button onClick={logout} className='position-absolute end-0 me-5 btn btn-outline-danger'>Log Out</button>
    <button onClick={()=> navigate(`/notes`)} className='position-absolute start-0 ms-5 btn btn-outline-info'>Your Notes</button>
  <div className="container mt-5">
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body text-center">
            <img src="https://img.freepik.com/free-photo/magical-winter-landscape_23-2151911786.jpg?size=626&ext=jpg" alt="Profile"  style={{objectFit:"cover", width:"300px", height:"150px", }} className="img-fluid shadow-lg rounded-3 mb-3" />
            <h3>{user.name}</h3>
            <p className="text-muted">{user.email}</p>

            <button onClick={gitCall} className='btn btn-outline-info'>See your GitHub Avatar</button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h4>About</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet ab, mollitia ipsum amet rerum eos veritatis animi libero voluptas similique laborum. Laborum voluptatum dolore est quibusdam eum! Aut, numquam deleniti.</p>
           
          </div>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default statusLogin(Profile)