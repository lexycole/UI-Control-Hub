import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
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
import { saveFormula, getFormula } from "./../../services/formulas";
//const apiUrl = process.env.REACT_APP_API_URL;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Formula extends Form {
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
        SKU: "",
        category: "",
        caution: "",
        chineseSPL: "",
        // chinese_spl: "",
        contraIndication: "",
        // contra_indication: "fdf",
        english: "",
        functionality: "",
        indication: "",
        ingredients: "",
        japanese: "",
        korean: "",
        modification: "",
        name: "",
        note: "",
        // notes: "fdf",
        pinyin: "",
        pulse: "",
        // reference: "fd",
        status: "",
        suggestion: "",
        tongue: "",
        videoLink: "",
        // video_link: "fdf",
        vietnamese: "",
      },
      selectedFile: null,
      errors: {},
    };

    this.categoryOptions = [
      { value: "Release the Exterior", label: "Release the Exterior" },
      { value: "Drain Fire", label: "Drain Fire" },
      { value: "Cool Blood", label: "Cool Blood" },
      {
        value: "Clear Heat and Dry Dampness",
        label: "Clear Heat and Dry Dampness",
      },
      {
        value: "Clear Heat and Eliminate Toxins",
        label: "Clear Heat and Eliminate Toxins",
      },
      {
        value: "Clear and Relieve Summerheat",
        label: "Clear and Relieve Summerheat",
      },
      { value: "Purgatives", label: "Purgatives" },
      { value: "Laxative", label: "Laxative" },
      { value: "Harsh Expellant", label: "Harsh Expellant" },
      {
        value: "Regulate Water and Drain Dampness",
        label: "Regulate Water and Drain Dampness",
      },
      { value: "Dispel Wind-Dampness", label: "Dispel Wind-Dampness" },
      {
        value: "Cool and Transform Phlegm-Heat",
        label: "Cool and Transform Phlegm-Heat",
      },
      { value: "Transform Phlegm-Cold", label: "Transform Phlegm-Cold" },
      {
        value: "Relieve Coughing and Wheezing",
        label: "Relieve Coughing and Wheezing",
      },
      {
        value: "Transform and Dissolve Dampness",
        label: "Transform and Dissolve Dampness",
      },
      { value: "Relieve Food Stagnation", label: "Relieve Food Stagnation" },
      { value: "Regulate the Qi", label: "Regulate the Qi" },
      { value: "Stop Bleeding", label: "Stop Bleeding" },
      {
        value: "Invigorate Blood and Remove Stagnation",
        label: "Invigorate Blood and Remove Stagnation",
      },
      {
        value: "Warm the Interior and Expel Cold",
        label: "Warm the Interior and Expel Cold",
      },
      { value: "Tonify Qi", label: "Tonify Qi" },
      { value: "Tonify Blood", label: "Tonify Blood" },
      { value: "Tonify Yang", label: "Tonify Yang" },
      { value: "Tonify Yin", label: "Tonify Yin" },
      {
        value: "Herbs that Astringe, Stabilize, Bind",
        label: "Herbs that Astringe, Stabilize, Bind",
      },
      {
        value: "Anchor, Settle, and Calm the Spirit",
        label: "Anchor, Settle, and Calm the Spirit",
      },
      {
        value: "Nourish the Heart and Calm the Spirit",
        label: "Nourish the Heart and Calm the Spirit",
      },
      { value: "Open the Orifices", label: "Open the Orifices" },
      {
        value: "Extinguish Wind and Stop Tremors",
        label: "Extinguish Wind and Stop Tremors",
      },
      { value: "Expel Parasites", label: "Expel Parasites" },
      {
        value: "Expel Phlegm by Inducing Vomiting",
        label: "Expel Phlegm by Inducing Vomiting",
      },
      { value: "External Application", label: "External Application" },
    ];

    this.pulseOptions = [
      { value: "Gan-Sweet 甘", label: "Gan-Sweet 甘" },
      { value: "Xin-Pungent 辛", label: "Xin-Pungent 辛" },
      { value: "Suan-Sour 酸", label: "Suan-Sour 酸" },
      { value: "xian-Salty 咸", label: "Xian-Salty 咸" },
      { value: "Dan-Bland 淡", label: "Dan-Bland 淡" },
      { value: "Ku-Bitter 苦", label: "Ku-Bitter 苦" },
      { value: "Se-Astringent 涩", label: "Se-Astringent 涩" },
      { value: "Xiang-Aromatic 香", label: "Xiang-Aromatic 香" },
    ];

    this.elementOptions = [
      { value: "Jin-Metal 金", label: "Jin-Metal 金" },
      { value: "Mu-Wood 木", label: "Mu-Wood 木" },
      { value: "Shui-Water 水", label: "Shui-Water 水" },
      { value: "Tu-Earth 土", label: "Tu-Earth 土" },
      { value: "Huo-Fire 火", label: "Huo-Fire 火" },
    ];

    this.functionalityOptions = [
      {
        value: "Nourish the Heart and Calm the Spirit",
        label: "Nourish the Heart and Calm the Spirit",
      },
      {
        value: "Sedate and Calm the Spirit",
        label: "Sedate and Calm the Spirit",
      },
      {
        value: "Clear Heat and Relieve Toxicity",
        label: "Clear Heat and Relieve Toxicity",
      },
      {
        value: "Clear Heat From Deficiency",
        label: "Clear Heat From Deficiency",
      },
      {
        value: "Clear Heat From The Nutritive Level and Cool The Blood",
        label: "Clear Heat From The Nutritive Level and Cool The Blood",
      },
      {
        value: "Clear Heat From The Organs",
        label: "Clear Heat From The Organs",
      },
      {
        value: "Clear Heat From The Qi Level",
        label: "Clear Heat From The Qi Level ",
      },
      { value: "Relieve Summerheat", label: "Relieve Summerheat" },
      { value: "Drive Out Excess Water", label: "Drive Out Excess Water" },
      {
        value: "Moisten the Intestines and Unblock the Bowels",
        label: "Moisten the Intestines and Unblock the Bowels",
      },
      { value: "Purge Heat Accumulation", label: "Purge Heat Accumulation" },
      {
        value: "Warm the Yang and Guide Out Accumulation",
        label: "Warm the Yang and Guide Out Accumulation",
      },
      { value: "Clear Damp-Heat", label: "Clear Damp-Heat" },
      { value: "Dispel Wind-Dampness", label: "Dispel Wind-Dampness " },
      {
        value: "Promote Urination and Leach out Dampness",
        label: "Promote Urination and Leach out Dampness",
      },
      { value: "Transform Damp Turbidity", label: "Transform Damp Turbidity" },
      {
        value: "Warm and Transform Water and Dampness",
        label: "Warm and Transform Water and Dampness",
      },
      { value: "Expel Parasites", label: "Expel Parasites" },
      { value: "Extinguish Internal Wind", label: "Extinguish Internal Wind" },
      {
        value: "Release Wind from the Skin and Channels",
        label: "Release Wind from the Skin and Channels",
      },
      {
        value: "Harmonize Lesser Yang Stage Disorders",
        label: "Harmonize Lesser Yang Stage Disorders",
      },
      {
        value: "Harmonize the Stomach and Intestines",
        label: "Harmonize the Stomach and Intestines",
      },
      {
        value: "Regulate and Harmonize the Liver and Spleen",
        label: "Regulate and Harmonize the Liver and Spleen",
      },
      {
        value: "Invigorate the Blood and Dispel Blood Stasis",
        label: "Invigorate the Blood and Dispel Blood Stasis",
      },
      {
        value: "Invigorate the Blood from Traumatic Injury",
        label: "Invigorate the Blood from Traumatic Injury",
      },
      {
        value: "Warm the Menses and Dispel Blood Stasis",
        label: "Warm the Menses and Dispel Blood Stasis",
      },
      {
        value: "Clear Heat and Open The Orifices",
        label: "Clear Heat and Open The Orifices",
      },
      {
        value: "Scour Phlegm and Open the Orifices",
        label: "Scour Phlegm and Open the Orifices",
      },
      {
        value: "Warms and Opens the Orifices",
        label: "Warms and Opens the Orifices",
      },
      { value: "Reduce Food Stagnation", label: "Reduce Food Stagnation" },
      {
        value: "Direct Rebellious Qi Downward",
        label: "Direct Rebellious Qi Downward",
      },
      {
        value: "Promote the Movement of Qi",
        label: "Promote the Movement of Qi",
      },
      {
        value: "Release Early Stage Exterior Disorders",
        label: "Release Early Stage Exterior Disorders",
      },
      { value: "Release Exterior Cold", label: "Release Exterior Cold" },
      {
        value: "Release Exterior Disorders with Head and Neck Symptoms",
        label: "Release Exterior Disorders with Head and Neck Symptoms",
      },
      {
        value: "Release Exterior Disorders with Interior Deficiency",
        label: "Release Exterior Disorders with Interior Deficiency",
      },
      {
        value: "Release Exterior-Interior Excess",
        label: "Release Exterior-Interior Excess",
      },
      {
        value: "Release Exterior Wind Heat",
        label: "Release Exterior Wind Heat",
      },
      {
        value: "Restrain Leakage from the Intestines",
        label: "Restrain Leakage from the Intestines",
      },
      {
        value: "Stabilize the Exterior and the Lungs",
        label: "Stabilize the Exterior and the Lungs",
      },
      { value: "Stabilize the Kidneys", label: "Stabilize the Kidneys" },
      { value: "Stabilize the Womb", label: "Stabilize the Womb" },
      {
        value: "Clear Heat and Stop Bleeding",
        label: "Clear Heat and Stop Bleeding",
      },
      { value: "Tonify And Stop Bleeding", label: "Tonify And Stop Bleeding" },
      { value: "Tonify the Blood", label: "Tonify the Blood" },
      { value: "Tonify the Qi", label: "Tonify the Qi" },
      { value: "Tonify the Qi and Blood", label: "Tonify the Qi and Blood" },
      { value: "Tonify the Yin", label: "Tonify the Yin" },
      { value: "Warm and Tonify the Yang", label: "Warm and Tonify the Yang" },
      {
        value: "Enrich the Yin and Moisten Dryness",
        label: "Enrich the Yin and Moisten Dryness",
      },
      {
        value: "Gently Disperse and Moisten Dryness",
        label: "Gently Disperse and Moisten Dryness",
      },
      {
        value: "Clear Heat and Transform Phlegm",
        label: "Clear Heat and Transform Phlegm",
      },
      {
        value: "Dry Dampness and Expel Phlegm",
        label: "Dry Dampness and Expel Phlegm",
      },
      {
        value: "Induce Vomiting to Discharge Phlegm",
        label: "Induce Vomiting to Discharge Phlegm",
      },
      {
        value: "Moisten Dryness and Transform Phlegm",
        label: "Moisten Dryness and Transform Phlegm",
      },
      {
        value: "Transform Phlegm and Dissipate Nodules",
        label: "Transform Phlegm and Dissipate Nodules",
      },
      {
        value: "Transform Phlegm and Extinguish Wind",
        label: "Transform Phlegm and Extinguish Wind",
      },
      {
        value: "Warm and Transform Cold-Phlegm",
        label: "Warm and Transform Cold-Phlegm",
      },
      { value: "Rescue Devastated Yang", label: "Rescue Devastated Yang" },
      {
        value: "Warm the Channels and Disperse Cold",
        label: "Warm the Channels and Disperse Cold",
      },
      {
        value: "Warm the Middle and Dispel Cold",
        label: "Warm the Middle and Dispel Cold",
      },
    ];

    this.meridianOptions = [
      {
        value: "Hand Yin Lung Meridian(LU) 手太阴肺经",
        label: "Hand Yin Lung Meridian (LU) 手太阴肺经",
      },
      {
        value: "Hand Yang Large Intestine Meridian(LI) 手阳明大肠经",
        label: "Hand Yang Large Intestine Meridian (LI) 手阳明大肠经",
      },
      {
        value: "Foot Yang Stomach Meridian(ST) 足阳明胃经",
        label: "Foot Yang Stomach Meridian (ST) 足阳明胃经",
      },
      {
        value: "Foot Yin Spleen Meridian(SP) 足太阴脾经",
        label: "Foot Yin Spleen Meridian (SP) 足太阴脾经",
      },
      {
        value: "Hand Yin Heart Meridian(HT) 手少阴心经",
        label: "Hand Yin Heart Meridian (HT) 手少阴心经",
      },
      {
        value: "Hand Yang Small Intestine Meridian(SI) 手太阳小肠经",
        label: "Hand Yang Small Intestine Meridian (SI) 手太阳小肠经",
      },
      {
        value: "Foot Yang Urinairy Bladder Meridian(BL) 足太阳膀胱经",
        label: "Foot Yang Urinairy Bladder Meridian (BL) 足太阳膀胱经",
      },
      {
        value: "Foot Yin Kidney Meridian(KI) 足少阴肾经",
        label: "Foot Yin Kidney Meridian(KI) 足少阴肾经",
      },
      {
        value: "Hand Yin Pericardium Meridian(PC) 手厥阴心包经",
        label: "Hand Yin Pericardium Meridian (PC) 手厥阴心包经",
      },
      {
        value: "Hand Yang San Jiao Meridian(SJ) 手少阳三焦经",
        label: "Hand Yang San Jiao Meridian (SJ) 手少阳三焦经",
      },
      {
        value: "Foot Yang Gall Bladder Meridian(GB) 足少阳胆经",
        label: "Foot Yang Gall Bladder Meridian(GB) 足少阳胆经",
      },
      {
        value: "Foot Yin Liver Meridian(LV) 足厥阴肝经",
        label: "Foot Yin Liver Meridian(LV) 足厥阴肝经",
      },
      {
        value: "The Governing Vessel(DU), Du Channel 督脈",
        label: "The Governing Vessel(DU), Du Channel 督脈",
      },
      {
        value: "The Conception Vessel(REN), Ren Channel 任脈",
        label: "The Conception Vessel(REN), Ren Channel 任脈",
      },
      {
        value: "Extra Points of the Chest and Abdomen, EX-CA",
        label: "Extra Points of the Chest and Abdomen, EX-CA",
      },
      {
        value: "Extra Points of the Head and Neck, EX-HN",
        label: "Extra Points of the Head and Neck, EX-HN",
      },
      {
        value: "Extra Points of Lower Extremities, EX-LE",
        label: "Extra Points of Lower Extremities, EX-LE",
      },
      {
        value: "Extra Points of Upper Extremities, EX-UE",
        label: "Extra Points of Upper Extremities, EX-UE",
      },
      {
        value: "Extra Points of Back, EX-B",
        label: "Extra Points of Back, EX-B",
      },
      {
        value: "Extra Points jīng wài xué 经外穴",
        label: "Extra Points jīng wài xué 经外穴",
      },
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
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
  }

  async populateFunctionality() {
    this.functionalityoptions = this.functionalityOptions.map((option) => (
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

  async populateFormula() {
    try {
      const FormulaId = this.props.match.params.id;
      if (FormulaId === "new") return;
      const { data: Formula } = await getFormula(FormulaId);

      this.setState({ data: this.mapToViewModel(Formula) });

      console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
	await this.populateFormula();
    await this.populateFunctionality();
    await this.populateStatus();
  }

  schema = Joi.object({
    SKU: Joi.any().optional(),
    category: Joi.any().optional(),
    caution: Joi.any().optional(),
    chineseSPL: Joi.any().optional(),
    contraIndication: Joi.any().optional(),
    english: Joi.any().optional(),
    functionality: Joi.any().optional(),
    indication: Joi.any().optional(),
    ingredients: Joi.any().optional(),
    japanese: Joi.any().optional(),
    korean: Joi.any().optional(),
    modification: Joi.any().optional(),
    name: Joi.any().optional(),
    note: Joi.any().optional(),
    pinyin: Joi.any().optional(),
    pulse: Joi.any().optional(),
    status: Joi.any().optional(),
    suggestion: Joi.any().optional(),
    tongue: Joi.any().optional(),
    videoLink: Joi.any().optional(),
    vietnamese: Joi.any().optional(),
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
      await saveFormula(this.state.data, this.state.attachments);
      this.props.history.push("/clinic/formulas");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.status = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  makeFormulaNo() {
    let FormulaNumber = "FM-";
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
    for (let i = 0; i <= 6; i++)
      FormulaNumber += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    return FormulaNumber;
  }

  mapToViewModel(formulas) {
    return {
      _id: formulas._id,
      SKU: formulas.SKU,
      category: formulas.category,
      caution: formulas.caution,
      chineseSPL: formulas.chineseSPL,
      contraIndication: formulas.contraIndication,
      english: formulas.english,
      functionality: formulas.functionality,
      indication: formulas.indication,
      ingredients: formulas.ingredients,
      japanese: formulas.japanese,
      korean: formulas.korean,
      modification: formulas.modification,
      name: formulas.name,
      note: formulas.note,
      pinyin: formulas.pinyin,
      pulse: formulas.pulse,
      status: formulas.status,
      suggestion: formulas.suggestion,
      tongue: formulas.tongue,
      videoLink: formulas.videoLink,
      vietnamese: formulas.vietnamese,
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
              <Link to="/clinic/formulas">Formulas</Link>
            </li>
            <li className="breadcrumb-item active">Add Formula</li>
          </ol>
          <h1 className="page-header">
            Add Formula <small>Formula-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add Formula</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    {this.renderInput(
                      "name",
                      "Name of Formula",
                      "text",
                      "Enter Name for Formula"
                    )}
                    {this.renderInput(
                      "english",
                      "English",
                      "text",
                      "Enter English"
                    )}
                    {this.renderInput(
                      "chineseSPL",
                      "Simplified Chinese",
                      "text",
                      "Enter Simplified Chinese"
                    )}
                    {this.renderInput(
                      "pinyin",
                      "PinYin",
                      "text",
                      "Enter PinYin"
                    )}
                    {this.renderInput(
                      "japanese",
                      "Japanese",
                      "text",
                      "Enter Japanese"
                    )}
                    {this.renderInput(
                      "korean",
                      "Korean",
                      "text",
                      "Enter Korean"
                    )}
                    {this.renderInput(
                      "vietnamese",
                      "vietnamese",
                      "text",
                      "Enter vietnamese"
                    )}

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="category"
                      >
                        Category
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
                          {this.categoryOptions.map((option) => (
                            <option key={option.label} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.category && (
                        <div className="alert alert-danger">
                          {errors.category}
                        </div>
                      )}
                    </div>

                    {this.renderInput(
                      "ingredients",
                      "ingredients",
                      "text",
                      "Enter ingredients, separate by"
                    )}

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="pulse"
                      >
                        Pulse
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="pulse"
                          id="pulse"
                          value={data.pulse}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Pulse</option>
                          {this.pulseOptions.map((option) => (
                            <option key={option.label} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.pulse && (
                        <div className="alert alert-danger">{errors.pulse}</div>
                      )}
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="functionality"
                      >
                        Functionality
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="functionality"
                          id="functionality"
                          value={data.functionality}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Functionality</option>
                          {this.functionalityoptions}
                        </select>
                      </div>
                      {errors.functionality && (
                        <div className="alert alert-danger">
                          {errors.functionality}
                        </div>
                      )}
                    </div>

                    {this.renderInput(
                      "contraIndication",
                      "Contraindication",
                      "text",
                      "Enter contraindication"
                    )}
                    {this.renderInput(
                      "modification",
                      "Modification",
                      "text",
                      "Enter Modification"
                    )}
                    {this.renderInput(
                      "indication",
                      "indication",
                      "text",
                      "Enter indication"
                    )}
                    {this.renderInput(
                      "caution",
                      "caution",
                      "text",
                      "Enter caution"
                    )}
                    {this.renderInput(
                      "suggestion",
                      "suggestion",
                      "text",
                      "Enter Suggestion"
                    )}
                    {this.renderInput(
                      "videoLink",
                      "VideoLink",
                      "text",
                      "Enter VideoLink"
                    )}
                    {this.renderInput("SKU", "SKU", "text", "Enter SKU")}

                    {this.renderInput("note", "Note", "text", "Enter Note")}

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="status"
                      >
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
                      {errors.status && (
                        <div className="alert alert-danger">
                          {errors.status}
                        </div>
                      )}
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

export default withRouter(Formula);