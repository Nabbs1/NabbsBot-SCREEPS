var roleUpgrader = {
	/// Simple state machine here so if doing upgrade it doesnt have to iterate and fail every task before ...
	//  Needs to have 3 get energy states and 1 spend energy states
	//  get storage / get container / get dropped / harvest

	/** @param {Creep} creep **/
	run: function (creep) {
		if (creep.ticksToLive < 50) {
			creep.say('🥴');
		}
		if (creep.memory.working === undefined) creep.memory.working = false;

		if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
			creep.memory.working = false;
			creep.say('🔴Empty');
			creep.memory.task = 'getStorage';
		}

		if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
			creep.memory.working = true;
			creep.say('🟢Full');
			creep.memory.task = 'upgradeController';
		}

		const currentTask = creep.memory.task;
		switch (currentTask) {
			case 'upgradeController':
				if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.travelTo(creep.room.controller, { maxRooms: 1, reusePath: 10, visualizePathStyle: { stroke: '#ffffff' } });
				} else {
					creep.say('🚬💤');
				}
				break;
			//               GET ENERGY
			case 'getStorage':
				if (creep.room.store) {
					if (creep.getStorage() == false) {
						creep.memory.task = 'getContainer';
						creep.getContainerEnergy();
					}
				} else {
					//set next task no storage found
					creep.memory.task = 'getContainer';
					creep.getContainerEnergy();
				}
				break;
			case 'getContainer':
				if (creep.getContainerEnergy() == false) {
					creep.memory.task = 'getDropped';
				}

				break;
			case 'getDropped':
				var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10);

				if (energy.length != 0 && energy[0].resourceType == RESOURCE_ENERGY && energy[0].amount > 20) {
					//console.log('Picking up energy');
					if (creep.pickup(energy[0]) != OK) {
						creep.moveTo(energy[0]);
					}
				} else {
					creep.memory.task = 'harvestEnergy';
					creep.harvestEnergy();
				}
				break;
			case 'harvestEnergy':
				if (creep.harvestEnergy() == false) {
					creep.say('🚬💤');
					creep.memory.task = 'getStorage';
					creep.getStorage();
				}
				break;

			default:
				creep.memory.task = 'getStorage';
		}
	},
};

module.exports = roleUpgrader;

// case 'getStorage':
//     if (creep.room.store) {
//         let storeUsed = creep.room.storage.store.getUsedCapacity();
//         // console.log(storeUsed)
//         if (storeUsed < 100000) {
//             creep.memory.task = 'harvestEnergy';
//             creep.harvestEnergy();
//         } else {
//             if (creep.getStorage() == false) {
//                 creep.memory.task = 'harvestEnergy';
//                 creep.harvestEnergy();
//             }
//         }
//     } else {
//         creep.memory.task = 'harvestEnergy';
//         creep.harvestEnergy();
//     }
//     break;
// case 'getDropped':
//     if (creep.getDroppedEnergy() == false) {
//         creep.memory.task = 'getContainer';
//         creep.getContainerEnergy();
//     }
//     break;

// case 'getContainer':
//     if (creep.getContainerEnergy() == false) {
//         if (creep.room.store) {
//             creep.memory.task = 'getStorage';
//             creep.getStorage();
//         } else {
//             creep.memory.task = 'harvestEnergy';
//             creep.harvestEnergy();
//         }
//     }
//     break;

// case 'harvestEnergy':
//     if (creep.harvestEnergy() == false) {
//         creep.say('🚬💤')
//         creep.memory.task = 'getDropped';
//         creep.getDroppedEnergy();
//     }
//     break;

// default:
// }

// }
// };

// module.exports = roleUpgrader;
