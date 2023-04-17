import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  async_get_category,
  async_delete_category,
  error_category,
} from "../action/categoryAction";
import { Space } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

const CategoryList = (props) => {
  const categoryStore = useSelector((state) => {
    return state.category.category;
  });

  const dispatch = useDispatch();

  const deleteHandle = (e, _id) => {
    e.preventDefault();
    dispatch(async_delete_category(_id));
  };

  const deleteBlurHandle = () => {
    dispatch(error_category(""));
  };

  useEffect(() => {
    dispatch(async_get_category());
  }, [dispatch]);
  return (
    <div>
      {categoryStore.length !== 0 && (
        <ul>
          {categoryStore.map((ele, i) => {
            return (
              <div key={i} style={{ height: "80px", width: "300px" }}>
                <li>
                  <CheckOutlined
                    style={{
                      color: "navy",
                      fontSize: "30px",
                    }}
                  />
                  <span style={{ fontSize: "30px" }}>{ele.categoryName}</span>
                  <Space wrap>
                    <DeleteOutlined
                      onClick={(e) => {
                        deleteHandle(e, ele._id);
                      }}
                      onBlur={deleteBlurHandle}
                      style={{ color: "red", fontSize: "30px" }}
                    />
                  </Space>
                </li>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
