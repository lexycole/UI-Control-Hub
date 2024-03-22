import React, { useEffect, useState } from "react";
import { getPatient, getPatients } from "../../../services/patients";
import { getClinic, getClinics } from "../../../services/clinics";
import { getDoctors } from "../../../services/doctors";
//import Priority from "./Priority";
import Status from "./Status";
import "react-datetime/css/react-datetime.css";
import { AwesomeQRCode } from "@awesomeqr/react";
import { TimePicker } from "antd";
import './Start_End_Time.css'
// import DateRangePicker from "./DateRangePicker";
import DateTime from "react-datetime";
import moment from "moment";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "reactstrap";
import { Panel, PanelBody } from "../../../components/panel/panel.jsx";
import { ToastContainer } from "react-toastify";
import ReusableUploader from "../../../newcommon/ReusableUploader";
function BasicInfo(props) {
  const {
    data,
    onClickHandler,
    onChangeHandler,
    onInputChange,
    setReadOnly,
    loaded,
    removeFile,
    selectedFile,
    readOnly,
    handleDelete,
  } = props;
  const [addAttachements, setAddAttachements] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setclinics] = useState([]);
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({});
  const [currentDoctor, setCurrentDoctor] = useState({});
  const [currentClinic, setcurrentClinic] = useState({});
  const [currentImages, setCurrentImages] = useState({
    patientImage: "",
    clinicImage: "",
    doctorImage: "",
  });

  const appointmentTypeOptions = [
    { value: "clinic", label: "clinic" },
    { value: "home", label: "home" },
    { value: "videocall", label: "videocall" },
    { value: "phone", label: "phone" },
  ];

  const sessionOptions = [
    { value: "follow", label: "follow" },
    { value: "intake", label: "intake" },
  ];

  const statusOptions = [
    { value: "active", label: "active" },
    { value: "archived", label: "archived" },
    { value: "pending", label: "pending" },
    { value: "invoiced", label: "invoiced" },
    { value: "canceled<24hours", label: "canceled < 24hours" },
    { value: "in-treatment", label: "in treatment" },
  ];

  const populateDoctors = async () => {
    const { data: fetchedDoctors } = await getDoctors();
    setDoctors(fetchedDoctors);
    console.log("inside the populate doctors ", fetchedDoctors, data?.doctorNo);
    const currDoctor = fetchedDoctors.find((e) => e._id === data?.doctorNo);
    setCurrentDoctor(currDoctor);
    setCurrentImages((prev) => {
      return {
        ...prev,
        doctorImage: currDoctor?.doctors?.imageSrc,
      };
    });
  };

  const populatePatients = async () => {
    const { data: fetchedPatient } = await getPatients();
    setPatients(fetchedPatient);
    const currpatient = fetchedPatient.find(
      (user) => user._id === data?.patientNo
    );
    console.log("current patient in populate", currpatient);
    setCurrentPatient(currpatient);
    setCurrentImages((prev) => {
      return {
        ...prev,
        patientImage: currpatient?.patients?.imageSrc,
      };
    });
  };

  const populateClinics = async () => {
    const { data: fetchedClinics } = await getClinics();
    setclinics(fetchedClinics);
    const currentClinic = fetchedClinics.find((e) => e._id === data?.clinicNo);
    setcurrentClinic(currentClinic);
    setCurrentImages((prev) => {
      return {
        ...prev,
        clinicImage: currentClinic?.clinics?.imageSrc,
      };
    });
  };

  const onCurrentImageChange = (name, id) => {
    if (name === "patientImage") {
      console.log("number", id);

      const gotPatient = patients.find((e) => e._id === id);
      console.log("got this patitenet", gotPatient);
      setCurrentImages((prev) => {
        return {
          ...prev,
          name: gotPatient.patients?.imageSrc,
        };
      });
    } else if (name === "clinicImage") {
      const gotClinics = clinics.find((e) => e._id === id);
      setCurrentImages((prev) => {
        return {
          ...prev,
          name: gotClinics.clinics?.imageSrc,
        };
      });
    } else if (name == "doctorImage") {
      const gotDoctor = doctors.find((e) => e._id === id);
      setCurrentImages((prev) => {
        return {
          ...prev,
          name: gotDoctor.doctors?.imageSrc,
        };
      });
    }
  };

  useEffect(() => {
    populatePatients();
    populateClinics();
    populateDoctors();
  }, [data]);

  console.log("data state ", data);
  console.log("current patient", currentPatient);
  console.log("current doctor", currentDoctor);
  console.log("current Clinic", currentClinic);

  return (
    <>
      <div className="row">
        <div className="col-8">
          <Panel>
            <PanelBody>
              <h3 className="m-t-10">Basic information</h3>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Patient</label>
                <div className="col-sm-1">
                  <img
                    src={currentImages.patientImage}
                    alt=""
                    height="35"
                    width="35"
                  />
                </div>
                <div className="col-sm-8">
                  <select
                    disabled={readOnly}
                    name="patientNo"
                    id="patientNo"
                    value={data.patientNo}
                    onChange={(e) => {
                      const patientNo = e.target.value;

                      onInputChange({ patientNo });
                      onCurrentImageChange("patientImage", patientNo);
                    }}
                    className="form-control"
                  >
                    <option disabled>Select Patient</option>
                    {patients?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.patients.contactName.first +
                          " " +
                          option.patients.contactName.last}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Doctor</label>
                <div className="col-sm-1">
                  <img
                    src={currentImages.doctorImage}
                    alt=""
                    height="35"
                    width="35"
                  />
                </div>
                <div className="col-sm-8">
                  <select
                    disabled={readOnly}
                    name="doctorNo"
                    id="doctorNo"
                    value={data.doctorNo}
                    onChange={(e) => {
                      const doctorNo = e.target.value;

                      onInputChange({ doctorNo });
                      onCurrentImageChange("doctorImage", doctorNo);
                    }}
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select Doctor
                    </option>
                    {doctors?.map((Doctor) => (
                      <option key={Doctor._id} value={Doctor._id}>
                        {Doctor.doctors.contactName.first +
                          " " +
                          Doctor.doctors.contactName.last}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Clinic</label>
                <div className="col-sm-1">
                  <img
                    src={currentImages.clinicImage}
                    alt=""
                    height="35"
                    width="35"
                  />
                </div>
                <div className="col-sm-8">
                  <select
                    disabled={readOnly}
                    name="clinicNo"
                    id="clinicNo"
                    value={data.clinicNo}
                    onChange={(e) => {
                      const clinicNo = e.target.value;

                      onInputChange({ clinicNo });
                      onCurrentImageChange("clinicImage", clinicNo);
                    }}
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select Clinic
                    </option>
                    {clinics?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.companyInfo.businessName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">Status</label>
                <div className="col-sm-9">
                  <select
                    disabled={readOnly}
                    name="status"
                    id="status"
                    value={data.status}
                    onChange={(e) => {
                      const status = e.target.value;
                      onInputChange({ status });
                    }}
                    className="form-control"
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map(({ value, label }) => {
                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group row m-b-15">
                <label className="col-sm-2 col-form-label">Date</label>
                <div className="col-sm-3">
                  <DateTime
                    initialValue={data.date}
                    inputProps={{
                      placeholder: "Datepicker",
                      readOnly: readOnly,
                      className: readOnly ? "read-only-field" : ""
                    }}
                    onChange={(e) => onInputChange({ date: e._d })}
                    timeFormat={false}
                    closeOnSelect={true}
                  />
                </div>

                <label className="col-sm-auto col-form-label">Start Time</label>
                <div className="col-sm-2 time">
                  <TimePicker
                    showNow={false}
                    format="HH:mm"
                    minuteStep={5}
                    onChange={(time, timeString) => {
                      onInputChange({ startTime: timeString });
                    }}
                    disabled={readOnly}
                    value={data.startTime ? moment(data.startTime, "HH:mm") : null}
                    className={readOnly ? "read-only-field" : ""}
                  />


                </div>

                <label className="col-sm-auto col-form-label">End Time</label>
                <div className="col-sm-2 time">
                  <TimePicker
                    showNow={false}
                    format="HH:mm"
                    minuteStep={5}
                    onChange={(e, v) => {
                      const endTime = e._d;
                      onInputChange({ endTime });
                    }}
                    disabled={readOnly}
                    value={
                      new moment(data.endTime ? data.endTime : "00:00", "HH:mm")
                    }
                    className={readOnly ? "read-only-field" : ""}
                  />
                </div>
              </div>



              <div className="form-group row m-b-15">
                <label className="col-sm-3 col-form-label">
                  Appointment Type
                </label>
                <div className="col-sm-3">
                  <select
                    disabled={readOnly}
                    name="appointmentType"
                    id="appointmentType"
                    value={data.appointmentType}
                    onChange={(e) => {
                      const appointmentType = e.target.value;
                      onInputChange({ appointmentType });
                    }}
                    className="form-control"
                  >
                    <option value="">Select Appointment-type</option>
                    {appointmentTypeOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="col-sm-2 col-form-label">Session Type</label>
                <div className="col-sm-4">
                  <select
                    disabled={readOnly}
                    name="sessionType"
                    id="sessionType"
                    value={data.sessionType}
                    onChange={(e) => {
                      const sessionType = e.target.value;
                      onInputChange({ sessionType });
                    }}
                    className="form-control"
                  >
                    <option value="">Select Session-type</option>
                    {sessionOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/*<div className="form-group row m-b-15">
                                <label className="col-sm-3 col-form-label">Session Type</label>
                                <div className="col-sm-4">
                                    <select
                                        disabled={readOnly}
                                        name="sessionType"
                                        id="sessionType"
                                        value={data.sessionType}
                                        onChange={(e) => {
                                            const sessionType = e.target.value
                                            onInputChange({ sessionType })
                                        }}
                                        className="form-control"
                                    >
                                        <option value="">Select Session-type</option>
                                        {sessionOptions.map((option) => (
                                            <option key={option.label} value={option.value}>
                                                {option.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                        </div>*/}
              {/* <div className="form-group row m-b-15">
                  <label className="col-sm-3 col-form-label">Locations</label>
                  <div className="col-sm-9">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Readonly input here…"
                      readOnly={readOnly}
                    />
                  </div>
                </div> */}

              {/* <div className="form-group row m-b-15">
                  <label className="col-sm-3 col-form-label">Reference</label>
                  <div className="col-sm-9">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Readonly input here…"
                      readOnly={readOnly}
                    />
                  </div>
                </div> */}
            </PanelBody>
          </Panel>
        </div>
        <div className="col-4">
          <AwesomeQRCode options={{ text: data.link, size: 500 }} />
          {/*<Panel>
                        <PanelBody>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                                alt="qr-code"
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain",
                                    minHeight: "100px",
                                    minWidth: "100px",
                                    maxHeight: "200px",
                                    maxWidth: "200px",
                                    padding: "10px",
                                }}
                            />
                        </PanelBody>
                    </Panel>*/}
        </div>
      </div>
      <div>
        <Panel>
          <PanelBody>
            <h1>Complaint:</h1>
            <textarea
              disabled={readOnly}
              className="form-control"
              type="text"
              placeholder="Readonly input here…"
              onChange={(e) => {
                const title = e.target.value;
                onInputChange({ title });
              }}
              value={data.title}
            />
            {/*{readOnly ? (
                            <h3>{data?.title}</h3>
                        ) : (
                            <textarea
                                value={data?.title}
                                rows="7"
                                style={{ width: "inherit" }}
                            ></textarea>
                        )}*/}
          </PanelBody>
        </Panel>
      </div>
      <div className="form-group row m-b-15">
        <label className="col-sm-3 col-form-label">Note</label>
        <div className="col-sm-9">
          <textarea
            disabled={readOnly}
            className="form-control"
            type="text"
            placeholder="Readonly input here…"
            // readOnly={readOnly}
            value={data.note}
            onChange={(e) => {
              const note = e.target.value;
              onInputChange({ note });
            }}
          />
        </div>
      </div>
      <p className="text-right ml-2 mt-4">
        <>
          <button className="btn btn-danger m-r-5" disabled={readOnly}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              onClickHandler(e, data);
            }}
            disabled={readOnly}
          >
            Submit
          </button>
        </>
      </p>

      <div>
        <ReusableUploader
          onChangeHandler={onChangeHandler}
          onClickHandler={onClickHandler}
          loaded={loaded}
          selectedFile={selectedFile}
          removeFile={removeFile}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default React.memo(BasicInfo);
