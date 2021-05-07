var roleMamaBird = {
	/** @param {Creep} creep **/
	run: function (creep) {
		let spawns = creep.room.find(FIND_MY_SPAWNS)
	//	let mamaLoc = spawns[0].pos
	//	let spawns
	//	console.log(spawns[0].pos.x)
		//var gotoBestStorLoc = new RoomPosition(BestStorLoc.x, BestStorLoc.y, creep.memory.targetRoom);
		//console.log(creep.hitsMax)
		if (creep.room.energyAvailable > 250 && creep.hitsMax > 599 && (creep.ticksToLive < 50 || creep.memory.nenew == true)) {
		//	console.log('renew creep name/hps', creep, creep.hitsMax, ' <a href="#!/room/shard1/' + creep.room.name + '">' + creep.room.name + '</a>', creep.room.energyAvailable);
			//console.log(creep.room.energyAvailable)
			creep.say('😵‍💫')
		//	creep.say('🥴😇😵‍💫')
			creep.memory.nenew = true
			// spawns = creep.room.find(FIND_MY_SPAWNS)
			creep.travelTo(spawns[0]);
			spawns[0].renewCreep(creep)
			creep.depSpawns();
			if (creep.ticksToLive > 1000) {
				creep.memory.nenew = false;
			}
		} else {
			creep.memory.nenew = false;

			if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
				creep.memory.working = false;
				//empty
				creep.say("🔴Empty");
			}
			if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
				creep.memory.working = true;
				//full
				creep.say("🟢Full"); // creep.say('🚧 filling');
			}


			//if working start
			if (creep.memory.working) {
				var enemy = creep.room.find(FIND_HOSTILE_CREEPS, {
					filter: function (object) {
						return (
							object.getActiveBodyparts(ATTACK) > 0 ||
							object.getActiveBodyparts(RANGED_ATTACK) > 0 ||
							object.getActiveBodyparts(HEAL) > 0
						);
					},
				});

				// enemy in room fill tower
				if (enemy.length > 0) {
					creep.say("😒");
					var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							return structure.structureType === STRUCTURE_TOWER;
						},
					});
					if (tower != null) {
						creep.depTowers();
					} else {
						if (creep.depTowers() == false) {
							creep.depSpawns();
						}
					}
					// no enemies
				} else {
					// no enemies

					if (creep.depSpawns() == false) {
						if (creep.depTowers() == false) {

							creep.say("💤");
							creep.travelTo(spawns[0]);
							//	let newStorLoc = (storageLoc)
							//creep.travelTo(storageLoc);




						}
					}
				}
			} else {
				//not working
				/// get energy
			//	let haulers = creep.room.memory.creepcount.creepCurrent.haulers;
			//	let energyMiners = creep.room.memory.creepcount.creepCurrent.energyMiners;
	//			let harvesters = creep.room.memory.creepcount.creepCurrent.harvesters;
				if (creep.getStorage() == false) {
					// find storage and stand near it

					if (creep.getContainerEnergy() == false) {
						//	creep.getContainerEnergy()
						creep.getDroppedEnergy()
						//getContHauler
					 if (creep.getContainerEnergy() == false) {
							creep.say("🤔");
							//creep.travelTo(storageLoc);
							creep.travelTo(spawns[0]);
						}

					}



					// wont have work parts

				}
				//	if (creep.getDroppedEnergy() == false) {
				//		creep.getContainerEnergy()
				//	}
			}
		}
	},
};

module.exports = roleMamaBird;

//     Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], 'Ass', {memory: {role: 'hauler', targetRoom:  '', homeRoom: Game.spawns['Spawn1'].room.name}});

function randGreeting(sayThis) {
	var greetings = [
		sayThis,
		"Hello!",
		"Howdy",
		"Sup",
		"Ahoy",
		"Hiya!",
		"Boop",
		"Peep",
		"Be Chill",
		"Super",
		"Uh Oh",
		"RUN",
		"Be nice",
		"Welcome",

	];
	// var colors = ['Blue', 'Green', 'Red', 'Yellow', 'Pink', 'Purple', 'Orange', 'Black', 'Gray', 'White', 'Brown'];
	var DisGreeting = greetings[Math.floor(Math.random() * greetings.length)];
	return DisGreeting;
}



