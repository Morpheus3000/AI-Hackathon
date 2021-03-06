import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Blank = React.createClass({
  render: function() {
    return (
      <div className="overview-page" key="overview">
        <Link to="/dashboard/reports" className="pull-right btn btn-primary btn-outline btn-rounded">Reports</Link>
      <h2>Overview <small>Why is ScrumurAI so awesome?</small></h2>
        <Jumbotron>
          <div className='chart'></div>
          <br /><br />
          <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded">Learn more</a> </p>
        </Jumbotron>
      </div>
    );
  }

});

export default Blank;
