import ex from "express";
import shiftRouter from "./routes/shift";

const app = ex();
app.use(ex.json());
app.use("/shift", shiftRouter);

export default app;
