// Import React dependencies
import React from 'react';

// Import Redux Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import actions
import * as Actions from '../Actions/Actions';

// Import components
import AppHeader from '../components/AppHeader/AppHeader';
import Editor from '../components/Editor/Editor';
import ActionMenu from '../components/ActionMenu/ActionMenu';
import DataTable from '../components/DataTable/DataTable';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <AppHeader />
        <Editor />
        <ActionMenu />
        <DataTable />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    links: state.links
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
