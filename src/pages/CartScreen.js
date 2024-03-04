import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteTwoTone,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopuu, setBillPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  const columns = [
    { title: "Color", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="50" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price}`, // Add a dollar sign ($) before the price
    },

    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <MinusCircleTwoTone
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecreament(record)}
          />
          <b style={{ fontSize: "20px" }}>{record.quantity}</b>
          <PlusCircleTwoTone
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncreament(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteTwoTone
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  const handleSubmit = async (value) => {
    try {
      const obj = {
        ...value,
        cartItems,
        subTotal,
        tax: Number((subTotal / 100) * 5).toFixed(2),
        totalAmount: Number(subTotal + subTotal * 0.05).toFixed(2),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      await axios.post("/api/bills/add-bills", obj);
      message.success("Bill Generated");
      navigate("/bills");
      //console.log(obj);
    } catch (error) {
      message.error("Error while generating bill, Please contact admin");
      console.log(error);
    }
  };
  return (
    <DefaultLayout>
      <h1>Cart Items</h1>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex flex-column align-items-end">
        <hr style={{ width: "100%", margin: "10px 0" }} />{" "}
        {/* Horizontal rule */}
        <h3 style={{ marginBottom: "10px" }}>
          {" "}
          {/* Heading style */}
          SUB TOTAL : $ <b>{subTotal.toFixed(2)}</b> /- {/* Subtotal */}
        </h3>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          {" "}
          {/* Button */}
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopuu}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Contact Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMethod" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          {/* Bill details */}
          <div
            className="bill-details"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <h5>
              Sub Total: <b>${subTotal.toFixed(2)}</b>
            </h5>
            <h5>
              Tax: <b>${((subTotal / 100) * 5).toFixed(2)}</b>
            </h5>
            <h4>
              Grand Total: <b>${(subTotal + subTotal * 0.05).toFixed(2)}</b>
            </h4>
          </div>

          {/* Generate Bill button */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Button type="primary" htmlType="submit" block>
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartScreen;
