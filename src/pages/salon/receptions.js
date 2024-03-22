import React,{Component} from 'react';
//import { Link } from 'react-router-dom';
import { Link, withRouter  } from 'react-router-dom';

import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import axios from 'axios';
import {getPatients,deletePatient} from './../../services/patients';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from '../../common/pagination';
import {paginate} from '../../utils/paginate';
import PatientsTable from '../../components/patientsTable.jsx';
import SearchBox from './../../common/searchBox';
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Input, Modal, Label, ModalHeader, ModalBody, Row } from "reactstrap";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";

class ReceptionTable extends Component {
  
  constructor(props) {
		super(props);
      this.state = {
        users:[],
        pageSize: 10,
        currentPage: 1,
        sortColumn:{path:'title',order:'asc'},
        searchQuery: "",
        errors:{},
      }
    
      this.handleDelete = this.handleDelete.bind(this);
    }

  async componentDidMount(){
      const {data} = await getReceptions();
      this.setState({users:data});
    }

  handleDelete = async (user)=>{
 

     ///delete
		const originalUsers = this.state.users;
		const users = this.state.users.filter(User => User._id !== user._id);
		this.setState({users});
		try{
			await http.delete(apiUrl+"/patients/"+ user._id);
		}
		catch(ex){
			//ex.request
			//ex.response

			if(ex.response && ex.response === 404){
				alert("already deleted");
			}
			
			this.setState({users:originalUsers});
		}
    ////
 
  };
 

  //sorting columns
  handleSort = (sortColumn)=>{
    this.setState({sortColumn})
 };
  handlePageChange = (page)=>{
    console.log(page);
    this.setState({currentPage:page});
  
 };
 
 handleSearch = (query)=>{
  console.log(query);
  this.setState({searchQuery:query,currentPage:1});
};


 getDataPgnation= ()=>{
  const {pageSize,currentPage,users:Users,sortColumn,searchQuery} = this.state;
  //
  //filter maybe next time
  let filtered = Users;
  if(searchQuery){
    console.log(searchQuery);
    filtered = Users.filter((el)=> el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  //
   const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);   
  const users = paginate(sorted,currentPage,pageSize);
  return {data:users};
 }

  render(){
    const {length:count} = this.state.users; 
    const {pageSize,currentPage,sortColumn,searchQuery} = this.state;
    //if(count === 0)  return "<p>No data available</p>";
   
    const {data:users} = this. getDataPgnation();


    return(
     
      <div>
			<ol className="breadcrumb float-xl-right">
				<li className="breadcrumb-item"><Link to="/">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/">Tables</Link></li>
				<li className="breadcrumb-item active">Receptions Table</li>
			</ol>
			<h1 className="page-header">Receptions </h1>
			<Panel>
				<PanelHeader>
					Receptions Management
				</PanelHeader>
  
         <React.Fragment>
					 <ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button className="btn btn-default active m-r-5 m-b-5" title="add reception" style={btnStyles}>
								{" "}
								<Link to="/clinic/receptions/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="edit reception" style={btnStyles}>
								{" "}
								<Link
									to={
										this.state.checkedreceptions
											? `/clinic/receptions/${this.state.checkedreceptions[0]}`
											: "/clinic/receptions/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete reception"
								style={btnStyles}
								onClick={() => this.handleMassDelete(this.state.checkedreceptions)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/clinic/receptions/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/clinic/receptions/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/clinic/receptions/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/clinic/receptions/">
									<img style={iconStyles} src={sharingIcon} />
								</Link>{" "}
							</button>
							
						</div>
				<div className="table-responsive">
     
				   <SearchBox value={searchQuery} onChange={this.handleSearch} />           
					<p className="page-header float-xl-left" style={{marginBottom:5},{marginLeft:20},{marginTop:5}}>{count} entries</p> 

				   <ReceptionsTable receptions={receptions} 
				   onDelete={this.handleDelete}
				   onSort={this.handleSort}
				   sortColumn={sortColumn}
				   />
	  </div> 
       
        </React.Fragment>

			 <hr className="m-0" />
			 <PanelBody>
       	<div className="d-flex align-items-center justify-content-center">
           <Pagination 
             itemsCount ={count}
             pageSize={pageSize}
             onPageChange={this.handlePageChange}
             currentPage={currentPage}
           />
				</div>
			 </PanelBody>
			</Panel>
		</div>
  
    )
  }
}

export default ReceptionTable