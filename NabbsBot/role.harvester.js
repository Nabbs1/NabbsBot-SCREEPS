var roleHarvester = {

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
            creep.say('🟢Full');// creep.say('🚧 filling');
            creep.memory.targetContainerId = null;

        }
        //if working start
        if (creep.memory.working) {


            if (creep.depSpawns() == false) {
            //    if (creep.depTowers() == false) {
                //    if (creep.depStorage() == false) {
            creep.upCont()
                // if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                //     //  this dont work     creep.travelTo(creep, creep.room.controller, '#b99cfb', true);
                //     creep.travelTo(creep.room.controller, {range: 1});

                //         }
                //     //    if (creep.signController(creep.room.controller, "Welcome to NabbTech ") == ERR_NOT_IN_RANGE) {
                        // creep.travelTo(creep.room.controller)
                   //     }

              //      }
            //    }
            }



        } else {
          // creep.suicide()
            // if (creep.getDroppedEnergy() == false) {
 if (creep.getDroppedEnergy() == false) {
    if (creep.getContainerEnergy() == false) {
           if (creep.getStorage() == false) {
          
                creep.harvestEnergy();
            }
             }
        }
         //   }
            //  }
            // for (var i in hauler) {
            //     if (creep.pos.isNearTo(hauler[i])) {
            //         creep.transfer(hauler[i], RESOURCE_ENERGY)
            //     }
            // }


        }

    //  let thismessage = '<span style="color: #FFFFFF; font - weight: bold; "> ::::: ' + creep.room
    //             identifyProblem(startCpu, creep, thismessage);

    }
};

module.exports = roleHarvester;

function identifyProblem(startCpu, creep, thismessage) {

    const elapsed = Game.cpu.getUsed() - startCpu;
    if (elapsed> .5000) {
        creep.say('H'+elapsed.toFixed(4))
        if (elapsed > 10) {
            console.log('========><span style="color: #FF0000;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed.toFixed(4) + ' CPU time:  Task = ' + creep.memory.task + thismessage); //red
        } else {
            // console.log('========><span style="color: #00FF00;font-weight: bold;">Creep ' + creep + ' has used ' + elapsed.toFixed(4) + ' CPU time:  Task = ' + creep.memory.task + thismessage); //green
        }
    }
}
