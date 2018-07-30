import React from 'react';

import AppHeader from '../components/AppHeader/AppHeader';
import Editor from '../components/Editor/Editor';
import ActionMenu from '../components/ActionMenu/ActionMenu';
import DataTable from '../components/keywordsTable/keywordsTable';
import { STATUS } from '../constants';
import { requestManager } from '../requestManager';

export default class KeywordApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      results: []
    };
  }

  getInputKeywords = () => {
    let rawInput = this.refs.editor.state.value;
    this.refs.editor.setState({ value: '' })
    const keywords = rawInput.split('\n').filter(x => x.length > 0);
    return keywords;
  }

  createGroupsAndProcess = (formatted_keywords) => {
    let i, j, group, chunk = 1;
    let groups = []
    for (i=0, j=formatted_keywords.length; i<j; i+=chunk) {
      group = formatted_keywords.slice(i, i+chunk);
      groups.push({
        status: STATUS.PENDING,
        keywords: group
      });
    }
    this.setState({groups: groups, results: []}, this.processGroups)
  }

  processGroups = () => {
    const pendingGroups = this.state.groups.map(group => {
      if(group.status === STATUS.PENDING) {
        return group;
      }
    }).filter(x => x);
    if (pendingGroups.length > 0) {
      const keywords = pendingGroups[0].keywords
      const newGroups = this.state.groups.map(group => {
        if(group.keywords === keywords) {
          return {...group, status: STATUS.DOING}
        }
        return group
      });
      this.setState({groups: newGroups});
      requestManager.post('/keywords/', JSON.stringify(keywords), (response) => {
        this.setState({results: [...this.state.results, ...response.data.result]})
        const newGroups = this.state.groups.map(group => {
          if(group.keywords === keywords) {
            return {...group, status: STATUS.SUCCESS}
          }
          return group
        });
        this.setState({groups: newGroups});
        setTimeout(this.processGroups, 5000);
      }, (response) => {
        const newGroups = this.state.groups.map(group => {
          if(group.keywords === keywords) {
            return {...group, status: STATUS.ERROR}
          }
          return group
        });
        this.setState({groups: newGroups});
        setTimeout(this.processGroups, 5000);
      })
    }
    else {
      let text = this.state.results.map((row) => {
        let rowText = '';
        row.map(val => {
          rowText += val.replace('\n', '').replace(/,/g, '') + ','
        })
        if(rowText[rowText.length - 1] === ',') {
          rowText = rowText.slice(0, -1)
        }
        return rowText;
      });
      text = text.join('\n');
      this.download('results.csv', text);
    }
  }

  download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  processkeywords = () => {
    const keywords = this.getInputKeywords()
    this.createGroupsAndProcess(keywords)
  }

  render() {
    return (
      <div>
        <AppHeader />
        <Editor label="Enter keywords" ref="editor"/>
        <ActionMenu 
          processLinks={this.processkeywords}
          resetApp={''}
        />
        <DataTable groups={this.state.groups}/>
      </div>
    );
  }
}
