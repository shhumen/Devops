import Login from "../../features/auth";
import AppLayout from "../Layout/AppLayout";
import {
    List as CategoryList,
    Create as CreateCategory,
} from "../../features/categories/index";
import {
    List as UserList,
    Create as CreateUser,
} from "../../features/users/index";
import {
    List as RoleList,
    Create as CreateRole,
} from "../../features/roles/index";
import { List as ProductList } from "../../features/products/index";
import NotFound from "../NotFound";
import Home from "../../features/home";
import {
    SearchOutlined,
    PlusOutlined,
    SettingOutlined,
    EditOutlined,
    DeleteOutlined,
    UnorderedListOutlined,
    UploadOutlined
  } from "@ant-design/icons";

const routeConfig: any[] = [
    {
        key:"1",
        path: "/",
        element: <Home />,
        showInMenu: true,
        title: "Ana Sayfa",
        icon:<UploadOutlined/>,
    },
    {
        key:"2",
        path: "/admin/login",
        element: <Login />,
        showInMenu: false,
        title: "Girish sayfasi",
        icon:null,
    },
    {
        key:"3",
        path: "/admin/categories",
        element: <AppLayout content={<CategoryList />} />,
        showInMenu: true,
        title: "Kategoriler",
        icon:<UploadOutlined/>,
    },
    {
        key:"4",
        path: "/admin/auth",
        element: <AppLayout content={<UserList />} />,
        showInMenu: true,
        title: "Kullanicilar",
        icon:<UploadOutlined/>,
    },
    {
        key:"5",
        path: "/admin/auth/create",
        element: <AppLayout content={<CreateUser />} />,
        showInMenu: false,
        title: "User Oluştur",
        icon:<UploadOutlined/>,
    },

    {
        key:"5",
        path: "/admin/role",
        element: <AppLayout content={<RoleList />} />,
        showInMenu: true,
        title: "Roller",
        icon:<UploadOutlined/>,
    },
    {
        key:"6",
        path: "/admin/role/create",
        element: <AppLayout content={<CreateRole />} />,
        showInMenu: false,
        title: "Role Oluştur",
        icon:<UploadOutlined/>,
    },



    {
        key:"7",
        path: "/admin/categories/create",
        element: <AppLayout content={<CreateCategory />} />,
        showInMenu: false,
        title: "Kategori Oluştur",
        icon:<UploadOutlined/>,
    },
    {
        key:"8",
        path: "/admin/products/:categoryId",
        element: <AppLayout content={<ProductList />} />,
        showInMenu: true,
        icon:<UploadOutlined/>,
        title: "Ürünler",
    },
    {
        key:"9",
        path: "*",
        element: <NotFound />,
        icon:<UploadOutlined/>,
        showInMenu: false,
    },
];

export default routeConfig;