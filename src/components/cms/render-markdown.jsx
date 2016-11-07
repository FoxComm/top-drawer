/* @flow */

// libs
import React from 'react';
import fs from 'fs';
import marked from 'marked';


// styles
import styles from './cms.css';
import ReactMarkdown from 'react-markdown';

type Props = {
  inputPath: string,
};

const RenderMarkdown = (props: Props) => {
  //TODO: Ensure that we are reading the markdown file in using best practices.
  //TODO: Find a smarter way to render the HTML than using dangerouslySetInnerHTML.
  let markdown = fs.readFileSync(props.inputPath, 'utf8');
  let html = marked(markdown);
  return (
    <div styleName="markdown-content">
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
};

export default RenderMarkdown;
