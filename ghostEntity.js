/* --------------------------
an enemy Entity
------------------------ */
var GhostEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);     
        this.gravity = 0;
        this.VEL = 3;	
        
        this.mode = 0; //set behavior mode to default
               
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
        // adjust the bounding box
        this.updateColRect(1, 30, 1, 30);
	
	this.vel.x = this.VEL;
	this.vel.y = 0;
        
        this.addAnimation ("walk", [0,1]);
        this.animationspeed = 3;
        this.setCurrentAnimation("walk");
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        /*if (this.alive && (res.y > 0) && obj.falling) {
            this.flicker(45);
        }*/
    },
 
    // manage the enemy movement
    update: function() {
        //console.log("updating ghost");
        var playerEntity = me.game.getEntityByName('mainPlayer')[0];        
        var playerX = Math.round(playerEntity.pos.x/32);
        var playerY = Math.round(playerEntity.pos.y/32);       
        
	
        var res = {x:1, y:1};
        while(res.x || res.y) 
        {
            // process different bevahior modes
            switch (true) {
                case (this.mode == 0): //default behavior mode is to follow the player
                    //console.log("mode 0");
                    //check if the ghost moved a one full tile and choose new direction by using some algorithm
                    if((Math.abs(Math.round(this.pos.x/32)*32 - this.pos.x) <= 1)&&
                        (Math.abs(Math.round(this.pos.y/32)*32 - this.pos.y) <= 1)) {
                        var recommendedDir = FindPathVec(Math.round(this.pos.x/32), Math.round(this.pos.y/32), playerX, playerY);                        
                        this.vel.x = recommendedDir.x * this.VEL;
                        this.vel.y = recommendedDir.y * this.VEL;
                    }
                    break;
                case (this.mode == 1):
                    //console.log("mode 1");
                    if((Math.abs(Math.round(this.pos.x/32)*32 - this.pos.x) <= 1)&&
                      (Math.abs(Math.round(this.pos.y/32)*32 - this.pos.y) <= 1)) {
                        var recommendedDir = RandomPathVec();
                        this.vel.x = recommendedDir.x * this.VEL;
                        this.vel.y = recommendedDir.y * this.VEL;
                    }
                    break;
            }
            //try and move in the direction of the mainPlayer
            res = this.updateMovement();
            
            // cycle through behavior modes if stuck on an obstacle
            if (res.x || res.y) {
                switch(true) {
                    case (this.mode == 0):
                        this.mode = 1;
                        break;
                    case (this.mode == 1):
                        this.mode = 0;
                        break;    
                }
            }
        }
               
        //always update animation
        this.parent(this);
        return true;
    }
});

function RandomPathVec() {
    var dir = Math.round(3*Math.random());
    var retVal = {x:0,y:0};
    switch (true) {
        case (dir == 0):
            retVal.y = 1;
            break;
        case (dir == 1):
            retVal.x = 1;
            break;
        case (dir == 2):
            retVal.y = -1;
            break;
        case (dir == 3):
            retVal.x = -1;
            break;
    }
    return retVal;
}

function FindPathVec(posX, posY, destX, destY) {
    var dirToDest = {x:destX-posX, y:destY-posY};
    var isHorizontal = Math.abs(dirToDest.x) > Math.abs(dirToDest.y);        
    
    var retVal = {x:0,y:0};
    //console.log(retVal.x + ', ' + retVal.y);
    if (isHorizontal) {
        retVal.y = 0;
        if (dirToDest.x > 0) 
            retVal.x = 1;            
        else 
            retVal.x = -1;
    } else {
        retVal.x = 0;
        if (dirToDest.y > 0)
            retVal.y = 1;
        else
            retVal.y = -1;
    }
    //console.log(retVal.x + ', ' + retVal.y);
    return retVal;
}