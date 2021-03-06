Memory.NabbsVersion = 'NabbsBot'; // 5.6.2021
var myrooms = require('rooms');
const C = require('constants');
const { size } = require('lodash');
var mapLib = require('mapLib');
var creepFunctions = require('creepFunctions');
var roomPositionFunctions = require('roomPositionFunctions');
var Traveler = require('Traveler');
Memory.visLocX = 3;
Memory.visLocY = 3;
if (!Memory.EnemiesSighted) {
	Memory.EnemiesSighted = ['username : closestHostile : roomName'];
}

global.ROLES = {
	drone: require('role.drone'),
	harvester: require('_role.harvester'),
	miner: require('role.miner'),
	mamabird: require('role.mamabird'),
	upgrader: require('_role.upgrader'),
	// builder: require("role.builder"),
	scout: require('_role.scout'),
	claimer: require('role.claimer'),
};
const profiler = require('screeps-profiler');

// This line monkey patches the global prototypes.
profiler.enable();
// Game.profiler.profile(ticks, [functionFilter]);
// Game.profiler.stream(ticks, [functionFilter]);
// Game.profiler.email(ticks, [functionFilter]);
// Game.profiler.background([functionFilter]);

// Output current profile data.
// Game.profiler.output([lineCount]);

// Reset the profiler, disabling any profiling in the process.
// Game.profiler.reset();

if (!mapLib.getRoomList().length) {
    mapLib.mapRoomsAroundStart(Game.spawns.Spawn1.room.name);
}

mapLib.getRoomListClaimable().forEach(el => console.log(el.name));
console.log(mapLib.getNextClaimableRoom(Game.spawns.Spawn1.room.name));
console.log(mapLib.getGCLClaimsAvailable());
console.log(mapLib.getRoomsWithUnbuildSpawn());

// mapLib.getRoomListClaimable().forEach(el => console.log(el.name));
// console.log(mapLib.getNextClaimableRoom(Game.spawns.Spawn1.room.name));
// console.log(mapLib.getGCLClaimsAvailable());
// console.log(mapLib.getRoomsWithUnbuildSpawn());
// Game.profiler.restart();
/// MAINLOOP START
/// MAINLOOP START
module.exports.loop = function () {
 let mapRooms = mapLib.getRoomListClaimable();

	// if (Game.spawns.Spawn1 !== undefined) {
	// 	if (!Memory.mapLib) {
	// 		mapLib.setRoomList([{ room_name: Game.spawns.Spawn1.room.name, claim_room: false }]);
	// 		console.log('MapLib Setup');
	// 		Memory.mapLib = true;
	// 	}
	// }
	//	let mapRooms = mapLib.getRoomListClaimable();
	//Memory.roomList = {};
	//Memory.mapLib = false;
	profiler.wrap(function () {
		//Game.profiler.profile(1000)
		// let start;
		// let end;
		// let debug = true;
		// if(debug){
		//    start = Game.cpu.getUsed();
		// }
		myrooms();

		//clearing memory of dead creep
		for (var name in Memory.creeps) {
			let creep = Game.creeps[name];
			//console.log (creep.memory.role)
			if (!creep) {
				let dyingRole = Memory.creeps[name].role;
				let room = Memory.creeps[name].homeRoom;
				console.log('??? ??? Digging a grave for:', name, dyingRole, ' ??? ??? ');

				delete Memory.creeps[name];
				//room.memory.creepcount.harvesterTest = --1;
			} else {
				// creep still is alive so do stuff
				if (creep.memory.role) {
					if (creep.ticksToLive < 20) {
						//creep.suicide();
						creep.say('???', creep.ticksToLive);
					}
					//console.log(creep, creep.memory.role)
					try {
						ROLES[creep.memory.role].run(creep);
						// if(debug){
						// 	end = Game.cpu.getUsed();
						// 	if ((end - start) > 10) {
						// 		console.log(creep.name, " - ", end - start);
						// 		creep.say("MEEEE")
						// 	}
						// }
					} catch (e) {
						console.log('Error when managing creep', creep.name, ':', e);
						console.log(e.stack);
					}
				} else {
					console.log(creep, 'has no role set so im setting it to harvester');
					creep.memory.role = 'harvester';
				}
			}
		} //end of  creep
		// if(debug){
		//    end= Game.cpu.getUsed();
		//    console.log("CPU - ", end-start);
		// }



		if (Game.flags.Flag1 && Game.flags.Flag2) {
			createRoadsFlags(Game.flags.Flag1, Game.flags.Flag2);
			// console.log(Game.flags.Flag1,'===================flag test')
		}
		if (Game.flags.cancel) {
			let cancelRoomConstruction = Game.flags.cancel.pos.roomName;
			const sites = Game.rooms[cancelRoomConstruction].find(FIND_CONSTRUCTION_SITES);
			for (const site of sites) {
				site.remove();
			}
			Game.flags.cancel.remove();
		}

		if ((Game.time + 3) % 100 == 0) {
			console.log(
				'<span style="color: #00FF00;font-weight: bold;"> ============= profile output ======================================================='
			);
			console.log('<span style="color: #00FF00;font-weight: bold;">' + Game.profiler.output(1000));
		}
	}); //end of profiler
};
/// MAINLOOP END
/// MAINLOOP END

// to be used after you respawn into a new location
//   but before you spawn your first creep...global.respawn();
global.respawn = function () {
	for (let f in Game.flags) {
		Game.flags[f].remove();
	}
	Memory = {};
	RawMemory.set('');
};
