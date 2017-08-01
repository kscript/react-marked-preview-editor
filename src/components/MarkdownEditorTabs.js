var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var MarkdownEditorTabsInteractionStore = require('../stores/MarkdownEditorTabsInteractionStore');

var MarkdownEditorTabs = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      activeTab: this.props.tabs[0] === 'edit' ? 0 : 1
    };
  },

  componentWillMount: function() {
    this.listenTo(MarkdownEditorTabsInteractionStore, this.handleMDEditorTabsInteractionStoreUpdated);
  },

  handleMDEditorTabsInteractionStoreUpdated: function(storeState) {
    if (storeState.activeTab != null) {
      this.setState({activeTab: storeState.activeTab});
    }
  },

  render: function() {

    var styleActiveTab = this.props.styles.styleActiveTab;
    var styleMarkdownEditorTabs = this.props.styles.styleMarkdownEditorTabs;
    var styleTab = this.props.styles.styleTab;

    var editorTabStyle;
    var previewTabStyle;
    if (this.state.activeTab === 0) {
      editorTabStyle = styleActiveTab;
      previewTabStyle = styleTab;
    } else if (this.state.activeTab === 1) {
      previewTabStyle = styleActiveTab;
      editorTabStyle = styleTab;
    }

    var tabMap = {
      'edit': <div style={editorTabStyle}
          key={'md-EditorTab'}
          className="md-editor-tabs-item"
          onClick={this.handleClick.bind(this, 'clickEditorTab')}>
          <span>Editor</span>
        </div>,
      'preview': <div style={previewTabStyle}
          key={'md-clickPreviewTab'}
          className="md-editor-tabs-item"
          onClick={this.handleClick.bind(this, 'clickPreviewTab')}>
          <span>Preview</span>
        </div>
    };

    return (
      <div style={styleMarkdownEditorTabs} className='md-editor-tabs'>
        {
          this.props.tabs.map(function (item) {
            return tabMap[item];
          })
        }
      </div>
    );
  },

  handleClick: function(actionName) {
    MarkdownEditorActions[actionName]();
  }
});

module.exports = MarkdownEditorTabs;
