import React, { useEffect, useState } from "react";
import ModalExpense from "./ModalExpense";
import { Table, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import {
  async_get_expense,
  async_update_expense,
  errors_expense,
  async_softdelete_expense,
  async_upload_expense_invoice,
} from "../action/expenseAction";
import { async_get_category } from "../action/categoryAction";
const { Column } = Table;

const ExpenseListing = () => {
  const [file, setFile] = useState({});
  const expenseList = useSelector((state) => {
    return state.expense.expense;
  });
  const categoryList = useSelector((state) => {
    return state.category.category;
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandle = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);
    dispatch(async_upload_expense_invoice(formData, id));
  };

  useEffect(() => {
    dispatch(async_get_expense());
    dispatch(async_get_category());
  }, [dispatch]);

  const new_arr = [...expenseList];

  const data = new_arr.map((ele, i) => {
    const categoryName = categoryList.find((item) => {
      return item._id === ele.categoryId;
    });
    if (categoryName) {
      return { ...ele, key: i, categoryName: categoryName.categoryName };
    } else {
      return { ...ele, key: i };
    }
  });

  const softDeleteHandle = (_id) => {
    dispatch(async_softdelete_expense(_id));
  };

  const addExpenseOrUpdate = (formData, _id) => {
    dispatch(async_update_expense(formData, _id));
  };

  const expenseErrorHandleReset = (string) => {
    dispatch(errors_expense(string));
  };

  return (
    <>
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
          title="Soft Delete"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <DeleteOutlined
                onClick={() => {
                  softDeleteHandle(record._id);
                }}
                style={{ color: "green", fontSize: "30px" }}
              />
            </Space>
          )}
        />
        <Column
          title="Edit Expense"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <ModalExpense
                buttonName={"Edit Expense"}
                addExpenseOrUpdate={addExpenseOrUpdate}
                expenseErrorHandleReset={expenseErrorHandleReset}
                price={record.amount}
                categoryId={record.categoryId}
                itemName={record.itemName}
                date={record.date}
                _id={record._id}
              />
            </Space>
          )}
        />
        <Column
          title="Invoice Pdf"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              {record.invoicePdf ? (
                <a
                  href={`http://localhost:3015/${record.invoicePdf}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FilePdfOutlined
                    style={{ color: "navy", fontSize: "50px" }}
                  />
                </a>
              ) : (
                <h4>Upload Invoice Pdf</h4>
              )}
            </Space>
          )}
        />
        <Column
          title="Upload Invoice Pdf"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <form
                onSubmit={(e) => {
                  submitHandle(e, record._id);
                }}
                encType="multipart/form-data"
              >
                <input type="file" onChange={handleChange} />
                <input type="submit" className="invoiceUpload" />
              </form>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default ExpenseListing;
