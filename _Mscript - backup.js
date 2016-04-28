(function() {
    var m_Prototype = Mscript = function(elem) {
        this.selectorsArr = [];
        if (elem == undefined || elem == null) return this;
        if (typeof elem == "object") elem = elem;
        this.elem = elem;
        if (this.selectorsArr.indexOf(elem) == -1)
            this.selectorsArr.push(elem);
    }
    var _M = Mscript = function(selector) {
        return new m_Prototype(selector)
    }
    _M.each = function(arr, callback) {
        for (var i = 0; i < arr.length; i++) callback(arr[i], i);
    };
    _M.async = function() {

    };

    function elemType(selector, scope) {
        if (scope == undefined) {
            scope = document;
        }
        console.log("elemType", selector)
        if (typeof selector == "string") {
            var selectors = scope.querySelectorAll(selector);
            return selectors;
        } else if (typeof selector == "object") {
            return [selector];
        }
    }

    var regExElems = {
        attrWithValExp: /^\[[a-zA-Z]{2,}?=\'[a-zA-Z0-9]{2,}\'\]$/,
        onlyAttr: /^\[[a-zA-Z]{2,}\]$/,
        idExp: /^\#[a-zA-Z0-9]{1,}$/,
        classExp: /^\.[a-zA-Z0-9]{1,}$/,
        tagNameExp: /^[a-zA-Z]{1,}$/
    };
    m_Prototype.prototype = Mscript.prototype = {
        rootScope: document,
        selectorsArr: [],
        findBySelectors: function() {
            var elements = [];
            if (this.selectorsArr.length == 1) {
                if (typeof this.selectorsArr[0] == "string") return document.querySelectorAll(this.selectorsArr[0]);
                else elements.push(this.selectorsArr[0]);
            } else if (this.selectorsArr.length > 1) {
                for (var i = 0; i < this.selectorsArr.length; i++) {
                    var parent;
                    if (i < this.selectorsArr.length && (i + 1) != this.selectorsArr.length) {
                        if (typeof this.selectorsArr[i] == "string") parent = document.querySelectorAll(this.selectorsArr[i]);
                        else {
                            parent = this.selectorsArr[i]
                        }
                    }
                    for (var k = 0; k < parent.length; k++) {
                        if (typeof this.selectorsArr[i] == "string") {
                            var children = (parent[k].querySelectorAll(this.selectorsArr[i]));
                        } else {
                            var children = (this.selectorsArr[i]);
                        }
                        for (var c = 0; c < children.length; c++) {
                            elements.push(children[c]);
                        }
                    }
                }
            }
            return elements;
        },
        findEachSelector: function(callback) {
            var elem = this.findBySelectors();
            for (var i = 0; i < elem.length; i++) {
                callback(elem[i], i);
            }
        },
        innerHTML: function() {
          var innerHTML;
          this.findEachSelector(function(elem, i) {
              innerHTML = elem.innerHTML;
          });
          return innerHTML;
        },
        outerHTML: function() {
          var outerHTML;
          this.findEachSelector(function(elem, i) {
              outerHTML = elem.outerHTML;
          });
          return outerHTML;
        },
        append: function(text) {
            this.findEachSelector(function(elem, i) {
                elem.innerHTML = elem.innerHTML + " " + text;
            });
            return this;
        },
        prepend: function(appendTxt) {
          this.findEachSelector(function(elem, i) {
              elem.innerHTML = appendTxt+" "+elem.innerHTML;
          });
          return this;
        },
        addClass: function(className) {
            this.findEachSelector(function(elem, i) {
                var classes = className.split(" ");
                classes.forEach(function(cls) {
                    if (elem.classList) elem.classList.add(cls);
                    else {
                        console.log(elem);
                        elem.className = elem.getAttribute("class") + " " + cls
                    }
                });
            });
            return this;
        },
        removeClass: function(className) {
            this.findEachSelector(function(elem, i) {
                var classes = className.split(" ");
                classes.forEach(function(cls) {
                    console.log(elem.getAttribute("class").indexOf(cls));
                    if (elem.getAttribute("class").indexOf(cls) != -1) {
                        if (elem.classList) elem.classList.remove(cls);
                        else {
                            elem.className = elem.getAttribute("class") + " " + cls
                        }
                    }
                });
            });
            return this;
        },
        each: function(callback) {
            this.findEachSelector(function(elem, i) {
                callback(elem, i);
            });
        },
        insertBefore: function(htmlStr) {
            this.findEachSelector(function(elem, i) {
                elem.insertAdjacentHTML('beforebegin', htmlStr);
            });
            return this;
        },
        width : function(){
            var width;
            this.findEachSelector(function(elem, i) {
                width = elem.clientWidth;
            });
            return width;
        },
        height : function(){
            var innerHeight;
            this.findEachSelector(function(elem, i) {
                innerHeight = elem.clientHeight;
            });
            return innerHeight;
        },
        insertAfter: function(htmlStr) {
            this.findEachSelector(function(elem, i) {
                elem.insertAdjacentHTML("afterend", htmlStr);
            });
            return this;
        },
        next: function() {
            var that = this;
            this.findEachSelector(function(elem, i) {
                that.selectorsArr.length = 0;
                that.selectorsArr.push(elem.nextElementSibling);
            });
            return this;
        },
        prev: function() {
            var that = this;
            this.findEachSelector(function(elem, i) {
                that.selectorsArr.length = 0;
                that.selectorsArr.push(elem.previousElementSibling);
            });
            return this;
        },
        find: function(findElem) {
            var findElemsInside;
            this.selectorsArr.push(findElem);
            return this;
        },
        show: function() {
            this.findEachSelector(function(elem, i) {
                elem.style.display = "";
            });
            return this;
        },
        hide: function() {
            this.findEachSelector(function(elem, i) {
                elem.style.display = "none";
            });
            return this;
        },
        isArray: function(typeofObj) {
            return typeof typeofObj == "[Object Array]";
        },
        click: function(callback) {
            this.findEachSelector(function(elem, i) {
              elem.addEventListener("click", callback, true);
            });
        },
        dblClick : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("dblclick", callback, true);
          });
        },
        focusin : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("focusin", callback, true);
          })
        },
        focusout : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("focusout", callback, true);
          })
        },
        children : function(childElem){
          that = this;
          this.findEachSelector(function(parent, i){
            that.selectorsArr =parent.childNodes;
          })
          return this;
        },
        blur : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("blur", callback, true);
          })
        },
        val : function(){
          var elemVal;
          this.findEachSelector(function(elem, i) {
            elemVal = elem.value
          });
          return elemVal;
        },
        mouseup : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("mouseup", callback, true);
          });
        },
        mousemove : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("mousemove", callback, true);
          });
        },
        mousedown : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("mousedown", callback, true);
          });
        },
        keydown : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("keydown", callback, true);
          });
        },
        keyup : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("keyup", callback, true);
          });
        },
        keypress : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("keypress", callback, true);
          });
        },
        clone : function(){
            var cloneHtml;
            this.findEachSelector(function(elem, i){
              cloneHtml = elem.cloneNode(true);
            });
            return cloneHtml;
        },
        lastChild : function(){
          var lastChild;
          this.findEachSelector(function(elem, i){
            lastChild = elem.lastChild;
          });
          return _M(lastChild);
        },
        change : function(callback){
          this.findEachSelector(function(elem, i) {
            elem.addEventListener("change", callback, true);
          });
        },
        domReady: function(fn) {
          var that = this;
          var setInterval1 = setInterval(function(){
            console.log(document.readyState);
              if(document.readyState == "complete"){
                that.findEachSelector(function(elem, i) {
                    fn()
                    if (document.readyState != "loading") {
                          document.addEventListener("domContentLoaded", fn);
                    } else if (document.addEventListener) {
                        document.addEventListener("domContentLoaded", fn);
                    } else {
                        document.attachEvent('onreadystatechange', function() {
                            if (document.readyState != "loading") fn();
                        });
                    }
                })
                clearInterval(setInterval1);
              }
          }, 10);


        }

    }



    //publishing the _M method
    window._M = _M;


})();
