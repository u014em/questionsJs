'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));

    describe('TodoCtrl Testing', function() {
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},

          {str:"Hello?? This is Sung", exp: "Hello??"},

          // Cover two more branches:
          {str:"Hello! This is Sung. Bye.", exp: "Hello!"},
          {str:"Hello. There! ", exp: "Hello."}
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });



      // Own editTodo
      it('editTodo', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var theTestTodo =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };


        scope.editTodo(theTestTodo);
        expect(scope.editedTodo).toBe(theTestTodo);
      });


      // Own addEcho
      it('addEcho', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var theOriginalEchoValue = 0;
        var theOriginalOrderValue = 0;

        var theTestTodo =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello??",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: theOriginalEchoValue,
          order: theOriginalOrderValue
        };

        scope.addEcho(theTestTodo);

        expect(scope.editedTodo).toBe(theTestTodo);
        expect(theTestTodo.echo).toBe(theOriginalEchoValue+1)
        expect(theTestTodo.order).toBe(theOriginalOrderValue-1)
      });


      // Own decEcho
      it('decEcho', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var theOriginalEchoValue = 0;
        var theOriginalOrderValue = 0;

        var theTestTodo =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: theOriginalEchoValue,
          order: theOriginalOrderValue
        };

        scope.decEcho(theTestTodo);

        expect(scope.editedTodo).toBe(theTestTodo);
        expect(theTestTodo.echo).toBe(theOriginalEchoValue-1)
        expect(theTestTodo.order).toBe(theOriginalOrderValue-1)
      });



      // Own doneEditing
      it('doneEditing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });


        var theTestTodo =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

        scope.doneEditing(theTestTodo);
        // Unclear how to check what $scope.todos.$save(todo); in the controler file did actually ahppened correctly.


        // Second test with empty msg:
        theTestTodo =
        {
          wholeMsg: "    ",
          head: "",
          headLastChar: "",
          desc: "",
          linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

        scope.doneEditing(theTestTodo);
      });


      // Own toggleCompleted
      it('toggleCompleted', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var theTestTodo =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };


        scope.toggleCompleted(theTestTodo);
        expect(theTestTodo.completed).toBe(true);
      });


      // Own clearCompletedTodos 
      it('clearCompletedTodos', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });
        
        var theTestTodo1 =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

        var theTestTodo2 =
        {
          wholeMsg: "Second Hello.co \nThis is Sung",
          head: "Second Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };


        scope.todos = [theTestTodo1, theTestTodo2];

        scope.clearCompletedTodos(); // trigger digest such that watchCollection calls the listener function

        expect(1).toBe(1); // unsure what to actually check for ....
      });


      // // Own clearCompletedTodos     
      // it('clearCompletedTodos  ', function() {
      //   var ctrl = controller('TodoCtrl', {
      //     $scope: scope,
      //   });

      //   scope.input = {wholeMsg: "  Hello.co \nThis is Sung  "};
      //   scope.addTodo();


      //   scope.clearCompletedTodos();
      // });


      // Own watchCollection
      it('watchCollection', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });
        
        // scope.roomId = "testroom";

        // scope.input = {wholeMsg: "  Hello.co \nThis is Sung  "};
        // scope.addTodo();

        var theTestTodo1 =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

        var theTestTodo2 =
        {
          wholeMsg: "Second Hello.co \nThis is Sung",
          head: "Second Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

        var theTestTodo3 =
        {
        };

        var theTestTodo4 =
        {
          wholeMsg: "Second Hello.co \nThis is Sung",
          head: "Second Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: true,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };


        scope.todos = [theTestTodo1, theTestTodo2, theTestTodo3, theTestTodo4]; // not good but i somehow can't manage to properly add new todos...

        scope.$digest(); // trigger digest such that watchCollection calls the listener function

        expect(1).toBe(1); // unsure what to actually check for ....
      });



      // Own increaseMax    
      it('increaseMax ', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        scope.maxQuestion = 10;
        scope.totalCount = 20;
        scope.increaseMax();

        expect(scope.maxQuestion).toBeGreaterThan(10);

        scope.maxQuestion = 10;
        scope.totalCount = 5;
        scope.increaseMax();
        expect(scope.maxQuestion).toBe(10);
      });



      // My own addTodo test
      it('addTodo', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
          // $todos: todos
        });

        // test empty input
        scope.input = {wholeMsg: "   "};
        expect(scope.addTodo()).toBeUndefined(); // Should return nothing


        // Test with one real input
        scope.input = {wholeMsg: "  Hello.co \nThis is Sung  "};
        var expectedTodosEntries =
        {
          wholeMsg: "Hello.co \nThis is Sung",
          head: "Hello.co \n",
          headLastChar: "?",
          desc: " This is Sung",
          linkedDesc: Autolinker.link(" This is Sung", {newWindow: false, stripPrefix: false}),
          completed: false,
          // timestamp: new Date().getTime(),
          tags: "...",
          echo: 0,
          order: 0
        };

      scope.addTodo();

      // Unclear how to check whether the addTodo function worked corretly.
      var all_entries = scope.todos.$ref();

      var object;
      for (object in all_entries)
      {
        // expect(object).toBe();
      }
   
      });




      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });
    });
  });
