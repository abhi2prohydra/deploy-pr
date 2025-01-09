import React, { useEffect, useMemo, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

function Notes() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState("");

  function notify() {
    Swal.fire({
      title: "Submission failed",
      text: 'plz enter at least 5 letters in "text" and 1 in "title" ',
      icon: "error",
      confirmButtonText: "Got it! ",
    });
  }
  function confirmation() {
    Swal.fire({
      title: "Updated successfully",
      text: "Enhoy with our simple notes ",
      icon: "success",
      confirmButtonText: "Cool ",
    });
  }
  // LOGIC OF NOTES START ############################
  let currentUser = JSON.parse(localStorage.getItem("login_status")) || {};
  let allUsers = JSON.parse(localStorage.getItem("hydra_user")) || [];
  const index = allUsers.findIndex(
    (user) =>
      currentUser.email === user.email && currentUser.password === user.password
  );
  let note = allUsers[index].notes;

  // function delNote(id){

  //   let remainingNotes = note.filter((item, idx)=>{
  //     return idx != id
  //   })
  //   allUsers[index].notes = allUsers[index].notes || []
  //   allUsers[index].notes = remainingNotes
  //   localStorage.setItem('hydra_user', JSON.stringify(allUsers))
  //   setNotes(remainingNotes)
  // }

  // sweet start
  function delNote(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let remainingNotes = notes.filter((item, idx) => idx !== id);
        allUsers[index].notes = allUsers[index].notes || [];
        allUsers[index].notes = remainingNotes;

        localStorage.setItem("hydra_user", JSON.stringify(allUsers));
        setNotes(remainingNotes);

        Swal.fire({
          title: "Deleted!",
          text: "Your note has been deleted.",
          icon: "success",
        });
      } else {
        console.log("Deletion cancelled.");
      }
    });
  }
  // sweet end

  function show() {
    setNotes(note);
  }
  useEffect(() => {
    show();
  }, []);

  function validate() {
    let err = false;
    if (text.length < 5) {
      err = true;
    }
    if (title.length == 0) {
      err = true;
    }

    return err;
  }

  function editNote(item, idx) {
    setText(item.text);
    setTitle(item.title);
    setId(idx);
  }

  function update() {
    let obj = {
      title,
      text,
    };
    note[id] = obj;
    allUsers[index].notes = allUsers[index].notes || [];
    allUsers[index].notes = note;
    localStorage.setItem("hydra_user", JSON.stringify(allUsers));
    setNotes(note);
    confirmation();
    setText("");
    setTitle("");
  }

  function saveNotes() {
    if (!validate()) {
      if (index !== -1) {
        let noteObj = {
          title,
          text,
        };
        let arr = "";
        if (note == null) {
          arr = [noteObj];
        } else {
          arr = [...note, noteObj];
        }
        note = arr;
        allUsers[index].notes = allUsers[index].notes || [];
        allUsers[index].notes = note;
        console.log(allUsers);
        localStorage.setItem("hydra_user", JSON.stringify(allUsers));
        setNotes(note);
      }
      setText("");
      setTitle("");
    } else {
      notify();
    }
  }

  // LOGIC OF NOTES  END ############################

  // console.log(title, text);

  return (
    <>
      <p className="text-center text-success">Welcome to Notes ! </p>
      <div className="row">
        <div className="col-11 p-4 mt-4   mx-auto rounded-3 shadow bg-light">
          <h3 className="text-muted mb-3 position-relative">
            Add a note{" "}
            <span
              onClick={saveNotes}
              className="position-absolute btn btn-outline-info end-0"
            >
              Save
            </span>
          </h3>
          <h4 className="text-muted">
            Title :{" "}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-75 py-2 bg-transparent border-0"
              placeholder="Enter Title... "
            />
          </h4>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", minHeight: "200px" }}
            className="border-0"
            name=""
            placeholder="Take a note ...."
            id=""
          ></textarea>
        </div>
      </div>
      <p className="text-center mt-3 text-success">Previous nots are here !</p>
      <div className="d-flex mt-3  p-3 justify-content-center align-items-center gap-3 flex-wrap ">
        {notes?.map((item, index) => (
          <div
            className="shadow  rounded-4 notes-scroll overflow-y-scroll px-3 pt-0 bg-light position-relative"
            style={{ width: "300px", height: "200px" }}
            key={index}
          >
            <p className="text-end p-2 position-sticky bg-light end-0 top-0">
              <GrEdit
                data-bs-target="#update"
                data-bs-toggle="modal"
                onClick={() => editNote(item, index)}
                className="pointer"
              />
              <RiDeleteBinLine
                onClick={() => delNote(index)}
                className="ms-4 pointer"
              />
            </p>
            <h5 className="text-muted  fw-bolder">
              Title :{" "}
              <span className="text-success fw-lighter">{item.title}</span>{" "}
            </h5>
            <h6 className="fw-light">
              <span className="text-success fw-bold">Content : </span>{" "}
              {item.text}
            </h6>
          </div>
        ))}
      </div>

      {/* modal opening */}
      <div id="update" className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-11 p-4 mt-4   mx-auto rounded-3 shadow bg-light">
                  <h3 className="text-muted mb-3 position-relative">
                    Updatin...
                  </h3>
                  <h4 className="text-muted">
                    Title :{" "}
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="w-75 py-2 bg-transparent border-0"
                      placeholder="Enter Title... "
                    />
                  </h4>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: "100%", minHeight: "200px" }}
                    className="border-0"
                    name=""
                    placeholder="Take a note ...."
                    id=""
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={update}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal closing */}
    </>
  );
}

export default Notes;
