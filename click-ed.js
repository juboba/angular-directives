angular.module('click-ed', [])

.directive('clickEdRoot', function() {

    return {
        restrict: 'A',
        controller: function() {
            this.listeners = [];

            this.register = function(el, fn, scope) {
                this.listeners.push({
                    el: el,
                    cb: fn,
                    scope: scope
                });
            };
        },
        link: function(scope, element, attrs, ctrl) {
          element[0].onclick = function(event){

              ctrl.listeners.forEach(function(item) {
                  if (! isInside(event.target, item.el)) {
                    item.cb(item.scope);
                  }
              });

          };

        }
    };

    function isInside(child, parent){
      // If we reach the BODY then `child` is no child of `parent`:
        if(['BODY', 'HTML',].indexOf(angular.element(child).prop('tagName')) !== -1) {
            return false;
          // If we reach the parent, then `child` is child:
        } else if (child === parent) {
            return true;
          // If we haven't reached end cases, continue searching:
        } else {
            return isInside(angular.element(child).parent()[0], parent);
        }
    }

})

.directive('onClickOutside', function($parse) {

    return {
        restrict: 'A',
        require: '^clickEdRoot',
        link: function(scope, el, attrs, $ctrl) {
            var cb = $parse(attrs.onClickOutside);
          var callback = cb(scope);

          // If the function is specified, register
            if(angular.isFunction(callback)) {
                $ctrl.register(el[0], callback, scope);
            } else {
              console.error('click-outside: Argument passed to `clickOutside` must be a reference to a function.');
            }
        }
    };
});

