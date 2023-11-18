import React, { useEffect } from 'react'
import CardDashboard from './CardDashboard'
import { useDispatch, useSelector } from 'react-redux'
import useSelection from 'antd/es/table/hooks/useSelection';
import { getVendersList } from '../redux/admin.vendor.slice';
import { getAllProduct } from '../redux/admin.product.slice';
import { getAllOrders } from '../redux/admin.order.slice';

const Dashboard = () => {
  const dispatch=useDispatch();
  const {isLoading,error, data}=useSelector(store=> (store?.adminProduct?.productsData))
  const vendorData=useSelector(st=> (st?.adminVendor?.vendorsList))
  const orderData=useSelector(st=> (st?.adminOrder?.orderData))

  console.log(">>>??", data);

  useEffect(()=>{
    dispatch(getVendersList());
    dispatch(getAllProduct({pageNo:1, limit: 100}))
    // dispatch(get)  ALL ORDERS
    dispatch(getAllOrders())
 

  }, [])
  return (
    <div>
    <div className='flex justify-between items-center gap-6'>
      <CardDashboard value={data?.data?.length} title={"All Products"}   />
      <CardDashboard value={vendorData?.data?.length} title={"All Vendors"}  />
      <CardDashboard value={vendorData?.data?.length} title={"All Orders"}  />
    </div>
  
    </div>
  )
}

export default Dashboard