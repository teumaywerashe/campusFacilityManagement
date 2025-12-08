import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../context/store";
import {
  Check,
  LucideSendHorizonal,
  MapIcon,
  MoreVertical,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { style } from "../style";
import ShowImage from "./ShowImage";

function AllReportDisplay({ report }) {
  const [showImage, setShowImage] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [status, setStatus] = useState(report.status);
  const { url, role, markAsRead, token, deleteIssue, updateTime } =
    useContext(StoreContext);

  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateStatus = async (e, id) => {
    const updatedStatus = e.target.value;
    setStatus(updatedStatus);
    try {
      const response = await axios.patch(
        `${url}/issue/update/${id}`,
        { status: updatedStatus },
        { headers: { token } }
      );
      console.log(response.data.success);
      report.status = status;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      
       
          <img onClick={()=>setShowImage(!showImage)}
            className={`${style.reportImage} cursor-pointer`}
            src={`${url}/uploads/${report.image}`}
            alt="image"
          />
      
        <p ref={navRef} className={style.reportName}>
          {report.content}
        </p>
        <select
          className={style.statusSelect}
          name="status"
          id="status"
          value={status}
          onChange={(e) => updateStatus(e, report.id)}
        >
          <option value={report.status}>{report.status}</option>
          {report.status.toLowerCase() !== "pending" && (
            <option value="pending">Pending</option>
          )}
          {report.status.toLowerCase() !== "in progress" && (
            <option value="in-progress">In progress</option>
          )}
          {report.status.toLowerCase() !== "resolved" && (
            <option value="resolved">Resolved</option>
          )}
        </select>

        <p ref={navRef} className="report-reported-at">
          {updateTime(report.createdAt)}
        </p>
        <p ref={navRef} className="report-updated-at">
          {updateTime(report.updatedAt)}
        </p>
        <div className={style.opitionButtons}>
          <div>
            <MoreVertical
              onClick={() => setShowMenu(!showMenu)}
              className={style.opition}
            />
          </div>
          {showMenu && (
            <div className={style.menus}>
              <button
                onClick={() => deleteIssue(report.id)}
                className={style.deleteButton}
              >
                <Trash2 size={18} />
                delete
              </button>
              {!report.isRead && (
                <button
                  onClick={() => {
                    markAsRead("issue", report.id);
                    setShowMenu(false);
                  }}
                  className={style.markAsReadButton}
                >
                  <Check size={18} /> markAsRead
                </button>
              )}
              {role === "admin" && (
                <button className={style.sendNotificationButton}>
                  <LucideSendHorizonal color="green" size={18} />
                  <span>notify </span>
                </button>
              )}
            </div>
          )}
        </div>
    
     
     
        {showImage &&  (<ShowImage showImage={showImage} report={report} setShowImage={setShowImage}/>
      
        )}
    </>
  );
}

export default AllReportDisplay;
