import Joi from "joi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
//import Select from 'react-select';
//import Select from "../../common/select";
import Tooltip from "rc-tooltip";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { withRouter } from "react-router-dom";
import Form from "../../common/form.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../components/panel/panel.jsx";
import CountryDropDown from "../../components/user/CountryDropDown";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import { saveLabel } from "../../services/labels";
import auth from "./../../services/authservice";
import { getLabel } from "./../../services/labels";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Label extends Form {
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
      madeIn: [],
      profiles: [],
      loading: false,
      data: {
        user: "",
        printerName: "",
        printerUsername: "",		
        name: "",
        labelSize: "",
        fontSize: "3",
        orientation: "",		
        SKU: "",				
		serial: "",		
        madeIn: "",
        barcodeType: "",
        expiredOn: "",
        copies: "1",
        note: "",
        printedOn: null,
        orientation: false,
      },
      selectedFile: null,
      errors: {},
    };


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
    // this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
  }

  async populateLabel() {
    try {
      const LabelId = this.props.match.params.id;

      if (LabelId === "new") return;

      const { data: label } = await getLabel(LabelId);

      this.setState({
        data: this.mapToViewModel(label),
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async populateMadeIn() {
    const { data: madeIn } = await http.get(apiUrl + "/madeIn");
    this.setState({ madeIn: madeIn });
    //this.selectMadeIn = this.state.madeIn.map((country)=>({label: country.name, value: country.name}) );
    this.selectMadeIn = this.state.madeIn.map((country) => ({
      _id: country._id,
      label: country.name,
      value: country.name,
    }));
  }

  // async populateUser() {
  //   try {
  //     const labelId = this.props.match.params.id;
  //     console.log(labelId);
  //     if (labelId === "new") return;

  //     const { data: label } = await getLabel(labelId);

  //     this.setState({ data: this.mapToViewModel(label) });
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
  //       this.props.history.replace("/error");
  //   }
  // }

  setCurrentUser() {
    const Id = this.props.match.params.id;

    if (Id !== "new") return;

    const { _id: currentUser_id } = auth.getProfile();
    const data = { ...this.state.data };
    data.user = currentUser_id;
    this.setState({ data: data });
  }

  async componentDidMount() {
    this.setCurrentUser();
    await this.populatelabelSize();
    await this.populatebarcodeType();
    await this.populateMadeIn();
    await this.populateLabel();
  }

  // schema = Joi.object({
  // 	username: Joi.string().required().label('Username')
  // 	//password: Joi.string().required().label('Password'),
  // 	//email:Joi.string().required().label('Email'),
  // 	//gender:Joi.string().required().label('Gender'),
  // 	//country:Joi.string().required().label('Country')
  // });
  schema = Joi.object({
    username: Joi.string().optional(),
    name: Joi.string().optional(),
    labelSize: Joi.string().optional(),
    fontSize: Joi.string().optional(),
    SKU: Joi.string().optional(),
    serial: Joi.string().optional(),
    copies: Joi.string().optional(),
    madeIn: Joi.string().optional(),
    printerName: Joi.string().optional(),
    printerUsername: Joi.string().optional(),	
    printedOn: Joi.bool().optional(),
    orientation: Joi.bool().optional(),
    expiredOn: Joi.date().optional(),
    barcodeType: Joi.string().optional(),
    note: Joi.string().optional(),
  });

  handledateChange = (e) => {
    const errors = { ...this.state.errors };
    const obj = { date: e };

    const data = { ...this.state.data };
    data["expiredOn"] = e;
    //const data = {...this.state.data};
    //data.date = e;
    this.setState({ data });
    console.log(this.state.data);
  };

  doSubmit = async (label) => {
    this.setState({ loading: true });
    try {
      await saveLabel(this.state.data);
      this.setState({ loading: false });
      this.props.history.push("/label/labels");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        this.setState({ loading: false });
      }
      this.setState({ loading: false });
    }
  };

  mapToViewModel(data) {
    return {
      _id: data._id,
      user: data.user,
      name: data.name,
      printerName: data.printerName,
      printerUsername: data.printerUsername,	  
      labelSize: data.labelSize,
      fontSize: data.fontSize,
      orientation: data.orientation,
      SKU: data.SKU,
      serial: data.serial,	  
      madeIn: data.madeIn[0],
      barcodeType: data.barcodeType,
      copies: data.copies,
      printedOn: data.printedOn,
      expiredOn: data.expiredOn,
      note: data.note,
    };
  }

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div>
          <h1 className="page-header">
            Add Label <small>Label-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add Label</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    {this.renderInput("SKU", "SKU", "text", "Enter SKU")}
					<div className="form-group row">
                      <label className="col-lg-4 col-form-label">Save this value for next prints</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div className="form-check mr-4">
                            <input className="form-check-input" type="radio" name="note" value="No" onChange={this.handleChange} />
                            <label className="form-check-label" htmlFor="note" >No</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="note" value="Yes" onChange={this.handleChange}/>
                            <label className="form-check-label" htmlFor="note" >Yes</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {this.renderInput("serial","Serial","text","Enter serial")}
                    <div className="form-group row">
						<label className="col-lg-4 col-form-label" htmlFor="madeIn" >Made In</label>
                      <div className="col-lg-8">
                        <CountryDropDown
                          changeHandler={(e) => {
                            const data = { ...this.state.data };
                            data.madeIn = e;
                            this.setState({ data: data });
                          }}
                          selectedValue={
                            this.state.data.madeIn
                              ? this.state.data.madeIn
                              : "MadeIn"
                          }
                          name="madeIn"
                        />
                      </div>
                      {errors.madeIn && (
                        <div className="alert alert-danger">
                          {errors.madeIn}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label" htmlFor="expiredOn" >Expired-Date</label>
                      <div className="col-lg-8">
                        <DatePicker
                          onChange={this.handledateChange}
                          id="expiredOn"
                          value={data.expiredOn}
                          selected={data.expiredOn}
                          inputProps={{ placeholder: "Datepicker" }}
                          className="form-control"
                        />
                        {errors.date && (
                          <div className="alert alert-danger">
                            {errors.date}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row">
						<label className="col-lg-4 col-form-label" htmlFor="country" >Country</label>
                      <div className="col-lg-8">
                        <CountryDropDown
                          changeHandler={(e) => {
                            const data = { ...this.state.data };
                            data.country = e;
                            this.setState({ data: data });
                          }}
                          selectedValue={
                            this.state.data.country
                              ? this.state.data.country
                              : "Country"
                          }
                          name="country"
                        />
                      </div>
                      {errors.country && (
                        <div className="alert alert-danger">
                          {errors.country}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Note</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <textarea name="note" id="note" cols="30" rows="5" className="form-control m-b-5" placeholder="Enter Note" value={data.note} 
                            onChange={this.handleChange}>
						  </textarea>
                        </div>
                      </div>
                    </div>

                    {this.renderInput("copies", "copies", "number", "Enter copies")}

                    <div className="form-group row">
                      <div className="col-lg-8">
                        <button type="submit" disabled={this.validate() || this.state.loading} className="btn btn-primary btn-sm" >Print Label
                        </button>
                        <button type="submit" disabled={this.validate() || this.state.loading} className="btn btn-danger btn-sm" >Cancel
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

export default withRouter(Label);
