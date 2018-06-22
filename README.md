# react-markdown-editor

A markdown editor and/or preview

简洁 and 功能全面的 react markdown 编辑器/编译器

## Demo

~~~
$ git clone https://github.com/yj1438/react-marked-preview-editor
$ npm i
$ npm run example
~~~

open `http://0.0.0.0:9080/`

## Installation
``` npm install --save react-marked-preview-editor ```

## Features

* 支持 markdown 全语法，包括流程图(需要自行引入 flowchart.js)。（modified from [marked](https://github.com/chjj/marked)
* 支付同步的 edit/preview
* 提供一组常用的语法工具按钮

## Usage

Using in webpack

```jsx
import React from 'react';
import { MarkdownEditor } from 'react-marked-preview-editor'
import 'github-markdown-css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '## my content'
    }
    setTimeout(() => {
      this.editor.setState({
        content: '## update content'
      })
    }, 3000)
  }

  onContentChange = () => {
  }
  
  render(){
    return (
      <MarkdownEditor
        editorTabs // editor tools
        ref={(c) => { this.editor = c }}
        initialContent={this.state.content} // content
        onContentChange={this.onContentChange} // editor content change event
        tabs={['edit', 'preview']} // tabs item array enum from 'edit'/'preview'
        previewClass={'md-editor-preview markdown-body'} // preview tabs contain className
        textareaClass={'md-editor-textarea'} // textarea tabs contain className
      />
      );
  }
}
export default Editor;
```


To render the component:

```javascript

var mdEditor = <MarkdownEditor
  initialContent={'My initial content'}				// content
  onContentChange={onContentChange}						// editor content change event
  editorTabs={true}														// editor tools
  tabs={['preview', 'edit']}                  // tabs item array enum from 'edit'/'preview'
  previewClass={'md-editor-preview markdown-body'}		// preview tabs contain className
  textareaClass={'md-editor-textarea'}								// textarea tabs contain className
/>;

ReactDOM.render(mdEditor, document.getElementById('react-container-1'));

```

~~~html
<head>
  <meta charset="utf-8">
  <!-- 可以全局引入以下辅助 js/css，加强 react-marked-preview-edit 的功能 -->
  <!-- flowchart + raphael 绘制流程图 -->
  <script src="../node_modules/raphael/raphael.js"></script>
  <script src="../node_modules/flowchart.js/release/flowchart.js"></script>
  <!-- 标准 github 的样式 -->
  <link rel="stylesheet" type="text/css" href="../node_modules/github-markdown-css/github-markdown.css">
</head>
<body>
  <div id="react-container-1">
  </div>
</body>
~~~

> [react-markdown-editor](https://github.com/jrm2k6/react-markdown-editors)
