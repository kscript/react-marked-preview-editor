var React = require('react');
var ReactDOM = require('react-dom');

var DefaultStyle = require('../style/EditorStyle');      // styleMarkdownMenuItem

var ButtonManagerMixin = {
  iconsProviderName: null,

  getStyleMarkdownBtn: function() {
    return DefaultStyle.styleMarkdownMenuItem;
  },

  getBoldButton: function(isDisabled, onClickHandler) {
    var _style = this.getStyleMarkdownBtn();
    return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-bold', 'bold-btn');
  },

  getButtonFontAwesomeIcon: function(isDisabled, onClickHandler, styleBtn, iconName, containerClassName) {
    var _className = 'fa ' + iconName;
    return (
      <div role='button' className={containerClassName} style={styleBtn} disabled={isDisabled} onClick={onClickHandler}>
        <span className={_className}></span>
      </div>
    );
  },

  getButtonWithoutIcon: function(isDisabled, onClickHandler, additionalClassName, textBtn) {
    var styleBtn = DefaultStyle.styleMarkdownMenuItem;
    return (
      <div role='button' style={styleBtn} className={additionalClassName} disabled={isDisabled} onClick={onClickHandler}>
        <span>{textBtn}</span>
      </div>
    );
  },

  getItalicButton: function(isDisabled, onClickHandler) {
    var _style = this.getStyleMarkdownBtn();
    return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-italic', 'italic-btn');
  },

  getMakeListButton: function(isDisabled, onClickHandler) {
    var _style = this.getStyleMarkdownBtn();
    return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-list-ul', 'list-btn');
  },

  getImageButton: function(isDisabled, onClickHandler) {
    var _style = this.getStyleMarkdownBtn();
    return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-file-image-o', 'insert-img-btn');
  },

  getLinkButton: function(isDisabled, onClickHandler) {
    var _style = this.getStyleMarkdownBtn();
    return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-link', 'insert-link-btn');
  }
};

module.exports = ButtonManagerMixin;
