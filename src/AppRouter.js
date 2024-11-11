import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import MoeMain from "./web/Main";
import Info from "./web/Info";
import Error from "./web/404";

const AppRouter = () => {
  return (
        <Routes>
            <Route path="/" element={<MoeMain />} />
            <Route path="/info" element={<Info />} />
            <Route path="/404" element={<Error />} />

            <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
  );
}

export default AppRouter;