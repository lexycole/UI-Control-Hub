import React, { Fragment } from "react";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
import ReusableTabNavs from "../ticketprofile/ReusableTabNavs";
import ReusableTab from "../ticketprofile/ReusableTab";
import { TabContent } from "reactstrap";
import InvoiceProfile from "./invoiceprofile";
import Reviews from "./Reviews";
// import "./style.css";

class InvoiceProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
    };
  }

  setActiveTab = (n) => this.setState({ activeTab: n });

  nextTab = () => {
    this.setState((prevState) => ({ activeTab: prevState.activeTab + 1 }));
  };

  previousTab = () => {
    this.setState((prevState) => ({ activeTab: prevState.activeTab - 1 }));
  };

  renderTabButtons = () => {
    return (
      <div className="form-group float-right">
        <button
          type="button"
          class="btn btn-green btn-sm mr-2"
          onClick={this.previousTab}
        >
          Previous
        </button>
        <button
          type="button"
          class="btn btn-green btn-sm"
          onClick={this.nextTab}
        >
          Next
        </button>
      </div>
    );
  };

  render() {
    const tabMenus = [
      { label: "Basic Information", background: "#FFC69F" },
      { label: "Data Spreadsheet", background: "#DED99F" },
      {
        label: "Comments",
        background: "#FFC6FF",
      },
      { label: "Reviews", background: "#FFF5AD" },
      { label: "Sharing", background: "#A2F5AD" },
      {
        label: "Notes",
        background: "#FFFFC9",
      },
      {
        label: "Fishbone",
        background: "#f0e533",
      },
    ];

    return (
      <Fragment>
        <Panel>
          <PanelHeader noButton>Invoice Profile</PanelHeader>
          <PanelBody>
            <ReusableTabNavs
              setActiveTab={(n) => this.setActiveTab(n)}
              activeTab={this.state.activeTab}
              navprops={tabMenus}
            />
            <TabContent activeTab={this.state.activeTab}>
              <ReusableTab id={1}>
                <div className="mt-5">
                  <InvoiceProfile />
                  <div className="form-group float-right">
                    <button
                      type="button"
                      class="btn btn-green btn-sm"
                      onClick={this.nextTab}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </ReusableTab>
              <ReusableTab id={2} height={"100%"} width={"100%"}>
                <div className="mt-5">
                  Hello
                  {this.renderTabButtons()}
                </div>
              </ReusableTab>
              <ReusableTab id={3}>
                <div className="mt-5">
                  Hello
                  {this.renderTabButtons()}
                </div>
              </ReusableTab>
              <ReusableTab id={4}>
                <div className="mt-5">
                  <Reviews />
                  {this.renderTabButtons()}
                </div>
              </ReusableTab>
              <ReusableTab id={5}>
                <Fragment>
                  <h4>Sharing</h4>
                  <p>
                    Nullam ac sapien justo. Nam augue mauris, malesuada non
                    magna sed, feugiat blandit ligula. In tristique tincidunt
                    purus id iaculis. Pellentesque volutpat tortor a mauris
                    convallis, sit amet scelerisque lectus adipiscing.
                  </p>
                </Fragment>
              </ReusableTab>
              <ReusableTab id={6}>Hello</ReusableTab>
            </TabContent>
          </PanelBody>
        </Panel>
      </Fragment>
    );
  }
}

InvoiceProfileContainer.defaultProps = {
  isEditable: true,
};

export default InvoiceProfileContainer;
