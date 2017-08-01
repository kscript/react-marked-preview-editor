var React = require('react');
var ReactDOM = require('react-dom');
// var Marked = require('marked');
// var Raphael = require('raphael');
// require('raphael');
var Marked = require('../modules/marked');

var MarkdownEditorPreview = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  render: function() {
    // Breaklines in markdown are actually when a line is ended with two spaces + carriage-return
    var htmlContent = this.props.content.replace(/[\n]/g, '  \n');
    htmlContent = Marked(htmlContent);

    var styleMarkdownPreviewArea = this.props.styles.styleMarkdownPreviewArea;

    return (
      <div
        className={this.props.className || 'md-editor-preview'}
        style={styleMarkdownPreviewArea}
        dangerouslySetInnerHTML={{__html: htmlContent}}
      />
    );
  }
});

module.exports = MarkdownEditorPreview;
