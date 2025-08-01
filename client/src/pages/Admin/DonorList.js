import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const DonorList = () => {
  const [data, setData] = useState([]);
  //find Donor records
  const getDonors = async () => {
    try {
      console.log("enterterd in donor list");
      const { data } = await API.get("/admin/donor-list");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donorData);
      }
    } catch (error) {
      console.log("error in donor-list");
      console.log(error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  //DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt("Are You SUre Want To Delete This Donor", "Sure");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donor/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              {/* <td>{record.name }</td> */}
              <td>
                {" "}
                <a href="{record.website}">{record.name}</a>{" "}
              </td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handelDelete(record._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DonorList;
