let mapLib = require("mapLib");
var roleScout = {
    /** @param {Creep} creep **/
    run: function (creep) {
        const startCpu = Game.cpu.getUsed();
        // creep.suicide()
        const scoutHome = creep.memory.homeRoom
        const creepRoom = creep.room;
        let room_dest;

        // this saves current scout room location so I can display in homeroom if desired
        Game.rooms[scoutHome].memory.scoutRoom = creepRoom;

        if (creep.memory.room_dest !== undefined) {
            room_dest = creep.memory.room_dest;
        } else {
           room_dest = mapLib.getNextRoom(creep);
            // console.log(creep.memory.room_dest)
            creep.memory.room_dest = room_dest;
            console.log("scout has no destination - grabbing new next room from MapLib");
        }
        
        if (creep.memory.room_dest !== undefined && creep.room.name !== room_dest) {
            creep.moveTo(new RoomPosition(25, 25, room_dest));
        } else {
            ///we are in the room_dest Room do stuff
            if (room.controller !== null) {
                if (!room.controller.my) {
                    // Room controller is not mine so Identify it
                    // identifyController(room)    //not needed
                    if (!room.memory.colonize) {
                        // nothing saved in room.memory.colonize so run this stuff
                        room.memory.colonize = {};
                        let sources = creep.room.find(FIND_SOURCES);
                        let terrain = Game.map.getRoomTerrain(creep.memory.room_dest);
                        let sourceAmount = sources.length;
                        var sourceAccessPoints = 0;
                        for (let source in sources) {
                            let posX = sources[source].pos.x;
                            let posY = sources[source].pos.y;
            
                            for (let i = posX - 1; i <= posX + 1; i++) {
                                for (let j = posY - 1; j <= posY + 1; j++) {
                                    if (terrain.get(i, j) === 0) {
                                        sourceAccessPoints++;
                                    }
                                }
                            }
                        }


                        var Spawnvalues = distanceTransform(creep.room.name);
                        //var roomDistance = Game.map.getRoomLinearDistance(scoutHome, creep.room.name);
                        var roomDistancePath = Game.map.findRoute(scoutHome, creep.room.name);
                        var actualScore = Spawnvalues[0] - (roomDistancePath.length / 2)
            
                        //Memory write                   
                        room.memory.lastIntel = Game.time;
            
                        if (Spawnvalues && Spawnvalues[0] > 5 && sourceAmount > 1) {
            
                            room.memory.colonize.suitable = "YES"
                        } else {
                            room.memory.colonize.suitable = "NO"
                        }
                        room.memory.colonize.name = creep.room.name;
                        room.memory.colonize.score = actualScore;
                        room.memory.colonize.posX = Spawnvalues[1];
                        room.memory.colonize.posY = Spawnvalues[2];
                        room.memory.colonize.pathDistance = roomDistancePath.length;
                        room.memory.colonize.size = Spawnvalues[0];
                        room.memory.colonize.sources = sourceAmount;


                    } 
                       
                    
                    
                } 
              
                  
            }
            
            let  spawnAreaSize = Spawnvalues[0]
            if (sourceAccessPoints > 2 && sourceAmount > 1 && spawnAreaSize > 5) {
                if (!mapLib.addToRoomList(room_dest, true, sourceAccessPoints, sourceAmount, spawnAreaSize)) {
                    creep.memory.room_dest = mapLib.getNextRoom(creep);
                }
            } else {
                if (!mapLib.addToRoomList(room_dest, false, sourceAccessPoints, sourceAmount, spawnAreaSize)) {
                    creep.memory.room_dest = mapLib.getNextRoom(creep);
                }
            }

        }


            let thismessage = '<span style="color: #000000; font - weight: bold; "> ::::: ' + creep.room
            identifyProblem(startCpu, creep, thismessage);
       
    },
};

module.exports = roleScout;                         




function identifySources(room) {

    if (!room.memory.resources) {
        room.memory.resources = {};
        room.memory.resources.energy = {};
        var allSources = room.find(FIND_SOURCES);
        for (var source of allSources) {
            var id = source.id;
            let sourceIndex = 'source_' + allSources.indexOf(source);
            //console.log('source_' + allSources.indexOf(source), ' : ', id);
            room.memory.resources.energy[sourceIndex] = id
            console.log('setting source in room memory - ' + allSources.indexOf(source), ' : ', id)
            //console.log(allSources.indexOf(source),' : ',id); // 0
            // save the ID somewhere
        }

    }
}
function indetifyMinerals(room) {
    if (!room.memory.resources) {
        room.memory.resources = {};
    }
    if (!room.memory.resources[room.name]) {
        let minerals = room.find(FIND_MINERALS);
        _.forEach(minerals, function (mineral) {
            let data = _.get(room.memory, [
                "resources",
                mineral.mineralType,
                mineral.id,
            ]);
            if (data === undefined) {
                _.set(
                    room.memory,
                    ["resources", mineral.mineralType, mineral.id],
                    {}
                );
                //_.set(room.memory, ['resources', 'energy', source.id], {})
            }
        });
    }
}

function identifyController(room) {
    //  StructureController
    if (!room.memory.controller) {
        room.memory.controller = {};
    }
    if (room.controller) {
        room.memory.controller.Level = room.controller.level;
        room.memory.controller.My = room.controller.my;
        room.memory.controller.Owner = room.controller.owner;
        room.memory.controller.Reservation = room.controller.reservation;
    } else {
        // room.memory.controller.Level = "No Controller"
        //  room.memory.controller.Owner = "No Controller";
    }
    // room.memory.controller.Level = '';
}


function distanceTransform(roomName) {
    var start = Game.cpu.getUsed();

    //distanceTransform(roomName, rejector = (x, y, roomName) => (Game.map.getRoomTerrain(roomName).get(x, y) & TERRAIN_MASK_WALL))  {
    var rejector = (x, y, roomName) => (Game.map.getRoomTerrain(roomName).get(x, y) & TERRAIN_MASK_WALL)
    var vis = new RoomVisual(roomName);
    var topDownPass = new PathFinder.CostMatrix();
    var x, y;
    var bestSpawnLocation// = ['score', 'x', 'y'];

    for (y = 0; y < 50; ++y) {
        for (x = 0; x < 50; ++x) {
            if (rejector(x, y, roomName)) {
                topDownPass.set(x, y, 0);
            }
            else {
                topDownPass.set(x, y,
                    Math.min(topDownPass.get(x - 1, y - 1), topDownPass.get(x, y - 1),
                        topDownPass.get(x + 1, y - 1), topDownPass.get(x - 1, y)) + 1);
            }
        }
    }

    var value;


    for (y = 49; y >= 0; --y) {
        for (x = 49; x >= 0; --x) {
            value = Math.min(topDownPass.get(x, y),
                topDownPass.get(x + 1, y + 1) + 1, topDownPass.get(x, y + 1) + 1,
                topDownPass.get(x - 1, y + 1) + 1, topDownPass.get(x + 1, y) + 1);
            topDownPass.set(x, y, value);

         //   vis.circle(x, y, { radius: value / 25, fill: "red", opacity: value / 10 });
            if (value > 0) {
           //     vis.text(value, x, y, { font: "bold .5 HELVETICA", align: "center", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.20 });

                if (!bestSpawnLocation) {
                    bestSpawnLocation = [value, x, y];
                 // console.log(roomName, ' : bestSpawnlocation ', bestSpawnLocation.value, bestSpawnLocation.x, bestSpawnLocation.y)
                }
                if (value > bestSpawnLocation[0]) {
                    bestSpawnLocation = [value, x, y];
                    // console.log('=======================================>>>>>>>>>>>>>>>>>>>' + bestSpawnLocation)
                   //console.log(roomName, ' : bestSpawnlocation ' , bestSpawnLocation.value,bestSpawnLocation.x, bestSpawnLocation.y)
                }


            }
        }
    }

  // console.log(roomName, ' : bestSpawnlocation ', bestSpawnLocation.value, bestSpawnLocation.x, bestSpawnLocation.y)
    //console.log('JSON: ', JSON.stringify(topDownPass))
    // { font: "bold .5 HELVETICA", align: "center", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.20 }
    //return topDownPass;
    return bestSpawnLocation;
    // console.log("============> ", bestSpawnLocation, "<===============================")


}


//const startCpu = Game.cpu.getUsed();  this at top

//let thismessage = '<span style="color: #FFFFFF; font - weight: bold; "> ::::: ' + creep.room
//identifyProblem(startCpu, creep, thismessage);
function identifyProblem(startCpu, creep, thismessage) {

    const elapsed = Game.cpu.getUsed() - startCpu;
    if (elapsed) {
        creep.say(elapsed.toFixed(2))
        if (elapsed > 10) {
            console.log('========><span style="color: #FF0000;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed.toFixed(4) + ' CPU time:  room = ' + creep.room.name + thismessage); //red
        } else {
            // console.log('========><span style="color: #00FF00;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed.toFixed(4) + ' CPU time:  Task = ' + creep.memory.task + thismessage); //green
        }
    }
}

