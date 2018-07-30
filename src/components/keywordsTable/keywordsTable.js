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
    return this.props.groups.map((group, index) => {
      return (
        <TableRow>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{group.keywords[0]}</TableRowColumn>
          <TableRowColumn>{group.status === STATUS.DOING ? <CircularProgress /> : group.status}</TableRowColumn>
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
                <TableHeaderColumn>Group #</TableHeaderColumn>
                <TableHeaderColumn>Group Name</TableHeaderColumn>
                <TableHeaderColumn>progress</TableHeaderColumn>
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
