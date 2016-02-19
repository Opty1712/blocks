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
     this._totalBlocksCount = this._selectedBlocksCount = this._selectedHardBlocksCount = this._selectedChangedHardBlocksCount = 0;

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
    this._blocksArea.addEventListener( "dblclick" , _doChangeColor.bind(this));


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
     * define counters area
     */
    this._totalBlocks = this._elem.querySelector (".total_blocks span");
    this._selectedBlocks = this._elem.querySelector (".selected_blocks span");
    this._selectedHardBlocks = this._elem.querySelector (".selected_hard_blocks span");
    this._selectedChangedHardBlocks = this._elem.querySelector (".selected_changed_hard_blocks span");



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

        this._totalBlocksCount++;
        _countBlocks.call (this);
    }



    /**
     * creates new hard text block
     */
    function _createNewHardBlock () {
        var div = document.createElement('div');
        div.className = "block_hard";
        div.innerHTML = "Привет, а я сложный блок, у меня еще можно и цвет поменять, если кликнуть дважды!<div class='close'></div>";
        this._blocksArea.appendChild(div);

        this._totalBlocksCount++;
        _countBlocks.call (this);

    }



    /**
     * remove or select opened blocks
     */
    function _doAfterClickEvent (event) {
        var target = event.target;

        // if click on the close icon
        if (target.className == "close") {
            _doDeleteBlock.call (this, target);
        }

        // if click on the block
        if (target.classList.contains("block_hard") || target.classList.contains("block_simple")) {
            _doSelect.call (this, target);
        }
    }



    /**
     * delete blocks
     */
    function _doDeleteBlock (target) {
        var del = target.parentNode;

        if (del.classList.contains("block_simple")) {

            this._totalBlocksCount--;
            if (del.classList.contains ("selected")) this._selectedBlocksCount--;

            this._blocksArea.removeChild(del);

        } else {

            var result = confirm("Действительно удалить?");
            if (result) {

                this._totalBlocksCount--;
                if (del.classList.contains ("selected")) this._selectedBlocksCount--;

                this._blocksArea.removeChild(del);
            }
        }

        _countBlocks.call (this);
    }



    /**
     * select blocks
     */
    function _doSelect (target) {
        if (target.classList.contains("selected")) {
            if (target.classList.contains ("changed")) this._selectedChangedHardBlocksCount--;
            this._selectedBlocksCount--;

            target.classList.remove("selected");

        } else {

            if (target.classList.contains ("changed")) this._selectedChangedHardBlocksCount++;
            this._selectedBlocksCount++;

            target.classList.add("selected");
        }

        _countBlocks.call (this);
    }



    /**
     * change color blocks
     */
    function _doChangeColor (event) {
        var target = event.target;
        if (!target.classList.contains("block_hard")) return;
        if (target.classList.contains("changed")) {
            target.classList.remove("changed");
            this._selectedChangedHardBlocksCount--;
        } else {
            target.classList.add("changed");
            this._selectedChangedHardBlocksCount++;
        }
        _countBlocks.call (this);
    }



    /**
     * refresh counting of blocks
     */
    function _countBlocks () {
        this._totalBlocks.innerHTML = " " + this._totalBlocksCount;
        this._selectedBlocks.innerHTML = " " + this._selectedBlocksCount;
        this._selectedHardBlocks.innerHTML = " " + this._selectedHardBlocksCount;
        this._selectedChangedHardBlocks.innerHTML = " " + this._selectedChangedHardBlocksCount;
    }





    _createNewSimpleBlock.call (this);
    _createNewHardBlock.call (this);

}
