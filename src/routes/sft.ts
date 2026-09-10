import ex from "express";
import { Sft, zSh } from "../models/sft";
import { Sup, zSu } from "../models/sup";

const r = ex.Router();

r.post("/", async (q: ex.Request, s: ex.Response) => {
  try {
    const body = zSh.parse(q.body);
    const data = await Sft.create(body);

    s.status(200).json({
      data,
    });
  } catch {
    s.status(400).json({
      err: "bad req",
    });
  }
});

r.post("/:id/sup", async (q: ex.Request, s: ex.Response) => {
  try {
    const id = String(q.params.id);
    const shift = await Sft.findById(id);

    if (!shift) {
      s.status(404).json({
        err: "no sft",
      });
      return;
    }

    const body = zSu.parse(q.body);
    const count = await Sup.countDocuments({ sId: id });

    if (count >= shift.cap) {
      s.status(400).json({
        err: "full",
      });
      return;
    }

    const data = await Sup.create({
      sId: id,
      nm: body.nm,
    });

    s.status(200).json({
      data,
    });
  } catch {
    s.status(400).json({
      err: "bad req",
    });
  }
});

export default r;
