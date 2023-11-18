import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, Upload, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { addVendor, getVendersList } from "../redux/admin.vendor.slice";
import useUserDetails from "../customHook/useUserDetails";
import { toast } from "react-toastify";
import { addProduct } from "../redux/admin.product.slice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase/firebase.config.mjs";

const { Option } = Select;

const AddProducts = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm(); // Create a form instance

  const onFinish = async (values) => {
    // Handle form submission here
    console.log("Received values of form:", values);
    // values = { ...values, adminToken: userDetails?.userId, userType: "ADMIN" };

    try {
      await dispatch(addProduct(values));

      // Reset the form fields after successful submission
      form.resetFields();

      toast.success("Product Added Successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Some problem while adding");
    }
  };

  const { data, error, isLoading } = useSelector(
    (store) => store?.adminVendor?.vendorsList
  );
  if (error) {
    toast.error(error);
  }
  const [sellerType, setSellerType] = useState('');

  const handleSellerTypeChange = (value) => {
      setSellerType(value);
    };
    
    // console.log("DFD)))#$", data);


  useEffect(() => {
    dispatch(getVendersList());
  }, []);


  


  return (
    <div>
      <Title level={3}> Add Products</Title>
      <Form
        form={form} // Pass the form instance to the Form component
        name="product_form"
        onFinish={onFinish}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please enter the product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="productType"
          label="Product Type"
          rules={[
            {
              required: true,
              message: "Please select the product type!",
            },
          ]}
        >
          <Select>
            <Option value="Gadget">Gadget</Option>
            <Option value="Tool">Tool</Option>
            <Option value="HouseHold">Household</Option>
            <Option value="Appliance">Appliance</Option>
            <Option value="Furniture">Furniture</Option>
            <Option value="Decoration">Decoration</Option>
            {/* Add more product types as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="productDescription"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Please enter the product description!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="productDetails"
          label="Product Details"
          rules={[
            {
              required: true,
              message: "Please enter the product details!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

       

        {/* <Form.Item
  name="productImage"
  label="Product Image"
  valuePropName="fileList"
  extra="Upload your product image"
>
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
  </Upload>
</Form.Item> */}

        <Form.Item
          name="sellerType"
          label="Seller Type"
          rules={[
            {
              required: true,
              message: "Please select the seller type!",
            },
          ]}
        >
          <Select onChange={handleSellerTypeChange}>
            <Option value="Vendor">Vendor</Option>
            <Option value="Self">Self</Option>
          </Select>
        </Form.Item>

      {sellerType==="Vendor" ?   <Form.Item
          name="vendorName"
          label="Select Vendor"
          rules={[
            {
              required: true,
              message: "Please select the Vendor !",
            },
          ]}
        >
          <Select showSearch optionFilterProp="children">
            {data?.map((d, idx) => (
              <Option value={d.id} key={idx}>
                {d.vendorName}
              </Option>
            ))}
          </Select>
        </Form.Item> : "" }

        <Form.Item
          name="productBrand"
          label="Product Brand"
          rules={[
            {
              required: true,
              message: "Please enter the product brand!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="productPrice"
          label="Product Price"
          rules={[
            {
              required: true,
              message: "Please enter the product price!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProducts;
