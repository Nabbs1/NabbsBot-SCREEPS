

//var showVisuals = false;

function layout(room) {
console.log("Building in: "+room)
    let spawns = room.find(FIND_MY_SPAWNS)
    let RoomLevel = room.controller.level;
    // console.log(RoomLevel + ' TEST LEVEL from Layout.js')
    //  console.log("Room is mine"+ Game.rooms[claimerHome].memory.colonizeNext.spawnLoc)
    //  let SpawnLoc = Game.rooms[claimerHome].memory.colonizeNext.spawnLoc;
    //  Game.room.createConstructionSite(SpawnLoc, STRUCTURE_SPAWN)
    //   room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
    if (room.memory.colonize && !spawns) {
        room.createConstructionSite(room.memory.colonize.posX, room.memory.colonize.posY, STRUCTURE_SPAWN)

    }
    // console.log(  room.memory.colonize.posX ,room.memory.colonize.posY)

    if (RoomLevel == 2 && spawns.length > 0) {
        //bottom right			
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        // BotRight Road square first set of extensions
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y + 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y + 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y + 3, STRUCTURE_ROAD)


    }
    if (RoomLevel == 3) {
        //tower
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y, STRUCTURE_TOWER)
        ///bottom left
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        // BotLeft Road square 
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y + 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y + 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y + 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y + 1, STRUCTURE_ROAD)
    }
    if (RoomLevel == 4) {

        //top right			
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)

        ///top left
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)



        //Room Storage
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 4, STRUCTURE_STORAGE)

        //Road Layout
        // center road square spawn RCL 2 prob
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 1, STRUCTURE_ROAD)




        // TopRight road square
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y - 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 1, STRUCTURE_ROAD)


        // Top left road square
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y - 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 3, STRUCTURE_ROAD)


        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y, STRUCTURE_ROAD)

        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 1, STRUCTURE_ROAD)

    }
    //RCL5
    if (RoomLevel == 5) {
        //extension
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y, STRUCTURE_EXTENSION)




        //TOWER
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y, STRUCTURE_TOWER)
    }
    //RCL6
    if (RoomLevel == 6) {

        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y + 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y + 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y - 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y + 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y + 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y - 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y + 3, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y + 2, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 4, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 6, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y + 5, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y + 5, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 5, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 6, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 6, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 5, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 5, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 6, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 7, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x + 7, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x - 7, spawns[0].pos.y, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 7, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 1, STRUCTURE_ROAD)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 3, STRUCTURE_ROAD)

        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y - 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 6, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 6, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y - 5, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 5, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 2, spawns[0].pos.y - 6, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 1, spawns[0].pos.y - 6, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 1, spawns[0].pos.y - 6, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 6, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 2, spawns[0].pos.y - 5, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y - 5, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y - 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 6, spawns[0].pos.y - 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 6, spawns[0].pos.y - 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 6, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y + 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y + 4, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 6, spawns[0].pos.y + 1, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y + 2, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y + 3, STRUCTURE_EXTENSION)
        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y + 4, STRUCTURE_EXTENSION)


        room.createConstructionSite(spawns[0].pos.x + 3, spawns[0].pos.y, STRUCTURE_TOWER)
        room.createConstructionSite(spawns[0].pos.x - 3, spawns[0].pos.y, STRUCTURE_TOWER)
        room.createConstructionSite(spawns[0].pos.x + 4, spawns[0].pos.y + 4, STRUCTURE_TOWER)
        room.createConstructionSite(spawns[0].pos.x + 5, spawns[0].pos.y + 3, STRUCTURE_TOWER)
        room.createConstructionSite(spawns[0].pos.x - 4, spawns[0].pos.y + 4, STRUCTURE_TOWER)
        room.createConstructionSite(spawns[0].pos.x - 5, spawns[0].pos.y + 3, STRUCTURE_TOWER)

        room.createConstructionSite(spawns[0].pos.x, spawns[0].pos.y + 4, STRUCTURE_STORAGE)


    }
    //RCL7
    if (RoomLevel > 6) {

    }
    //RCL8
    if (RoomLevel > 7) {

    }


}

module.exports = layout;




//////////////////////////////////////




			//console.log(spawns[0].pos.x - 3)
			//	createConstructionSite(10, 15, STRUCTURE_ROAD);

			//room.visual.circle(values.x, values.y, { radius: '.5', fill: 'red', opacity: 0.5 })

			//	room.visual.structure(16, 18, STRUCTURE_STORAGE, { opacity: 0.2 })

			//room.visual.structure(spawns[0].pos.x, spawns[0].pos.y -2 , STRUCTURE_TOWER, { opacity: 0.2 })
//  ROOM PLANNER TEST
		///bottom left
// room.visual.structure(spawns[0].pos.x - 2, spawns[0].pos.y + 1, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 2, spawns[0].pos.y + 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 2, spawns[0].pos.y + 3, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 1, spawns[0].pos.y + 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 3, spawns[0].pos.y + 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// //bottom right			
// room.visual.structure(spawns[0].pos.x + 2, spawns[0].pos.y + 1, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 2, spawns[0].pos.y + 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 2, spawns[0].pos.y + 3, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 1, spawns[0].pos.y + 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 3, spawns[0].pos.y + 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// //top right			
// room.visual.structure(spawns[0].pos.x + 2, spawns[0].pos.y - 1, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 2, spawns[0].pos.y - 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 2, spawns[0].pos.y - 3, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 1, spawns[0].pos.y - 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x + 3, spawns[0].pos.y - 2, STRUCTURE_EXTENSION, { opacity: 0.5 })

// ///top left
// room.visual.structure(spawns[0].pos.x - 2, spawns[0].pos.y - 1, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 2, spawns[0].pos.y - 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 2, spawns[0].pos.y - 3, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 1, spawns[0].pos.y - 2, STRUCTURE_EXTENSION, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 3, spawns[0].pos.y - 2, STRUCTURE_EXTENSION, { opacity: 0.5 })

// //tower
// room.visual.structure(spawns[0].pos.x + 3, spawns[0].pos.y, STRUCTURE_TOWER, { opacity: 0.5 })

// //Room Storage
// room.visual.structure(spawns[0].pos.x, spawns[0].pos.y + 4, STRUCTURE_STORAGE, { opacity: 0.5 })

// //Road Layout
// // center road square spawn RCL 2 prob
// room.visual.structure(spawns[0].pos.x, spawns[0].pos.y-2, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+1, spawns[0].pos.y-1, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+2, spawns[0].pos.y, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+1, spawns[0].pos.y+1, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x, spawns[0].pos.y+2, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-1, spawns[0].pos.y+1, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-2, spawns[0].pos.y, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-1, spawns[0].pos.y-1, STRUCTURE_ROAD, { opacity: 0.5 })

// // BotRight Road square first set of extensions
// room.visual.structure(spawns[0].pos.x+3, spawns[0].pos.y+1, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+4, spawns[0].pos.y+2, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+3, spawns[0].pos.y+3, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+2, spawns[0].pos.y+4, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+1, spawns[0].pos.y+3, STRUCTURE_ROAD, { opacity: 0.5 })

// // BotLeft Road square 
// room.visual.structure(spawns[0].pos.x-1, spawns[0].pos.y+3, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-2, spawns[0].pos.y+4, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-3, spawns[0].pos.y+3, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-4, spawns[0].pos.y+2, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-3, spawns[0].pos.y+1, STRUCTURE_ROAD, { opacity: 0.5 })

// // TopRight road square
// room.visual.structure(spawns[0].pos.x+1, spawns[0].pos.y-3, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+2, spawns[0].pos.y-4, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+3,  spawns[0].pos.y-3, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+4, spawns[0].pos.y-2, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x+3, spawns[0].pos.y-1, STRUCTURE_ROAD, { opacity: 0.5 })


// // Top left road square
// room.visual.structure(spawns[0].pos.x-3, spawns[0].pos.y-1, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-4, spawns[0].pos.y-2, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-3,  spawns[0].pos.y-3, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x-2,  spawns[0].pos.y-4, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 1, spawns[0].pos.y - 3, STRUCTURE_ROAD, { opacity: 0.5 })


// room.visual.structure(spawns[0].pos.x +4, spawns[0].pos.y, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x - 4, spawns[0].pos.y, STRUCTURE_ROAD, { opacity: 0.5 })

// room.visual.structure(spawns[0].pos.x, spawns[0].pos.y-1, STRUCTURE_ROAD, { opacity: 0.5 })
// room.visual.structure(spawns[0].pos.x,  spawns[0].pos.y+1, STRUCTURE_ROAD, { opacity: 0.5 })




















