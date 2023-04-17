import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { async_update_budget, async_get_budget } from "../action/budgetAction";
import {
  async_delete_account,
  async_reset_account,
} from "../action/deleteAndResetAccountAction";
import Category from "./Category";
import { Button, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Setting = (props) => {
  const { budget: budgetValue, _id } = useSelector((state) => {
    return state.budget.budgetData;
  });

  const dispatch = useDispatch();

  const [budget, setBudget] = useState(budgetValue ? budgetValue : 0);
  const [toggle, setToggle] = useState(false);

  const confirmDeleteAccount = () => {
    dispatch(async_delete_account(props));
  };
  const confirmResetAccount = () => {
    dispatch(async_reset_account());
  };

  useEffect(() => {
    setBudget(budgetValue);
  }, [budgetValue]);

  useEffect(() => {
    dispatch(async_get_budget());
  }, [dispatch]);

  const budgetHandle = (e) => {
    //const value = e.target.value;
    setBudget(e.target.value);
  };

  const toggleHandle = () => {
    setToggle(!toggle);
  };

  const saveHandle = (e) => {
    e.preventDefault();
    const formData = {
      budget: Number(budget),
    };
    dispatch(async_update_budget(toggleHandle, _id, formData));
  };

  return (
    <div>
      <div className="setting-budget-wrapper1">
        <div className="setting-budget-Label">
          <label>Total Budget</label>{" "}
        </div>
        {!toggle ? (
          <div>
            <div className="setting-budget-data">Rs. {budgetValue}</div>
            <button className="setting-budget-btn1" onClick={toggleHandle}>
              Update Budget
            </button>
          </div>
        ) : (
          <div>
            <input
              type="Number"
              className="setting-budget-input"
              value={budget}
              onChange={budgetHandle}
            />
            <button className="setting-budget-btn2" onClick={saveHandle}>
              Save Budget
            </button>
          </div>
        )}
      </div>
      <div className="setting-budget-wrapper2">
        <Category />
        <div className="delete_reset_account">
          <div>
            <h3 style={{ color: "navy" }}>Click here to delete your account</h3>
            <br />

            <Popconfirm
              placement="topLeft"
              title={
                <b style={{ color: "#cf1322" }}>
                  "Are you sure to delete this account?"
                </b>
              }
              description={
                <b style={{ color: "#002c8c" }}>"Delete this account"</b>
              }
              onConfirm={confirmDeleteAccount}
              okText="Yes"
              cancelText="No"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <Button type="primary" danger ghost>
                Delete Account
              </Button>
            </Popconfirm>
          </div>
          <div>
            <h3 style={{ color: "navy" }}>Click here to reset your account</h3>
            <br />
            <Popconfirm
              placement="topLeft"
              title={
                <b style={{ color: "#cf1322" }}>
                  "Are you sure to reset this account?"
                </b>
              }
              description={
                <b style={{ color: "#002c8c" }}>"Reset this account"</b>
              }
              onConfirm={confirmResetAccount}
              okText="Yes"
              cancelText="No"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <Button type="primary" danger ghost>
                Reset Account
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
