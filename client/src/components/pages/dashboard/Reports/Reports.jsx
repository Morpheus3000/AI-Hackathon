import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron, Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import axios from 'axios';

class Buttons extends Component {
  componentWillMount() {
    axios.get('https://randomuser.me/api/')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  render() {
    return (

      <div key="reports" className="reports-page">
        <div className="ng-scope">``
          <Link to="/dashboard/overview" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Overview</Link>
        <h2>Scrum Meeting 20</h2>
          <Jumbotron>
            <div className="chart"> </div>
            <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded">Learn more</a> </p>
          </Jumbotron>
          <Jumbotron>
            <Grid>
              <Row>
              <Col xs={4} md={3}>
                <video width="320" height="240" autoPlay="">
                  <source src='http://techslides.com/demos/sample-videos/small.mp4' type="video/mp4" />
                </video>
                  <h3>Thumbnail label</h3>
                  <p>Description</p>
              </Col>
              <Col xs={4} md={3}>
                  <h3>Thumbnail label</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Button</Button>&nbsp;
                    <Button bsStyle="default">Button</Button>
                  </p>
              </Col>
              <Col xs={4} md={3}>
                <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
                  <h3>Thumbnail label</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Button</Button>&nbsp;
                    <Button bsStyle="default">Button</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={4} md={3}>
                <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
                  <h3>Thumbnail label</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Button</Button>&nbsp;
                    <Button bsStyle="default">Button</Button>
                  </p>
                </Thumbnail>
              </Col>
              <Col xs={4} md={2}>
                <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
                  <h3>Thumbnail label</h3>
                  <p>Description</p>
                  <p>
                    <Button bsStyle="primary">Button</Button>&nbsp;
                    <Button bsStyle="default">Button</Button>
                  </p>
                </Thumbnail>
              </Col>
              </Row>
            </Grid>
          </Jumbotron>

        </div>
      </div>

    );
  }

};

export default Buttons;
