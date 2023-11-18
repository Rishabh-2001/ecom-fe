import React from "react";
import ProductCard from "./ProductCard";
import { Button, Descriptions } from "antd";
import { Typography } from "antd";
import Star from "./Start";
const { Title, Text } = Typography;

const ProductDetails = () => {
  return (
    <div>
      <Title level={3}>$ {"Watch"}</Title>
      <div>
        <img />

        <div>
          <div className="flex justify-between">
            <Title level={4}>$ {"title "}</Title>
            <Star />
          </div>
          <Title level={3}>$ {" 5343 "}</Title>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            voluptates porro iusto pariatur? Pariatur corporis laudantium illum,
            officia numquam vel quos temporibus expedita ad quis reprehenderit
            qui cumque facilis consectetur aut fugiat?
          </p>
          <Title level={5}>$ {" Other Details "}</Title>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
            assumenda fuga voluptatibus!
          </p>
          <div>
            <Button>Buy Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
