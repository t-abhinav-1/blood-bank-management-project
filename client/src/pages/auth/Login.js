// import React from "react";
// import Form from "../../components/shared/form/Form";

// const Login = () => {
//   return (
//     <>
//       <div className="row g-0">
//         <div className="col-md-8 form-banner">
//           <img src="./assets/images/banner1.jpg" alt="LoginImage" />
//         </div>
//         <div className="col-md-4 form-container">
//           <Form formTitle={"Login Page"} submitBtn={"Login"} formType = {"login"} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "../../components/shared/form/Form";


const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner1.jpg" alt="loginImage" />
          </div>
          <div className="col-md-4 form-container">
            <Form formTitle={"Login Page"} submitBtn={"Login"} formType={"login"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
