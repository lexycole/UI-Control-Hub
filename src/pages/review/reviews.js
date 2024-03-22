import React, { Component } from "react"
//import { Link } from 'react-router-dom';
import { Link, withRouter } from "react-router-dom"

import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx"
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
//import axios from 'axios';
import { getReviews, deleteReview } from "./../../services/reviews"
import "bootstrap/dist/css/bootstrap.min.css"
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination"
import { paginate } from "../../utils/paginate"
import ReviewsTable from "../../components/ReviewsTable.jsx"
import SearchBox from "./../../common/searchBox"
import _ from "lodash"
import http from "./../../services/httpService"
import { apiUrl } from "./../../config/config.json"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

class ReviewTableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Reviews: [],
      pageSize: 10,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
      errors: {},
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    const { data } = await getReviews()
    this.setState({ Reviews: data })
  }

  handleDelete = async (Review) => {
    ///delete
    const originalReviews = this.state.Reviews
    const Reviews = this.state.Reviews.filter(
      (Review) => Review._id !== Review._id
    )
    this.setState({ Reviews })
    try {
      await http.delete(apiUrl + "/Reviews/" + Review._id)
    } catch (ex) {
      //ex.request
      //ex.response

      if (ex.response && ex.response === 404) {
        alert("already deleted")
      }

      this.setState({ Reviews: originalReviews })
    }
    ////
  }

  //sorting columns
  handleSort = (sortColumn) => {
    this.setState({ sortColumn })
  }
  handlePageChange = (page) => {
    console.log(page)
    this.setState({ currentPage: page })
  }

  handleSearch = (query) => {
    console.log(query)
    this.setState({ searchQuery: query, currentPage: 1 })
  }

  getDataPgnation = () => {
    const {
      pageSize,
      currentPage,
      Reviews: Reviews,
      sortColumn,
      searchQuery,
    } = this.state
    //
    //filter maybe next time
    let filtered = Reviews
    if (searchQuery) {
      console.log(searchQuery)
      filtered = Reviews.filter(
        (el) =>
          el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          el.Reviewname.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    }

    //
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const Reviews = paginate(sorted, currentPage, pageSize)
    return { data: Reviews }
  }

  render() {
    const { length: count } = this.state.Reviews
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state
    if (count === 0) return "<p>No data available</p>"

    const { data: Reviews } = this.getDataPgnation()

    return (
      <div>
        <h1 className="page-header">Reviews </h1>
        <Panel>
          <PanelHeader>Reviews Management</PanelHeader>

          <React.Fragment>
            <ToastContainer />
            {/* {Review && ( <button className="btn btn-default active m-r-5 m-b-5" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/Review/new">Add Review</Link>  </button>)} */}
            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="add Review"
              style={
                ({ marginBottom: 20 }, { marginLeft: 20 }, { marginTop: 20 })
              }
            >
              {" "}
              <Link to="/clinic/Reviews/new">
                <i className="fas fa-plus"></i>
              </Link>{" "}
            </button>
            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="edit"
              style={
                ({ marginBottom: 20 }, { marginLeft: 20 }, { marginTop: 20 })
              }
            >
              {" "}
              <Link to="/clinic/Reviews/edit">
                <i className="far fa-edit"></i>
              </Link>{" "}
            </button>
            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="delete"
              style={
                ({ marginBottom: 20 }, { marginLeft: 20 }, { marginTop: 20 })
              }
            >
              {" "}
              <Link to="/clinic/Reviews/del">
                <i className="far fa-trash-alt"></i>
              </Link>{" "}
            </button>
            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="download"
              style={
                ({ marginBottom: 20 }, { marginLeft: 20 }, { marginTop: 20 })
              }
            >
              {" "}
              <Link to="/clinic/Reviews/download">
                <i className="ion-md-download"></i>
              </Link>{" "}
            </button>
            <div className="table-responsive">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <p
                className="page-header float-xl-left"
                style={
                  ({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })
                }
              >
                {count} entries
              </p>

              <ReviewsTable
                Reviews={Reviews}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
            </div>
          </React.Fragment>

          <hr className="m-0" />
          <PanelBody>
            <div className="d-flex align-items-center justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </PanelBody>
        </Panel>
      </div>
    )
  }
}

export default ReviewTableData
