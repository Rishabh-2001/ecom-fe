import React, { useEffect } from "react";
import { LikeOutlined, GiftOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Spin, Statistic } from "antd";
import { Typography } from "antd";
import OrderList from "./OrderList";
import CardDashboard from "../CardDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderItems } from "../../redux/customer.order.slice";

const { Title } = Typography;

// import Title from 'antd/es/typography/Title';
const OrderPage = () => {
  const dispatch = useDispatch();
  const { isLoading, orders } = useSelector((store) => store?.customerOrder);

  useEffect(() => {
    dispatch(getOrderItems());
  }, []);

  function getCount(key) {
    let cnt = 0;
    console.log(":::", orders);
    for (let i = 0; i < orders?.length; i++) {
      if (orders?.[i]?.ordersData?.status === key) {
        cnt++;
      }
    }
    return cnt;
  }

  return (
    <>
      <Title level={3}>My Orders</Title>

      { !isLoading ? (
        <div className="mt-11 mb-6">
          <Row gutter={[16, 16]}>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Orders Placed"}
                value={orders?.length || 0}
              />
            </Col>

            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Order Delivered"}
                value={getCount("delivered") || 0}
              />
            </Col>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                title={"Orders Cancelled"}
                value={getCount("cancelled") || 0}
              />
            </Col>

            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                //   icon={availableTruck}
                title={"In-Transit Orders"}
                value={getCount("intransit") || 0}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <> <Spin size="large" /></>
      )}

      <Title level={4}>Previous Orders</Title>
      <Divider />
{ !isLoading ? <div>


      {orders &&
        orders?.map((order, idx) => <OrderList key={idx} order={order} />)}
      {orders?.length <= 0 && <h1> No Orders Placed</h1>}

     </div> : <> <Spin size="large" /></>}
    </>
  );
};
export default OrderPage;
