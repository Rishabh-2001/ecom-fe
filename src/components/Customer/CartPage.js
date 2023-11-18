import React, { useEffect, useState } from 'react'
import VendorDetailPage from '../VendorDetailPage'
import { Button, Divider, Spin, Typography } from 'antd';
import CartCard from './CartCard';
import { useDispatch, useSelector } from 'react-redux';
// import { dispatch } from 'd3';
import { addOrder } from '../../redux/customer.order.slice';
import { toast } from 'react-toastify';
import { getCartItems, removeAllCartPrducts } from '../../redux/cart.slice';
import useUserDetails from '../../customHook/useUserDetails';
const { Title } = Typography;
const CartPage = () => {
  const [totalAmount,setTotalAmount]=useState(0);
  const {userId}=useUserDetails();
  const dispatch=useDispatch();
  // modal confirmation

  //order page listing
  // vendor db reflect 
  // order db reflect 

  // crud Vendor modal 
  // crud product modal 

  //all cart data
  const cartData=useSelector(store=> (store?.customerCard?.cart))

  //calculate amount
  useEffect(()=>{
    let amount=0;
    for(let i=0;i<cartData?.length;i++)
    {
     amount+=parseInt(cartData?.[i]?.productData?.productPrice);
    }
    setTotalAmount(amount);
  }, [cartData])

  // function for buying everything in cart
  async function handleBuy()
  {
    console.log("Here");
    let payload={};
    const itemsPurchased=[];
    for(let i=0;i<cartData?.length;i++)
    {
      const {addedBy, productId,vendorId,count}=cartData?.[i]?.data;
      const payload={addedBy,productId,vendorId,count, productData: cartData?.[i]?.productData};
      itemsPurchased.push(payload);
    }
    // Get the current date
const currentDate = new Date();

// Add 3 days to the current date
const threeDaysFromNow = new Date();
threeDaysFromNow.setDate(currentDate.getDate() + 3);


// order payload
    payload={
      itemsData: itemsPurchased,
      totalAmount: totalAmount,
      dateOfOrder:  currentDate.toISOString(),
      expectedDeliveryDate: threeDaysFromNow.toISOString(),
      paymentMode: "Cash on Delivery",
      address:"New Delhi",
      pincode: "110085",
      hno:"23",
      status: "intransit"
    }
   // create order 
   try {
     await dispatch(addOrder(payload)) //ordering
     await removeAllCart(); //removing everythig from cart 
   } catch (error) {
       toast.error(error)
   }
  }

  //remove everyhting from cart
  async function removeAllCart()
  {
      try {
         await dispatch(removeAllCartPrducts())
         dispatch(getCartItems({userId}))
      } catch (error) {
        toast.error(error)
      }
  }
 


  return (
    <div>
          <Title level={3}>Your Cart</Title>
          <div className='flex flex-col '>
            {cartData && cartData?.map((cart,idx)=>(
                  <CartCard key={idx} cart={cart} />
            ))}
            <Divider />
       {cartData?.length>0 &&     <div className='flex justify-between items-center'>
            <h2 className='font-medium text-lg '>TOTAL:</h2>
            <h2 className='font-medium text-2xl'>$ {totalAmount}</h2>
            </div>}
          </div>
         {cartData?.length>0 && <div>
            <h2 className='text-base font-medium'>Payment Mode: Cash On Delivery</h2>
            <Button type='secondary' className='bg-blue-600 px-3 py-1 rounded-md text-white float-right' onClick={handleBuy}>Proceed To Buy</Button>
          </div>}
          {cartData?.length<=0 && <h1>Nothing in Cart </h1>}
    </div>
  )
}

export default CartPage