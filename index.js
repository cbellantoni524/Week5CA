class Guitar {
    constructor(brand, model){
        this.brand = brand;
        this.model = model;
    }

    describe() {
        return `Guitar Type is: ${this.brand}  ${this.model}.`;
    }
}

class GuitarCase {
    constructor(tuning) {
        this.tuning = tuning;
        this.guitarCases = [];
    }

    addGuitar(guitar) {
        if (guitar instanceof Guitar) {
            this.guitarCases.push(guitar);
        } else {
          throw new Error(` You can only add an instance of a Guitar. Argument is not a guitar: ${guitar}`);
        }
    }

    describe() {
        return `Your guitar case has ${this.guitarCases.length} guitars in it.`;
    }
}

class Menu {
    constructor() {
        this.guitarCases = [];
        this.selectedGuitarCase = null;
    }

    start() {
        let selection  = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createGuitarCase();
                    break;
                case '2':
                    this.viewGuitarCase();
                    break;
                case '3':
                    this.displayGuitarCases();
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create Guitar Case
        2) view Guitar Case
        3) display Guitar Cases
        `);
    }

    showGuitarCaseMenu(guitarInfo) {
        return prompt(`
        0) back
        1) Add Guitar
        2) Delete Guitar
        ${guitarInfo}
        `);
    }
    
    viewGuitarCase() {
        let index = prompt('Enter the index of the Guitar Case you wish to view:');
        if (index > -1 && index < this.guitarCases.length) {
            this.selectedGuitarCase = this.guitarCases[index];
            let description = 'Guitar Case: ' + this.selectedGuitarCase.tuning + '\n';

            for (let i = 0; i < this.selectedGuitarCase.guitarCases.length; i++) {
                description += i + ') ' + this.selectedGuitarCase.guitarCases[i].brand 
                  + ' - ' + this.selectedGuitarCase.guitarCases[i].model + '\n';
            }

            let selection = this.showGuitarCaseMenu(description);
            switch (selection) {
                case '1':
                    this.addGuitar();
                    break;
                case '2':
                    this.deleteGuitar();
            }
        }
    }

    createGuitarCase() {
        let tuning = prompt('Enter the tuning for the guitars you want in your case:');
        this.guitarCases.push(new GuitarCase(tuning));
    }

    addGuitar() {
        let brand = prompt('Enter Guitar Brand: ');
        let model = prompt('Enter Guitar Model: ');
        this.selectedGuitarCase.guitarCases.push(new Guitar(brand, model));
    }

    deleteGuitar() {
        let index = prompt('Enter the index of the guitar you wish to delete:');
        if (index > -1 && index < this.selectedGuitarCase.guitarCases.length) {
            this.selectedGuitarCase.guitarCases.splice(index, 1);
        }
    }    

    displayGuitarCases() {
        let tuningString = '';
        for (let i = 0; i < this.guitarCases.length; i++) {
        tuningString += i + ') ' + this.guitarCases[i].tuning + '\n';
        }
        alert(tuningString); 
        }
}

let menu = new Menu();
menu.start();

