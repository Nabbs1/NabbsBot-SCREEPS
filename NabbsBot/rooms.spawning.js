function spawning(room) {
	let spawns = room.find(FIND_MY_SPAWNS);
	// //console.log(spawns);

	///spawns = _.filter(spawns, { filter: (structure) => structure.spawning})
	spawnings = _.filter(spawns, "spawning");
	// //console.log('spawning test: ',spawnings)
	_.forEach(spawnings, function (spawn) {
		////console.log('spawning test: ',spawn,spawn.spawning.name)
		//spawningCreep.memory.role

		//spawn.spawning.cancel()
		var spawningCreep = spawn.spawning.name;
		// //console.log(spawningCreep.memory)
		let Percentage = (
			((spawn.spawning.needTime - spawn.spawning.remainingTime) /
				spawn.spawning.needTime) *
			100
		).toFixed(2);
		let Pcent = Math.round(Percentage);
		spawn.room.visual.text(
			"🛠️" + spawningCreep + " : " + Pcent + "%",
			spawn.pos.x + 1,
			spawn.pos.y,
			{
				align: "left",
				opacity: 0.8,
				color: "white",
				backgroundColor: "#505050",
				stroke: "black",
				font: ".8",
			}
		);
	});

	spawns = _.filter(spawns, "spawning", null);

	if (!room.memory.creepcount) {
		room.memory.creepcount = {};
		room.memory.creepcount.creepCurrent = {};
		room.memory.creepcount.creepMax = {};
		room.memory.creepcount.special = {};


		room.memory.creepcount.creepMax.harvesterMax = 5;
		room.memory.creepcount.creepMax.droneMax = 0;
		room.memory.creepcount.creepMax.minerMax = 0;
		room.memory.creepcount.creepMax.scoutMax = 0;
		room.memory.creepcount.creepMax.claimerMax = 0;

		room.memory.creepcount.creepCurrent.harvesters = 0;
		room.memory.creepcount.creepCurrent.drones = 0;
		room.memory.creepcount.creepCurrent.miners = 0;
		room.memory.creepcount.creepCurrent.scouts = 0;
		room.memory.creepcount.creepCurrent.claimers = 0;

	};

	let cLevel = room.controller.level;

	let harvesterMax = room.memory.creepcount.creepMax.harvesterMax;
	let droneMax = room.memory.creepcount.creepMax.droneMax;
	let minerMax = room.memory.creepcount.creepMax.minerMax;
	let scoutMax = room.memory.creepcount.creepMax.scoutMax;
	let claimerMax = room.memory.creepcount.creepMax.claimerMax


	let roomHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester" && c.memory.homeRoom === room.name);
	let roomDrones = _.sum(Game.creeps, (c) => c.memory.role == "drone" && c.memory.homeRoom === room.name);
	let roomMiners = _.sum(Game.creeps, (c) => c.memory.role == "miner" && c.memory.homeRoom === room.name);
	let roomScouts = _.sum(Game.creeps, (c) => c.memory.role == "scout" && c.memory.homeRoom === room.name);
	let roomClaimers = _.sum(Game.creeps, (c) => c.memory.role == "claimer" && c.memory.homeRoom === room.name);

	room.memory.creepcount.creepCurrent.harvesters = roomHarvesters;
	room.memory.creepcount.creepCurrent.drones = roomDrones;
	room.memory.creepcount.creepCurrent.miners = roomMiners;
	room.memory.creepcount.creepCurrent.scouts = roomScouts;
	room.memory.creepcount.creepCurrent.claimers = roomClaimers;

	/// if all spawns are busy dump out of function
	if (!spawns.length) {
		return;
	}

	///HARVESTER  TEMP
	if (roomHarvesters < harvesterMax) {
		let newName = "H-" + makeid(2); //Game.time;
		let result = spawns[0].spawnCreep(
			[WORK, CARRY, MOVE, MOVE],
			newName,
			{
				memory: {
					role: "harvester",
					targetRoom: room.name,
					homeRoom: room.name,
				},
			}
		);
		//console.log('Spawning harvester:', room, result)
		if (result == OK) {
			console.log(room + ' spawning harvester: ' + newName)
			//room.memory.creepcount.roomHarvesters = room.memory.creepcount.roomHarvesters + 1;
			return;
		}
	}


	if (Game.flags.Bootup) {
		// 	creep.memory.targetRoom = Game.flags.Bootup.pos.roomName;

		// }
		///DRONE BOOTUP
		if (cLevel > 5 && roomDrones < droneMax * 2) {
			let newName = "D-" + makeid(2); //Game.time;
			let result = spawns[0].spawnCreep(
				getBody([WORK, CARRY, MOVE, MOVE], room),
				newName,
				{
					memory: {
						role: "drone",
						targetRoom: Game.flags.Bootup.pos.roomName,
						homeRoom: room.name,
						task: '',
					},
				}
			);
			//console.log('Spawning harvester:', room, result)
			if (result == OK) {
				console.log(room + 'spawning DRONE: ' + newName)
				return;
			}
		}
	}
	///DRONE
	if (roomDrones < droneMax && roomHarvesters) {
		let newName = "D-" + makeid(2); //Game.time;
		let result = spawns[0].spawnCreep(
			getBody([WORK, CARRY, MOVE, MOVE], room),
			newName,
			{
				memory: {
					role: "drone",
					targetRoom: room.name,
					homeRoom: room.name,
					task: '',
				},
			}
		);
		//console.log('Spawning harvester:', room, result)
		if (result == OK) {
			console.log(room + 'spawning DRONE: ' + newName)
			return;
		}
	}
	//SCOUTS
	if (roomScouts < scoutMax && cLevel > 3) {
		let newName = "S-" + room.name//makeid(2); //Game.time;
		let result = spawns[0].spawnCreep(
			[MOVE],
			newName,
			{
				memory: {
					role: "scout",
					targetRoom: room.name,
					homeRoom: room.name,
				},
			}
		);
		//console.log('Spawning harvester:', room, result)
		if (result == OK) {
			console.log(room + 'spawning SCOUT: ' + newName)
			//room.memory.creepcount.roomHarvesters = room.memory.creepcount.roomHarvesters + 1;
			return;
		}
	}
	/// EnergyMiner  emMax em
	//  	let minerMax = room.memory.creepcount.creepMax.minerMax;
	if (roomMiners < minerMax && cLevel > 1) {
		let minerSource_0 = _.sum(Game.creeps, (c) => c.memory.mineTarget == "source_0" && c.room.name === room.name);
		let minerSource_1 = '';

		if (!minerSource_0) {
			let sourceID = room.memory.resources.energy.source_0
			var newName = "M00" + room.name// + makeid(2);
			let result = spawns[0].spawnCreep(
				[WORK, WORK, WORK, WORK, WORK, MOVE],
				newName,
				{
					memory: {
						role: "miner",
						source: sourceID,
						targetRoom: room.name,
						homeRoom: spawns[0].room.name,
						task: 'StripMine',
						mineTarget: 'source_0',
					},
				}
			);
			//console.log('Spawning energyMiner:', room,source, result)
			if (result == OK) {
				console.log(room + 'spawning MINER 00: ' + newName)
				return;
			}
		} else {
			let sourceID = room.memory.resources.energy.source_1
			var newName = "M01" + room.name// + makeid(2);
			let result = spawns[0].spawnCreep(
				[WORK, WORK, WORK, WORK, WORK, MOVE],
				newName,
				{
					memory: {
						role: "miner",
						source: sourceID,
						targetRoom: room.name,
						homeRoom: spawns[0].room.name,
						task: 'StripMine',
						mineTarget: 'source_1',
					},
				}
			);
			//console.log('Spawning energyMiner:', room,source, result)
			if (result == OK) {
				console.log(room + 'spawning MINER 01: ' + newName)
				return;
			}
		}
	} // end miner



	//                          CLAIMER SHIT
	//cLevel > 4
	// if (Memory.NeedToExpand) {
	// 	room.memory.creepcount.creepMax.claimerMax = 1
	// } else {
	// 	room.memory.creepcount.creepMax.claimerMax = 0
	// }
	//	console.log(room.memory.colonizeNext.name.name)
	//	console.log(room.memory.colonizeNext.score)

	if (room.memory.colonizeNext) {
		var claimRoom = room.memory.colonizeNext.name.name //null //
		var roomScore = room.memory.colonizeNext.score;
	}
	///claimer count needs to be global
	// If(cLevel > 4 && claimRoom && roomScore > 5){
	var myLevel = Game.gcl.level;
	//checkMyRoom.length < myLevel
	//console.log(checkMyRoom.length , myLevel)
	// };
	// if (checkMyRoom.length < myLevel && cLevel > 5 && claimRoom && roomScore > 4) {
	// 	//console.log(claimRoom + " : score " + roomScore)
	// 	room.memory.creepcount.creepMax.claimerMax = 1
	// } else {
	// 	room.memory.creepcount.creepMax.claimerMax = 0
	// }

	//	if (!room.controller.my && room.controller.owner === undefined) {

	if (roomClaimers < claimerMax) {
		//var claimRoom =  room.memory.colonizeNext.name.name
		// if (Game.flags.reserve) {
		// 	var claimRoom = Game.flags.reserve.pos.roomName;
		// } else if (Game.flags.claim) {
		// 	var claimRoom = Game.flags.claim.pos.roomName;
		// }
		// console.log("spawning claimer for a room this far away: ", howFarIsIt);
		let newName = "C00-" + room.name//+ makeid(2); //Game.time;
		let result = spawns[0].spawnCreep(getBody([CLAIM, MOVE], room), newName, {
			memory: { role: "claimer", targetRoom: claimRoom, homeRoom: room.name },
		});
		//console.log('Spawning claimer:', room, result)

		if (result == OK) {
			console.log(room.name + " => spawning claimer for =>" + claimRoom + "  :  " + result);
			/// set for room booters drones here
			return;
		}
	}





}

module.exports = spawning;

function getBody(segment, room) {
	let body = [];
	let level = room.controller.level;
	let MaxPartsforCreep = 20//4 * level + level; //4*level;  //32 max with this math. probably should change to 4*level+level.  for a 40 part max at level 8.  50 max because at higher room levels you have so much energy it trys to make like 62 part creeps and game has a 50 cap

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
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function randname() {
	var names = [
		"Dog",
		"Cat",
		"Rat",
		"Hose",
		"Fly",
		"Pig",
		"Hog",
		"Bee",
		"Ant",
		"Ape",
		"Goat",
		"Bear",
		"Crab",
		"Duck",
		"Ass",
		"Cow",
		"Ewe",
		"Sow",
		"Doe",
		"Yak",
		"Tit",
		"Hen",
		"Cob",
		"Pen",
		"Bat",
		"Eel",
		"Cod",
		"Jay",
		"Kit",
		"Kid",
		"Nit",
		"Pup",
		"Emu",
	];
	var colors = [
		"Blue",
		"Green",
		"Red",
		"Yellow",
		"Pink",
		"Purple",
		"Orange",
		"Black",
		"Gray",
		"White",
		"Brown",
	];
	var DisName =
		colors[Math.floor(Math.random() * colors.length)] +
		names[Math.floor(Math.random() * names.length)];
	return DisName;
}

