import React, { Fragment } from "react";
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { Link } from "react-router-dom";
import Select from "react-select";
import Joi from "joi";
import { nanoid, customAlphabet } from "nanoid";
import { saveExpense, getExpense } from './../../services/expenses';
import { getCOAs } from "./../../services/coas";
import { apiUrl } from '../../config/config.json';
import http from '../../services/httpService';
import avatar from "../../assets/images/user-12.jpg";

class Expense extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patients: [],
			patient: [],
			allExpenses: [],
			errors: {},
			dropdownOpen: false,
			data: {
				user: "",
				COANo: "",
				product: "",
				price: 0,
				quantity: "",
				amount: 0,
				paidTo: "",
				currency: "",
				expenseNo: "",
				status: "",
				dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
				reference: "",
				note: ""
			},
		};

		this.statusOptions = [
			{ value: "active", label: "Active" },
			{ value: "pending", label: "Pending" },
			{ value: "new", label: "New" },
			{ value: "paid", label: "Paid" },
			{ value: "overdue", label: "Overdue" },
			{ value: "canceled", label: "Canceled" },
			{ value: "refund", label: "Refund" },
		];

		this.currencyOptions = [
			{ value: "EUR", label: "Euro €" },
			{ value: "USD", label: "USD $" },
			{ value: "CNY", label: "CNY ¥" },
			{ value: "GBP", label: "GBP £" },
			{ value: "JPY", label: "JPY ¥" },
			{ value: "INR", label: "INR ₹" },
			{ value: "CAD", label: "CAD $" },
			{ value: "AUD", label: "AUD $" },
			{ value: "ZAR", label: "ZAR" },
			{ value: "CHF", label: "CHF" },
			{ value: "KRW", label: "KRW ₩" },
			{ value: "RUB", label: "RUB руб" },
			{ value: "BRL", label: "BRL R$" },
			{ value: "SAR", label: "SAR ﷼" },
			{ value: "MXN", label: "MXN $" },
			{ value: "HKD", label: "HKD $" },
			{ value: "SGD", label: "SGD $" },
			{ value: "ILS", label: "ILS ₪" },
			{ value: "QAR", label: "QAR ﷼" },
			{ value: "TRY", label: "TRY ₺" },
			{ value: "VND", label: "VND ₫" },
		];


		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}




	// this will handle both text and single-select change
	handleChange = (name, value) => {
		const data = { ...this.state.data };
		data[name] = value;
		this.setState({ data });
	};

	handleNameChange = (name, value) => {
		const data = { ...this.state.data };
		this.state.allExpenses.map(expense => {
			if (expense.name === value) {
				const nanoid = customAlphabet('23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
				data[name] = value;
				data["COANo"] = expense._id;
				data["expenseNo"] = `EXP-${nanoid()}`
				this.setState({ data });
			}
		})
	}

	handleAmountChange = (name, value) => {
		const data = { ...this.state.data };
		data[name] = value;
		data["amount"] = value * data.price;
		this.setState({ data })
	}


	schema = Joi.object({
		user: Joi.any().optional(),
		COANo: Joi.any().optional(),
		product: Joi.any().optional(),
		price: Joi.any().optional(),
		quantity: Joi.any().optional(),
		amount: Joi.any().optional(),
		paidTo: Joi.any().optional(),
		currency: Joi.any().optional(),
		expenseNo: Joi.any().optional(),
		status: Joi.any().optional(),
		dueDate: Joi.any().optional(),
		reference: Joi.any().optional(),
		note: Joi.any().optional(),
	});

	async populateInvoice() {
		try {
			const Id = this.props.match.params.id;
			if (Id === "new") return;
			const { data: expense } = await getExpense(Id);
			this.setState({ data: this.mapToViewModel(expense) });
			console.log("state in populate expense: ", this.state);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	mapToViewModel(expense) {
		return {
			_id: expense._id,
			user: expense.user,
			COANo: expense.COANo,
			product: expense.product,
			price: expense.price,
			quantity: expense.quantity,
			amount: expense.amount,
			paidTo: expense.paidTo,
			currency: expense.currency,
			expenseNo: expense.expenseNo,
			status: expense.status,
			dueDate: expense.dueDate,
			reference: expense.reference,
			note: expense.note
		};
	}

	async populatePatients() {
		const { data: patients } = await http.get(apiUrl + "/patients");
		this.setState({ patients });
		this.selectUsers = this.state.patients.map((option) => (
			<option key={option._id} value={option.user}>
				{option.patients.contactName.first} {option.patients.contactName.last}
			</option>
		));
		this.selectPaidTo = this.state.patients.map((option) => (
			{
				value: option.user,
				label: `${option.patients.contactName.first} ${option.patients.contactName.last}`
			}
		));
	}

	async populateExpenses() {
		const { data: coas } = await getCOAs();
		let Expenses = []
		coas.map((coa) => {
			if (coa.category === "Expenses") {
				Expenses.push(coa)
			}
		})
		this.setState({ allExpenses: Expenses });
		this.selectExpenses = this.state.allExpenses.map((expense) => (
			{
				value: expense.name,
				label: expense.name
			}
		));
	}
	async populatePatient() {
		const { data: patient } = await http.get(`${apiUrl}/users/${this.state.data.user}`);
		this.setState({
			patient,
		});
	}
	async componentDidMount() {
		await this.populatePatients();
		await this.populateInvoice();
		await this.populatePatient();
		await this.populateExpenses();
	}



	handlePatientChange = async (e) => {
		this.setState(
			{
				data: {
					...this.state.data,
					user: e.target.value,
					paidTo: e.target.value,
				},
			},
			async () => {
				await this.populatePatient();
			}
		);
	};


	handleSubmit = async () => {
		console.log("expense data: ", this.state.data);
		try {
			await saveExpense(this.state.data);
			this.props.history.push("/accounting/expenses");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};


	render() {
		console.log(this.state.data)
		console.log(this.state.patients)
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/form/plugins">Expenses</Link></li>
					<li className="breadcrumb-item active">Add Expense</li>
				</ol>
				<h1 className="page-header">
					Add Expense <small>Expense-registration-form</small>
				</h1>

				<div className="row">
					<div className="col-xl-12">
						<Panel>
							<PanelHeader noButton>Add Expense</PanelHeader>
							<PanelBody>
								<div className="row form-group">
									<div className="col-12 col-sm-4">
										<label>
											<b>Select PaidTo *</b>
										</label>
									</div>
									<div className="col-12 col-sm-6">
										<select
											className="selectPatient"
											placeholder={"Select a patient"}
											name="user"
											onChange={this.handlePatientChange}
										>
											<option>Select Patient</option>
											{this.selectUsers}
										</select>
									</div>
								</div>

								<div className="row mt-4 row-no-margin">
									<div className="col-12 col-sm-2">
										<img
											src={this.state.data.user ? this.state.patient?.imageSrc : avatar}
											style={{ marginBottom: "1.5rem", height: "140px", width: "140px" }}
										/>
									</div>
									<div className="col-12 col-sm-10">
										<div className="row">
											<div className="col-12 col-sm-4">
												<div className="form-group">
													<label>
														<b>Prefix</b>
													</label>
													<input
														type="text"
														disabled
														className="form-control"
														placeholder="Prefix"
														name="prefix"
														value={this.state.data.user ? this.state.patient?.prefix : ""}
													/>
												</div>
											</div>
											<div className="col-12 col-sm-4">
												<div className="form-group">
													<label>
														<b>First Name</b>
													</label>
													<input
														type="text"
														disabled
														className="form-control"
														name="firstName"
														placeholder="First Name"
														value={
															this.state.data.user
																? this.state.patient?.contactName?.first
																: ""
														}
													/>
												</div>
											</div>
											<div className="col-12 col-sm-4">
												<div className="form-group">
													<label>
														<b>Last Name</b>
													</label>
													<input
														disabled
														type="text"
														className="form-control"
														name="lastName"
														placeholder="Last Name"
														value={
															this.state.data.user
																? this.state.patient?.contactName?.last
																: ""
														}
													/>
												</div>
											</div>
											<div className="col-12 col-sm-4">
												<div className="form-group">
													<div className="d-flex flex-column">
														<label>
															<b>Date of Birth *</b>
														</label>
														<input
															disabled
															type="text"
															className="form-control"
															name="lastName"
															placeholder="Date of birth"
															value={
																this.state.data.user
																	? this.state.patient?.dateBirth?.toLocaleString("en-GB")
																	: ""
															}
														/>
													</div>
												</div>
											</div>
											<div className="col-12 col-sm-4">
												<div className="form-group">
													<label>
														<b>Mobile Phone</b>
													</label>
													<input
														disabled
														type="text"
														className="form-control"
														name="mobilePhone"
														placeholder="Mobile Phone"
														value={
															this.state.data.user ? this.state.patient?.mobilePhone : ""
														}
													/>
												</div>
											</div>
											<div className="col-12 col-sm-4">
												<div className="form-group">
													<label>
														<b>Gender</b>
													</label>
													<input
														disabled
														type="text"
														className="form-control"
														name="gender"
														placeholder="Gender"
														value={this.state.data.user ? this.state.patient?.gender : ""}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="panel-body">
									<fieldset>
										<legend className="legend-text">Add Product</legend>
										<div className="row">
											<div className="col-12 col-md-3">
												<div className="form-group">
													<label>
														<b>Product Name :</b>
													</label>
													<Select
														options={this.selectExpenses}
														placeholder={"Select product"}
														value={
															this.state.data.product && {
																value: this.state.data.product,
																label: this.state.data.product,
															}
														}
														onChange={(e) => this.handleNameChange("product", e.value)}
													/>
												</div>
											</div>
											<div className="col-6 col-md-2">
												<div className="form-group">
													<label>
														<b>Price :</b>
													</label>
													<input
														min="1"
														type="number"
														className="form-control"
														name="price"
														placeholder="Enter price"
														value={this.state.data.price}
														onChange={(e) => this.handleChange(e.target.name, e.target.value)}
													/>
												</div>
											</div>
											<div className="col-12 col-md-2">
												<div className="form-group">
													<label>
														<b>Quantity :</b>
													</label>
													<input
														type="number"
														className="form-control"
														name="quantity"
														placeholder="Quantity"
														min="1"
														value={
															this.state.data.quantity
														}
														onChange={(e) => this.handleAmountChange(e.target.name, e.target.value)}
													/>
												</div>
											</div>
											<div className="col-6 col-md-3">
												<div className="form-group">
													<label>
														<b>Amount :</b>
													</label>
													<input
														disabled
														type="number"
														className="form-control"
														name="amount"
														placeholder="Enter amount"
														value={this.state.data.amount}
													/>
												</div>
											</div>
											<div className="col-6 col-md-2">
												<div className="form-group">
													<label>
														<b>currency :</b>
													</label>
													<Select
														options={this.currencyOptions}
														placeholder={"Select currency"}
														value={
															this.state.data.currency && {
																value: this.state.data.currency,
																label: this.state.data.currency,
															}
														}
														onChange={(e) => this.handleChange("currency", e.value)}
													/>
												</div>
											</div>
											
										</div>
									</fieldset>
								</div>
								<div className="panel-body">
									<fieldset>
										<legend className="legend-text">Enter Reference</legend>
										<div className="row">
											<div className="col-6 col-md-11">
												<div className="form-group">
													<label>
														<b>Reference :</b>
													</label>
													<textarea
														className="form-control"
														name="reference"
														placeholder="Enter reference"
														value={this.state.data.reference}
														onChange={(e) => this.handleChange(e.target.name, e.target.value)}
													/>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
								<div className="panel-body">
									<fieldset>
										<legend className="legend-text">Enter Note</legend>
										<div className="row">
											<div className="col-6 col-md-11">
												<div className="form-group">
													<label>
														<b>Note :</b>
													</label>
													<textarea
														className="form-control"
														name="note"
														placeholder="Enter note"
														value={this.state.data.note}
														onChange={(e) => this.handleChange(e.target.name, e.target.value)}
													/>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
								<div className="panel-body">
									<fieldset>
										<legend className="legend-text">Select Status</legend>
										<div className="row">
											<div className="col-6 col-md-4">
												<div className="form-group">
													<label>
														<b>Status :</b>
													</label>
													<Select
														options={this.statusOptions}
														placeholder={"Select status"}
														value={
															this.state.data.status && {
																value: this.state.data.status,
																label: this.state.data.status,
															}
														}
														onChange={(e) => this.handleChange("status", e.value)}
													/>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
								<div className="form-group text-center">
									<button type="button" class="btn btn-primary btn-sm" onClick={this.handleSubmit}>
										{this.props.match.params.id === "new" ? "Create expense" : "Save changes"}
									</button>
									{" "}
									<Link to="/accounting/expenses">
										<button type="button" class="btn btn-primary btn-sm">
											Cancel
										</button>
									</Link>
								</div>
							</PanelBody>
						</Panel>
					</div>
				</div>
			</div>
		);
	}
}

export default Expense;
