import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Row,
  Table,
  Col,
  Result,
  Button,
  Tooltip,
  TableProps,
  Dropdown,
  Space,
  Menu,
  Popconfirm,
} from "antd";
import { RoleType } from "./types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteRole,
  fetchRoles,
  fetchRole,
  updateRole,
} from "./roleSlice";
import {
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Card from "antd/es/card/Card";
import CustomModal from "../../components/Modal";
import FormComponent from "./components/formComponent";

const List: React.FC = () => {
  const [open, setOpen] = useState({
    open: false,
    content: "",
  });

  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.roles.list);
  const role = useAppSelector((state) => state.roles.selected);
  console.log(roles);
  

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const onDetailsHandle = useCallback(
    (e: boolean, id?: string) => {
      setOpen({
        open: e,
        content: "details",
      });
      if (id) {
        dispatch(fetchRole(id));
      }
    },
    [dispatch]
  );

  const onDeleteHandle = useCallback(
    (e: any) => {
      dispatch(deleteRole(e));
    },
    [dispatch]
  );

  const onEditHandle = useCallback(
    (e: boolean, id?: string) => {
      if (id) {
        dispatch(fetchRole(id));
      }
      setOpen({
        open: e,
        content: "edit",
      });
    },
    [dispatch]
  );

  const onFinish = (values: any) => {
    dispatch(updateRole(values));
    setOpen({ open: false, content: "" });
  };

  const onNavigateToCreate = () => navigate("/admin/role/create");
  const onNavigateToProducts = (id: string) =>
    navigate(`/products/${id}`);

  type ColumnType = TableProps<RoleType>["columns"] | any;
  const columns: ColumnType = useMemo(
    () => [
      {
        title: "Role Name",
        dataIndex: "name",
        key: `name`,
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
    []
  );

  return (
    <>
      <Card>
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 0, offset: 0 }}
          >
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Pervin Nerdesin?</Button>}
            />
          </Col>
          <Col
            xs={{ span: 0, offset: 0 }}
            sm={{ span: 0, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
            style={{ marginBottom: 16 }}
          >
            <Tooltip title="Create">
              <Button
                onClick={onNavigateToCreate}
                style={{ float: "right" }}
                type="primary"
                icon={<PlusOutlined />}
              >
                Yeni Role
              </Button>
            </Tooltip>
          </Col>
          <Col span={24}>
            <Table
              size="middle"
              locale={{
                emptyText: "Data Yok :(",
                filterSearchPlaceholder: "Ara",
              }}
              columns={columns}
              dataSource={roles}
            />
          </Col>
        </Row>
      </Card>

      {/* {open.content === "details" ? (
        <CustomModal
          title={`Role Details`}
          width={1200}
          open={open.open}
          onOpenHandler={onDetailsHandle}
          content={<RoleDetails role={role} />}
        />
      ) : (
        <CustomModal
          title={`Category Edit`}
          width={700}
          open={open.open}
          onOpenHandler={onEditHandle}
          content={
            <FormComponent onFinish={onFinish} initialValues={role} />
          }
        />
      )} */}
    </>
  );
};

export default List;
