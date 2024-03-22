import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
//import routes from './../../config/page-route.jsx';
import { PageSettings } from "./../../config/page-settings.js";
//import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./../../common/ProtectedRoute";
import PublicRoute from "./../../common/PublicRoute";
////////////////////////////////////////////////////////////////////
import YourDrive from "./../../pages/drive/yourdrive.js";
//import TCMSession from "./../../pages/clinic/tcmsession.js";
import DashboardV2 from "./../../pages/dashboard/dashboardV2.js";
//import Dashboard-TCM from "./../../pages/dashboard/dashboard-TCM.js";
//import DashboardV3 from './../../pages/dashboard/dashboard-v3.js';
import Company from "./../../pages/crm/company.js";
import CompanyTable from "./../../pages/crm/companies.js";
import Bootstrap4 from "./../../pages/bootstrap/bootstrap-4.js";
import EmailCompose from "./../../pages/email/email-compose.js";
import EmailDetail from "./../../pages/email/email-detail.js";
import EmailInbox from "./../../pages/email/email-inbox.js";
import FormElements from "./../../pages/form/form-elements.js";
import FormPlugins from "./../../pages/form/form-plugins";
import FormWizards from "./../../pages/form/form-wizards.js";
import PosCounterCheckout from "./../../pages/pos/counter-checkout.js";
import PosCustomerOrder from "./../../pages/pos/customer-order.js";
import PosKitchenOrder from "./../../pages/pos/kitchen-order.js";
import PosMenuStock from "./../../pages/pos/menu-stock.js";
import PosTableBooking from "./../../pages/pos/table-booking.js";
import TableBasic from "./../../pages/table/table-basic.js";
import Table from "./../../pages/table/table-data.js";
import UIButtons from "./../../pages/ui/ui-buttons.js";
import UIGeneral from "./../../pages/ui/ui-general.js";
import UIIcons from "./../../pages/ui/ui-icons.js";
import UIIonicons from "./../../pages/ui/ui-ionicons.js";
import UILanguageBarIcon from "./../../pages/ui/ui-language-bar-icon.js";
import UIMediaObject from "./../../pages/ui/ui-media-object.js";
import UIModalNotification from "./../../pages/ui/ui-modal-notification.js";
import UISimpleLineIcons from "./../../pages/ui/ui-simple-line-icons.js";
import UISocialButtons from "./../../pages/ui/ui-social-buttons.js";
import UITabsAccordion from "./../../pages/ui/ui-tabs-accordion.js";
import UITypography from "./../../pages/ui/ui-typography.js";
import UIWidgetBoxes from "./../../pages/ui/ui-widget-boxes.js";
import Widgets from "./../../pages/widget/widget.js";
//import ChartJS from "./../../pages/chart/chart-js.js";
import Calendar from "./../../pages/calendar/calendar.js";
//import SchedulerfCal from "./../../pages/calendar/newscheduler.js";
import SchedulerCal from "./../../pages/calendar/scheduler.js";
import ChartApex from "./../../pages/chart/chart-apex.js";
import ChartD3 from "./../../pages/chart/chart-d3.js";
import ExtraComingSoon from "./../../pages/extra/extra-coming-soon.js";
import ExtraCookieAcceptanceBanner from "./../../pages/extra/extra-cookie-acceptance-banner.js";
import ExtraError from "./../../pages/extra/extra-error.js";
import ExtraInvoice from "./../../pages/extra/extra-invoice.js";
import ExtraScrumBoard from "./../../pages/extra/extra-scrum-board.js";
import ExtraSearch from "./../../pages/extra/extra-search.js";
import ExtraTimeline from "./../../pages/extra/extra-timeline.js";
import Gallery from "./../../pages/gallery/gallery.js";
import Map from "./../../pages/map/map.js";
import PageBoxedLayoutWithMixedMenu from "./../../pages/option/page-boxed-layout-with-mixed-menu.js";
import PageFullHeight from "./../../pages/option/page-full-height.js";
import PageWithBoxedLayout from "./../../pages/option/page-with-boxed-layout.js";
import PageWithFooter from "./../../pages/option/page-with-footer.js";
import PageWithLightSidebar from "./../../pages/option/page-with-light-sidebar.js";
import PageWithMegaMenu from "./../../pages/option/page-with-mega-menu.js";
import PageWithMinifiedSidebar from "./../../pages/option/page-with-minified-sidebar.js";
import PageWithMixedMenu from "./../../pages/option/page-with-mixed-menu.js";
import PageWithRightSidebar from "./../../pages/option/page-with-right-sidebar.js";
import PageWithSearchSidebar from "./../../pages/option/page-with-search-sidebar.js";
import PageWithTopMenu from "./../../pages/option/page-with-top-menu.js";
import PageWithTransparentSidebar from "./../../pages/option/page-with-transparent-sidebar.js";
import PageWithTwoSidebar from "./../../pages/option/page-with-two-sidebar.js";
import PageWithWideSidebar from "./../../pages/option/page-with-wide-sidebar.js";
import PageWithoutSidebar from "./../../pages/option/page-without-sidebar.js";
import Profile from "./../../pages/user/profile.js";
//import LoginV1 from './../../pages/user/login-v1.js';
import LoginV2 from "../../pages/user/login.js";
import AppointmentProfile from './../../pages/calendar/AppointmentProfile';
import Accountant from "./../../pages/clinic/accountant.js";
import AccountantTable from "./../../pages/clinic/accountants.js";
import ClinicSolo from "./../../pages/clinic/clinicsolo.js";
import ClinicSoloTable from "./../../pages/clinic/clinicsolos.js";
import Doctor from "./../../pages/clinic/doctor.js";
import DoctorTable from "./../../pages/clinic/doctors.js";
import Patient from "./../../pages/clinic/patient.js";
import PatientTable from "./../../pages/clinic/patients.js";
import Reception from "./../../pages/clinic/reception.js";
import ReceptionTable from "./../../pages/clinic/receptions.js";
import User from "./../../pages/clinic/user.js";
import UserTable from "./../../pages/clinic/users.js";
import Appointment from "./../../pages/planning/appointment.js";
import AppointmentTable from "./../../pages/planning/appointments.js";
import reqForAppointment from "./../../pages/planning/reqforappointment.js";
import reqforappointmentTable from "./../../pages/planning/reqforappointments.js";
import RegisterV3 from "./../../pages/register.js";
import Salon from "./../../pages/salon/salonsolo";
import SalonTable from "./../../pages/salon/salonsolos";
import GridTicket from "./../../pages/ticket/grid-tickets.js";
import Ticket from "./../../pages/ticket/ticket.js";
import ticketProfile from "./../../pages/ticket/ticketprofile";
import TicketsTable from "./../../pages/ticket/tickets.js";
import Usersa from "./../../pages/user/usersa.js";

//temporary disabled
//import MedicalFilesTable from "./../../pages/clinic/medicalfiles.js";

import PhysicalCondition from "./../../pages/clinic/physicalcondition.js";
import PhysicalConditionTable from "./../../pages/clinic/physicalconditions.js";
//    import Acupuncture from './../../pages/clinic/acupuncture.js';
//    import AcupuncturesTable from './../../pages/clinic/acupunctures.js';
import Formula from './../../pages/clinic/formula.js';
import FormulasTable from './../../pages/clinic/formulas.js';
import MateriaMedica from './../../pages/clinic/materiamedica.js';
import MateriaMedicasTable from './../../pages/clinic/materiamedicas.js';
// import MeridianTable from './../../pages/clinic/meridians.js';
import Garage from "./../../pages/garage/garage.js";
import GarageTable from "./../../pages/garage/garages.js";
import GarageTreatment from "./../../pages/garage/garagetreatment.js";
import GarageTreatmentTable from "./../../pages/garage/garagetreatments.js";
import Mechanic from "./../../pages/garage/mechanic.js";
import MechanicTable from "./../../pages/garage/mechanics.js";
import Vehicle from "./../../pages/garage/vehicle.js";
import VehicleTable from "./../../pages/garage/vehicles.js";
import NailTreatment from "./../../pages/salon/nailtreatment.js";
import NailTreatmentTable from "./../../pages/salon/nailtreatments.js";
//import CarBrand from "./../../pages/garage/carbrand.js";
//import CarBrandTable from "./../../pages/garage/carbrands.js";

import AccountingSetting from './../../pages/accounting/accountingsetting.js';
import COATable from './../../pages/accounting/coas.js';
import Expense from './../../pages/accounting/expense.js';
import ExpenseTable from './../../pages/accounting/expenses.js';
import Invoice from './../../pages/accounting/invoice.js';
import InvoiceTable from "./../../pages/accounting/invoices.js";
import Product from './../../pages/accounting/product.js';
import ProductTable from './../../pages/accounting/products.js';
import Service from './../../pages/accounting/service.js';
import ServiceTable from './../../pages/accounting/services.js';
//import NCOATable from './../../pages/accounting/ncoas.js';


import PrivacyPolicyTable from './../../pages/databases/privacypolicies.js';
import TermofUSeTable from './../../pages/databases/termofuses.js';
//import RightsPermission from './../../pages/user/rightspermission.js';

import Skill from "./../../pages/user/skill.js";
import SkillTable from "./../../pages/user/skills.js";
//import AdminSkillTable from "./../../pages/planning/adminskills.js";
//import Certificate from "./../../pages/user/certificate.js";
//import CertificateTable from "./../../pages/user/certificates.js";
import AdminShiftsTable from "./../../pages/user/adminshifts.js";
import Freelancer from "./../../pages/user/freelancer.js";
import FreelancerTable from "./../../pages/user/freelancers.js";
import Leave from "./../../pages/user/leave.js";
import LeaveTable from "./../../pages/user/leaves.js";
import Shift from "./../../pages/user/shift.js";
import ShiftTable from "./../../pages/user/shifts.js";

//import Review from "./../../pages/review/review.js";

////////////////////////////////////////////////////////////////
//admin forum import
import CategoriesTableData from './../../pages/adminforum/categories';
import Category from './../../pages/adminforum/category';
import Post from './../../pages/adminforum/post';
import PostsTableData from './../../pages/adminforum/posts';
import SubCategoriesTableData from './../../pages/adminforum/subCategories';
import SubCategory from './../../pages/adminforum/subCategory';
import Topic from './../../pages/adminforum/topic';
import TopicsTableData from './../../pages/adminforum/topics';


//need to be reviewed
import AddCoas from "../../pages/accounting/addCoas.js";
import EditCoas from "../../pages/accounting/editCoa.js";

//import Transaction from './../../pages/accounting/transaction.js';
//import TransactionTable from './../../pages/accounting/transactions.js';
import InvoiceProfile from "./../../pages/accounting/invoiceprofile.js";
import ProfitLossStatement from "./../../pages/accounting/profitlossstatement.js";
//import Charts from './../../pages/accounting/chart-js.js';

import Task from "./../../pages/kanban/task.js";
import Taskprofile from "./../../pages/kanban/taskprofile";
import TaskTable from "./../../pages/kanban/tasks.js";

import Kanban from "./../../pages/kanban/kanban.js";
import KanbanTable from "./../../pages/kanban/kanbans.js";
import ListKanban from "./../../pages/kanban/listkanban.js";
import ListKanbansTable from "./../../pages/kanban/listkanbans.js";
import Scrumboard from "./../../pages/kanban/scrumboard.js";

import Label from './../../pages/label/label.js';
import LabelTable from './../../pages/label/labels.js';

//import OBC from './../../pages/erp/OBC.js';
//import OBCTable from './../../pages/erp/OBCs.js';
//import transport from './../../pages/erp/transport.js';
//import transportTable from './../../pages/erp/transports.js';
//import cargo from './../../pages/erp/cargo.js';
//import cargoTable from './../../pages/erp/cargos.js';

import Allen from "./../../pages/homeopathy/books/allen.js";
import AllenTable from "./../../pages/homeopathy/books/allens.js";

import Boericke from "./../../pages/homeopathy/books/boericke.js";
import BoerickeTable from "./../../pages/homeopathy/books/boerickes.js";
import Boger from "./../../pages/homeopathy/books/boger.js";
import BogerTable from "./../../pages/homeopathy/books/bogers.js";
import Clarke from "./../../pages/homeopathy/books/clarke.js";
import ClarkeTable from "./../../pages/homeopathy/books/clarkes.js";
import Dunham from "./../../pages/homeopathy/books/dunham.js";
import DunhamTable from "./../../pages/homeopathy/books/dunhams.js";
import Farrington from "./../../pages/homeopathy/books/farrington.js";
import FarringtonTable from "./../../pages/homeopathy/books/farringtons.js";
import Guernsey from "./../../pages/homeopathy/books/guernsey.js";
import GuernseyTable from "./../../pages/homeopathy/books/guernseys.js";
import Hahnemann from "./../../pages/homeopathy/books/hahnemann.js";
import HahnemannTable from "./../../pages/homeopathy/books/hahnemanns.js";
import Hering from "./../../pages/homeopathy/books/hering.js";
import HeringTable from "./../../pages/homeopathy/books/herings.js";
import Kent from "./../../pages/homeopathy/books/kent.js";
import KentTable from "./../../pages/homeopathy/books/kents.js";
import Lippe from "./../../pages/homeopathy/books/lippe.js";
import LippeTable from "./../../pages/homeopathy/books/lippes.js";
import Mure from "./../../pages/homeopathy/books/mure.js";
import MureTable from "./../../pages/homeopathy/books/mures.js";
import Nash from "./../../pages/homeopathy/books/nash.js";
import NashTable from "./../../pages/homeopathy/books/nashs.js";

import Logout from "./../../common/logout";

import API from "./../../pages/api/api.js";
import APITable from "./../../pages/api/apis.js";

import PermissionTab from "./../../pages/user/permissions.js";
import UserRole from "./../../pages/user/userrole.js";
//import AgendaView from "../../pages/calendar/AgendaView";
import Agenda from "../../pages/calendar/agenda";
import TimelineKanbanTasks from "../../pages/kanban/timelinetasks";
import Messenger from "../../pages/messenger/messenger";
import TimelineAppointments from "../../pages/planning/timelineappointments";
import TimelineTickets from "../../pages/ticket/timelinetickets";

import Contacts from '../../pages/contacts/Contacts';
import FileView from '../../pages/drive/FileViewer/fileviewer';
//  import VideoChat from '../../pages/messenger/videochat';
import UserRoleTableData from "./../../pages/user/userroles";
//import UserRole from "./../../pages/user/userrole";
//for now not needed
import Userrole_new from "../../pages/user/userrole_new";

import ModulePermission from "../../pages/user/modulepermission";
import ModulePermissionTable from "../../pages/user/modulepermissions";

import privacypolicy from "../../pages/databases/privacypolicy.js";
import termofuse from "../../pages/databases/termofuse.js";
import EmailTemplate from "../../pages/email/mail-template";
// import TermOfUseTable from "../termofusesTable.jsx";

import PublicAppointmentProfile from "../../pages/calendar/PublicAppointmentProfile.jsx";


function setTitle(path, routeArray) {
	var pageTitle;
	for (var i = 0; i < routeArray.length; i++) {
		if (routeArray[i].path === path) {
			pageTitle = "TCMFiles | " + routeArray[i].title;
		}
	}
	document.title = pageTitle ? pageTitle : "TCMFiles | Users";
}

//const store = configureStore();

class Content extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	async componentDidMount() {
		//set page title dinamically
		//setTitle(this.props.history.location.pathname, routes);
		/*     try{
		const user = auth.getProfile();
		//if(user){
		   const {data:currentUser} = await getUser(user._id);
		   this.setState({ user: this.mapToViewModel(currentUser) });
		//}
		}catch(ex){
		  console.log(ex);
		} */
	}

	// componentWillMount() {
	//   //set page title dinamically
	//   this.props.history.listen(() => {
	// 		//setTitle(this.props.history.location.pathname, routes);
	//   });
	// }

	render() {
		const { user } = this.state;
		return (
			<PageSettings.Consumer>
				{({ pageContentFullWidth, pageContentClass, pageContentInverseMode }) => (
					<div
						className={
							"content " +
							(pageContentFullWidth ? "content-full-width " : "") +
							(pageContentInverseMode ? "content-inverse-mode " : "") +
							pageContentClass
						}
					>
						<React.Fragment>
							<ToastContainer />

							<Switch>
								<ProtectedRoute path="/dashboard/" title="Clinic Dashboard" component={DashboardV2} />
								{/* <ProtectedRoute path="/Appointment/Request" title="Request For Appointment" component={ReqAppointment} />
								<ProtectedRoute path="/Edit/:id" title="RequestAppointmentEdit" component={RequestAppointmentEdit} /> */}
								<Route path="/" exact>
									<Redirect to="/dashboard/" />
								</Route>

								<PublicRoute path="/login"
									title="Login"
									component={LoginV2}
								/>

								<Route path="/logout" title="Logout" component={Logout} />
								<Route path="/register" title="Register" component={RegisterV3} />
								<ProtectedRoute path="/clinic/users/:id" title="User" component={User} />
								<ProtectedRoute path="/clinic/users" title="Users" component={UserTable} />

								<ProtectedRoute path="/crm/companies/:id" title="Company" component={Company} />
								<ProtectedRoute path="/crm/companies" title="Companies" component={CompanyTable} />

								<ProtectedRoute path="/salon/nailtreatments/:id" title="NailTreatment" component={NailTreatment} />
								<ProtectedRoute path="/salon/nailtreatments" title="NailTreatments" component={NailTreatmentTable} />

								<ProtectedRoute path="/accounting/accountingsetting" title="AccountingSetting" component={AccountingSetting} />
								<ProtectedRoute path="/accounting/services/:id" title="Service" component={Service} />
								<ProtectedRoute path="/accounting/services" title="Services" component={ServiceTable} />

								{/* <Route path="/accounting/profitlossstatement/:id" title="Profitloss Statement" component={ProfitLossStatement} /> */}
								<Route path="/accounting/profitlossstatement" title="Profitloss Statement" component={ProfitLossStatement} />

								{/* ProtectRoute remove for develop  */}
								<Route path="/accounting/products/:id" title="Product" component={Product} />
								<Route path="/accounting/products" title="Products" component={ProductTable} />
								<ProtectedRoute path="/accounting/invoices/invoiceprofile/:id" title="Invoiceprofile" component={InvoiceProfile} />
								<ProtectedRoute path="/accounting/invoices/:id" title="Invoice" component={Invoice} />
								<ProtectedRoute path="/accounting/invoices" title="Invoices" component={InvoiceTable} />
								<ProtectedRoute path="/accounting/expenses/:id" title="Expense" component={Expense} />
								<ProtectedRoute path="/accounting/expenses" title="Expenses" component={ExpenseTable} />

								<ProtectedRoute path="/user/skills/:id" title="Skill" component={Skill} />
								<ProtectedRoute path="/user/skills" title="Skills" component={SkillTable} />
{/* 								
								<ProtectedRoute path="/user/certificates/:id" title="Skill" component={Certificate} />
<ProtectedRoute path="/user/certificates" title="Skills" component={CertificateTable} /> */}
								
								<ProtectedRoute path="/user/shifts/:id" title="Shift" component={Shift} />
 						    	<ProtectedRoute path="/user/adminshifts" title="Shifts" component={AdminShiftsTable} />								
								<ProtectedRoute path="/user/shifts" title="Shifts" component={ShiftTable} />

								{/* <ProtectedRoute path="/planning/leaves" title="AdminSkills" component={AdminSkillsTable} />		 */}

								<ProtectedRoute path="/user/leaves/:id" title="Leave" component={Leave} />
								<ProtectedRoute path="/user/leaves" title="Leaves" component={LeaveTable} />
								<ProtectedRoute path="/homeopathy/books/allens/:id" title="Allen" component={Allen} />
								<ProtectedRoute path="/homeopathy/books/allens" title="Allens" component={AllenTable} />
								<ProtectedRoute path="/homeopathy/books/boerickes/:id" title="Boericke" component={Boericke} />
                                <ProtectedRoute path="/homeopathy/books/boerickes" title="Boerickes" component={BoerickeTable} />
								<ProtectedRoute path="/homeopathy/books/bogers/:id" title="Boger" component={Boger} />
                <ProtectedRoute path="/homeopathy/books/bogers" title="Bogers" component={BogerTable} />
                <ProtectedRoute path="/homeopathy/books/clarkes/:id" title="Clarkes" component={Clarke} />
                <ProtectedRoute path="/homeopathy/books/clarkes" title="Clarkes" component={ClarkeTable} />
                <ProtectedRoute path="/homeopathy/books/dunhams/:id" title="Dunham" component={Dunham} />
                <ProtectedRoute path="/homeopathy/books/dunhams" title="Dunhams" component={DunhamTable} />
                <ProtectedRoute path="/homeopathy/books/farringtons/:id" title="Farrington" component={Farrington} />
                <ProtectedRoute path="/homeopathy/books/farringtons" title="Farringtons" component={FarringtonTable} />				
                <ProtectedRoute path="/homeopathy/books/guernseys/:id" title="Guernsey" component={Guernsey} />
                <ProtectedRoute path="/homeopathy/books/guernseys" title="Guernseys" component={GuernseyTable} />
                <ProtectedRoute path="/homeopathy/books/hahnemanns/:id" title="Hahnemann" component={Hahnemann} />
                <ProtectedRoute path="/homeopathy/books/hahnemanns" title="Hahnemanns" component={HahnemannTable} />
                <ProtectedRoute path="/homeopathy/books/herings/:id" title="Herings" component={Hering} />
                <ProtectedRoute path="/homeopathy/books/herings" title="Herings" component={HeringTable} />				
                <ProtectedRoute path="/homeopathy/books/kents/:id" title="Kent" component={Kent} />
                <ProtectedRoute path="/homeopathy/books/kents" title="Kents" component={KentTable} />
                <ProtectedRoute path="/homeopathy/books/lippes/:id" title="Lippe" component={Lippe} />
                <ProtectedRoute path="/homeopathy/books/lippes" title="Lippes" component={LippeTable} />
                <ProtectedRoute path="/homeopathy/books/mures/:id" title="Mure" component={Mure} />
                <ProtectedRoute path="/homeopathy/books/mures" title="Mures" component={MureTable} />
                <ProtectedRoute path="/homeopathy/books/nashs/:id" title="Nash" component={Nash} />
                <ProtectedRoute path="/homeopathy/books/nashs" title="Nashs" component={NashTable} />
								
								{/*
              
                <Route path="/accounting/chart-js/:id" title="Charts Income vs Expenses" component={Charts}/> 
				
                <ProtectedRoute path="/homeopathy/books/allens/:id" title="Allen" component={Allen} />
                <ProtectedRoute path="/homeopathy/books/allens" title="Allens" component={AllenTable} />
             
                <ProtectedRoute path="/homeopathy/books/bogers/:id" title="Boger" component={Boger} />
                <ProtectedRoute path="/homeopathy/books/bogers" title="Bogers" component={BogerTable} />
                <ProtectedRoute path="/homeopathy/books/clarkes/:id" title="Clarkes" component={Clarke} />
                <ProtectedRoute path="/homeopathy/books/clarkes" title="Clarkes" component={ClarkeTable} />
                <ProtectedRoute path="/homeopathy/books/dunhams/:id" title="Dunham" component={Dunham} />
                <ProtectedRoute path="/homeopathy/books/dunhams" title="Dunhams" component={DunhamTable} />
                <ProtectedRoute path="/homeopathy/books/farringtons/:id" title="Farrington" component={Farrington} />
                <ProtectedRoute path="/homeopathy/books/farringtons" title="Farringtons" component={FarringtonTable} />				
                <ProtectedRoute path="/homeopathy/books/guernseys/:id" title="Guernsey" component={Guernsey} />
                <ProtectedRoute path="/homeopathy/books/guernseys" title="Guernseys" component={GuernseyTable} />
                <ProtectedRoute path="/homeopathy/books/hahnemanns/:id" title="Hahnemann" component={Hahnemann} />
                <ProtectedRoute path="/homeopathy/books/hahnemanns" title="Hahnemanns" component={HahnemannTable} />
                <ProtectedRoute path="/homeopathy/books/herings/:id" title="Herings" component={Hering} />
                <ProtectedRoute path="/homeopathy/books/herings" title="Herings" component={HeringTable} />				
                <ProtectedRoute path="/homeopathy/books/kents/:id" title="Kent" component={Kent} />
                <ProtectedRoute path="/homeopathy/books/kents" title="Kents" component={KentTable} />
                <ProtectedRoute path="/homeopathy/books/lippes/:id" title="Lippe" component={Lippe} />
                <ProtectedRoute path="/homeopathy/books/lippes" title="Lippes" component={LippeTable} />
                <ProtectedRoute path="/homeopathy/books/mures/:id" title="Mure" component={Mure} />
                <ProtectedRoute path="/homeopathy/books/mures" title="Mures" component={MureTable} />
                <ProtectedRoute path="/homeopathy/books/nashs/:id" title="Nash" component={Nash} />
                <ProtectedRoute path="/homeopathy/books/nashs" title="Nashs" component={NashTable} />
         
		
								<ProtectedRoute path="/databases/rightspermissions/:id" title="RightsPermission" component={RightsPermission} />
								<ProtectedRoute path="/databases/rightspermissions" title="RightsPermissions" component={RightsPermissionTable} />
								
				
				*/}
				<ProtectedRoute exact path="/databases/termofuses" title="TermOfUses" component={TermofUSeTable} />
				<ProtectedRoute exact path="/databases/privacypolicies" title="PrivacyPolicies" component={PrivacyPolicyTable} />
								
								
				<ProtectedRoute path="/databases/termofuses/:id" title="TermOfUse" component={termofuse} />
                <ProtectedRoute  path="/databases/privacypolicies/:id" title="PrivacyPolicy" component={privacypolicy} />
                <ProtectedRoute path="/email/emailtemplates/:id" title="Freelancer" component={EmailTemplate} />


                <ProtectedRoute path="/user/freelancers/:id" title="Freelancer" component={Freelancer} />
				<ProtectedRoute path="/user/freelancers" title="Freelancer" component={FreelancerTable} />


								<ProtectedRoute path="/ticket/tickets/:id" title="Ticket" component={Ticket} />
								<ProtectedRoute path="/ticket/tickets" title="Tickets" component={TicketsTable} />
								<Route path="/ticket/tickets" title="GridTicket" component={GridTicket} />
								<ProtectedRoute path="/ticket/ticketprofile/:id" title="ticketProfile" component={ticketProfile} />
								<ProtectedRoute path="/ticket/grid-tickets" title="grid-tickets" component={GridTicket} />								

								<ProtectedRoute path="/clinic/clinicsolos/:id" title="ClinicSolo" component={ClinicSolo} />
								<ProtectedRoute path="/clinic/clinicsolos" title="ClinicSolos" component={ClinicSoloTable} />
								<ProtectedRoute path="/clinic/patients/:id" title="Patient" component={Patient} />
								<ProtectedRoute path="/clinic/patients" title="Patients" component={PatientTable} />
								<ProtectedRoute path="/clinic/doctors/:id" title="Doctor" component={Doctor} />
								<ProtectedRoute path="/clinic/doctors" title="Doctors" component={DoctorTable} />
								<ProtectedRoute path="/clinic/accountants/:id" title="Accountant" component={Accountant} />
								<ProtectedRoute path="/clinic/accountants" title="Accountants" component={AccountantTable} />
								<ProtectedRoute path="/clinic/receptions/:id" title="Reception" component={Reception} />
								<ProtectedRoute path="/clinic/receptions" title="Receptions" component={ReceptionTable} />
								
								<ProtectedRoute path="/clinic/materiamedicas/:id" title="MateriaMedicas" component={MateriaMedica} />	
								<ProtectedRoute path="/clinic/materiamedicas" title="MateriaMedicas" component={MateriaMedicasTable} />	

								<ProtectedRoute path="/clinic/formulas/:id" title="Formulas" component={Formula} />	
								<ProtectedRoute path="/clinic/formulas" title="Formulas" component={FormulasTable} />	

								{/* <ProtectedRoute path="/clinic/acupunctures" title="Acupuncture" component={AcupuncturesTable} /> */}

								{/* <ProtectedRoute path="/clinic/homeosessions/:id" title="Add Homeopathy Session"component={HomeopathySession} /> */}
								<ProtectedRoute path="/clinic/physicalconditions/:id" title="Add PhysicalCondition" component={PhysicalCondition} />
								<ProtectedRoute path="/clinic/physicalconditions/" title="PhysicalConditions" component={PhysicalConditionTable} />
								{/* <ProtectedRoute path="/clinic/homeopathysessions/:id" title="HomeopathySession" component={AddHomeopathySession} /> */}
								{/* <ProtectedRoute path="/clinic/medicalfiles" title="medical files" component={MedicalFilesTable} /> */}
								<ProtectedRoute path="/garage/vehicles/:id" title="Vehicle" component={Vehicle} />
								<ProtectedRoute path="/garage/vehicles" title="Vehicles" component={VehicleTable} />
								<ProtectedRoute path="/garage/vehicles/new" title="Vehicles" component={Vehicle} />
								<ProtectedRoute path="/garage/garages/:id" title="Garage" component={Garage} />
								<ProtectedRoute path="/garage/garages" title="Garages" component={GarageTable} />
								<ProtectedRoute path="/garage/mechanics/:id" title="Mechanic" component={Mechanic} />
								<ProtectedRoute path="/garage/mechanics" title="Mechanics" component={MechanicTable} />
								
								<ProtectedRoute path="/garage/garagetreatments/:id" title="GarageTreatment" component={GarageTreatment} />
								<ProtectedRoute path="/garage/garagetreatments" title="GarageTreatments" component={GarageTreatmentTable} />					


						         {/* admin forum  */}
								<ProtectedRoute path="/adminforum/subcategories/:id" title="SubCategory" component={SubCategory} />
								<ProtectedRoute path="/adminforum/subcategories" title="SubCategories" component={SubCategoriesTableData} />
								<ProtectedRoute path="/adminforum/categories/:id" title="Category" component={Category} />
								<ProtectedRoute path="/adminforum/categories" title="categories" component={CategoriesTableData} />
								<ProtectedRoute path="/adminforum/topics/:id" title="topic" component={Topic} />
								<ProtectedRoute path="/adminforum/topics" title="topics" component={TopicsTableData} />
								<ProtectedRoute path="/adminforum/posts/:id" title="comment" component={Post} />
								<ProtectedRoute path="/adminforum/posts" title="comments" component={PostsTableData} />
                                {/* admin forum end */}
								
								<ProtectedRoute path="/label/labels/:id" title="Label" component={Label} />
								<ProtectedRoute path="/label/labels/" title="Labels" component={LabelTable} />

								{/* <Route path="/agendaview" title="Agenda - Month View" component={AgendaView} />  */}

								<ProtectedRoute path="/api/apis/:id" title="API" component={API} />
								<ProtectedRoute path="/api/apis" title="APIs" component={APITable} />


								<ProtectedRoute path="/appointmentprofile/:id" title="AppointmentProfile" component={AppointmentProfile} />
								<Route path="/planning/timelineappointments" title="Timeline Appointments" component={TimelineAppointments} exact />
								<Route path="/ticket/timelinetickets" title="Timeline Tickets" component={TimelineTickets} exact />

								<Route path="/clinic/yourdrive/" title="Your Drive" component={YourDrive} />
								<Route path="/clinic/fileviewer" title="file viewer" component={FileView} />
								<Route path="/calendar" title="Calendar" component={Calendar} />
								<Route path="/agenda" title="Agenda" component={Agenda} />
								<Route path="/scheduler" title="Scheduler" component={SchedulerCal} />
								{/* <Route path="/scheduler2" title="Scheduler2" component={SchedulerfCal} /> */}

								{/* <ProtectedRoute path="/clinic/reqforappointments/:id" title="ReqForAppointment" component={reqForAppointment} /> */}

								<ProtectedRoute path="/clinic/reqforappointments" title="ReqForAppointments" component={reqforappointmentTable} />
								<ProtectedRoute path="/planning/reqforappointments/:id" title="ReqForAppointment" component={reqForAppointment} />

								<ProtectedRoute path="/planning/reqforappointments" title="ReqForAppointments" component={reqforappointmentTable} />
								<ProtectedRoute path="/planning/appointments/:id" title="Appointment" component={Appointment} />
								<ProtectedRoute path="/planning/appointments" title="ReqForAppointments" component={AppointmentTable} />

								<ProtectedRoute path="/accounting/coas" title="COA" component={COATable} exact={true} />
								{/*								<ProtectedRoute path="/accounting/newcoas" title="COA" component={NCOATable} exact={true}/>								 */}
								<ProtectedRoute path="/accounting/coas/new" exact={true} title="COA" component={AddCoas} />
								<ProtectedRoute path="/accounting/coas/edit/:coaId" exact={true} title="Services" component={EditCoas} />
								{/* <ProtectedRoute path="/accounting/coa" exact={true} title="Services" component={coa} /> */}

								{/*								<ProtectedRoute path="/review/reviews/:id" title="Review" component={Review} />
								<ProtectedRoute path="/review/reviews" title="Reviews" component={ReviewsTable} />  
								*/}

								<Route path="/publicappointmentprofile/:id" title="PublicAppointmentProfile" component={PublicAppointmentProfile} />

								<Route path="/email/inbox" title="Email Inbox" component={EmailInbox} />
								<Route path="/email/compose" title="Email Compose" component={EmailCompose} />
								<Route path="/email/detail" title="Email Detail" component={EmailDetail} />
								<Route path="/widgets" title="Widgets" component={Widgets} />
								<Route path="/user/usersa" title="Usera" component={Usersa} />
								<Route path="/ui/general" title="UI General" component={UIGeneral} />
								<Route path="/ui/typography" title="UI Typography" component={UITypography} />
								<Route path="/ui/tabs-accordion" title="UI Tabs Accordion" component={UITabsAccordion} />
								<Route path="/ui/modal-notification" title="UI Modal Notification" component={UIModalNotification} />
								<Route path="/ui/widget-boxes" title="UI Widget Boxes" component={UIWidgetBoxes} />
								<Route path="/ui/media-object" title="UI Media Object" component={UIMediaObject} />
								<Route path="/ui/buttons" title="UI Buttons" component={UIButtons} />
								<Route path="/ui/icons" title="UIIcons" component={UIIcons} />
								<Route path="/ui/simple-line-icons" title="UISimpleLineIcons" component={UISimpleLineIcons} />
								<Route path="/ui/ionicons" title="UIIonicons" component={UIIonicons} />
								<Route path="/ui/language-bar-icon" title="UILanguageBarIcon" component={UILanguageBarIcon} />
								<Route path="/ui/social-buttons" title="UISocialButtons" component={UISocialButtons} />
								<Route path="/bootstrap-4" title="Bootstrap4" component={Bootstrap4} />
								<Route path="/form/elements" title="FormElements" component={FormElements} />
								<Route path="/form/wizards" title="FormWizards" component={FormWizards} />
								<Route path="/form/form" title="FormPlugins" component={FormPlugins} />
								<Route path="/table/basic" title="TableBasic" component={TableBasic} />
								<Route path="/table/data" title="Table" component={Table} />
								<Route path="/pos/customer-order" title="PosCustomerOrder" component={PosCustomerOrder} />
								<Route path="/pos/kitchen-order" title="PosKitchenOrder" component={PosKitchenOrder} />
								<Route path="/pos/counter-checkout" title="PosCounterCheckout" component={PosCounterCheckout} />
								<Route path="/pos/table-booking" title="PosTableBooking" component={PosTableBooking} />
								<Route path="/pos/menu-stock" title="PosMenuStock" component={PosMenuStock} />
								{/* <Route path="/chart/js" title="ChartJS" component={ChartJS} /> */}
								<Route path="/chart/d3" title="ChartD3" component={ChartD3} />
								<Route path="/chart/apex" title="ChartApex" component={ChartApex} />

								<Route path="/map" title="Map" component={Map} />
								<Route path="/gallery" title="Gallery" component={Gallery} />
								<Route path="/page-option/with-footer" title="PageWithFooter" component={PageWithFooter} />
								<Route path="/page-option/without-sidebar" title="PageWithoutSidebar" component={PageWithoutSidebar} />
								<Route path="/page-option/with-right-sidebar" title="PageWithRightSidebar" component={PageWithRightSidebar} />
								<Route path="/page-option/with-minified-sidebar" title="PageWithMinifiedSidebar" component={PageWithMinifiedSidebar} />
								<Route path="/page-option/with-two-sidebar" title="PageWithTwoSidebar" component={PageWithTwoSidebar} />
								<Route path="/page-option/full-height" title="PageFullHeight" component={PageFullHeight} />
								<Route path="/page-option/with-wide-sidebar" title="PageWithWideSidebar" component={PageWithWideSidebar} />
								<Route path="/page-option/with-light-sidebar" title="PageWithLightSidebar" component={PageWithLightSidebar} />
								<Route path="/page-option/with-mega-menu" title="PageWithMegaMenu" component={PageWithMegaMenu} />
								<Route path="/page-option/with-top-menu" title="PageWithTopMenu" component={PageWithTopMenu} />
								<Route path="/page-option/with-boxed-layout" title="PageWithBoxedLayout" component={PageWithBoxedLayout} />
								<Route path="/page-option/with-mixed-menu" title="PageWithMixedMenu" component={PageWithMixedMenu} />
								<Route path="/page-option/boxed-layout-with-mixed-menu" title="PageBoxedLayoutWithMixedMenu" component={PageBoxedLayoutWithMixedMenu}/>
								<Route path="/page-option/with-transparent-sidebar"	title="PageWithTransparentSidebar" component={PageWithTransparentSidebar} />
								<Route path="/page-option/with-search-sidebar" title="Page With Search Sidebar" component={PageWithSearchSidebar} />
								<Route path="/extra/timeline" title="Extra Timeline" component={ExtraTimeline} />
								<Route path="/extra/coming-soon" title="Extra Coming Soon" component={ExtraComingSoon} />
								<Route path="/extra/search" title="Extra Search Results" component={ExtraSearch} />
								<Route path="/extra/invoice" title="Extra Invoice" component={ExtraInvoice} />
								<Route path="/extra/scrum-board" title="Extra Scrum Board" component={ExtraScrumBoard} />
								<Route path="/extra/cookie-acceptance-banner" title="Extra Cookie Acceptance Banner" component={ExtraCookieAcceptanceBanner} />
								<Route path="/user/permissions/:id" title="Permissions" component={UserRole} />
								<Route path="/user/permissions" title="Permissions" component={PermissionTab} />
								<Route path="/user/userroles/:id" title="Userrole" component={Userrole_new} />
								 {/* <Route path="/user/userroles/:id" title="Userrole" component={UserRole} />   */}
								<Route path="/user/userroles" title="Userroles" component={UserRoleTableData} />
								<Route path="/user/modulepermissions/:id" title="Permission" component={ModulePermission} />
								<Route path="/user/modulepermissions/new" title="Permission" component={ModulePermission} />
								<Route path="/user/modulepermissions" title="Permission" component={ModulePermissionTable} />
								
								<ProtectedRoute path="/messenger" title="Messenger" component={Messenger} />

							    {/* <ProtectedRoute path="/clinic/tcmsessions/:id" title="TCMSession" component={AddTcmSession} /> */}
								
								{/* <Route path="/videochat" title="VideoChat" component={VideoChat} /> */}
								<Route path="/contacts" title="Contacts" component={Contacts} />

								{/* <Provider store={store}> */}
								<Route path="/user/profile" title="Extra Profile" component={Profile} />

								<Route title="404" component={ExtraError} />
								{/* </Provider> */}
							</Switch>
						</React.Fragment>
					</div>
				)}
			</PageSettings.Consumer>
		);
	}
}
export default withRouter(Content);