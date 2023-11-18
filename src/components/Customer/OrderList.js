import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Avatar, List, Space } from "antd";
import TimeLineComp from "./TimeLine";

const OrderList = ({ order }) => {
  const [count, setCount] = useState(0);
  console.log("OO:", order);
  function getShortWords(words) {
    const wordsArray = words.split(" ");

    // Take the first 30 words
    const shortenedDescription = wordsArray.slice(0, 20).join(" ");

    const displayDescription = `${shortenedDescription}${
      wordsArray.length > 20 ? "..." : ""
    }`;

    return displayDescription;
  }

  return (
    <>
      <div>
        <div className="flex flex-col justify-between mb-8">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <h2 className="font-medium text-lg">
                  Order ID:{" "}
                  <span className="text-sm font-normal text-[#333]">
                    {" "}
                    {order?.id}
                  </span>{" "}
                </h2>
                {order?.ordersData?.order?.status === "delivered" && (
                  <span className="px-3 py-1 text-black bg-green-500 rounded-md font-medium">
                    {order?.ordersData?.order?.status}
                  </span>
                )}
                {order?.ordersData?.order?.status === "cancelled" && (
                  <span className="px-3 py-1 text-black bg-red-500 rounded-md font-medium">
                    {order?.ordersData?.order?.status}
                  </span>
                )}
                {order?.ordersData?.order?.status === "intransit" && (
                  <span className="px-3 py-1 text-black bg-[#e37c3b] rounded-md font-medium">
                    {order?.ordersData?.order?.status}
                  </span>
                )}
              </div>
              <h2>Order Date: {order?.ordersData?.order?.dateOfOrder}</h2>
            </div>
            {order?.ordersData?.order?.itemsData?.map((item, idx) => (
              <div
                className="flex py-2 bg-white px-4 py-2 rounded shadow-md"
                key={idx}
              >
                <img
                  src={item?.productData?.image}
                  className="block object-cover max-h-[100px] max-w-[100px] p-2 mr-2"
                />
                <div>
                  <p className="font-medium text-xl ">
                    {getShortWords(item?.productData?.productName)}{" "}
                  </p>
                  <span className="text-[#333]">
                    {getShortWords(item?.productData?.productDescription)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="font-medium text-base">Total Amount:</span>
              <span className="font-medium text-xl">
                {" "}
                $ {order?.ordersData?.order?.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderList;
