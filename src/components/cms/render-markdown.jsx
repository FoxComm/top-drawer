/* @flow */

// libs
import React from 'react';
import marked from 'marked';
const fs = require('fs');

// styles
import styles from './cms.css';

type Props = {
  title: string,
};

const markdown = (title) => {
  switch(title) {
    case 'privacy':
      return fs.readFileSync('./src/pages/static/privacy-policy-markdown.md', 'utf8');
    case 'shipping':
      return fs.readFileSync('./src/pages/static/shipping-and-returns-markdown.md', 'utf8');
    case 'terms':
      return fs.readFileSync('./src/pages/static/terms-of-service-markdown.md', 'utf8');
    default:
      return '';
  }
}

const RenderMarkdown = (props: Props) => {
  //TODO: Ensure that we are reading the markdown file in using best practices.
  //TODO: Find a smarter way to render the HTML than using dangerouslySetInnerHTML.
  let html = marked(markdown(props.title));
  return (
    <div styleName="markdown-content">
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
};

export default RenderMarkdown;
