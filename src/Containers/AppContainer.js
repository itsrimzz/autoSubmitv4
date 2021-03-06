// Import React dependencies
import React from 'react';

// Import Redux Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Toggle from 'material-ui/Toggle';

// import actions
import * as Actions from '../Actions/Actions';

// Import components
import AppHeader from '../components/AppHeader/AppHeader';
import Editor from '../components/Editor/Editor';
import ActionMenu from '../components/ActionMenu/ActionMenu';
import DataTable from '../components/DataTable/DataTable';
import ApiSelector from '../components/ApiSelector/ApiSelector';

// import utils
import { convertStringToLinks } from '../Util/util';
// import autoSubmit from '../autoSubmit';
import { requestManager } from '../requestManager';

import { STATUS, THRESHOLD } from '../constants';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: 0,
      isOptimistic: false
    };
  }

  process = () => {
    let index = 0;
    for (let link of this.props.links) {
      if (link.status === STATUS.PENDING) {
        this.props.actions.updateStatus({ index: index, status: STATUS.DOING })
        break;
      } else if (link.status === STATUS.DOING) {
        requestManager.post('/', JSON.stringify({
          url: link.url,
          api: this.state.api,
          is_optimistic: this.state.isOptimistic
        }),
          (response) => {
            if (response.data.response) {
              this.props.actions.updateStatus({ index: index, status: STATUS.SUCCESS })
            } else {
              if (link.count < THRESHOLD) {
                this.props.actions.updateCount({ index: index, count: link.count + 1 })
              } else {
                this.props.actions.updateStatus({ index: index, status: STATUS.FAIL })
              }
            }
          }, (error) => {
            console.log('error: autoSubmit api: ', error);
            if (link.count < THRESHOLD) {
              this.props.actions.updateCount({ index: index, count: link.count + 1 })
            } else {
              this.props.actions.updateStatus({ index: index, status: STATUS.ERROR })
            }
          });
        break;
      }
      index++;
    }
  }

  processLinksHandler = () => {
    const text = this.refs.editor.state.value;
    const urls = convertStringToLinks(text);
    this.props.actions.addLinks(urls);
    this.refs.editor.setState({ value: '' })
  }

  componentDidUpdate = () => {
    this.process();
  }

  retryLink = (index) => {
    console.log(index);
    if(typeof index === 'number' && index >= 0) {
      this.props.actions.resetLink(index)
    }
  }

  resetApp = () => {
    this.props.actions.resetApp();
  }

  handleApiChange = (event, index, value) => this.setState({ api: value });

  setOptimistic = (ev, isChecked) => this.setState({isOptimistic: isChecked})

  render() {
    console.log(requestManager)
    return (
      <div>
        <AppHeader />
        <div style={{width: '1em', marginTop: '1em'}}>
          <Toggle
            label="Optimistic Submission"
            onToggle={this.setOptimistic}
          />
        </div>
        <Editor
          ref="editor"
          />
        <ApiSelector
        api={this.state.api}
        handleChange={this.handleApiChange}
        /> 
        <ActionMenu
          processLinks={this.processLinksHandler}
          resetApp={this.resetApp}
          />
        <DataTable
          links={this.props.links}
          retryLink={this.retryLink}
        />
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
