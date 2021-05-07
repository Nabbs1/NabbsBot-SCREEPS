var roleDrone = {
    //REDO STATE MACHINE
        
        /** @param {Creep} creep **/
        run: function (creep) {
            const startCpu = Game.cpu.getUsed();
        const creepsHomeRoom = creep.memory.homeRoom;
        const creepsTargetRoom = creep.memory.targetRoom;
            const Miners = _(Memory.creeps).filter({ role: 'miner', homeRoom: creep.room.name }).size();
            const roomMamabirds = _(Memory.creeps).filter({ role: 'mamabird', homeRoom: creep.room.name }).size();
            const upgradeTaskSet = _(Memory.creeps).filter({ task: 'upgradeController', homeRoom: creep.room.name }).size();
        const buildTaskSet = _(Memory.creeps).filter({ task: 'buildStuff', homeRoom: creep.room.name }).size();
      //  const buildTaskSet = _(Memory.creeps).filter({ task: 'buildStuff', homeRoom: creep.room.name }).size();
      //  let thisRoomEnergy =  room.energyCapacityAvailable - room.energyAvailable
     //   create a task when created to fill with energy before doing anything else  /creep.say('🚧 filling');
    
            // if yo dumass stuck at border MOVE
            if (creep.pos.x * creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
                creep.travelTo(new RoomPosition(25, 25, creep.memory.targetRoom));
            }
    
            ///const targetRoom = creep.memory.targetRoom
            //creep.memory.homeRoom =  creep.room.name
            if (Game.flags.Bootup && Game.flags.Bootup.pos.roomName == creep.room.name) {
                let spawns = creep.room.find(FIND_MY_SPAWNS);
                //   console.log("spawn not build yet")
                if (spawns[0] != undefined) {
                    console.log("spawn construction completed, removing Bootup flag")
                    Game.flags.Bootup.remove();
                    creep.room.memory.mode = "normal"
                }
            }
            
            if (creepsTargetRoom && creepsTargetRoom != creep.room.name) {
                let goHere = new RoomPosition(25, 25, creepsTargetRoom);
                creep.travelTo(goHere, { offroad: true, ensurePath: true, reusePath: 50 });
                //creep.travelToRoom(creepsTargetRoom);
                //  console.log(creep, creepsTargetRoom)
                // if (creep.pos.x || creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
                //     creep.travelTo(new RoomPosition(25, 25, creep.memory.creepsTargetRoom, { offroad: true, ensurePath: true, reusePath: 50}));
                // }
            } else {
    
            
                ///  tank check
            
                // working == full
                if (creep.memory.working === undefined) creep.memory.working = false;
    
                if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
                    creep.memory.working = false;
                    creep.say('🔴Empty');
                    creep.memory.task = 'getDropped';
                }
                if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
                    creep.memory.working = true;
                    creep.say('🟢Full');
                    // creep.say('🚧 filling');
                    //  creep.memory.targetContainerId = null;
                    // if (creep.memory.task == 'getDropped') {
                    //     creep.memory.task = 'depStorage';
                    // } else {
                    creep.memory.task = 'depositSpawns';
                    // }        
                }
    
                //state machine
                // if (creep.store.getFreeCapacity() >= 20) {
                
                //     var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 3);
    
                //     //if(dumpTar != undefined) console.log(`dumpTar.store.energy(${dumpTar.store.energy}) > dumpTar.energyCapacity(${dumpTar.storeCapacity}) - 200`);
                //     if (energy.length != 0 && energy[0].resourceType == RESOURCE_ENERGY && energy[0].amount > 20) {
                //         //console.log('Picking up energy');
                //         if (creep.pickup(energy[0]) != OK) {
                //             creep.moveTo(energy[0]);
                //         }
                //     }
    
                // }
                // Pickup really close dropped?
                // get container
                // get store     room.energyCapacityAvailable != room.energyAvailable
                // harvest
                const currentTask = creep.memory.task
                switch (currentTask) {
                    case 'depositSpawns':
                    case 'depositTowers':
                        if (!roomMamabirds && creep.room.energyCapacityAvailable != creep.room.energyAvailable) {
                            if (creep.depSpawns() == false) {
                                if (creep.depTowers() == false) {
                                    creep.memory.task = 'construct';
                                    creep.buildStuff();
                                }
                            }
                        } else {
                            creep.memory.task = 'construct';
                            creep.buildStuff();
                        }
                        break;
                    case 'construct':
                        if (!upgradeTaskSet) {
                            creep.memory.task = 'upgradeController';
                            creep.upCont();
                        } else {
                            if (creep.buildStuff() == false) {
                                if (creep.room.store) {
                                    creep.memory.task = 'depStorage';
                                    creep.depStorage();
                                } else {
                                    creep.memory.task = 'upgradeController';
                                    creep.upCont();
                                }
                            }
                        }
                        break;
                    case 'depStorage':
                        if (creep.room.store) {
                            let storeUsed = creep.room.storage.store.getUsedCapacity();
                            // console.log(storeUsed)
                            if (storeUsed > 500000) {
                                creep.memory.task = 'upgradeController';
                                creep.upCont();
                            } else {
                                if (creep.depStorage() == false) {
                                    creep.memory.task = 'upgradeController';
                                    creep.upCont();
                                }
                            }
                        }
                        break;
                    case 'upgradeController':
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.controller, {maxRooms: 1, reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}}); 
                        }
                        // if (creep.upCont() == false) {
                        //     creep.say('🚬💤')
                        // }
                        break;
                    //               GET ENERGY         
                    case 'getDropped':
                        if (creep.getDroppedEnergy() == false) {
                            creep.memory.task = 'getContainer';
                            creep.getContainerEnergy();
                        }
                        break;
                
                    case 'getContainer':
                        if (creep.getContainerEnergy() == false) {
                            if (creep.room.store) {
                                creep.memory.task = 'getStorage';
                                creep.getStorage();
                            } else {
                                creep.memory.task = 'harvestEnergy';
                                creep.harvestEnergy();
                            }
                        }
                        break;
                
                    case 'getStorage':
                        if (creep.room.store) {
                            let storeUsed = creep.room.storage.store.getUsedCapacity();
                            // console.log(storeUsed)
                            if (storeUsed < 100000) {
                                creep.memory.task = 'harvestEnergy';
                                creep.harvestEnergy();
                            } else {
                                if (creep.getStorage() == false) {
                                    creep.memory.task = 'harvestEnergy';
                                    creep.harvestEnergy();
                                }
                            }
                        } else {
                             creep.memory.task = 'harvestEnergy';
                                    creep.harvestEnergy();
                        }
                        break;
                
                    case 'harvestEnergy':
                        if (creep.harvestEnergy() == false) {
                            creep.say('🚬💤')
                            creep.memory.task = 'getDropped';
                            creep.getDroppedEnergy();
                        }
                        break;
                
                    default:
    creep.memory.task = 'getDropped';
                            creep.getDroppedEnergy();
                    // no task found so get dropped
                }
    
       
    
                // let energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                // if (creep.pickup(energy) != OK) {
                //     creep.moveTo(energy);
                // }
      
                let thismessage = '<span style="color: #FFFFFF; font - weight: bold; "> ::::: ' + creep.room
             //   identifyProblem(startCpu, creep, thismessage);
            }
        }
    };
    module.exports = roleDrone;
    
    
    
    function identifyProblem(startCpu, creep, thismessage) {
    
        const elapsed = Game.cpu.getUsed() - startCpu;
        if (elapsed> .5000) {
           // creep.say('DD'+elapsed.toFixed(4))
            if (elapsed > 2) {
                console.log('========><span style="color: #FF0000;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed.toFixed(4) + ' CPU time:  Task = ' + creep.memory.task + thismessage); //red
            } else {
              //  console.log('========><span style="color: #00FF00;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed.toFixed(4) + ' CPU time:  Task = ' + creep.memory.task + thismessage); //green
            }
        }
    }
    
    
    
    
    
    
    // // switch (currentTask) {
    // //     case 'depSpawns':
    // //         if (creep.depSpawns() == false) {
    // //             creep.memory.task = 'depTowers';
    // //             // console.log(creep + " : task depTowers")
    // //         }
    // //         break;
    // //     case 'depTowers':
    // //         if (creep.depTowers() == false) {
    // //             // console.log("dronesRoomCurrent: " + dronesRoomCurrent)
    // //             // if (buildTaskSet < (dronesRoomCurrent *.30) && constructionTargets.length ) {
    // //             creep.memory.task = 'buildStuff';
    // //             // console.log(creep + " : task buildStuff")
    // //             // } else {
    // //             //     creep.memory.task = 'upgrade';
    // //             //    // console.log(creep + " : task upgrade")
    // //             // }
    
    // //         }
    // //         break;
    // //     case 'buildStuff':
    // //         // console.log("buildTaskSet: " + buildTaskSet + " of " + dronesRoomCurrent)
    // //         if (creep.buildStuff() == false) {
    // //             creep.memory.task = 'depStorage';
    // //             // console.log(creep + " : task depStorage")
    // //         }
    // //         break;
    // //     case 'depStorage':
    // //         if (creep.depStorage() == false) {
    // //             creep.memory.task = 'upgrade';
    // //             // console.log(creep + " : task upgrade")
    // //         }
    // //         break;
    // //     case 'upgrade':
    // //         //// console.log(creep, ' - upgrade task found... upgrading')
    // //         if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    // //             creep.moveTo(creep.room.controller, { reusePath: 50, visualizePathStyle: { stroke: '#ffffff' } });
    
    // //         }
    // //         if (creep.signController(creep.room.controller, "Welcome to NabbTech ") == ERR_NOT_IN_RANGE) {
    // //             creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#E500FF' } });
    // //         }
    // //         break;
    // //     default:
           
    // //             creep.memory.task = 'depSpawns';
            
    // //     // if (creep.depSpawns() == false) {
    // //     //     if (creep.depTowers() == false) {
    // //     //         if (creep.buildStuff() == false) {
    // //     //             if (creep.depStorage() == false) {
    // //     //                 creep.memory.task = 'upgrade';
    
    // //     //             }
    // //     //         }
    // //     //     }
    // //     // }
    
    // // }