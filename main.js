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
    }, {
        name: "32x32_font",
        type: "image",
        src: "data/32x32_font.png"
    }, {
        name: "endGameBackground",
        type: "image",
        src: "data/endGameBackground.png"
    }
];

var jsApp = {
    /* --- Initialize the jsApp --- */
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
    

    // callback when system components and resources are loaded
    loaded: function() {
        // set the "Play/Ingame" Screen Object        
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.GAME_END, new EndGameScreen());

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

        // dot Counter should be created before loading the level, 
        // as it will be updated by each dot construction during level loading
        me.gamestat.add("dotCounter", 0);

        // load a level
        me.levelDirector.loadLevel("level0");

        // add a default HUD to the game mngr
        me.game.addHUD(0, 45, 640, 45);
 
        // add a new HUD item for showing the score        
        me.game.HUD.addItem("dotCounterDisplay", new ScoreKeeper(620, 5));
 
        // make sure everyhting is in the right order
        me.game.sort();
    },
    
    onDestroyEvent: function() {
         // remove the HUD
        me.game.disableHUD();
    }
});

/*---------------------- The end game screen ----------------------*/
var EndGameScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        this.background = null;
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
 
        this.scroller = "A SMALL STEP BY STEP TUTORIAL FOR GAME CREATION WITH MELONJS       ";
        this.scrollerpos = 600;
    },
 
    // reset function
    onResetEvent: function() {
        if (this.background == null) {
            // init stuff if not yet done
            this.background = me.loader.getImage("endGameBackground");
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("left");
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");
 
        }
 
        // reset to default value
        this.scrollerpos = 640;
 
        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
 
        // play something
        //me.audio.play("cling");
 
    },
 
    // some callback for the tween objects
    scrollover: function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },
 
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.background, 0, 0);
 
        this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER); 
        //just in case
        this.scrollertween.stop();
    } 
});

//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});