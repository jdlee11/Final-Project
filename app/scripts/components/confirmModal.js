import React from 'react';
import { Link } from 'react-router';

let ConfirmModal = React.createClass({
  render: function(){
    console.log(this);
    let link;
    if (this.props.params.id){
      link = (<Link to={`recipes/${this.props.params.id}`}>Return to recipe</Link>);
    } else {
      link = (<Link to={`recipes`}>Return to home page</Link>);
    }
    return (
      <div className="modal-wrap">
        <div className="confirm-modal">
          <h1>Recipe Saved!</h1>
          {link}
        </div>
      </div>
    );
  }
});

export default ConfirmModal;
