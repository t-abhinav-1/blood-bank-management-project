import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { toast } from "react-toastify";

const BloodBankList = () => {
  const [data, setData] = useState([]);
  //find donor records
  const getBloodBanks = async () => {
    try {
      const { data } = await API.get("/inventory/get-bloodBanks");
      console.log(data);
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

  //DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt("Are You Sure Want To Delete", "Sure");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donor/${id}`);
      toast.success(data?.message);
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
              <td>
                {" "}
                <a href="{record.website}">{record.bloodBankName}</a>{" "}
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

export default BloodBankList;
