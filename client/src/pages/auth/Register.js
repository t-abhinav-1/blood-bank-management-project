// import React from "react";
// import Form from "../../components/shared/form/Form";

// const Register = () => {
//   return (
//     <>
//       <div className="row g-0">
//         <div className="col-md-8 form-banner">
//           <img src="./assets/images/banner2.jpg" alt="RegisterImage" />
//         </div>
//         <div className="col-md-4 form-container">
//           <Form formTitle={"Register Page"} submitBtn={"Register"} formType={"register"} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
import React, { useEffect } from "react";
import Form from "../../components/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

const Register = () => {
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
          <div className="col-md-8 form-banner ">
            <img src="./assets/images/banner2.jpg" alt="registerImage" />
          </div>
          <div className="col-md-4 form-container">
            <Form formTitle={"Register"} submitBtn={"Register"} formType={"register"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
