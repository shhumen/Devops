import React from "react";
import { Card, Col, Row } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { addRole } from "./roleSlice";
import { useNavigate } from "react-router-dom";
import FormComponent from "./components/formComponent";

const Create: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(addRole(values));
    navigate("/admin/role");
  };

  return (
    <Card>
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <FormComponent onFinish={onFinish} />
        </Col>
      </Row>
    </Card>
  );
};

export default Create;
