/*
 * Github repository: 
 * https://github.com/Zhouzi/TheaterJS
 * 
 * Github page:
 * http://gabinaureche.com/TheaterJS
 *
 */

/*---------------------------------------*\
  The sources hosted on Github seems to be unstable.
  This is why the minified version is embedded here.
  Please scroll down to get to the demo code.
\*---------------------------------------*/

!function(e,t){function n(e){var t=this,n={autoplay:!0,erase:!0};t.events={},t.scene=-1,t.scenario=[],t.options=t.utils.merge(n,e||{}),t.casting={},t.current={},t.state="ready"}var r={q:[0,0],w:[0,1],e:[0,2],r:[0,3],t:[0,4],y:[0,5],u:[0,6],i:[0,7],o:[0,8],p:[0,9],a:[1,0],s:[1,1],d:[1,2],f:[1,3],g:[1,4],h:[1,5],j:[1,6],k:[1,7],l:[1,8],z:[2,0],x:[2,1],c:[2,2],v:[2,3],b:[2,4],n:[2,5],m:[2,6]},a={a:[0,0],z:[0,1],e:[0,2],r:[0,3],t:[0,4],y:[0,5],u:[0,6],i:[0,7],o:[0,8],p:[0,9],q:[1,0],s:[1,1],d:[1,2],f:[1,3],g:[1,4],h:[1,5],j:[1,6],k:[1,7],l:[1,8],m:[1,9],w:[2,0],x:[2,1],c:[2,2],v:[2,3],b:[2,4],n:[2,5]},i=(window.navigator.languages||window.navigator.language||window.navigator.userLanguage)[0],s=i.indexOf("fr")>-1?a:r;n.prototype={constructor:n,set:function(e,t){var n=this;switch(n.current.model=e,n.current.type){case"function":n.current.voice.apply(n,t);break;default:n.current.voice.innerHTML=e}return n},getSayingSpeed:function(e,t){"number"!=typeof e&&(t=e,e=0);var n=this,r=n.current.experience+e,a=t?r:n.utils.randomFloat(r,1);return n.utils.getPercentageBetween(1e3,50,a)},getInvincibility:function(){var e=this;return 10*e.current.experience},isMistaking:function(){var e=this;return e.current.experience<e.utils.randomFloat(0,1.4)},utils:{merge:function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},getPercentageBetween:function(e,t,n){return e-e*n+t*n},randomCharNear:function(e){var t=this,n=1,r=[],a=!!e.match(/[A-Z]/);e=e.toLowerCase();var i,o,c=s[e]||[];for(i in s)s.hasOwnProperty(i)&&i!==e&&(o=s[i],Math.abs(c[0]-o[0])<=n&&Math.abs(c[1]-o[1])<=n&&r.push(i));var u=r.length>0?r[t.randomNumber(0,r.length-1)]:t.randomChar();return a?u.toUpperCase():u},randomChar:function(){var e=this,t="abcdefghijklmnopqrstuvwxyz";return t.charAt(e.randomNumber(0,t.length-1))},randomNumber:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},randomFloat:function(e,t){return Math.round(10*(Math.random()*(t-e)+e))/10},hasClass:function(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=" "+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}},train:function(e){var t=this,n={experience:.6,voice:function(e){console.log(e)},type:"function",model:""};return t.utils.merge(n,e)},describe:function(e,n,r){if("string"!=typeof e)throw"actor's name has wrong type: "+typeof e;var a=this,i={name:e};return void 0!==n&&(i.experience=n),void 0!==r&&(i.type="function"==typeof r?"function":"DOM",i.voice="DOM"===i.type&&"string"==typeof r?t.querySelector(r):r),a.casting[e]=a.train(i),a},write:function(){for(var e,t=this,n=Array.prototype.splice.apply(arguments,[0]),r=0,a=n.length;a>r;r++)if(e=n[r],"string"==typeof e){var i=e.split(":"),s=i.length>1,o=s?i[0].trim():null,c=s?i[1]:i[0];s&&t.write({name:"actor",args:[o]}),t.options.erase&&s&&t.write({name:"erase"}),t.write({name:"say",args:[c,!s]})}else"number"==typeof e?t.write(0>e?{name:"erase",args:[e]}:{name:"wait",args:[e]}):"function"==typeof e?t.write({name:"call",args:[e]}):e instanceof Object&&t.scenario.push(e);return t.options.autoplay&&t.play(),t},play:function(e){var t=this;return e===!0&&(t.scene=-1),"ready"===t.state&&t.next(),t},on:function(e,t){var n=this;e=e.split(",");for(var r,a=0,i=e.length;i>a;a++)r=e[a]=e[a].trim(),(n.events[r]||(n.events[r]=[])).push(t);return n},emit:function(e,t,n){if("string"!=typeof e)throw"emit: scope missing";"string"!=typeof t?t=void 0:void 0!==t&&void 0===n&&(n=t);var r=this,a=e+(t?":"+t:"");return r.trigger(a,n).trigger("*",[a].concat(n)),r},trigger:function(e,t){var n=this,r=n.events[e]||[];t instanceof Array||(t=[t]);for(var a=0,i=r.length;i>a;a++)r[a].apply(n,[e].concat(t));return n},call:function(e,t){var n=this;return e.apply(n),t?n:n.next()},next:function(){var e=this,t=e.scenario[e.scene];if(t&&e.emit(t.name,"end",[t.name].concat(t.args)),e.scene+1>=e.scenario.length)e.state="ready";else{e.state="playing";var n=e.scenario[++e.scene];e.emit(n.name,"start",[n.name].concat(n.args)),e[n.name].apply(e,n.args)}return e},actor:function(e){var t=this;return t.current=t.casting[e],t.next()},say:function(e,t){var n,r,a=this,i=!1,s=a.getInvincibility();t?(r=a.current.model,n=a.current.model.length-1,e=r+e):(r=a.current.model="",n=-1);var o=setTimeout(function c(){var t,u,l=r.charAt(n);i?(s=a.getInvincibility(),i=!1,t=null,u=r=r.substr(0,n),n--):(n++,t=e.charAt(n),--s<0&&(l!==t||a.current.experience<.3)&&a.isMistaking()&&(t=a.utils.randomCharNear(t)),t!==e.charAt(n)&&(i=!0),u=r+=t),a.set(u,[u,t,l,e]),i||n<e.length?o=setTimeout(c,a.getSayingSpeed()):a.next()},a.getSayingSpeed());return a},erase:function(e){var t=this,n="string"==typeof t.current.model?t.current.model.length:-1,r="number"==typeof e&&0>e?n+1+e:0;if(0>n)return t.next();setTimeout(function a(){var e=t.current.model.charAt(n),i=t.current.model.substr(0,--n);t.set(i,[i,null,e,i]),n>=r?setTimeout(a,t.getSayingSpeed(.2,!0)):t.next()},t.getSayingSpeed(.2,!0));return t},wait:function(e){var t=this;return setTimeout(function(){t.next()},e),t}},e.TheaterJS=n}(window,document);





/*---------------------------------------*\
  Demo code below.
\*---------------------------------------*/

// Scenario code is displayed within #log.
var $log = document.querySelector("#log");

// Create a new instance of TheaterJS with defaults options.
var theater = new TheaterJS();



// First, describe actors by passing a name, 
// an experience and finally a selector string.
theater
  .describe("Vader", .8, "#vader")
  .describe("Luke", .6, "#luke");



// TheaterJS has a built-in event handler.
// Here we use it to for 2 things:
// 1 - Listen to all events (*) and log the code running (scenes).
// 2 - Add a caret to the proper element when adequate.
theater
  .on("*", function (eventName, originalEvent, sceneName, arg) {
    var args  = Array.prototype.splice.apply(arguments, [3]),
        log   = '{\n      name: "' + sceneName + '"';

    if (args.length > 0) log += ",\n      args: " + JSON.stringify(args).split(",").join(", ");
    log += "\n    }";

    $log.innerHTML = log;
  })
  .on("say:start, erase:start", function (eventName) {
    // this refer to the TheaterJS instance.
    var self    = this,
        
        // The current actor is referenced as this.current
        // Its voice is the third element passed to the describe method.
        // It could be of two types: a DOM element or a function.
        current = self.current.voice;

    // TheaterJS has some useful methods such as
    // addClass, hasClass, removeClass, ...
    // Note: the "saying" class adds the blinking caret.
    self.utils.addClass(current, "saying");
  })
  .on("say:end, erase:end", function (eventName) {
    var self    = this,
        current = self.current.voice;

    // When say or erase ends, remove the caret.
    self.utils.removeClass(current, "saying");
  });



// The write method adds scenes to the theater's scenario.
// It accepts an indefinite number of parameters and is chainable.
// theater.write("I:Hello", 400).write("You:Wassup?", 400);
// Is the same as:
// theater.write("I:Hello", 400, "Your:Wassup?", 400);
theater

  // "Vader:Luke" adds 2 scenes:
  // 1 - Update current actor.
  // 2 - Add a "say" scene with the speech (Luke in this example).
  .write("Vader:Luke.")

  // When passing a positive int to the write method,
  // it adds a "wait" scene.
  // A break lasting for the amout of the passed argument (ms).
  .write(400)

  // A function is added as a "call" scene.
  // It simply call the passed function by setting 
  // the context to the TheaterJS instance.
  // In this case, the toggleClass is simply toggling body's class.
  // Luke has a white background while Vader has a darker one.
  .write(toggleClass)

  .write("Luke:What?", toggleClass)
  .write("Vader:I am your father.", toggleClass)

  // Previous arguments are just shorthands that build the proper scene object.
  // However, you can pass a scene object with more complex args.
  .write({ name: "call", args: [kill, true] })

  .write("Luke:Nooo...")

  // A negative int creates an "erase" scene that removes x characters.
  .write(-3)

  .write("!!! ", 400, "No! ", 400)
  .write("Luke:That's not true!", 400)
  .write("Luke:That's impossible!", toggleClass)
  .write("Vader:Search your feelings.", 1600)
  .write("Vader:You know it to be true.", 1000, toggleClass)

  // Passing the actor's name in the string update the current actor.
  // It also erase the previous speech to show the new one.
  // If you want to append a value rather than replacing it, simply omit the actor's name.
  // e.g.: theater.write("Luke:Noooooooo! ", "No!");
  .write("Luke:Noooooooo! ", 400, "No!", toggleClass)
  .write("Vader:Luke.", 800)
  .write("Vader:You can destroy the Emperor.", 1600)
  .write("Vader:He has foreseen this. ", 800)
  .write("Vader:It is your destiny.", 1600)
  .write("Vader:Join me.", 800)
  .write("Vader:Together we can rule the galaxy.", 800)
  .write("Vader:As father and son.", 1600)
  .write("Vader:Come with me. ", 800)
  .write("Vader:It is the only way.", 2000)

  // This last statement makes the scenario loop.
  // The true argument means "restart from scratch".
  .write(function () { theater.play(true); });



// Code below is used for the purpose of the demo.
var body = document.getElementsByTagName("BODY")[0];

function toggleClass (className) {
  if (typeof className !== "string") className = "light";

  if (theater.utils.hasClass(body, className)) theater.utils.removeClass(body, className);
  else theater.utils.addClass(body, className);
}

function kill () {
  var self    = this,
      delay   = 300,
      i       = 0,
      timeout = setTimeout(function blink () {
        toggleClass("blood");
        if (++i < 6) timeout = setTimeout(blink, delay);
        else self.next();
      }, delay);

  return self;
}