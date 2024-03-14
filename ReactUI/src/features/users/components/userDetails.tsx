import React from "react";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import Users from "../../../network/models/Users";

interface UserDetailProps {
  user: Users | null;
}

const UsertDetail: React.FC<UserDetailProps> = (props) => {
  const { user } = props;

  const exportToCategoryItem = (
    user: Users
  ): DescriptionsProps["items"] => {
    return (
      Object.entries(user)
        //.filter(([key, value]) => key !== "_id" && key !== "__v") -> gelen model içerisinden göstermek istemedğiniz alan var ise, kullanabilirsiniz.
        .filter(([key, value]) => key !== "_id" && key !== "__v" && key !== "password") 
        .map(([key, value]) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          children: value,
        }))
    );
  };
  return (
    <>
      {user && (
        <Descriptions
          labelStyle={{ width: "200px" }}
          size="middle"
          style={{ marginTop: "20px" }}
          bordered
          column={1}
          items={exportToCategoryItem(user!)}
        />
      )}
    </>
  );
};

export default UsertDetail;
