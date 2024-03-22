import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/default/pillsnav.css" 
import http from "./../../services/httpService";
import { getUsers, deleteUser } from "./../../services/users";
import { apiUrl } from "./../../config/config.json";

import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import printIcon from "../../assets/Icons/printer-xxl.svg";
import lockIcon from "../../assets/Icons/lock.svg";
import unlockIcon from "../../assets/Icons/unlock.svg";
import banIcon from "../../assets/Icons/ban.svg";
import unbanIcon from "../../assets/Icons/unban.svg";
import emailIcon from "../../assets/Icons/email.svg";
import messageIcon from "../../assets/Icons/message.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import importIcon from "../../assets/Icons/import.svg";
import copy2clipboardIcon from "../../assets/Icons/copy2clipboard.svg";


class Ticketsa extends React.Component {
	
	render() {
		return (
			<div>
				<div className="d-flex align-items-center mb-3">
					<div>
						<h1 className="page-header mb-0">Tickets</h1>
					</div>
				</div>
			
				<div className="mb-3 d-sm-flex fw-bold">
					<div className="mt-sm-0 mt-2"><Link to="/clinic/users/new"href="#" className="text-dark text-decoration-none"><i className="fa fa-plus fa-fw me-1 text-dark text-opacity-50" title="Add user"></i> Add</Link></div>				
					<div className="mt-sm-0 mt-2"><Link to="/user/usersa"href="#" className="text-dark text-decoration-none"><i className="fa fa-eye fa-fw me-1 text-dark text-opacity-50" title="View user"></i> View</Link></div>
					<div className="mt-sm-0 mt-2"><Link to="/user/usersa"href="#" className="text-dark text-decoration-none"><i className="fa fa-pencil fa-fw me-1 text-dark text-opacity-50" title="Edit user"></i> Edit</Link></div>				
					<div className="mt-sm-0 mt-2"><Link to="/user/usersa"href="#" className="text-dark text-decoration-none"><i className="fa fa-trash fa-fw me-1 text-dark text-opacity-50" title="Delete user"></i> Delete</Link></div>
					<div className="mt-sm-0 mt-2"><Link to="/user/usersa"href="#" className="text-dark text-decoration-none"><i className="fa fa-lock fa-fw me-1 text-dark text-opacity-50" title="Ban/Lock user"></i> Lock</Link></div>				
					<div className="mt-sm-0 mt-2"><Link to="/user/usersa"href="#" className="text-dark text-decoration-none"><i className="fa fa-unlock fa-fw me-1 text-dark text-opacity-50" title="Unlock/Unban user"></i> Unlock</Link></div>
					
					<div className="ms-sm-4 ps-sm-1 mt-sm-0 mt-2 dropdown-toggle">
						<Link to="/user/usersa"href="#" data-bs-toggle="dropdown" className="text-dark text-decoration-none"><i className="fa fa-download fa-fw me-1 text-dark text-opacity-50"></i> Export <b className="caret"></b></Link>
						<div className="dropdown-menu">
							<Link to="/user/usersa"className="dropdown-item" title="Save as Excel">Excel</Link>
							<Link to="/user/usersa"className="dropdown-item" title="Save as CSV">CSV</Link>
							<Link to="/user/usersa"className="dropdown-item" title="Save as PDF">PDF</Link>
						</div>
					</div>
					<div className="ms-sm-4 ps-sm-1 mt-sm-0 mt-2"><Link to="/user/usersa"href="#" className="text-dark text-decoration-none"><i className="fa fa-upload fa-fw me-1 text-dark text-opacity-50"></i> Import</Link></div>
				</div>
			
				<div className="card border-0">
					<ul className="nav nav-pills nav-pills-v2 px-3">
						<li className="nav-item Active"><Link to="/ticket/usersa" className="nav-link active px-2">Active</Link></li>
						<li className="nav-item Archived"><Link to="/ticket/usersa" className="nav-link px-2">Archived</Link></li>						
						<li className="nav-item All"><Link to="/ticket/usersa" className="nav-link px-2">All</Link></li>
						<li className="nav-item Deleted"><Link to="/ticket/trash" className="nav-link px-2"><i className="fa fa-trash fa-fw me-1 text-dark text-opacity-50" title="Wastebasket of Tickets"></i></Link></li>																			
					</ul>
					<div className="tab-content p-3">
						<div className="tab-pane fade show active" id="allTab">
							<div className="input-group mb-3">
								<button className="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category <b className="caret"></b></button>
								<div className="dropdown-menu">
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-red me-1 mb-1">Complaint</button></Link>
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-orange me-1 mb-1">Bug-error</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-yellow me-1 mb-1">Disconnection</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-blue me-1 mb-1">Feature-request</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-lime me-1 mb-1">Sales</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-blue me-1 mb-1">Orders</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-gray me-1 mb-1">Other</button></Link>									
								</div>
								<button className="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Priority <b className="caret"></b></button>
								<div className="dropdown-menu">
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-blue me-1 mb-1">Low</button></Link>
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-info me-1 mb-1">Normal</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-pink me-1 mb-1">High</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-red me-1 mb-1">Urgent</button></Link>									
								</div>
								<button className="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Status<b className="caret"></b></button>
								<div className="dropdown-menu">
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-green me-1 mb-1">Active</button></Link>
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-orange me-1 mb-1">Re-open</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-lime me-1 mb-1">New</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-indigo me-1 mb-1">Solved</button></Link>																		
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-gray me-1 mb-1">Archived</button></Link>									
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-pink me-1 mb-1">For Testing</button></Link>																		
									<Link to="/user/usersa"className="dropdown-item"><button type="button" className="btn btn-purple me-1 mb-1">Pending</button></Link>									
								</div>
								
								<div className="flex-fill position-relative">
									<div className="input-group">
										<div className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 pe-0" style={{zIndex: 10}}>
											<i className="fa fa-search opacity-5"></i>
										</div>
										<input type="text" className="form-control ps-35px bg-light" placeholder="Search users..." />
									</div>
								</div>
								<ul className="nav nav-pills nav-pills-v2 px-3">
									<li className="nav-item"><Link to="/user/usersa" className="nav-link active px-2"><i className="fa fa-th fa-fw me-1 text-dark text-opacity-50" title="Grid View of Tickets"></i></Link></li>
								</ul>
							</div>
							
							<div className="table-responsive">
								<table className="table table-hover text-nowrap">
									<thead>
										<tr>
											<th className="pt-0 pb-2"></th>
											<th className="pt-0 pb-2">Username</th>
											<th className="pt-0 pb-2">Email</th>
											<th className="pt-0 pb-2">Gender</th>											
											<th className="pt-0 pb-2">FirstName</th>
											<th className="pt-0 pb-2">Initials</th>
											<th className="pt-0 pb-2">Lastname</th>
											<th className="pt-0 pb-2">DOB</th>
											<th className="pt-0 pb-2">Address 1</th>
											<th className="pt-0 pb-2">Address 2</th>											
											<th className="pt-0 pb-2">Address 3</th>											
											<th className="pt-0 pb-2">Zipcode</th>											
											<th className="pt-0 pb-2">City</th>											
											<th className="pt-0 pb-2">State</th>																						
											<th className="pt-0 pb-2">Country</th>																						
											<th className="pt-0 pb-2">Phone</th>
											<th className="pt-0 pb-2">Mobile</th>											
											<th className="pt-0 pb-2">Skype</th>											
											<th className="pt-0 pb-2">Profile</th>																						
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product1" />
													<label className="form-check-label" for="product1"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-6.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Elon Musk</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">elon@tesla.com</td>
											<td className="align-middle"><button type="button" className="btn btn-blue me-1 mb-1">Male</button></td>
											<td className="align-middle"><button type="button" className="btn btn-green me-1 mb-1">Active</button></td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product2" />
													<label className="form-check-label" for="product2"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-7.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Marilyn Monroe</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">marilyn@hollywood.com</td>
											<td className="align-middle"><button type="button" className="btn btn-pink me-1 mb-1">Female</button></td>
											<td className="align-middle"><button type="button" className="btn btn-red me-1 mb-1">Banned</button></td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product3" />
													<label className="form-check-label" for="product3"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-8.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Jeff Bezos</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">Jeff@amazon.com</td>
											<td className="align-middle"><button type="button" className="btn btn-blue me-1 mb-1">Male</button></td>
											<td className="align-middle"><button type="button" className="btn btn-yellow me-1 mb-1">Pending</button></td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product4" />
													<label className="form-check-label" for="product4"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-9.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Leonardo Di Caprio</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">leonardo@hollywood.com</td>
											<td className="align-middle">Male</td>
											<td className="align-middle"><button type="button" className="btn btn-gray me-1 mb-1">Archived</button></td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product5" />
													<label className="form-check-label" for="product5"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-10.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Scarlett Johansson</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">scarlett@hollywood.com</td>
											<td className="align-middle"><button type="button" className="btn btn-gray me-1 mb-1">Transgender</button></td>
											<td className="align-middle">Skate</td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product6" />
													<label className="form-check-label" for="product6"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-11.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Teen Fashion T-shirt (Black)</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">30 in stock for 4 variants</td>
											<td className="align-middle">T-Shirt</td>
											<td className="align-middle">Tulsa</td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product7" />
													<label className="form-check-label" for="product7"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-12.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Levis Blue Jeans</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">49 in stock for 8 variants</td>
											<td className="align-middle">Jeans</td>
											<td className="align-middle">Levis</td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product8" />
													<label className="form-check-label" for="product8"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-13.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Boots (White Color)</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">19 in stock for 1 variants</td>
											<td className="align-middle">Sports</td>
											<td className="align-middle">Nike</td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product9" />
													<label className="form-check-label" for="product9"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-14.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Hiking Boots</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">94 in stock for 1 variants</td>
											<td className="align-middle">Sports</td>
											<td className="align-middle">Skate</td>
										</tr>
										<tr>
											<td className="w-10px align-middle">
												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="product10" />
													<label className="form-check-label" for="product10"></label>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
														<img alt="" className="mw-100 mh-100" src="/assets/img/product/product-15.jpg" />
													</div>
													<div className="ms-3">
														<Link to="/user/usersa"href="#" className="text-dark text-decoration-none">Dress (Pink)</Link>
													</div>
												</div>
											</td>
											<td className="align-middle">23 in stock for 5 variants</td>
											<td className="align-middle">Dress</td>
											<td className="align-middle">Sktoe</td>
										</tr>
									</tbody>
								</table>
							</div>
						
							<div className="d-md-flex align-items-center">
								<div className="me-md-auto text-md-left text-center mb-2 mb-md-0">
									Showing 1 to 10 of 57 entries
								</div>
								<ul className="pagination mb-0 justify-content-center">
									<li className="page-item disabled"><Link to="/user/usersa"className="page-link">Previous</Link></li>
									<li className="page-item"><Link to="/user/usersa"className="page-link">1</Link></li>
									<li className="page-item active"><Link to="/user/usersa"className="page-link">2</Link></li>
									<li className="page-item"><Link to="/user/usersa"className="page-link">3</Link></li>
									<li className="page-item"><Link to="/user/usersa"className="page-link">4</Link></li>
									<li className="page-item"><Link to="/user/usersa"className="page-link">5</Link></li>
									<li className="page-item"><Link to="/user/usersa"className="page-link">6</Link></li>
									<li className="page-item"><Link to="/user/usersa"className="page-link">Next</Link></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="card-arrow">
						<div className="card-arrow-top-left"></div>
						<div className="card-arrow-top-right"></div>
						<div className="card-arrow-bottom-left"></div>
						<div className="card-arrow-bottom-right"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default Ticketsa;