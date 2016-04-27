(function() {
    var m_Prototype = Mscript = function(elem) {
        this.selectorsArr = [];
        if (elem == undefined || elem == null) return this;
        if (typeof elem == "object") elem = elem;
        this.elem = elem;
        if(this.selectorsArr.indexOf(elem) == -1)
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
        if(scope == undefined){ scope = document;}
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
    m_Prototype.prototype = Mscript.prototype =  {
        rootScope : document,
        innerHTML: function() {
            var elem = elemType(this.elem);
            console.log(typeof elem);
            if (elem[0] == undefined) return elem.innerHTML;
            return elem[0].innerHTML;
        },
        outerHTML: function() {
            var elem = elemType(this.elem);
            if (elem[0] == undefined) return elem.outerHTML;
            return elem[0].outerHTML;
        },
        append: function(text) {
            var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                elem[i].innerHTML = elem[i].innerHTML + " " + text;
            }
            return this;
        },
        prepend: function(appendTxt) {
            var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                elem[i].innerHTML = appendTxt + " " + elem[i].innerHTML;
            }
            return this;
        },
        selectorsArr : [],

        findBySelector : function(){
          var elements = [];
          if(this.selectorsArr.length == 1 ) return document.querySelectorAll(this.selectorsArr[0]);
          else if(this.selectorsArr.length > 1){
            for(var i=0; i<this.selectorsArr.length; i++){
              var parent;
                if(i < this.selectorsArr.length && (i+1) != this.selectorsArr.length) {
                  parent = document.querySelectorAll(this.selectorsArr[i]);
                  /*for(var p=0; p<parent.length; p++){
                    elements.push(parent[p]);
                  }*/
                }
                console.log(parent, "parent");
                for(var k=0; k<parent.length; k++){
                  var children= (parent[k].querySelectorAll(this.selectorsArr[i]));
                  for(var c=0; c<children.length; c++){
                    elements.push(children[c]);
                  }
                }
            }
          }
          console.log(elements, "elements")
          return elements;
        },
        addClass: function(className) {
            var elem = this.findBySelector()
            console.log(elem);
            //var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                var classes = className.split(" ");
                classes.forEach(function(cls) {
                    if (elem[i].classList) elem[i].classList.add(cls);
                    else {
                        elem[i].className = elem[i].getAttribute("class") + " " + cls
                    }
                });
            }
            return this;
        },
        /*addClass: function(className) {
            console.log("selectorsArr ", this.selectorsArr);
            var elem = elemType(this.elem);
            console.log("addClass", elem);
            for (var i = 0; i < elem.length; i++) {
                var classes = className.split(" ");
                classes.forEach(function(cls) {
                    if (elem[i].classList) elem[i].classList.add(cls);
                    else {
                        elem[i].className = elem[i].getAttribute("class") + " " + cls
                    }
                });
            }
            return this;
        },
        removeClass: function(className) {
            var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                console.log(elem[i].classList);
                var classes = className.split(" ");
                classes.forEach(function(cls) {
                    console.log(elem[i].getAttribute("class").indexOf(cls));
                    if (elem[i].getAttribute("class").indexOf(cls) != -1) {
                        if (elem[i].classList) elem[i].classList.remove(cls);
                        else {
                            elem[i].className = elem[i].getAttribute("class") + " " + cls
                        }
                    }
                });
            }
            return this;
        },*/
        each: function(callback) {
            console.log(this.elem);
            var elem = elemType(this.elem);
            for (i = 0; i < elem.length; i++) {
                callback(elem[i], i);
            }
        },
        insertBefore: function(htmlStr) {
            var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                elem[i].insertAdjacentHTML('beforebegin', htmlStr);
            }
            return this;
        },
        insertAfter: function(htmlStr) {
            var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                elem[i].insertAdjacentHTML("afterend", htmlStr);
            }
            return this;
        },
        next: function() {
            var elem = elemType(this.elem);
            return _M(elem[0].nextElementSibling);
        },
        prev: function() {
            var elem = elemType(this.elem);
            return _M(elem[0].previousElementSibling);
        },
        find: function(findElem) {
          var findElemsInside;
          console.log(typeof this.elem);
          if(typeof this.elem == "string"){
            var elem = document.querySelectorAll(this.elem);
            for(var i=0; i<elem.length; i++){
              findElemsInside = elem[i].querySelectorAll(findElem);
            }

          }else if (typeof this.elem == "object") {
              var elem = elemType(this.elem);
              console.log("FIND elem", elem.length);
              for(var i=0; i<elem.length; i++){

              }
          }
          this.selectorsArr.push(findElem);
          this.elem = findElem;
          console.log("selector ", this.elem);
          return this;
        },
        filter: function(filterSelector) {
          if(typeof this.elem == "string"){
            var elem = document.querySelectorAll(this.elem);
            var findElems = elem[0].querySelectorAll(findElem);
          }else if (typeof this.elem == "object") {
              var elem = elemType(this.elem);
              var findElems = elem[0].querySelectorAll(findElem);
          }
          this.elem = selector = findElems;
          return this;
        },
        show: function() {
            var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                elem[i].style.display = "";
            }
        },
        hide: function() {
            var elem = elemType(this.elem);
            for (var i = 0; i < elem.length; i++) {
                elem[i].style.display = "none";
            }
        },
        isArray: function(typeofObj) {
            return typeof typeofObj == "[Object Array]";
        }

    }



    //publishing the _M method
    window._M = _M;


})();
