
import { Typography } from 'antd';
import React, { useDebugValue, useEffect, useRef, useState } from "react"
import { EllipsisOutlined } from "@ant-design/icons"
import {
  Badge,
  Button,
  Col,
  Dropdown,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd"
// import { CSVLink } from "react-csv"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import CardDashboard from './CardDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/admin.product.slice';
import { toast } from 'react-toastify';
const { Title } = Typography;

const Products = () => {
    const navigate = useNavigate()
    const buttonRef = useRef()
    const [limit, setLimit] = useState(10)
    const [pageNo, setPageNo] = useState(1)
    const [action, setAction] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [type, setType] = useState("")

  
    const [modalDelete, setModalDelete] = useState(false)
    const [modalDeactivate, setModalDeactivate] = useState(false)
  
    const onClick = (key, truckID, recordkey, rstatus) => {
      if (key === "1") {
        // setTID(truckID)
        // setTvalue(recordkey)
        // setModalDelete(true)
      }
      if (key === "2") {
        // setTID(truckID)
        // setTvalue(recordkey)
        // setTuckStatus(rstatus)
        // setModalDeactivate(true)
      }
    }
    const dispatch=useDispatch();
    const { data, error, isLoading } = useSelector(
      (store) => store?.adminProduct?.productsData
    );
    if (error) {
      toast.error(error);
    }
  
    const items = (truck) => [
      {
        key: "1",
        label: "Delete Product",
      },
      {
        key: "2",
        label: truck === "ACTIVE" ? "Inactive Product" : "Active Product",
      },
    ]
  
    const columns = [
      {
        title: "Product ID",
        dataIndex: "productID",
        key: "productID",
        width: 160,
        fixed: "left",
        render: (text, record) => (
          <Link className='text-blue-600' to={`${record?.productID}`}>{text}</Link>
        ),
      },
  
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName",
        width: 160,
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        width: 160,
        render: (text, record) => (
          <Badge status={text === "ACTIVE" ? "success" : "error"} text={text} />
        ),
      },
  
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: 200,
      },
      {
        title: "Product Type",
        dataIndex: "productType",
        key: "productType",
        width: 160,
      },
      {
        title: "Product Brand",
        dataIndex: "productBrand",
        key: "productBrand",
        width: 160,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 160,
      },
      {
        title: "Seller Type",
        dataIndex: "sellerType",
        key: "sellerType",
        width: 160,
      },
      {
        title: "Warranty",
        dataIndex: "warranty",
        key: "warranty",
        width: 160,
      },
     
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 90,
        render: (_, record) => (
          <Space size="middle">
            <Dropdown
              menu={{
                items: items(record.status),
  
                onClick: ({ key }) =>
                  onClick(key, record.productID, record.key, record.status),
              }}
            >
              <EllipsisOutlined rotate={90} />
            </Dropdown>
          </Space>
        ),
      },
    ]
    const locale = {
        emptyText: isLoading ? (
          <Spin tip="Loading" size="large" />
        ) : (
          <Empty
            className="flex flex-col items-center justify-center p-10"
            // image={EmptyImage}
            imageStyle={{ height: 250 }}
            description={
              <div className="flex w-80 flex-col gap-4">
                <Typography.Text className="text-lg text-black">
                  You have not aded any Product. Click to Add Product
                </Typography.Text>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => navigate("add")}
                >
                  + Add Product{" "}
                </Button>
              </div>
            }
          />
        ),
      }
      


      useEffect(() => {
        dispatch(getAllProduct({ pageNo,limit,searchKey,type,action }));
      }, [dispatch,pageNo,limit]);

      const mapdata =
      isLoading ?[]: data?.data &&  data?.data?.map((d, idx) => ({
            key: idx,
            productID: d?.id || idx,
            ProductBrand: d?.data?.ProductBrand || "",
            status: d?.data?.status || "ACTIVE",
            sellerType: d?.data?.sellerType,
            price: d?.data?.productPrice ,
            productName: d?.data?.productName || 0, // <-- This might be a typo, should it be d?.data?.rating?
            productType: d?.data?.productType || 0,
            warranty: d?.data?.warrantyDuration,
            quantity: d?.data?.quantity|| 1,
          }))
  
  return (
    <div>
       <Title level={3}>Products</Title>
       {/* CARDS  */}
       <div className="flex flex-col ">
   
   {/* <DeleteComponent
     open={modalDelete}
     setOpen={setModalDelete}
     TruckID={TID}
     TruckValue={Tvalue}
   />
   <DeactivateComponent
     open={modalDeactivate}
     setOpen={setModalDeactivate}
     TruckID={TID}
     TruckValue={Tvalue}
     setStatus={truckStatus}
   /> */}
   <Button
     type="primary"
     size="large"
     className="ml-auto -mt-10 flex justify-end bg-blue-600"
     onClick={() => navigate("add")}
   >
     + Add Products
   </Button>
   <div className="mt-11 mb-6">
     <Row gutter={[16, 16]}>
       <Col md={{ span: 8 }} xs={{ span: 24 }} className='flex flex-[1]'>
         <CardDashboard
         //   icon={delTruck}
           title={"Total Number of Products"}
           value={data?.count}
         />
       </Col>
     
       <Col md={{ span: 8 }} xs={{ span: 24 }} className='flex flex-[1]'>
         <CardDashboard
         //   icon={availableTruck}
           title={"Available Products"}
           value={data?.count}
         />
       </Col>
     </Row>
   </div>
   <div className=" bg-white py-4 px-4">
     <div className="flex flex-col justify-between gap-2 pb-6 md:flex-row">
       <div className="flex flex-col gap-2">
         <Typography.Text>Search:</Typography.Text>
         <Input.Search
           className="md:w-[440px]"
           placeholder="Search Product number"
        //    onChange={(e) => setSearchKey(e.target.value)}
           allowClear
         />
       </div>
      
       <div className="flex w-full flex-col gap-2">
         <Typography.Text>Type:</Typography.Text>
         <Select
           defaultValue="All"
           onChange={(value) => setType(value)}
           options={[
             { value: "", label: "All" },
             { value: "PERMANENT", label: "Permanent" },
             { value: "TEMPORARY", label: "Temporary" },
           ]}
         />
       </div>
     
     </div>
     <Table
       columns={columns}
       dataSource={mapdata}
       locale={locale}
       scroll={{ x: 1000 }}
       pagination={{
         pageSize: limit,
         total:data.count,
         showSizeChanger: true,
         showTotal: (total) => `Total ${total} items`,
         onChange: (page, newPageSize) => {
           setPageNo(page)
           setLimit(newPageSize)
         },
       }}
     />
   </div>
 </div>


    </div>
  )
}

export default Products

