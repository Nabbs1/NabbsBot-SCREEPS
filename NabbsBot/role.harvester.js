var mapLib = require('mapLib');
var roleHarvester = {
	/// Simple state machine here so if doing upgrade it doesnt have to iterate and fail every task before ...
	//  Needs to have 3 get energy states and 3 spend energy states
	//  get dropped, get container, get source // dep spawns // dep tower // dep storage
	// no upgrades

	/** @param {Creep} creep **/
	run: function (creep) {
		const startCpu = Game.cpu.getUsed();

		// var hauler = _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler');
		//creep.store[RESOURCE_ENERGY] === 0
		if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
			creep.memory.working = false;
			//empty
			creep.say('🔴Empty');
			creep.memory.helperTarget = '';
		}
		if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
			creep.memory.working = true;
			//full
			creep.say('🟢Full'); // creep.say('🚧 filling');
			creep.memory.targetContainerId = null;
		}
		//if working start
		if (creep.memory.working) {
			/// Simple state machine here so if doing upgrade it doesnt have to iterate and fail every task before ...
			if (creep.depSpawns() == false) {
				//	if (creep.depTowers() == false) {
				if (creep.depStorage() == false) {
					creep.say('🚬💤');
				}
				//	}
			}
		} else {
			// creep.suicide()
			if (creep.getDroppedEnergy() == false) {
				if (creep.getContainerEnergy() == false) {
					creep.harvestEnergy();
				}
			}
		}

		let thismessage = '<span style="color: #FFFFFF; font - weight: bold; "> ::::: ' + creep.room;
		//          identifyProblem(startCpu, creep, thismessage);
	},
};

module.exports = roleHarvester;

function identifyProblem(startCpu, creep, thismessage) {
	const elapsed = Game.cpu.getUsed() - startCpu;
	if (elapsed > 0.5) {
		creep.say('H' + elapsed.toFixed(4));
		if (elapsed > 10) {
			console.log(
				'========><span style="color: #FF0000;font-weight: bold;">Creep ' +
					creep +
					' has used ' +
					elapsed.toFixed(4) +
					' CPU time:  Task = ' +
					creep.memory.task +
					thismessage
			); //red
		} else {
			// console.log('========><span style="color: #00FF00;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed.toFixed(4) + ' CPU time:  Task = ' + creep.memory.task + thismessage); //green
		}
	}
}
