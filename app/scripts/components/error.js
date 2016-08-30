import React from 'react';

let Error = React.createClass({
  render: function(){
    return (
      <div className="error">
        <p>Invalid username or password. Please try again</p>
      </div>
    );
  }
});

export default Error;
