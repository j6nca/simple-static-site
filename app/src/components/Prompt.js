import React from 'react';
class Prompt extends React.Component {
    render() {
      return <div className="bashprompt">
      <div className="promptitem user">jon</div>
      <div className="promptitem">
        <div className="arrow-right user"></div>
      </div>
      <div className="promptitem dir">hello world</div>
      <div className="promptitem">
        <div className="arrow-right dir"></div>
      </div>
      <div className="promptitem branch"><div className='branchchar'>{'\uE0A0'}</div> master</div>
      <div className="promptitem">
        <div className="arrow-right branch"></div>
      </div>
      <div className="promptitem">
      </div>
    </div>;
    }
  }
export default Prompt;