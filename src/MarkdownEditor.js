var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var MarkdownEditorActions = require('./actions/MarkdownEditorActions');
var PublicMarkdownEditorActions = require('./actions/PublicMarkdownEditorActions');
var MarkdownSelectionActions = require('./actions/MarkdownSelectionActions');
var TextAreaSelectionMixin = require('./mixins/TextAreaSelectionMixin');
var ButtonManagerMixin = require('./mixins/ButtonManagerMixin');
var MarkdownEditorStore = require('./stores/MarkdownEditorStore');
var MarkdownSelectionStore = require('./stores/MarkdownSelectionStore');
var MarkdownEditorTabsInteractionStore = require('./stores/MarkdownEditorTabsInteractionStore');
var MarkdownTokenFactory = require('./utils/MarkdownTokenFactory');
var MarkdownUtils = require('./utils/MarkdownUtils');
var MarkdownEditorMenu = require('./components/MarkdownEditorMenu');
var MarkdownEditorTabs = require('./components/MarkdownEditorTabs');
var MarkdownEditorContent = require('./components/MarkdownEditorContent');
var MarkdownEditorPreview = require('./components/MarkdownEditorPreview');

var NullMarkdownToken = MarkdownTokenFactory.NullMarkdownToken;
var RegularMarkdownToken = MarkdownTokenFactory.RegularMarkdownToken;
var HeaderMarkdownToken = MarkdownTokenFactory.HeaderMarkdownToken;
var SubHeaderMarkdownToken = MarkdownTokenFactory.SubHeaderMarkdownToken;
var UrlMarkdownToken = MarkdownTokenFactory.UrlMarkdownToken;
var ListMarkdownToken = MarkdownTokenFactory.ListMarkdownToken;
var ImageMarkdownToken = MarkdownTokenFactory.ImageMarkdownToken;

var DefaultStyle = require('./style/EditorStyle');
var DefaultTabs = ['edit', 'preview'];


var MarkdownEditor = React.createClass({
  mixins: [Reflux.ListenerMixin],

  propTypes: {
    initialContent: React.PropTypes.string.isRequired,
    onContentChange: React.PropTypes.func,
    editorTabs: React.PropTypes.bool,
    tabs: React.PropTypes.array,                      // edit, preview
    previewClass: React.PropTypes.string,             // md-editor-preview
    textareaClass: React.PropTypes.string             // md-editor-textarea
  },

  /**
   * 获取 tabs 显示的元素
   * 从 this.props.tabs 中去重、去杂
   * @returns 
   */
  _getRealTabs: function () {
    var realTabs = [];
    if (this.props.tabs && this.props.tabs.length > 0) {
      this.props.tabs.forEach(function (item) {
        if (realTabs.indexOf(item) === -1 && DefaultTabs.indexOf(item) >= 0) {
          realTabs.push(item);
        }
      });
    } else {
      realTabs = DefaultTabs;
    }
    return realTabs;
  },


  /**
   * 获取用户自定义样式 + defautlstyle 的合并样式
   * @returns 
   */
  _getMergeStyle: function () {
    return Object.assign({}, DefaultStyle, this.props.styles || {});
  },

  getInitialState: function() {
    var uniqueInstanceRef = Math.random().toString(36).substring(7)
    var realTabs = this._getRealTabs();
    return {
      content: this.props.initialContent, 
      inEditMode: realTabs.length > 0 && realTabs[0] === 'edit' ? true : false, 
      instanceRef: uniqueInstanceRef
    };
  },

  /**
   * 主渲染方法
   * @returns 
   */
  render: function() {
    var mergedStyle = this._getMergeStyle();
    var divContent;         // 编辑/展示区
    var editorMenu;         // 编辑区工具栏

    if (this.state.inEditMode) {
      divContent = <MarkdownEditorContent className={this.props.textareaClass}
                                          styles={{styleMarkdownTextArea: mergedStyle.styleMarkdownTextArea}}
                                          content={this.state.content} onChangeHandler={this.onChangeHandler}/>;
      if (this.props.editorTabs !== false){
          editorMenu = <MarkdownEditorMenu styles={{styleMarkdownMenu: mergedStyle.styleMarkdownMenu}}
                                           instanceRef={this.state.instanceRef}/>;
      }
    } else {
      divContent = <MarkdownEditorPreview className={this.props.previewClass}
                                          styles={{styleMarkdownPreviewArea: mergedStyle.styleMarkdownPreviewArea}}
                                          content={this.state.content} />;
      editorMenu = null;
    }

    var realTabs = this._getRealTabs()
    var needHeader = realTabs.length > 1 || (realTabs[0] === 'edit' && this.props.editorTabs)
    return (
      <div style={mergedStyle.styleMarkdownEditorContainer}>
        {
          needHeader ?
            <div style={mergedStyle.styleMarkdownEditorHeader} className='md-editor-header'>
              <MarkdownEditorTabs styles={{ styleMarkdownEditorTabs: mergedStyle.styleMarkdownEditorTabs,
                                            styleTab: mergedStyle.styleTab,
                                            styleActiveTab: mergedStyle.styleActiveTab}} 
                                  tabs={realTabs} />
              {editorMenu}
            </div>
            : null
        }
        {divContent}
      </div>
    );
  },

  onChangeHandler: function(newContent) {
    if (this.props.onContentChange) {
      this.props.onContentChange(newContent);
    }

    this.setState({content: newContent});
  },

  componentDidMount: function() {
    this.listenTo(MarkdownEditorStore, this.handleMarkdowEditorStoreUpdated);
    this.listenTo(MarkdownEditorTabsInteractionStore, this.handleMDEditorTabsInteractionStoreUpdated);
  },

  handleMarkdowEditorStoreUpdated: function(markdownEditorStoreState) {
    var currentSelection = markdownEditorStoreState.currentSelection;

    if (currentSelection != null && markdownEditorStoreState.instanceRef === this.state.instanceRef) {
      this.updateText(this.state.content, currentSelection, markdownEditorStoreState.action);
    }
  },

  handleMDEditorTabsInteractionStoreUpdated: function(mdEditorTabsInteractionStoreState) {
    if (mdEditorTabsInteractionStoreState.activeTab != null) {
      var _inEditMode = mdEditorTabsInteractionStoreState.activeTab === 0;
      this.setState({inEditMode: _inEditMode});
    }
  },

  updateText: function(text, selection, actionType) {
    var token = this.generateMarkdownToken(actionType);
    var beforeSelectionContent = text.slice(0, selection.selectionStart);
    var afterSelectionContent = text.slice(selection.selectionEnd, text.length);
    var updatedText = token.applyTokenTo(selection.selectedText);
    var _updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
    PublicMarkdownEditorActions.updateText(MarkdownUtils.toMarkdown(_updatedContent));
    this.setState({content: _updatedContent});

    if (this.props.onContentChange) {
      this.props.onContentChange(_updatedContent);
    }
  },

  generateMarkdownToken: function(actionType) {
    switch (actionType) {
      case 'bold':
        return new RegularMarkdownToken('**', true);

      case 'italic':
        return new RegularMarkdownToken('_', true);

      case 'header':
        return new HeaderMarkdownToken();

      case 'subheader':
        return new SubHeaderMarkdownToken();

      case 'link':
        return new UrlMarkdownToken();

      case 'list':
        return new ListMarkdownToken();

      case 'image':
        return new ImageMarkdownToken();

      default:
        return new NullMarkdownToken();
    }
  }
});

module.exports = MarkdownEditor;
