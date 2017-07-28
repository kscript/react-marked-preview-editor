var React = require('react');
var ReactDOM = require('react-dom');
var ReactMarkdownEditor = require('../src/index');
var MarkdownEditor = ReactMarkdownEditor.MarkdownEditor;
var ExampleWithOnChangeContent = require('./components/ExampleWithOnChangeContent');

function onContentChange(value) {
  console.log(value);
}

var initCont = `
### 这里是一段流程图

~~~flow
    st=>start: Start
    op=>operation: Your Operation
    cond=>condition: Yes or No?
    e=>end

    st->op->cond
    cond(yes)->e
    cond(no)->op
~~~`;

ReactDOM.render(<MarkdownEditor
  initialContent={initCont}
  onContentChange={onContentChange}
  editorTabs={true}
  previewClass={'md-editor-preview markdown-body'}
  textareaClass={'md-editor-textarea'}
/>, document.getElementById('react-container-1'));