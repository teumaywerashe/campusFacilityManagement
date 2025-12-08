import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/store";
import { admin } from "../images/image";

import { GoogleMap, Marker, } from "@react-google-maps/api";
import { style } from "../style";


function NewReport() {
  const { url, id, token } = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  

  const existingImage = admin;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };


  const submitReport = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      return toast.error("please upload image");
    }
    const formData = new FormData();

    formData.append("content", content);
    formData.append("userId", id);
    formData.append("image", image);
    try {
      const response = await axios.post(`${url}/issue/report`, formData, {
        headers: { "Content-Type": "multipart/form-data", token },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        console.log(
          typeof response.data.issue.id,
          typeof response.data.issue.userId
        );
        await axios.post(`${url}/notification/create`, {
          receiverId: response.data.issue.userId,
          content: `hello there we have recieved your report of ${response.data.issue.content}. thankyou🙏`,
          reportId: response.data.issue.id,
        });
        navigate("/user/dashboard");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  return (
    <div className={style.newReport}>
      <h1 className={style.newReportHeader}>New Report</h1>
      <div className={style.newReportForm}>
        <form
          onSubmit={(e) => submitReport(e)}
          action=""
          className={style.newReportDetail}
        >
          <div>
            <textarea
              name="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className={style.newReportContent}
              id="nmn"
              placeholder="what do you want to report"
            ></textarea>
          </div>

          <div className={style.newReportImage}>
            <img
              src={selectedImage || existingImage}
              alt="Profile"
              onClick={handleFileChange}
              className={style.newReportImageContainer}
            />
            <input
              type="file"
              className={style.newReportFileInput}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        

          <button className={style.submitButton}>submit</button>
        </form>
      </div>
    </div>
  );
}

export default NewReport;
