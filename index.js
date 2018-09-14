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
                methodLoot: 1,
                rareGrade: 1,
                methodRare: 0,
                rareEquipment: false,
                rareClass: true,
                methodBound: 1,
                noCombat: false
            };
            setLoot(options);
        }
        else if(['roll'].includes(arg.toLowerCase()))       // Roll
        {
            let options = {
                methodLoot: 1,
                rareGrade: 1,
                methodRare: 1,
                rareEquipment: false,
                rareClass: true,
                methodBound: 1,
                noCombat: false
            };
            setLoot(options);
        }
        else if(['ffa'].includes(arg.toLowerCase()))        // FFA
        {
            let options = {
                methodLoot: 0,
                rareGrade: 1,
                methodRare: 0,
                rareEquipment: false,
                rareClass: true,
                methodBound: 1,
                noCombat: false
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
