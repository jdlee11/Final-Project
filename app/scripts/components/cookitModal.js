import React from 'react';
import Transition from 'react-addons-css-transition-group';

let CookitModal = React.createClass({
  render: function(){
    console.log(this);
    return (
      <div className="modal-wrap">
        <div className="cookit-modal-container">
        </div>
      </div>
    );
  }
});

export default CookitModal;
