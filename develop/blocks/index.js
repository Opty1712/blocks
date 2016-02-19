'use strict';

/**
 * Import styles and HTML template
 */
import './index.css';
import template from './index.jade';


/**
 * Represents a page with text blocks.
 * @options is an object with params. The first one "elem" is required
 */
export default function SimpleTextBlocks (options) {
     /**
      * root element
      */
     this._elem = options.elem;

    /**
     * init counters
     */
     this._countSimple = this._countRed = this._countGreen = 0;

     /**
      * generate HTML template from jade JS
      */
     this._elem.innerHTML = template();

    /**
     * define area where will be blocks appears
     */
    this._blocksArea = this._elem.querySelector (".article");


    /**
     * add listeners for all clicks and doubleclicks inside blocks*/
    this._blocksArea.addEventListener( "click" , _doAfterClickEvent.bind(this));
    this._blocksArea.addEventListener( "dblclick" , _doSelectDeselect.bind(this));


     /**
      * add listeners for show/hide "add block" button
      */
    this._buttonAdd = this._elem.querySelector (".add_block");
    this._buttonAdd.addEventListener( "mouseover" , _showAddButtons.bind(this));
    this._buttonAdd.addEventListener( "mouseout" , _hideAddButtons.bind(this));
    this._divAdd = this._elem.querySelector (".add_block_container");
    this._divAdd.addEventListener( "mouseout" , _hideAddButtons.bind(this));
    this._divAdd.addEventListener( "mouseover" , _showAddButtons.bind(this));



    /**
     * add listeners for creation text blocks
     */
    this._addBlockSimple = this._elem.querySelector (".add_block_simple");
    this._addBlockSimple.addEventListener( "click" , _createNewSimpleBlock.bind(this));
    this._addBlockHard = this._elem.querySelector (".add_block_hard");
    this._addBlockHard.addEventListener( "click" , _createNewHardBlock.bind(this));



     /**
      * show div containing buttons for adding blocks
      */
     function _showAddButtons () {
          this._divAdd.classList.add("visible");
     }



     /**
      * hide div containing buttons for adding blocks
      */
     function _hideAddButtons (event) {
          var target = event.target;
          if (target.tagName == 'button') return;
          this._divAdd.classList.remove("visible");
     }



    /**
     * creates new simple text block
     */
    function _createNewSimpleBlock () {
        var div = document.createElement('div');
        div.className = "block_simple";
        div.innerHTML = "Привет, я простой блок, меня можно выделить или удалить!<div class='close'></div>";
        this._blocksArea.appendChild(div);
    }



    /**
     * creates new hard text block
     */
    function _createNewHardBlock () {
        var div = document.createElement('div');
        div.className = "block_hard";
        div.innerHTML = "Привет, а я сложный блок, у меня еще можно и цвет поменять, если кликнуть дважды!<div class='close'></div>";
        this._blocksArea.appendChild(div);
    }



    /**
     * remove or select opened blocks
     */
    function _doAfterClickEvent (event) {
        var target = event.target;
        if (target.className != "close") return;
        var del = target.parentNode;
        if (del.className == "block_simple"){
            this._blocksArea.removeChild(del);
        } else {
            var result = confirm("Действительно удалить?");
            if (result) this._blocksArea.removeChild(del);
        }
    }



    /**
     * remove or select opened blocks
     */
    function _doSelectDeselect (event) {
        var target = event.target;
        if (target.className != "block_simple" && target.className != "block_hard") return;
        target.classList.add("selected");
    }

}
