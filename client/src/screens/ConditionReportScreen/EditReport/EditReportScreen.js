import React from "react";
import { useSelector } from "react-redux";
import EditReport from "./EditReport";
import { Alert } from "@material-ui/core";

const EditReportScreen = ({ id }) => {
  const reports = useSelector((state) => state.petReportList);
  const { conditionReport } = reports;
  let report;

  if (conditionReport !== undefined) {
    if (conditionReport.conditionReports !== undefined) {
      report = conditionReport.conditionReports.filter(
        (report) => report._id === id
      );
    }
  }

  return (
    <>
      {report ? (
        <EditReport report={report[0]} />
      ) : (
        <Alert severity="error">Data Hewan Adopsi Tidak Ada</Alert>
      )}
    </>
  );
};

export default EditReportScreen;
