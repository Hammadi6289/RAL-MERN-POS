import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getAllBills = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Contact No.", dataIndex: "contactNumber", key: "contactNumber" },
    { title: "Sale Amount", dataIndex: "totalAmount", key: "totalAmount" },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
  ];

  return (
    <DefaultLayout>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Customer Information
      </h1>
      {loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        <Table
          columns={columns}
          dataSource={billsData}
          bordered
          pagination={{ pageSize: 10 }}
        />
      )}
    </DefaultLayout>
  );
};

export default CustomerPage;
