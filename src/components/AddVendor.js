import React, { useMemo } from 'react';
import { Button, Form, Input, Select, Space, Upload, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useDispatch } from 'react-redux';
import { addVendor } from '../redux/admin.vendor.slice';
import useUserDetails from '../customHook/useUserDetails';
import { toast } from 'react-toastify';

const { Option } = Select;

const AddVendor = () => {
    const dispatch=useDispatch()
    // const userDetails = useUserDetails();
    const [form] = Form.useForm(); // Create a form instance

    


  const onFinish =  async (values) => {
    // Handle form submission here
    console.log('Received values of form:', values);
    
    try {
      await dispatch(addVendor(values));

      // Reset the form fields after successful submission
      form.resetFields();

      toast.success("Vendor Added Successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Some problem while adding");
    }
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
         <Title level={3}> Add Vendors</Title>
    <Form
       form={form} // Pass the form instance to the Form component
       name="vendor_form"
      onFinish={onFinish}
      initialValues={{
        ownership: 'partnership', // Default ownership value
      }}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
    >
      <Form.Item
        name="vendorName"
        label="Vendor Name"
        rules={[
          {
            required: true,
            message: 'Please enter the vendor name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please enter the address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="country"
        label="Country"
        rules={[
          {
            required: true,
            message: 'Please select the country!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="state"
        label="State"
        rules={[
          {
            required: true,
            message: 'Please enter the state!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'Please enter a valid email address!',
          },
          {
            required: true,
            message: 'Please enter the email address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
            message: 'Please enter the phone number!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ownership"
        label="Ownership"
        rules={[
          {
            required: true,
            message: 'Please select the ownership type!',
          },
        ]}
      >
        <Select>
          <Option value="partnership">Partnership</Option>
          <Option value="self_owner">Self Owner</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="logo"
        label="Logo/Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Upload your logo/image"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="dateOfJoining"
        label="Date of Joining"
        rules={[
          {
            required: true,
            message: 'Please select the date of joining!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit" className='bg-blue-600'>
            Submit
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
    </div>
  );
};

export default AddVendor;
