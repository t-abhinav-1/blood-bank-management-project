import React, { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";

const BloodBanksList = () => {
  const [data, setData] = useState([]);
  //find donor records
  const getBloodBanks = async () => {
    try {
      const { data } = await API.get("/inventory/get-bloodBanks");
      //   console.log(data);
      if (data?.success) {
        setData(data?.bloodBanks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodBanks();
  }, []);
  return (
    <Layout>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            {/* <th scope="col">Date</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>
                {" "}
                <a href="{record.website}">{record.bloodBankName}</a>{" "}
              </td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>

              {/* <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default BloodBanksList;
