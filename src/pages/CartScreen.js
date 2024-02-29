import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteTwoTone,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from "@ant-design/icons";
import { Table } from "antd";

const CartScreen = () => {
  const dispatch = useDispatch();
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
  return (
    <DefaultLayout>
      <h1>Cart Items</h1>
      <Table columns={columns} dataSource={cartItems} bordered />
    </DefaultLayout>
  );
};

export default CartScreen;
