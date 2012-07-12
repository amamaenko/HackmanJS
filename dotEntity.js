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
        
        console.log(this.collidable);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)    
    onCollision : function ()
    {
        // give some score
        //me.game.HUD.updateItemValue("score", 250);
        // make sure it cannot be collected "again"       
        this.collidable = false;
        
        // remove it
        me.game.remove(this);
    }
});