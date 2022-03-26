import { useState } from "react";
import React from 'react';
function focusMe() {
  setTimeout(function() {document.getElementById("textin").focus();console.log("lost focus, refocusing...")}, 1);
}
class In extends React.Component {
    render() {
      return <div className="promptitem">
      <input autoFocus placeholder="Need a list of commands? Try 'help'" type="text" className="userin" id="textin" name="fname" onBlur={focusMe} onKeyDown={this.props.handleKeyDown}/>
    </div>;
    }
  }
export default In;