import ex from "express";
import { Shift, shiftSchema } from "../models/shift";
import { Signup, signupSchema } from "../models/signup";

const router = ex.Router();

router.post("/", async (request: ex.Request, response: ex.Response) => {
  try {
    const body = shiftSchema.parse(request.body);
    const data = await Shift.create(body);

    response.status(200).json({
      data,
    });
  } catch {
    response.status(400).json({
      err: "bad req",
    });
  }
});

router.post("/:id/signup", async (request: ex.Request, response: ex.Response) => {
  try {
    const id = String(request.params.id);
    const shift = await Shift.findById(id);

    if (!shift) {
      response.status(404).json({
        err: "no shift",
      });
      return;
    }

    const body = signupSchema.parse(request.body);
    const count = await Signup.countDocuments({ shiftId: id });

    if (count >= shift.capacity) {
      response.status(400).json({
        err: "full",
      });
      return;
    }

    const data = await Signup.create({
      shiftId: id,
      name: body.name,
    });

    response.status(200).json({
      data,
    });
  } catch {
    response.status(400).json({
      err: "bad req",
    });
  }
});

export default router;
