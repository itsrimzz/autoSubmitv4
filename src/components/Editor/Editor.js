import React from 'react';
import TextField from 'material-ui/TextField';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextField
        hintText=""
        floatingLabelText="Enter Emails"
        multiLine={true}
        rows={2}
        />
    )
  }
}