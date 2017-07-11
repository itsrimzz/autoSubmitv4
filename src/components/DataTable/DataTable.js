import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export default class Datatable extends React.Component {
  constructor(props) {
    super(props);
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
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>http://google.com</TableRowColumn>
                <TableRowColumn>Success</TableRowColumn>
                <TableRowColumn>2</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>http://google.com</TableRowColumn>
                <TableRowColumn>Success</TableRowColumn>
                <TableRowColumn>2</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>http://google.com</TableRowColumn>
                <TableRowColumn>Success</TableRowColumn>
                <TableRowColumn>2</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>http://google.com</TableRowColumn>
                <TableRowColumn>Success</TableRowColumn>
                <TableRowColumn>2</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
