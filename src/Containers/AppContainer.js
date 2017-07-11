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

// import utils
import {convertStringToLinks} from '../Util/util';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  processLinks = () => {
    const text = this.refs.editor.state.value;
    const urls = convertStringToLinks(text);
    this.props.actions.addLinks(urls);
    this.refs.editor.setState({value: ''})
  }

  render() {
    return (
      <div>
        <AppHeader />
        <Editor 
          ref="editor"
        />
        <ActionMenu
          processLinks={this.processLinks}
          />
        <DataTable 
          links={this.props.links}/>
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
