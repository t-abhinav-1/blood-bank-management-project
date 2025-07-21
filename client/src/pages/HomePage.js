import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/Modals/Modal";
import API from "../services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // 1️⃣ Redirect when `user` arrives
  useEffect(() => {
    if (!user) return; // still loading auth
    switch (user.role) {
      case "admin":
        return navigate("/admin");
      // case "donor":
      //   return navigate("/donorHomePage");
      // case "hospital":
      //   return navigate("/hospitalHomePage");
      // case "organization":
      //   return navigate("/organizationHomePage");
      default:
        break; // stay on this page for bloodBank
    }
  }, [user, navigate]);

  // 2️⃣ Fetch only after `user` is defined
  useEffect(() => {
    if (!user) return;
    const filters = {
      ...(user.role === "donor" ? { donor: user._id } : {}),
      ...(user.role === "hospital" ? { hospital: user._id } : {}),
      // always include organization if you need it:
      ...(user.role === "organisation" ? { organisation: user._id } : {}),
      ...(user.role === "bloodBank" ? { bloodBank: user._id } : {}),
    };
    const getBloodRecords = async () => {
      try {
        const { data } = await API.post("/inventory/get-inventory-hospital", { filters });
        if (data.success) setData(data.inventory);
      } catch (err) {
        console.error(err);
      }
    };
    getBloodRecords();
  }, [user]);

  //get function

  // const getBloodRecords = async () => {
  //   try {
  //     // const { data } = await API.post("/inventory/get-inventory-hospital", {
  //     //   filters: {
  //     //     // inventoryType: "out",
  //     //     // hospital: user?._id,
  //     //     email: user?.email,
  //     //   },
  //     // });
  //     const { data } = await API.post("/inventory/get-inventory-hospital", {
  //       filters: {
  //         hospital: user?._id,
  //       },
  //     });

  //     if (data?.success) {
  //       setData(data?.inventory);
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getDonors();
  // }, []);

  // const getBloodRecords = async () => {
  //   try {
  //     console.log("Home page line 1");
  //     const { data } = await API.get("/inventory/get-inventory");
  //     if (data?.success) {
  //       setData(data?.inventory);
  //       // console.log(data);
  //     }
  //     console.log("Home page line 2");
  //   } catch (error) {
  //     console.log(error);
  //     console.log("error from get-inventory");
  //   }
  // };

  // useEffect(() => {
  //   getBloodRecords();
  // }, []);

  const renderPageHeader = () => {
    switch (user?.role) {
      case "bloodBank":
        return (
          <h4 className="ms-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: "pointer" }}>
            <i className="fa-solid fa-plus text-success py-4" />
            Add Inventory
          </h4>
        );

      case "hospital":
        return <h2 className="ms-4">Your Inventory</h2>;

      case "donor":
      case "organization": // or "organisation" if you’re using the British spelling
        return <h2 className="ms-4">Your Donations</h2>;

      default:
        return <h1>Inventory</h1>;
    }
  };

  return (
    <Layout>
      {/* {user?.role === "admin" && navigate("/admin")}
      {user?.role === "donor" && navigate("/donorHomePage")} */}
      {/* {user?.role === "hospital" && navigate("/hospitalHomePage")}
      {user?.role === "organization" && navigate("/organizationHomePage")} */}
      {/* Create a donor Page instead of that add inventory */}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            {/* {user?.role === "bloodBank" ? (
              <h4 className="ms-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-plus text-success py-4"></i>
                Add Inventory
              </h4>
            ) : (
              <h1>Inventory</h1>
            )} */}
            <h1>
              Welcome <i className="text-success">{user?.name || user?.hospitalName || user?.organizationName || user?.bloodBankName}</i>
            </h1>
            ;{renderPageHeader()}
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">D/R</th>
                  <th scope="col">Quantity</th>
                  {/* <th scope="col">Blood Bank</th> */}
                  {user?.role === "bloodBank" ? <th scope="col">Donor</th> : <th scope="col">Blood Bank</th>}
                  <th scope="col">TIme & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    {record.inventoryType === "in" ? <td>Donated</td> : <td>Recieved</td>}
                    <td>{record.quantity} (ML)</td>
                    {/* <td>{record.bloodBank.bloodBankName}</td> */}
                    {user?.role === "bloodBank" ? <td>{record.donor?.name || record.hospital?.hospitalName || record.organization?.organizationName}</td> : <td>{record.bloodBank?.bloodBankName}</td>}
                    <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
