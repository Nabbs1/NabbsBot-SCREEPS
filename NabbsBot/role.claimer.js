var roleClaimer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const claimerHome = creep.memory.homeRoom
        const targetRoom = creep.memory.targetRoom
        // creep.memory.targetRoom = Game.flags.reserve.pos.roomName;
        if (targetRoom && targetRoom !== creep.room.name) {
         //   creep.travelTo(targetRoom); 
           // var pos = new RoomPosition(<x>, <y>, <roomName>);
         //  const goHereX =  Game.rooms[targetRoom].memory.colonize.posX
        //   const goHereY = Game.rooms[targetRoom].memory.colonize.posY
            const goHere = new RoomPosition(25, 25, targetRoom);
            creep.travelTo(goHere, {useFindRoute: true, ensurePath: true,range: '2' });
           // creep.travelToRoom(targetRoom);
            //  console.log(creep, targetRoom)
             
        } else {
            if (creep.room.controller) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.controller);
                }
                if (creep.claimController(creep.room.controller) == ERR_GCL_NOT_ENOUGH) {
                    if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.controller);
                    }
                }
                if (creep.signController(creep.room.controller, "NabbTech - peace sells, but who's buying") == ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.controller, { visualizePathStyle: { stroke: '#E500FF' } });
                }
                // let roomScore = room.memory.colonizeNext.score;
                if (creep.room.controller.my) {
                    Game.rooms[targetRoom].memory.mode = "Bootup"
                    //Set some flag to boot room.
                    var SpawnLocX = creep.room.memory.colonize.posX
                    var SpawnLocY = creep.room.memory.colonize.posY
                    //Game.rooms[claimerHome].memory.colonizeNext.spawnLoc;
                    creep.room.createFlag(SpawnLocX+3,SpawnLocY , 'Bootup');
                   
                    // if (Game.flags.Bootup && Game.flags.Bootup.pos.roomName == creep.room.name) {

                    // } 
                    let constructionTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (!constructionTargets) {
                       	if (Game.flags.Bootup) {
                            var result = creep.room.createConstructionSite(SpawnLocX,SpawnLocY,STRUCTURE_SPAWN)
                        }
                        console.log('<span style="color: #800080;font-weight: bold;">'+creep + " attempting to build a spawn in room: " + creep.room + " result: " + result)
                    }

                    //'<span style="color: #800080;font-weight: bold;">'
                   // creep.room.createFlag(25, 25, 'Bootup');
                    //Game.rooms[claimerHome].memory.colonizeNext.score = 0;
                    
                    //  console.log("Room is mine"+ Game.rooms[claimerHome].memory.colonizeNext.spawnLoc)
                    //   var constructionTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    //console.log(creep.pos.x)






                }
            }

        }


    }
};
module.exports = roleClaimer;

// if(creep.room.controller) {
//     if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
//         creep.travelTo(creep.room.controller);
//     }
// }

/*

if (Game.flags.claim) {
    creep.memory.targetRoom = Game.flags.claim.pos.roomName;
    if (creep.memory.targetRoom && creep.memory.targetRoom !== creep.room.name) {
        return creep.travelTo(Game.flags.claim);
    } else {
        if (creep.room.controller) {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller);
            }
        }
    }
} else if (Game.flags.reserve) {
    creep.memory.targetRoom = Game.flags.reserve.pos.roomName;
    if (creep.memory.targetRoom && creep.memory.targetRoom !== creep.room.name) {
        return creep.travelTo(Game.flags.reserve);
    } else {
        if (creep.room.controller) {
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller);
            }
            if (creep.signController(creep.room.controller, "Welcome to NabbTech ") == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller, { visualizePathStyle: { stroke: '#E500FF' } });
            }

        }

    }
} else {
 */