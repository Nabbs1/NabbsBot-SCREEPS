var roleDrone = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var  startCpu = Game.cpu.getUsed();
        const targetRoom = creep.memory.targetRoom
        //creep.memory.homeRoom =  creep.room.name
        if (Game.flags.Bootup && Game.flags.Bootup.pos.roomName ==  creep.room.name) {
                let spawns = creep.room.find(FIND_MY_SPAWNS);
             //   console.log("spawn not build yet")
                // // console.log(spawns[0])
                if (spawns[0] != undefined) {
                    console.log("spawn construction completed, removing Bootup flag")
                    Game.flags.Bootup.remove();
                    creep.room.memory.mode = "normal"
                }
            }

        if (Game.flags.Bootup && Game.flags.Bootup.pos.roomName == targetRoom && targetRoom !== creep.room.name) {
          
            creep.travelTo(Game.flags.Bootup, { useFindRoute: true, ensurePath: true, range: '2' });
        } else if (targetRoom && targetRoom !== creep.room.name) {
            const goHere = new RoomPosition(25, 25, targetRoom);
            creep.travelTo(goHere, { useFindRoute: true, ensurePath: true, range: '2' });
            //creep.travelToRoom(targetRoom);
            //  console.log(creep, targetRoom)
        } else {

  
            if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
                creep.memory.working = false;
                //empty
                creep.say('🔴Empty');
                creep.memory.helperTarget = '';
                creep.memory.task = 'getDropped';

            }
            if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
                creep.memory.working = true;
                //full
                creep.say('🟢Full');// creep.say('🚧 filling');
                creep.memory.targetContainerId = null;
                creep.memory.task = 'depositSpawns';

            }


            //   let buildTaskSet = _.sum(Game.creeps, (c) => c.memory.task == "buildStuff" && c.room.name === creep.room.name);
            //   let upgradeTaskSet = _.sum(Game.creeps, (c) => c.memory.task == "upgrade" && c.room.name === creep.room.name);
            if (creep.memory.working) {
                
                let roomMamabirds = _.sum(Game.creeps, (c) => c.memory.role == "mamabird"  && c.room.name === creep.room.name);
                let upgradeTaskSet = _.sum(Game.creeps, (c) => c.memory.task == "upgradeController" && c.room.name === creep.room.name);
                // console.log(upgradeTaskSet)
              

                const currentTask = creep.memory.task
                switch (currentTask) {
                    case 'depositSpawns':
                      
                        if (roomMamabirds < 1) {
                            if (creep.depSpawns() == false) {
                                creep.memory.task = 'depositTowers';
                            }

                        } else {
                            creep.memory.task = 'construction';
                        }
                     
                        break;
                    case 'depositTowers':
                        if (creep.depTowers() == false) {
                            creep.memory.task = 'construction';
                        }
                        break;
                    case 'construction':
                        if (creep.buildStuff() == false) {
                            if (upgradeTaskSet !== 0) {
                                creep.memory.task = 'upgradeController';
                            } else {
                                creep.memory.task = 'depStorage';
                            }
                            
                        }
                        break;
                    case 'depStorage':
                        let storeUsed =creep.room.storage.store.getUsedCapacity();
                       // console.log(storeUsed)
                        if (storeUsed > 200000) {
                            creep.memory.task = 'upgradeController';
                        } else {
                            if (creep.depStorage() == false) {
                                creep.memory.task = 'upgradeController';
                            }
                        }
                           
                            break;
                        
                    case 'upgradeController':
                        if (creep.upCont() == false) {
                            creep.say('🚬💤')
                        }
                        break;
                    default:
                        // no task found
                        console.log(creep + " in " + creep.room + " ::: No task assigned so im assigning depositSpawns")
                        creep.memory.task = 'depositSpawns';
                }
            
           


                // if (creep.depTowers() == false) {
                //     if (creep.depSpawns() == false) {
                //         if (creep.buildStuff() == false) {
                //             creep.upCont()
                //         }
                //     }
                // }
            } else {
                //  ELSE NOT WORKING SO EMPTY
                //creep.memory.task = 'harvestEnergy';
                const currentTask = creep.memory.task
                switch (currentTask) {
                    case 'getDropped':
                        if (creep.getDroppedEnergy() == false) {
                            creep.memory.task = 'getContainer';
                        }
                        break;
                    case 'getContainer':
                        if (creep.getContainerEnergy() == false) {
                            creep.memory.task = 'getStorage';
                        }
                  
                        // if (creep.getContainerEnergy() == false) {
                        //     creep.memory.task = 'harvestEnergy';
                        // }
                        break;
                    case 'getStorage':
                        let storeUsed =creep.room.storage.store.getUsedCapacity();
                        // console.log(storeUsed)
                        if (storeUsed < 100000) {
                            creep.memory.task = 'harvestEnergy';
                        } else {
                            if (creep.getStorage() == false) {
                                creep.memory.task = 'harvestEnergy';
                            }
                        }
                       
                        break;
                    case 'harvestEnergy':
                        if (creep.harvestEnergy() == false) {
                            creep.say('🚬💤')
                        }
                        break;
                    default:
                        // no task found
                        console.log(creep + " in " + creep.room + " ::: No task assigned so im assigning getDropped")
                        creep.memory.task = 'getDropped';
                }
            

            }

            let thismessage = '<span style="color: #FFFFFF; font - weight: bold; "> ::::: ' + creep.room
            identifyProblem(startCpu, creep, thismessage);
    


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

 /// const elapsed = Game.cpu.getUsed() - startCpu;
//console.log('========> <span style="color: #00FF00;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed + ' CPU time'); //green









// switch (currentTask) {
//     case 'depSpawns':
//         if (creep.depSpawns() == false) {
//             creep.memory.task = 'depTowers';
//             // console.log(creep + " : task depTowers")
//         }
//         break;
//     case 'depTowers':
//         if (creep.depTowers() == false) {
//             // console.log("dronesRoomCurrent: " + dronesRoomCurrent)
//             // if (buildTaskSet < (dronesRoomCurrent *.30) && constructionTargets.length ) {
//             creep.memory.task = 'buildStuff';
//             // console.log(creep + " : task buildStuff")
//             // } else {
//             //     creep.memory.task = 'upgrade';
//             //    // console.log(creep + " : task upgrade")
//             // }

//         }
//         break;
//     case 'buildStuff':
//         // console.log("buildTaskSet: " + buildTaskSet + " of " + dronesRoomCurrent)
//         if (creep.buildStuff() == false) {
//             creep.memory.task = 'depStorage';
//             // console.log(creep + " : task depStorage")
//         }
//         break;
//     case 'depStorage':
//         if (creep.depStorage() == false) {
//             creep.memory.task = 'upgrade';
//             // console.log(creep + " : task upgrade")
//         }
//         break;
//     case 'upgrade':
//         //// console.log(creep, ' - upgrade task found... upgrading')
//         if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
//             creep.moveTo(creep.room.controller, { reusePath: 50, visualizePathStyle: { stroke: '#ffffff' } });

//         }
//         if (creep.signController(creep.room.controller, "Welcome to NabbTech ") == ERR_NOT_IN_RANGE) {
//             creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#E500FF' } });
//         }
//         break;
//     default:
       
//             creep.memory.task = 'depSpawns';
        
//     // if (creep.depSpawns() == false) {
//     //     if (creep.depTowers() == false) {
//     //         if (creep.buildStuff() == false) {
//     //             if (creep.depStorage() == false) {
//     //                 creep.memory.task = 'upgrade';

//     //             }
//     //         }
//     //     }
//     // }

// }