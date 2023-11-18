import React from 'react';
import { Tabs } from 'antd';
import VendorDetailPage from './VendorDetailPage';
import VendorProduct from './VendorProduct';
import VendorOrders from './VendorOrders';
import { Link } from 'react-router-dom';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: ' Vendor Details',
    children: <VendorDetailPage />,
  },
  {
    key: '2',
    label: 'Products',
    children: <VendorProduct />,
  },
  {
    key: '3',
    label: 'Orders',
    children: <VendorOrders /> ,
  },
];
const VendorDetails = () => {

return (
    <>
    <Link to="../">Go back</Link>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
)
}
export default VendorDetails;