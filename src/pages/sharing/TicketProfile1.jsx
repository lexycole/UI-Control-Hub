import React from "react";
import { Link } from "react-router-dom";
import BasicInfo from "./BasicInfoFields/BasicInfo";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
// import SpreadSheet from "./SpreadSheet";
import ReusableTabNavs from "./ReusableTabNavs";
import ReusableTab from "./ReusableTab";
import { TabContent } from "reactstrap";
import Spreadsheet from "./Spreadsheet/SpreadSheet";
import "./index.css";

//import Actions from "./../../../src/components/ticket/Action";
//import Card from "./../../../src/components/ticket/Card";
//import Filter from "./../../../src/components/ticket/Filters";
//import Category from "./../../../src/components/ticket/Category";
//import "./../../../src/components/kanban/style.css";

class TicketTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      readOnly: true,
      activeTab: 1,
      read: true,
    };
    this.setReadOnly = this.setReadOnly.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }
  setActiveTab = (n) => this.setState({ activeTab: n });
  actions = [
    {
      label: "Save",
      icon: "fa-save",
      trigger: () => {},
    },
    {
      label: "Edit",
      icon: "fa-edit",
      trigger: () => this.setReadOnly(),
    },
    {
      label: "Print",
      icon: "fa-print",
      trigger: () => {},
    },
    {
      label: "Archive",
      icon: "fa-archive",
      trigger: () => {},
    },
    {
      label: "Save as PDF",
      icon: "fa-pdf-file",
      trigger: () => {},
    },
  ];

  toggleRead = () => this.setState({ read: !this.state.read });

  setReadOnly = () => this.setState({ readOnly: !this.state.readOnly });

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/tickets">Tickets</Link>
          </li>
        </ol>
        <h1 className="page-header">Ticket-profile</h1>
        <div className="row">
          <div className="col-12">
            <Panel>
              <PanelHeader noButton>Tickets</PanelHeader>
              <PanelBody>
                <h1>Ticket name</h1>

                <ReusableTabNavs
                  actions={this.actions}
                  setActiveTab={(n) => this.setActiveTab(n)}
                  activeTab={this.state.activeTab}
                  navprops={[
                    { label: "Basic information", background: "#FFC69F" },
                    { label: "Data Spreadsheet", background: "#DED99F" },
                    { label: "Comments", background: "#FFC6FF" },
                    { label: "Reviews", background: "#FFF5AD" },
                    { label: "Sharing", background: "#A2F5AD" },
                    { label: "Notes", background: "#FFFFC9" },
                    { label: "Fishbone", background: "#F4FF2B" },					
                    { label: "Piechart", background: "#B09EFF" },			
                  ]}
                />
                <TabContent activeTab={this.state.activeTab}>
                  <ReusableTab id={1}>
                    <BasicInfo
                      readOnly={this.state.readOnly}
                      setReadOnly={() => this.setReadOnly()}
                    />
                  </ReusableTab>
                  <ReusableTab id={2} height={"100%"} width={"100%"}>
                    <Spreadsheet
                      readOnly={this.state.readOnly}
                      setReadOnly={() => this.setReadOnly()}
                    />
                  </ReusableTab>
                  <ReusableTab id={3}>
                    <>
                      <h4>Comments</h4>
                      <p>
                        Nullam ac sapien justo. Nam augue mauris, malesuada non
                        magna sed, feugiat blandit ligula. In tristique
                        tincidunt purus id iaculis. Pellentesque volutpat tortor
                        a mauris convallis, sit amet scelerisque lectus
                        adipiscing.
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={4}>
                    <>
                      <h4>Reviews</h4>
                      <p>task nr 11
http://cameronroe.github.io/react-star-rating/
https://github.com/SahajR/react-star-review

                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={5}>
                    <>
                      <h4>Sharing</h4>
                      <p> task nr 10
tab “sharing”. There is a file with info or part of code for supporting this task. It is on github/src/page/clinic
With a button to copy sharing-link to clipboard. Further there are 3 accordions.


                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={6}>
                    <>
                      <h4>Notes</h4>
                      <p>task nr 10
making use of file email/inbox to for implementation notes in tab “Notes” . the files you have to use and work on are located in src/page/ticket
When clicking on the subject, the “details of note” will be unfold. Use class accordion.


For post a note make use of notecompose.

c. build in button to close the detail and redirect back to noteinbox
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={7}>
                    <>
                      <h4>Fishbone</h4>
                      <p>
tab Fishbone
https://github.com/thiagoferrax/fishbone-chart
Give for the each cause in the fishbone-chart a color as background. For  “environment”: #E911DB, for “proces”: #8411E9, for  “methods”: #1F11E9, for “materials”:#11A8E9, for  “people”: #11E9BE, for “equipment”: #11E93C.

Or pass the values and colors of category (from component) of ticket to fishbone

                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={8}>
                    <>
                      <h4>Pie-chart of tickets</h4>
                      <p>
 pie-chart with tickets on it
 https://stackoverflow.com/questions/10028182/how-to-make-a-pie-chart-in-css/51679606
https://keithclark.co.uk/articles/single-element-pure-css-pie-charts/
https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
https://codeburst.io/how-to-pure-css-pie-charts-w-css-variables-38287aea161e
https://css-tricks.com/simple-interactive-pie-chart-with-css-variables-and-houdini-magic/
!  http://mrbool.com/how-to-create-pie-charts-with-css3/29014


Creating a pie-chart with 9 equal sections. Each section is a category of tickets. Each sections has its own color
Display a ticket on the pie-chart. Place it in the right section. 
Create a pie-chart for tickets. Retrieve data from table tickets and display them on the pie-chart.
The tickets will be divided into 8 categories:

(bug-error (0 to 45 degree), complaint (45 to 90 degree), disconnection (90 to 135 degree), invoices (135 to 180 degree), feature-request (180 to 225 degree), orders (225 to 270 degree, support (270 to 315 degree ), other (315 to 360 degree))
See next pic

 create a card like next pic

display in the pie-chart: ticket-nr, username of the creator and username of the one who is assigned to as a kind of “sticky note” in the pie-chart , sort by category. If there are more cards from the same category, display them cascades on that piece of pie


                      </p>
                    </>
                  </ReusableTab>
                </TabContent>
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketTabs;
