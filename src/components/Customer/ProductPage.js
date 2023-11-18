import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Spin, Typography } from "antd";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/customer.product.slice";
import { toast } from "react-toastify";
import { getCartItems } from "../../redux/cart.slice";
import useUserDetails from "../../customHook/useUserDetails";
const { Meta } = Card;
const { Title } = Typography;

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Call a function to filter the product list based on the selected category
    // For example: filterProducts(category);
  };
  const [productsData, setProductsData] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useUserDetails();

  useEffect(() => {
    dispatch(getAllProduct(1, 100, 22, 44, 4));
  }, []);

  const { error, isLoading, data } = useSelector(
    (store) => store?.customerProduct?.productsData
  );

  if (error) {
    toast.error(error);
  }
  function filterDataCategory(selectedCategory) {
    if (selectedCategory === "All") {
      setProductsData(data?.data);
      return;
    }
    console.log("><><><", selectedCategory);
    const filteredData =
      data &&
      data?.data?.filter((d) => d?.data?.productType === selectedCategory);
    setProductsData(filteredData);
  }

  useEffect(() => {
    setProductsData(data?.data);
  }, [data]);

  useEffect(() => {
    filterDataCategory(selectedCategory);
  }, [selectedCategory]);
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  useEffect(() => {
    dispatch(getCartItems());
  });

  return (
    <div className="">
      <Title level={3}>All Products</Title>
      <Title level={5}>Explore Categories</Title>
      <div className="flex gap-2">
        <Button
          type={selectedCategory === "All" ? "primary" : "default"}
          onClick={() => handleCategoryClick("All")}
          className={`${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          All
        </Button>
        <Button
          type={selectedCategory === "electronics" ? "primary" : "default"}
          onClick={() => handleCategoryClick("electronics")}
          className={`${
            selectedCategory === "electronics"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          Electronics
        </Button>
        <Button
          type={selectedCategory === "jewelery" ? "primary" : "default"}
          onClick={() => handleCategoryClick("jewelery")}
          className={`${
            selectedCategory === "jewelery"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          Jewelery
        </Button>
        <Button
          type={selectedCategory === "men's clothing" ? "primary" : "default"}
          onClick={() => handleCategoryClick("men's clothing")}
          className={`${
            selectedCategory === "men's clothing"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          Men's Clothing
        </Button>
        <Button
          type={selectedCategory === "women's clothing" ? "primary" : "default"}
          onClick={() => handleCategoryClick("women's clothing")}
          className={`${
            selectedCategory === "women's clothing"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          Women's clothing
        </Button>
        <Button
          type={selectedCategory === "Tool" ? "primary" : "default"}
          onClick={() => handleCategoryClick("Tool")}
          className={`${
            selectedCategory === "Tool"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
        >
          Tool
        </Button>
      </div>

      <div className="flex gap-2 my-4 flex-wrap justify-between ">
        {productsData && productsData?.length > 0 ? (
          <>
            {" "}
            {productsData &&
              productsData?.map((product, idx) => (
                <div className="py-2 " key={idx}>
                  <ProductCard product={product} userId={userId} />
                </div>
              ))}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between gap-2 my-4">
              <Card
                style={{
                  width: 280,
                  height: 480,
                  marginTop: 16,
                }}
                loading={loading}
              >
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{
                  width: 280,
                  height: 480,
                  marginTop: 16,
                }}
                loading={loading}
              >
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{
                  width: 280,
                  height: 480,
                  marginTop: 16,
                }}
                loading={loading}
              >
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </div>

            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
