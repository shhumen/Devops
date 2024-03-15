import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchCategories } from "../../categories/categorySlice";

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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { onFinish, initialValues } = props;
  const [form] = Form.useForm();

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
      >
        <Form.Item name={"_id"}>
          <Input style={{ display: "none" }} />
        </Form.Item>
        <Form.Item
          name={"categoryId"}
          label="Select Category"
          rules={[{ required: true }]}
        >
          <Select
            options={categories?.map((category) => ({
              value: category?._id,
              label: category?.categoryName,
            }))}
          />
        </Form.Item>
        <Form.Item
          name={"productName"}
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name={"unitPrice"}
          label="Product Price"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>{" "}
        <Form.Item
          name={"unitsInStock"}
          label="Unit in Stock"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name={"description"} label="Açıklama">
          <Input.TextArea />
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
