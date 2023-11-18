import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Card, Space } from "antd";
import { Typography } from "antd";
import Star from "./Start";
import { useDispatch, useSelector } from "react-redux";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import {
  addProductToCart,
  addToCart,
  getCartItems,
  removeFromCart,
  removeProductToCart,
} from "../../redux/cart.slice";
import ButtonGroup from "antd/es/button/button-group";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserDetails from "../../customHook/useUserDetails";
const { Meta } = Card;

const { Title, Text } = Typography;

const truncateDescription = (description, maxWords) => {
  const words = description.split(" ");
  if (words.length <= maxWords) {
    return description;
  }
  const truncatedDescription = words.slice(0, maxWords).join(" ");
  return `${truncatedDescription} ...`;
};

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { id, data } = product;
  const cartData = useSelector((store) => store?.customerCard?.cart);

  useEffect(() => {
    const matchArr = cartData.filter((cart) => cart?.data?.productId === id);
    // console.log("MR:", matchArr);
    if (matchArr?.length > 0) {
      setAddedToCart(true);
    } else {
      setAddedToCart(false);
    }
  }, [cartData]);

  async function handleRemoveCard() {
    try {
      await dispatch(removeProductToCart({ productId: id }));
      toast.success("Removed from Cart");
      dispatch(getCartItems(userId));
    } catch (error) {
      toast.error("Error occured:", error);
    }
  }

  async function handleCart(pid) {
    console.log("PID:", id, pid);
    const payload = {
      productId: id,
      vendorId: data.vendorName,
      quantity: count,
    };

    try {
      await dispatch(addProductToCart(payload));
      toast.success("Item Added to Cart");
      dispatch(getCartItems(userId));
      setCount(1);
    } catch (error) {
      toast.error(error);
    }
  }
  //   console.log(">>>S", product);

  const truncatedDescription = truncateDescription(
    data?.productDescription,
    15
  );

  const increase = () => {
    setCount(count + 1);
  };
  const decline = () => {
    if (count === 0) {
      return 0;
    }
    let newCount = count - 1;
    if (newCount <= 0) {
      newCount = 0;
      handleRemoveCard();

      //   setToCart(false);
    }
    setCount(newCount);
  };

  return (
    <Card
      hoverable
      style={{
        width: 260,
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      cover={
        <img
          alt="example"
          src={data?.image}
          className="object-contain block max-w-[250px] max-h-[250px] min-w-[250px] min-h-[250px]  "
        />
      }
    >
      <Link to={`product${product?.id}`}>
        <Meta
          title={data?.productName}
          description={<Text>{truncatedDescription}</Text>}
        />
      </Link>
      <div className="py-2 flex justify-between items-center">
        <Title level={5}>$ {data?.productPrice}</Title>
        <Star val={data?.rating?.rate} count={data?.rating?.count} />
      </div>
      {!addedToCart && (
        <Button className="w-full" onClick={() => handleCart(data)}>
          Add to Cart{" "}
        </Button>
      )}
      {addedToCart && (
        <div>
          <Space size="large">
            <div>
              <Button
                type="secondary"
                className="bg-red-500 text-white"
                onClick={handleRemoveCard}
              >
                Remove From Cart
              </Button>
            </div>
          </Space>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
