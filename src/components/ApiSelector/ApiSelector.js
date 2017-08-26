import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 200,
  },
};

export default class DropDownMenuSimpleExample extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="api-selector">
        <DropDownMenu value={this.props.api} onChange={this.props.handleChange}>
          <MenuItem value={0} primaryText="Anti-captcha" />
          <MenuItem value={1} primaryText="Captcha solutions" />
        </DropDownMenu>
      </div>);
  }
}