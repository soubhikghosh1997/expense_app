import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { async_update_userProfile } from "../action/loginAction";

import { Card, Image } from "antd";

const Profile = (props) => {
  const [file, setFile] = useState({});
  const accountInfo = useSelector((state) => {
    return state.account;
  });

  const dispatch = useDispatch();

  const submitHandle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(async_update_userProfile(formData));
  };

  const changeHandle = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <Card title="PROFILE INFORMATION" bordered={true} className="profile">
        {Object.keys(accountInfo).length !== 0 && (
          <div>
            <h3 style={{ color: "navy" }}>User Name:</h3>

            <h4>{accountInfo.userName}</h4>

            <h3 style={{ color: "navy" }}>Email Id :</h3>
            <h4>{accountInfo.email}</h4>
          </div>
        )}
        <br />
        <div>
          {accountInfo.profilepic ? (
            <Image
              width={200}
              src={`http://localhost:3015/${accountInfo.profilepic}`}
            />
          ) : (
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          )}
        </div>
        <br />
        <form onSubmit={submitHandle} encType="multipart/form-data">
          <input type="file" className="upload_box" onChange={changeHandle} />
          <br />
          <br />
          <input type="submit" className="profilepic_button" />
        </form>
      </Card>
    </div>
  );
};

export default Profile;
