import React from 'react';
import TextField from 'material-ui/TextField';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div className="editor">
        <TextField
          hintText=""
          floatingLabelText="Enter Emails"
          multiLine={true}
          rows={1}
          className="text-area"
          value={this.state.value}
          onChange={this.onChange}
          />
      </div>
    )
  }
}