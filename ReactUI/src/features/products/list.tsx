import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Card,
  Row,
  Col,
  Button,
  Tooltip,
  Table,
  Popconfirm,
  Space,
  Select,
  Dropdown,
  Menu,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  deleteProduct,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from "./productSlice";
import { fetchCategories } from "../categories/categorySlice";
import CustomModal from "../../components/Modal";
import ProductDetail from "./components/productDetail";
import FormComponent from "./components/formComponent";

export default function List() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryId: categoryIdFromUrl } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [tableProducts, setTableProducts] = useState([] as any[]);

  const categories = useAppSelector((state) => state.category.list);
  const products = useAppSelector((state) => state.product.list);
  const product = useAppSelector((state) => state.product.selected);

  useEffect(() => {
    dispatch(fetchCategories());
    const categoryIdToUse = selectedCategoryId || categoryIdFromUrl;
    if (categoryIdToUse) {
      dispatch(fetchProducts(categoryIdToUse));

      setTableProducts(products);
    }
  }, [dispatch, categoryIdFromUrl, selectedCategoryId]);

  const onDetailsHandle = useCallback(
    (e: boolean, id?: string) => {
      setOpen({ open: e, content: "details" });
      if (id) {
        dispatch(fetchProduct(id));
      }
    },
    [dispatch]
  );

  const onEditHandle = useCallback(
    (e: boolean, id?: string) => {
      setOpen({ open: e, content: "edit" });
      if (id) {
        dispatch(fetchProduct(id));
      } 
    },
    [dispatch]
  );

  const onDeleteHandle = useCallback(
    (id?: string) => {
      if (id) {
        dispatch(deleteProduct(id));
      }
    },
    [dispatch]
  );

  const onFinish = useCallback(
    (values: any) => {
      dispatch(updateProduct(values));
      setOpen({ open: false, content: "" });
    },
    [dispatch]
  );

  const onNavigate = useCallback(
    () => navigate("/admin/products/create"),
    [navigate]
  );

  const onCategoryChange = useCallback((value: string) => {
    setSelectedCategoryId(value);
  }, []);

  const [open, setOpen] = useState({ open: false, content: "" });

  const columns = useMemo(
    () => [
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
      },
      {
        title: "Units In Stock",
        dataIndex: "unitsInStock",
        key: "unitsInStock",
      },
      {
        title: "Category",
        dataIndex: "categoryName",
        key: "categoryName",
      },
      {
        title: "Actions",
        key: `actions`,
        dataIndex: "_id",
        render: (_: any) => {
          return (
            <Dropdown
              trigger={["click"]}
              dropdownRender={(menu) => (
                <div>
                  <Menu>
                    <Menu.Item
                      key={`edit_${_}`}
                      onClick={() => onEditHandle(true, _)}
                      icon={<EditOutlined />}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      key={`details_${_}`}
                      onClick={() => onDetailsHandle(true, _)}
                      icon={<SearchOutlined />}
                    >
                      Details
                    </Menu.Item>
                    <Menu.Item
                      key={`delete_${_}`}
                      icon={<DeleteOutlined />}
                      danger
                    >
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDeleteHandle(_)}
                      >
                        Delete
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
                </div>
              )}
            >
              <Button size={"middle"}>
                <Space>
                  <SettingOutlined />
                </Space>
              </Button>
            </Dropdown>
          );
        },
      },
    ],
    [onDeleteHandle, onDetailsHandle, onEditHandle]
  );

  return (
    <>
      <Card>
        <Row gutter={16}>
          <Col span={24}>
            <Tooltip title="Create New Product">
              <Button
                onClick={onNavigate}
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: 16 }}
              >
                Create Product
              </Button>
            </Tooltip>
          </Col>
          <Col span={24}>
            <Select
              onChange={onCategoryChange}
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Select a category"
              value={selectedCategoryId || categoryIdFromUrl}
            >
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={24}>
            <Table columns={columns} dataSource={tableProducts} rowKey="_id" />
          </Col>
        </Row>
      </Card>
      <CustomModal
        title={open.content === "details" ? "Product Details" : "Edit Product"}
        open={open.open}
        onOpenHandler={
          open.content === "details" ? onDetailsHandle : onEditHandle
        }
        content={
          open.content === "details" ? (
            <ProductDetail product={product} />
          ) : (
            <FormComponent onFinish={onFinish} initialValues={product} />
          )
        }
        width={80}
      />
    </>
  );
}
