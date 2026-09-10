import ex from "express";
import rt from "./routes/sft";

const a = ex();
a.use(ex.json());
a.use("/sft", rt);

export default a;
