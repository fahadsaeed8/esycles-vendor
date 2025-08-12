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

  const closePopUp = () => setOpenPopUp(false);

  return (
    <div className="relative">
      <Popup
        trigger={<div>{children}</div>}
        position="bottom right"
        closeOnDocumentClick
        nested
        open={openPopUp}
        onOpen={() => setOpenPopUp(true)}
        onClose={closePopUp}
        arrow={false}
        contentStyle={{ padding: 0, border: "none", background: "transparent" }}
      >
        {popupContent(closePopUp)}
      </Popup>
    </div>
  );
};

export default ReactPopUp;
