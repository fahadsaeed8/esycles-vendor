"use client";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, ReactNode } from "react";

type ReactPopUpProps = {
  children: ReactNode;
  popupContent: (close: () => void) => ReactNode;
};

const ReactPopUp = ({ children, popupContent }: ReactPopUpProps) => {
  const [openPopUp, setOpenPopUp] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpenPopUp(true)}
      onMouseLeave={() => setOpenPopUp(false)}
    >
      <Popup
        trigger={<div>{children}</div>}
        position="bottom right"
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        closeOnDocumentClick={false}
        nested
        arrow={false}
        modal={false}
        overlayStyle={{ background: "transparent", pointerEvents: "none" }}
        contentStyle={{
          padding: 0,
          border: "none",
          background: "transparent",
        }}
      >
        {popupContent(() => setOpenPopUp(false))}
      </Popup>
    </div>
  );
};

export default ReactPopUp;
