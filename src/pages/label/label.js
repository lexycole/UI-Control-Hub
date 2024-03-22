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
import {Panel,PanelBody,PanelHeader,} from "../../components/panel/panel.jsx";

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
        name: "",
        labelSize: "",
        fontSize: "3",
        orientation: false,		
        SKU: "",				
		serial: "",		
        madeIn: "",
        barcodeType: "",
        expiredOn: null,
        AWB: "",
        country: "",
        delivery: "",
        location: "",				
        copies: 1,
        note: "",
        printedOn: false,
        // printUsername: false,
        // lastAccess: new Date(),
      },
      imageSrc: null,	  
      selectedFile: null,
      errors: {},
    };

    this.labelSizeOptions = [
      { value: "100mmx48mm", label: "100mm x 48mm" },
      { value: "1.5inchx1", label: '1.5"x1' },
      { value: "1inchx3", label: '1"x3' },
      { value: "2inchx1", label: '2"x1' },
      { value: "2-0.25inchx0.5", label: '2-1/4"x1/2' },
      { value: "1-0.5inchx3-0.5", label: '1-0.5"x3-0.5' },
      { value: "1-0.2inchx0.85", label: '1-0.2"x0.85' },
      { value: "1.125inchx1.25", label: '1.125"x1.25' },
      { value: "1-3/16inchx1", label: '1-3/16"x1' },
      { value: "1.2inchx0.85", label: '1.2"x0.85' },
      { value: "1-0.25inchx1", label: '1-0.25"x1' },
      { value: "1-0.75inchx2-0.75", label: '1-0.75"x2-0.75' },
      { value: "2.25inchx1.25-1", label: '2.25"x1.25-1' },
      { value: "2.25inchx1.25", label: '2.25"x1.25' },
      { value: "2-0.25inchx1-0.25", label: '2-0.25"x1-0.25' },
      { value: "3inchx1", label: '3"x1' },
      { value: "3inchx2", label: '3"x2' },
      { value: "4inchx1", label: '4"x1' },
      { value: "4inchx2", label: '4"x2' },
      { value: "4inchx2.5", label: '4"x2.5' },
      { value: "4inchx3", label: '4"x3' },
      { value: "4inchx4", label: '4"x4' },
      { value: "4inchx5", label: '4"x5' },
      { value: "4inchx6", label: '4"x6' },
      { value: "4inchx6.5", label: '4"x6.5' },
      { value: "4inchx8", label: '4"x8' },
      { value: "4inchx13", label: '4"x13' },
      { value: "6inchx4", label: '6"x4' },
    ];

    this.barcodeTypeOptions = [
      { value: "UPC-E", label: "UPC-E" },
      { value: "UPC-A", label: "UPC-A" },
      { value: "JAN/EAN8", label: "JAN/EAN8" },
      { value: "JAN/EAN13", label: "JAN/EAN13" },
      { value: "Code39", label: "Code39" },
      { value: "ITF", label: "ITF" },
      { value: "Code128", label: "Code128" },
      { value: "Code93", label: "Code93" },
      { value: "NW-7", label: "NW-7" },
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
    this.handleBoolean = this.handleBoolean.bind(this)
  }

  async populatelabelSize() {
    this.labelSizeoptions = this.labelSizeOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }
  async populatebarcodeType() {
    this.barcodeTypeoptions = this.barcodeTypeOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }

  handleBoolean = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    if(input.value === "true") {
      //  input.value = true
       data[input.name] = true;
      }
      if(input.value === "false") {
        // input.value = false
        data[input.name] = false;
    }
    this.setState({ data, errors });
  };

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
    // username: Joi.string().optional(),
    user: Joi.string().optional(),
    name: Joi.string().optional(),
    labelSize: Joi.string().optional(),
    fontSize: Joi.string().optional(),
    SKU: Joi.bool().optional(),
    serial: Joi.bool().optional(),
    copies: Joi.number().optional(),
    madeIn: Joi.bool().optional(),
    // printUsername: Joi.bool().optional(),
    printerName: Joi.string().optional(),
    printedOn: Joi.bool().optional(),
    orientation: Joi.bool().optional(),
    expiredOn: Joi.bool().optional(),
    barcodeType: Joi.string().optional(),
    note: Joi.bool().optional(),
    AWB: Joi.bool().optional(),
    country: Joi.bool().optional(),
    delivery: Joi.bool().optional(),
    location: Joi.bool().optional(),
    // lastAccess: Joi.date().optional()
	
  });
	onChangeImgHandler = event => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	}

  handledateChange = (e) => {
    const errors = { ...this.state.errors };
    const obj = { date: e };

    const data = { ...this.state.data };
    data["expiredOn"] = e;
    //const data = {...this.state.data};
    //data.date = e;
    this.setState({ data });
    // console.log(this.state.data);
  };

  doSubmit = async (label) => {
    // await saveLabel(this.state.data);
    // console.log("done");
    this.setState({ loading: true });
    try {
      console.log("chbdyhbg");
      console.log(this.state.data);
      await saveLabel(this.state.data);
      this.setState({ loading: false });
	  console.log("done");
      this.props.history.push("/label/labels");
    } catch (ex) {
      console.log("error")
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
      AWB: data.AWB,
      country: data.country,
      delivery:data.delivery,
      location: data.location,
      // lastAccess: new Date(data.lastAccess)
	  
    };
  }

  

  
  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div>
          <h1 className="page-header">
            Add Label <small>Label-configuration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add Label</PanelHeader>
                <PanelBody className="panel-form">
                  <form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
                    {this.renderInput("printerName", "Printer-Name", "text", "Enter Name of Printer")}
                    {this.renderInput("name","Label-Name","text","* Enter Name for label")}
                    {this.renderInput("fontSize","Fontsize","number","Enter Size for font")}

                    <div className="form-group row">
                      <label className="col-lg-2 col-form-label"htmlFor="labelSize">
                        Label Size
                      </label>
                      <div className="col-lg-3">
                        <select name="labelSize" id="labelSize" value={this.state.data.labelSize && this.state.data.labelSize}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Labelsize</option>
                          {this.labelSizeoptions}
                        </select>
                      </div>
                      {errors.labelSize && (
                        <div className="alert alert-danger">
                          {errors.labelSize}
                        </div>
                      )}
                      <label className="col-lg-2 col-form-label"htmlFor="barcodeType">
                        Barcode Type
                      </label>
                      <div className="col-lg-3">
                        <select name="barcodeType" id="barcodeType" value={this.state.data.barcodeType && this.state.data.barcodeType}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Barcode-Type</option>
                          {this.barcodeTypeoptions}
                        </select>
                      </div>
                      {errors.barcodeType && (
                        <div className="alert alert-danger">
                          {errors.barcodeType}
                        </div>
                      )}
					  
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Orientation</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="orientation" value={Boolean(true)} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="orientation">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="orientation" value={Boolean(false)} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="orientation">No</label>
                          </div>
                        </div>
				       </div>
                    </div>
					

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">SKU</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="SKU" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="SKU">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="SKU" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="SKU">No</label>
                          </div>
                        </div>
				      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Serial</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="serial" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="serial">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="serial" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="serial">No</label>
                          </div>
                        </div>
				       </div>
                    </div>
					
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Made In</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="madeIn" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="madeIn">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="madeIn" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="madeIn">No</label>
                          </div>
                        </div>
				       </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Printed On</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="printedOn" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="printedOn">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="printedOn" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="printedOn">No</label>
                          </div>
                        </div>
				       </div>
                    </div>
					
					<div className="form-group row">
                      <label className="col-lg-4 col-form-label">AWB</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="AWB" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="AWB">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="AWB" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="AWB">No</label>
                          </div>
                        </div>
				      </div>
                    </div>

					<div className="form-group row">
                      <label className="col-lg-4 col-form-label">Expired-on</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="expiredOn" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="expiredOn">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="expiredOn" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="expiredOn">No</label>
                          </div>
                        </div>
				      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Country</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="country" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="country">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="country" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="country">No</label>
                          </div>
                        </div>
				       </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Delivery</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="delivery" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="delivery">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="delivery" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="delivery">No</label>
                          </div>
                        </div>
				       </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Location</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div class="form-check mr-4">
                            <input class="form-check-input" type="radio" name="location" value={true} onChange={this.handleBoolean}/>
                            <label class="form-check-label" for="location">Yes</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="location" value={false} onChange={this.handleBoolean} />
                            <label class="form-check-label" for="location">No</label>
                          </div>
                        </div>
				       </div>
                    </div>


                    {/* <div className="form-group row">
                      <label className="col-lg-4 col-form-label">PrintUsername</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div className="form-check mr-4">
                            <input className="form-check-input" type="radio" name="printUsername" value={false} onChange={this.handleBoolean} />
                            <label className="form-check-label" htmlFor="printUsername" >No</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="printUsername" value={true} onChange={this.handleBoolean}/>
                            <label className="form-check-label" htmlFor="printUsername" >Yes</label>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="lastAccess" >Last Access</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handledateChange}
													id={data.lastAccess}
													value={data.lastAccess}
													selected={data.lastAccess}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.lastAccess && <div className="alert alert-danger">{errors.lastAccess}</div>}
											</div>
										</div> */}

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Note</label>
                      <div className="col-lg-8">
                        <div className="row row-space-5">
                          <div className="form-check mr-4">
                            <input className="form-check-input" type="radio" name="note" value={false} onChange={this.handleBoolean} />
                            <label className="form-check-label" htmlFor="note" >No</label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="note" value={true} onChange={this.handleBoolean}/>
                            <label className="form-check-label" htmlFor="note" >Yes</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.renderInput("copies","copies","number","Enter copies" )}

					<div className="form-group row">
						<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Image</label>
							<div className="col-lg-8">
								<div className="row row-space-10">
									<input type="file" id="imageSrc" name="imageSrc" className="form-control-file m-b-5" onChange={this.onChangeImgHandler}/>
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
                        <button type="submit" disabled={this.validate() || this.state.loading} className="btn btn-primary btn-sm" >Submit
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
