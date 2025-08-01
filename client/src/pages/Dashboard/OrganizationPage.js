import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";

const OrganizationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find org records
  const getOrg = async () => {
    try {
      const { data } = await API.get("/inventory/get-organization");
      //   console.log(data);
      if (data?.success) {
        setData(data?.organizations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

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
          {data
            // 1️⃣ remove the logged‑in user
            .filter((record) => record?.email !== user?.email)
            // 2️⃣ render the rest
            .map((record) => (
              <tr key={record._id}>
                <td>
                  {" "}
                  <a href="{record.website}">{record.organizationName}</a>{" "}
                </td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
              </tr>
            ))}
        </tbody>

        {/* <tbody>
          {data?.map((record) => ({record.email !==user.email?} &&
            <tr key={record._id}>
              <td>
                {" "}
                <a href="{record.website}">{record.organizationName}</a>{" "}
              </td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
               <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td> 
            </tr>
          ))}
        </tbody> */}
      </table>
    </Layout>
  );
};

export default OrganizationPage;
