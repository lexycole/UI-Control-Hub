import React, { useState, useEffect } from "react";
import ReqForAppointment from "../../services/reqforappointments";


import {
  
  useHistory 
} from "react-router-dom";
import {getDoctors} from "../../services/doctors";
import {getClinics} from "../../services/clinics";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";


const RequestAppointmentEdit = (props) => {

    
 
  const [database, setDatabase] = useState([]);
  const [clinicnames , setClinicNames] = useState([]);
  const [doctornames , setDoctorNames] = useState([]);
  const [submitted, setSubmitted] = useState(false);
 

  const appointmentTypeOptions = [
    { value: "clinic", label: "At Clinic" },
    { value: "home", label: "At home" },
    { value: "phone", label: "Telephone" },
    { value: "video", label: "Video" },
  ];

  const appointmentStatusOptions = [
    { value: "canceled<24h", label: "Canceled < 24h" },
    { value: "delayed", label: "Delayed" },
    { value: "invoiced", label: "Invoiced" },
    { value: "arrived", label: "Arrived" },
    { value: "intreatment", label: "In Treatment" },
    { value: "active", label: "Active" },
  ];

    
        

  const handleInputChange = event => {
    const { name, value } = event.target;
    
    setDatabase({ ...database, [name]: value });
    
  };
  useEffect(() => {
    retrieveRequests();
  }, []);
  const retrieveRequests = () => {
    const id = props.match.params.id;
    ReqForAppointment.get(id)
      .then(response => {
        setDatabase(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
     
  };
  
  useEffect (()=>{
    
 
   
    var Clinics1 =[];
    var clinics=[];
    
      getClinics().then(res =>{
               
       Clinics1.push(res.data);
                
                for (var i=0; i<Clinics1.length; i++) {
                  
                 Clinics1[i].map((res)=>{
                   
                   
                    var element1 = {};
                   
                    element1.id = res.clinics._id;
                    
                    element1.names = res.companyInfo.businessName;
                    clinics.push({element1: element1});
                
                    
                   
                  })
                 
               }
               
               setClinicNames(clinics);
          
            })},[])
            
  
     useEffect (()=>{
        const doctors = [];
     
       
       var Doctors1 =[];
       
         getDoctors().then(res =>{
                  
                   Doctors1.push(res.data);
                   
                   for (var i=0; i<Doctors1.length; i++) {
                     
                     Doctors1[i].map((res)=>{
                       var element = {};
                      
                       element.id = res.doctors._id;
                       element.names = res.doctors["contactName"].last;
                       doctors.push({element: element});
                   
                       
                      
                     })
                    
                  }
                  
                  
                  setDoctorNames(doctors);
                  
                  
             
               })},[])
               const saveEdit = () => {
               
                var Data = {
                  
                  patientNo: database.patientNo,
                  title: database.title,
                  date:database.date ,
                  preferStartTime: database.preferStartTime,
                  preferEndTime:database.preferEndTime,
                  clinicNo:database.clinicNo,
                  appointmentType:database.appointmentType,
                  doctorNo:database.doctorNo,  
                  notePatient:database.notePatient,
                  note:database.note,
                  status:database.status
                 
                };
              
                 
                  const ID = props.match.params.id;
                ReqForAppointment.update(ID,Data)
                
                setSubmitted(true);

                 
              };
              const history = useHistory();

              const newEdit = () => {
                setSubmitted(false);
                history.push("/Appointment/Request/");
                 
              };
                
 
        
  
  return (
    
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You have edited successfully!</h4>
          <Button style={{background:"green", color:"white"}} className="btn btn-success" onClick={newEdit}>
          Ok
          </Button>
        </div>
      )  : (
        <div className="list row">
   <div className="col-md-6">
    
       <div>
         <h4>Request</h4>
         
         
         
          <div className="form-group">
            <label htmlFor="title">Complaint</label>
            <TextField
              type="text"
              className="form-control"
              id="title"
              required
              value={database.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <TextField
            
              type="date"
              className="form-control"
              id="date"
              required
              value={database.date}
              onChange={handleInputChange}
              name="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="preferstarttime">Prefer Start Time</label>
            <TextField
              type="datetime-local"
              className="form-control"
              id="preferstarttime"
              required
              value={database.preferStartTime}
              onChange={handleInputChange}
              name="preferStartTime"
            />
          </div>
          
          <div className="form-group">
          
            <label htmlFor="preferendtime">Prefer End Time </label>
            <TextField
              type="datetime-local"
              className="form-control"
              id="preferendtime"
              
              value={database.preferEndTime}
              onChange={handleInputChange}
              name="preferEndTime"
            />
          </div>
         
          
          <div className="form-group">
          
            <label htmlFor="appointmenttype">AppointmentType</label>
            <select type="text"
              className="form-control"
              id="appointmenttype"
              required
              value={database.appointmentType}
              onChange={handleInputChange}
              name="appointmentType">
   
               <option value="">Select Appointment Type</option>
               {appointmentTypeOptions.map((res)=>(<option value={res.value}>
                 {res.value}
               </option>))}
              </select>
          </div>
          <div className="form-group">
            <label htmlFor="doctorNo">Choose Doctor</label>
            <select
              type="text"
              className="form-control"
              id="doctorNo"
              value={database.doctorNo}
              onChange={handleInputChange}
              name="doctorNo"
            
          >
            <option value="">Choose Doctor</option>
         
   
            {doctornames.map((res)=>(
              <option value={res.element.id}>{res.element.names}</option>
            ))}
          
           

            </select>
           
          </div>
          <div className="form-group">
            <label htmlFor="doctorNo">Choose Clinic</label>
            <select
              type="text"
              className="form-control"
              id="clinicNo"
              value={database.clinicNo}
              onChange={handleInputChange}
              name="clinicNo"
            
          >
            <option value="">Choose Clinic</option>
         
            {/* {doctornames.map(doctorElement => (<option val>{doctorElement.element.names}</option>))} */}
              {clinicnames.map((res)=>(
              <option value={res.element1.id}>{res.element1.names}</option>
            ))}
          
           

            </select>
           
          </div> 
          
           <div className="form-group">
            <label htmlFor="patientnote">PatientNote</label>
            <TextField
              type="text"
              className="form-control"
              id="patientnote"
              required
              value={database.notePatient}
              onChange={handleInputChange}
              name="notePatient"
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Note</label>
            <TextField
              type="text"
              className="form-control"
              id="note"
              required
              value={database.note}
              onChange={handleInputChange}
              name="note"
            />
          </div>
          <div className="form-group">
       
         <label htmlFor="status">Status</label>
         <select type="text"
           className="form-control"
           id="status"
           required
           value={database.status}
           onChange={handleInputChange}
           name="status">

            <option value="">Select Status Type</option>
            {appointmentStatusOptions.map((res)=>(<option value={res.value}>
             {res.value}
            </option>))}

           </select>


       </div>
          <Button 
           className="btn btn-success" style={{background:"green", color:"white"}} onClick={saveEdit}
            >
            Save
          </Button>
        
   
 </div>
 </div> 
 </div>
 )}
  </div>
  );
}
export default RequestAppointmentEdit;


