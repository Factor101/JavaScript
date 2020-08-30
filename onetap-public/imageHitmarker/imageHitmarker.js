/**
*@author Factor#1337
*/
const toShow = [];
const aspRatio = Render.GetScreenSize()[0] / Render.GetScreenSize()[1];

const ui = [
    UI.AddDropdown("Indicator Mode", ["Crosshair", "World"]),
    UI.AddTextbox("Image File Name"),
    UI.AddSliderInt('Indicator Size', 1, 1000),
    UI.AddSliderInt('Indicator Time (ms)', 0, 10000)
];

const main = function() {
    /**
     * @description Draws our indicators.
     * @returns {void(null)}
     */
    try {
        const img = Render.AddTexture('ot/scripts/' + UI.GetString("Script items", 'Image File Name'));
        if( img == void(null) || UI.GetString("Script items", 'Image File Name').length < 1 ) throw new Error('Image was not found.');
    } catch(e) {
        return Cheat.Print('[] Script Error: ' + e + '\n');
    }
    if( toShow[0] == void(null) ) return;

    for(var i in toShow) 
    {
        Render.TexturedRect(toShow[i].x, (function() {
            /**
             * @description anonymous function to offset y coordinate
             * @returns {float}
             */
            return UI.GetValue("Script items", "Indicator Mode") === 1 ? toShow[i].y - 150 : toShow[i].y;
        })(), toShow[i].width, toShow[i].height, img);
        toShow[i].y++;
        if( toShow[i].calledAt + UI.GetValue("Script items", "Indicator Time (ms)") / 1000 <= Globals.Curtime() ) {
            toShow.splice(i);
        }
    }
};

const hurt = function() {
    /**
     * @description Listens for when a player is hurt, and then creates an instance of a shot, which is pushed into toShow
     * @event {player_hurt}
     * @return {void(null)}
     */
    var receiver = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    if( !Entity.IsValid(receiver) || !Entity.IsEnemy(receiver) ) { 
        return null; 
    }
    toShow.push(  UI.GetValue("Script items", "Indicator Mode") === 1 ? new shot(Entity.GetRenderOrigin(receiver)) : {
        x: Render.GetScreenSize()[0] / 2,
        y: Render.GetScreenSize()[1] / 2,
        width: UI.GetValue("Script items", "Indicator Size"),
        height: UI.GetValue("Script items", "Indicator Size"),
        calledAt: Globals.Curtime()
     });
};

const shot = function(pos) {
    /**
     * @description shot class for logging shots.
     * 
     * @constructor
     * @param {float[]} pos - 3 Dimensional vector of origin position.
     * 
     * @property {float} x - 2D X coordinate
     * @property {float} y - 2D y coordinate
     * @property {int} width - Width of image
     * @property {int} height - height of image
     * @property {float} calledAt - time of birth
     */
    var d2 = Render.WorldToScreen(pos);
    this.x = d2[0];
    this.y = d2[1];
    this.width = UI.GetValue("Script items", "Indicator Size");
    this.height = UI.GetValue("Script items", "Indicator Size");
    this.calledAt = Globals.Curtime();
};

const reset = function() {
    /**
     * @description resets our shot log 
     * @return {void(null)}
     */
    toShow = [];
};

(function() 
{
    /**
     * @description anonymous function to setup callbacks
     * @return {void(null)}
     */
    Cheat.RegisterCallback("Draw", "main");
    Cheat.RegisterCallback("player_hurt", "hurt");
    Cheat.RegisterCallback("round_start", "reset");
}
)();
