/*----------------
 a Coin entity
------------------------ */
var DotEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.collidable = true;
        this.parent(x, y, settings); 
        this.type = me.game.COLLECTABLE_OBJECT;

        me.gamestat.updateValue("dotCounter", 1);
        console.log(this.collidable);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)    
    onCollision : function ()
    {
        //decrement the number of dots in the counter
        me.gamestat.updateValue("dotCounter", -1);
        
        // this is a horrible hack.. the game state is controlled within an entity. Yet this is
        // due me not finding any way to control stats on a more general level
        var s = me.gamestat.getItemValue("dotCounter");
        if(s <= 0) {
            //me.state.pause();
            //fade into blackness 1000 ms
            me.game.viewport.fadeIn("#00000", 1000, onComplete = function() { me.state.change(me.state.GAME_END);} );
            //
        }

        // give some score on a HUD
        me.game.HUD.updateItemValue("dotCounterDisplay", 100);

        // make sure it cannot be collected "again"
        this.collidable = false;

        // remove it
        me.game.remove(this);
    }
});