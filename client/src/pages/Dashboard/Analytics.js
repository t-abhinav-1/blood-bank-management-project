import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";
import Spinner from "../../components/shared/Spinner";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colors = ["#884A39", "#C38154", "#FFC26F", "#4F709C", "#4942E4", "#0079FF", "#FF0060", "#22A699"];
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifrecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        await Promise.all([getBloodGroupData(), getBloodRecords()]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="title">
            <h2>Warangal Blood Donation Analytics </h2>
          </div>

          <div className=" d-flex flex-row flex-wrap justify-content-center align-items-center">
            {data?.map((record, i) => (
              <div className="analytics card m-2 p-1" key={i} style={{ width: "18rem", backgroundColor: `${colors[i]}` }}>
                <div className="card-body">
                  <h3 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h3>
                  <p className="card-text">
                    Total In : <b>{record.totalIn}</b> (ML)
                  </p>
                  <p className="card-text">
                    Total Out : <b>{record.totalOut}</b> (ML)
                  </p>
                </div>
                <div className="card-footer text-light bg-dark text-center">
                  Total Available : <b>{record.availabeBlood}</b> (ML)
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="container my-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">D/R</th>
              <th scope="col">Quantity</th>
              {/* <th scope="col">Donor Email</th> */}
              <th scope="col">TIme & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                {record.inventoryType === "in" ? <td>Donated</td> : <td>Recieved</td>}
                <td>{record.quantity} (ML)</td>
                {/* <td>{record.email}</td> */}
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
//
