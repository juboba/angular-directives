# angular-directives
Some Angular directives I use.

## Click Event Dispatcher
Click-ed is a directive that fires a function whenever you click **outside** of the element.

1 minute install:

* Add a root element (usually `body`) with `click-ed-root`.
* Add a listener function in a controller/component/directive/etc
* Add on-click-outside directive to the element with the **reference** to the method.

Your function will be called with the `$scope` as argument.

    Note: If some event stops propagation the event will not fire your method.
    We depend on event propagation (at least till the click-ed-root) to detect where the click was made.

```javascript

angular.module('myApp', ['click-ed'])
.controller('mainController', function() {
    this.some = function(scope) {
        console.log('hello!', scope);
    };

    this.someOther = function(scope) {
        console.log('hello you!', scope);
    };
}); 

```

```html
<body click-ed-root ng-app="myApp">
    <div class="click-one" ng-controller="mainController as vm">
        <div>
            <div>
                <div>
                    <div class="click-one" on-click-outside="vm.some">
                        Hello
                        <div>
                            <div>hey!</div>
                            <div class="click-one" on-click-outside="vm.someOther">
                                Hello
                                <div>
                                    <div>hey!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
```
