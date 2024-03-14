import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchUsers } from "../../users/usersSlice";
import { useNavigate } from "react-router-dom";
import Users from "../../../network/models/Users";
import { max } from "moment";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface FormComponentProps {
  onFinish: (values: any) => void;
  initialValues?: any;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.list);
  // console.log(categories)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  const { onFinish, initialValues } = props;
  const [form] = Form.useForm();
  // console.log(form)

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={initialValues}
      // validateMessages={validateMessages}
      >
        <Form.Item name={"_id"}>
          <Input style={{ display: "none" }} />
        </Form.Item>

        <Form.Item
          name={"username"}
          label="User Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Password"
          rules={[
            { required: true, message: 'Please input your password.' },
            { min: 8, message: 'Password must be minimum 8 characters.' },
            { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.' },
          ]}
        >
          <Input.Password 
          
          />
        </Form.Item>
        <Form.Item
          name={"firstname"}
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
        name={"lastname"} 
        label="Last Name"
        rules={[{ required: true }]}>
          <Input />

        </Form.Item>
        <Form.Item 
        name={"email"} 
        label="Email"
        rules={[{ required: true }]}>
        
          <Input 
          type="email"/>
          </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormComponent;
