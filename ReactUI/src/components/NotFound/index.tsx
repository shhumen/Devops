import React from "react";
import { Result, Button, Layout } from "antd";
import Login from "../../features/auth";
const NotFound = () => {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Result
          status="error"
          title="Submission Failed"
          subTitle="Please check and modify the following information before resubmitting."
          extra={[
            <Button type="primary" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        ></Result>
      </Layout>
    );
  };
  
  export default NotFound;
  