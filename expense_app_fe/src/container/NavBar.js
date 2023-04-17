import React, { useState } from "react";
import { reset_budget } from "../action/budgetAction";
import { reset_category } from "../action/categoryAction";
import { reset_expense } from "../action/expenseAction";
import { reset_user_account } from "../action/loginAction";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
//import { useSelector } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ToolOutlined,
  HolderOutlined,
  LoginOutlined,
  LogoutOutlined,
  RestOutlined,
} from "@ant-design/icons";
import { Link, Route, withRouter } from "react-router-dom";
import PrivateRoute from "../helper/PrivateRoute";
import Profile from "./Profile";
import Setting from "./Setting";
import Home from "./Home";
import Registration from "./Registration";
import LogIn from "./LogIn";
import Archieve from "./Archieve";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Sider } = Layout;
const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  // const accountInfo = useSelector((state) => {
  //   return state.account;
  // });

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="navbar">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        {localStorage.getItem("token") ? (
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["/home"]}
            items={[
              {
                key: "/profile",
                icon: <UserOutlined />,
                //label: "Profile",
                label: <Link to="/profile">Profile</Link>,
              },
              {
                key: "/setting",
                icon: <ToolOutlined />,
                label: <Link to="/setting">Setting</Link>,
              },
              {
                key: "/home",
                icon: <HolderOutlined />,
                label: <Link to="/">Home</Link>,
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: (
                  <Link
                    to="/login"
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(reset_budget());
                      dispatch(reset_category());
                      dispatch(reset_expense());
                      dispatch(reset_user_account());
                      //alert("You Are Successfully Logged Out!!");
                      Swal.fire({
                        title: "Success!",
                        text: "You are successfully logged out!!",
                        icon: "success",
                        confirmButtonText: "OK",
                      });
                      props.history.push("/login");
                    }}
                  >
                    Log Out
                  </Link>
                ),
              },
              {
                key: "archieve",
                icon: <RestOutlined />,
                label: <Link to="/archieve">Archieve</Link>,
              },
            ]}
          />
        ) : (
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["/register"]}
            items={[
              {
                key: "/register",
                icon: <UserOutlined />,
                //label: "Profile",
                label: <Link to="/register">Register</Link>,
              },
              {
                key: "/login",
                icon: <LoginOutlined />,
                label: <Link to="/login">Log In</Link>,
              },
            ]}
          />
        )}
      </Sider>
      <Layout className="site-layout ">
        <Header
          style={{
            paddingLeft: 0,
            background: "#1d39c4",
            color: "#ffffff",
            fontSize: 70,
            minHeight: 100,
          }}
        >
          <div className="header">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger header1",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div className="header2"> Expense App</div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 450,
            background: colorBgContainer,
          }}
        >
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/setting" component={Setting} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={LogIn} />
          <PrivateRoute path="/archieve" component={Archieve} />

          <PrivateRoute path="/" component={Home} exact={true} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(NavBar);
