import { screen } from "@testing-library/react";
import { View, loader } from "~/routes/index";
import { renderWithRouter } from "../utils/render";

describe("Index Route", () => {
  describe("loader", () => {
    it("should return a message", async () => {
      const response = await loader({
        request: new Request("/"),
        params: {},
        context: {},
      });
      const body = await response.json();

      expect(response).toBeInstanceOf(Response);
      expect(body).toEqual({ message: "Basic Loader" });
    });
  });

  describe("view", () => {
    it("should render with and display the message", () => {
      renderWithRouter(<View data={{ message: "Basic Loader" }} />, {
        route: "/",
      });

      expect(screen.getByText("Basic Loader")).toBeInTheDocument();
    });
  });
});
