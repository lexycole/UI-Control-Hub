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
import { saveAMateriaMedica, getAMateriaMedica } from "./../../services/amateriamedicas";
//const apiUrl = process.env.REACT_APP_API_URL;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class AMateriaMedica extends Form {
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
				synonyms: "",
				ayurvedicSynonyms: "",				
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
				tcm: "",
				type: "",
				medicalPart: "",				
				family: "",				
				tasteRasa: "",				
				dosage: "",								
				temperature: "",								
				guna: "",					
				virya: "",	
				vipaka: "",					
				contraIndication: "",								
				caution: "",		
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

		this.typeOptions = [
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

		this.tasteRasaOptions = [
			{ value: "Madhura-Sweet", label: "Madhura-Sweet"},
			{ value: "Katu-Hot", label: "Katu-Hot"},
			{ value: "Amala-Sour", label: "Amala-Sour"},
			{ value: "Lavaṇa-Salty", label: "Lavaṇa-Salty"},
			{ value: "Tikta-Bitter", label: "Tikta-Bitter"},
			{ value: "Kaṣaya-Astringent", label: "Kaṣaya-Astringent"},			
		];

		this.vipakaOptions = [
			{ value: "Madhura-Sweet", label: "Madhura-Sweet"},
			{ value: "Katu-Pungent", label: "Katu-Pungent"},
			{ value: "Amala-Sour", label: "Amala-Sour"},
		];

		this.viryaOptions = [
			{ value: "Sheeta-Cold", label: "Sheeta-Cold"},
			{ value: "Ushna-Hot", label: "Ushna-Hot"},
			{ value: "Snigdha-Unctuous", label: "Snigdha-Unctuous"},
			{ value: "Ruksha-Dry/Non-Unctuous", label: "Dry/Non-Unctuous"},			
			{ value: "Guru-Heavy", label: "Guru-Heavy"},
			{ value: "Laghu-Light", label: "Laghu-Light"},
			{ value: "Mrdu-Soft", label: "Mrdu-Soft"},
			{ value: "Teekshna-Sharp", label: "Teekshna-Sharp"},			
		];

		this.temperatureOptions = [
			{ value: "Hot", label: "Hot"},
			{ value: "Warm", label: "Warm"},
			{ value: "Neutral", label: "Neutral"},
			{ value: "Cool", label: "Cool"},
			{ value: "Cold", label: "Cold" },
		];

		this.gunaOptions = [
			{ value: "Vata-Dry", label: "Vata-Dry" },
			{ value: "Vata-Light", label: "Vata-Light" },
			{ value: "Vata-Cold", label: "Vata-Cold" },
			{ value: "Vata-Rough", label: "Vata-Rough" },
			{ value: "Vata-Subtle", label: "Vata-Subtle" },
			{ value: "Vata-Mobile", label: "Vata-Mobile" },			
			{ value: "Vata-Clear", label: "Vata-Clear" },			
			{ value: "Pitta-Oily", label: "Pitta-Oily" },			
			{ value: "Pitta-Sharp", label: "Pitta-Sharp" },			
			{ value: "Pitta-Hot", label: "Pitta-Hot" },
			{ value: "Pitta-Light", label: "Pitta-Light" },			
			{ value: "Pitta-Mobile", label: "Pitta-Mobile" },			
			{ value: "Pitta-Liquid", label: "Pitta-Liquid" },	
			{ value: "Kapha-Oily", label: "Kapha-Oily" },						
			{ value: "Kapha-Cold", label: "Kapha-Cold" },			
			{ value: "Kapha-Heavy", label: "Kapha-Heavy" },						
			{ value: "Kapha-Slow", label: "Kapha-Slow" },			
			{ value: "Kapha-Slimy", label: "Kapha-Slimy" },									
			{ value: "Kapha-Dense", label: "Kapha-Dense" },						
			{ value: "Kapha-Soft", label: "Kapha-Soft" },						
			{ value: "Kapha-Static", label: "Kapha-Static" },									
			{ value: "Kapha-Cloudy", label: "Kapha-Cloudy" },			
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
		this.typeoptions = this.typeOptions.map((option) => (
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
	async populatevirya() {
		this.viryaoptions = this.viryaOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateTaste() {
		this.tasteRasaoptions = this.tasteRasaOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateMeridian() {
		this.familyoptions = this.MeridianOptions.map((option) => (
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

	async populateAMateriaMedica() {
		try {
			const AMateriaMedicaId = this.props.match.params.id;
			if (AMateriaMedicaId === "new") return;
			const { data: AMateriaMedica } = await getAMateriaMedica(AMateriaMedicaId);

			// AMateriaMedica.name = AMateriaMedica.name;
			// AMateriaMedica.businessName = AMateriaMedica.businessName;
			// AMateriaMedica.narrative = AMateriaMedica.narrative;
			// AMateriaMedica.type = AMateriaMedica.type;
			// AMateriaMedica.Meridian = AMateriaMedica.Meridian;
			// AMateriaMedica.field = AMateriaMedica.field;
			// AMateriaMedica.tags = AMateriaMedica.tags;
			// AMateriaMedica.department = AMateriaMedica.department;
			// AMateriaMedica.subDepartment = AMateriaMedica.subDepartment;
			// AMateriaMedica.locations = AMateriaMedica.locations;
			// AMateriaMedica.AMateriaMedicaNo = AMateriaMedica.AMateriaMedicaNo;
			// AMateriaMedica.documentNo = AMateriaMedica.documentNo;
			// AMateriaMedica.AMateriaMedicaReference = AMateriaMedica.AMateriaMedicaReference;
			// AMateriaMedica.sharingLink = AMateriaMedica.sharingLink;
			// AMateriaMedica.sharedTo = AMateriaMedica.sharedTo;
			// AMateriaMedica.createdOn = AMateriaMedica.createdOn;
			// AMateriaMedica.deadline = AMateriaMedica.deadline;
			// AMateriaMedica.status = AMateriaMedica.status;

			this.setState({ data: this.mapToViewModel(AMateriaMedica) });

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
		await this.populateAMateriaMedica();
	}

	schema = Joi.object({
		letter1: Joi.any().optional(),
		letter2: Joi.any().optional(),
		name: Joi.string(),
		chineseSPL: Joi.any().optional(),
		english: Joi.any().optional(),
		Meridian: Joi.any().optional(),
		type: Joi.any().optional(),
		latin: Joi.any().optional(),
		pinyin: Joi.any().optional(),
		createdOn: Joi.any().optional(),
		korean: Joi.any().optional(),
		
		family: Joi.any().optional(),
		AMateriaMedicaNo: Joi.any().optional(),
		habitat: Joi.any().optional(),
		
		type: Joi.any().optional(),
		medicalPart: Joi.any().optional(),
		temperature: Joi.any().optional(),
		dosage: Joi.any().optional(),		
		contraIndication: Joi.any().optional(),		
		caution: Joi.any().optional(),		
		references: Joi.any().optional(),		
		chemicalFormula: Joi.any().optional(),
		constituents: Joi.any().optional(),
		note: Joi.any().optional(),		
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
			await saveAMateriaMedica(this.state.data,this.state.attachments);
			this.props.history.push("/AMateriaMedica/AMateriaMedicas");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	makeAMateriaMedicaNo() {
		let AMateriaMedicaNumber = "TK-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 6; i++) AMateriaMedicaNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return AMateriaMedicaNumber;
	}

	mapToViewModel(amateriaMedica) {
		return {
			_id: amateriamedica._id,
			AMateriaMedicaNo: amateriamedica.AMateriaMedicaNo,			
			synonyms: amateriamedica.synonyms,
			ayurvedicSynonyms: amateriamedica.ayurvedicSynonyms,			
			name: amateriamedica.name,
			english: amateriamedica.english,
			type: amateriamedica.type,
			chineseSPL: amateriamedica.chineseSPL,
			family: amateriamedica.family,
			latin: amateriamedica.latin,
			pinyin: amateriamedica.pinyin,
			japanese: amateriamedica.japanese,
			hindiSanskrit: amateriamedica.hindiSanskrit,			
			korean: amateriamedica.korean,
			vietnamese: amateriamedica.vietnamese,
			thai: amateriamedica.thai,
			arabic: amateriamedica.arabic,			
			homeopathy: amateriamedica.homeopathy,
			tcm: amateriamedica.tcm,			
			guna: amateriamedica.guna,
			virya: amateriamedica.virya,
			vipaka: amateriamedica.vipaka,			
			SKU: amateriamedica.SKU,						
			videoLink: amateriamedica.videoLink,			
			sharingLink: amateriamedica.sharingLink,
			tasteRasa: amateriamedica.tasteRasa,
			dosage: amateriamedica.dosage,			
			temperature: amateriamedica.temperature,			
			medicalPart: amateriamedica.medicalPart,			
			contraIndication: amateriamedica.contraIndication,			
			caution: amateriamedica.caution,			
			constituents: amateriamedica.constituents,			
			chemicalFormula: amateriamedica.chemicalFormula,						
			references: amateriamedica.references,						
			notes: amateriamedica.notes,			
			createdOn: new Date(amateriamedica.createdOn),
			status: amateriamedica.status,
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
							<Link to="/clinic/amateriamedicas">MateriaMedicas</Link>
						</li>
						<li className="breadcrumb-item active">Add MateriaMedica</li>
					</ol>
					<h1 className="page-header">
						Add AMateriaMedica <small>Materia Medica-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add AMateriaMedica</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput("name","Name of MateriaMedica","text","Enter Name for MateriaMedica")}
										{this.renderInput("english", "English", "text", "Enter English")}
										{this.renderInput("latin", "Latin", "text", "Enter Latin")}
										{this.renderInput("chineseSPL", "Simplified Chinese", "text", "Enter Simplified Chinese")}										
										{this.renderInput("pinyin", "PinYin", "text", "Enter PinYin")}
										{this.renderInput("japanese", "Japanese", "text", "Enter Japanese")}
										{this.renderInput("korean", "Korean", "text", "Enter Korean")}
										{this.renderInput("vietnamese", "vietnamese", "text", "Enter vietnamese")}
										{this.renderInput("thai", "Thai", "text", "Enter Thai")}
										{this.renderInput("arabic", "Arabic", "text", "Enter Arabic")}
										{this.renderInput("hindiSanskrit", "HindiSanskrit", "text", "Enter HindiSanskrit")}
										{this.renderInput("homeopathy", "Homeopathy", "text", "Enter Homeopathy-name")}
										{this.renderInput("tcm", "TCM", "text", "Enter TCM-name")}
										{this.renderInput("family", "Family", "text", "Enter Family")}
										{this.renderInput("habitat", "Hanitat", "text", "Enter Habitat")}										
										{this.renderInput("medicalPart", "Medical Part for Use", "text", "Enter Medical Part for use")}
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="virya">Virya
											</label>
											<div className="col-lg-8">
												<select
													name="virya"
													id="virya"
													value={data.virya}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Virya</option>
													{this.viryaoptions}
												</select>
											</div>
											{errors.virya && <div className="alert alert-danger">{errors.virya}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="vipaka">Vipaka
											</label>
											<div className="col-lg-8">
												<select
													name="vipaka"
													id="vipaka"
													value={data.vipaka}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Vipaka</option>
													{this.vipakaoptions}
												</select>
											</div>
											{errors.vipaka && <div className="alert alert-danger">{errors.vipaka}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="tasteRasa">Taste-Rasa
											</label>
											<div className="col-lg-8">
												<select
													name="tasteRasa"
													id="tasteRasa"
													value={data.tasteRasa}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Taste-Rasa</option>
													{this.tasteRasaptions}
												</select>
											</div>
											{errors.tasteRasa && <div className="alert alert-danger">{errors.tasteRasa}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="type">Type
											</label>
											<div className="col-lg-8">
												<select
													name="type"
													id="type"
													value={data.type}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Type</option>
													{this.typeoptions}
												</select>
											</div>
											{errors.type && <div className="alert alert-danger">{errors.type}</div>}
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

										{this.renderInput("guna", "Guna", "text", "Enter Guna")}										
										{this.renderInput("dosage", "dosage", "text", "Enter Dosage")}										
										{this.renderInput("constituents", "constituents", "text", "Enter constituents")}																				
										{this.renderInput("chemicalFormula", "chemicalFormula", "text", "Enter chemicalFormula")}																														

										{this.renderInput("contraIndication", "ContraIndication", "text", "Enter ContraIndication")}
										{this.renderInput("caution", "caution", "text", "Enter caution")}										
										
										{this.renderInput("SKU", "SKU", "text", "Enter SKU")}										
										{this.renderInput("videoLink", "VideoLink", "text", "Enter VideoLink")}
										{this.renderInput("sharingLink", "SharingLink", "text", "Enter SharingLink")}										
										{this.renderInput("references", "References", "text", "Enter References")}

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

export default withRouter(AMateriaMedica);