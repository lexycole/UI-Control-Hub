import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody, } from "../../components/panel/panel.jsx";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { saveArea, getArea } from "./../../services/areas";
const Handle = Slider.Handle;

class Area extends Form {
  constructor(props) {
    super(props);

    this.state = {
      maxDateDisabled: true,
      data: {
        name: "",
        descriptions: "",
        floor: "",		
        coordinates: "",		
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

  async populateArea() {
    try {
      const AreaId = this.props.match.params.id;

      if (AreaId === "new") return;
      const { data: Area } = await getArea(AreaId);
      this.setState({ data: this.mapToViewModel(Area) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
    await this.populateArea();
  }

  schema = Joi.object({
    name: Joi.string(),
    descriptions: Joi.string(),
    coordinates: Joi.string(),	
  });

  
  doSubmit = async (Area) => {
    try {
      await saveArea(this.state.data);
      this.props.history.push("/databases/Areas");
    } catch (ex) {

      if (ex.response) {
        const errors = { ...this.state.errors };
        const path = ex.response.data.split('"')[1];
        errors[path] = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  mapToViewModel(Area) {
    return {
      _id: Area._id,
      coordinates: Area.coordinates,
      name: Area.name,
      descriptions: Area.descriptions,
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
              <Link to="/ero/areas">Areas</Link>
            </li>
            <li className="breadcrumb-item active">Add Area</li>
          </ol>
          <h1 className="page-header">
            Add Area <small>Area-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add Area</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    {this.renderInput("name", "name", "text", "Enter name" )}
                    {this.renderTextarea("descriptions", "descriptions", "Enter descriptions" )}
                    {this.renderInput("floor", "Floor", "Floor" )}					
                    {this.renderInput("coordinates", "coordinates", "text", "Enter coordinates")}
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

export default withRouter(Area);
