var React = require('react');
var ReactDOM = require('react-dom');
var ReactMarkdownEditor = require('../index');
var MarkdownEditor = ReactMarkdownEditor.MarkdownEditor;
var ExampleWithOnChangeContent = require('./components/ExampleWithOnChangeContent');

function onContentChange(value) {
  console.log(value);
}

ReactDOM.render(<MarkdownEditor
  initialContent={'My initial content'}
  onContentChange={onContentChange}
  editorTabs={true}
  previewClass={'md-editor-preview'}
  textareaClass={'md-editor-textarea'}
/>, document.getElementById('react-container-1'));

/*
initialContent: React.PropTypes.string.isRequired,
onContentChange: React.PropTypes.func,
editorTabs: React.PropTypes.bool,
previewClass: React.PropTypes.string,   // md-editor-preview
textareaClass: React.PropTypes.string   // md-editor-textarea
*/