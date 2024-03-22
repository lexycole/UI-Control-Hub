import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';

import ReqForAppointment from "../../services/reqforappointments";


import {
  
  useHistory 
} from "react-router-dom";

import {getDoctors} from "../../services/doctors";
import {getClinics} from "../../services/clinics";
import {getPatients} from "../../services/patients";



const ReqAppointment = () => {


  
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  // const [searchTitle, setSearchTitle] = useState("");
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

    
        
  
  const initialRequestState = {
    patientNo: null,
    title: "",
    date:  Date(),
    preferStartTime: "",
    preferEndTime:"",
    clinicNo:"",
    appointmentType:"",
    doctorNo:"",
    
    notePatient:"",
    note:"",
    status:""
    
  };
  const [request, setRequest] = useState(initialRequestState);

  const [submitted, setSubmitted] = useState(false);
  const [clinicnames , setClinicNames] = useState([]);
  const [doctornames , setDoctorNames] = useState([]);
  const [patientnames , setPatientNames] = useState([]);
  
   
  const handleInputChange = event => {
    const { name, value } = event.target;
    
    setRequest({ ...request, [name]: value });
    
  };

  

  
    
       
 
 const history = useHistory();

  const newpage = () => {
    setSubmitted(false);
    
    retrieveRequests();
     
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

              useEffect (()=>{
                const patients = [];
             
               
               var patients1 =[];
               
                 getPatients().then(res =>{
                          
                          patients1.push(res.data);
                           
                           for (var i=0; i<patients1.length; i++) {
                             
                            patients1[i].map((res)=>{
                               var element = {};
                             
                               element.id = res.patients._id;
                               element.names = res.patients.username
                               patients.push({element: element});
                              
                             })
                            
                          }
                         
                          
                          setPatientNames(patients);
                          
                          
                     
                       })},[])
   

 const requestlists =()=>{
  history.push("/Edit/"+currentRequest._id); 
 }
 
 const deleterequests =()=>{
  
  ReqForAppointment.remove(currentRequest._id);
  //history.push("/"); 
  console.log("======")
  console.log("DELETING")
  retrieveRequests();
  
 }
  
  useEffect(() => {
    retrieveRequests();
  }, []);
 
  const onChangeSearchTitle = e => {
    if(e.target.value == 0){
     retrieveRequests();
    }
    
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    var array =[];
    ReqForAppointment.getAll()
      .then(response => {
        array.push(response.data);
        
        
           for (var index = 0; index < array.length; index++) {
             array[index].map((res)=>{
               if(res.title === searchTitle){
               
              console.log([res]);
              setRequests([res]);
            }
             });
             
           }
         
           })
          
      
      .catch(e => {
        console.log(e);
      });
      
  };
 
  const retrieveRequests = () => {
    ReqForAppointment.getAll()
      .then(response => {
       
        
        setRequests(response.data);
       
      })
      .catch(e => {
        console.log(e);
      });
  };
 
  const setActiveRequest = (request, index) => {
    setCurrentRequest(request);
    setCurrentIndex(index);
  };
  const saveRequest = () => {
    var patientID ;
    console.log(request.patientNo);
    console.log(patientnames);
    
   patientnames.map((res)=>{
     if(res.element.names == request.patientNo
      ){
        patientID = res.element.id;
     }

   })
  
   
   var data = {
     
     patientNo: patientID,
     title: request.title,
     date:request.date ,
     preferStartTime: request.preferStartTime,
     preferEndTime:request.preferEndTime,
     clinicNo:request.clinicNo,
     appointmentType:request.appointmentType,
     doctorNo:request.doctorNo,
     
     notePatient:request.notePatient,
     note:request.note,
     status:request.status,
    
   };
  
   
//    history.push("/Appointment/Request");
   ReqForAppointment.create(data)
   .then(response => {
    
       
        
        setRequest({      
         patientNo: response.data.patientNo,
         title: response.data.title,
         date:response.data.date,
         preferStartTime: response.data.preferStartTime,
         preferEndTime:response.data.preferEndTime,
         clinicNo:response.data.clinicNo,
         appointmentType:response.data.appointmentType,
         doctorNo:response.data.doctorNo,
         
         notePatient:response.data.notePatient,
         note:response.data.note,
         status:response.data.status
        
         
       });
       console.log(response.data);
       setSubmitted(true);
       console.log(response.data);
     })
     .catch(e => {
       console.log(e);
     });
     
    
    //  retrieveRequests();
   };

  
  return (
    
    <FormControl fullWidth>
    <div className="list row">
    
       <div className="col-md-8">
        
        <div   class="col-xs-9">
          <TextField
            type="text"
            class="form-control"
            placeholder="Search by Complaint Title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
            
          />
         
        </div>
      </div> 
      <div className="col-md-6"  style={{paddingTop:"30px"}}>
        <h2>Requests For Appointments</h2>
        <ul className="list-group">
          {requests &&
            requests.map((request, index) => (
              <li style={{paddingBottom:"20px"}}
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveRequest(request, index)}
                key={index}
              
              >
                 
                {request.title}
              </li>
            ))}
            <br />
            
           
      <Button   type="button"  class="btn" class="btn btn-success"
       data-toggle="modal" data-target="#myModal"
      >
         Add Request</Button>
      
     
           
  
                  
        </ul>
       
            
         
 
      </div>
      <div className="col-md-6">
        {currentRequest ? (
          <div>
            <h4 style={{paddingTop:"45px"}}>Request</h4>
            <div>
              <label>
                <strong>Complaint Title:</strong>
              </label>{" "}
              {currentRequest.title}
             
            </div>
            <div>
              <label>
                <strong>preferStartTime:</strong>
              </label>{" "}
              {currentRequest.preferStartTime}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentRequest.status}
            </div>
            
            <Button
              onClick={requestlists}
              class="btn btn-warning"
              style={{marginRight:"5px"}}
              
            >
              Edit
            </Button>
            
              <Button 
              onClick= {deleterequests}
              class="btn btn-danger"
              style={{marginLeft:"5px"}}
              >
              Delete
            </Button>
           
          </div>
          
        ) : (
          <div>
            <br />
            <h4 style={{color: "green", paddingTop:"30px"}} >Please click on a Request To View</h4>
          </div>)
}

        
      </div>   
      <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

  
    <div class="modal-content">
      <div class="modal-header">
      <h2 class="modal-title">Add Request</h2>
        <Button type="button" class="close" data-dismiss="modal"> &times; </Button>
        
      </div>
      <div class="modal-body">
      <div className="submit-form">
   
      
       
         
    
      
   {submitted ? (
     <div>
       <h4>You submitted successfully!</h4>
       <Button className="btn btn-success" data-dismiss="modal"  onClick={newpage}>
       Ok
       </Button>
     </div>
   ) : (
     <div>
       <div className="form-group">
         <label htmlFor="patientNo">Patient-Username</label>
        
          
           <TextField
           type="string"
           id="patientNo"
           className="form-control"
           required
           value={request.patientNo}
           onChange={handleInputChange}
           name="patientNo"/>
        
        
       </div>
       <div className="form-group">
         <label htmlFor="title">Complaint</label>
         <TextField
           type="text"
           className="form-control"
           id="title"
           required
           value={request.title}
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
           value={request.date}
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
           value={request.preferStartTime}
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
           
           value={request.preferEndTime}
           onChange={handleInputChange}
           name="preferEndTime"
         />
       </div>
      
       
       <div className="form-group">
       
         <label>AppointmentType</label>
         <select type="text"
           className="form-control"
           value={request.appointmentType}
           onChange={handleInputChange}
           name="appointmentType">

            <option  value="">Select Appointment Type</option>
            
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
           value={request.doctorNo}
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
           value={request.clinicNo}
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
           value={request.notePatient}
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
           value={request.note}
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
           value={request.status}
           onChange={handleInputChange}
           name="status">

            <option value="">Select Status Type</option>
            {appointmentStatusOptions.map((res)=>(<option value={res.value}>
             {res.value}
            </option>))}

           </select>


       </div>
       




       
       
       
         
      

       
      
       
     
       <div class="modal-footer">
      <Button  onClick={saveRequest} type="button"  class="btn "  
              class="btn btn-success">Submit</Button>
      
         </div></div>

   )}


 </div>
 
      </div>
      
    </div>

  </div>
</div>
    </div>
    </FormControl>
   
    
  
  );

  
};

export default ReqAppointment;
