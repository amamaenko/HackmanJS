//game resources
var g_resources = [ // our level
    {
        name: "brick",
        type: "image",
        src: "data/brick.png"
    },
    {
        name: "level0",
        type: "tmx",
        src: "data/level0.tmx"
    },  {
        name: "pacman",
        type: "image",
        src: "data/hackman.png"
    },   {
        name: "ghost",
        type: "image",
        src: "data/ghost.png"
    }, {
        name: "dot",
        type: "image",
        src: "data/dot.png"
    }, 
];

var jsApp = {
    /* ---

     Initialize the jsApp

     --- */
    onload: function() {

        // init the video
        if (!me.video.init('jsapp', 672, 704, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "audio"
        me.audio.init("mp3,ogg");

        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all resources to be loaded
        me.loader.preload(g_resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },

    /* ---

     callback when everything is loaded

     --- */
    loaded: function() {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("ghost", GhostEntity);
        me.entityPool.add("dotEntity", DotEntity);
                
        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,	"left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");        
         
        //me.debug.renderHitBox = true;
         
        // start the game 
        me.state.change(me.state.PLAY);
    }

};

// jsApp
/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

    onResetEvent: function() {
        // stuff to reset on state change
        // load a level
        me.levelDirector.loadLevel("level0");
    },

    /* ---

    action to perform when game is finished (state change)

    --- */
    onDestroyEvent: function() {
    }
});

//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});