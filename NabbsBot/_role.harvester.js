var mapLib = require('mapLib');
var roleHarvester = {
	/** @param {Creep} creep **/
	run: function (creep) {
		const startCpu = Game.cpu.getUsed();
		const roomMamabirds = _(Memory.creeps).filter({ role: 'mamabird', homeRoom: creep.room.name }).size();
		const creepsHomeRoom = creep.memory.homeRoom;
		const creepsTargetRoom = creep.memory.targetRoom;
		if (creep.memory.working === undefined) creep.memory.working = false;

		if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
			creep.memory.working = false;
			creep.say('🔴Empty');
			creep.memory.task = 'get energy';
		}

		if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
			creep.memory.working = true;
			creep.say('🟢Full');
			creep.memory.task = 'spend energy';
		}

		//=================================================//
		if (creep.memory.working) {
			if (creepsHomeRoom && creepsHomeRoom != creep.room.name) {
				let goHere = new RoomPosition(25, 25, creepsHomeRoom);
				creep.travelTo(goHere, { offroad: true, ensurePath: true, reusePath: 10 });
				//creep.travelToRoom(creepsTargetRoom);
				//  console.log(creep, creepsTargetRoom)
				// if (creep.pos.x || creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
				//     creep.travelTo(new RoomPosition(25, 25, creep.memory.creepsTargetRoom, { offroad: true, ensurePath: true, reusePath: 50}));
				// }
			} else {
				if (roomMamabirds.length != 0) {
					if (creep.depStorage() == false) {
						creep.say('🚬💤');
					}
				} else {
					if (creep.depSpawns() == false) {
						if (creep.depStorage() == false) {
							creep.say('🚬💤');
						}
					}
				}
			}
		} else {
			// creep.suicide()
			if (creepsHomeRoom && creepsHomeRoom != creep.room.name) {
				creep.harvestEnergy();
			} else {
				let energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 3);

				if (energy.length != 0 && energy[0].resourceType == RESOURCE_ENERGY && energy[0].amount > 20) {
					//console.log('Picking up energy');
					if (creep.pickup(energy[0]) != OK) {
						creep.travelTo(energy[0], { maxRooms: 1 });
					}
				} else {
					if (creep.getContainerEnergy() == false) {
						creep.harvestEnergy();
					}
				}
			}
		}
	},
};

module.exports = roleHarvester;
