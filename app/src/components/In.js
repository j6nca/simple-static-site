import { useState } from "react";
import React from 'react';
class In extends React.Component {

    render() {
      return <div className="promptitem">
      <input type="text" className="userin" id="textin" name="fname" onKeyDown={this.props.handleKeyDown}/>
    </div>;
    }
  }
export default In;