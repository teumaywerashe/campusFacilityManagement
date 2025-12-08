import React, { useContext, useEffect,  } from "react";
import { StoreContext } from '../context/store';

import AllReportDisplay from "./AllReportDisplay";
import { style } from "../style";

function AllReport() {
  const { getAllReports, allReports } = useContext(StoreContext);
 

  useEffect(() => {
    getAllReports();
    const reportInterval = setInterval(() => {
      getAllReports();
    }, 2000);
    return clearInterval(reportInterval);
  }, []);
  return (
    <div className={style.myReport}>
      <div className="my-report-head">
        <h2 className={style.myReportHeadTitle}>My Reports</h2>
        <ul className={style.myReportHeadList}>
          <li className="image">Image</li>
          <li className="report-tab">Report</li>
          <li className="status">Status</li>
          <li className="reported-at">Reported </li>
          <li className="updated-at">Updated</li>
        </ul>
        <hr className={style.myReportHeadHr}/>
      </div>
      <div className={style.myReportsDisplay}>
        {allReports.map((report, i) => (
          <div
            key={i}
            className={`${report.isRead ? style.read : style.unRead}`}
          >
            <AllReportDisplay report={report} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllReport;
