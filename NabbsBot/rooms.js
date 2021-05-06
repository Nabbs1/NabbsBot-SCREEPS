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

				console.log(room, roomPcent + "% | Level: ", RoomLevel);
			//		console.log(room, roomPcent + "% | Level: ", RoomLevel);
				let saveMyRoom = room.name
				let checkMyRoom = Memory.MyRooms;


				checkMyRoom.indexOf(saveMyRoom) === -1
					? checkMyRoom.push(saveMyRoom)
					: console.log("Room already saved");

			}
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
					let  nextClaimRoom = checkForNext.room_name+' | spawn area:'+checkForNext.areaToBuild+' | source spots:'+checkForNext.sourcePoints
					     room.visual.text("Next Claim: " + nextClaimRoom, Memory.visLocX, Memory.visLocY + 3, { align: "left", opacity: 0.5, color: "white", stroke: "black" });
			     
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
}
