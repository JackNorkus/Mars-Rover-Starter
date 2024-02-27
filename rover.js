class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let commandsArray = message.commands;
      let resultsArray = [];

      commandsArray.forEach(command => { //looked up "how to access an objects properties in an array in JavaScript on Google"
         if (command.commandType == 'MOVE') {
            if (this.mode == 'NORMAL') {
               this.position = command.value;
               resultsArray.push({completed: true});
            } else {
               resultsArray.push({completed: false});
            }
         }

         if (command.commandType == 'STATUS_CHECK') {
            resultsArray.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         }

         if (command.commandType == 'MODE_CHANGE') {
            this.mode = command.value;
            resultsArray.push({completed: true});
         }
      });

      let receiveMessageObject = {
         message: message.name,
         results: resultsArray
      };
      console.log(commandsArray) // get rid of this line when done
      return receiveMessageObject;
   }
}

module.exports = Rover;