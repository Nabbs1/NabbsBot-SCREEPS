const C = require('constants');
const { size } = require('lodash');
var mapLib = require('mapLib');
function spawning(room) {
	let spawns = room.find(FIND_MY_SPAWNS);
	// //console.log(spawns);

	///spawns = _.filter(spawns, { filter: (structure) => structure.spawning})
	spawnings = _.filter(spawns, 'spawning');
	// //console.log('spawning test: ',spawnings)
	_.forEach(spawnings, function (spawn) {
		////console.log('spawning test: ',spawn,spawn.spawning.name)
		//spawningCreep.memory.role

		//spawn.spawning.cancel()
		var spawningCreep = spawn.spawning.name;
		// //console.log(spawningCreep.memory)
		let Percentage = (((spawn.spawning.needTime - spawn.spawning.remainingTime) / spawn.spawning.needTime) * 100).toFixed(2);
		let Pcent = Math.round(Percentage);
		spawn.room.visual.text('🛠️' + spawningCreep + ' : ' + Pcent + '%', spawn.pos.x + 1, spawn.pos.y, {
			align: 'left',
			opacity: 0.8,
			color: 'white',
			backgroundColor: '#505050',
			stroke: 'black',
			font: '.8',
		});
	});

	spawns = _.filter(spawns, 'spawning', null);

	if (!room.memory.creepcount) {
		room.memory.creepcount = {};
		room.memory.creepcount.creepCurrent = {};
		room.memory.creepcount.creepMax = {};
		room.memory.creepcount.special = {};

		room.memory.creepcount.creepMax.harvesterMax = 3;
		room.memory.creepcount.creepMax.droneMax = 3;
		room.memory.creepcount.creepMax.minerMax = 2;
		room.memory.creepcount.creepMax.scoutMax = 1;
		room.memory.creepcount.creepMax.claimerMax = 0;
		room.memory.creepcount.creepMax.mamabirdMax = 1;
		room.memory.creepcount.creepMax.upgraderMax = 4;

		room.memory.creepcount.creepCurrent.harvesters = 0;
		room.memory.creepcount.creepCurrent.drones = 0;
		room.memory.creepcount.creepCurrent.miners = 0;
		room.memory.creepcount.creepCurrent.scouts = 0;
		room.memory.creepcount.creepCurrent.claimers = 0;
		room.memory.creepcount.creepCurrent.mamabirds = 0;
		room.memory.creepcount.creepCurrent.upgraders = 0;
	}

	let cLevel = room.controller.level;
	let baseNumDrone = 3;
	//  need to get open spots from somehwhere
	// dynamic drone number for room where it decreases based on controller level

	//room.memory.creepcount.creepMax.mamabirdMax = 1;

	let dynamicDroneMax = 13;
	//room.memory.creepcount.creepMax.droneMax = 6;
	//room.memory.creepcount.creepMax.harvesterMax = 4
	let harvesterMax = room.memory.creepcount.creepMax.harvesterMax;
	let droneMax = room.memory.creepcount.creepMax.droneMax;
	let minerMax = room.memory.creepcount.creepMax.minerMax;
	let scoutMax = room.memory.creepcount.creepMax.scoutMax;
	let claimerMax = room.memory.creepcount.creepMax.claimerMax;
	let mamabirdMax = room.memory.creepcount.creepMax.mamabirdMax;
	let upgraderMax = room.memory.creepcount.creepMax.upgraderMax;
	//	let roomHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester" && c.memory.homeRoom === room.name);
	// let roomDrones = _.sum(Game.creeps, (c) => c.memory.role == "drone" && c.memory.homeRoom === room.name);
	// let roomMiners = _.sum(Game.creeps, (c) => c.memory.role == "miner" && c.memory.homeRoom === room.name);
	// let roomScouts = _.sum(Game.creeps, (c) => c.memory.role == "scout" && c.memory.homeRoom === room.name);
	// let roomClaimers = _.sum(Game.creeps, (c) => c.memory.role == "claimer" && c.memory.homeRoom === room.name);
	// let roomMamabirds = _.sum(Game.creeps, (c) => c.memory.role == "mamabird" && c.memory.homeRoom === room.name);

	let roomHarvesters = _(Memory.creeps).filter({ role: 'harvester', homeRoom: room.name }).size();
	let roomDrones = _(Memory.creeps).filter({ role: 'drone', homeRoom: room.name }).size();
	let roomMiners = _(Memory.creeps).filter({ role: 'miner', homeRoom: room.name }).size();
	let roomScouts = _(Memory.creeps).filter({ role: 'scout', homeRoom: room.name }).size();
	let roomClaimers = _(Memory.creeps).filter({ role: 'claimer' }).size();
	let roomMamabirds = _(Memory.creeps).filter({ role: 'mamabird', homeRoom: room.name }).size();
	let roomUpgraders = _(Memory.creeps).filter({ role: 'upgrader', homeRoom: room.name }).size();

	room.memory.creepcount.creepCurrent.harvesters = roomHarvesters;
	room.memory.creepcount.creepCurrent.drones = roomDrones;
	room.memory.creepcount.creepCurrent.miners = roomMiners;
	room.memory.creepcount.creepCurrent.scouts = roomScouts;
	room.memory.creepcount.creepCurrent.claimers = roomClaimers;
	room.memory.creepcount.creepCurrent.mamabirds = roomMamabirds;
	room.memory.creepcount.creepCurrent.upgraders = roomUpgraders;

	// room.memory.creepcount.creepMax.harvesterMax = 5;
	// room.memory.creepcount.creepMax.droneMax = 3;
	// room.memory.creepcount.creepMax.minerMax = 2;
	// room.memory.creepcount.creepMax.scoutMax = 1;
	// room.memory.creepcount.creepMax.claimerMax = 0;
	// room.memory.creepcount.creepMax.mamabirdMax = 1;
	// room.memory.creepcount.creepMax.upgraderMax = 4;

	/// if all spawns are busy dump out of function
	if (!spawns.length) {
		return;
	}

	if (roomUpgraders < upgraderMax && roomHarvesters == harvesterMax) {
		// && (harvesters > 1 || energyMiner > 1)) {
		//&& harvesters.length
		let newName = 'U-' + makeid(2); //+ randname();//Game.time; //+makeid(2)+'-'
		let result = spawns[0].spawnCreep(getBody([WORK, WORK, CARRY, MOVE], room), newName, {
			memory: {
				role: 'upgrader',
				targetRoom: room.name,
				homeRoom: room.name,
			},
		});
		//console.log('Spawning upgrader:',newName, room, result)
		if (result == OK) {
			console.log('spawning ', newName, ' in <a href="#!/room/shard1/' + room.name + '">' + room.name + '</a>');
			//	room.memory.creepcount.upgrader = room.memory.creepcount.upgrader + 1;
			return;
		}
	}
	///HARVESTER  TEMP
	if (roomHarvesters < harvesterMax) {
		let newName = 'H-' + makeid(2); //Game.time;
		let result = spawns[0].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
			memory: {
				role: 'harvester',
				targetRoom: room.name,
				homeRoom: room.name,
				task: '',
				source: '',
			},
		});
		//console.log('Spawning harvester:', room, result)
		if (result == OK) {
			console.log(room + ' spawning harvester: ' + newName);
			//room.memory.creepcount.roomHarvesters = room.memory.creepcount.roomHarvesters + 1;

			return;
		}
	}
	///DRONE
	if (roomDrones < droneMax && roomHarvesters) {
		let newName = 'D-' + makeid(2); //Game.time;
		let result = spawns[0].spawnCreep(getBody([WORK, CARRY, MOVE, MOVE], room), newName, {
			memory: {
				role: 'drone',
				targetRoom: room.name,
				homeRoom: room.name,
				task: '',
				source: '',
			},
		});
		//console.log('Spawning harvester:', room, result)
		if (result == OK) {
			console.log(room + 'spawning DRONE: ' + newName);
			return;
		}
	}
	//SCOUTS
	if (roomScouts < scoutMax && cLevel > 3) {
		let newName = 'S-' + room.name; //makeid(2); //Game.time;
		let result = spawns[0].spawnCreep([MOVE], newName, {
			memory: {
				role: 'scout',
				targetRoom: room.name,
				homeRoom: room.name,
			},
		});
		//console.log('Spawning harvester:', room, result)
		if (result == OK) {
			console.log(room + 'spawning SCOUT: ' + newName);
			//room.memory.creepcount.roomHarvesters = room.memory.creepcount.roomHarvesters + 1;
			return;
		}
	}
	/// EnergyMiner  emMax em
	//  	let minerMax = room.memory.creepcount.creepMax.minerMax;
	if (roomMiners < minerMax && cLevel > 1) {
		let minerSource_0 = _.sum(Game.creeps, (c) => c.memory.mineTarget == 'source_0' && c.room.name === room.name);
		let minerSource_1 = '';

		if (!minerSource_0) {
			let sourceID = room.memory.resources.energy.source_0;
			var newName = 'M00' + room.name; // + makeid(2);
			let result = spawns[0].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName, {
				memory: {
					role: 'miner',
					source: sourceID,
					targetRoom: room.name,
					homeRoom: spawns[0].room.name,
					task: 'StripMine',
					mineTarget: 'source_0',
				},
			});
			//console.log('Spawning energyMiner:', room,source, result)
			if (result == OK) {
				console.log(room + 'spawning MINER 00: ' + newName);
				return;
			}
		} else {
			let sourceID = room.memory.resources.energy.source_1;
			var newName = 'M01' + room.name; // + makeid(2);
			let result = spawns[0].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName, {
				memory: {
					role: 'miner',
					source: sourceID,
					targetRoom: room.name,
					homeRoom: spawns[0].room.name,
					task: 'StripMine',
					mineTarget: 'source_1',
				},
			});
			//console.log('Spawning energyMiner:', room,source, result)
			if (result == OK) {
				console.log(room + 'spawning MINER 01: ' + newName);
				return;
			}
		}
	} // end miner

	if (cLevel > 3 && roomMamabirds < mamabirdMax) {
		//	console.log('test mamabirdCount', mamabirdCount)
		let newName = 'MamaBird-' + makeid(2); //Game.time;
		let result = spawns[0].spawnCreep(getBody([CARRY, MOVE], room, 4 * cLevel), newName, {
			memory: { role: 'mamabird', targetRoom: room.name, homeRoom: room.name },
		});
		//Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], 'Ass', {memory: {role: 'hauler', targetRoom:  '', homeRoom: Game.spawns['Spawn1'].room.name}});
		//console.log('Spawning harvester:', room, result)
		if (result == OK) {
			console.log('spawning ', newName, ' in <a href="#!/room/shard1/' + room.name + '">' + room.name + '</a>');
			// room.memory.creepcount.mamabirdCount = room.memory.creepcount.mamabirdCount + 1;
			return;
		}
	}

	//                          CLAIMER SHIT
	//cLevel > 4
	// if (Memory.NeedToExpand) {
	// 	room.memory.creepcount.creepMax.claimerMax = 1
	// } else {
	// 	room.memory.creepcount.creepMax.claimerMax = 0
	// }
	//	console.log(room.memory.colonizeNext.name.name)
	//	console.log(room.memory.colonizeNext.score)

	// if (creep.memory.room_dest !== undefined && creep.room.name !== room_dest) {
	//       room_dest = creep.memory.room_dest;
	//       var roomName = String(room_dest);
	//       creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#0000FF' } });
	//   }
	//   if (mapLib.getNextClaimableRoom(creep.memory.room_spawn)) {
	//       creep.memory.room_dest = mapLib.getNextClaimableRoom(creep.memory.room_spawn);
	//   }

	//	console.log( JSON.stringify(thisIsNextRoom),)
	//	console.log(thisIsNextRoom.room_name)
	// JSON.stringify(value),
	//console.log(mapLib.getGCLClaimsAvailable())

	const thisRoomSpawn = spawns[0];
	const myLevel = Game.gcl.level;
	const roomClaimsAvailable = mapLib.getGCLClaimsAvailable();
	const thisIsNextRoom = mapLib.getNextClaimableRoom(thisRoomSpawn);
	//console.log(myLevel+' of '+roomClaimsAvailable)

	if (room.memory.colonizeNext) {
		var claimRoom = room.memory.colonizeNext.name.name; //null //
		var roomScore = room.memory.colonizeNext.score;
	}
	if (!Game.flags.Bootup) {
		if (roomClaimsAvailable > 0 && cLevel > 3 && thisIsNextRoom) {
			//console.log(claimRoom + " : score " + roomScore)
			room.memory.creepcount.creepMax.claimerMax = 1;
		} else {
			room.memory.creepcount.creepMax.claimerMax = 0;
		}
	}
	///claimer count needs to be global
	// If(cLevel > 4 && claimRoom && roomScore > 5){

	//checkMyRoom.length < myLevel
	//console.log(checkMyRoom.length , myLevel)
	// };

	//	if (!room.controller.my && room.controller.owner === undefined) {

	if (roomClaimers < claimerMax && Game.flags.Claim) {
		//var claimRoom =  room.memory.colonizeNext.name.name
		// if (Game.flags.reserve) {
		// 	var claimRoom = Game.flags.reserve.pos.roomName;
		// } else if (Game.flags.claim) {
		// 	var claimRoom = Game.flags.claim.pos.roomName;
		// }creep, targetRoom)
		let cTargetRoom = thisIsNextRoom.room_name;
		// console.log("spawning claimer for a room this far away: ", howFarIsIt);
		let newName = 'C00-' + room.name; //+ makeid(2); //Game.time;
		let result = spawns[0].spawnCreep([CLAIM, MOVE], newName, {
			memory: { role: 'claimer', targetRoom: cTargetRoom, homeRoom: room.name },
		});
		//console.log('Spawning claimer:', room, result)

		if (result == OK) {
			console.log(room.name + ' => spawning claimer for =>' + cTargetRoom + '  :  ' + result);
			/// set for room booters drones here
			return;
		}
	}

	///DRONE BOOTUP      NEED A WAY TO THROTTLE THIS SO THAT ONLY ONE ROOM IS BEING BOOTED AT A TIME>
	///DRONE BOOTUP      ALSO NEED A WAY TO CHECK FOR ROOM OWNERSHIP WIHTOUT A SPAWN
	///DRONE BOOTUP
	///DRONE BOOTUP

	if (Game.flags.Bootup && Game.flags.Bootup123) {
		///RoomBooters
		let roomBooters;
		let bootTargetRoom = Game.flags.Bootup.pos.roomName; //this is name
		let bootMinerTargetRoom = Game.flags.Bootup.room; //  this is room object
		//	console.log(bootMinerTargetRoom.memory.resources.energy.source_1)

		//	let bootMinerTargetRoom = Game.flags.Bootup.room
		roomBooters = _(Memory.creeps).filter({ role: 'drone', homeRoom: bootTargetRoom }).size();
		roomMineBooters = _(Memory.creeps).filter({ role: 'miner', homeRoom: bootTargetRoom }).size();

		//	roomBooters = _.sum(Game.creeps, (c) => c.memory.role == "drone" && c.memory.homeRoom === bootTargetRoom);

		// 	creep.memory.targetRoom = Game.flags.Bootup.pos.roomName;

		// }
		///DRONE BOOTUP  need a way to cap this.
		if (cLevel > 2 && roomBooters < 5) {
			let newName = 'DB-' + room.name + '_' + makeid(2); //Game.time;
			let result = spawns[0].spawnCreep(getBody([WORK, CARRY, MOVE, MOVE], room), newName, {
				memory: {
					role: 'drone',
					targetRoom: bootTargetRoom,
					homeRoom: bootTargetRoom,
					task: '',
					source: '',
				},
			});
			//console.log('Spawning harvester:', room, result)
			if (result == OK) {
				console.log(
					'<span style="color: #00FF00;font-weight: bold;">' + room + 'spawning ' + newName + ' RoomBooter Drone: for bootup:' + bootTargetRoom
				);
				return;
			}
		}
		///DRONE BOOTUP MINER need a way to cap this.
		//THIS WORKS
		//THIS WORKS
		//THIS WORKS
		// if (Game.flags.testFlag) {      //THIS WORKS

		// 	testFlagRoom = Game.flags.testFlag.room
		// 	console.log(testFlagRoom + '  ' + room)

		// 	console.log(bootMinerTargetRoom.memory.resources.energy.source_0)
		// 		console.log(bootMinerTargetRoom.memory.resources.energy.source_1)
		// 		//console.log(testFlagRoom)
		// }

		if (roomMineBooters < 2 && cLevel > 4) {
			//		console.log(room + 'should be creating a MINER for room '+bootMinerTargetRoom)
			let minerSource_0 = _.sum(Game.creeps, (c) => c.memory.mineTarget == 'source_0' && c.memory.targetRoom == bootTargetRoom);

			let minerSource_1 = '';
			//	console.log(room + 'should be creating a MINER for room '+bootMinerTargetRoom, minerSource_0,roomMineBooters)
			if (!minerSource_0 && bootTargetRoom.memory.resources) {
				let sourceID = bootTargetRoom.memory.resources.energy.source_0;
				var newName = 'M00' + room.name; // + makeid(2);
				let result = spawns[0].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName, {
					memory: {
						role: 'miner',
						source: sourceID,
						targetRoom: bootTargetRoom,
						homeRoom: bootTargetRoom,
						task: 'StripMine',
						mineTarget: 'source_0',
					},
				});
				//console.log('Spawning energyMiner:', room,source, result)
				if (result == OK) {
					console.log(room + 'spawning MINER 00:  for room ' + bootMinerTargetRoom);
					return;
				}
			} else {
				let sourceID = bootMinerTargetRoom.memory.resources.energy.source_1;
				var newName = 'M01' + room.name; // + makeid(2);
				let result = spawns[0].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {
					memory: {
						role: 'miner',
						source: sourceID,
						targetRoom: bootTargetRoom,
						homeRoom: bootTargetRoom,
						task: 'StripMine',
						mineTarget: 'source_1',
					},
				});
				//console.log('Spawning energyMiner:', room,source, result)
				if (result == OK) {
					console.log(room + 'spawning MINER 01: for room ' + bootMinerTargetRoom);
					return;
				}
			}
		} // end miner
	} //end of bootup
}

module.exports = spawning;

function getBody(segment, room) {
	let body = [];
	let level = room.controller.level;
	let MaxPartsforCreep = 5 * level + level; //   20//4 * level + level; //4*level;  //32 max with this math.
	//probably should change to 4 * level + level.for a 40 part max at level 8.  4*8+8
	//50 max because at higher room levels you have so much energy it trys to make like
	///62 part creeps and game has a 50 cap

	//how much each segment costs
	let segmentCost = _.sum(segment, (s) => BODYPART_COST[s]);
	let bparts = _.size(segment);
	//how much energy we have total
	let energyAvailable = room.energyAvailable;
	//  let energyAvailable = room.energyCapacityAvailable; ?? this will stall all spawning untill all is full.  Not good if you have no creeps
	//how many times can we use this segment
	let maxSegments = Math.floor(energyAvailable / segmentCost);
	//console.log(maxSegments,':maxSegments  | MaxPartsforCreep:',MaxPartsforCreep)
	let maxParts = Math.floor(MaxPartsforCreep / bparts); //16   changed to 30 to make smaller creeps ..was 50
	//  there is a 50 part limit for creeps ..this verifies that the maxSegments doesnt go higher than the 50, if it does it sets it to 50
	if (maxParts < maxSegments) {
		maxSegments = maxParts;
	}
	//	body.push(...basicBodyParts);
	//push the segment loop
	_.times(maxSegments, function () {
		_.forEach(segment, (s) => body.push(s));
	});
	//console.log('getBody(): ',body,'\n : maxSegments:',maxSegments,'bparts:', bparts,'segmentCost:', segmentCost,'segmentCost*maxSegments:',segmentCost*maxSegments, ' :::: MaxPartsforCreep:',MaxPartsforCreep)
	// //console.log('getBody(): ',body)
	//console.log(segment, room, body)
	return body;
}

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function randname() {
	var names = [
		'Dog',
		'Cat',
		'Rat',
		'Hose',
		'Fly',
		'Pig',
		'Hog',
		'Bee',
		'Ant',
		'Ape',
		'Goat',
		'Bear',
		'Crab',
		'Duck',
		'Ass',
		'Cow',
		'Ewe',
		'Sow',
		'Doe',
		'Yak',
		'Tit',
		'Hen',
		'Cob',
		'Pen',
		'Bat',
		'Eel',
		'Cod',
		'Jay',
		'Kit',
		'Kid',
		'Nit',
		'Pup',
		'Emu',
	];
	var colors = ['Blue', 'Green', 'Red', 'Yellow', 'Pink', 'Purple', 'Orange', 'Black', 'Gray', 'White', 'Brown'];
	var DisName = colors[Math.floor(Math.random() * colors.length)] + names[Math.floor(Math.random() * names.length)];
	return DisName;
}
