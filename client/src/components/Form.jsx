import axios from "axios";
import TextField from "./TextField";
import SubmitForm from "./SubmitForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import { userSchema } from "../Validations/UserValidations";

// const showToast = () => {
//   toast.error("🦄 Wow so easy!", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// };

// const notify = () => toast("Wow so easy !");

const Form = () => {
  const [data, setData] = useState({});
  const [showform, setShowForm] = useState(true);
  let formdata;
  const handleSubmit = async (event) => {
    event.preventDefault();
    formdata = {
      name: event.target.name.value,
      regNo: event.target.regNo.value,
      pEmail: event.target.pEmail.value,
      sEmail: event.target.sEmail.value,
      gitlink: event.target.gitlink.value,
    };

    const isValid = await userSchema.isValid(formdata);

    // axios
    //   .post(`${process.env.REACT_APP_API_BASE_URL}/posts`, formdata)
    //   .then((res) => {
    //     console.log(res);
    //     setData(formdata);
    //     setShowForm(false);
    //   })
    //   .catch((err) => console.error(err));
    if (isValid) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/postform`,
          formdata
        );
        // console.log(res);
        console.log(isValid);
        setData(formdata);
        setShowForm(false);
      } catch (err) {
        console.error("Cannot Post", err);
      }
    } else {
      // console.log();
      // userSchema.validate({}).catch((err) => {
      //   console.log(err);
      // });
      userSchema
        .validate(formdata, { abortEarly: false })
        .then(function () {
          // Success
        })
        .catch(function (err) {
          err.inner.forEach((e) => {
            console.log(e.message);
            <ToastContainer />;
          });
          // alert("Wrong Details");
          // window.print();
        });
    }
  };

  // console.log("Data :", data);

  return (
    <div className="Main-Frame">
      {showform && (
        <>
          <h1 className="Form-Title">REGISTRATION</h1>
          <form onSubmit={handleSubmit}>
            <TextField text="Name" name="name" />
            <br />
            <TextField text="Registration No" name="regNo" />
            <br />
            <TextField text="Personal Email" name="pEmail" />
            <br />
            <TextField text="SRMIST Email" name="sEmail" />
            <br />
            <TextField text="Github Link" name="gitlink" />
            <br />
            <button className="Form-Btn" type="Submit">
              SUBMIT
            </button>
          </form>
          {/* <div>
            <button onClick={notify}>Notify !</button>
            <ToastContainer />
          </div> */}
        </>
      )}
      {!showform && <SubmitForm />}
    </div>
  );
};

export default Form;
