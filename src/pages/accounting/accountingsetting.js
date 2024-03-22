import Joi from "joi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
//import Select from "../../common/select";
import Tooltip from "rc-tooltip";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import Form from "../../common/form.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../components/panel/panel.jsx";
import {
  saveAccountingSetting,
  getAccountingSetting,
  getMyAccountingSetting,
} from "../../services/accountingsettings";
import auth from "./../../services/authservice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import editIcon from "../../assets/Icons/edit.svg"
import { Link, NavLink, withRouter } from "react-router-dom"

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class AccountingSetting extends Form {
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
    this.decimalSeperatorOptions = [
      { value: "comma", label: "comma" },
      { value: "dot", label: "dot" },
    ];

    this.state = {
      maxDateDisabled: true,
      profiles: [],
      loading: false,
      data: {
        decimalSeperator: this.decimalSeperatorOptions[1].label,
        beginFinancialYear: Date.now(),
        currency: this.currencyOptions[0].label,
        termOfPayment: "30",
      },
      checked: "Dot",
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
    this.handleBoolean = this.handleBoolean.bind(this);
  }

  async populateCurrency() {
    this.currencyoptions = this.currencyOptions.map((option) => (
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
    if (input.value === "true") {
      //  input.value = true
      data[input.name] = true;
    }
    if (input.value === "false") {
      // input.value = false
      data[input.name] = false;
    }
    this.setState({ data, errors });
  };

   

	async componentDidMount() {
		await this.populateAccountingSettings();
	}

  async populateAccountingSettings() {
    try {
      const AccountingSettingsId = this.props.match.params.id;

      if (AccountingSettingsId === "new") return;
      
      // const { data: accountingsetting } = await getAccountingSetting(
      //   AccountingSettingsId
      // );

      const { data: accountingsetting } = await getMyAccountingSetting();
      console.log("accountingsetting ",accountingsetting);
      //accountingsetting.userNo = accountingsetting.userNo
       this.setState({
        data: this.mapToViewModel(accountingsetting),
       });
 console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  schema = Joi.object({
    currency: Joi.string().optional(),
    decimalSeperator: Joi.string().optional(),
    beginFinancialYear: Joi.date().optional(),
    termOfPayment: Joi.number().optional(),
  });

  handledateChange = (e) => {
    const errors = { ...this.state.errors };
    const obj = { date: e };

    const data = { ...this.state.data };
    data["beginFiscalYear"] = e;
    //const data = {...this.state.data};
    //data.date = e;
    this.setState({ data });
    // console.log(this.state.data);
  };

  doSubmit = async () => {
    console.log(this.state.data);
    //await saveAccountingSetting(this.state.data);
    // console.log("done");
    this.setState({ loading: true });
    try {
      console.log(this.state.data);
      await saveAccountingSetting(this.state.data);
      this.setState({ loading: false });
      console.log("done");
      this.props.history.push("/dashboard");
    } catch (ex) {
      console.log("error");
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        this.setState({ loading: false });
      }
      this.setState({ loading: false });
    } 
  };

  componentWillUnmount() {
    // Cancel any asynchronous tasks or subscriptions here
  }

	mapToViewModel(accountingsetting) {
		return {
            _id: accountingsetting._id,
            currency: accountingsetting.currency,
            decimalSeperator: accountingsetting.decimalSeperator,
            //beginFinancialYear: accountingsetting.beginFinancialYear,
            beginFinancialYear: accountingsetting.beginFinancialYear
            ? new Date(accountingsetting.beginFinancialYear)
            : null,
            termOfPayment: accountingsetting.termOfPayment,
            userNo: accountingsetting.userNo
		};

	  }


  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div>
          <h1 className="page-header">
            Accounting Settings{" "}
            <small>AccountingSettings-configuration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Accounting Setting</PanelHeader>
                <NavLink
								className="btn btn-default active m-r-5 m-b-5"
								title="edit"
								style={btnStyles}
								to={
									{}
								}
							>
								{/* {" "}
                <Link
                  to={
                    this.state.checkedFields
                      ? `/clinic/users/${this.state.checkedFields[0]}`
                      : "/clinic/users/"
                  }
                > */}
								<img style={iconStyles} src={editIcon} />
								{/* </Link>{" "} */}
							</NavLink>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    {/* {this.renderInput("decimalSeperator","Decimal Seperator","text","Decimal Seperator")} */}
                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="decimalSeperator"
                      >Decimal Seperator :
                      </label>
                      <div>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="Dot"
                          name="radio-buttons-group"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <FormControlLabel
                            value="Dot"
                            control={<Radio size="small" />}
                            label="Dot"
                          />
                          <FormControlLabel
                            value="Comma"
                            control={<Radio size="small" />}
                            label="Comma"
                          />
                        </RadioGroup>
                      </div>
                      {errors.decimalSeperator && (
                        <div className="alert alert-danger">
                          {errors.decimalSeperator}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="currency"
                      >
                        Currency :
                      </label>
                      <div className="col-lg-8">
                        <Select
                          options={this.currencyOptions}
                          placeholder={"Select currency"}
                          value={
                            this.state.data.currency && {
                              value: this.state.data.currency,
                              label: this.state.data.currency,
                            }
                          }
                          onChange={
                            (e) =>
                              this.setState({
                                data: {
                                  ...this.state.data,
                                  currency: e.value,
                                },
                              })
                            //this.handleChange("currency", e.value)
                          }
                        />
                      </div>
                      {errors.currency && (
                        <div className="alert alert-danger">
                          {errors.currency}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="beginFinancialYear"
                      >
                        Begin Financial Year
                      </label>
                      <div className="col-lg-6">
                        <DatePicker
                          onChange={(e) =>
                            this.setState({
                              data: {
                                ...this.state.data,
                                beginFinancialYear: e,
                              },
                            })
                          }
                          id={data.beginFinancialYear}
                          value={this.state.data.beginFinancialYear}
                          selected={this.state.data.beginFinancialYear}
                          inputProps={{ placeholder: "Begin Financial Year" }}
                          className="form-control"
                        />
                        {errors.date && (
                          <div className="alert alert-danger">
                            {errors.beginFinancialYear}
                          </div>
                        )}
                      </div>
                    </div>
                    {this.renderInput(
                      "termOfPayment",
                      "term Of Payment",
                      "number",
                      "Enter Term Of Payment"
                    )}

                    <div className="form-group row">
                      <div className="col-lg-8">
                        <button
                          type="submit"
                          disabled={this.validate() || this.state.loading}
                          className="btn btn-primary btn-sm"
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
const btnStyles = { background: "white", margin: "0rem" }
const iconStyles = {
	width: "25px",
	height: "25px",
	marginRight: "0rem",
}
export default withRouter(AccountingSetting);
