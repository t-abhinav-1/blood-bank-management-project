import { toast } from "react-toastify";
import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

const handleLogin = (e, email, password, role) => {
  e.preventDefault();

  try {
    if (!email || !role || !password) toast.error("Please fill all the details");
    else {
      store.dispatch(userLogin({ email, password, role }));
      // toast.success("Login Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleRegister = (e, email, password, role, name, organizationName, bloodGroup, hospitalName, bloodBankName, website, address, phone) => {
  console.log(bloodGroup, "handleRegister");
  console.log(role, "handleRegister");
  e.preventDefault();
  try {
    if (!email || !role || !password || !address || !phone) toast.error("Please fill all the details"); //is this correct if condition??
    else {
      console.log(bloodGroup, "handleRegister");
      console.log(role, "handleRegister");
      store.dispatch(userRegister({ email, password, role, name, organizationName, bloodGroup, hospitalName, bloodBankName, website, address, phone }));
      toast.success("Register Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export { handleLogin, handleRegister };
