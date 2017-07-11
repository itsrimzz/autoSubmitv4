import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

import {STATUS} from '../../constants';

export default class Datatable extends React.Component {
  constructor(props) {
    super(props);
  }

  getRows = () => {
    return this.props.links.map((link, index) => {
      return (
        <TableRow>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{link.url}</TableRowColumn>
          <TableRowColumn>{link.status === STATUS.DOING ? <CircularProgress /> : link.status}</TableRowColumn>
          <TableRowColumn>{link.count}</TableRowColumn>
        </TableRow>
      )
    });
  }

  render() {
    return (
      <div className="data-table">
        <div className="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>#</TableHeaderColumn>
                <TableHeaderColumn>Link</TableHeaderColumn>
                <TableHeaderColumn>Response</TableHeaderColumn>
                <TableHeaderColumn>Count</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.getRows()}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
