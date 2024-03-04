import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Row, Col, Input } from "antd";
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";

const { Search } = Input;
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    {
      name: "All", // Default category
      imageUrl: "https://imgur.com/mNAss2q.jpg",
    },
    {
      name: "White",
      imageUrl: "https://i.imgur.com/KFTQ93t.jpg",
    },
    {
      name: "Black",
      imageUrl: "https://i.imgur.com/5F1RCSl.jpg",
    },
    {
      name: "Red",
      imageUrl: "https://i.imgur.com/73CJIuV.jpg",
    },
    {
      name: "Yellow",
      imageUrl: "https://imgur.com/fPU5nBI.jpg",
    },
    {
      name: "Green",
      imageUrl: "https://imgur.com/Hk44sJ3.jpg",
    },
    {
      name: "Silver",
      imageUrl: "https://imgur.com/GjXEGvn.jpg",
    },
    {
      name: "Gray",
      imageUrl: "https://i.imgur.com/wzn28F0.jpg",
    },
    {
      name: "Blue",
      imageUrl: "https://i.imgur.com/g1KpQCx.jpg",
    },
  ];
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <DefaultLayout>
      {/* Search bar */}
      <Search
        placeholder="Search a color..."
        allowClear
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory.toUpperCase() === category.name.toUpperCase() &&
              "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name.toUpperCase())}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter(
            // Filter items based on selected category
            (item) =>
              selectedCategory.toUpperCase() === "ALL" || // Show all items if "All" category is selected
              (item.category.toUpperCase() === selectedCategory.toUpperCase() &&
                (searchQuery.trim() === "" ||
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()))) // Filter based on search query
          )

          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
