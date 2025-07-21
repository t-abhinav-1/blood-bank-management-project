import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk("auth/login", async ({ role, email, password }, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/auth/login", { role, email, password });
    //store token
    if (data.success) {
      //alert(data.message);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      window.location.replace("/");
    }
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

//register
export const userRegister = createAsyncThunk("auth/register", async ({ name, role, email, password, phone, bloodGroup, organizationName, address, hospitalName, bloodBankName, website }, { rejectWithValue }) => {
  try {
    console.log(bloodGroup, "thunk");
    const { data } = await API.post("/auth/register", {
      name,
      role,
      email,
      password,
      phone,
      bloodGroup,
      organizationName,
      address,
      hospitalName,
      bloodBankName,
      website,
    });

    if (!data.success) {
      // reject the thunk with the message from the server
      toast.error("User already existed");
      window.location.replace("/register");
      return rejectWithValue(data.message);
    }
    if (data?.success) {
      toast.success("User Registerd Successfully");
      window.location.replace("/login");
      // toast.success("User Registerd Successfully");
      return data;
    }
    alert("The code never gets here");
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

//current user
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async ({ rejectWithValue }) => {
  try {
    const res = await API.get("/auth/current-user");
    if (res.data) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
