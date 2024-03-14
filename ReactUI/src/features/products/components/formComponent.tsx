import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchCategories } from "../../categories/categorySlice";
import { useNavigate } from "react-router-dom";
import Category from "../../../network/models/Category";

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
  const categories = useAppSelector((state) => state.category.list);
  // console.log(categories)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
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
          name={"productName"}
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"unitPrice"}
          label="Product Price"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={"unitsInStock"}
          label="Unit in Stock"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={"description"} label="Açıklama">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={"categoryId"}
          label="Select Category"
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: 120 }}
            options={categories?.map((category) => ({
             value: category?._id,
              label:category?.categoryName
            }))
          }
          />
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
