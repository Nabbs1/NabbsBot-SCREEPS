var NabbsVersion = Memory.NabbsVersion;
var roomDefense = require("rooms.defense");
var spawning = require("rooms.spawning");
var layout = require("rooms.layout");
var mapLib = require("mapLib");
var showVisuals = true;
function myrooms() {

	_.forEach(Game.rooms, function (room) {

		if (room && room.controller && room.controller.my) {
				if (!Memory.MyRooms) {
				Memory.MyRooms = [];
			}

		let flagNameRemoteHarvest = (Game.flags[room.name])
			if (flagNameRemoteHarvest) {
			//	console.log(" flag found in room with name" + flagNameRemoteHarvest)
				room.memory.remoteHarvestRoom = flagNameRemoteHarvest.pos.roomName
				// let cancelRoomConstruction = Game.flags.cancel.pos.roomName;
				// const sites = Game.rooms[cancelRoomConstruction].find(FIND_CONSTRUCTION_SITES);
				// for (const site of sites) { site.remove(); }
				// Game.flags.cancel.remove();
			}
			let spawns = room.find(FIND_MY_SPAWNS)
			if (Game.flags.Bootup) {
//	console.log('==============================>>>>>>>>>>>>>>'+Game.flags.Bootup.room,room.memory.colonize.posX + 3, room.memory.colonize.posY)
	}
		   if (room.memory.colonize && !spawns.length && !Game.flags.Bootup) {
			   room.createFlag(20,20, 'Bootup');
			   console.log('creating flag in ' + room)
			    
				    }

			const RoomLevel = room.controller.level;

			if (RoomLevel > 7) {
				var roomPcent = "MAX"
			} else {
				var roomPcent = Math.round(((room.controller.progress / room.controller.progressTotal) * 100).toFixed(2));
			}

		//	room.memory.creepcount.special.buildStuff = count task

			var myPcent = Math.round(((Game.gcl.progress / Game.gcl.progressTotal) * 100).toFixed(2));
			var myLevel = Game.gcl.level;
			if ((Game.time + 2) % 50 == 0) {
				identifySources(room);
				layout(room);

		//		console.log(room, roomPcent + "% | Level: ", RoomLevel);
			//		console.log(room, roomPcent + "% | Level: ", RoomLevel);
				let saveMyRoom = room.name
				let checkMyRoom = Memory.MyRooms;

				//array.indexOf(newItem) === -1 && array.push(newItem);
				checkMyRoom.indexOf(saveMyRoom) === -1 && checkMyRoom.push(saveMyRoom)
			//	console.log(saveMyRoom)
			
					//: console.log(saveMyRoom);

			}  //

			// array.indexOf(newItem) === -1 ? array.push(newItem) : console.log("This item already exists");
			//or
			//	checkMyRoom.indexOf(saveMyRoom) === -1 && checkMyRoom.push(saveMyRoom)
			// console.log(array)
			
			
			roomDefense(room);

			spawning(room);

			if (showVisuals == true) {

				if (room.storage) {
					let storeUsed = room.storage.store.getUsedCapacity();
					let storeMax = room.storage.store.getCapacity();
					var storPcent = Math.round(((storeUsed / storeMax) * 100).toFixed(2));
					// console.log(storeUsed,storeMax,storPcent,storeUsed/ storeMax)
					room.visual.text(storPcent + "%", room.storage.pos.x, room.storage.pos.y, { font: "bold 1 HELVETICA", align: "center", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.25 });
					//Memory.visLocX,Memory.visLocY+3
				}
				if (room.memory.colonizeNext != undefined) {
					var topScoreName = room.memory.colonizeNext.name
					var topSize = room.memory.colonizeNext.size
					var topDistance = room.memory.colonizeNext.pathDistance
					var scoreActual = topSize - (topDistance * 0.50)
					//	console.log(scoreActual)
					// var actualScore = Spawnvalues[0] - (roomDistancePath.length / 2)
				//	room.visual.text("Expansion Target: " + topScoreName.name + " || size: " + topSize + " || Distance : " + topDistance + ' || SCORE ACTUAL: ' + scoreActual, Memory.visLocX, Memory.visLocY + 3, { align: "left", opacity: 0.5, color: "white", stroke: "black" });
				}
				let spawns = room.find(FIND_MY_SPAWNS);
				if (spawns.length) {
					let checkForNext = mapLib.getNextClaimableRoom(spawns[0]);
					if (checkForNext != undefined) {
						let nextClaimRoom = checkForNext.room_name + ' | spawn area:' + checkForNext.areaToBuild + ' | source spots:' + checkForNext.sourcePoints
						room.visual.text("Next Claim: " + nextClaimRoom, Memory.visLocX, Memory.visLocY + 3, { align: "left", opacity: 0.5, color: "white", stroke: "black" });
					}
				}
			
				//	let totalCreeps = _.sum(Game.creeps, (c) =>  c.memory.homeRoom === room.name);
				room.visual.text("GCL: " + myLevel + " 🦄 " + myPcent + "% ", 46, 2, { font: "bold 1.5 HELVETICA", align: "right", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.25 });

				//let RoomLevel = room.controller.level + ' [ L' + room.memory.RCL + ' ] '
				//let roomPcent = Math.round(((room.controller.progress / room.controller.progressTotal) * 100).toFixed(2));

				room.visual.text(NabbsVersion, Memory.visLocX, Memory.visLocY - 1, { font: "bold 1.5 HELVETICA", align: "left", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.25 });
				room.visual.text(room.name + " : TotalCreeps: " + _.size(Game.creeps), Memory.visLocX, Memory.visLocY, { font: "bold 1 HELVETICA", align: "left", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.25 });
				room.visual.text("Lvl: " + RoomLevel + " 🦄 " + roomPcent + "% ", Memory.visLocX, Memory.visLocY + 1, { font: "bold 1 HELVETICA", align: "left", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.25 });
				room.visual.text(room.energyAvailable + " / " + room.energyCapacityAvailable, Memory.visLocX, Memory.visLocY + 2, { font: "bold 1 HELVETICA", align: "left", opacity: 1, color: "white", stroke: "black", strokeWidth: 0.25 });

				//	 '<span style="color: #00FF00;font-weight: bold;">' +scoreActual
				//		room.visual.text("Total Creeps: "+totalCreeps , Memory.visLocX, Memory.visLocY + 3, { align: "left", opacity: 0.5, color: "white", stroke: "black" });
				let sources = room.find(FIND_SOURCES);
				if (sources.length) {
					_.forEach(sources, function (source) {
						if (!source.ticksToRegeneration) {
							var TTR = "FULL"
						} else {
							var TTR = source.ticksToRegeneration
						}
						room.visual.text(source.energy + " : " + TTR + " ", source.pos.x, source.pos.y + 1, { align: "left", opacity: 0.8, stroke: "black", font: ".5" });
					});
				}

			}
		}








	});

};


module.exports = myrooms;

function identifySources(room) {

	if (!room.memory.resources) {
		room.memory.resources = {};
		room.memory.resources.energy = {};
	}
		var allSources = room.find(FIND_SOURCES);
		for (var source of allSources) {
			var id = source.id;
			let sourceIndex = 'source_' + allSources.indexOf(source);
			//console.log('source_' + allSources.indexOf(source), ' : ', id);
			room.memory.resources.energy[sourceIndex] = id
			//	console.log('setting source in room memory - ' + allSources.indexOf(source), ' : ', id)
			//console.log(allSources.indexOf(source),' : ',id); // 0
			// save the ID somewhere
		}

	}

function sellMarketOrder(room) {
	// Terminal trade execution
	if (room.terminal && Game.time % 10 == 0) {
		if (
			room.terminal.store[RESOURCE_ENERGY] >= 2000 &&
			room.terminal.store[RESOURCE_HYDROGEN] >= 2000
		) {
			var orders = Game.market.getAllOrders(
				(order) =>
					order.resourceType == RESOURCE_HYDROGEN &&
					order.type == ORDER_BUY &&
					Game.market.calcTransactionCost(
						200,
						room.name,
						order.roomName
					) < 400
			);
			console.log("Hydrogen buy orders found: " + orders.length);
			orders.sort(function (a, b) {
				return b.price - a.price;
			});
			console.log("Best price: " + orders[0].price);
			if (orders[0].price > 0.200) {
				var result = Game.market.deal(orders[0].id, 200, room.name);
				if (result == 0) {
					console.log("Order completed successfully");
				} else {
					console.log(result)
				}
			}
		}
	}
}