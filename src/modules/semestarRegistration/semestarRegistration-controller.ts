import httpStatus from "http-status";
import sentResponse from "../../app/middlwares/ResponseHandel";
import catchAsync from "../../app/utils/catchAsync-funtion";
import { SemestarRegistationServise } from "./semestarRegistration-servise";
import { Request, Response } from "express";

const createSemestarRegistation = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemestarRegistationServise.createSemestarRegistationDB(
      req.body
    );

    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Create Registation Successfully ",
      data: result,
    });
  }
);

const gelAllRegistationSEmester = catchAsync(async (req, res) => {
  const result = await SemestarRegistationServise.allSemestarRegistationDB(
    req.query
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All  Registation Semestar Successfully ",
    data: result,
  });
});

const SingleRegistationSEmester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemestarRegistationServise.singleSemestarRegistationDB(id);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get Single Registation Semestar Successfully ",
    data: result,
  });
});
const updateSemestarRegistation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemestarRegistationServise.updateSemestarRegistationDB(
    id,
    req.body
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get Single Registation Semestar Successfully ",
    data: result,
  });
});

export const SemestarRegistationController = {
  createSemestarRegistation,
  gelAllRegistationSEmester,
  SingleRegistationSEmester,
  updateSemestarRegistation,
};
