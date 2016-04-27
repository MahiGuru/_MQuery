/*function DataBind(objectID) {
    pubsub = {
        callbacks: {},
        on: function(msg, callback) {
            console.log(this.callbacks[msg]);
            this.callbacks[msg] = this.callbacks[msg] || [];
            this.callbacks[msg].push(callback);

        },
        publish: function(msg) {
          console.log("PUBLISHHHHHHHH >>>>>>>> ");
           console.log(this.callbacks[msg]);
            this.callbacks[msg] = this.callbacks[msg] || [];
            for (var i = 0; i < this.callbacks[msg].length; i++) {
             console.log(arguments);
                this.callbacks[msg][i].apply(this, arguments);
            }
        }
    }
    bindData = "bind_" + objectID;
    msgChange = objectID + ":change";

    changeHandler = function(evt) {
        var target = evt.target || evt.srcElement;
        var getAttributeVal = target.getAttribute(bindData);
        console.log("getAttributeVal == " + getAttributeVal);
        if (getAttributeVal && getAttributeVal != null) {
            pubsub.publish(msgChange, getAttributeVal, target.value);
        }
    };

    if (document.addEventListener) {
        document.addEventListener("change", changeHandler, false);
    } else {
        document.attachEvent("onchange", changeHandler);
    }
    ///pubsub changes all bound elements..

    pubsub.on(msgChange, function(evt, prop_name, new_val) {
        console.log(prop_name + " ------- " + new_val);
        var elements = document.querySelectorAll("[" + bindData + "=" + prop_name[1] + "]"),
            tag_name;

        for (var i = 0; i < elements.length; i++) {
            tag_name = elements[i].tagName.toLowerCase();
            if (tag_name == "input" || tag_name == "textarea" || tag_name == "select") {
                elements[i].value = new_val;
            } else {
                elements[i].innerHTML = new_val;
            }
        }
    });
    return pubsub;
}
*/

function DataBinder( object_id ) {
  // Use a jQuery object as simple PubSub
  var pubSub = jQuery({});

  // We expect a `data` element specifying the binding
  // in the form: data-bind-<object_id>="<property_name>"
  var data_attr = "bind-" + object_id,
      message = object_id + ":change";

  // Listen to change events on elements with the data-binding attribute and proxy
  // them to the PubSub, so that the change is "broadcasted" to all connected objects
  console.log(data_attr);
  jQuery( document ).on( "change", "[data-" + data_attr + "]", function( evt ) {
    var $input = jQuery( this );

    pubSub.trigger( message, [ $input.data( data_attr ), $input.val() ] );
  });

  // PubSub propagates changes to all bound elements, setting value of
  // input tags or HTML content of other tags
  pubSub.on( message, function( evt, prop_name, new_val ) {
    jQuery( "[data-" + data_attr + "=" + prop_name + "]" ).each( function() {
      var $bound = jQuery( this );

      if ( $bound.is("input, textarea, select") ) {
        $bound.val( new_val );
      } else {
        $bound.html( new_val );
      }
    });
  });

  return pubSub;
}
///// UI SIDE DATA MODEL....
function User(uid) {
    var binder = new DataBinder(uid);
    var user = {
        attributes: {},
        set: function(attr_name, val) {
            console.log("USER SET ____ ");
            console.log(this.attributes);
            this.attributes[attr_name] = val;
            binder.trigger(uid + ":change", [attr_name, val, this]);
        },
        get: function(attr_name) {
            console.log("USER GET ____ " + this.attributes[attr_name]);
            return this.attributes[attr_name];
        },
        _binder: binder
    }
    binder.on(uid + ":change", function(evt, attr_name, new_val, initiator) {
        if (initiator !== user) {
            user.set(attr_name, new_val);
        }
    });
    return user;

}

// javascript
var user = new User(123);
user.set("name", "Wolfgang");
