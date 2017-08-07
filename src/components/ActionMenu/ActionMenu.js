import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class ActionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="action-menu-container">
        <div className="action-menu">
          <RaisedButton
            label="Process"
            primary={true} 
            onClick={this.props.processLinks}/>
          <RaisedButton
            label="Reset"
            secondary={true}
            onClick={this.props.resetApp}
            />
        </div>
      </div>
    );
  }
}