import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { async_get_category } from "../action/categoryAction";
import { EditOutlined } from "@ant-design/icons";

const ModalExpense = (props) => {
  const {
    buttonName,
    addExpenseOrUpdate,
    expenseErrorHandleReset,
    price: amount,
    categoryId: categorySlNo,
    itemName: productName,
    date: dayString,
    _id,
  } = props;
  const [categoryId, setCategoryId] = useState(
    categorySlNo ? categorySlNo : ""
  );
  const [itemName, setItemName] = useState(productName ? productName : "");
  const [price, setPrice] = useState(amount ? amount : 0);
  const [date, setDate] = useState(dayString ? dayString : "");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const categoryStore = useSelector((state) => {
    return state.category.category;
  });

  const expenseStore = useSelector((state) => {
    return state.expense;
  });

  // I think useEffect hook not required

  useEffect(() => {
    dispatch(async_get_category());
  }, [dispatch]);

  const changeHandle = (e) => {
    if (e.target.name === "categoryOption") {
      setCategoryId(e.target.value);
    } else if (e.target.name === "itemName") {
      setItemName(e.target.value);
    } else if (e.target.name === "price") {
      setPrice(e.target.value);
    } else if (e.target.name === "date") {
      setDate(e.target.value);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const formData = {
      itemName: itemName,
      amount: price,
      categoryId: categoryId,
      date: date,
    };

    addExpenseOrUpdate(formData, _id);
  };

  useEffect(() => {
    setCategoryId(categorySlNo ? categorySlNo : "");
    setItemName(productName ? productName : "");
    setPrice(amount ? amount : 0);
    setDate(dayString ? dayString : "");
    setIsModalOpen(false);
  }, [expenseStore.expense, categorySlNo, productName, amount, dayString]);

  useEffect(() => {
    setPrice(amount);
    setCategoryId(categorySlNo);
    setItemName(productName);
    setDate(dayString);
  }, [amount, categorySlNo, productName, dayString]);

  const handleCancel = () => {
    setCategoryId(categorySlNo ? categorySlNo : "");
    setItemName(productName ? productName : "");
    setPrice(amount ? amount : 0);
    setDate(dayString ? dayString : "");
    expenseErrorHandleReset("");
    setIsModalOpen(false);
  };

  return (
    <>
      {buttonName === "Edit Expense" ? (
        <EditOutlined
          onClick={showModal}
          style={{ color: "navy", fontSize: "30px" }}
        />
      ) : (
        <Button type="primary" onClick={showModal}>
          {buttonName}
        </Button>
      )}
      <Modal
        title={buttonName}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="modal-form" onSubmit={handleOk}>
          <div>
            <label>
              <b>Item Name</b>
            </label>
            <br />
            <input
              type="text"
              value={itemName}
              onChange={changeHandle}
              name="itemName"
              className="add-expense-form"
            />
            <br />
            <br />
            <br />
            <select
              value={categoryId}
              onChange={changeHandle}
              name="categoryOption"
              className="add-expense-dropdown"
            >
              <option value="">Select Item</option>
              {categoryStore.length !== 0 &&
                categoryStore.map((ele, i) => {
                  return (
                    <option value={ele._id} key={i}>
                      {ele.categoryName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label>
              <b>Price</b>
            </label>
            <br />
            <input
              text="Number"
              value={price}
              onChange={changeHandle}
              name="price"
              className="add-expense-form"
            />
            <br />
            <br />
            <label>
              <b>Select Date</b>
            </label>
            <br />
            <input
              type="date"
              value={date}
              onChange={changeHandle}
              name="date"
              className="add-expense-form"
            />
          </div>
        </form>
        <b style={{ color: "red" }}>
          {expenseStore.errors && expenseStore.errors}
        </b>
      </Modal>
    </>
  );
};

export default ModalExpense;
