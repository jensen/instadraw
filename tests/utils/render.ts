import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

export const renderWithRouter = (
  ui: React.ReactElement<any>,
  { route = "/" } = {}
) => {
  window.history.pushState({}, "", route);

  return render(ui, { wrapper: BrowserRouter });
};
