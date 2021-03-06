var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var ButtonManagerMixin = require('../mixins/ButtonManagerMixin');
var MarkdownSelectionStore = require('../stores/MarkdownSelectionStore');
var MarkdownEditorActions = require('../actions/MarkdownEditorActions');

var MarkdownEditorMenu = React.createClass({
  mixins: [Reflux.ListenerMixin, ButtonManagerMixin],

  // propTypes: {
  //   iconsSet: React.PropTypes.string.isRequired
  // },

  getInitialState: function() {
    return {
      enabled: false
    };
  },

  componentWillMount: function() {
    this.listenTo(MarkdownSelectionStore, this.handleMarkdownSelectionStore);
    // this.setIconsProvider(this.props.iconsSet);
    this.whiteStyleInPage();
  },

  // 在页面中写入 style
  whiteStyleInPage: function () {
    var styles = [
      '.fa{display:inline-block;font:normal normal normal 14px/1;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}',
      '.fa-bold:before{content:"Bold"}',
      '.fa-italic:before{content:"Italic"}',
      '.fa-list-ul:before{content:"Title"}',
      '.fa-file-image-o:before{content:"Image"}',
      '.fa-link:before{content:"Link"}'
    ];
    var styleEle = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(styleEle);
    var styleSheet = styleEle.sheet;
    styles.forEach(function (s) {
      styleSheet.insertRule(s);
    });
  },

  render: function() {

    var _disabled = (!this.state.enabled) ? 'disabled' : '';
    var boldButton = this.getBoldButton(_disabled, this.handleBoldButtonClick);
    var italicButton = this.getItalicButton(_disabled, this.handleItalicButtonClick);
    var makeListButton = this.getMakeListButton(_disabled, this.handleListButtonClick);
    var imageButton = this.getImageButton(_disabled, this.handleImageButtonClick);
    var linkButton = this.getLinkButton(_disabled, this.handleLinkButtonClick);
    var headerButton = this.getButtonWithoutIcon(_disabled, this.handleHeaderButtonClick, 'md-editor-menu-header', 'Header');
    var subHeaderButton = this.getButtonWithoutIcon(_disabled, this.handleSubHeaderButtonClick, 'md-editor-menu-subheader', 'Subheader');

    var styleMarkdownMenu = this.props.styles.styleMarkdownMenu;

    return (
      <div style={styleMarkdownMenu} className='md-editor-menu'>
        {boldButton}
        {italicButton}
        {headerButton}
        {subHeaderButton}
        {makeListButton}
        {imageButton}
        {linkButton}
      </div>
    );
  },

  handleMarkdownSelectionStore: function(data) {
    if (data.type === 'clear') {
      this.setState({enabled: false});
    } else if (data.type === 'set') {
      this.setState({enabled: true});
    }
  },

  handleBoldButtonClick: function() {   
    MarkdownEditorActions.makeBold(this.props.instanceRef);
  },

  handleImageButtonClick: function() {
    MarkdownEditorActions.makeImage(this.props.instanceRef);
  },

  handleItalicButtonClick: function() {
    MarkdownEditorActions.makeItalic(this.props.instanceRef);
  },

  handleUnderlineButtonClick: function() {
    MarkdownEditorActions.makeUnderline(this.props.instanceRef);
  },

  handleHeaderButtonClick: function() {
    MarkdownEditorActions.makeHeader(this.props.instanceRef);
  },

  handleSubHeaderButtonClick: function() {
    MarkdownEditorActions.makeSubHeader(this.props.instanceRef);
  },

  handleLinkButtonClick: function() {
    MarkdownEditorActions.makeLink(this.props.instanceRef);
  },

  handleListButtonClick: function() {
    MarkdownEditorActions.makeList(this.props.instanceRef);
  }
});

module.exports = MarkdownEditorMenu;
