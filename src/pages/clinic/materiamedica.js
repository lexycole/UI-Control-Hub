import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
import DateTime from "react-datetime";
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import Select from "react-select";
import http from "../../services/httpService";
import auth from "../../services/authservice";
import { saveMateriaMedica, getMateriaMedica } from "./../../services/materiamedicas";
//const apiUrl = process.env.REACT_APP_API_URL;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class MateriaMedica extends Form {
	constructor(props) {
		super(props);

		var maxYesterday = "";
		var minYesterday = DateTime.moment().subtract(1, "day");

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false,
			});
			maxYesterday = value;
		};

		this.state = {
			maxDateDisabled: true,
			isEditable: true,
			users: [],
			data: {
				letter1: "",
				letter2: "",				
				name: "",
				latin: "",
				pinyin: "",
				chineseSPL: "",
				english: "",				
				korean: "",
				japanese: "",
				vietnamese: "",				
				hindiSanskrit: "",
				thai: "",
				arabic: "",
				homeopathy: "",
				ayurveda: "",

				category: "",
				functionality: "",				
				meridian: "",				
				taste: "",				
				dosage: "",								
				temperature: "",				
				indication: "",				
				caution: "",		
				alternateNames: "",	
				videoLink: "",
				sharingLink: "",				
				SKU: "",
				reference: "",
				notes: "",								
				status: "",
				
			},
			selectedFile: null,
			errors: {},
		};

		this.categoryOptions = [
			{ value: "Release the Exterior", label: "Release the Exterior" },
			{ value: "Drain Fire", label: "Drain Fire" },
			{ value: "Cool Blood", label: "Cool Blood" },
			{ value: "Clear Heat and Dry Dampness", label: "Clear Heat and Dry Dampness" },
			{ value: "Clear Heat and Eliminate Toxins", label: "Clear Heat and Eliminate Toxins" },
			{ value: "Clear and Relieve Summerheat", label: "Clear and Relieve Summerheat" },
			{ value: "Purgatives", label: "Purgatives" },			
			{ value: "Laxative", label: "Laxative" },			
			{ value: "Harsh Expellant", label: "Harsh Expellant" },			
			{ value: "Regulate Water and Drain Dampness", label: "Regulate Water and Drain Dampness" },			
			{ value: "Dispel Wind-Dampness", label: "Dispel Wind-Dampness" },			
			{ value: "Cool and Transform Phlegm-Heat", label: "Cool and Transform Phlegm-Heat" },			
			{ value: "Transform Phlegm-Cold", label: "Transform Phlegm-Cold" },			
			{ value: "Relieve Coughing and Wheezing", label: "Relieve Coughing and Wheezing" },			
			{ value: "Transform and Dissolve Dampness", label: "Transform and Dissolve Dampness" },			
			{ value: "Relieve Food Stagnation", label: "Relieve Food Stagnation" },			
			{ value: "Regulate the Qi", label: "Regulate the Qi" },			
			{ value: "Stop Bleeding", label: "Stop Bleeding" },			
			{ value: "Invigorate Blood and Remove Stagnation", label: "Invigorate Blood and Remove Stagnation" },			
			{ value: "Warm the Interior and Expel Cold", label: "Warm the Interior and Expel Cold" },			
			{ value: "Tonify Qi", label: "Tonify Qi" },			
			{ value: "Tonify Blood", label: "Tonify Blood" },			
			{ value: "Tonify Yang", label: "Tonify Yang" },
			{ value: "Tonify Yin", label: "Tonify Yin" },								
			{ value: "Herbs that Astringe, Stabilize, Bind", label: "Herbs that Astringe, Stabilize, Bind" },			
			{ value: "Anchor, Settle, and Calm the Spirit", label: "Anchor, Settle, and Calm the Spirit" },			
			{ value: "Nourish the Heart and Calm the Spirit", label: "Nourish the Heart and Calm the Spirit" },						
			{ value: "Open the Orifices", label: "Open the Orifices" },						
			{ value: "Extinguish Wind and Stop Tremors", label: "Extinguish Wind and Stop Tremors" },						
			{ value: "Expel Parasites", label: "Expel Parasites" },						
			{ value: "Expel Phlegm by Inducing Vomiting", label: "Expel Phlegm by Inducing Vomiting" },						
			{ value: "External Application", label: "External Application" },			
		];

		this.tasteOptions = [
			{ value: "Gan-Sweet 甘", label: "Gan-Sweet 甘"},
			{ value: "Xin-Pungent 辛", label: "Xin-Pungent 辛"},
			{ value: "Suan-Sour 酸", label: "Suan-Sour 酸"},
			{ value: "xian-Salty 咸", label: "Xian-Salty 咸"},
			{ value: "Dan-Bland 淡", label: "Dan-Bland 淡"},
			{ value: "Ku-Bitter 苦", label: "Ku-Bitter 苦"},
			{ value: "Se-Astringent 涩", label: "Se-Astringent 涩"},			
			{ value: "Xiang-Aromatic 香", label: "Xiang-Aromatic 香"},			
		];

		this.elementOptions = [
			{ value: "Jin-Metal 金", label: "Jin-Metal 金"},
			{ value: "Mu-Wood 木", label: "Mu-Wood 木"},
			{ value: "Shui-Water 水", label: "Shui-Water 水"},
			{ value: "Tu-Earth 土", label: "Tu-Earth 土"},
			{ value: "Huo-Fire 火", label: "Huo-Fire 火"},
		];

		this.temperatureOptions = [
			{ value: "Re-Hot 热", label: "Re-Hot 热"},
			{ value: "Wen-Warm 温", label: "Wen-Warm 温"},
			{ value: "Ping-Neutral 平", label: "Ping-Neutral 平"},
			{ value: "Liang-Cool 凉", label: "Liang-Cool 凉"},
			{ value: "Han-Cold 寒", label: "Han-Cold 寒" },
		];

		this.meridianOptions = [
			{ value: "Hand Yin Lung Meridian(LU) 手太阴肺经", label: "Hand Yin Lung Meridian (LU) 手太阴肺经" },
			{ value: "Hand Yang Large Intestine Meridian(LI) 手阳明大肠经", label: "Hand Yang Large Intestine Meridian (LI) 手阳明大肠经" },
			{ value: "Foot Yang Stomach Meridian(ST) 足阳明胃经", label: "Foot Yang Stomach Meridian (ST) 足阳明胃经" },
			{ value: "Foot Yin Spleen Meridian(SP) 足太阴脾经", label: "Foot Yin Spleen Meridian (SP) 足太阴脾经" },
			{ value: "Hand Yin Heart Meridian(HT) 手少阴心经", label: "Hand Yin Heart Meridian (HT) 手少阴心经" },
			{ value: "Hand Yang Small Intestine Meridian(SI) 手太阳小肠经", label: "Hand Yang Small Intestine Meridian (SI) 手太阳小肠经" },			
			{ value: "Foot Yang Urinairy Bladder Meridian(BL) 足太阳膀胱经", label: "Foot Yang Urinairy Bladder Meridian (BL) 足太阳膀胱经" },			
			{ value: "Foot Yin Kidney Meridian(KI) 足少阴肾经", label: "Foot Yin Kidney Meridian(KI) 足少阴肾经" },			
			{ value: "Hand Yin Pericardium Meridian(PC) 手厥阴心包经", label: "Hand Yin Pericardium Meridian (PC) 手厥阴心包经" },			
			{ value: "Hand Yang San Jiao Meridian(SJ) 手少阳三焦经", label: "Hand Yang San Jiao Meridian (SJ) 手少阳三焦经" },
			{ value: "Foot Yang Gall Bladder Meridian(GB) 足少阳胆经", label: "Foot Yang Gall Bladder Meridian(GB) 足少阳胆经" },						
			{ value: "Foot Yin Liver Meridian(LV) 足厥阴肝经", label: "Foot Yin Liver Meridian(LV) 足厥阴肝经" },						
			{ value: "The Governing Vessel(DU), Du Channel 督脈", label: "The Governing Vessel(DU), Du Channel 督脈" },
			{ value: "The Conception Vessel(REN), Ren Channel 任脈", label: "The Conception Vessel(REN), Ren Channel 任脈" },						
			{ value: "Extra Points of the Chest and Abdomen, EX-CA", label: "Extra Points of the Chest and Abdomen, EX-CA" },						
			{ value: "Extra Points of the Head and Neck, EX-HN", label: "Extra Points of the Head and Neck, EX-HN" },			
			{ value: "Extra Points of Lower Extremities, EX-LE", label: "Extra Points of Lower Extremities, EX-LE" },									
			{ value: "Extra Points of Upper Extremities, EX-UE", label: "Extra Points of Upper Extremities, EX-UE" },									
			{ value: "Extra Points of Back, EX-B", label: "Extra Points of Back, EX-B" },
			{ value: "Extra Points jīng wài xué 经外穴", label: "Extra Points jīng wài xué 经外穴" },			
		];

		this.statusOptions = [
			{ value: "in progress", label: "In Progress" },
			{ value: "pending", label: "Pending" },
			{ value: "active", label: "Active" },
			{ value: "archived", label: "Archived" },
		];

		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}

	async populateCategory() {
		this.categoryoptions = this.categoryOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateTemperature() {
		this.temperatureoptions = this.temperatureOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateElement() {
		this.elementoptions = this.elementOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateTaste() {
		this.tasteoptions = this.tasteOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateMeridian() {
		this.meridianoptions = this.meridianOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateStatus() {
		this.statusoptions = this.statusOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateMateriaMedica() {
		try {
			const MateriaMedicaId = this.props.match.params.id;
			if (MateriaMedicaId === "new") return;
			const { data: MateriaMedica } = await getMateriaMedica(MateriaMedicaId);

			// MateriaMedica.name = MateriaMedica.name;
			// MateriaMedica.businessName = MateriaMedica.businessName;
			// MateriaMedica.narrative = MateriaMedica.narrative;
			// MateriaMedica.category = MateriaMedica.category;
			// MateriaMedica.Meridian = MateriaMedica.Meridian;
			// MateriaMedica.field = MateriaMedica.field;
			// MateriaMedica.tags = MateriaMedica.tags;
			// MateriaMedica.department = MateriaMedica.department;
			// MateriaMedica.subDepartment = MateriaMedica.subDepartment;
			// MateriaMedica.locations = MateriaMedica.locations;
			// MateriaMedica.MateriaMedicaNo = MateriaMedica.MateriaMedicaNo;
			// MateriaMedica.documentNo = MateriaMedica.documentNo;
			// MateriaMedica.MateriaMedicaReference = MateriaMedica.MateriaMedicaReference;
			// MateriaMedica.sharingLink = MateriaMedica.sharingLink;
			// MateriaMedica.sharedTo = MateriaMedica.sharedTo;
			// MateriaMedica.createdOn = MateriaMedica.createdOn;
			// MateriaMedica.deadline = MateriaMedica.deadline;
			// MateriaMedica.status = MateriaMedica.status;

			this.setState({ data: this.mapToViewModel(MateriaMedica) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	async componentDidMount() {
		await this.populateCategory();
		await this.populateElement();		
		await this.populateTaste();				
		await this.populateTemperature();						
		await this.populateMeridian();
		await this.populateStatus();
		await this.populateMateriaMedica();
	}

	schema = Joi.object({
		letter1: Joi.any().optional(),
		letter2: Joi.any().optional(),
		name: Joi.string(),
		chineseSPL: Joi.any().optional(),
		english: Joi.any().optional(),
		Meridian: Joi.any().optional(),
		category: Joi.any().optional(),
		latin: Joi.any().optional(),
		pinyin: Joi.any().optional(),
		createdOn: Joi.any().optional(),
		korean: Joi.any().optional(),
		
		locations: Joi.any().optional(),
		MateriaMedicaNo: Joi.any().optional(),
		documentNo: Joi.any().optional(),
		field: Joi.any().optional(),
		tags: Joi.any().optional(),
		reference: Joi.any().optional(),
		//sharingLink: Joi.any().optional(),
		//sharedTo: Joi.any().optional(),
		//sharedTill: Joi.any().optional(),		
		status: Joi.any().required(),
	});

	handlecreatedOnChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data["createdOn"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	onChangeImgHandler = (event) => {
		this.setState({ attachments: event.target.files[0] });
		console.log(event.target.files[0]);
	};

	handleMultiChange = (name, options) => {
		const data = { ...this.state.data };
		console.log("value", options);
		data[name] = options.map((o) => o.value);
		console.log(
			"options",
			options.map((o) => o.value)
		);
		this.setState({ data });
	};

	doSubmit = async () => {
		console.log(this.state.data);
		const user = auth.getProfile();	
		const data = { ...this.state.data };
		data.user = user._id;
		this.setState({ data });
		try {
			await saveMateriaMedica(this.state.data,this.state.attachments);
			this.props.history.push("/MateriaMedica/MateriaMedicas");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	makeMateriaMedicaNo() {
		let MateriaMedicaNumber = "TK-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 6; i++) MateriaMedicaNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return MateriaMedicaNumber;
	}

	mapToViewModel(materiaMedica) {
		return {
			_id: materiaMedica._id,
			MateriaMedicaNo: materiaMedica.MateriaMedicaNo,			
			letter1: materiaMedica.letter1,
			letter2: materiaMedica.letter2,			
			name: materiaMedica.name,
			english: materiaMedica.english,
			category: materiaMedica.category,
			chineseSPL: materiaMedica.chineseSPL,
			meridian: materiaMedica.meridian,
			latin: materiaMedica.latin,
			pinyin: materiaMedica.pinyin,
			japanese: materiaMedica.japanese,
			hindiSanskrit: materiaMedica.hindiSanskrit,			
			korean: materiaMedica.korean,
			vietnamese: materiaMedica.vietnamese,
			thai: materiaMedica.thai,
			arabic: materiaMedica.arabic,			
			homeopathy: materiaMedica.homeopathy,
			ayurveda: materiaMedica.ayurveda,			
			reference: materiaMedica.reference,
			SKU: materiaMedica.SKU,						
			videoLink: materiaMedica.videoLink,			
			sharingLink: materiaMedica.sharingLink,
			taste: materiaMedica.taste,
			dosage: materiaMedica.dosage,			
			temperature: materiaMedica.temperature,			
			functionality: materiaMedica.functionality,			
			indication: materiaMedica.indication,			
			caution: materiaMedica.caution,			
			alternateNames: materiaMedica.alternateNames,			
			notes: materiaMedica.notes,			
			createdOn: new Date(materiaMedica.createdOn),
			status: materiaMedica.status,
		};
	}

	render() {
		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to="/MateriaMedica/MateriaMedicas">MateriaMedicas</Link>
						</li>
						<li className="breadcrumb-item active">Add MateriaMedica</li>
					</ol>
					<h1 className="page-header">
						Add MateriaMedica-Solo <small>MateriaMedica-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add MateriaMedica</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput("name","Name of MateriaMedica","text","Enter Name/Title/subject for MateriaMedica")}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="element">Element
											</label>
											<div className="col-lg-8">
												<select
													name="element"
													id="element"
													value={data.element}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Element</option>
													{this.elementoptions}
												</select>
											</div>
											{errors.element && <div className="alert alert-danger">{errors.element}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="taste">Taste
											</label>
											<div className="col-lg-8">
												<select
													name="taste"
													id="taste"
													value={data.taste}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Taste</option>
													{this.tasteptions}
												</select>
											</div>
											{errors.taste && <div className="alert alert-danger">{errors.taste}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="category">Category
											</label>
											<div className="col-lg-8">
												<select
													name="category"
													id="category"
													value={data.category}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Category</option>
													{this.categoryoptions}
												</select>
											</div>
											{errors.category && <div className="alert alert-danger">{errors.category}</div>}
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="meridian">Meridian
											</label>
											<div className="col-lg-8">
												<select
													name="meridian"
													id="meridian"
													value={data.meridian}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Meridian</option>
													{this.meridianoptions}
												</select>
											</div>
											{errors.meridian && <div className="alert alert-danger">{errors.meridian}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="temperature">Temperature
											</label>
											<div className="col-lg-8">
												<select
													name="temperature"
													id="temperature"
													value={data.temperature}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Temperature</option>
													{this.temperatureoptions}
												</select>
											</div>
											{errors.temperature && <div className="alert alert-danger">{errors.temperature}</div>}
										</div>

										{this.renderInput("english", "English", "text", "Enter English")}
										{this.renderInput("latin", "Latin", "text", "Enter Latin")}
										{this.renderInput("pinyin", "PinYin", "text", "Enter PinYin")}
										{this.renderInput("japanese", "Japanese", "text", "Enter Japanese")}
										{this.renderInput("korean", "Korean", "text", "Enter Korean")}
										{this.renderInput("vietnamese", "vietnamese", "text", "Enter vietnamese")}
										{this.renderInput("thai", "Thai", "text", "Enter Thai")}
										{this.renderInput("arabic", "Arabic", "text", "Enter Arabic")}
										{this.renderInput("hindiSanskrit", "HindiSanskrit", "text", "Enter HindiSanskrit")}
										{this.renderInput("homeopathy", "Homeopathy", "text", "Enter Homeopathy")}
										{this.renderInput("ayurveda", "Ayurveda", "text", "Enter Ayurveda")}
										{this.renderInput("chineseSPL", "Simplified Chinese", "text", "Enter Simplified Chinese")}
										{this.renderInput("videoLink", "VideoLink", "text", "Enter VideoLink")}
										{this.renderInput("sharingLink", "SharingLink", "text", "Enter SharingLink")}										
										{this.renderInput("SKU", "SKU", "text", "Enter SKU")}										
										{this.renderInput("functionality", "functionality", "text", "Enter functionality")}
										{this.renderInput("indication", "indication", "text", "Enter indication")}
										{this.renderInput("caution", "caution", "text", "Enter caution")}
										
										{this.renderInput("reference", "Reference", "text", "Enter Reference")}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status">
												Status
											</label>
											<div className="col-lg-8">
												<select
													name="status"
													id="status"
													value={data.status}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.status && <div className="alert alert-danger">{errors.status}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Attachments</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc"
													
														className="form-control-file m-b-5"
														onChange={this.onChangeImgHandler}
													/>
													{errors.imageSrc && (
														<div className="alert alert-danger">
															{errors.imageSrc}
														</div>
													)}
												</div>
											</div>
										</div>

										<div className="form-group row">
											<div className="col-lg-8">
												<button
													type="submit"
													disabled={this.validate}
													className="btn btn-primary width-65"
												>
													Submit
												</button>
											</div>
										</div>
									</form>
								</PanelBody>
							</Panel>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(MateriaMedica);