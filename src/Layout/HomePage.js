import { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import {
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons/lib/icons";
import { Avatar, Badge, Layout, Typography } from "antd";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/cart.slice";
import logo from "../assets/ecomlogo.jpg";

const { Sider, Header, Content } = Layout;

const NavMenu = [
  {
    key: "Dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
    to: "",
  },
  {
    key: "Vendors",
    icon: <UserOutlined />,
    label: "Vendors",
    to: "vendors",
  },
  {
    key: "Products",
    icon: <AppstoreOutlined />,
    label: "Products",
    to: "products",
  },

  {
    key: "Reports",
    icon: <ReadOutlined />,
    label: "Reports",
    to: "reports",
  },
  // {
  //   key: "Language",
  //   icon: <TranslationOutlined />,
  //   label: "Language",
  //   to: "language",
  // },
];

const CustomerNavMenu = [
  {
    key: "All Products",
    icon: <AppstoreOutlined />,
    label: "Products",
    to: "",
  },
  {
    key: "My Orders",
    icon: <UserOutlined />,
    label: "Orders",
    to: "orders",
  },
  {
    key: "Help & Support",
    icon: <AppstoreOutlined />,
    label: "Help & Support",
    to: "helpSupport",
  },

  // {
  //   key: "Reports",
  //   icon: <ReadOutlined />,
  //   label: "Reports",
  //   to: "reports",
  // },
  // {
  //   key: "Language",
  //   icon: <TranslationOutlined />,
  //   label: "Language",
  //   to: "language",
  // },
];

function HomePage() {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const userDetails = localStorage.getItem("currentUser");
    if (userDetails) {
      setUserType(JSON.parse(userDetails)?.userType);
    }
  });

  useEffect(() => {
    if (userType === "CUSTOMER") {
      dispatch(getCartItems(userType?.userId));
    }
  }, []);

  const cartData = useSelector((store) => store?.customerCard?.cart);

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "grey" }}
      className="flex"
    >
      <Sider
        breakpoint="lg"
        collapsedWidth={showSidebar ? "256px" : "0"}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          setShowIcon(collapsed);
        }}
        className="z-20 flex flex-col overflow-hidden  bg-white [&>div]:flex [&>div]:flex-col"
      >
        <div className="flex h-32 shrink-0 items-center justify-center bg-brand  flex-col gap-4 py-4 text-white bg-black">
          <img src={logo} className=" h-20 w-20 " alt="my.eco-logo" />
          <h2 className="text-xl font-bold">My .Ecom</h2>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          {userType === "CUSTOMER" ? (
            <div>
              {CustomerNavMenu.map((links) => (
                <NavLink
                  key={links.key}
                  to={`${links.to}`}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex h-12 w-full items-center gap-2 border-r-4 border-brand bg-red-50 p-2 pl-5 font-semibold  text-red-600"
                      : "flex h-12 w-full items-center gap-2 p-2 pl-5 font-semibold text-black transition-all ease-in-out hover:bg-red-50 bg-white"
                  }
                >
                  {links.icon}
                  {links.label}
                </NavLink>
              ))}
            </div>
          ) : (
            <div>
              {NavMenu.map((links) => (
                <NavLink
                  key={links.key}
                  to={`${links.to}`}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex h-12 w-full items-center gap-2 border-r-4 border-brand bg-red-50 p-2 pl-5 font-semibold  text-red-600"
                      : "flex h-12 w-full items-center gap-2 p-2 pl-5 font-semibold text-black transition-all ease-in-out hover:bg-red-50 bg-white"
                  }
                >
                  {links.icon}
                  {links.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white">
          <button
            onClick={handleLogout}
            className="flex h-12 w-full items-center gap-2 p-2 pl-5 font-semibold text-black transition-all ease-in-out hover:bg-red-50"
          >
            <LogoutOutlined />
            Logout
          </button>
        </div>
      </Sider>
      <Layout className="z-10">
        <Header
          className={`flex items-center ${
            showIcon ? "justify-between" : "justify-end"
          }  bg-white`}
        >
          {showIcon ? (
            <MenuOutlined onClick={() => setShowSidebar(!showSidebar)} />
          ) : (
            ""
          )}
          <div className="flex items-center gap-6">
            {userType === "CUSTOMER" && (
              <Link to="checkout">
                <Badge count={cartData?.length} className="text-xs">
                  <ShoppingCartOutlined
                    className="cursor-pointer text-xl"
                    // onClick={() => setShowNotification(!showNotification)}
                  />
                </Badge>
              </Link>
            )}

            <Badge>
              <BellOutlined
                className="cursor-pointer text-xl"
                onClick={() => setShowNotification(!showNotification)}
              />
            </Badge>
            {/* {showNotification && (
              <NotificationModal setShowNotification={setShowNotification} />
            )} */}
            <Avatar
              // src={user?.data?.data?.data?.user_name}
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("customerProfile")}
            />
            <Typography.Text className="font-semibold">
              {/* {user?.data?.data?.data?.user_name} */}
            </Typography.Text>
          </div>
        </Header>
        <Content className="h-screen overflow-y-auto px-10 py-12">
          <Typography.Text className="font-semibold">
            {/* <Breadcrumb /> */}
          </Typography.Text>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
