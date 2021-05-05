function roomDefense(room) {
	const droneTarget = room.find(FIND_HOSTILE_CREEPS, {
		filter: function (object) {
			return (
				object.getActiveBodyparts(ATTACK) > 0 ||
				object.getActiveBodyparts(RANGED_ATTACK) > 0 ||
				object.getActiveBodyparts(HEAL) > 0
			);
		},
	});
	// if (droneTarget.length > 0) {
	// 	room.memory.creepcount.droneMax = droneTarget.length;
	// } else {
	// 	room.memory.creepcount.droneMax = 0;
	// }

	var towers = room.find(FIND_MY_STRUCTURES, {
		filter: { structureType: STRUCTURE_TOWER },
	});
	if (towers.length) {
		_.forEach(towers, function (tower) {
			const targets = tower.room.find(FIND_HOSTILE_CREEPS, {
				filter: function (object) {
					return (
						object.getActiveBodyparts(ATTACK) > 0 ||
						object.getActiveBodyparts(RANGED_ATTACK) > 0 ||
						object.getActiveBodyparts(HEAL) > 0 ||
						object.getActiveBodyparts(MOVE) > 0 ||
						object.getActiveBodyparts(CARRY) > 0
					);
				},
			});
			if (targets.length) {
				// // console.log("=============> TARGETS WITH ATTACK PARTS:", targets);

				var closestHostile = tower.pos.findClosestByRange(targets); //FIND_HOSTILE_CREEPS
				if (closestHostile) {
					let username = closestHostile.owner.username; //hostiles[0].owner.username;
					let roomName = tower.room.name;
					let saveTheName =
						username + " : " + closestHostile + " : " + roomName;
					let checkThis = Memory.EnemiesSighted;
					checkThis.indexOf(saveTheName) === -1
						? checkThis.push(saveTheName)
						://// // // console.log("This item already exists");
						// add filter for hotile parts here

						// spawns = _.filter(spawns, { filter: (structure) => structure.spawning})
						//below doesnt work because closest hostile cant be filtered as its only one .. closest duh
						//let hostileAttackers = (closestHostile, { filter: (s) => ( s.getActiveBodyparts(ATTACK) > 0  || s.getActiveBodyparts(RANGED_ATTACK) > 0)});
						// var hostileAttackers = tower.room.find(FIND_HOSTILE_CREEPS, { filter: (s) => ( s.getActiveBodyparts(ATTACK) > 0  || s.getActiveBodyparts(RANGED_ATTACK) > 0) });

						//// // console.log('test ataack stuff:',hostileAttackers.name,closestHostile)
						tower.room.visual.text("WARNING", 24, 20, {
							align: "left",
							opacity: 1.0,
						});
					tower.attack(closestHostile);
				}

			}

			var cLevel = room.controller.level;
			var closestDamagedStructure = tower.room
				.find(FIND_STRUCTURES, {
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
			var closestDamagedWall = tower.room
				.find(FIND_STRUCTURES, {
					filter: (wall) => {
						return (
							wall.hits < 50000 * cLevel &&
							(wall.structureType == STRUCTURE_WALL ||
								wall.structureType == STRUCTURE_RAMPART)
						);
					},
				})
				.sort(function (a, b) {
					//return ( f.hits < (f.hitsMax*.01) && (f.structureType==STRUCTURE_WALL || f.structureType==STRUCTURE_RAMPART) )}}).sort( function( a, b ) {

					return +a.hits - +b.hits;
				})[0];

			//   var closestDamagedStructure = tower.pos.findClosestByRange( FIND_STRUCTURES, {filter: ( structure ) => structure.hits < structure.hitsMax});
			//// // console.log(closestDamagedStructure,closestDamagedWall)

			if (closestDamagedStructure && !closestHostile) {
				if (tower.energy > tower.energyCapacity * 0.5) {
					//*.60
					// // console.log('tower repair: ' + closestDamagedStructure.structureType + ' : ' + ((closestDamagedStructure.hits / closestDamagedStructure.hitsMax) * 100).toFixed(2) + '%');
					tower.repair(closestDamagedStructure);
				}
			} else if (closestDamagedWall && !closestHostile) {
				if (tower.energy > tower.energyCapacity * 0.5) {
					// // console.log('tower repair: ' + closestDamagedWall.structureType + ' : ' + ((closestDamagedWall.hits / closestDamagedWall.hitsMax) * 100).toFixed(2) + '%');
					tower.repair(closestDamagedWall);
				}
				//tower.repair(closestDamagedWall);
			}
		});
	}
}

module.exports = roomDefense;
