var React = require('react');
var ReactDOM = require('react-dom');
var MarkdownUtils = require('../utils/MarkdownUtils');
var PublicMarkdownEditorActions = require('../actions/PublicMarkdownEditorActions');
var TextAreaSelectionMixin = require('../mixins/TextAreaSelectionMixin');

var MarkdownEditorContent = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    onChangeHandler: React.PropTypes.func.isRequired,
    className: React.PropTypes.string     // textareaClass
  },

  mixins: [TextAreaSelectionMixin],

  render: function() {
    var styleMarkdownTextArea = this.props.styles.styleMarkdownTextArea;

    return (
      <textarea
        ref='editor'
        className={this.props.className || 'md-editor-textarea'}
        style={styleMarkdownTextArea}
        onChange={this.onChange}
        onClick={this.clearSelection}
        onKeyUp={this.clearSelection}>
      </textarea>
    );
  },

  onChange: function() {
    var content = this.refs.editor.value;
    var markdownContent = MarkdownUtils.toMarkdown(content);
    PublicMarkdownEditorActions.updateText(markdownContent);

    this.props.onChangeHandler(content.replace(/[\n\r]/g, '\n'));
  },

  componentDidMount: function() {
    this.refs.editor.value = this.props.content;
  },

  componentDidUpdate: function() {
    this.refs.editor.value = this.props.content;
  }
});

module.exports = MarkdownEditorContent;
