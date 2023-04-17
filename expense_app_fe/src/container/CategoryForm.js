import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Input } from "antd";
import {
  async_create_category,
  error_category,
} from "../action/categoryAction";

const CategoryForm = () => {
  const dispatch = useDispatch();

  const categoryStore = useSelector((state) => {
    return state.category;
  });

  const formBlurHandle = () => {
    dispatch(error_category(""));
  };

  const [form] = Form.useForm();
  const [category, setCategory] = useState("");

  const categoryHandle = (e) => {
    setCategory(e.target.value);
  };

  const submitHandle = () => {
    const categoryData = {
      categoryName: category,
    };
    dispatch(async_create_category(categoryData));
  };

  useEffect(() => {
    setCategory("");
  }, [categoryStore]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Enter Category Name"
        required
        tooltip="This is a required field"
      >
        <Input
          placeholder="input placeholder"
          value={category}
          onChange={categoryHandle}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={submitHandle}
          onBlur={formBlurHandle}
        >
          Submit
        </Button>
      </Form.Item>
      {categoryStore.errors && (
        <p style={{ color: "red" }}>
          <b>{categoryStore.errors}</b>
        </p>
      )}
    </Form>
  );
};

export default CategoryForm;
