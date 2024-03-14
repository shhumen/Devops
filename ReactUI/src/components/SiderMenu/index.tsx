import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Logo from "../../images/logo-white.svg";
import { Avatar, Layout, Menu } from "antd";
import "./index.less";
import routeConfig from "../Router/route.config";
import { useLocation, useNavigate } from "react-router-dom";


const { Sider } = Layout;

export interface ISiderMenuProps {
  path?: any;
  collapsed: boolean;
  onCollapse: any;
  // onCollapse: (collapsed: boolean) => void;
}

const Index = (props: ISiderMenuProps) => {

  const navigate=useNavigate();
  const location = useLocation()
  const routerItems = routeConfig
  .filter((item:any) => item.showInMenu)
  .map((a:any,b:any) =>{
    return{
      key:a.key,
      icon:a.icon,
      label:a.title,
      onClick: () => navigate(a.path)
    }
  })

  const defaultSelectedKey = routeConfig
  .filter((item:any) => item.showInMenu && item.path === location.pathname)
  .map((a:any)=>a.key);

  const { collapsed, onCollapse } = props;
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ height: "100vh" }}
      >
        <Avatar shape="square" src={Logo} />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultSelectedKey}
          items={routerItems}
        />
      </Sider>
    </div>
  );
};

export default Index;



// [
//   {
//     key: "1",
//     icon: <UserOutlined />,
//     label: "nav 1",
//   },
//   {
//     key: "2",
//     icon: <VideoCameraOutlined />,
//     label: "nav 2",
//   },
//   {
//     key: "3",
//     icon: <UploadOutlined />,
//     label: "nav 3",
//   },
// ]
