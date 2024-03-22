import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css'
import { PageSettings } from '../../config/page-settings.js';
import GoogleMapReact from 'google-map-react';
import { Container, Row, Col, Form, Button, Image} from 'react-bootstrap'
import auth from "../../services/authservice";
import {connect} from "react-redux";
import GenderDropDown from '../../components/user/GenderDropDown';
import {loadCurrentUser} from "../../store/users";
import {
    Panel,
    PanelHeader,
    PanelBody,
  } from "../../components/panel/panel.jsx";

import CountryDropDown from '../../components/user/CountryDropDown';
import ReusableTabNavs from "../ticket/ReusableTabNavs";
import ReusableTab from "../ticket/ReusableTab";
import {TabContent} from "reactstrap";
import PhoneInput from 'react-phone-input-2';
import LanguageDropDown from '../../components/user/LanguageDropDown';
import 'react-phone-input-2/lib/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';

class Profile extends React.Component {
	static contextType = PageSettings;

	constructor(props) {
		super(props);

		// this.showTab = this.showTab.bind(this);
		this.state = {
			activeTab: 1,
            currentUser: {},
			tabAbout: true,
			tabBank: false,
			tabInsurance: false,
			tabProfessionalInfo: false,
			tabMembership: false			
		}
	}
	
	async componentDidMount() {
		const user = auth.getProfile();	
		await this.props.loadCurrentUser(user._id);
        const currentUser = await this.props.currentUser;
        this.setState({currentUser});
		this.context.handleSetPageContentFullHeight(true);
		this.context.handleSetPageContentFullWidth(true);
		this.setState({officePhone: ""});
		this.setState({birthDate: currentUser?.dateBirth.substring(0,10)});
		this.setState({country:""});
	}

	setActiveTab = (n) => this.setState({ activeTab: n });

	componentWillUnmount() {
		this.context.handleSetPageContentFullHeight(false);
		this.context.handleSetPageContentFullWidth(false);
	}
	
	render() {
		const {currentUser} = this.state;
		//console.log(this.state);
		return (
			<div>
				<div className="profile">
					<div className="profile-header">
						<div className="profile-header-cover"></div>
						<div className="profile-header-content">
							<div className="profile-header-img">
        						<img src={currentUser?.imageSrc} alt="" /> 
							</div>
							<div className="profile-header-info">
								<div>
									<h4 className="m-t-10 m-b-5">{`${currentUser?.contactName?.first} ${currentUser?.contactName?.last}`}</h4>
									<p className="m-b-10">Function</p>
								</div>
								<div className="profile-bottom">
									<div className="profile-child">
										<GenderDropDown
											selectedValue={currentUser?.gender}
											options={[
												{value: "male" , label: "Male"},
												{value: "female" , label: "Female"},
												{value: "transgender" , label: "Transgender"}
											]}
											name="gender"
										/>
									</div>
									<div className="profile-child flex">
										<label for="birthDate">Date of Birth</label>
										<input value={this.state.birthDate} type="date" name="birthDate" id="birthDate" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Panel>
					<PanelHeader noButton>Profile</PanelHeader>
					<PanelBody>
						<ReusableTabNavs
							actions={this.actions}
							setActiveTab={(n) => this.setActiveTab(n)}
							activeTab={this.state.activeTab}
							navprops={[
							  { label: "About", background: "#FFC69F" },
							  { label: "Bank", background: "#DED99F" },
							  { label: "Insurance", background: "#FFC6FF" },
							  { label: "Professional Info", background: "#FFF5AD" },
							  { label: "Membership", background: "#A2F5AD" },
							]}
						/>
						<TabContent activeTab={this.state.activeTab}>
							<ReusableTab id={1}>
								<div className="table-responsive form-inline">
										<table className="table table-profile">
											<tbody>
												<tr className="highlight">
													<td className="field">Mood</td>
													<td><Link to="/user/profile">Add Mood Message</Link></td>
												</tr>
												<tr className="divider">
													<td colSpan="2"></td>
												</tr>
												<tr>
													<td className="field valign-middle">Mobile</td>
													<td>
														<PhoneInput
															country={'nl'}
															value={this.state.currentUser?.phones?.mobile? this.state.currentUser.phones.mobile:""}
															onChange={_Phone => this.setState({currentUser:{
																...this.state.currentUser,
																phones:{...this.state.currentUser.phones, mobile: _Phone}
															}})}
														/>
													</td>
												</tr>
												<tr>
													<td className="field valign-middle">Home</td>
													<td>
														<PhoneInput
															country={'nl'}
															value={this.state.currentUser?.phones?.phone? this.state.currentUser.phones.phone:""}
															onChange={_Phone => this.setState({currentUser:{
																...this.state.currentUser,
																phones:{...this.state.currentUser.phones, phone: _Phone}
															}})}
														/>
													</td>
												</tr>
												<tr>
													<td className="field valign-middle">Office</td>
													<td>
														<PhoneInput
														country={'nl'}
														value={this.state.officePhone}
															onChange={officePhone => this.setState({officePhone})}
														/>
													</td>
												</tr>
												<tr className="divider">
													<td colSpan="2"></td>
												</tr>
												<tr className="highlight">
													<td className="field">About Me</td>
													<td><Link to="/user/profile">Add Description</Link></td>
												</tr>
												<tr className="divider">
													<td colSpan="2"></td>
												</tr>
											
													</tbody>
												</table>
												<div className="_main">
													<div className="_row">
														<div className="address">
															<label className="field" htmlFor="Address1">Address1</label>
															<input type="text" name="Address1" id="Address1" value={
																this.state.currentUser?.Address?.address1? this.state.currentUser.Address.address1:''
																}
																onChange={(e) => {
																	this.setState({currentUser:{
																		...this.state.currentUser,
																		Address:{...this.state.currentUser.Address, address1:e.target.value}
																	}})
																}} />
														</div>
														<div className="address">
															<label className="field" htmlFor="Address2">Address2</label>
															<input type="text" name="Address2" id="Address2" value={
																this.state.currentUser?.Address?.address2? this.state.currentUser.Address.address2:''
																}
																onChange={(e) => {
																	this.setState({currentUser:{
																		...this.state.currentUser,
																		Address:{...this.state.currentUser.Address, address2:e.target.value}
																	}})
																}} />
														</div>
															
														<div className="address">
															<label className="field" htmlFor="Address3">Address3</label>
															<input type="text" name="Address3" id="Address3" value={
																this.state.currentUser?.Address?.address3? this.state.currentUser.Address.address3:''
																}
																onChange={(e) => {
																	this.setState({currentUser:{
																		...this.state.currentUser,
																		Address:{...this.state.currentUser.Address, address3:e.target.value}
																	}})
																}} />
														</div>
													</div>
													<div className="_row">
														<div className="address">
															<label className="field" htmlFor="zip-code">Zip-code</label>
															<input type="text" name="zip-code" id="zip-code" value={
																this.state.currentUser?.Address?.zip? this.state.currentUser.Address.zip:''
																}
																onChange={(e) => {
																	this.setState({currentUser:{
																		...this.state.currentUser,
																		Address:{...this.state.currentUser.Address, zip:e.target.value}
																	}})
																}} />
														</div>
															
														<div className="address">
															<label className="field" htmlFor="city">City</label>
															<input type="text" name="city" id="city" value={
																this.state.currentUser?.Address?.city? this.state.currentUser.Address.city:''
																}
																onChange={(e) => {
																	this.setState({currentUser:{
																		...this.state.currentUser,
																		Address:{...this.state.currentUser.Address, city:e.target.value}
																	}})
																}} />
														</div>
															
														<div className="address">
															<label className="field" htmlFor="state">State</label>
															<input type="text" name="state" id="state" value={
																this.state.currentUser?.Address?.state? this.state.currentUser.Address.state:''
																}
																onChange={(e) => {
																	this.setState({currentUser:{
																		...this.state.currentUser,
																		Address:{...this.state.currentUser.Address, state:e.target.value}
																	}})
																}} />
														</div>
													</div>
												</div>
										<table className="table table-profile">
											<tbody>
												<tr className="divider">
													<td colSpan="2"></td>
												</tr>
												<tr>
													<td className="field">Country</td>
													<td>
														<div className="country">
															
														<CountrySelect
															value={this.state.country? this.state.country: ""}
															onChange={(e) => {
																if(!e) return;
																this.setState({currentUser:{
																	...this.state.currentUser,
																	Address:{...this.state.currentUser.Address, country:e.name}
																}});
																this.setState({country: e})
															}}
														/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="field valign-middle">Language</td>
													<td>
														<LanguageDropDown/>
													</td>
												</tr>
												<tr className="divider">
													<td colSpan="2"></td>
												</tr>
												<tr className="highlight">
													<td className="field">&nbsp;</td>
													<td className="p-t-10 p-b-10">
														<button type="submit" className="btn btn-primary width-65">Update</button>
														<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
							</ReusableTab>
							<ReusableTab id={2}>
							<div className="table-responsive form-inline">
								<table className="table table-profile">
									<tbody>
										<tr>
											<td className="field">IBAN</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Bank</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Branch of Bank</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Currency</td>
												<div className="form-group row m-b-15">
													<div className="col-md-9">
														<select className="form-control">
															<option>Euro €</option>
															<option>USD $</option>
															<option>CNY ¥</option>															
															<option>GBP £</option>
															<option>AUD $</option>
															<option>CAD $</option>
															<option>HKD $</option>
															<option>ILS ₪</option>
															<option>JPY ¥</option>															
															<option>KRW ₩</option>
															<option>CHF </option>
															<option>MXN $</option>																														
															<option>QAR ﷼</option>																																													
															<option>RUB руб</option>
															<option>SAR ﷼</option>
															<option>INR Rp</option>															
															<option>TRY TL</option>
															<option>VND ₫</option>
															<option>BRL R$</option>
															<option>AZR R</option>
															<option>SGD $</option>															
														</select>
													</div>
												</div>
											
											<td>
											</td>
										</tr>
										<tr className="highlight">
											<td className="field">&nbsp;</td>
											<td className="p-t-10 p-b-10">
												<button type="submit" className="btn btn-primary width-65">Update</button>
												<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
								
							</ReusableTab>
							<ReusableTab id={3}>
								<div className="table-responsive form-inline">
									<table className="table table-profile">
										<tbody>
											<tr>
												<td className="field">Primairy Insurance</td>
												<td>Los Angeles</td>
											</tr>
											<tr>
												<td className="field">Primairy Insurance No</td>
												<td>Los Angeles</td>
											</tr>
											<tr>
												<td className="field">Secondairy Insurance</td>
												<td>Los Angeles</td>
											</tr>
											<tr>
												<td className="field">Secondairy Insurance No</td>
												<td>Los Angeles</td>
											</tr>
											<tr className="highlight">
												<td className="field">&nbsp;</td>
												<td className="p-t-10 p-b-10">
													<button type="submit" className="btn btn-primary width-65">Update</button>
													<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

							</ReusableTab>
							<ReusableTab id={4}>
								<div className="table-responsive form-inline">
									<table className="table table-profile">
										<tbody>
											<tr className="highlight">
												<td className="field">Business Name</td>
												<td><Link to="/user/profile">Business Name</Link></td>
											</tr>
											<tr>
												<td className="field">Industry</td>
												<td><Link to="/user/profile">Industry</Link></td>
											</tr>
											<tr>
												<td className="field">Size</td>
												<td><Link to="/user/profile">Size</Link></td>
											</tr>
											<tr>
												<td className="field">Website</td>
												<td><Link to="/user/profile">Add Webpage</Link></td>
											</tr>
											
											<tr className="divider">
												<td colSpan="2"></td>
											</tr>
											<tr>
												<td className="field">Healthcare Provider Identifier Organisation</td>
												<td><Link to="/user/profile">42452525</Link></td>
											</tr>
											<tr>
												<td className="field">Healthcare Provider Identifier Individual</td>
												<td><Link to="/user/profile">HPII</Link></td>
											</tr>
											<tr>
												<td className="field">Treatments</td>
												<td><Link to="/user/profile">Treatments</Link></td>
											</tr>
											<tr>
												<td className="field">LicenseNo</td>
												<td><Link to="/user/profile">Add LicenseNo</Link></td>
											</tr>
											
											<tr>
												<td className="field">License Valid Till</td>
												<td>Date of valid</td>
											</tr>
											
											<tr className="highlight">
												<td className="field">&nbsp;</td>
												<td className="p-t-10 p-b-10">
													<button type="submit" className="btn btn-primary width-65">Update</button>
													<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

							</ReusableTab>
							<ReusableTab id={5}>
								<div className="table-responsive form-inline">
									<table className="table table-profile">
										<tbody>
											<tr className="highlight">
												<td className="field">Organization A Name</td>
												<td><Link to="/user/profile">Add Name of Organization A</Link></td>
											</tr>
											<tr>
												<td className="field">Organization A Member-No</td>
												<td><Link to="/user/profile">Add Member-No Organization A</Link></td>
											</tr>
											<tr className="highlight">
												<td className="field">Organization B Name</td>
												<td><Link to="/user/profile">Add Name of Organization B</Link></td>
											</tr>
											<tr>
												<td className="field">Organization B Member-No</td>
												<td><Link to="/user/profile">Add Member-No of Organization B</Link></td>
											</tr>
											<tr className="highlight">
												<td className="field">&nbsp;</td>
												<td className="p-t-10 p-b-10">
													<button type="submit" className="btn btn-primary width-65">Update</button>
													<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

							</ReusableTab>
						</TabContent>
					</PanelBody>
				</Panel>
			</div>
		)
	}
}



//export default Profile;
const mapStateToProps = state => ({
	currentUser: state.entities.users.currentUser,
	});
	const mapDispatchToProps = dispatch => ({
	loadCurrentUser: id => dispatch(loadCurrentUser(id))

	});
export default connect(mapStateToProps,mapDispatchToProps)(Profile);