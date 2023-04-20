const express = require("express");
const router = express.Router();
const timesheetController = require("../controllers/TimeSheetController");
const checkAuthMiddleware = require("../middleware/check-auth");


router.post(
  "/timesheet/save",
  checkAuthMiddleware.checkAuth,
  timesheetController.save
);

router.put(
  "/timesheet/update/:id",
  checkAuthMiddleware.checkAuth,
  timesheetController.update
);

router.get(
  "/timesheets",
  checkAuthMiddleware.checkAuth,
  timesheetController.getall
);

router.post(
  "/timesheets",
  timesheetController.getallByConsutant
);

module.exports = router;
