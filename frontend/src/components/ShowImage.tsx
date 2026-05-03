import React, { useContext, useState } from "react";
import { StoreContext, Issue } from "../context/store";

interface Props {
  showImage: boolean;
  report: Issue;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShowImage({ showImage, report, setShowImage }: Props) {
  const { url } = useContext(StoreContext);
  const [show, setShow] = useState<boolean>(showImage);
  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <img
              src={report.image}
              alt="Facility Map"
              className="w-[80vw] h-[80vh]"
            />
            <button
              onClick={() => {
                setShow(false);
                setShowImage(false);
              }}
              className="mt-4 bg-red-500 cursor-pointer text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowImage;
