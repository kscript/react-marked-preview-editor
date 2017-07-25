var React = require('react');
var ReactMarkdownEditor = require('../../lib/index');
var MarkdownEditor = ReactMarkdownEditor.MarkdownEditor;

var ExampleWithOnChangeContent = React.createClass({
  getInitialState: function() {
    return {
      content: null
    };
  },

  render: function() {
    return (
      <div>
        <div style={{'border': '1px solid #ddd', 'padding': '10px', 'marginBottom': '30px'}}>{this.state.content}</div>
        <MarkdownEditor
          initialContent='My initial content'
          onContentChange={this._onContentChange} />
      </div>
    );
  },

  _onContentChange: function(_content) {
    this.setState({content: _content});
  }
});

module.exports = ExampleWithOnChangeContent;
