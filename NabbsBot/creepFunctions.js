//REFACTOR AND CLEAN THIS FILE

// usage
// creep.travelToRoom('roomname')
Creep.prototype.travelToRoom = function travelToRoom(roomName) {
	this.travelTo(new RoomPosition(25, 25, roomName));
};

// creep.harvestEnergy()
Creep.prototype.harvestEnergy = function harvestEnergy() {
	let storedSource = Game.getObjectById(this.memory.source);
	if (!storedSource || (!storedSource.pos.getOpenPositions().length && !this.pos.isNearTo(storedSource))) {
		delete this.memory.source;
		let stuffNthings = "didnt have source in memory or didnt have open positions left"
		storedSource = this.findEnergySource(stuffNthings);
	}

	if (storedSource && storedSource.energy > 0) {
		if (this.pos.isNearTo(storedSource)) {
			this.harvest(storedSource);
		} else {
			this.travelTo(storedSource);
		}
	} else {
		
		delete this.memory.source;
		let stuffNthings = "else - no energy in original source"
		storedSource = this.findEnergySource(stuffNthings);
	}
};

Creep.prototype.findEnergySource = function (stuffNthings) {
	let reasonFor = stuffNthings || "none"
	let source = Game.getObjectById(this.memory.source);

	if (!source) {
		let sources = this.room.find(FIND_SOURCES);
		if (sources.length) {
			source = _.find(sources, function (s) {
				////console.log('findEnergySource:  ' , s.energy, s.pos, s.pos.getOpenPositions())
				return s.pos.getOpenPositions().length > 0 && s.energy > 0;
			});
		}
	}
	if (source) {
	//	//console.log('found new source: ', source.id, ' : ', source.energy+'<span style="color: #00FF00;font-weight: bold;"> ::: reason: '+reasonFor)
		this.memory.source = source.id;

		return source;
	}
};
// end findEnergySource




createRoads = function createRoads(Flag1, Flag2) {
	//function createRoads(Flag1, Flag2){
	// if (Game.flags.Flag1 && Game.flags.Flag2){
	// //console.log('===================flag test', Flag1.pos.x, Flag1.pos.y)
	if (!Flag1.room) {
		//console.log("Flag1 room not visible : DELETING FLAG1");
		Flag1.remove();
	} else if (!Flag2.room) {
		//console.log("Flag2 room not visible : DELETING FLAG2");
		Flag2.remove();
	} else {
		var path = Flag1.pos.findPathTo(Flag2.pos, { ignoreCreeps: true });
		//console.log("path: ", path);
		for (var i = 0; i < path.length; i++) {
			console.log(
				"Building Road in ",
				Flag1.room,
				path[i].x,
				path[i].y,
				path[i]
			);
			Flag1.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD); //works
			//createConstructionSite(10, 15, STRUCTURE_ROAD);

			//const sites = Game.rooms['W43N39'].find(FIND_CONSTRUCTION_SITES); for (const site of sites) { site.remove(); }
		}
		Flag1.remove();
		Flag2.remove();
	}
	////console.log(path)
};
// end createRoads









// functions for all creeps getting and dropping energy

// functions for all creeps getting and dropping energy

// functions for all creeps getting and dropping energy


////  DEPOSIT INTO STORAGE STOR
Creep.prototype.depStorage = function depStorage() {
	let storage = this.room.storage;
	if (storage) {
		if (this.pos.isNearTo(storage)) {
			this.transfer(storage, RESOURCE_ENERGY);
		} else {
			this.travelTo(storage);
		}
	} else {
		return false;
	}
	return true;
};

Creep.prototype.depSpawns = function depSpawns() {
	let spawnOrExtentions = this.room.find(FIND_MY_STRUCTURES);
	spawnOrExtentions = _.filter(spawnOrExtentions, function (struct) {
		return (
			(struct.structureType == STRUCTURE_EXTENSION ||
				struct.structureType == STRUCTURE_SPAWN) &&
			struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0
		);
	});
	if (spawnOrExtentions.length) {
		let energytarget = this.pos.findClosestByRange(spawnOrExtentions);
		if (this.pos.isNearTo(energytarget)) {
			this.transfer(energytarget, RESOURCE_ENERGY);
		} else {
			this.travelTo(energytarget);  //, {				visualizePathStyle: { stroke: "#ffffff", opacity: 0.9 }});
		
		}
	} else {
		return false;
	}
};

Creep.prototype.depTowers = function depTowers() {
	let towers = this.room.find(FIND_MY_STRUCTURES);
	towers = _.filter(towers, function (struct) {
		return (
			struct.structureType == STRUCTURE_TOWER &&
			struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0
		);
	});
	if (towers.length) {
		let energytarget = towers[0];//this.pos.findClosestByRange(towers);
		if (this.pos.isNearTo(energytarget)) {
			this.transfer(energytarget, RESOURCE_ENERGY);
		} else {
			this.travelTo(energytarget); //, {				visualizePathStyle: { stroke: "#ffffff", opacity: 0.9 },	});
		}
	} else {
		return false;
	}
};

//// get from storage
Creep.prototype.getStorage = function getStorage() {
	let storage = this.room.storage;
	if (!storage) {
		// //console.log('getStorage() false')
		return false;
	}
	if (storage && storage.store[RESOURCE_ENERGY] > 0) {
		//this.store.getFreeCapacity()	) {
		// //console.log('STORAGE retrieve',this.room,this,this.room.storage.store[RESOURCE_ENERGY])
		if (this.pos.isNearTo(storage)) {
			this.withdraw(storage, RESOURCE_ENERGY);
		} else {
			this.travelTo(storage);  //, { visualizePathStyle: { stroke: "#ffffff" } });
		}
	} else {
		return false;
	}
};

//GET DROPPED//getDroppedEnergy
Creep.prototype.getDroppedEnergy = function getDroppedEnergy(amountD, rangeD) {
	//run: function(creep,amountD,rangeD) {
	//let amountD = 15; //this.carryCapacity;
	//let rangeD = 15;
	if (!amountD) {
		amountD = this.store.getCapacity();
	} //creep.carryCapacity;}
	if (!rangeD) {
		rangeD = 15;
	}
	var denergy = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
		filter: (denergy) => {
			return denergy.amount >= amountD;
		},
	});
	if (!denergy) {
		////console.log ('GET DROPPED ENERGY FALSE');
		return false;
	}

	if (denergy && this.pos.getRangeTo(denergy) < rangeD) {
		this.say(this.pos.getRangeTo(denergy) + ":" + denergy.amount);
		if (this.pickup(denergy) == ERR_NOT_IN_RANGE) {
			this.travelTo(denergy);
			// this.room.visual.circle(this.pos,{fill: 'transparent', radius: 0.55, stroke: 'red'});
			//creep.say('pickup');
			this.room.visual.line(this.pos, denergy.pos, {
				color: "red",
				lineStyle: "dashed",
			});
			////console.log('pickup:'+denergy.amount);
		}
	} else {
		////console.log ('GET DROPPED ENERGY FALSE');
		return false;
		////console.log ('GET DROPPED ENERGY FALSE');
	}

	return true;
};

///////////////////////////////


//This function looks for containers with energy and if it finds none it searches for ruins and loots them
// removed ruins and made its own function.
Creep.prototype.getContainerEnergy = function getContainerEnergy() {

	var sources = this.room.find(FIND_STRUCTURES, {
		filter: (structure) => {
		    return (structure.structureType == STRUCTURE_CONTAINER);
		}
	  });
	  var maxAmount = -1;
	  var maxSource = null;
	  var maxRange = 100;
	  for (var i = 0; i < sources.length; i++) {
		if (sources[i].store[RESOURCE_ENERGY] >= maxAmount) {
		    var range = this.pos.getRangeTo(sources[i]);
		    if (sources[i].store[RESOURCE_ENERGY] > maxAmount || range < maxRange) {
		    maxAmount = sources[i].store[RESOURCE_ENERGY];
		    maxSource = sources[i];
		    maxRange = range;
		    }
		}
	  }
	// //console.log(maxAmount);
	if (maxAmount > this.store.getCapacity()) {
	
	if(this.withdraw(maxSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	  this.travelTo(maxSource)
	}





	} else {
		return false;
	}
//	return true;
};





Creep.prototype.buildStuff = function buildStuff() {
	var targets = this.room.find(FIND_CONSTRUCTION_SITES);
	if (targets.length) {
		targets.sort(function (a, b) {
			return a.progress > b.progress ? -1 : 1;
		});
		if (this.build(targets[0]) == ERR_NOT_IN_RANGE) {
			this.travelTo(targets[0], { reusePath: 10 });
		}
	} else {
		return false;
	}
};






Creep.prototype.repairWall = function repairWall() {
	const contLevel = this.room.controller.level;
	let closestDamagedWall = this.room.find(FIND_STRUCTURES, {
		filter: (wall) => {
			return (wall.hits < 50000 * contLevel && (wall.structureType == STRUCTURE_WALL || wall.structureType == STRUCTURE_RAMPART))
		},
	})
		.sort(function (a, b) {
		return +a.hits - +b.hits;
		})[0];
	
	 if (closestDamagedWall.length) {
			if (this.repair(closestDamagedWall[0]) == ERR_NOT_IN_RANGE) {
			this.travelTo(closestDamagedWall[0]);
		}

	} else {
		return false;
	}
};


Creep.prototype.repairStuff = function repairStuff() {
	const contLevel = this.room.controller.level;


	let closestDamagedStructure =  this.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (
					structure.hits < structure.hitsMax &&
					structure.structureType != STRUCTURE_WALL &&
					structure.structureType != STRUCTURE_RAMPART
				);
			},
		})
		.sort(function (a, b) {
			return +a.hits - +b.hits;
		})[0];
////		
		if (closestDamagedStructure.length) {
			if (this.repair(closestDamagedStructure[0]) == ERR_NOT_IN_RANGE) {
				this.travelTo(closestDamagedStructure[0]);
			}
		

	} else {
		return false;
	}
};


Creep.prototype.upCont = function upCont() {
	let cont = this.room.controller;
	if (cont) {
		this.travelTo(cont, { range: '2' });
		this.upgradeController(cont);
		// if (this.pos.isNearTo(cont)) {
		// 	this.upgradeController(cont);
		// } else {
		// 	this.travelTo(cont);
		// 		//this.travelTo(cont, { range: '2' });
		// }
	} else {
		return false;
	}
	return true;
};


// // this could possibly work for dropped resources as well
// const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
// if(hostiles.length > 0) {
//     creep.say('OMG!😨');
//     creep.moveTo(Game.spawns['Spawn1']);
// }
// else {
//     doWork(creep);
// }


// var sources = creep.pos.findClosestByPath(FIND_STRUCTURES, 
// 	{filter: (s) => {return (s.structureType == STRUCTURE_CONTAINER && 
// 	 s.store[RESOURCE_ENERGY] >= 150)
// 	}});
// 	sources.sort(function(a, b)  {return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]});

