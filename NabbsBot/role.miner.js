var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {


        if (creep.pos.x * creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
            creep.travelTo(new RoomPosition(25, 25, creep.memory.targetRoom));
        }
         const targetRoom = creep.memory.targetRoom
        if (targetRoom && targetRoom !== creep.room.name) {
            const goHere = new RoomPosition(25, 25, targetRoom);
            creep.travelTo(goHere, { useFindRoute: true, ensurePath: true, range: '2' });
            //creep.travelToRoom(targetRoom);

         //   console.log(creep,creep.room, targetRoom)
        } else {


            //creep.travelTo(Game.flags.Flag1)
            let storedSource = Game.getObjectById(creep.memory.source);
            if (storedSource.energy == 0) {

                // take a break while source rebuilds
                creep.say('🚬 ' + storedSource.ticksToRegeneration)
            }
            if (creep.pos.isNearTo(storedSource)) {
                creep.harvest(storedSource)
                if (!creep.memory.onContainer) {
                    var closeContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER);// && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                        }
                    });
                    if (closeContainer) {
                        if (creep.pos.getRangeTo(closeContainer) < 3) {
                            creep.travelTo(closeContainer)
                        }
                        if (creep.pos.getRangeTo(closeContainer) == 0) {
                            creep.memory.onContainer = true;
                            creep.memory.containerBuilt = true;
                        }
                    } else {
                   
                        if (!creep.memory.containerBuilt) {
                            creep.say('container?')
                            //console.log(creep.pos.x)
                            var result = creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER)
                            //    Game.room.createConstructionSite(SpawnLoc, STRUCTURE_SPAWN)
                            creep.memory.containerBuilt = true
                            console.log(creep + " attempting to build a container in room: " + creep.room + " result: " + result)
                            //     /// possible add create construction sigte here
                        }
    
                    }
                }

            } else {
                creep.travelTo(storedSource, { visualizePathStyle: { stroke: '#FF0000', lineStyle: 'dotted', opacity: .9 } });
            }
        }

    }
};
module.exports = roleMiner;






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////if (Game.time % 15 == 0) {



// var roleEnergyMiner = {

//     /** @param {Creep} creep **/
//     run: function (creep) {

//         if (creep.memory.targetRoom && creep.memory.targetRoom !== creep.room.name) {
//             return creep.travelTo(new RoomPosition(25, 25, creep.memory.targetRoom));
//         } else {
//             // is in proper room run below

//             //get stored source from memory
//             let storedSource = Game.getObjectById(creep.memory.source);
//             if (storedSource.energy == 0) {
//                 // insert repair code here? but would need to put this in a better spot after container range find and what not
//                 // take a break while source rebuilds
//                 creep.say('🚬 ' + storedSource.ticksToRegeneration)
//             }
//             // if(creep.harvestEnergy() == false) { creep.say('🚬💤')  }

//             if (storedSource) {
//                 //console.log(creep.name,storedSource )
//                 if (creep.pos.isNearTo(storedSource)) {
//                     creep.harvest(storedSource)

//                 } else {
//                     creep.travelTo(storedSource, { visualizePathStyle: { stroke: '#FF0000', lineStyle: 'dotted', opacity: .9 } });
//                 }

//                 if (!creep.memory.onContainer) {
//                     var closeContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
//                         filter: (structure) => {
//                             return (structure.structureType == STRUCTURE_CONTAINER);// && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
//                         }
//                     });
//                     if (creep.pos.getRangeTo(closeContainer) < 2) {
//                         creep.travelTo(closeContainer, { visualizePathStyle: { stroke: '#FF0000', lineStyle: 'dotted', opacity: .9 } });
//                     }
//                     if (creep.pos.getRangeTo(closeContainer) == 0) {
//                         creep.memory.onContainer = true;
//                     }
//                 }



//             } else {
//                 // else find a source
//                 creep.harvestEnergy();
//             }
//         }
//     },



// };

// module.exports = roleEnergyMiner;



