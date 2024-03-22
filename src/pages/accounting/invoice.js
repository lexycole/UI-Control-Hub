import React, { Fragment } from "react";
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { Link } from "react-router-dom";
import Select from "react-select";
import Joi from "joi";
import { nanoid } from "nanoid";
import { getServices } from './../../services/services';
import { getProducts } from "./../../services/products";
import { saveInvoice, getInvoice } from "../../services/invoices.js";
import { apiUrl } from '../../config/config.json';
import http from '../../services/httpService';
import avatar from "../../assets/images/user-12.jpg";

class Invoice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patients: [],
			patient: [],
			allServices: [],
			allProducts: [],
			errors: {},
			dropdownOpen: false,
			data: {
				user: "",
				services: [{ serviceNo: "", name: "", quantity: "", amount: 0 }],
				products: [{ productNo: "", name: "", quantity: "", amount: 0 }],
				currency: "",
				invoiceNo: nanoid(8),
				amount: 0,
				status: "",
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
		this.addService = this.addService.bind(this);
		this.removeService = this.removeService.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.removeProduct = this.removeProduct.bind(this);
		this.findTotalAmount = this.findTotalAmount.bind(this);
	}


	sumvalues = (values) => {
		let sum = 0;
		values.map((value, index) => {
			sum += value.amount
		})
		return sum
	}

	// this will handle both text and single-select change
	handleChange = (name, value) => {
		const data = { ...this.state.data };
		data[name] = value;
		this.setState({ data });
	};


	handleServiceChange = (name, value, serviceIndex) => {
		const data = { ...this.state.data };
		let id, price;
		this.state.allServices.map((service) => {
			if (service.name === value) {
				id = service._id;
				price = service.price
			}
		})
		data["services"] = this.state.data.services.map((item, index) =>
			index === serviceIndex ? { ...item, ["serviceNo"]: id, [name]: value, ["amount"]: item.quantity * price } : item
		);
		this.setState({ data });
	};

	handleMultipleServiceChange = (name, value, serviceIndex, servicename) => {
		const data = { ...this.state.data };
		let a;
		this.state.allServices.map((service) => {
			if (service.name === servicename) {
				a = value * service.price
			}
		})
		data["services"] = this.state.data.services.map((item, index) =>
			index === serviceIndex ? { ...item, [name]: value, ["amount"]: a } : item
		);
		this.setState({ data });
	}

	handleProductChange = (name, value, productIndex) => {
		const data = { ...this.state.data };
		let id, price
		this.state.allProducts.map((product) => {
			if (product.name === value) {
				id = product._id;
				price = product.price
			}
		})
		data["products"] = this.state.data.products.map((item, index) =>
			index === productIndex ? { ...item, ["productNo"]: id, [name]: value, ["amount"]: item.quantity * price } : item
		);
		this.setState({ data });
	};

	handleMultipleProductChange = (name, value, productIndex, productname) => {
		const data = { ...this.state.data };
		let a;
		this.state.allProducts.map((product) => {
			if (product.name === productname) {
				a = value * product.price
			}
		})
		data["products"] = this.state.data.products.map((item, index) =>
			index === productIndex ? { ...item, [name]: value, ["amount"]: a } : item
		);
		this.setState({ data });
	}

	schema = Joi.object({
		user: Joi.any().optional(),
		services: Joi.any().optional(),
		products: Joi.any().optional(),
		currency: Joi.any().optional(),
		invoiceNo: Joi.any().optional(),
		amount: Joi.any().optional(),
		status: Joi.any().optional(),
	});

	async populateInvoice() {
		try {
			const Id = this.props.match.params.id;
			if (Id === "new") return;
			const { data: invoice } = await getInvoice(Id);
			this.setState({ data: this.mapToViewModel(invoice) });
			console.log("state in populate invoice: ", this.state);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	mapToViewModel(invoice) {
		return {
			_id: invoice._id,
			user: invoice.user,
			services: invoice.services,
			products: invoice.products,
			currency: invoice.currency,
			invoiceNo: invoice.invoiceNo,
			amount: invoice.amount,
			status: invoice.status,
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
	}

	async populateServices() {
		const { data: allServices } = await getServices();
		console.log(allServices);
		this.setState({ allServices });
		this.selectServices = this.state.allServices.map((service) => (
			{
				value: service.name,
				label: service.name
			}
		));
	}

	async populateProducts() {
		const { data: allProducts } = await getProducts();
		this.setState({ allProducts });
		this.selectProducts = this.state.allProducts.map((product) => (
			{
				value: product.name,
				label: product.name
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
		await this.populateServices();
		await this.populateProducts();
		await this.populateInvoice();
		await this.populatePatient();
	}

	addService = () =>
		this.setState({
			data: {
				...this.state.data,
				services: [...this.state.data.services, { serviceNo: "", name: "", quantity: "", amount: 0, }],
			},
		});

	removeService = (index) => {
		this.setState({
			data: {
				...this.state.data,
				services: this.state.data.services.filter((mem, i) => index !== i),
			},
		});
	};

	addProduct = () =>
		this.setState({
			data: {
				...this.state.data,
				products: [...this.state.data.products, { productNo: "", name: "", quantity: "", amount: 0 }],
			},
		});

	removeProduct = (index) => {
		this.setState({
			data: {
				...this.state.data,
				products: this.state.data.products.filter((mem, i) => index !== i),
			},
		});
	};


	handlePatientChange = async (e) => {
		this.setState(
			{
				data: {
					...this.state.data,
					user: e.target.value,
				},
			},
			async () => {
				await this.populatePatient();
			}
		);
	};

	findTotalAmount = (services, products) => {
		let servicesamounttotal = this.sumvalues(services)
		let productsamounttotal = this.sumvalues(products)
		let total_amount = servicesamounttotal + productsamounttotal;
		const data = { ...this.state.data };
		data["amount"] = total_amount;
		this.setState({ data });
	};


	handleSubmit = async () => {
		await this.findTotalAmount(this.state.data.services, this.state.data.products);
		console.log("invoice data: ", this.state.data);
		try {
			await saveInvoice(this.state.data);
			this.props.history.push("/accounting/invoices");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};


	render() {
		console.log(this.state.data.services)
		console.log(this.state.data.products)
		console.log(this.state.data)
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/form/plugins">Invoices</Link></li>
					<li className="breadcrumb-item active">Add Invoice</li>
				</ol>
				<h1 className="page-header">
					Add Invoice <small>Invoice-registration-form</small>
				</h1>

				<div className="row">
					<div className="col-xl-12">
						<Panel>
							<PanelHeader noButton>Add Invoice</PanelHeader>
							<PanelBody>
								<div className="row form-group">
									<div className="col-12 col-sm-4">
										<label>
											<b>Select registered patient from administration *</b>
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
										<legend className="legend-text">Add Services</legend>
										<div className="form-group">
											<button type="button" class="btn btn-primary btn-sm" onClick={this.addService}>
												Add Service
											</button>
										</div>
										{this.state.data.services.map((service, index) => (
											<div className="row">
												<div className="col-12 col-md-4">
													<div className="form-group">
														<label>
															<b>Service Name :</b>
														</label>
														<Select
															options={this.selectServices}
															placeholder={"Select service"}
															value={
																service.name && {
																	value: service.name,
																	label: service.name,
																}
															}
															onChange={(e) => this.handleServiceChange("name", e.value, index)}
														/>
													</div>
												</div>
												<div className="col-12 col-md-3">
													<div className="form-group">
														<label>
															<b>Quantity :</b>
														</label>
														<input
															type="number"
															className="form-control"
															name="quantity"
															placeholder="Enter Quantity"
															min="1"
															value={service.quantity ? service.quantity : ""}
															onChange={(e) => {
																this.handleMultipleServiceChange(e.target.name, e.target.value, index, service.name)
															}}
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
															value={service.amount >= 0 ? service.amount : ""}
														/>
													</div>
												</div>
												{index > 0 && (
													<div className="col-6 col-md-1">
														<div className="form-group">
															<label>
																<b>Remove</b>
															</label>
															<button
																className="btn btn-danger btn-icon btn-circle btn-lg"
																onClick={() => this.removeService(index)}
															>
																<i className="fa fa-trash"></i>
															</button>
														</div>
													</div>
												)}
											</div>
										))}
									</fieldset>
								</div>
								<div className="panel-body">
									<fieldset>
										<legend className="legend-text">Add Products</legend>
										<div className="form-group">
											<button type="button" class="btn btn-primary btn-sm" onClick={this.addProduct}>
												Add Product
											</button>
										</div>
										{this.state.data.products.map((product, index) => (
											<div className="row">
												<div className="col-12 col-md-4">
													<div className="form-group">
														<label>
															<b>Product Name :</b>
														</label>
														<Select
															options={this.selectProducts}
															placeholder={"Select product"}
															value={
																product.name && {
																	value: product.name,
																	label: product.name,
																}
															}
															onChange={(e) => this.handleProductChange("name", e.value, index)}
														/>
													</div>
												</div>
												<div className="col-12 col-md-3">
													<div className="form-group">
														<label>
															<b>Quantity :</b>
														</label>
														<input
															type="number"
															className="form-control"
															name="quantity"
															placeholder="Enter Quantity"
															min="1"
															value={product.quantity ? product.quantity : ""}
															onChange={(e) => {
																this.handleMultipleProductChange(e.target.name, e.target.value, index, product.name)
															}}
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
															value={product.amount >= 0 ? product.amount : ""}
														/>
													</div>
												</div>
												{index > 0 && (
													<div className="col-6 col-md-1">
														<div className="form-group">
															<label>
																<b>Remove</b>
															</label>
															<button
																className="btn btn-danger btn-icon btn-circle btn-lg"
																onClick={() => this.removeProduct(index)}
															>
																<i className="fa fa-trash"></i>
															</button>
														</div>
													</div>
												)}
											</div>
										))}
									</fieldset>
								</div>
								<div className="panel-body">
									<fieldset>
										<legend className="legend-text">Select Currency</legend>
										<div className="row">
											<div className="col-6 col-md-2">
												<div className="form-group">
													<label>
														<b>Currency :</b>
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
										<legend className="legend-text">Select Status</legend>
										<div className="row">
											<div className="col-6 col-md-2">
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
										{this.props.match.params.id === "new" ? "Create invoice" : "Save changes"}
									</button>
								</div>
							</PanelBody>
						</Panel>
					</div>
				</div>
			</div>
		);
	}
}

export default Invoice;
