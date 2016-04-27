var regExElems = {
    attrWithValExp: /^\[[a-zA-Z]{2,}?=\'[a-zA-Z0-9]{2,}\'\]$/,
    onlyAttr: /^\[[a-zA-Z]{2,}\]$/,
    idExp: /^\#[a-zA-Z0-9]{1,}$/,
    classExp: /^\.[a-zA-Z0-9]{1,}$/,
    tagNameExp: /^[a-zA-Z]{1,}$/
};
var getTypeOfElem = function(typeofElm, elemStr) {
  if(typeofElm == "id"){
      return {  type: typeofElm,  elem: elemStr.replace(/\#/g, "") }
  }else if(typeofElm == "class"){
      return {  type: typeofElm,  elem: elemStr.replace(/\./g, "") }
  }else if(typeofElm == "attr"){
      return {  type: typeofElm,  elem: elemStr.replace(/\s\[\]$/g, "") }
  }
}

var myMethods = function(self) {
    return {
        length : function(){
          console.log(self.elemCount);
          return self.elemCount;
        },
        findElemType: function(elemStr) {
            if (regExElems.idExp.test(elemStr)) {
                return getTypeOfElem("id", elemStr);
            } else if (regExElems.classExp.test(elemStr)) {
                return getTypeOfElem("class", elemStr);
            } else if (regExElems.onlyAttr.test(elemStr)) {
                return getTypeOfElem("attr", elemStr);
            } else if (regExElems.tagNameExp.test(elemStr)) {
                return getTypeOfElem("tag", elemStr);
            }
        },
        findDomElem: function(elemStr) {
            if (typeof self.elem == "object") {
                return [self.elem];
            }
            var elemArr = self.elem.split(",");
            var _this = this;
            var domArray = [];
            for (var i = 0; i < elemArr.length; i++) {
                /// replacing the whitespace from an element...
                var elem = elemArr[i].replace(/\s/g, "");
                /// Find element type for ex : ID, CLASS, ATTRIBUTE
                var elemType = _this.findElemType(elem);
                console.log(elemType);
                if (elemType.type == "id") {
                    var getId = (document.getElementById(elemType.elem) != null) ? document.getElementById(elemType.elem) : [];
                    if (getId.length > 1) {
                        for (var id = 0; id < getId.length; id++) {
                            domArray.push(getId[id]);
                        }
                    } else {
                        domArray.push(getId);
                    }
                } else if (elemType.type == "class") {
                    var getClass = document.getElementsByClassName(elemType.elem);
                    if (getClass.length > 1) {
                        for (var clas = 0; clas < getClass.length; clas++) {
                            domArray.push(getClass[clas]);
                        }
                    } else {
                        domArray.push(getClass);
                    }
                } else if (elemType.type == "tag") {
                    var getTag = document.getElementsByTagName(elemType.elem);
                    for (var tag = 0; tag < getTag.length; tag++) {
                        domArray.push(getTag[tag]);
                    }
                }
            }
            self.elemCount = domArray.length;
            console.log(domArray);
            return domArray;
        },
        innerHTML: function() {
            var domElem = this.findDomElem(self.elem);
            var domHTML = "";
            if (typeof domElem == "object") {
                console.log(domElem.length);
                for (var i = 0; i < domElem.length; i++) {
                    domHTML += domElem[i].innerHTML;
                }
            }
            return domHTML;
        },
        setAttr: function(keyObj, val) {
            var domElem = this.findDomElem(self.elem);
            domElem.forEach(function(elem) {
                if (typeof keyObj == "string") {
                    elem.setAttribute(keyObj, val)
                } else if (typeof keyObj == "object") {
                    for (var key in keyObj) {
                        elem.setAttribute(key, keyObj[key])
                    }
                }
            });
            return this;
        },
        removeAttr: function(attrs) {
            var domElem = this.findDomElem(self.elem);
            domElem.forEach(function(elem) {
                if (typeof attrs == "string") {
                    elem.removeAttribute(attrs)
                } else if (typeof attrs == "object") {
                    attrs.forEach(function(attr) {
                        elem.removeAttribute(attr);
                    });
                }
            });
            return this;
        },
        getAttr: function(attr) {
            var domElem = this.findDomElem(self.elem);
            var resp = "";
            domElem.forEach(function(elem) {
                resp = elem.getAttribute(attr);
            });
            return resp;
        },
        addClass: function(className) {
            var domElem = this.findDomElem(self.elem);
            for (var i = 0; i < domElem.length; i++) {
                var existClass = domElem[i].getAttribute('class');
                if (existClass == null) {
                    existClass = "";
                } else {
                    existClass = existClass + " "
                }
                if (typeof className == "object") {
                    className.forEach(function(classStr) {
                        domElem[i].className = ((domElem[i].getAttribute('class') == null) ? "" : domElem[i].getAttribute('class')) + " " + classStr;
                    });
                } else if (typeof className == "string") {
                    domElem[i].className = existClass + className;
                }
            }
            return this;
        },
        removeClass: function(className) {
            var domElem = this.findDomElem(this.elem);
            for (var i = 0; i < domElem.length; i++) {
                var findClass = domElem[i].getAttribute('class');
                var AfterRemovedClass = findClass.replace(className, "");
                domElem[i].className = AfterRemovedClass.replace(/\s/g, " ");
            }
            return this;
        },
        click: function(callback) {
            var domElem = this.findDomElem(self.elem);
            domElem.forEach(function(elem) {
                elem.addEventListener("click", callback, true);
            });
        },
        addChild : function(html, placing){
          var domElem = this.findDomElem(self.elem);
          domElem.forEach(function(elem){
            if(placing == undefined){ elem.innerHTML = elem.innerHTML+" "+html}
            else if(placing.before == true){ elem.innerHTML = html +" "+elem.innerHTML}
          });
        },
        find : function(f_elem){
          var domElem = this.findDomElem(this.elem);
          var fElem;
          domElem.forEach(function(elem){
            fElem = elem.querySelectorAll(f_elem);
            this.elem = fElem;
            this.elemCount = fElem.length;
          });
          return this;
        },
        outerHTML: function() {
          var domElem = this.findDomElem(self.elem);
          var domHTML = "";
          if (typeof domElem == "object") {
              console.log(domElem.length);
              for (var i = 0; i < domElem.length; i++) {
                  domHTML = domElem[i].outerHTML;
              }
          }
          return domHTML;
        }
    };
}


function Mscript(elem) {
    this.elem = elem;
    this.elemCount = 0;
    console.log(this.elem);

    console.log(typeof elem);
    return myMethods(this);

}
