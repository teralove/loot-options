const Command = require('command');

module.exports = function LootOptions(dispatch) {	
    const command = Command(dispatch);

    command.add(['loots'], (arg) => {
        if (arg === undefined) 
        {
            showCommands();
        }
        else if(['random'].includes(arg.toLowerCase()))     // Random
        {
            let options = {
                roundRobin: true,
                exceptions: true,
                roll: false,
                common: false,
                class: true,
                bindOnPickup: true,
                unk1: 0,
                unk2: 0,
                unk3: 0,
                combat: 0
            };
            setLoot(options);
        }
        else if(['roll'].includes(arg.toLowerCase()))       // Roll
        {
            let options = {
                roundRobin: true,
                exceptions: true,
                roll: true,
                common: false,
                class: true,
                bindOnPickup: true,
                unk1: 0,
                unk2: 0,
                unk3: 0,
                combat: 0
            };
            setLoot(options);
        }
        else if(['ffa'].includes(arg.toLowerCase()))        // FFA
        {
            let options = {
                roundRobin: 0,
                exceptions: 0,
                roll: 0,
                common: 0,
                class: 0,
                bindOnPickup: 0,
                unk1: 0,
                unk2: 0,
                unk3: 0,
                combat: 0
            };
            setLoot(options);
        }
        else 
        {
            command.message('Invalid command');
            showCommands();
        }
    });
    
    function setLoot(options) {
        dispatch.toServer('C_PARTY_LOOTING_METHOD', 1, options);
    }
    
    function showCommands() {
        command.message('Available commands: ');
        command.message('   loots roll - Round Robin with rolling (Default)');
        command.message('   loots random - Round Robin with random distribution');
        command.message('   loots ffa - Free-for-All');
    }
        
}
