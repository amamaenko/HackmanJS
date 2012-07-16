/*-------------------  a player entity -------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({

    /* ----- constructor ------ */
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the walking speed, on start player moves to the right        
        this.vel.x=3;
        this.vel.y=0;
        
        // set the gravity to 0
        this.gravity = 0;
        this.collidable = true;
        
        this.addAnimation ("walk", [0,3]);
        this.animationspeed = 3;
        this.setCurrentAnimation("walk");
        
        // adjust the bounding box
        this.updateColRect(1, 30, 1, 30);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },

    /* ----- update the player pos ------ */
    update: function() {
        
        // This variable we might need in the future for restoring direction if after selecting a new one
        // the mainPlayer would hit the wall
        var oldVel = this.vel.clone();
        
        
        if (me.input.isKeyPressed('left')) {
            this.vel.x = -3;
            this.vel.y = 0;            
        }
        if (me.input.isKeyPressed('right')) {
            this.vel.x = 3;
            this.vel.y = 0;            
        }        
        if (me.input.isKeyPressed('down')) {
            this.vel.x = 0;
            this.vel.y = 3;            
        }        
        if (me.input.isKeyPressed('up')) {
            this.vel.x = 0;
            this.vel.y = -3;            
        }
        
        // Try to update player's movement. Then check results, a non-zero res means there is a collision, so 
        // the player should not change direction but rather continue going in the old direction
        var res = this.updateMovement();    
        if (res.x || res.y) {
            this.vel.x = oldVel.x;
            this.vel.y = oldVel.y;
            this.updateMovement();
        }        
        
        // check for collision NOTE MelonJS seems to not process collisions without this line
        me.game.collide(this);       
        
        //always update animation
        this.parent(this);
        return true;
    },   
});
