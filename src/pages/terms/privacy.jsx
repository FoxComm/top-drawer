/* @flow */

import React, { Component } from 'react';
import type { HTMLElement } from 'types';

import TextBanner from '../../components/banner/text-banner';
import styles from './terms.css';


class Privacy extends Component {

  get privacyBanner(): HTMLElement {
    return (
      <div styleName="terms-banner">
        <header styleName="header">
          <h1 styleName="title">Privacy Policy</h1>
        </header>
      </div>
    );
  }

  get privacyContent(): HTMLElement {
    return (
      <div styleName="terms-content">
        <div styleName="terms-content-inner">
          <h2 styleName="terms-heading">What do we do with your information?</h2>
          <p>
            When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
            When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
            Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.
          </p>
          <h2 styleName="terms-heading">Consent</h2>
            <h3>How do I give consent?</h3>
            When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
            <br/><br/>
            If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
            <h3>How do I withdraw my consent?</h3>
            If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at <a href="mailto:contact@topdrawer.com">our contact email address</a> or mailing to us at:
            <br/><br/>
            <div styleName="address-block">
              Marlene Jia<br/>
              WeWork Offices<br/>
              600 California St, Floor 11<br/>
              San Francisco, CA 94109<br/>
            </div>
          <h2 styleName="terms-heading">Disclosure</h2>
          <p>
            We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
          </p>
          <h2 styleName="terms-heading">Payment</h2>
          <p>
            Visa, MasterCard, American Express and other payment options will be accepted. Once your order is received, there will be a standard pre-authorization check on the payment card to ensure there are sufficient funds. The order will be accepted only after the check has been completed successfully and then the card will be debited once the order is accepted.
          </p>
          <h2 styleName="terms-heading">Third-Party Services</h2>
          <p>
            In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
            However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.


            For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
            In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.


            As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.


            Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.
          </p>
            <h2 styleName="terms-heading">Links</h2>
            <p>
              When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
            </p>
            <h2 styleName="terms-heading">Security</h2>
            <p>
              To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
            </p>
            <p>
              If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption.  Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.
            </p>
            
            <h2 styleName="terms-heading">Cookies</h2>
             Here is a list of cookies that we use. We’ve listed them here so you that you can choose if you want to opt-out of cookies or not.
            
            <ul>
              <li>_session_id, unique token, sessional, Allows Shopify to store information about your session (referrer, landing page, etc).</li>
              <li>_fox_visit, no data held, Persistent for 30 minutes from the last visit, Used by our website provider’s internal stats tracker to record the number of visits</li>
              <li>_fox_uniq, no data held, expires midnight (relative to the visitor) of the next day, Counts the number of visits to a store by a single customer.</li>
              <li>cart, unique token, persistent for 2 weeks, Stores information about the contents of your cart.</li>
              <li>_secure_session_id, unique token, sessional</li>
              <li>storefront_digest, unique token, indefinite If the shop has a password, this is used to determine if the current visitor has access.</li>
            </ul>
            <h2 styleName="terms-heading">Age of Consent</h2>
            <p>
              By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
              We’re constantly reviewing and revising our Privacy Policy
              We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.


              If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.


              If you have any inquiries or concerns, or would like to request information be removed, please reach out to us at <a href="mailto:contact@topdrawer.com">contact@topdrawer.com</a>. Feedback and involvement from our community is much appreciated!


              Thank you all in advance for being a part of the Top Drawer community!
            </p>
        </div>
      </div>
    );
  }

  render(): HTMLElement {
    return (
      <div>
        {this.privacyBanner}
        {this.privacyContent}
      </div>
    );
  }
}

export default Privacy;

