/* @flow */ 

import React, { Component } from 'react';
import type { HTMLElement } from 'types';
import { autobind } from 'core-decorators';

import styles from './custom.css';
import { Form, FormField } from 'ui/forms';
import { TextInput } from 'ui/inputs';
import Button from 'ui/buttons';
import mandrill from 'mandrill-api/mandrill';

type State = {
  mandrill_client: any
}

class Custom extends Component { 
  state: Props;
  
  //const mandrill_client = 
  componentWillMount() {
    console.log("Our Key:" + process.env.MAILCHIMP_API_KEY);
    this.setState({
      mandrill_client: new mandrill.Mandrill(process.env.MAILCHIMP_API_KEY)
    });
  }

  @autobind
  sendCustomEmail() {
    let message = {
      "html": "<h2>TopDrawer Custom Sock Request</h2><p>The details are below.</p>",
      "text": "Top Drawer Custom Sock Request.  The details are below.",
      "from_email": "marketing.team@topdrawer.com",
      "to": "adil@adilwali.com"
    }
    
    let async = false;
    let ip_pool = "Main Pool";
    let send_at = "example send_at";
    
    console.log("WE ARE SENDING!");
    this.state.mandrill_client.messages.send({
      "message": message, 
      "async": async
    }, function(result) {
      console.log(result);
    }, function(e) {
      console.log('A mandrill error occured:' + e.name + ' - ' + e.message);
    })
  }

  get topBanner(): HTMLElement {
    return (
      <div styleName="custom-banner">
        <header styleName="header">
          <h1 styleName="title">GET YOUR OWN DESIGN DONE!</h1>
        </header>
      </div>
    );
  }

  get descriptiveContent(): HTMLElement {
    return (
      <div styleName="descriptive-content">
        <div styleName="dc-logo"/>
        <div styleName="supporting-text">
          <p>
            Whether you need socks for schwag or for different 
            marketing purposes, we’ll be there every step of the way.


            From creating samples to getting custom packaging done, 
            we’ll be there for you every step of the way like a 
            personal project manager. 
          </p>
        </div>
      </div>
    );
  }

  get reachOut(): HTMLElement {
    return (
      <div styleName="reach-out">
        <div styleName="ro-header">
          Reach out for your custom Top Drawer needs!
        </div>
        <div styleName="supporting-text">
          <p>
            Give us your contact information, what you’re looking for, and 
            the quantity. Keep in mind, there are MOQ criterias with our 
            manufacturer but we’ll do our best to get you what you need!
          </p>
        </div>
        <div styleName="custom-contact-form-container">
          <Form styleName="custom-contact-form">
            <FormField styleName="text-field">
              <TextInput required
                name="name" placeholder="FIRST & LAST NAME" 
              />
            </FormField>
            <FormField styleName="text-field">
              <TextInput required
                name="email" placeholder="EMAIL ADDRESS" 
              />
            </FormField>        
            <FormField styleName="text-field">
              <textarea required
                name="message" placeholder="TELL US ABOUT YOUR CUSTOM SOCK NEEDS!" 
              />
            </FormField>
            <div styleName="submit-container">
              <Button styleName="custom-contact-submit" type="submit" onClick={this.sendCustomEmail}>SUBMIT</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }


  render(): HTMLElement {
    return (
      <div>
        {this.topBanner}
        {this.descriptiveContent}
        {this.reachOut}
      </div>
    );
  }
}

export default Custom;
