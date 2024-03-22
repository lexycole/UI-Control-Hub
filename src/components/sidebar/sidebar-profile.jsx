import React from "react";
import { Link } from "react-router-dom";
import { PageSettings } from "./../../config/page-settings.js";
import auth from "../../services/authservice";
import { getUser } from "../../services/users.js";

class SidebarProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileActive: 0,
      currentUser: {
        firstName: "",
        lastName: "",
        about: "",
		imageSrc: ''
      },
    };
    this.handleProfileExpand = this.handleProfileExpand.bind(this);
  }

  handleProfileExpand(e) {
    e.preventDefault();
    this.setState((state) => ({
      profileActive: !this.state.profileActive,
    }));
  }
  async componentDidMount() {
    try {
      const user = auth.getProfile();
      if (user) {
        const { data: currentUser } = await getUser(user._id);
        this.setState({ currentUser: this.mapToViewModel(currentUser) });
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  mapToViewModel(user) {
    return {
      _id: user._id,
      //   username: user.username,
      //   password: user.password,
      //   profile: user.profile,
      //   email: user.email,
      firstName: user.contactName.first,
      lastName: user.contactName.last,
      about: user.about,
      imageSrc: user.imageSrc,
      mood:user.mood,
      //   initials: user.contactName.initials,
      //   country: user.country,
      //   gender: user.gender,
      //   prefix: user.prefix,
    };
  }

  render() {
    const { currentUser } = this.state;
    return (
      <PageSettings.Consumer>
        {({ pageSidebarMinify }) => (
          <ul className="nav">
            <li
              className={
                "nav-profile " + (this.state.profileActive ? "expand " : "")
              }
            >
              <Link to="/" onClick={this.handleProfileExpand}>
                <div className="cover with-shadow"></div>
                <div className="image">
                  <img src={currentUser.imageSrc} alt="" />
                </div>
                <div className="info">
                  <b className="caret pull-right"></b>
                  {currentUser.firstName} {currentUser.lastName}
                  <small>{currentUser.mood}</small>
                </div>
              </Link>
            </li>
            <li>
              <ul
                className={
                  "nav nav-profile " +
                  (this.state.profileActive && !pageSidebarMinify
                    ? "d-block "
                    : "")
                }
              >
                <li>
                  <Link to="/">
                    <i className="fa fa-cog"></i> Settings
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa fa-pencil-alt"></i> Send Feedback
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa fa-question-circle"></i> Helps
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </PageSettings.Consumer>
    );
  }
}

export default SidebarProfile;
