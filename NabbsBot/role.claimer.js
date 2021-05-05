var roleClaimer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var claimerHome = creep.memory.homeRoom
        var targetRoom = creep.memory.targetRoom
        // creep.memory.targetRoom = Game.flags.reserve.pos.roomName;
        if (targetRoom && creep.memory.targetRoom !== creep.room.name) {
            creep.travelTo(targetRoom);
     
     
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

                    //Set some flag to boot room.
                    const SpawnLoc = Game.rooms[claimerHome].memory.colonizeNext.spawnLoc;
                    // Game.room.createFlag(SpawnLoc, 'Bootup');

                    // if (Game.flags.Bootup && Game.flags.Bootup.pos.roomName == creep.room.name) {

                    // } 
                    var constructionTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (!constructionTargets) {
                        if (SpawnLoc && Game.rooms[targetRoom].memory.mode != "Bootup") {
                            var result = creep.room.createConstructionSite(SpawnLoc, STRUCTURE_SPAWN)
                        }
                        console.log(creep + " attempting to build a spawn in room: " + creep.room + " result: " + result)
                    }
                    creep.room.createFlag(25, 25, 'Bootup');
                    //Game.rooms[claimerHome].memory.colonizeNext.score = 0;
                    Game.rooms[targetRoom].memory.mode = "Bootup"
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