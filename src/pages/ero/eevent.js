import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody, } from "../../components/panel/panel.jsx";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { saveEevent, getEevent } from "./../../services/eevents";
const Handle = Slider.Handle;

class Eevent extends Form {
  constructor(props) {
    super(props);

    this.state = {
      maxDateDisabled: true,
      data: {
        name: "",
        action: "",
        step: "",
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
  }

  async populateEevent() {
    try {
      const eeventId = this.props.match.params.id;

      if (eeventId === "new") return;
      const { data: eevent } = await getEevent(eeventId);
      this.setState({ data: this.mapToViewModel(eevent) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
    await this.populateEevent();
  }

  schema = Joi.object({
    name: Joi.string(),
    action: Joi.string(),
    step: Joi.string(),
  });

  
  doSubmit = async (Eevent) => {
    try {
      await saveEevent(this.state.data);
      this.props.history.push("/ero/eevents");
    } catch (ex) {

      if (ex.response) {
        const errors = { ...this.state.errors };
        const path = ex.response.data.split('"')[1];
        errors[path] = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  mapToViewModel(Eevent) {
    return {
      _id: Eevent._id,
      name: Eevent.name,
      action: Eevent.action,
      step: Eevent.step,
    };
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div>
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="/form/plugins">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/ero/eevents">Eevents</Link>
            </li>
            <li className="breadcrumb-item active">Add Eevent</li>
          </ol>
          <h1 className="page-header">
            Add Eevent <small>Eevent-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add Eevent</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    {this.renderInput("name", "Name", "text", "Enter Code")}
                    {this.renderTextarea("action", "Action", "text", "Enter Action" )}
                    {this.renderInput("step", "Step", "Step" )}
						{/*    <div className="form-group row">
                      {errors.imageSrc && (
                        <div className="alert alert-danger">
                          {errors.imageSrc}
                        </div>
                      )}
						</div>  */}
                    <div className="form-group row">
                      <div className="col-lg-8">
                        <button
                          type="submit"
                          disabled={this.validate()}
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

export default withRouter(Eevent);
