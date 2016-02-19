var main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _blocks = __webpack_require__(1);

	var _blocks2 = _interopRequireDefault(_blocks);

	__webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var simpleTextBlocks = new _blocks2.default({
	    "elem": elem,
	    "OPTIONS": OPTIONS
		});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Import styles and HTML template
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = SimpleTextBlocks;

	__webpack_require__(2);

	var _index = __webpack_require__(6);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Represents a page with text blocks.
	 * @options is an object with params. The first one "elem" is required
	 */
	function SimpleTextBlocks(options) {
	    /**
	     * root element
	     */
	    this._elem = options.elem;

	    /**
	     * init counters
	     */
	    this._totalBlocksCount = this._selectedBlocksCount = this._selectedHardBlocksCount = this._selectedChangedHardBlocksCount = 0;

	    /**
	     * generate HTML template from jade JS
	     */
	    this._elem.innerHTML = (0, _index2.default)();

	    /**
	     * define area where will be blocks appears
	     */
	    this._blocksArea = this._elem.querySelector(".article");

	    /**
	     * add listeners for all clicks and doubleclicks inside blocks*/
	    this._blocksArea.addEventListener("click", _doAfterClickEvent.bind(this));
	    this._blocksArea.addEventListener("dblclick", _doChangeColor.bind(this));

	    /**
	     * add listeners for show/hide "add block" button
	     */
	    this._buttonAdd = this._elem.querySelector(".add_block");
	    this._buttonAdd.addEventListener("mouseover", _showAddButtons.bind(this));
	    this._buttonAdd.addEventListener("mouseout", _hideAddButtons.bind(this));
	    this._divAdd = this._elem.querySelector(".add_block_container");
	    this._divAdd.addEventListener("mouseout", _hideAddButtons.bind(this));
	    this._divAdd.addEventListener("mouseover", _showAddButtons.bind(this));

	    /**
	     * add listeners for creation text blocks
	     */
	    this._addBlockSimple = this._elem.querySelector(".add_block_simple");
	    this._addBlockSimple.addEventListener("click", _createNewSimpleBlock.bind(this));
	    this._addBlockHard = this._elem.querySelector(".add_block_hard");
	    this._addBlockHard.addEventListener("click", _createNewHardBlock.bind(this));

	    /**
	     * define counters area
	     */
	    this._totalBlocks = this._elem.querySelector(".total_blocks span");
	    this._selectedBlocks = this._elem.querySelector(".selected_blocks span");
	    this._selectedHardBlocks = this._elem.querySelector(".selected_hard_blocks span");
	    this._selectedChangedHardBlocks = this._elem.querySelector(".selected_changed_hard_blocks span");

	    /**
	     * show div containing buttons for adding blocks
	     */
	    function _showAddButtons() {
	        this._divAdd.classList.add("visible");
	    }

	    /**
	     * hide div containing buttons for adding blocks
	     */
	    function _hideAddButtons(event) {
	        var target = event.target;
	        if (target.tagName == 'button') return;
	        this._divAdd.classList.remove("visible");
	    }

	    /**
	     * creates new simple text block
	     */
	    function _createNewSimpleBlock() {
	        var div = document.createElement('div');
	        div.className = "block_simple";
	        div.innerHTML = "Привет, я простой блок, меня можно выделить или удалить!<div class='close'></div>";
	        this._blocksArea.appendChild(div);

	        this._totalBlocksCount++;
	        _countBlocks.call(this);
	    }

	    /**
	     * creates new hard text block
	     */
	    function _createNewHardBlock() {
	        var div = document.createElement('div');
	        div.className = "block_hard";
	        div.innerHTML = "Привет, а я сложный блок, у меня еще можно и цвет поменять, если кликнуть дважды!<div class='close'></div>";
	        this._blocksArea.appendChild(div);

	        this._totalBlocksCount++;
	        _countBlocks.call(this);
	    }

	    /**
	     * remove or select opened blocks
	     */
	    function _doAfterClickEvent(event) {
	        var target = event.target;

	        // if click on the close icon
	        if (target.className == "close") {
	            _doDeleteBlock.call(this, target);
	        }

	        // if click on the block
	        if (target.classList.contains("block_hard") || target.classList.contains("block_simple")) {
	            _doSelect.call(this, target);
	        }
	    }

	    /**
	     * delete blocks
	     */
	    function _doDeleteBlock(target) {
	        var del = target.parentNode;

	        if (del.classList.contains("block_simple")) {

	            this._totalBlocksCount--;
	            if (del.classList.contains("selected")) this._selectedBlocksCount--;

	            this._blocksArea.removeChild(del);
	        } else {

	            var result = confirm("Действительно удалить?");
	            if (result) {

	                this._totalBlocksCount--;
	                if (del.classList.contains("selected")) this._selectedBlocksCount--;

	                this._blocksArea.removeChild(del);
	            }
	        }

	        _countBlocks.call(this);
	    }

	    /**
	     * select blocks
	     */
	    function _doSelect(target) {
	        if (target.classList.contains("selected")) {
	            if (target.classList.contains("changed")) this._selectedChangedHardBlocksCount--;
	            this._selectedBlocksCount--;

	            target.classList.remove("selected");
	        } else {

	            if (target.classList.contains("changed")) this._selectedChangedHardBlocksCount++;
	            this._selectedBlocksCount++;

	            target.classList.add("selected");
	        }

	        _countBlocks.call(this);
	    }

	    /**
	     * change color blocks
	     */
	    function _doChangeColor(event) {
	        var target = event.target;
	        if (!target.classList.contains("block_hard")) return;
	        if (target.classList.contains("changed")) {
	            target.classList.remove("changed");
	            this._selectedChangedHardBlocksCount--;
	        } else {
	            target.classList.add("changed");
	            this._selectedChangedHardBlocksCount++;
	        }
	        _countBlocks.call(this);
	    }

	    /**
	     * refresh counting of blocks
	     */
	    function _countBlocks() {
	        this._totalBlocks.innerHTML = " " + this._totalBlocksCount;
	        this._selectedBlocks.innerHTML = " " + this._selectedBlocksCount;
	        this._selectedHardBlocks.innerHTML = " " + this._selectedHardBlocksCount;
	        this._selectedChangedHardBlocks.innerHTML = " " + this._selectedChangedHardBlocksCount;
	    }

	    _createNewSimpleBlock.call(this);
	    _createNewHardBlock.call(this);
		}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".blocks_section_header {\r\n    width: 100%;\r\n    background: #000066;\r\n    color: #fff;\r\n    border-radius: 9px;\r\n    padding: 10px;\r\n    box-sizing: border-box;\r\n    font-weight: bold;\r\n    text-align: center;\r\n}\r\n\r\n.blocks_section_content {\r\n    display: -webkit-flex;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.blocks_section_content .aside {\r\n    width: 30%;\r\n    min-width: 200px;\r\n    overflow: auto;\r\n    box-sizing: border-box;\r\n    padding: 10px;\r\n    border-right: 2px solid #003366;\r\n    min-height: 300px;\r\n}\r\n\r\n.blocks_section_content .aside .total_blocks {\r\n    font-weight: bold;\r\n    font-size: 18px;\r\n}\r\n\r\n.blocks_section_content .aside .selected_blocks {\r\n    font-size: 18px;\r\n}\r\n\r\n.blocks_section_content .aside .selected_hard_blocks {\r\n    font-size: 15px;\r\n    color: #006600;\r\n}\r\n\r\n.blocks_section_content .aside .selected_changed_hard_blocks {\r\n    font-size: 15px;\r\n    color: #990000;\r\n}\r\n\r\n.blocks_section_content .aside .add_block {\r\n    font-size: 15px;\r\n    color: #fff;\r\n    background: #000066;\r\n    border-radius: 5px;\r\n    border: 0;\r\n    cursor: pointer;\r\n    padding: 5px 10px;\r\n    margin-top: 20px;\r\n}\r\n\r\n.blocks_section_content .aside .add_block::before {\r\n    content: \"+\";\r\n    position: relative;\r\n    left: -2px;\r\n}\r\n\r\n.blocks_section_content .aside .add_block_container {\r\n    background: #000066;\r\n    border-radius: 5px;\r\n    position: relative;\r\n    top: -6px;\r\n    padding: 10px;\r\n    text-align: center;\r\n    opacity: 0;\r\n    transition: 500ms;\r\n    visibility: hidden;\r\n }\r\n\r\n\r\n.blocks_section_content .aside .add_block_container.visible {\r\n    visibility: visible;\r\n    transition: 500ms;\r\n    opacity: 1;\r\n}\r\n\r\n\r\n.blocks_section_content .aside .add_block_container .add_block_simple, .blocks_section_content .aside .add_block_container .add_block_hard {\r\n    font-size: 15px;\r\n    color: #fff;\r\n    background: rgba(42, 96, 155, 0.76);\r\n    border-radius: 5px;\r\n    border: 0;\r\n    cursor: pointer;\r\n    padding: 5px 10px;\r\n    margin: 5px 0;\r\n    transition: 500ms;\r\n}\r\n\r\n.blocks_section_content .aside .add_block_container .add_block_simple:hover, .blocks_section_content .aside .add_block_container .add_block_hard:hover {\r\n    background: #fff;\r\n    transition: 500ms;\r\n    color: #000;\r\n}\r\n\r\n.blocks_section_content .article {\r\n    width: 70%;\r\n    min-width: 200px;\r\n    overflow: auto;\r\n    box-sizing: border-box;\r\n    padding: 10px;\r\n    background: #fff;\r\n    border-radius: 10px\r\n}\r\n\r\n.blocks_section_content .article .block_simple {\r\n    border: 5px solid #ccc;\r\n    background: #eee;\r\n    border-radius: 5px;\r\n    padding: 20px 10px 5px 10px;\r\n    cursor: pointer;\r\n    margin: 10px 0;\r\n    position: relative;\r\n}\r\n\r\n.blocks_section_content .article .block_hard {\r\n    border: 5px solid #ccc;\r\n    background: #006600;\r\n    color: #fff;\r\n    border-radius: 5px;\r\n    padding: 20px 10px 5px 10px;\r\n    cursor: pointer;\r\n    margin: 10px 0;\r\n    position: relative;\r\n}\r\n\r\n.blocks_section_content .article .block_hard .close::before, .blocks_section_content .article .block_simple .close::before {\r\n    content: \"+\";\r\n    font-weight: bold;\r\n    font-size: 30px;\r\n    -webkit-transform: rotate(45deg);\r\n            transform: rotate(45deg);\r\n    position: absolute;\r\n    right: 5px;\r\n    top: -5px;\r\n}\r\n\r\n.blocks_section_content .article .block_hard.selected, .blocks_section_content .article .block_simple.selected {\r\n    border-color: #000066;\r\n    text-shadow: 0 0 10px #000\r\n}\r\n\r\n.blocks_section_content .article .block_hard.selected {\r\n    border-color: #000066;\r\n    text-shadow: 0 0 10px #000;\r\n}\r\n.blocks_section_content .article .block_hard.changed {\r\n    background: #dd1144;\r\n}\r\n\r\n.blocks_section_content .article .block_hard .close:hover::before{\r\n    color: #000;\r\n}\r\n\r\n.blocks_section_content .article .block_simple .close:hover::before {\r\n    color: #f00;\r\n}", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(7);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;

	buf.push("<section class=\"blocks_section_header\"><header class=\"header\">Текстовые блоки</header></section><section class=\"blocks_section_content\"><aside class=\"aside\"><div class=\"total_blocks\">Всего блоков на странице:<span> 0</span></div><div class=\"selected_blocks\">Выделенных блоков:<span> 0</span></div><div class=\"selected_hard_blocks\">Выделенных зеленых блоков:<span> 0</span></div><div class=\"selected_changed_hard_blocks\">Выделенных красных блоков:<span> 0</span></div><button class=\"add_block\">Добавить блок</button><br><div class=\"add_block_container\"><button class=\"add_block_simple\">Добавить простой блок</button><br><button class=\"add_block_hard\">Добавить сложный блок</button></div></aside><article class=\"article\"></article></section>");;return buf.join("");
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};


	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(8).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "* {\r\n    font-family: Calibri, Arial;\r\n    font-size: 20px;\r\n}\r\n#divBlocks {\r\n    border: 1px solid #000066;\r\n    border-radius: 10px;\r\n    background: #f8f8ff;\r\n    margin: 20px auto;\r\n    width: 50%;\r\n    min-height: 200px\r\n}", ""]);

	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDVlNTRiMjJjNjg5NmVhNDdiNTg2Iiwid2VicGFjazovLy9kZXZlbG9wL2FwcC5qcyIsIndlYnBhY2s6Ly8vZGV2ZWxvcC9ibG9ja3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcC9ibG9ja3MvaW5kZXguY3NzPzkzNzkiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcC9ibG9ja3MvaW5kZXguY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL2RldmVsb3AvYmxvY2tzL2luZGV4LmphZGUiLCJ3ZWJwYWNrOi8vLy4vfi9qYWRlL2xpYi9ydW50aW1lLmpzIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcC9zdHlsZS5jc3M/ZGJjZSIsIndlYnBhY2s6Ly8vLi9kZXZlbG9wL3N0eWxlLmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZTU0YjIyYzY4OTZlYTQ3YjU4NlxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBTaW1wbGVUZXh0QmxvY2tzIGZyb20gJy4vYmxvY2tzJztcclxuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XHJcblxyXG52YXIgc2ltcGxlVGV4dEJsb2NrcyA9IG5ldyBTaW1wbGVUZXh0QmxvY2tzKHtcclxuICAgIFwiZWxlbVwiOiBlbGVtLFxyXG4gICAgXCJPUFRJT05TXCIgOiBPUFRJT05TXHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkZXZlbG9wL2FwcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBJbXBvcnQgc3R5bGVzIGFuZCBIVE1MIHRlbXBsYXRlXHJcbiAqL1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vaW5kZXguamFkZSc7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBwYWdlIHdpdGggdGV4dCBibG9ja3MuXHJcbiAqIEBvcHRpb25zIGlzIGFuIG9iamVjdCB3aXRoIHBhcmFtcy4gVGhlIGZpcnN0IG9uZSBcImVsZW1cIiBpcyByZXF1aXJlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlVGV4dEJsb2NrcyAob3B0aW9ucykge1xyXG4gICAgIC8qKlxyXG4gICAgICAqIHJvb3QgZWxlbWVudFxyXG4gICAgICAqL1xyXG4gICAgIHRoaXMuX2VsZW0gPSBvcHRpb25zLmVsZW07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0IGNvdW50ZXJzXHJcbiAgICAgKi9cclxuICAgICB0aGlzLl90b3RhbEJsb2Nrc0NvdW50ID0gdGhpcy5fc2VsZWN0ZWRCbG9ja3NDb3VudCA9IHRoaXMuX3NlbGVjdGVkSGFyZEJsb2Nrc0NvdW50ID0gdGhpcy5fc2VsZWN0ZWRDaGFuZ2VkSGFyZEJsb2Nrc0NvdW50ID0gMDtcclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogZ2VuZXJhdGUgSFRNTCB0ZW1wbGF0ZSBmcm9tIGphZGUgSlNcclxuICAgICAgKi9cclxuICAgICB0aGlzLl9lbGVtLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWZpbmUgYXJlYSB3aGVyZSB3aWxsIGJlIGJsb2NrcyBhcHBlYXJzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2Jsb2Nrc0FyZWEgPSB0aGlzLl9lbGVtLnF1ZXJ5U2VsZWN0b3IgKFwiLmFydGljbGVcIik7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGxpc3RlbmVycyBmb3IgYWxsIGNsaWNrcyBhbmQgZG91YmxlY2xpY2tzIGluc2lkZSBibG9ja3MqL1xyXG4gICAgdGhpcy5fYmxvY2tzQXJlYS5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIgLCBfZG9BZnRlckNsaWNrRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLl9ibG9ja3NBcmVhLmFkZEV2ZW50TGlzdGVuZXIoIFwiZGJsY2xpY2tcIiAsIF9kb0NoYW5nZUNvbG9yLmJpbmQodGhpcykpO1xyXG5cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogYWRkIGxpc3RlbmVycyBmb3Igc2hvdy9oaWRlIFwiYWRkIGJsb2NrXCIgYnV0dG9uXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9idXR0b25BZGQgPSB0aGlzLl9lbGVtLnF1ZXJ5U2VsZWN0b3IgKFwiLmFkZF9ibG9ja1wiKTtcclxuICAgIHRoaXMuX2J1dHRvbkFkZC5hZGRFdmVudExpc3RlbmVyKCBcIm1vdXNlb3ZlclwiICwgX3Nob3dBZGRCdXR0b25zLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5fYnV0dG9uQWRkLmFkZEV2ZW50TGlzdGVuZXIoIFwibW91c2VvdXRcIiAsIF9oaWRlQWRkQnV0dG9ucy5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuX2RpdkFkZCA9IHRoaXMuX2VsZW0ucXVlcnlTZWxlY3RvciAoXCIuYWRkX2Jsb2NrX2NvbnRhaW5lclwiKTtcclxuICAgIHRoaXMuX2RpdkFkZC5hZGRFdmVudExpc3RlbmVyKCBcIm1vdXNlb3V0XCIgLCBfaGlkZUFkZEJ1dHRvbnMuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLl9kaXZBZGQuYWRkRXZlbnRMaXN0ZW5lciggXCJtb3VzZW92ZXJcIiAsIF9zaG93QWRkQnV0dG9ucy5iaW5kKHRoaXMpKTtcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGxpc3RlbmVycyBmb3IgY3JlYXRpb24gdGV4dCBibG9ja3NcclxuICAgICAqL1xyXG4gICAgdGhpcy5fYWRkQmxvY2tTaW1wbGUgPSB0aGlzLl9lbGVtLnF1ZXJ5U2VsZWN0b3IgKFwiLmFkZF9ibG9ja19zaW1wbGVcIik7XHJcbiAgICB0aGlzLl9hZGRCbG9ja1NpbXBsZS5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIgLCBfY3JlYXRlTmV3U2ltcGxlQmxvY2suYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLl9hZGRCbG9ja0hhcmQgPSB0aGlzLl9lbGVtLnF1ZXJ5U2VsZWN0b3IgKFwiLmFkZF9ibG9ja19oYXJkXCIpO1xyXG4gICAgdGhpcy5fYWRkQmxvY2tIYXJkLmFkZEV2ZW50TGlzdGVuZXIoIFwiY2xpY2tcIiAsIF9jcmVhdGVOZXdIYXJkQmxvY2suYmluZCh0aGlzKSk7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlZmluZSBjb3VudGVycyBhcmVhXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX3RvdGFsQmxvY2tzID0gdGhpcy5fZWxlbS5xdWVyeVNlbGVjdG9yIChcIi50b3RhbF9ibG9ja3Mgc3BhblwiKTtcclxuICAgIHRoaXMuX3NlbGVjdGVkQmxvY2tzID0gdGhpcy5fZWxlbS5xdWVyeVNlbGVjdG9yIChcIi5zZWxlY3RlZF9ibG9ja3Mgc3BhblwiKTtcclxuICAgIHRoaXMuX3NlbGVjdGVkSGFyZEJsb2NrcyA9IHRoaXMuX2VsZW0ucXVlcnlTZWxlY3RvciAoXCIuc2VsZWN0ZWRfaGFyZF9ibG9ja3Mgc3BhblwiKTtcclxuICAgIHRoaXMuX3NlbGVjdGVkQ2hhbmdlZEhhcmRCbG9ja3MgPSB0aGlzLl9lbGVtLnF1ZXJ5U2VsZWN0b3IgKFwiLnNlbGVjdGVkX2NoYW5nZWRfaGFyZF9ibG9ja3Mgc3BhblwiKTtcclxuXHJcblxyXG5cclxuICAgICAvKipcclxuICAgICAgKiBzaG93IGRpdiBjb250YWluaW5nIGJ1dHRvbnMgZm9yIGFkZGluZyBibG9ja3NcclxuICAgICAgKi9cclxuICAgICBmdW5jdGlvbiBfc2hvd0FkZEJ1dHRvbnMgKCkge1xyXG4gICAgICAgICAgdGhpcy5fZGl2QWRkLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgIH1cclxuXHJcblxyXG5cclxuICAgICAvKipcclxuICAgICAgKiBoaWRlIGRpdiBjb250YWluaW5nIGJ1dHRvbnMgZm9yIGFkZGluZyBibG9ja3NcclxuICAgICAgKi9cclxuICAgICBmdW5jdGlvbiBfaGlkZUFkZEJ1dHRvbnMgKGV2ZW50KSB7XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdidXR0b24nKSByZXR1cm47XHJcbiAgICAgICAgICB0aGlzLl9kaXZBZGQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIG5ldyBzaW1wbGUgdGV4dCBibG9ja1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfY3JlYXRlTmV3U2ltcGxlQmxvY2sgKCkge1xyXG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJibG9ja19zaW1wbGVcIjtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCLQn9GA0LjQstC10YIsINGPINC/0YDQvtGB0YLQvtC5INCx0LvQvtC6LCDQvNC10L3RjyDQvNC+0LbQvdC+INCy0YvQtNC10LvQuNGC0Ywg0LjQu9C4INGD0LTQsNC70LjRgtGMITxkaXYgY2xhc3M9J2Nsb3NlJz48L2Rpdj5cIjtcclxuICAgICAgICB0aGlzLl9ibG9ja3NBcmVhLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgIHRoaXMuX3RvdGFsQmxvY2tzQ291bnQrKztcclxuICAgICAgICBfY291bnRCbG9ja3MuY2FsbCAodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgbmV3IGhhcmQgdGV4dCBibG9ja1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfY3JlYXRlTmV3SGFyZEJsb2NrICgpIHtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiYmxvY2tfaGFyZFwiO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBcItCf0YDQuNCy0LXRgiwg0LAg0Y8g0YHQu9C+0LbQvdGL0Lkg0LHQu9C+0LosINGDINC80LXQvdGPINC10YnQtSDQvNC+0LbQvdC+INC4INGG0LLQtdGCINC/0L7QvNC10L3Rj9GC0YwsINC10YHQu9C4INC60LvQuNC60L3Rg9GC0Ywg0LTQstCw0LbQtNGLITxkaXYgY2xhc3M9J2Nsb3NlJz48L2Rpdj5cIjtcclxuICAgICAgICB0aGlzLl9ibG9ja3NBcmVhLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgIHRoaXMuX3RvdGFsQmxvY2tzQ291bnQrKztcclxuICAgICAgICBfY291bnRCbG9ja3MuY2FsbCAodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgb3Igc2VsZWN0IG9wZW5lZCBibG9ja3NcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gX2RvQWZ0ZXJDbGlja0V2ZW50IChldmVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgIC8vIGlmIGNsaWNrIG9uIHRoZSBjbG9zZSBpY29uXHJcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gXCJjbG9zZVwiKSB7XHJcbiAgICAgICAgICAgIF9kb0RlbGV0ZUJsb2NrLmNhbGwgKHRoaXMsIHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiBjbGljayBvbiB0aGUgYmxvY2tcclxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJsb2NrX2hhcmRcIikgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJsb2NrX3NpbXBsZVwiKSkge1xyXG4gICAgICAgICAgICBfZG9TZWxlY3QuY2FsbCAodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZSBibG9ja3NcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gX2RvRGVsZXRlQmxvY2sgKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBkZWwgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgaWYgKGRlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJibG9ja19zaW1wbGVcIikpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsQmxvY2tzQ291bnQtLTtcclxuICAgICAgICAgICAgaWYgKGRlbC5jbGFzc0xpc3QuY29udGFpbnMgKFwic2VsZWN0ZWRcIikpIHRoaXMuX3NlbGVjdGVkQmxvY2tzQ291bnQtLTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Jsb2Nrc0FyZWEucmVtb3ZlQ2hpbGQoZGVsKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBjb25maXJtKFwi0JTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YPQtNCw0LvQuNGC0Yw/XCIpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG90YWxCbG9ja3NDb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbC5jbGFzc0xpc3QuY29udGFpbnMgKFwic2VsZWN0ZWRcIikpIHRoaXMuX3NlbGVjdGVkQmxvY2tzQ291bnQtLTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja3NBcmVhLnJlbW92ZUNoaWxkKGRlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9jb3VudEJsb2Nrcy5jYWxsICh0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2VsZWN0IGJsb2Nrc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfZG9TZWxlY3QgKHRhcmdldCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMgKFwiY2hhbmdlZFwiKSkgdGhpcy5fc2VsZWN0ZWRDaGFuZ2VkSGFyZEJsb2Nrc0NvdW50LS07XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQmxvY2tzQ291bnQtLTtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyAoXCJjaGFuZ2VkXCIpKSB0aGlzLl9zZWxlY3RlZENoYW5nZWRIYXJkQmxvY2tzQ291bnQrKztcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRCbG9ja3NDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9jb3VudEJsb2Nrcy5jYWxsICh0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hhbmdlIGNvbG9yIGJsb2Nrc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfZG9DaGFuZ2VDb2xvciAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJsb2NrX2hhcmRcIikpIHJldHVybjtcclxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNoYW5nZWRcIikpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZENoYW5nZWRIYXJkQmxvY2tzQ291bnQtLTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImNoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ2hhbmdlZEhhcmRCbG9ja3NDb3VudCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfY291bnRCbG9ja3MuY2FsbCAodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2ggY291bnRpbmcgb2YgYmxvY2tzXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIF9jb3VudEJsb2NrcyAoKSB7XHJcbiAgICAgICAgdGhpcy5fdG90YWxCbG9ja3MuaW5uZXJIVE1MID0gXCIgXCIgKyB0aGlzLl90b3RhbEJsb2Nrc0NvdW50O1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQmxvY2tzLmlubmVySFRNTCA9IFwiIFwiICsgdGhpcy5fc2VsZWN0ZWRCbG9ja3NDb3VudDtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEhhcmRCbG9ja3MuaW5uZXJIVE1MID0gXCIgXCIgKyB0aGlzLl9zZWxlY3RlZEhhcmRCbG9ja3NDb3VudDtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZENoYW5nZWRIYXJkQmxvY2tzLmlubmVySFRNTCA9IFwiIFwiICsgdGhpcy5fc2VsZWN0ZWRDaGFuZ2VkSGFyZEJsb2Nrc0NvdW50O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBfY3JlYXRlTmV3U2ltcGxlQmxvY2suY2FsbCAodGhpcyk7XHJcbiAgICBfY3JlYXRlTmV3SGFyZEJsb2NrLmNhbGwgKHRoaXMpO1xyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkZXZlbG9wL2Jsb2Nrcy9pbmRleC5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RldmVsb3AvYmxvY2tzL2luZGV4LmNzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmJsb2Nrc19zZWN0aW9uX2hlYWRlciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjMDAwMDY2O1xcclxcbiAgICBjb2xvcjogI2ZmZjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogOXB4O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYmxvY2tzX3NlY3Rpb25fY29udGVudCB7XFxyXFxuICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcXHJcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hc2lkZSB7XFxyXFxuICAgIHdpZHRoOiAzMCU7XFxyXFxuICAgIG1pbi13aWR0aDogMjAwcHg7XFxyXFxuICAgIG92ZXJmbG93OiBhdXRvO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAjMDAzMzY2O1xcclxcbiAgICBtaW4taGVpZ2h0OiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFzaWRlIC50b3RhbF9ibG9ja3Mge1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYmxvY2tzX3NlY3Rpb25fY29udGVudCAuYXNpZGUgLnNlbGVjdGVkX2Jsb2NrcyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMThweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFzaWRlIC5zZWxlY3RlZF9oYXJkX2Jsb2NrcyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXHJcXG4gICAgY29sb3I6ICMwMDY2MDA7XFxyXFxufVxcclxcblxcclxcbi5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hc2lkZSAuc2VsZWN0ZWRfY2hhbmdlZF9oYXJkX2Jsb2NrcyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXHJcXG4gICAgY29sb3I6ICM5OTAwMDA7XFxyXFxufVxcclxcblxcclxcbi5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hc2lkZSAuYWRkX2Jsb2NrIHtcXHJcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcclxcbiAgICBjb2xvcjogI2ZmZjtcXHJcXG4gICAgYmFja2dyb3VuZDogIzAwMDA2NjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXI6IDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hc2lkZSAuYWRkX2Jsb2NrOjpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiBcXFwiK1xcXCI7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgbGVmdDogLTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFzaWRlIC5hZGRfYmxvY2tfY29udGFpbmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogIzAwMDA2NjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHRvcDogLTZweDtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB0cmFuc2l0aW9uOiA1MDBtcztcXHJcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiB9XFxyXFxuXFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFzaWRlIC5hZGRfYmxvY2tfY29udGFpbmVyLnZpc2libGUge1xcclxcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcclxcbiAgICB0cmFuc2l0aW9uOiA1MDBtcztcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFzaWRlIC5hZGRfYmxvY2tfY29udGFpbmVyIC5hZGRfYmxvY2tfc2ltcGxlLCAuYmxvY2tzX3NlY3Rpb25fY29udGVudCAuYXNpZGUgLmFkZF9ibG9ja19jb250YWluZXIgLmFkZF9ibG9ja19oYXJkIHtcXHJcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcclxcbiAgICBjb2xvcjogI2ZmZjtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiYSg0MiwgOTYsIDE1NSwgMC43Nik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyOiAwO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcclxcbiAgICBtYXJnaW46IDVweCAwO1xcclxcbiAgICB0cmFuc2l0aW9uOiA1MDBtcztcXHJcXG59XFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFzaWRlIC5hZGRfYmxvY2tfY29udGFpbmVyIC5hZGRfYmxvY2tfc2ltcGxlOmhvdmVyLCAuYmxvY2tzX3NlY3Rpb25fY29udGVudCAuYXNpZGUgLmFkZF9ibG9ja19jb250YWluZXIgLmFkZF9ibG9ja19oYXJkOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG4gICAgdHJhbnNpdGlvbjogNTAwbXM7XFxyXFxuICAgIGNvbG9yOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4uYmxvY2tzX3NlY3Rpb25fY29udGVudCAuYXJ0aWNsZSB7XFxyXFxuICAgIHdpZHRoOiA3MCU7XFxyXFxuICAgIG1pbi13aWR0aDogMjAwcHg7XFxyXFxuICAgIG92ZXJmbG93OiBhdXRvO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4XFxyXFxufVxcclxcblxcclxcbi5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hcnRpY2xlIC5ibG9ja19zaW1wbGUge1xcclxcbiAgICBib3JkZXI6IDVweCBzb2xpZCAjY2NjO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZWVlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIHBhZGRpbmc6IDIwcHggMTBweCA1cHggMTBweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBtYXJnaW46IDEwcHggMDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uYmxvY2tzX3NlY3Rpb25fY29udGVudCAuYXJ0aWNsZSAuYmxvY2tfaGFyZCB7XFxyXFxuICAgIGJvcmRlcjogNXB4IHNvbGlkICNjY2M7XFxyXFxuICAgIGJhY2tncm91bmQ6ICMwMDY2MDA7XFxyXFxuICAgIGNvbG9yOiAjZmZmO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIHBhZGRpbmc6IDIwcHggMTBweCA1cHggMTBweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBtYXJnaW46IDEwcHggMDtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uYmxvY2tzX3NlY3Rpb25fY29udGVudCAuYXJ0aWNsZSAuYmxvY2tfaGFyZCAuY2xvc2U6OmJlZm9yZSwgLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFydGljbGUgLmJsb2NrX3NpbXBsZSAuY2xvc2U6OmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCIrXFxcIjtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxyXFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHJpZ2h0OiA1cHg7XFxyXFxuICAgIHRvcDogLTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFydGljbGUgLmJsb2NrX2hhcmQuc2VsZWN0ZWQsIC5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hcnRpY2xlIC5ibG9ja19zaW1wbGUuc2VsZWN0ZWQge1xcclxcbiAgICBib3JkZXItY29sb3I6ICMwMDAwNjY7XFxyXFxuICAgIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMDAwXFxyXFxufVxcclxcblxcclxcbi5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hcnRpY2xlIC5ibG9ja19oYXJkLnNlbGVjdGVkIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDAwMDY2O1xcclxcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzAwMDtcXHJcXG59XFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFydGljbGUgLmJsb2NrX2hhcmQuY2hhbmdlZCB7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNkZDExNDQ7XFxyXFxufVxcclxcblxcclxcbi5ibG9ja3Nfc2VjdGlvbl9jb250ZW50IC5hcnRpY2xlIC5ibG9ja19oYXJkIC5jbG9zZTpob3Zlcjo6YmVmb3Jle1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsb2Nrc19zZWN0aW9uX2NvbnRlbnQgLmFydGljbGUgLmJsb2NrX3NpbXBsZSAuY2xvc2U6aG92ZXI6OmJlZm9yZSB7XFxyXFxuICAgIGNvbG9yOiAjZjAwO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9wb3N0Y3NzLWxvYWRlciEuL2RldmVsb3AvYmxvY2tzL2luZGV4LmNzc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJEOlxcXFxibG9ja3NcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8c2VjdGlvbiBjbGFzcz1cXFwiYmxvY2tzX3NlY3Rpb25faGVhZGVyXFxcIj48aGVhZGVyIGNsYXNzPVxcXCJoZWFkZXJcXFwiPtCi0LXQutGB0YLQvtCy0YvQtSDQsdC70L7QutC4PC9oZWFkZXI+PC9zZWN0aW9uPjxzZWN0aW9uIGNsYXNzPVxcXCJibG9ja3Nfc2VjdGlvbl9jb250ZW50XFxcIj48YXNpZGUgY2xhc3M9XFxcImFzaWRlXFxcIj48ZGl2IGNsYXNzPVxcXCJ0b3RhbF9ibG9ja3NcXFwiPtCS0YHQtdCz0L4g0LHQu9C+0LrQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtTo8c3Bhbj4gMDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJzZWxlY3RlZF9ibG9ja3NcXFwiPtCS0YvQtNC10LvQtdC90L3Ri9GFINCx0LvQvtC60L7Qsjo8c3Bhbj4gMDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJzZWxlY3RlZF9oYXJkX2Jsb2Nrc1xcXCI+0JLRi9C00LXQu9C10L3QvdGL0YUg0LfQtdC70LXQvdGL0YUg0LHQu9C+0LrQvtCyOjxzcGFuPiAwPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XFxcInNlbGVjdGVkX2NoYW5nZWRfaGFyZF9ibG9ja3NcXFwiPtCS0YvQtNC10LvQtdC90L3Ri9GFINC60YDQsNGB0L3Ri9GFINCx0LvQvtC60L7Qsjo8c3Bhbj4gMDwvc3Bhbj48L2Rpdj48YnV0dG9uIGNsYXNzPVxcXCJhZGRfYmxvY2tcXFwiPtCU0L7QsdCw0LLQuNGC0Ywg0LHQu9C+0Lo8L2J1dHRvbj48YnI+PGRpdiBjbGFzcz1cXFwiYWRkX2Jsb2NrX2NvbnRhaW5lclxcXCI+PGJ1dHRvbiBjbGFzcz1cXFwiYWRkX2Jsb2NrX3NpbXBsZVxcXCI+0JTQvtCx0LDQstC40YLRjCDQv9GA0L7RgdGC0L7QuSDQsdC70L7QujwvYnV0dG9uPjxicj48YnV0dG9uIGNsYXNzPVxcXCJhZGRfYmxvY2tfaGFyZFxcXCI+0JTQvtCx0LDQstC40YLRjCDRgdC70L7QttC90YvQuSDQsdC70L7QujwvYnV0dG9uPjwvZGl2PjwvYXNpZGU+PGFydGljbGUgY2xhc3M9XFxcImFydGljbGVcXFwiPjwvYXJ0aWNsZT48L3NlY3Rpb24+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RldmVsb3AvYmxvY2tzL2luZGV4LmphZGVcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qYWRlL2xpYi9ydW50aW1lLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogKGlnbm9yZWQpICovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBmcyAoaWdub3JlZClcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXZlbG9wL3N0eWxlLmNzc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBDYWxpYnJpLCBBcmlhbDtcXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbn1cXHJcXG4jZGl2QmxvY2tzIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDA2NjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZDogI2Y4ZjhmZjtcXHJcXG4gICAgbWFyZ2luOiAyMHB4IGF1dG87XFxyXFxuICAgIHdpZHRoOiA1MCU7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L3Bvc3Rjc3MtbG9hZGVyIS4vZGV2ZWxvcC9zdHlsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBOzs7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFGQTs7Ozs7O0FDTEE7QUFDQTs7Ozs7Ozs7QUFZQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBREE7Ozs7QUFJQTtBQUNBOzs7O0FBTEE7QUFDQTs7OztBQURBO0FBQ0E7Ozs7QUFEQTtBQUNBOzs7QUFEQTtBQXlCQTtBQUNBOzs7O0FBMUJBO0FBZ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQXJDQTtBQTRDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQS9DQTtBQXNEQTtBQUNBO0FBQ0E7QUFDQTs7OztBQXpEQTtBQWdFQTtBQURBO0FBQ0E7Ozs7QUFoRUE7QUF5RUE7QUFDQTtBQUNBO0FBSEE7QUFDQTs7OztBQXpFQTtBQW9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7Ozs7QUFwRkE7QUFtR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBOzs7O0FBbkdBO0FBbUhBO0FBQ0E7O0FBRkE7QUFLQTtBQURBO0FBQ0E7O0FBTEE7QUFVQTtBQURBO0FBVEE7QUFDQTs7OztBQW5IQTtBQXNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFWQTtBQUNBO0FBa0JBO0FBdEJBO0FBQ0E7Ozs7QUF0SUE7QUFvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBQ0E7QUFhQTtBQWZBO0FBQ0E7Ozs7QUFwS0E7QUEyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUxBO0FBT0E7QUFWQTtBQUNBOzs7O0FBM0xBO0FBNk1BO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQVVBO0FBQ0E7QUF4TkE7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyUEE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9