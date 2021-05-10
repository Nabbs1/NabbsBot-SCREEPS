let mapLib = require('mapLib');

//Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "Explorer", {memory: {role: 'explorer'}});

let roleScout = {

    run: function (creep) {

        let room_dest;
        let stuckTimer = creep.memory.stuckTimer;

        if (creep.memory.room_dest !== undefined) {
            room_dest = creep.memory.room_dest;
        } else {
            if (mapLib.getNextUnvisitedRoom(creep)) {
                creep.memory.room_dest = mapLib.getNextUnvisitedRoom(creep);
            } else {
               // creep.suicide();
            }
        }
        let room = creep.room;

        if (creep.memory.room_dest !== undefined && creep.room.name !== room_dest) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room_dest), {visualizePathStyle: {stroke: '#0000FF'}});
			if(mapLib.checkIfRoomVisited(creep.memory.room_dest)) {
				creep.memory.room_dest = mapLib.getNextUnvisitedRoom(creep);
			}
			stuckTimer++;
			creep.memory.stuckTimer = stuckTimer;
			if(stuckTimer > 50) {
				creep.memory.room_stuck = creep.room.name;
			}
			if(stuckTimer > 75) {
				if(creep.memory.room_stuck === creep.room.name) {
                    mapLib.changeRoomStatus(room_dest, 'REACHABLE', false);
                    mapLib.changeRoomStatus(room_dest, 'VISITED', true);
					creep.memory.room_dest = mapLib.getNextUnvisitedRoom(creep);
					creep.memory.stuckTimer = 0;
				} else {
					creep.memory.room_stuck = creep.room.name;
					creep.memory.stuckTimer = 0;
				}
			}
        } else if (creep.memory.room_dest !== undefined) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room_dest), { visualizePathStyle: { stroke: '#0000FF' } });
            if (room.controller != null) {
                if (!room.controller.my && room.controller.owner === undefined) {
                   

                    let sources = creep.room.find(FIND_SOURCES);
                    const terrain = Game.map.getRoomTerrain(creep.memory.room_dest);

                    let sourceAccessPoints = 0;
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
                    if (sourceAccessPoints >= 4) {
                        mapLib.changeRoomStatus(room_dest, 'CLAIMABLE', true);
                        mapLib.changeRoomStatus(room_dest, 'VISITED', true);
                        creep.memory.room_dest = mapLib.getNextUnvisitedRoom(creep);
                    } else {
                        mapLib.changeRoomStatus(room_dest, 'CLAIMABLE', false);
                        mapLib.changeRoomStatus(room_dest, 'VISITED', true);
                        creep.memory.room_dest = mapLib.getNextUnvisitedRoom(creep);
                    }
                }
            } else {
                mapLib.changeRoomStatus(room_dest, 'ENEMY', true);
                mapLib.changeRoomStatus(room_dest, 'VISITED', true);
                creep.memory.room_dest = mapLib.getNextUnvisitedRoom(creep);
            }
        } else {
            creep.memory.room_dest = mapLib.getNextUnvisitedRoom(creep);
        }
    }
};

module.exports = roleScout;


// let mapLib = require('mapLib');
// var roleScout = {
// 	/** @param {Creep} creep **/
// 	run: function (creep) {
// 		const startCpu = Game.cpu.getUsed();
// 		const scoutHome = creep.memory.homeRoom;
// 		let creepRoom; // = creep.room;
// 		let room_dest;
// 		let sourceAmount;
// 		let Spawnvalues;
// 		let goHere;
// 		let sources;

// 		let spawnAreaSize;
// 		let spawns;

// 		// if (creep.pos.x * creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
// 		// 	creep.travelTo(new RoomPosition(25, 25, creep.memory.room_dest));
// 		// }
//  creepRoom = creep.room;
// 		if (!creepRoom.memory.recon) {
// 			// nothing saved in room.memory.recon so run this stuff
// 			creepRoom.memory.recon = {};
// 			creepRoom.memory.recon.sonarMapped = false;
// 		}
// 		// this saves current scout room location so I can display in homeroom if desired
// 		Game.rooms[scoutHome].memory.scoutRoom = creepRoom;

// 		if (creep.memory.room_dest !== undefined) {
// 			room_dest = creep.memory.room_dest;
// 		} else {
// 			room_dest = mapLib.getNextRoom(creep);
// 			// console.log(creep.memory.room_dest)
// 			creep.memory.room_dest = room_dest;
// 			console.log(creep + 'scout has no destination - grabbing new next room from MapLib');
// 		}

// 		if (creep.memory.room_dest !== undefined && creep.room.name !== room_dest) {
// 			creep.moveTo(new RoomPosition(25, 25, room_dest));
// 			//	goHere = new RoomPosition(25, 25, room_dest);
// 			//	creep.travelTo(goHere, { reusePath: 5 });
// 			//	console.log(room_dest);
// 			//	creep.moveTo(new RoomPosition(25, 25, room_dest));
// 			//	creep.travelToRoom(room_dest);
// 		} else {
// 			// if (creep.pos.x * creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
// 			// 	creep.travelTo(new RoomPosition(25, 25, creep.memory.room_dest));
// 			// }
// 			///we are in the room_dest Room do stuff
// 			creepRoom.memory.recon.lastIntel = Game.time;
// 			if (creepRoom.controller) {
// 				identifyController(creepRoom);
// 		spawns = creep.room.find(FIND_MY_SPAWNS);
// 				if (!creepRoom.controller.my) {
// 					if (creepRoom.memory.recon.sonarMapped === false || spawns.length > 0) {
// 						Spawnvalues = distanceTransform(creep.room.name);
// 						spawnAreaSize = Spawnvalues[0];
// 						sources = identifySources(creepRoom);
// 						sourceAmount = sources.length;
						 
// 						creepRoom.memory.recon.lastIntel = Game.time;
// 						creepRoom.memory.recon.name = creep.room.name;
// 						creepRoom.memory.recon.size = Spawnvalues[0];
// 						creepRoom.memory.recon.posX = Spawnvalues[1];
// 						creepRoom.memory.recon.posY = Spawnvalues[2];
// 						creepRoom.memory.recon.sources = sourceAmount;
// 						creepRoom.memory.recon.sonarMapped = true;
// 						//	console.log(room + ' recon');
// 						console.log(creep + ' recon in <a href="#!/room/shard1/' + creep.room.name + '">' + creep.room.name + '</a>');
// 						if (spawnAreaSize > 5 && sourceAmount > 1) {
// 							creepRoom.memory.recon.suitable = 'YES';
// 							if (!mapLib.addToRoomList(room_dest, true, sourceAmount, spawnAreaSize)) {
// 								creep.memory.room_dest = mapLib.getNextRoom(creep);
// 							}
// 						}  else {
// 							creepRoom.memory.recon.suitable = 'NO';
// 							if (!mapLib.addToRoomList(room_dest, false, sourceAmount, spawnAreaSize)) {
// 								creep.memory.room_dest = mapLib.getNextRoom(creep);
// 							}
// 						}
// 					}
// 				} else {
// 					creep.memory.room_dest = mapLib.getNextRoom(creep);
// 					console.log(creep + ' recon in MY ROOM <a href="#!/room/shard1/' + creep.room.name + '">' + creep.room.name + '</a>');
// 				}
// 				creep.memory.room_dest = mapLib.getNextRoom(creep);
// 				console.log(creep + ' recon in <a href="#!/room/shard1/' + creep.room.name + '">' + creep.room.name + '</a>');
// 			} else {
// 				creepRoom.memory.recon.suitable = 'NO';
// 				console.log(creep + ' recon in <a href="#!/room/shard1/' + creep.room.name + '">' + creep.room.name + '</a>');
// 				creep.memory.room_dest = mapLib.getNextRoom(creep);
// 				//NO CONTROLLER
// 			}
// 		} // else travel to room.

// 		//		let thismessage = '<span style="color: #000000; font - weight: bold; "> ::::: ' + creep.room;
// 		//	creepFunctions.creepCheckCPU(startCpu, creep, thismessage);
// 	},
// };

// module.exports = roleScout;

// //===============================================

// //===============================================

// function identifyController(room) {
// 	//  StructureController
// 	if (!room.memory.recon.controller) {
// 		room.memory.recon.controller = {};
// 	}
// 	if (room.controller) {
// 		room.memory.recon.controller.Level = room.controller.level;
// 		room.memory.recon.controller.My = room.controller.my;
// 		room.memory.recon.controller.Owner = room.controller.owner;
// 		room.memory.recon.controller.Reservation = room.controller.reservation;
// 	} else {
// 		// room.memory.controller.Level = "No Controller"
// 		//  room.memory.controller.Owner = "No Controller";
// 	}
// 	// room.memory.controller.Level = '';
// }

// function distanceTransform(roomName) {
// 	var start = Game.cpu.getUsed();

// 	//distanceTransform(roomName, rejector = (x, y, roomName) => (Game.map.getRoomTerrain(roomName).get(x, y) & TERRAIN_MASK_WALL))  {
// 	var rejector = (x, y, roomName) => Game.map.getRoomTerrain(roomName).get(x, y) & TERRAIN_MASK_WALL;
// 	var vis = new RoomVisual(roomName);
// 	var topDownPass = new PathFinder.CostMatrix();
// 	var x, y;
// 	var bestSpawnLocation; // = ['score', 'x', 'y'];

// 	for (y = 0; y < 50; ++y) {
// 		for (x = 0; x < 50; ++x) {
// 			if (rejector(x, y, roomName)) {
// 				topDownPass.set(x, y, 0);
// 			} else {
// 				topDownPass.set(
// 					x,
// 					y,
// 					Math.min(topDownPass.get(x - 1, y - 1), topDownPass.get(x, y - 1), topDownPass.get(x + 1, y - 1), topDownPass.get(x - 1, y)) + 1
// 				);
// 			}
// 		}
// 	}

// 	var value;

// 	for (y = 49; y >= 0; --y) {
// 		for (x = 49; x >= 0; --x) {
// 			value = Math.min(
// 				topDownPass.get(x, y),
// 				topDownPass.get(x + 1, y + 1) + 1,
// 				topDownPass.get(x, y + 1) + 1,
// 				topDownPass.get(x - 1, y + 1) + 1,
// 				topDownPass.get(x + 1, y) + 1
// 			);
// 			topDownPass.set(x, y, value);

// 			//   vis.circle(x, y, { radius: value / 25, fill: "red", opacity: value / 10 });
// 			if (value > 0) {
// 				//     vis.text(value, x, y, { font: "bold .5 HELVETICA", align: "center", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.20 });

// 				if (!bestSpawnLocation) {
// 					bestSpawnLocation = [value, x, y];
// 					// console.log(roomName, ' : bestSpawnlocation ', bestSpawnLocation.value, bestSpawnLocation.x, bestSpawnLocation.y)
// 				}
// 				if (value > bestSpawnLocation[0]) {
// 					bestSpawnLocation = [value, x, y];
// 					// console.log('=======================================>>>>>>>>>>>>>>>>>>>' + bestSpawnLocation)
// 					//console.log(roomName, ' : bestSpawnlocation ' , bestSpawnLocation.value,bestSpawnLocation.x, bestSpawnLocation.y)
// 				}
// 			}
// 		}
// 	}

// 	// console.log(roomName, ' : bestSpawnlocation ', bestSpawnLocation.value, bestSpawnLocation.x, bestSpawnLocation.y)
// 	//console.log('JSON: ', JSON.stringify(topDownPass))
// 	// { font: "bold .5 HELVETICA", align: "center", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.20 }
// 	//return topDownPass;
// 	return bestSpawnLocation;
// 	// console.log("============> ", bestSpawnLocation, "<===============================")
// }

// function identifySources(room) {
// 	var allSources = room.find(FIND_SOURCES);
// 	if (!room.memory.resources) {
// 		room.memory.resources = {};
// 		room.memory.resources.energy = {};

// 		for (var source of allSources) {
// 			var id = source.id;
// 			let sourceIndex = 'source_' + allSources.indexOf(source);
// 			//console.log('source_' + allSources.indexOf(source), ' : ', id);
// 			room.memory.resources.energy[sourceIndex] = id;
// 			console.log('setting source in room memory - ' + allSources.indexOf(source), ' : ', id);
// 			//console.log(allSources.indexOf(source),' : ',id); // 0
// 			// save the ID somewhere
// 		}
// 	}
// 	return allSources;
// }
