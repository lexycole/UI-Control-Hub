import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
// import { useEffect } from "react/cjs/react.development";
import XLSX from "xlsx";
import SpreadsheetEditor from "./SpreadsheetEditor";
import SpreadsheetReader from "./SpreadsheetReader";
// const SpreadsheetEditor = React.lazy(() => import("./SpreadsheetEditor"));
// const SpreadsheetReader = React.lazy(() => import("./SpreadsheetReader"));

const SpreadSheet = ({ readOnly, setReadOnly }) => {
  const [sheetState, setSheetState] = useState({});
  function stox(wb) {
    var out = [];
    wb.SheetNames.forEach(function (name) {
      var o = { name: name, rows: {} };
      var ws = wb.Sheets[name];
      var aoa = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
      aoa.forEach(function (r, i) {
        var cells = {};
        r.forEach(function (c, j) {
          cells[j] = { text: c };
        });
        o.rows[i] = { cells: cells };
      });
      out.push(o);
    });
    return out;
  }
  const onFileChangeHandler = (e) => {
    let excelFile = e.target.files[0];
    setSheetState(null);
    if (e.target.files[0]) {
      if (!excelFile.name.match(/\.(xlsx|xls|csv|xlsm)$/)) {
        alert("Please Upload Excel File");
      } else {
        const data = new Promise(function (resolve, reject) {
          var reader = new FileReader();
          var rABS = !!reader.readAsBinaryString;
          reader.onload = function (e) {
            var bstr = e.target.result;
            var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            resolve(wb);
          };
          if (rABS) reader.readAsBinaryString(excelFile);
          else reader.readAsArrayBuffer(excelFile);
        });
        data.then((exceldata) => {
          console.log(exceldata);
          setSheetState(stox(exceldata));
          if (readOnly) {
            setReadOnly();
          }
        });
      }
    }
  };

  useEffect(() => {
    console.log(sheetState);
  }, [sheetState]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="my-3" style={{ width: "300px" }}>
        <div className="custom-file">
          <input
            type="file"
            name="customFile"
            className="custom-file-input"
            onChange={onFileChangeHandler}
          />
          <label className="custom-file-label" htmlFor="customFile">
            Choose a spreadsheet file
          </label>
        </div>
      </div>
      <>
        {readOnly ? (
          <SpreadsheetReader
            sheetState={sheetState}
            setSheetState={(ss) => setSheetState(ss)}
          />
        ) : (
          <SpreadsheetEditor
            sheetState={sheetState}
            setSheetState={(ss) => setSheetState(ss)}
          />
        )}
      </>
    </div>
  );
};

export default SpreadSheet;
