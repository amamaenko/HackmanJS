/* score HUD Item */
  
var TouchControlDisplay = me.HUD_Item.extend({
    
    init: function(rect, spriteName) {
        // call the parent constructor
        this.parent(rect.left, rect.top);        
        this.sprite = new me.SpriteObject (rect.left, rect.top, me.loader.getImage(spriteName), rect.width, rect.height);
    },
    
    /* ----- draw our score ------ */
    draw: function(context, x, y) {
        this.sprite.draw(context);
    }
});