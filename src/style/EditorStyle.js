module.exports = {
  // 编辑器 wrap
  styleMarkdownEditorContainer: {
    display: 'flex',
    height: '480px',
    boxSizing: 'border-box',
    flexDirection: 'column',
    margin: '2px auto',
    padding: '0',
    border: '1px solid #ddd',
    backgroundColor: '#f7f7f7',
  },
  // 编辑器 header
  styleMarkdownEditorHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: '0',
    borderBottom: '1px solid #ddd',
    justifyContent: 'space-between',
    position: 'relative',
  },
  // 编辑器 tabs
  styleMarkdownEditorTabs: {
    display: 'flex',
    flexDirection: 'row',
  },
  // 编辑器 tabs item 
  styleTab: {
    padding: '0px 20px',
    cursor: 'pointer',
    height: '36px',
    lineHeight: '36px',
  },
  // 编辑器 tabs item active
  styleActiveTab: {
    padding: '0px 20px',
    cursor: 'pointer',
    lineHeight: '36px',
    height: '36px',
    backgroundColor: '#fff',
  },
  // 编辑器右侧的工具栏
  styleMarkdownMenu: {
    margin: '5px 8px 5px 0',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'row',
  },
  // 编辑器右侧的工具栏 按钮 item
  styleMarkdownMenuItem: {
    'border': '1px solid #ddd',
    'backgroundColor': 'white',
    'borderRadius': '4px',
    'margin': '0 2px',
    'padding': '2px 3px',
    'cursor': 'pointer',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center'
  },
  // 编辑器 textarea
  styleMarkdownTextArea: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    resize: 'none',
    flex: 1,
  },
  // 编辑器 preview wrap
  styleMarkdownPreviewArea: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    flex: 1,
    overflow: 'auto',
    backgroundColor: '#ffffff',
  },
};
