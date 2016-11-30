/* @flow */ 

import React, { Component } from 'react';
import type { HTMLElement } from 'types';
import { autobind } from 'core-decorators';

import styles from './custom.css';
import { Form, FormField } from 'ui/forms';
import { TextInput } from 'ui/inputs';
import Button from 'ui/buttons';
import { api } from 'lib/api';

type State = {
  name: string,
  email: string,
  message: string,
}

class Custom extends Component { 
  state: State = {
    name: '',
    email: '',
    message: '',
  };

  @autobind
  sendCustomEmail() {
    const message = {
      'html': this.state.message,
      'from_email': this.state.email,
      'to': [{
        email: 'adil@adilwali.com',
        name: 'Adil Wali'
      }]
    };

    api.post('/node/mandrill', { message });
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

  @autobind
  handleFormChange(event) {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    });
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
          <Form styleName="custom-contact-form" onSubmit={this.sendCustomEmail} onChange={this.handleFormChange}>
            <FormField styleName="text-field" required>
              <TextInput
                name="name" placeholder="FIRST & LAST NAME" 
              />
            </FormField>
            <FormField styleName="text-field" required>
              <TextInput
                name="email" placeholder="EMAIL ADDRESS" 
              />
            </FormField>        
            <FormField styleName="text-field" required>
              <textarea
                name="message" placeholder="TELL US ABOUT YOUR CUSTOM SOCK NEEDS!" 
              />
            </FormField>
            <div styleName="submit-container">
              <Button styleName="custom-contact-submit" type="submit">REACH OUT</Button>              
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
