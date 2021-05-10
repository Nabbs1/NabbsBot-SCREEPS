let mapLibFunctions = {

    getRoomList:function () {
        if(Memory.roomList) {
            return Memory.roomList;
        } else {
            Memory.roomList = [];
            return Memory.roomList;
        }
    },
    setRoomList:function (roomList) {
        Memory.roomList = roomList;
    },
	addToRoomList: function (roomName, roomClaimable, visited, reachable, enemyControlled) {
        let mapRooms = this.getRoomList();

        if (!mapRooms.some(el => el.name === roomName)) {
			mapRooms.push({
				name: roomName, claimable: roomClaimable
				, reachable: reachable, enemyControlled: enemyControlled, visited: visited
			});
            this.setRoomList(mapRooms);
			console.log("Added " + roomName + " to list as");
        } else {
            return false;
        }
    },
    removeFromRoomList:function (roomName, reason) {
        let mapRooms = this.getRoomList();
        const index = mapRooms.findIndex(obj => obj.name == roomName);
		
        if (index > -1) {
            mapRooms.splice(index, 1);
            this.setRoomList(mapRooms);
            console.log("Removed " + roomName + " from List. Reason: " + reason);
        }
    },
	changeRoomStatus:function (roomName, status, boolean) {
		let mapRooms = this.getRoomList();
        const index = mapRooms.findIndex(obj => obj.name == roomName);

		if (index > -1) {
			console.log("Change status '" + status + "' of room '" + roomName + "' with value '" + boolean + "'");
			switch (status) {
				case 'CLAIMABLE':
					mapRooms[index].claimable = boolean;
					return true;
				case 'VISITED':
					mapRooms[index].visited = boolean;
					return true;
				case 'REACHABLE':
					mapRooms[index].reachable = boolean;
					return true;
				case 'ENEMYCONTROLLED':
					mapRooms[index].enemyControlled = boolean;
					return true;
				default:
					return false;
            }
		} else {
			return false;
		}
		
	},
	checkIfRoomVisited:function (roomName) {
		let mapRooms = this.getRoomList();
        const index = mapRooms.findIndex(obj => obj.name == roomName);
		if (index > -1) {
			return mapRooms[index].visited;
		} else {
			return true;
		}
	},
	getNextUnvisitedRoom:function (creep) {
		let mapRooms = this.getRoomList();
		mapRooms = mapRooms.filter(room => room.visited === false);
		
		mapRooms = mapRooms.sort(function (a, b) {
			let aDistance = Game.map.getRoomLinearDistance(creep.room.name, a.name);
			let bDistance = Game.map.getRoomLinearDistance(creep.room.name, b.name);

            return aDistance - bDistance;
        })

        if (mapRooms.length > 0) {
			console.log("New room '" + mapRooms[0].name + "' selected for creep '" + creep.name + "'")
            return mapRooms[0].name;
        }
	},
	getUnivistedRooms: function () {
		let mapRooms = this.getRoomList();
		return mapRooms.filter(room => room.visited === false);
    },
    getRoomListClaimable:function () {
        let mapRooms = this.getRoomList();
        
        for (let i in Game.rooms) {
            let room = Game.rooms[i];
            if (room.controller !== undefined) {
                if (room.controller.my || room.controller.my !== undefined) {
                    const index = mapRooms.findIndex(map => map.name === room.name);
                    if (index > -1) {
                        mapRooms.splice(index, 1);
                    }
                }
            }
		}
        return mapRooms.filter(room => room.claimable === true);
	},
	getRoomsWithUnbuildSpawn: function () {
		let roomConstruct = [];
		for (let i in Game.rooms) {
			let room = Game.rooms[i];
			if (room.controller !== undefined) {
				if (room.controller.my || room.controller.my !== undefined) {
					var constructSpawn = room.find(FIND_CONSTRUCTION_SITES, {
						filter: (structure) => {
							return structure.structureType === STRUCTURE_SPAWN && structure.my;
						}
					});
					if (constructSpawn.length > 0) {
						if (!roomConstruct.some(el => el.name === room.name)) {
							roomConstruct.push(room);
                        }
                    }
				}
			}
		}
		return roomConstruct;
    },
    getNextClaimableRoom:function (roomName) {
		let claimableRooms = this.getRoomListClaimable();
		let unbuildSpawns = this.getRoomsWithUnbuildSpawn();

        claimableRooms = claimableRooms.sort(function (a, b) {
			let aDistance = Game.map.getRoomLinearDistance(roomName, a.name);
			let bDistance = Game.map.getRoomLinearDistance(roomName, b.name);

            return aDistance - bDistance;
        })

		if (unbuildSpawns.length > 0) {
			return unbuildSpawns[0].name;
        } else if (claimableRooms.length > 0) {
			return claimableRooms[0].name;
		} else {
			return claimableRooms;
		}
    },
    getGCLClaimsAvailable:function () {
        let gcl = Game.gcl.level;
        let roomCount = 0;

        for (let i in Game.rooms) {
            let room = Game.rooms[i];
            if (room.controller !== undefined) {
                if (room.controller.my || room.controller.my !== undefined) {
                    roomCount++;
                }
            }
        }
        return gcl - roomCount;
    },
	mapRoomsAroundStart:function (spawnRoomName) {
		
		let nameArr = this.getRoomNameArray(spawnRoomName);
		
		let directionFirst = nameArr[0]; //W
		let numberFirst = nameArr[1]; //7
		let directionSecond = nameArr[2]; //N
		let numberSecond = nameArr[3]; //3
		
		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 10; y++) {
				if(x === numberFirst && y === numberSecond) {
					continue;
				}
				roomName = directionFirst + x + directionSecond + y;
				this.addToRoomList(roomName, false, false, true, false);
			}
		}
	},
	getRoomNameArray:function (roomName) {
		
		let directionFirst = roomName.charAt(0); //W
		let numberFirst = parseInt(roomName.charAt(1)); //7
		let directionSecond = roomName.charAt(2); //N
		let numberSecond = parseInt(roomName.charAt(3)); //3
		
		if(roomName.length === 5) {
			if(this.isNumericChar(roomName.charAt(1)) && this.isNumericChar(roomName.charAt(2))) {
				numberFirst = parseInt(roomName.charAt(1) + roomName.charAt(2));
				directionSecond = roomName.charAt(3);
				numberSecond = parseInt(roomName.charAt(4));
			} else {
				numberFirst = parseInt(roomName.charAt(1));
				directionSecond = roomName.charAt(2);
				numberSecond = parseInt(roomName.charAt(3) + roomName.charAt(4));
			} 
		} else if (roomName.length === 6) {
			numberFirst = parseInt(roomName.charAt(1) + roomName.charAt(2));
			directionSecond = roomName.charAt(3);
			numberSecond = parseInt(roomName.charAt(4) + roomName.charAt(5));
		}
		
		return [directionFirst,numberFirst,directionSecond,numberSecond];
		
	},
	isNumericChar:function (c) {
		return /\d/.test(c); 
	}
};

module.exports = mapLibFunctions;





// //credit for mapLib goes to Dragonisser
// // https://github.com/Dragonisser/ScreepsAi/blob/refactor_2/mapLib.js
// //const theExits = Game.map.describeExits(room.name)
// // if (!mapLib.addToRoomList(room_dest, true, sourceAccessPoints, sourceAmount)) {
// const C = require('constants');
// const { size } = require('lodash');
// let mapLibFunctions = {
// 	getRoomList: function () {
// 		'use strict';
// 		return Memory.roomList;
// 	},
// 	setRoomList: function (roomList) {
// 		'use strict';
// 		Memory.roomList = roomList;
// 	},
// 	addToRoomList: function (roomName, roomClaimable, sourceAmount, Spawnarea) {
// 		'use strict';

// 		let mapRooms = this.getRoomList();
// 		// console.log('1:',mapRooms.includes(roomName));
// 		// console.log('2:',mapRooms.indexOf(roomName));
// 		// console.log('3:',mapRooms.filter(room_name => mapRooms.room_name === roomName));
// 		// console.log('4:',mapRooms.some(el => el.room_name === roomName));

// 		if (!mapRooms.some((el) => el.room_name === roomName)) {
// 			mapRooms.push({
// 				room_name: roomName,
// 				claim_room: roomClaimable,
// 				numSources: sourceAmount,
// 				areaToBuild: Spawnarea,
// 				lastVisit: Game.time,
// 			});
// 			this.setRoomList(mapRooms);
// 			console.log(
// 				'Added ' +
// 					roomName +
// 					' to list as ' +
// 					(roomClaimable ? 'claimable' : 'not claimable') +
// 					' | areaToBuild:' +
// 					Spawnarea +
// 					' | lastVisit:' +
// 					Game.time
// 			);
// 		} else {
// 			return false;
// 		}
// 	},
// 	removeFromRoomList: function (roomName) {
// 		'use strict';
// 		let mapRooms = this.getRoomList();
// 		const index = mapRooms.indexOf(roomName);
// 		if (index > -1) {
// 			mapRooms.splice(index, 1);
// 			this.setRoomList(mapRooms);
// 			console.log('Removed ' + roomName + ' from List');
// 		}
// 	},
// 	getNextRoom(creep) {
// 		//("use strict");
// 		//TODO Fix getting a new room if border has been reach or rooms around has been mapped already.
// 		//if (!creep.memory.room_dest) {
// 		//let lastRoom = creep.memory.lastRoom;
// 		let lastdir = 0;
// 		if (creep.pos.y === 0) lastdir = C.TOP; //1
// 		if (creep.pos.y === 49) lastdir = C.BOTTOM; //5
// 		if (creep.pos.x === 0) lastdir = C.LEFT; //7
// 		if (creep.pos.x === 49) lastdir = C.RIGHT; //3
// 		// // console.log("test dir: ", lastdir);
// 		// // console.log("test TOP", C.TOP);
// 		const exits = Game.map.describeExits(creep.room.name);
// 		// console.log("exits from MathLib", JSON.stringify(exits)); //{"1":"W6N2","7":"W7N1"}
// 		let dir = 0;
// 		// console.log("test size() : ", size(exits));
// 		while (!exits[dir] || (dir === lastdir && size(exits) > 1)) {
// 			dir = Math.ceil(Math.random() * 8);
// 			//	// console.log(dir);
// 		}
// 		//// console.log("exits from MathLib", JSON.stringify(exits), creep.room.name, exits[dir]);
// 		// creep.memory.room_dest = exits[dir];
// 		let newRoom = exits[dir]; //roomList[Math.floor(Math.random() * roomList.length)];
// 		//	}

// 		// let directionFirst = creep.room.name.charAt(0);
// 		// let directionSecond = creep.room.name.charAt(2);
// 		// let numberFirst = parseInt(creep.room.name.charAt(1));
// 		// let numberSecond = parseInt(creep.room.name.charAt(3));

// 		// let roomNorthName = directionFirst + numberFirst + directionSecond + (numberSecond + 1);
// 		// let roomSouthName = directionFirst + numberFirst + directionSecond + (numberSecond - 1);
// 		// let roomEastName = directionFirst + (numberFirst + 1) + directionSecond + numberSecond;
// 		// let roomWestName = directionFirst + (numberFirst - 1) + directionSecond + numberSecond;

// 		// let mapRooms = this.getRoomList();
// 		// let roomList = [];

// 		// if (!mapRooms.some((el) => el.room_name === roomNorthName)) {
// 		// 	roomList.push(roomNorthName);
// 		// } else if (!mapRooms.some((el) => el.room_name === roomSouthName)) {
// 		// 	roomList.push(roomSouthName);
// 		// } else if (!mapRooms.some((el) => el.room_name === roomEastName)) {
// 		// 	roomList.push(roomEastName);
// 		// } else if (!mapRooms.some((el) => el.room_name === roomWestName)) {
// 		// 	roomList.push(roomWestName);
// 		// }
// 		// let newRoom = roomList[Math.floor(Math.random() * roomList.length)];
// 		// // console.log(mapRooms, JSON.stringify(mapRooms));
// 		creep.memory.lastRoom = creep.room.name;

// 		// console.log(
// 		// "New room '" +
// 		// 	newRoom +
// 		// 	"' selected for creep '" +
// 		// 	creep.name +
// 		// 	"'" +
// 		// 	"  last room: " +
// 		// 	creep.memory.lastRoom
// 		// );

// 		return newRoom;
// 	},
// 	getRoomListClaimable: function () {
// 		let mapRooms = this.getRoomList();

// 		for (let i in Game.rooms) {
// 			let room = Game.rooms[i];
// 			if (room.controller !== undefined) {
// 				if (room.controller.my || room.controller.my !== undefined) {
// 					const index = mapRooms.findIndex((map) => map.room_name === room.name);
// 					if (index > -1) {
// 						mapRooms.splice(index, 1);
// 					}
// 				}
// 			}
// 		}
// 		mapRooms = mapRooms.filter((room) => room.claim_room === true);
// 		return mapRooms;
// 	},
// 	getNextClaimableRoom: function (spawn) {
// 		let claimableRooms = this.getRoomListClaimable();

// 		claimableRooms = claimableRooms.sort(function (a, b) {
// 			let aDistance = Game.map.getRoomLinearDistance(spawn.room.name, a.room_name);
// 			let bDistance = Game.map.getRoomLinearDistance(spawn.room.name, b.room_name);

// 			return aDistance - bDistance;
// 		});

// 		if (claimableRooms.length > 0) {
// 			return claimableRooms[0];
// 		}
// 	},
// 	getGCLClaimsAvailable: function () {
// 		let gcl = Game.gcl.level;
// 		let roomCount = 0;

// 		for (let i in Game.rooms) {
// 			let room = Game.rooms[i];
// 			if (room.controller !== undefined) {
// 				if (room.controller.my || room.controller.my !== undefined) {
// 					roomCount++;
// 				}
// 			}
// 		}
// 		return gcl - roomCount;
// 	},
// };

// module.exports = mapLibFunctions;

// //const theExits = Game.map.describeExits(room.name)
