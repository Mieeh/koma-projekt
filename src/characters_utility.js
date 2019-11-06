var fs = require('browserify-fs');

export function getBaseCharacter(name, initial_max_xp, campaign_name){
    var obj = {
        "name": name,
        "hp": 100,
        "level": 0,
        "xp": 0,
        "max_xp": initial_max_xp,
        "campaign_name": campaign_name,
        "base_stats" : [
            { "strength": 0 },
            { "dexterity": 0 },
            { "constitution": 0 },
            { "intelligence:": 0},
            { "wisdom": 0},
            { "charisma": 0 }
        ],
        "stats":[
            {"name": "Animal Handling", "level": 0, "type": "skill"},
            {"name": "Spanish", "level": 0, "type": "language"},
            {"name": "Deutsch", "level": 0, "type": "language"},
            {"name": "Swedish", "level": -1, "type": "language"},
            {"name": "Running", "level": 0, "type": "skill"},
            {"name": "Math", "level": -2, "type": "skill"}
        ],
        "inventory":[
            {"name": "Bread", "desc": "Eatable bread, gives hp and stuff", "type": "Food"},
            {"name": "Sword", "desc": "Sharp sword that could cut warm butter", "type": "Weapon"},
        ]
    };

    return obj;
}

export function getCharactersFromJSON(callback, flagCallback) {

    fs.exists("characters.json", function(exists){
        if(!exists){
            console.log("Create characters.json file!");
            fs.writeFile("characters.json", [], 'utf8', err => {
                if(err) throw err;
            })
        }else{
            console.log("characters.json already created, loading characters");
            fs.readFile("characters.json", 'utf8', function(err, data){
                if(err) throw err;
                callback(JSON.parse(data));
                flagCallback(true);
            });
        }
    });
}

export async function writeCharactersToJSON(characters, flagCallback){
    await fs.writeFile("characters.json", JSON.stringify(characters), 'utf8', err => {
        if(err) throw err;

        flagCallback(true);
    });
}

export function findIndexWithAttribute(array, attr, value){
    for(let i = 0; i < array.length; i++){
        if(array[i][attr] === value){
            return i;
        }
    }
    return -85490; // We failed
}