import { Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
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
} from "antd";
// import { CSVLink } from "react-csv"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CardDashboard from "./CardDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenders } from "../redux/admin.vendor.slice";
import { toast } from "react-toastify";
const { Title } = Typography;

const Vendors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [action, setAction] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("");

  const { data, error, isLoading } = useSelector(
    (store) => store?.adminVendor?.vendersData
  );
  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    dispatch(getAllVenders({ pageNo,limit,searchKey,type,action }));
  }, [dispatch,pageNo,limit]);

  const onClick = (key, truckID, recordkey, rstatus) => {
    if (key === "1") {
      // setTID(truckID);
      // setTvalue(recordkey);
      // setModalDelete(true);
    }
    if (key === "2") {
      // setTID(truckID);
      // setTvalue(recordkey);
      // setTuckStatus(rstatus);
      // setModalDeactivate(true);
    }
  };

  const items = (vendor) => [
    {
      key: "1",
      label: "Delete Vendor",
    },
    {
      key: "2",
      label: vendor === "ACTIVE" ? "Inactive Vendor" : "Active Vendor",
    },
  ];

  const columns = [
    {
      title: "Vendor ID",
      dataIndex: "vendorID",
      key: "vendorID",
      width: 160,
      fixed: "left",
      render: (text, record) => (
        <Link className="text-blue-600" to={`${record?.vendorID}`}>{text}</Link>
      ),
    },

    {
      title: "Vender Name",
      dataIndex: "vendorName",
      key: "vendorName",
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
      title: "Joined On",
      dataIndex: "joinedOn",
      key: "joinedOn",
      width: 200,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 200,
    },
    {
      title: "Total Products",
      dataIndex: "totalProducts",
      key: "totalProducts",
      width: 160,
    },
    {
      title: "Products Sold",
      dataIndex: "soldProducts",
      key: "soldProducts",
      width: 160,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 160,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      width: 160,
    },
    {
      title: "OwnerShip",
      dataIndex: "owner",
      key: "owner",
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
                onClick(key, record.vendorID, record.key, record.status),
            }}
          >
            <EllipsisOutlined rotate={90} />
          </Dropdown>
        </Space>
      ),
    },
  ];
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
              No Vendors Yet. Click to Add Vender.
            </Typography.Text>
            <Button
              size="large"
              type="primary"
              className="bg-blue-600 text-white"
              onClick={() => navigate("add")}
            >
              + Add Vender{" "}
            </Button>
          </div>
        }
      />
    ),
  };
  console.log("DFDFD", data);

  // const mapdata = isLoading
  // ? []
  // : data?.data?.data?.rows?.map((row, index) => ({
  //     key: row?.id,
  //     driverID: row?.unique_id,
  //     driverName: row?.name,
  //     mobile: row?.mobile_number,
  //     licence: row?.license_number,
  //     status: row?.status,
  //     type: row?.driverType?.type,
  //     assignedTruck:
  //       row?.assignedTruck === null
  //         ? "Not Yet"
  //         : row?.assignedTruck?.truck_number,
  //     manager: row?.driverData?.driverManager?.name,
  //   }))


  const mapdata =
  isLoading ?[]: data?.data &&  data?.data.map((d, idx) => ({
        key: idx,
        vendorID: d?.id || idx,
        vendorName: d?.data?.vendorName || "",
        status: d?.data?.status || "ACTIVE",
        joinedOn: d?.data?.dateOfJoining,
        revenue: d?.data?.revenue || 0,
        rating: d?.data?.vendorName || 0, // <-- This might be a typo, should it be d?.data?.rating?
        soldProducts: d?.data?.soldProducts || 0,
        totalProducts: d?.data?.totalProducts || 0,
        owner: d?.data?.ownership,
        country: d?.data?.country,
      }))
    


  return (
    <div>
      <Title level={3}>Vendors</Title>
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
          className="ml-auto -mt-10 flex justify-end bg-blue-600 text-white"
          onClick={() => navigate("add")}
        >
          + Add Vender
        </Button>
        <div className="mt-11 mb-6">
          <Row gutter={[16, 16]}>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                //    icon={delTruck}
                title={"All Vendors"}
                value={data?.count}
              />
            </Col>
            <Col md={{ span: 8 }} xs={{ span: 24 }} className="flex flex-[1]">
              <CardDashboard
                //   icon={truckTrip}
                title={"Active Vendors"}
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
                placeholder="Search Vendor"
                //    onChange={(e) => setSearchKey(e.target.value)}
                allowClear
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Typography.Text>Vender Status:</Typography.Text>
              <Select
                defaultValue="All"
                onChange={(value) => setAction(value)}
                options={[
                  { value: "", label: "All" },
                  { value: "ACTIVE", label: "Active" },
                  { value: "INACTIVE", label: "Inactive" },
                ]}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Typography.Text>Vender OwnerShip:</Typography.Text>
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
              total: data?.count,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
              onChange: (page, newPageSize) => {
                setPageNo(page);
                setLimit(newPageSize);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Vendors;
