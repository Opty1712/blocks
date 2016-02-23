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
      * generate HTML template from jade JS
      */
     this._elem.innerHTML = template();

    /**
     * define area where will be blocks appears
     */
    this._blocksArea = this._elem.querySelector (".article");


    /**
     * add observer listener: if anything changes inside _blocksArea
     */
    var self = this;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            self.countBlocks();
        });
    });

    var configObserver = { attributes: true, childList: true, characterData: true, subtree: true };
    observer.observe(this._blocksArea, configObserver);


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
     * new simple text block constructor
     */
    function _SimpleBlockConstructor () {

        /**
         * initial settings
         */
        this.div = document.createElement('div');
        this.div.className = "block_simple";
        this.div.innerHTML = Math.random() + "<div class='close'></div>";



        /**
         * delete blocks
         */
        this._doDeleteBlock = function (target) {
            var del = target.parentNode;
            var parent = del.parentNode;
            parent.removeChild(del);
        };




        /**
         * select blocks
         */
        this._doSelect = function (target) {

            if (target.classList.contains("selected")) {
                target.classList.remove("selected");
            } else {
                target.classList.add("selected");
            }
        };


        /**
         * listen for the click and decide what to do
         */
        this._doAfterClickEvent = function  (event) {
            var target = event.target;

            // if click on the close icon
            if (target.className == "close") {
                this._doDeleteBlock (target);

            // if click on the div
            } else {
                this._doSelect (target);
            }
        };

        this.div.addEventListener( "click" , this._doAfterClickEvent.bind(this));

    }


    /**
     * creates new simple text block
     */
    function _createNewSimpleBlock () {
        var block = new _SimpleBlockConstructor ();
        this._blocksArea.appendChild(block.div);
    }



    /**
     * new hard text block constructor
     */
    function _HardBlockConstructor () {

        _SimpleBlockConstructor.call (this);

        this.div.className = "block_hard";
        this.div.innerHTML = Math.random() + "<div class='close'></div>";



        /**
         * delete blocks - overwrite inherital function
         */
        this._doDeleteBlock = function (target) {
            var result = confirm("Действительно удалить?");
            if (result) {

                var del = target.parentNode;
                var parent = del.parentNode;
                parent.removeChild(del);

            }
        };


        /**
         * change color blocks
         */
        this._doChangeColor = function (event) {
            var target = event.target;

            if (target.classList.contains("changed")) {
                target.classList.remove("changed");
            } else {
                target.classList.add("changed");
            }
        };




        /**
         * select blocks - overwrite inherital function
         */
        this._doSelect = function (target) {

            if (target.classList.contains("selected")) {
                target.classList.remove("selected");
            } else {
                target.classList.add("selected");
            }
        };


        this.div.addEventListener( "dblclick" , this._doChangeColor.bind(this));
    }



    /**
     * creates new hard text block
     */
    function _createNewHardBlock () {
        var block = new _HardBlockConstructor ();
        this._blocksArea.appendChild(block.div);
    }






    /**
     * refresh counting of blocks
     */
    this.countBlocks = function () {
        this._totalBlocks.innerText = this._blocksArea.querySelectorAll ("div:not(.close)").length;
        this._selectedBlocks.innerText = this._blocksArea.querySelectorAll ("div.selected").length;
        this._selectedHardBlocks.innerText = this._blocksArea.querySelectorAll ("div.selected:not(.changed)").length;
        this._selectedChangedHardBlocks.innerText = this._blocksArea.querySelectorAll ("div.selected.changed").length;

    };



    _createNewSimpleBlock.call (this);
    _createNewHardBlock.call (this);

}

