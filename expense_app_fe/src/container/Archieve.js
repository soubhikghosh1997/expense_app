import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  async_listingAllDeletedItems_expense,
  async_restore_expense,
  async_delete_expense,
} from "../action/expenseAction";
import { async_get_category } from "../action/categoryAction";
import { UndoOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
const { Column } = Table;

const Archieve = () => {
  const expenseList = useSelector((state) => {
    return state.expense.expense;
  });
  const categoryList = useSelector((state) => {
    return state.category.category;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(async_listingAllDeletedItems_expense());

    dispatch(async_get_category());
  }, [dispatch]);

  const restoreHandle = (_id) => {
    dispatch(async_restore_expense(_id));
  };

  const deleteHandle = (_id) => {
    dispatch(async_delete_expense(_id));
  };

  const data = expenseList.map((ele, i) => {
    const categoryName = categoryList.find((item) => {
      return item._id === ele.categoryId;
    });
    return { ...ele, key: i, categoryName: categoryName.categoryName };
  });

  return (
    <Table dataSource={data}>
      <Column title="Category" dataIndex="categoryName" />
      <Column
        title="Item Name"
        dataIndex="itemName"
        sorter={{
          compare: (a, b) =>
            a.itemName.toLowerCase() > b.itemName.toLowerCase() ? -1 : 1,
        }}
      />
      <Column
        title="Amount"
        dataIndex="amount"
        sorter={{
          compare: (a, b) => a.amount - b.amount,
        }}
      />

      <Column
        title="Date"
        dataIndex="date"
        sorter={{
          compare: (a, b) => (a.date > b.date ? -1 : 1),
        }}
      />

      <Column
        title="Restore"
        key="action"
        render={(__, record) => (
          <Space size="middle">
            <UndoOutlined
              onClick={() => {
                restoreHandle(record._id);
              }}
              style={{ color: "green", fontSize: "30px" }}
            />
          </Space>
        )}
      />
      <Column
        title="Delete Permanently"
        key="action"
        render={(__, record) => (
          <Space size="middle">
            <DeleteOutlined
              onClick={() => {
                deleteHandle(record._id);
              }}
              style={{ color: "red", fontSize: "30px" }}
            />
          </Space>
        )}
      />
    </Table>
  );
};

export default Archieve;
