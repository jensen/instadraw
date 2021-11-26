import { loader } from "./index";

describe("index route", () => {
  it("should", async () => {
    const response = await loader({
      request: new Request("/") as any,
      params: {},
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
  });
});
