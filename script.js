document.addEventListener('DOMContentLoaded', function() {
    const popupWrapper = document.getElementById('popup-wrapper');
    const popupContainerWrapper = document.getElementById('popup-container-wrapper');
    const optionsContainer = document.getElementById('dynamic-options-container');
    const addCreatureBtn = document.getElementById('add-creature-btn');
    const gatheringBtn = document.getElementById('gathering-btn');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const resultsTableBody = document.querySelector("#results-table tbody");

    // Form elements for Basic Harvesting
    const creatureSizeInput = document.getElementById('creature-size');
    const survivalModifierInput = document.getElementById('survival-modifier');
    const lookingForInput = document.getElementById('looking-for');
    const specialMaterialsCheckbox = document.getElementById('special-materials');
    const specialMaterialsSection = document.getElementById('special-materials-section');
    const creatureCRInput = document.getElementById('creature-cr');
    const creatureTypeInput = document.getElementById('creature-type');
    const startHarvestingBtn = document.getElementById('start-harvesting-btn');
    const basicHarvestingForm = document.getElementById('basic-harvesting-form');

    //Exotic Harvesting
    const exoticHarvestingForm = document.getElementById('exotic-harvesting-form');
    const creatureTypeInputExotic = document.getElementById('creature-type-exotic');
    const creatureCRInputExotic = document.getElementById('creature-cr-exotic');
    const abilityModifierInputExotic = document.getElementById('ability-modifier-exotic');
    const startExoticHarvestingBtn = document.getElementById('start-exotic-harvesting-btn');

    //Exotic Remnant
    const exoticRemnantForm = document.getElementById('exotic-remnants-form');
    const startExoticRemnantBtn = document.getElementById('start-exotic-remnants-btn');

    // Elementos del formulario de Gathering Reagents
    const gatheringReagentsForm = document.getElementById('gathering-reagents-form');
    const travelingCheckbox = document.getElementById('traveling-checkbox');
    const biomeSelect = document.getElementById('biome-select');
    const wisdomModifierInput = document.getElementById('wisdom-modifier');
    const herbalismProficiencyCheckbox = document.getElementById('herbalism-proficiency');
    const proficiencyBonusInput = document.getElementById('proficiency-bonus');
    const proficiencyBonusSection = document.getElementById('proficiency-bonus-section'); // Asegúrate de tener una sección para el proficiency bonus
    const startGatheringBtn = document.getElementById('start-gathering-btn');

    //Search for Materials
    const gatheringMaterialsForm = document.getElementById('gathering-materials-form');
    const travelingCheckboxMaterials = document.getElementById('traveling-checkbox-materials');
    const biomeSelectMaterials = document.getElementById('biome-select-materials');
    const abilityModifierInputMaterials = document.getElementById('ability-modifier-materials');
    const survivalProficiencyCheckbox = document.getElementById('survival-proficiency');
    const proficiencyBonusInputMaterials = document.getElementById('proficiency-bonus-materials');
    const proficiencyBonusSectionMaterials = document.getElementById('proficiency-bonus-section-materials');
    const startGatheringMaterialsBtn = document.getElementById('start-gathering-materials-btn');

    //Hunting Game
    const huntingGameForm = document.getElementById('hunt-game-form');
    const travelingCheckboxHuntingGame = document.getElementById('traveling-checkbox-hunt');
    const biomeSelecthuntingGame = document.getElementById('biome-select-hunt');
    const abilityModifierInputHuntingGame = document.getElementById('ability-modifier-hunt');
    const survivalProficiencyCheckboxHuntingGame = document.getElementById('survival-proficiency-hunt');
    const proficiencyBonusSectionHuntingGame = document.getElementById('proficiency-bonus-section-hunt');
    const proficiencyBonusHuntingGame = document.getElementById('proficiency-bonus-hunt');
    const startGatheringHuntingGameBtn = document.getElementById('start-hunt-game-btn');

    const gatheringReagentsData = {
        "Forest": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-20", "dc": "10", "result": "common curative reagent"},
            {"range": "21-40", "dc": "10", "result": "common curative reagent"},
            {"range": "41-50", "dc": "10", "result": "common poisonous reagent"},
            {"range": "51-60", "dc": "10", "result": "common reactive reagent"},
            {"range": "61-70", "dc": "10", "result": "1d4 common poisonous reagents"},
            {"range": "71-80", "dc": "10", "result": "1d4 common curative reagents"},
            {"range": "81-90", "dc": "10", "result": "uncommon curative reagent"},
            {"range": "91-95", "dc": "10", "result": "uncommon poisonous reagent"},
            {"range": "96-100", "dc": "10", "result": "common primal essence"}
        ],
        "Desert": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-20", "dc": "10", "result": "-"},
            {"range": "21-40", "dc": "10", "result": "common reactive reagent"},
            {"range": "41-50", "dc": "10", "result": "common curative reagent"},
            {"range": "51-60", "dc": "10", "result": "common poisonous reagent"},
            {"range": "61-70", "dc": "10", "result": "1d2 common reactive reagents"},
            {"range": "71-80", "dc": "10", "result": "1d2 common reactive reagents"},
            {"range": "81-90", "dc": "10", "result": "uncommon reactive reagent"},
            {"range": "91-95", "dc": "10", "result": "uncommon poisonous reagent"},
            {"range": "96-100", "dc": "10", "result": "common arcane essence"}
        ],
        "Grasslands": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-20", "dc": "10", "result": "-"},
            {"range": "21-40", "dc": "10", "result": "common curative reagent"},
            {"range": "41-50", "dc": "10", "result": "common reactive reagent"},
            {"range": "51-60", "dc": "10", "result": "common poisonous reagent"},
            {"range": "61-70", "dc": "10", "result": "1d2 common poisonous reagents"},
            {"range": "71-80", "dc": "10", "result": "1d2 common curative reagents"},
            {"range": "81-90", "dc": "10", "result": "uncommon curative reagent"},
            {"range": "91-95", "dc": "10", "result": "uncommon reactive reagent"},
            {"range": "96-100", "dc": "10", "result": "common divine essence"}
        ],
        "Marsh": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-20", "dc": "10", "result": "common poisonous reagent"},
            {"range": "21-40", "dc": "10", "result": "common poisonous reagent"},
            {"range": "41-50", "dc": "10", "result": "common curative reagent"},
            {"range": "51-60", "dc": "10", "result": "common reactive reagent"},
            {"range": "61-70", "dc": "10", "result": "1d4 common poisonous reagents"},
            {"range": "71-80", "dc": "10", "result": "1d4 common reactive reagents"},
            {"range": "81-90", "dc": "10", "result": "uncommon poisonous reagent"},
            {"range": "91-95", "dc": "10", "result": "uncommon reactive reagent"},
            {"range": "96-100", "dc": "10", "result": "common primal essence"}
        ],
        "Mountains": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-20", "dc": "10", "result": "-"},
            {"range": "21-40", "dc": "10", "result": "common reactive reagent"},
            {"range": "41-50", "dc": "10", "result": "common curative reagent"},
            {"range": "51-60", "dc": "10", "result": "common poisonous reagent"},
            {"range": "61-70", "dc": "10", "result": "1d2 common curative reagents"},
            {"range": "71-80", "dc": "10", "result": "1d2 common reactive reagents"},
            {"range": "81-90", "dc": "10", "result": "uncommon reactive reagent"},
            {"range": "91-95", "dc": "10", "result": "common curative reagent"},
            {"range": "96-100", "dc": "10", "result": "common primal essence"}
        ],
        "Caves": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-30", "dc": "12", "result": "common reactive reagent"},
            {"range": "31-50", "dc": "12", "result": "common poisonous reagent"},
            {"range": "51-60", "dc": "12", "result": "1d4 common reactive reagents"},
            {"range": "61-70", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "71-80", "dc": "12", "result": "uncommon curative reagent"},
            {"range": "81-90", "dc": "12", "result": "common divine essence"},
            {"range": "91-95", "dc": "12", "result": "uncommon poisonous reagent"},
            {"range": "96-100", "dc": "12", "result": "uncommon divine essence"}
        ],
        "Underground": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-30", "dc": "12", "result": "common poisonous reagent"},
            {"range": "31-50", "dc": "12", "result": "common reactive reagent"},
            {"range": "51-60", "dc": "12", "result": "1d4 common poisonous reagents"},
            {"range": "61-70", "dc": "12", "result": "uncommon poisonous reagent"},
            {"range": "71-80", "dc": "12", "result": "uncommon curative reagent"},
            {"range": "81-90", "dc": "12", "result": "common arcane essence"},
            {"range": "91-95", "dc": "12", "result": "uncommon poisonous reagent"},
            {"range": "96-100", "dc": "12", "result": "uncommon arcane essence"}
        ],
        "Jungles": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-30", "dc": "12", "result": "common curative reagent"},
            {"range": "31-50", "dc": "12", "result": "common poisonous reagent"},
            {"range": "51-60", "dc": "12", "result": "1d4 common curative reagents"},
            {"range": "61-70", "dc": "12", "result": "uncommon curative reagent"},
            {"range": "71-80", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "81-90", "dc": "12", "result": "common primal essence"},
            {"range": "91-95", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "96-100", "dc": "12", "result": "uncommon primal essence"}
        ],
        "Shore": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-30", "dc": "12", "result": "common curative reagent"},
            {"range": "31-50", "dc": "12", "result": "common poisonous reagent"},
            {"range": "51-60", "dc": "12", "result": "1d4 common curative reagents"},
            {"range": "61-70", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "71-80", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "81-90", "dc": "12", "result": "common primal essence"},
            {"range": "91-95", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "96-100", "dc": "12", "result": "uncommon primal essence"}
        ],
        "Tundra": [
            {"range": "01-10", "dc": "-", "result": "-"},
            {"range": "11-30", "dc": "12", "result": "common reactive reagent"},
            {"range": "31-50", "dc": "12", "result": "common curative reagent"},
            {"range": "51-60", "dc": "12", "result": "1d4 common reactive reagents"},
            {"range": "61-70", "dc": "12", "result": "uncommon curative reagent"},
            {"range": "71-80", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "81-90", "dc": "12", "result": "common primal essence"},
            {"range": "91-95", "dc": "12", "result": "uncommon reactive reagent"},
            {"range": "96-100", "dc": "12", "result": "uncommon primal essence"}
        ],
        "Feylands": [
            {"range": "01-20", "dc": "14", "result": "common curative reagent"},
            {"range": "21-40", "dc": "14", "result": "common reactive reagent"},
            {"range": "41-60", "dc": "14", "result": "1d4 common curative reagent"},
            {"range": "61-80", "dc": "14", "result": "uncommon curative reagent"},
            {"range": "81-99", "dc": "14", "result": "uncommon primal essence"},
            {"range": "00", "dc": "14", "result": "rare primal essence"}
        ],
        "Shadowlands": [
            {"range": "01-20", "dc": "14", "result": "common poisonous reagent"},
            {"range": "21-40", "dc": "14", "result": "common reactive reagent"},
            {"range": "41-60", "dc": "14", "result": "1d4 common poisonous reagent"},
            {"range": "61-80", "dc": "14", "result": "uncommon poisonous reagent"},
            {"range": "81-99", "dc": "14", "result": "uncommon arcane essence"},
            {"range": "00", "dc": "14", "result": "rare arcane essence"}
        ],
        "Elemental Plane": [
            {"range": "01-20", "dc": "14", "result": "common reactive reagent"},
            {"range": "21-40", "dc": "14", "result": "common curative reagent"},
            {"range": "41-60", "dc": "14", "result": "1d4 common reactive reagent"},
            {"range": "61-80", "dc": "14", "result": "uncommon reactive reagent"},
            {"range": "81-99", "dc": "14", "result": "uncommon primal essence"},
            {"range": "00", "dc": "14", "result": "rare primal essence"}
        ],
        "Lower Plane": [
            {"range": "01-20", "dc": "14", "result": "common poisonous reagent"},
            {"range": "21-40", "dc": "14", "result": "common reactive reagent"},
            {"range": "41-60", "dc": "14", "result": "1d4 common poisonous reagent"},
            {"range": "61-80", "dc": "14", "result": "uncommon reactive reagent"},
            {"range": "81-99", "dc": "14", "result": "uncommon arcane essence"},
            {"range": "00", "dc": "14", "result": "rare arcane essence"}
        ],
        "Upper Plane": [
            {"range": "01-20", "dc": "14", "result": "common curative reagent"},
            {"range": "21-40", "dc": "14", "result": "common reactive reagent"},
            {"range": "41-60", "dc": "14", "result": "1d4 common curative reagent"},
            {"range": "61-80", "dc": "14", "result": "uncommon curative reagent"},
            {"range": "81-99", "dc": "14", "result": "uncommon divine essence"},
            {"range": "00", "dc": "14", "result": "rare divine essence"}
        ],
        "Outer Plane": [
            {"range": "01-20", "dc": "14", "result": "common reactive reagent"},
            {"range": "21-40", "dc": "14", "result": "common reactive reagent"},
            {"range": "41-60", "dc": "14", "result": "1d4 common reactive reagent"},
            {"range": "61-80", "dc": "14", "result": "uncommon reactive reagent"},
            {"range": "81-99", "dc": "14", "result": "uncommon arcane essence"},
            {"range": "100", "dc": "14", "result": "rare arcane essence"}
        ]
    }
    
    const gatheringMaterialsData = {
        "Caves": [
            {"range": "01-10", "dc": "12", "result": "—"},
            {"range": "11-20", "dc": "12", "result": "discarded armor padding parts"},
            {"range": "21-40", "dc": "12", "result": "1d12 scales"},
            {"range": "41-60", "dc": "12", "result": "adamant ore"},
            {"range": "61-80", "dc": "12", "result": "large carapace"},
            {"range": "81-95", "dc": "12", "result": "1d4 mithril ore"},
            {"range": "96-100", "dc": "12", "result": "common primal essence"}
        ],
        "Underground": [
            {"range": "01-10", "dc": "12", "result": "—"},
            {"range": "11-20", "dc": "12", "result": "1d4 supplies"},
            {"range": "21-40", "dc": "12", "result": "1d4 supplies"},
            {"range": "41-60", "dc": "12", "result": "mithril ore"},
            {"range": "61-80", "dc": "12", "result": "uncommon branch"},
            {"range": "81-95", "dc": "12", "result": "large carapace"},
            {"range": "96-100", "dc": "12", "result": "common arcane essence"}
        ],
        "Jungles": [
            {"range": "01-10", "dc": "12", "result": "1d4 firewood"},
            {"range": "11-20", "dc": "12", "result": "1d4 common branches"},
            {"range": "21-40", "dc": "12", "result": "1d4 supplies"},
            {"range": "41-60", "dc": "12", "result": "uncommon supplies"},
            {"range": "61-80", "dc": "12", "result": "uncommon branch"},
            {"range": "81-95", "dc": "12", "result": "uncommon branch"},
            {"range": "96-100", "dc": "12", "result": "common primal essence"}
        ],
        "Shore": [
            {"range": "01-10", "dc": "12", "result": "—"},
            {"range": "11-20", "dc": "12", "result": "soft haft wood scraps"},
            {"range": "21-40", "dc": "12", "result": "medium carapace"},
            {"range": "41-60", "dc": "12", "result": "rare supplies"},
            {"range": "61-80", "dc": "12", "result": "1d4 common branches"},
            {"range": "81-95", "dc": "12", "result": "slightly rusty fancy parts"},
            {"range": "96-100", "dc": "12", "result": "common primal essence"}
        ],
        "Tundra": [
            {"range": "01-10", "dc": "12", "result": "—"},
            {"range": "11-20", "dc": "12", "result": "wood scraps"},
            {"range": "21-40", "dc": "12", "result": "firewood"},
            {"range": "41-60", "dc": "12", "result": "supplies"},
            {"range": "61-80", "dc": "12", "result": "uncommon supplies"},
            {"range": "81-95", "dc": "12", "result": "1d4 icesteel ore"},
            {"range": "96-100", "dc": "12", "result": "common primal essence"}
        ],
        "Forest": [
            {"range": "01-20", "dc": "10", "result": "1d4 x 10 firewood"},
            {"range": "21-40", "dc": "10", "result": "1d12 common branch"},
            {"range": "41-60", "dc": "10", "result": "1d4 quality branches"},
            {"range": "61-80", "dc": "10", "result": "uncommon branch"},
            {"range": "80-95", "dc": "10", "result": "1d2 uncommon branch"},
            {"range": "96-100", "dc": "10", "result": "common primal essence"}
        ],
        "Desert": [
            {"range": "01-20", "dc": "10", "result": "—"},
            {"range": "21-40", "dc": "10", "result": "1d12 scales"},
            {"range": "41-60", "dc": "10", "result": "1d4 medium carapace"},
            {"range": "61-80", "dc": "10", "result": "large carapace"},
            {"range": "80-95", "dc": "10", "result": "rare supplies"},
            {"range": "96-100", "dc": "10", "result": "common arcane essence"}
        ],
        "Grasslands": [
            {"range": "01-20", "dc": "10", "result": "1d4 firewood"},
            {"range": "21-40", "dc": "10", "result": "1d12 wood scraps"},
            {"range": "41-60", "dc": "10", "result": "uncommon supplies"},
            {"range": "61-80", "dc": "10", "result": "1d4 hides"},
            {"range": "80-95", "dc": "10", "result": "rare supplies"},
            {"range": "96-100", "dc": "10", "result": "common divine essence"}
        ],
        "Marsh": [
            {"range": "01-20", "dc": "10", "result": "1d4 firewood"},
            {"range": "21-40", "dc": "10", "result": "1d12 wood scraps"},
            {"range": "41-60", "dc": "10", "result": "1d4 quality branches"},
            {"range": "61-80", "dc": "10", "result": "supplies"},
            {"range": "80-95", "dc": "10", "result": "uncommon branch"},
            {"range": "96-100", "dc": "10", "result": "common primal essence"}
        ],
        "Mountains": [
            {"range": "01-20", "dc": "10", "result": "1d4 firewood"},
            {"range": "21-40", "dc": "10", "result": "1d12 fletching"},
            {"range": "41-60", "dc": "10", "result": "adamant ore"},
            {"range": "61-80", "dc": "10", "result": "mithril ore"},
            {"range": "80-95", "dc": "10", "result": "uncommon branch"},
            {"range": "96-100", "dc": "10", "result": "common primal essence"}
        ]
    }    

    const exoticHarvestingData = {
        "exoticHarvesting":{
            "0-4":{
                "DC":8,
                "Dragon/Giants/Monstrosities":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-50",
                        "result":"common poisonous reagent"
                    },
                    {
                        "range":"51-70",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"common curative reagent"
                    },
                    {
                        "range":"81-100",
                        "result":"common primal essence"
                    }
                ],
                "Construct":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-100",
                        "result":"fancy parts"
                    }
                ],
                "Aberration":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-50",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"51-70",
                        "result":"common curative reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"common poisonous reagent"
                    },
                    {
                        "range":"81-100",
                        "result":"common psionic essence"
                    }
                ],
                "Undead":[
                    {
                        "range":"01-80",
                        "result":"—"
                    },
                    {
                        "range":"81-100",
                        "result":"common arcane essence"
                    }
                ],
                "Plant":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-50",
                        "result":"common poisonous reagent"
                    },
                    {
                        "range":"51-70",
                        "result":"common curative reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"81-100",
                        "result":"common primal essence"
                    }
                ]
            },
            "5-10":{
                "DC":10,
                "Dragon/Giants/Monstrosities":[
                    {
                        "range":"01-30",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"31-60",
                        "result":"uncommon poisonous reagent"
                    },
                    {
                        "range":"61-80",
                        "result":"1d4 uncommon reactive reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"uncommon primal essence"
                    },
                    {
                        "range":"91-100",
                        "result":"uncommon primal essence"
                    }
                ],
                "Construct":[
                    {
                        "range":"01-30",
                        "result":"fancy parts"
                    },
                    {
                        "range":"31-60",
                        "result":"1d4 fancy parts"
                    },
                    {
                        "range":"61-80",
                        "result":"1d6 fancy parts"
                    },
                    {
                        "range":"81-90",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"91-100",
                        "result":"uncommon arcane essence"
                    }
                ],
                "Aberration":[
                    {
                        "range":"01-30",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"31-60",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"61-80",
                        "result":"uncommon curative reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"91-100",
                        "result":"uncommon psionic essence"
                    }
                ],
                "Undead":[
                    {
                        "range":"01-30",
                        "result":"common arcane essence"
                    },
                    {
                        "range":"31-60",
                        "result":"1d4 common poisonous reagent"
                    },
                    {
                        "range":"61-80",
                        "result":"1d4 uncommon poisonous reagents"
                    },
                    {
                        "range":"81-90",
                        "result":"uncommon divine essence"
                    },
                    {
                        "range":"91-100",
                        "result":"uncommon arcane essence"
                    }
                ],
                "Plant":[
                    {
                        "range":"01-30",
                        "result":"common poisonous reagent"
                    },
                    {
                        "range":"31-60",
                        "result":"uncommon poisonous reagent"
                    },
                    {
                        "range":"61-80",
                        "result":"1d4 uncommon curative reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"uncommon primal essence"
                    },
                    {
                        "range":"91-100",
                        "result":"uncommon primal essence"
                    }
                ]
            },
            "11-16":{
                "DC":12,
                "Dragon/Giants/Monstrosities":[
                    {
                        "range":"01-30",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"31-60",
                        "result":"uncommon primal essence"
                    },
                    {
                        "range":"61-70",
                        "result":"rare reactive reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"rare poisonous reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"rare primal essence"
                    },
                    {
                        "range":"91-99",
                        "result":"rare primal essence"
                    },
                    {
                        "range":"100",
                        "result":"very rare primal essence"
                    }
                ],
                "Construct":[
                    {
                        "range":"01-30",
                        "result":"esoteric parts"
                    },
                    {
                        "range":"31-60",
                        "result":"1d4 esoteric parts"
                    },
                    {
                        "range":"61-70",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"71-80",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"81-90",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"91-99",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"100",
                        "result":"very rare arcane essence"
                    }
                ],
                "Aberration":[
                    {
                        "range":"01-30",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"31-60",
                        "result":"uncommon psionic essence"
                    },
                    {
                        "range":"61-70",
                        "result":"rare reactive reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"rare poisonous reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"91-99",
                        "result":"rare psionic essence"
                    },
                    {
                        "range":"100",
                        "result":"very rare psionic essence"
                    }
                ],
                "Undead":[
                    {
                        "range":"01-30",
                        "result":"uncommon poisonous reagent"
                    },
                    {
                        "range":"31-60",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"61-70",
                        "result":"rare poisonous reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"81-90",
                        "result":"rare divine essence"
                    },
                    {
                        "range":"91-99",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"100",
                        "result":"very rare arcane essence"
                    }
                ],
                "Plant":[
                    {
                        "range":"01-30",
                        "result":"uncommon poisonous reagent"
                    },
                    {
                        "range":"31-60",
                        "result":"uncommon primal essence"
                    },
                    {
                        "range":"61-70",
                        "result":"rare curative reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"rare poisonous reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"rare primal essence"
                    },
                    {
                        "range":"91-99",
                        "result":"rare primal essence"
                    },
                    {
                        "range":"100",
                        "result":"very rare primal essence"
                    }
                ]
            },
            "17+":{
                "DC":15,
                "Dragon/Giants/Monstrosities":[
                    {
                        "range":"01-30",
                        "result":"1d4 rare reactive reagent"
                    },
                    {
                        "range":"31-50",
                        "result":"rare primal essence"
                    },
                    {
                        "range":"51-89",
                        "result":"very rare primal essence"
                    },
                    {
                        "range":"90-94",
                        "result":"legendary primal essence"
                    },
                    {
                        "range":"95-100",
                        "result":"legendary primal essence"
                    }
                ],
                "Construct":[
                    {
                        "range":"01-30",
                        "result":"1d4 esoteric parts"
                    },
                    {
                        "range":"31-50",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"51-89",
                        "result":"very rare arcane essence"
                    },
                    {
                        "range":"90-94",
                        "result":"legendary arcane essence"
                    },
                    {
                        "range":"95-100",
                        "result":"legendary arcane essence"
                    }
                ],
                "Aberration":[
                    {
                        "range":"01-30",
                        "result":"1d4 rare reactive reagent"
                    },
                    {
                        "range":"31-50",
                        "result":"rare psionic essence"
                    },
                    {
                        "range":"51-89",
                        "result":"very rare arcane essence"
                    },
                    {
                        "range":"90-94",
                        "result":"legendary arcane essence"
                    },
                    {
                        "range":"95-100",
                        "result":"legendary psionic essence"
                    }
                ],
                "Undead":[
                    {
                        "range":"01-30",
                        "result":"1d4 rare poisonous reagent"
                    },
                    {
                        "range":"31-50",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"51-89",
                        "result":"very rare arcane essence"
                    },
                    {
                        "range":"90-94",
                        "result":"legendary divine essence"
                    },
                    {
                        "range":"95-100",
                        "result":"legendary arcane essence"
                    }
                ],
                "Plant":[
                    {
                        "range":"01-30",
                        "result":"1d4 rare poisonous reagent"
                    },
                    {
                        "range":"31-50",
                        "result":"rare primal essence"
                    },
                    {
                        "range":"51-89",
                        "result":"very rare primal essence"
                    },
                    {
                        "range":"90-94",
                        "result":"legendary primal essence"
                    },
                    {
                        "range":"95-100",
                        "result":"legendary primal essence"
                    }
                ]
            }
        }
    }  

    const exoticRemnantsData = {
        "exoticRemnants":{
            "0-4":{
                "Celestial":[
                    {
                        "range":"01-70",
                        "result":"—"
                    },
                    {
                        "range":"71-80",
                        "result":"common curative reagent"
                    },
                    {
                        "range":"81-95",
                        "result":"common divine essence"
                    },
                    {
                        "range":"96-00",
                        "result":"common divine essence"
                    }
                ],
                "Fiend":[
                    {
                        "range":"01-70",
                        "result":"—"
                    },
                    {
                        "range":"71-80",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"81-95",
                        "result":"common arcane essence"
                    },
                    {
                        "range":"96-00",
                        "result":"common divine essence"
                    }
                ],
                "Elemental":[
                    {
                        "range":"01-50",
                        "result":"—"
                    },
                    {
                        "range":"51-70",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"71-80",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"81-95",
                        "result":"common primal essence"
                    },
                    {
                        "range":"96-00",
                        "result":"common primal essence"
                    }
                ],
                "Incorporal Undead":[
                    {
                        "range":"01-70",
                        "result":"—"
                    },
                    {
                        "range":"71-80",
                        "result":"common poisonous reagent"
                    },
                    {
                        "range":"81-95",
                        "result":"common divine essence"
                    },
                    {
                        "range":"96-00",
                        "result":"common arcane essence"
                    }
                ]
            },
            "5-10":{
                "Celestial":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-50",
                        "result":"common curative reagent"
                    },
                    {
                        "range":"51-80",
                        "result":"uncommon curative reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"common divine essence"
                    },
                    {
                        "range":"91-00",
                        "result":"uncommon divine essence"
                    }
                ],
                "Fiend":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-50",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"51-80",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"common arcane essence"
                    },
                    {
                        "range":"91-00",
                        "result":"uncommon arcane essence"
                    }
                ],
                "Elemental":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-50",
                        "result":"common reactive reagent"
                    },
                    {
                        "range":"51-80",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"common primal essence"
                    },
                    {
                        "range":"91-00",
                        "result":"uncommon primal essence"
                    }
                ],
                "Incorporal Undead":[
                    {
                        "range":"01-20",
                        "result":"—"
                    },
                    {
                        "range":"21-50",
                        "result":"common poisonous reagent"
                    },
                    {
                        "range":"51-80",
                        "result":"uncommon poisonous reagent"
                    },
                    {
                        "range":"81-90",
                        "result":"common arcane essence"
                    },
                    {
                        "range":"91-00",
                        "result":"uncommon arcane essence"
                    }
                ]
            },
            "11-16":{
                "Celestial":[
                    {
                        "range":"01-20",
                        "result":"uncommon curative reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"uncommon divine essence"
                    },
                    {
                        "range":"51-80",
                        "result":"rare curative reagent"
                    },
                    {
                        "range":"81-00",
                        "result":"rare divine essence"
                    }
                ],
                "Fiend":[
                    {
                        "range":"01-20",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"51-80",
                        "result":"rare reactive reagent"
                    },
                    {
                        "range":"81-00",
                        "result":"rare arcane essence"
                    }
                ],
                "Elemental":[
                    {
                        "range":"01-20",
                        "result":"uncommon reactive reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"uncommon primal essence"
                    },
                    {
                        "range":"51-80",
                        "result":"rare reactive reagent"
                    },
                    {
                        "range":"81-00",
                        "result":"rare primal essence"
                    }
                ],
                "Incorporal Undead":[
                    {
                        "range":"01-20",
                        "result":"uncommon poisonous reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"uncommon arcane essence"
                    },
                    {
                        "range":"51-80",
                        "result":"rare poisonous reagent"
                    },
                    {
                        "range":"81-00",
                        "result":"rare arcane essence"
                    }
                ]
            },
            "17+":{
                "Celestial":[
                    {
                        "range":"01-20",
                        "result":"rare curative reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"rare divine essence"
                    },
                    {
                        "range":"51-69",
                        "result":"very rare curative reagent"
                    },
                    {
                        "range":"70-89",
                        "result":"very rare divine essence"
                    },
                    {
                        "range":"90-00",
                        "result":"legendary divine essence"
                    }
                ],
                "Fiend":[
                    {
                        "range":"01-20",
                        "result":"rare reactive reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"51-69",
                        "result":"very rare reactive reagent"
                    },
                    {
                        "range":"70-89",
                        "result":"very rare arcane essence"
                    },
                    {
                        "range":"90-00",
                        "result":"legendary arcane essence"
                    }
                ],
                "Elemental":[
                    {
                        "range":"01-20",
                        "result":"rare reactive reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"rare primal essence"
                    },
                    {
                        "range":"51-69",
                        "result":"very rare reactive reagent"
                    },
                    {
                        "range":"70-89",
                        "result":"very rare primal essence"
                    },
                    {
                        "range":"90-00",
                        "result":"legendary primal essence"
                    }
                ],
                "Incorporal Undead":[
                    {
                        "range":"01-20",
                        "result":"rare poisonous reagent"
                    },
                    {
                        "range":"21-50",
                        "result":"rare arcane essence"
                    },
                    {
                        "range":"51-69",
                        "result":"very rare poisonous reagent"
                    },
                    {
                        "range":"70-89",
                        "result":"very rare arcane essence"
                    },
                    {
                        "range":"90-00",
                        "result":"legendary arcane essence"
                    }
                ]
            }
        }
    }
    
    const huntGameData = {
        "Caves": [
            {"range": "01-30", "dc": "12", "result": "fresh ingredients"},
            {"range": "31-60", "dc": "12", "result": "1d4 fresh ingredients"},
            {"range": "61-90", "dc": "12", "result": "1d4 hides"},
            {"range": "91-100", "dc": "12", "result": "1d6 fresh ingredients, 1d4 hides"}
        ],
        "Underground": [
            {"range": "01-30", "dc": "12", "result": "supplies"},
            {"range": "31-60", "dc": "12", "result": "fresh ingredients"},
            {"range": "61-90", "dc": "12", "result": "1d4 hides"},
            {"range": "91-100", "dc": "12", "result": "1d6 fresh ingredients, 1d4 hides"}
        ],
        "Jungle": [
            {"range": "01-30", "dc": "12", "result": "fresh ingredients"},
            {"range": "31-60", "dc": "12", "result": "1d4 fresh ingredients"},
            {"range": "61-90", "dc": "12", "result": "supplies"},
            {"range": "91-100", "dc": "12", "result": "1d6 fresh ingredients, 1d4 hides"}
        ],
        "Shore": [
            {"range": "01-30", "dc": "12", "result": "fresh ingredients"},
            {"range": "31-60", "dc": "12", "result": "1d4 fresh ingredients"},
            {"range": "61-90", "dc": "12", "result": "1d8 fresh ingredients"},
            {"range": "91-100", "dc": "12", "result": "1 rare supplies"}
        ],
        "Tundra": [
            {"range": "01-30", "dc": "12", "result": "—"},
            {"range": "31-60", "dc": "12", "result": "fresh ingredients"},
            {"range": "61-90", "dc": "12", "result": "1d4 fresh ingredients"},
            {"range": "91-100", "dc": "12", "result": "1d6 fresh ingredients, 1 medium carapace"}
        ],
        "Forest": [
            {"range": "01-30", "dc": "10", "result": "fresh ingredients"},
            {"range": "31-60", "dc": "10", "result": "1d4 fresh ingredients"},
            {"range": "61-90", "dc": "10", "result": "1d4 hides"},
            {"range": "91-100", "dc": "10", "result": "1d8 fresh ingredients"}
        ],
        "Desert": [
            {"range": "01-30", "dc": "10", "result": "—"},
            {"range": "31-60", "dc": "10", "result": "fresh ingredients"},
            {"range": "61-90", "dc": "10", "result": "supplies"},
            {"range": "91-100", "dc": "10", "result": "1d4 hides"}
        ],
        "Grasslands": [
            {"range": "01-30", "dc": "10", "result": "fresh ingredients"},
            {"range": "31-60", "dc": "10", "result": "1d4 fresh ingredients"},
            {"range": "61-90", "dc": "10", "result": "1d6 fresh ingredients"},
            {"range": "91-100", "dc": "10", "result": "1d6 fresh ingredients, 1 large carapace"}
        ],
        "Marsh": [
            {"range": "01-30", "dc": "10", "result": "—"},
            {"range": "31-60", "dc": "10", "result": "supplies"},
            {"range": "61-90", "dc": "10", "result": "1d4 hides"},
            {"range": "91-100", "dc": "10", "result": "1d8 fresh ingredients, 1d4 hides"}
        ],
        "Mountains": [
            {"range": "01-30", "dc": "10", "result": "—"},
            {"range": "31-60", "dc": "10", "result": "supplies"},
            {"range": "61-90", "dc": "10", "result": "1d4 hides"},
            {"range": "91-100", "dc": "10", "result": "1d6 fresh ingredients, 1 large carapace"}
        ]
    };
    
    const individualLootTable = {
        values: [
            {
                "CR": "0-4",
                "values": [
                    {
                        "d100": "01-15",
                        "Materials Found": "1d6 wood scraps, 1 length of string",
                        "Coinage": "2d4 cp",
                        "Equivalent Gold Value": "18 cp"
                    },
                    {
                        "d100": "16-30",
                        "Materials Found": "1d4 metal scraps",
                        "Coinage": "1d4 sp",
                        "Equivalent Gold Value": "6 sp"
                    },
                    {
                        "d100": "31-40",
                        "Materials Found": "1d4 leather scraps, 1 hide scraps",
                        "Coinage": "1d4 sp",
                        "Equivalent Gold Value": "6 sp"
                    },
                    {
                        "d100": "41-60",
                        "Materials Found": "supplies",
                        "Coinage": "1d6 sp, 2d4 cp",
                        "Equivalent Gold Value": "1 gp, 5 sp"
                    },
                    {
                        "d100": "61-70",
                        "Materials Found": "1d2 parts",
                        "Coinage": "1d6 gp, 2d4 sp",
                        "Equivalent Gold Value": "6 gp, 5 sp"
                    },
                    {
                        "d100": "71-75",
                        "Materials Found": "uncommon supplies",
                        "Coinage": "1 gp, 1d10 sp",
                        "Equivalent Gold Value": "10 gp"
                    },
                    {
                        "d100": "76-80",
                        "Materials Found": "common poisonous reagent",
                        "Coinage": "2d4 sp",
                        "Equivalent Gold Value": "15 gp, 5 sp"
                    },
                    {
                        "d100": "81-85",
                        "Materials Found": "common curative reagent",
                        "Coinage": "2d4 sp",
                        "Equivalent Gold Value": "15 gp"
                    },
                    {
                        "d100": "86-90",
                        "Materials Found": "common reactive reagent",
                        "Coinage": "2d4 sp",
                        "Equivalent Gold Value": "15 gp"
                    },
                    {
                        "d100": "91-94",
                        "Materials Found": "common magical ink",
                        "Coinage": "1d6 gp, 1d10 sp",
                        "Equivalent Gold Value": "18 gp, 5 sp"
                    },
                    {
                        "d100": "95-96",
                        "Materials Found": "common divine essence",
                        "Coinage": "1d6 sp, 1d10 cp",
                        "Equivalent Gold Value": "46 gp"
                    },
                    {
                        "d100": "97-98",
                        "Materials Found": "common primal essence",
                        "Coinage": "1d6 sp, 1d10 cp",
                        "Equivalent Gold Value": "46 gp"
                    },
                    {
                        "d100": "99-100",
                        "Materials Found": "common arcane essence",
                        "Coinage": "1d6 sp, 1d10 cp",
                        "Equivalent Gold Value": "46 gp"
                    }
                ]
            },
            {
                "CR": "5-10",
                "values": [
                    {
                        "d100": "01-30",
                        "Materials Found": "1d4 fancy parts",
                        "Coinage": "1d10 gp, 1d10 sp",
                        "Equivalent Gold Value": "36 gp, 6 sp"
                    },
                    {
                        "d100": "31-40",
                        "Materials Found": "1d10 parts, 1d20 leather scraps, 1d20 metal scraps",
                        "Coinage": "1 pp, 1d10 gp, 2d10 sp",
                        "Equivalent Gold Value": "30 gp"
                    },
                    {
                        "d100": "41-50",
                        "Materials Found": "uncommon poisonous reagent",
                        "Coinage": "1d6 x 10 gp",
                        "Equivalent Gold Value": "75 gp"
                    },
                    {
                        "d100": "51-60",
                        "Materials Found": "uncommon curative reagent",
                        "Coinage": "1d6 x 10 gp",
                        "Equivalent Gold Value": "75 gp"
                    },
                    {
                        "d100": "61-80",
                        "Materials Found": "uncommon reactive reagent",
                        "Coinage": "1d6 x 10 gp",
                        "Equivalent Gold Value": "75 gp"
                    },
                    {
                        "d100": "81-90",
                        "Materials Found": "uncommon magical ink, uncommon parchment",
                        "Coinage": "1d6 x 10 gp",
                        "Equivalent Gold Value": "125 gp"
                    },
                    {
                        "d100": "91-94",
                        "Materials Found": "esoteric parts",
                        "Coinage": "2d6 x 10 gp",
                        "Equivalent Gold Value": "170 gp"
                    },
                    {
                        "d100": "95-96",
                        "Materials Found": "uncommon divine essence",
                        "Coinage": "1d6 x 10 gp",
                        "Equivalent Gold Value": "185 gp"
                    },
                    {
                        "d100": "97-98",
                        "Materials Found": "uncommon primal essence",
                        "Coinage": "1d6 x 10 gp",
                        "Equivalent Gold Value": "185 gp"
                    },
                    {
                        "d100": "99-100",
                        "Materials Found": "uncommon arcane essence",
                        "Coinage": "1d6 pp",
                        "Equivalent Gold Value": "185 gp"
                    }
                ]
            },
            {
                "CR": "11-16",
                "values": [
                    {
                        "d100": "01-20",
                        "Materials Found": "2 mithril ingots, 2 adamantine ingots, 2 fancy parts",
                        "Equivalent Gold Value": "300 gp"
                    },
                    {
                        "d100": "21-30",
                        "Materials Found": "rare branch, uncommon branch, rare poisonous reagent",
                        "Equivalent Gold Value": "305 gp"
                    },
                    {
                        "d100": "31-40",
                        "Materials Found": "5 dragon scales",
                        "Equivalent Gold Value": "400 gp"
                    },
                    {
                        "d100": "41-50",
                        "Materials Found": "rare magical ink, rare curative reagent",
                        "Equivalent Gold Value": "400 gp"
                    },
                    {
                        "d100": "51-60",
                        "Materials Found": "rare reactive reagent, 2 rare supplies",
                        "Equivalent Gold Value": "400 gp"
                    },
                    {
                        "d100": "61-70",
                        "Materials Found": "10 uncommon reagents",
                        "Equivalent Gold Value": "400 gp"
                    },
                    {
                        "d100": "71-80",
                        "Materials Found": "uncommon divine essence, uncommon primal essence",
                        "Equivalent Gold Value": "600 gp"
                    },
                    {
                        "d100": "81-90",
                        "Materials Found": "rare reactive reagent, rare poisonous reagent, rare curative reagent",
                        "Equivalent Gold Value": "600 gp"
                    },
                    {
                        "d100": "91-94",
                        "Materials Found": "tough leather",
                        "Equivalent Gold Value": "600 gp"
                    },
                    {
                        "d100": "95-96",
                        "Materials Found": "rare divine essence",
                        "Equivalent Gold Value": "700 gp"
                    },
                    {
                        "d100": "97-98",
                        "Materials Found": "rare primal essence",
                        "Equivalent Gold Value": "700 gp"
                    },
                    {
                        "d100": "99-100",
                        "Materials Found": "rare arcane essence",
                        "Equivalent Gold Value": "700 gp"
                    }
                ]
            },
            {
                "CR": "17+",
                "values": [
                    {
                        "d100": "01-15",
                        "Materials Found": "very rare branch, very rare parchment, rare arcane essence",
                        "Equivalent Gold Value": "3,500 gp"
                    },
                    {
                        "d100": "16-30",
                        "Materials Found": "very rare curative reagent, very rare poisonous reagent, rare primal essence",
                        "Equivalent Gold Value": "5,000 gp"
                    },
                    {
                        "d100": "31-45",
                        "Materials Found": "very rare poisonous reagent, very rare reactive reagent, rare arcane essence",
                        "Equivalent Gold Value": "5,000 gp"
                    },
                    {
                        "d100": "46-60",
                        "Materials Found": "very rare curative reagent, very rare reactive reagent, rare divine essence",
                        "Equivalent Gold Value": "5,500 gp"
                    },
                    {
                        "d100": "61-70",
                        "Materials Found": "very rare divine essence",
                        "Equivalent Gold Value": "7,000 gp"
                    },
                    {
                        "d100": "71-80",
                        "Materials Found": "very rare primal essence",
                        "Equivalent Gold Value": "7,000 gp"
                    },
                    {
                        "d100": "81-90",
                        "Materials Found": "very rare arcane essence",
                        "Equivalent Gold Value": "7,000 gp"
                    },
                    {
                        "d100": "95-96",
                        "Materials Found": "legendary curative reagent, legendary poisonous reagent",
                        "Equivalent Gold Value": "10,000 gp"
                    },
                    {
                        "d100": "97-98",
                        "Materials Found": "legendary poisonous reagent, legendary reactive reagent",
                        "Equivalent Gold Value": "10,000 gp"
                    },
                    {
                        "d100": "99-100",
                        "Materials Found": "legendary curative reagent, legendary reactive reagent",
                        "Equivalent Gold Value": "10,000 gp"
                    }
                ]
            }
        ],
        giveResult(cr) {
            let d100Result = rollDice(1, 100, 0);
    
            let crValues = this.values.find(elem => elem.CR == cr).values;
            const value = crValues.find(elem => {
                const d100Split = elem.d100.split('-');
                return d100Split[0] <= d100Result && d100Split[1] >= d100Result;
            });
    
            // Añadir el resultado a la tabla
            addResultToTable("Individual Loot", 'N/A', cr, d100Result, value["Materials Found"], value["Coinage"], value["Equivalent Gold Value"]);
        }
    };
    
      

    const hoardLootTable = {
        values: [
            {
                "CR": "0-4",
                "values": [
                    { "d100": "01-25", "Materials Found": "5 steel ingots", "Equivalent Gold Value": "10 gp" },
                    { "d100": "26-40", "Materials Found": "10 tanned leather", "Equivalent Gold Value": "30 gp" },
                    { "d100": "41-50", "Materials Found": "10 steel ingots, 50 scales, 10 rawhide leather", "Equivalent Gold Value": "90 gp" },
                    { "d100": "51-60", "Materials Found": "2 common curative reagents, 2 common reactive reagents, 2 common poisonous reagents", "Equivalent Gold Value": "90 gp" },
                    { "d100": "61-70", "Materials Found": "1 mithril ingot, 1 common arcane essence, 1 common divine essence", "Equivalent Gold Value": "105 gp" },
                    { "d100": "71-80", "Materials Found": "1 uncommon magical ink, 1 uncommon parchment, large carapace, 1 uncommon supplies", "Equivalent Gold Value": "120 gp" },
                    { "d100": "81-90", "Materials Found": "2 fancy parts, 2 mithril ingots, 1 rare poisonous reagent, 1 rare reactive reagent", "Equivalent Gold Value": "140 gp" },
                    { "d100": "91-99", "Materials Found": "1 esoteric part, 1 adamantine ingot, 1 rare curative reagent", "Equivalent Gold Value": "200 gp" },
                    { "d100": "00", "Materials Found": "1 uncommon arcane essence, 1 common divine essence, 1 common primal essence", "Equivalent Gold Value": "235 gp" }
                ]
            },
            {
                "CR": "5-10",
                "values": [
                    { "d100": "01-25", "Materials Found": "20 steel ingots, 20 rawhide leather, 20 fancy parts, 20 scales, 10 quality branches", "Equivalent Gold Value": "360 gp" },
                    { "d100": "26-40", "Materials Found": "4 uncommon curative reagent, 4 uncommon poisonous reagents, 4 uncommon reactive reagents", "Equivalent Gold Value": "480 gp" },
                    { "d100": "41-50", "Materials Found": "1 rare magical ink, 1 rare parchment, 2 adamantine ingots", "Equivalent Gold Value": "520 gp" },
                    { "d100": "51-60", "Materials Found": "10 fancy parts, 10 mithril ingots, 2 rare branches", "Equivalent Gold Value": "560 gp" },
                    { "d100": "61-70", "Materials Found": "2 rare supplies, rare branch, 2 uncommon divine essences", "Equivalent Gold Value": "580 gp" },
                    { "d100": "71-80", "Materials Found": "1 uncommon arcane essence, 1 uncommon primal essence, 2 rare curative reagents, 2 rare branches, 1 adamantine ingot", "Equivalent Gold Value": "600 gp" },
                    { "d100": "81-90", "Materials Found": "3 esoteric part, 3 rare curative reagent, 3 rare poisonous reagent, 3 rare reactive reagent", "Equivalent Gold Value": "680 gp" },
                    { "d100": "91-99", "Materials Found": "1 tough leather, 1 uncommon arcane essence, 1 uncommon divine essence, 1 uncommon primal essence", "Equivalent Gold Value": "950 gp" },
                    { "d100": "00", "Materials Found": "1 rare arcane essence, 1 uncommon divine essence, 1 uncommon primal essence", "Equivalent Gold Value": "1,000 gp" }
                ]
            },
            {
                "CR": "11-16",
                "values": [
                    { "d100": "01-25", "Materials Found": "10 adamantine ingots, 4 tough leather, 4 esoteric parts, 4 very rare branches, 10 mithril ingots", "Equivalent Gold Value": "6,900 gp" },
                    { "d100": "26-40", "Materials Found": "5 rare curative reagents, 5 rare poisonous reagents, 5 rare reactive reagents, 2 very rare parchment, 2 very rare magical ink", "Equivalent Gold Value": "11,000 gp" },
                    { "d100": "41-50", "Materials Found": "5 tough leather, 20 dragon scales, 4 rare primal essences, 4 rare divine essences, 5 rare reactive reagents, 5 rare curative reagents, 5 adamantine ingots", "Equivalent Gold Value": "11,300 gp" },
                    { "d100": "51-60", "Materials Found": "15 esoteric parts, 15 rare supplies, 1 very rare arcane essence, 3 rare poisonous reagents, 4 rare curative reagents", "Equivalent Gold Value": "11,400 gp" },
                    { "d100": "61-70", "Materials Found": "5 firesteel ingots, 1 very rare parchment, 2 very rare reactive reagents, 2 very rare poisonous reagents", "Equivalent Gold Value": "12,250 gp" },
                    { "d100": "71-80", "Materials Found": "1 very rare divine essence, 2 rare arcane essences, 2 very rare curative reagent", "Equivalent Gold Value": "12,400 gp" },
                    { "d100": "81-90", "Materials Found": "1 very rare primal essence, 2 rare divine essences, 2 very rare poisonous reagent", "Equivalent Gold Value": "12,400 gp" },
                    { "d100": "91-99", "Materials Found": "1 very rare arcane essence, 2 rare primal essences, 2 very rare reactive reagent", "Equivalent Gold Value": "12,400 gp" },
                    { "d100": "00", "Materials Found": "1 very rare arcane essence, 1 very rare divine essence, 1 very rare primal essence", "Equivalent Gold Value": "21,000 gp" }
                ]
            },
            {
                "CR": "17+",
                "values": [
                    { "d100": "01-25", "Materials Found": "10 esoteric parts, 10 darksteel ingots, 10 firesteel ingots, 10 icesteel ingots, 5 very rare parchment, 20 adamantine ingots, 20 mithril ingots", "Equivalent Gold Value": "20,000 gp" },
                    { "d100": "26-40", "Materials Found": "4 very rare curative reagents, 4 very rare reactive reagents, 4 very rare poisonous reagents", "Equivalent Gold Value": "24,000 gp" },
                    { "d100": "41-50", "Materials Found": "10 tough leather, 1 legendary magical ink, 1 legendary parchment, 4 very rare curative reagents", "Equivalent Gold Value": "24,000 gp" },
                    { "d100": "51-60", "Materials Found": "legendary curative reagent, legendary reactive reagent, legendary poisonous reagent, 2 very rare primal essences", "Equivalent Gold Value": "29,000 gp" },
                    { "d100": "61-70", "Materials Found": "20 rare supplies, 20 esoteric parts, 20 rare reactive reagents, 20 rare curative reagents, 20 rare poisonous reagents, 10 rare divine essence, 10 rare arcane essences", "Equivalent Gold Value": "29,000 gp" },
                    { "d100": "71-80", "Materials Found": "legendary divine essence, 2 very rare primal essences, 2 legendary reactive reagents", "Equivalent Gold Value": "49,000 gp" },
                    { "d100": "81-90", "Materials Found": "legendary primal essence, 2 very rare arcane essences, 2 legendary poisonous reagents", "Equivalent Gold Value": "49,000 gp" },
                    { "d100": "91-99", "Materials Found": "legendary arcane essence, 2 very rare divine essences, 2 legendary curative reagents", "Equivalent Gold Value": "49,000 gp" },
                    { "d100": "00", "Materials Found": "legendary arcane essence, legendary primal essence, legendary divine essence", "Equivalent Gold Value": "75,000 gp" }
                ]
            }
        ],
        giveResult(cr) {
            let d100Result = rollDice(1, 100, 0);
    
            let crValues = this.values.find(elem => {
                return elem.CR == cr;
            }).values;
    
            const value = crValues.find(elem => {
                const d100Split = elem.d100.split('-');
                if (d100Split[0] <= d100Result && d100Split[1] >= d100Result)
                    return true;
            })
            addResultToTable("Hoard", 'N/A', cr, d100Result, value["Materials Found"], 'N/A', value["Equivalent Gold Value"]);
        }
    };
    
    // Datos para Hide and Meat Harvesting
    const harvestingData = {
        "Tiny": { "difficulty": null, "hide": null, "meat": null },
        "Small": { "difficulty": 12, "hide": "1d4 hide scraps", "meat": null },
        "Medium": { "difficulty": 10, "hide": "1 hide or 1 medium carapace or 2d6 scales", "meat": "1 common meat" },
        "Large": { "difficulty": 12, "hide": "5 hides or 1 large carapace or 3d6 scales", "meat": "1d4 common meat" },
        "Huge": { "difficulty": 14, "hide": "10 hides or 2 large carapaces or 6d6 scales", "meat": "2d6 common meat" },
        "Gargantuan": { "difficulty": 14, "hide": "15 hides or 3 large carapaces or 9d6 scales", "meat": "3d8 common meat" }
    };

    // Datos para Special Materials
    const specialMaterialsData = {
        "tough hide/scales": { "modifier": 4, "minCR": 8, "difficulty": "Harvested from a creature with AC 16 or higher", "effect": "Armor crafted has +1 AC" },
        "resistant hide/scales": { "modifier": 5, "minCR": 8, "difficulty": "Harvested from a creature with resistance to an elemental damage type", "effect": "Armor crafted has related elemental resistance" },
        "dragon scales": { "modifier": 8, "minCR": 14, "difficulty": "Harvested from a Dragon", "effect": "Armor crafted has +1 AC and Resistance to related element" },
        "uncommon meat": { "modifier": 3, "minCR": 5 },
        "rare meat": { "modifier": 5, "minCR": 10 },
        "very rare meat": { "modifier": 7, "minCR": 17 },
        "legendary meat": { "modifier": 9, "minCR": 21 }
    };

    // Definición de las opciones de criaturas
    const creatureOptions = [
        {
            title: "Loot and Hoards",
            subText: "Replace the Individual Treasure for humanoid type creatures with this table in all or some cases.",
            callback: function() {
                loadOptions(optionsContainer, lootAndHoardsOptions);
            }
        },
        {
            title: "Basic Harvesting",
            subText: "Harvest meat and hides from Beasts, Dragons, and Monstrosities using Wisdom (Survival). Plant creatures can be harvested for food with the same DC and amount.",
            callback: function() {
                showBasicHarvestingForm();
            }
        },
        {
            title: "Exotic Harvesting",
            subText: "Harvest materials from Aberrations, Constructs, Dragons, Monstrosities, Plants, and some Undead using different skill checks depending on the creature type.",
            callback: function() {
                showExoticHarvestingForm();
            }
        },
        {
            title: "Double Harvesting",
            subText: "Perform both Basic and Exotic Harvesting on the same creature, but the second check has disadvantage.",
            callback: function() {
                console.log("Double Harvesting clicked");
            }
        },
        {
            title: "Exotic Remnants",
            subText: "Harvest remnants from Celestials, Elementals, Fiends, and some Undead. No check required.",
            callback: function() {
                showExoticRemnantsForm();
            }
        }
    ];

    // Definición de las opciones de gathering
    const gatheringOptions = [
        {
            title: "Gather Reagents",
            subText: "Harvest reagents using a Wisdom check. Add your proficiency bonus if you have an Herbalism kit and are proficient with it.",
            callback: function() {
                showGatheringReagentsForm();
            }
        },
        {
            title: "Search for Materials",
            subText: "Harvest materials with Strength, Dexterity, or Wisdom checks. Add proficiency bonus if proficient with Survival skill.",
            callback: function() {
                showGatheringMaterialsForm();
            }
        },
        {
            title: "Hunt Game",
            subText: "Gather food using Dexterity or Wisdom checks. Add survival modifier if proficient with Survival skill.",
            callback: function() {
                showHuntGameForm();
            }
        }
    ];

    // Definición de las opciones de Loot and Hoards
    const lootAndHoardsOptions = [
        {
            title: "Individual Treasure",
            subText: "Replace Individual Treasure for humanoid type creatures.",
            callback: function() {
                loadOptions(optionsContainer, crIndividualOptions);
            }
        },
        {
            title: "Hoard",
            subText: "Replace treasure Hoards.",
            callback: function() {
                loadOptions(optionsContainer, crHoardOptions);
            }
        }
    ];

    // Definición de las opciones de Loot and Hoards
    const crIndividualOptions = [
        {
            title: "Individual Treasure (CR 0–4)",
            callback: function() {
                individualLootTable.giveResult('0-4');
            }
        },
        {
            title: "Individual Treasure (CR 5–10)",
            callback: function() {
                individualLootTable.giveResult('5-10');
            }
        },
        {
            title: "Individual Treasure (CR 11–16)",
            callback: function() {
                individualLootTable.giveResult('11-16');
            }
        },
        {
            title: "Individual Treasure (CR 17+)",
            callback: function() {
                individualLootTable.giveResult('17+');
            }
        }
    ];

    // Definición de las opciones de Loot and Hoards
    const crHoardOptions = [
        {
            title: "Treasure Crafting Substitutions Challenge 0–4",
            callback: function() {
                hoardLootTable.giveResult('0-4');
            }
        },
        {
            title: "Treasure Crafting Substitutions Challenge 5–10",
            callback: function() {
                hoardLootTable.giveResult('5-10');
            }
        },
        {
            title: "Treasure Crafting Substitutions Challenge 11–16",
            callback: function() {
                hoardLootTable.giveResult('11-16');
            }
        },
        {
            title: "Treasure Crafting Substitutions Challenge 17+",
            callback: function() {
                hoardLootTable.giveResult('17+');
            }
        }
    ];

    // Cargar opciones iniciales para Creature Size
    function loadInitialCreatureSizeOptions() {
        const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
        creatureSizeInput.innerHTML = '';  // Limpiar opciones anteriores

        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            creatureSizeInput.appendChild(option);
        });
    }

    // Cargar opciones iniciales para Looking For
    function loadInitialLookingForOptions() {
        const options = [
            { value: 'hide', text: 'Hide' },
            { value: 'meat', text: 'Meat' }
        ];
        lookingForInput.innerHTML = '';  // Limpiar opciones anteriores

        options.forEach(optionData => {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.text;
            lookingForInput.appendChild(option);
        });
    }

    // Cargar opciones específicas de materiales especiales
    function loadSpecialMaterialOptions(type) {
        creatureTypeInput.innerHTML = ''; // Limpiar opciones anteriores
        
        let options = [];
        if (type === 'hide') {
            options = [
                { value: 'tough hide/scales', text: 'Tough Hide/Scales' },
                { value: 'resistant hide/scales', text: 'Resistant Hide/Scales' },
                { value: 'dragon scales', text: 'Dragon Scales' }
            ];
        } else if (type === 'meat') {
            options = [
                { value: 'uncommon meat', text: 'Uncommon Meat' },
                { value: 'rare meat', text: 'Rare Meat' },
                { value: 'very rare meat', text: 'Very Rare Meat' },
                { value: 'legendary meat', text: 'Legendary Meat' }
            ];
        }
        
        // Añadir opciones al select de materiales especiales
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            creatureTypeInput.appendChild(opt);
        });
    }

    function hideAllForms() {
        basicHarvestingForm.classList.add('hide');
        exoticHarvestingForm.classList.add('hide');
        exoticRemnantForm.classList.add('hide');
        gatheringReagentsForm.classList.add('hide');
        gatheringMaterialsForm.classList.add('hide');
        huntingGameForm.classList.add('hide');
        // Agrega aquí cualquier otro formulario que tengas
    }

    // Función para mostrar el formulario de Basic Harvesting
    function showBasicHarvestingForm() {
        loadOptions(optionsContainer, []);  // Clear any previous options
        basicHarvestingForm.classList.remove('hide');
    }

    function showExoticHarvestingForm() {
        loadOptions(optionsContainer, []);  // Clear any previous options
        exoticHarvestingForm.classList.remove('hide');
    }

    function showExoticRemnantsForm() {
        loadOptions(optionsContainer, []);  // Clear any previous options
        exoticRemnantForm.classList.remove('hide');
    }

    function showGatheringReagentsForm() {
        loadOptions(optionsContainer, []);  // Limpiar opciones anteriores
        gatheringReagentsForm.classList.remove('hide');  // Mostrar el formulario
    }
    
    function showGatheringMaterialsForm() {
        loadOptions(optionsContainer, []);  // Limpiar opciones anteriores
        gatheringMaterialsForm.classList.remove('hide');  // Mostrar el formulario
    }

    function showHuntGameForm() {
        loadOptions(optionsContainer, []); // Limpia las opciones anteriores
        huntingGameForm.classList.remove('hide');
    }

    // Función para obtener la información del usuario
    function getHarvestingInfo() {
        const creatureSize = creatureSizeInput.value;
        const survivalModifier = parseInt(survivalModifierInput.value);
        const lookingFor = lookingForInput.value;
        let specialMaterials = null;
        let creatureCR = null;
        let creatureType = null;

        if (specialMaterialsCheckbox.checked) {
            specialMaterials = true;
            creatureCR = parseInt(creatureCRInput.value);
            creatureType = creatureTypeInput.value;
        }

        return { creatureSize, survivalModifier, lookingFor, specialMaterials, creatureCR, creatureType };
    }

    function calculateHarvestingResult(info) {
        const { creatureSize, survivalModifier, lookingFor, specialMaterials, creatureCR, creatureType } = info;
        const harvestingResult = { hide: null, meat: null, cr: null, specialMaterials: null, difficulty: null, specialDifficulty: null, survivalModifier: survivalModifier, rollResult: null };
    
        const sizeData = harvestingData[creatureSize];
        if (!sizeData || !sizeData.difficulty) {
            alert("Harvesting not possible for this creature size.");
            return null;
        }
    
        // Validación del CR mínimo para materiales especiales
        if (specialMaterials) {
            const materialData = specialMaterialsData[creatureType];
            if (creatureCR < materialData.minCR) {
                alert(`The creature's CR is too low for the selected special material. Minimum CR required is ${materialData.minCR}.`);
                return null;  // Detener el proceso si no se cumple el requisito mínimo
            }
        }
    
        // Dificultad base basada en el tamaño de la criatura
        let difficulty = sizeData.difficulty;
        harvestingResult.difficulty = difficulty;  // Guardar la dificultad base

        // CR de la criatura
        let cr = creatureCR;
        harvestingResult.cr = cr;  // Guardar el CR de la criatura
    
        // Realizamos el roll del d20
        const rollResult = rollDice(1, 20, 0); // No sumamos el modificador aquí
        harvestingResult.rollResult = rollResult;
    
        const success = (rollResult + survivalModifier) >= difficulty;
        harvestingResult.specialDifficulty = specialMaterialsData[creatureType].modifier;
    
        if (lookingFor.includes("hide") && success) {
            harvestingResult.hide = sizeData.hide;
    
            if (specialMaterials) {
                const materialData = specialMaterialsData[creatureType];
                const specialDifficulty = difficulty + materialData.modifier;  // Sumar la dificultad adicional
                if ((rollResult + survivalModifier) >= specialDifficulty) {
                    harvestingResult.specialMaterials = `${materialData.effect}`;
                    harvestingResult.hide = `${sizeData.hide}`;
                } else {
                    harvestingResult.specialMaterials = "Failed to extract special materials.";
                }
            }
        }
    
        if (lookingFor.includes("meat") && success) {
            harvestingResult.meat = sizeData.meat;
    
            if (specialMaterials) {
                const materialData = specialMaterialsData[creatureType];
                const specialDifficulty = difficulty + materialData.modifier;  // Sumar la dificultad adicional
                if ((rollResult + survivalModifier) >= specialDifficulty) {
                    harvestingResult.specialMaterials = `${creatureType}`;
                    harvestingResult.meat = `${sizeData.meat}`;
                } else {
                    harvestingResult.specialMaterials = "Failed to extract special materials.";
                }
            }
        }
    
        return harvestingResult;
    }
    
    function displayHarvestingResults(result) {
        if (!result) return;
        let category = 'Basic Harvesting';
    
        let difficulty = result.difficulty;
        if (result.specialDifficulty) {
            difficulty += ` / ${result.difficulty + result.specialDifficulty}`;
        }
    
        // Asegurarse de que el survivalModifier esté definido
        const cr = result.cr;
        const modifier = result.survivalModifier || 0;
        const diceResult = `${result.rollResult + modifier} (${result.rollResult} + ${modifier})`;
        let materialsFound = `${result.hide ? 'Hide: ' + result.hide : ''} ${result.meat ? 'Meat: ' + result.meat : ''}`;
        if(!materialsFound)
            materialsFound = 'None';
        let specialMaterials = result.specialMaterials || 'None';
    
        addResultToTable(category, difficulty, cr, diceResult, materialsFound, specialMaterials, 'N/A');
    }

    function updateAbilityModifierLabel(creatureType) {
        const abilityModifierLabel = document.getElementById('ability-modifier-label');
        let abilityCheckText = '';
    
        switch (creatureType) {
            case 'Dragon/Giants/Monstrosities':
                abilityCheckText = 'Medicine (Wis)';
                break;
            case 'Construct':
            case 'Aberration':
            case 'Undead':
                abilityCheckText = 'Arcana (Int)';
                break;
            case 'Plant':
                abilityCheckText = 'Nature (Int)';
                break;
            default:
                abilityCheckText = 'Ability Modifier';
                break;
        }
    
        abilityModifierLabel.textContent = `${abilityCheckText}`;
    }

    // Función para calcular el resultado de Exotic Harvesting
    function calculateExoticHarvestingResult() {
        const creatureType = creatureTypeInputExotic.value;
        const creatureCR = creatureCRInputExotic.value;
        const abilityModifier = parseInt(abilityModifierInputExotic.value);

        let table;
        if (creatureCR >= 0 && creatureCR <= 4) {
            table = exoticHarvestingData.exoticHarvesting["0-4"];
        } else if (creatureCR >= 5 && creatureCR <= 10) {
            table = exoticHarvestingData.exoticHarvesting["5-10"];
        } else if (creatureCR >= 11 && creatureCR <= 16) {
            table = exoticHarvestingData.exoticHarvesting["11-16"];
        } else {
            table = exoticHarvestingData.exoticHarvesting["17+"];
        }

        const creatureTable = table[creatureType];
        const dc = table.DC;
        const rollResult = rollDice(1, 100, 0);
        const abilityCheck = rollDice(1, 20, abilityModifier);

        // Verificar si la tirada de habilidad supera la DC
        if (abilityCheck < dc) {
            displayExoticHarvestingResults(creatureType, dc, creatureCR, abilityCheck, rollResult, "Failed to harvest materials (DC not met)");
            return;
        }

        const result = creatureTable.find(entry => {
            const [min, max] = entry.range.split('-').map(Number);
            return rollResult >= min && rollResult <= max;
        });

        displayExoticHarvestingResults(creatureType, dc, creatureCR, abilityCheck, rollResult, result.result);
    }

    // Función para mostrar los resultados de Exotic Harvesting
    function displayExoticHarvestingResults(creatureType, dc, creatureCR, abilityCheck, rollResult, result) {
        const category = 'Exotic Harvesting';
        const crDisplay = dc;
        const diceResult = `${abilityCheck} (d20) \n${rollResult} (d100)`;
        const materialsFound = result;

        addResultToTable(category, dc, creatureCR, diceResult, materialsFound, 'N/A', 'N/A');
    }

    function calculateExoticRemnantsResult() {
        const creatureType = document.getElementById('creature-type-remnants').value;
        const creatureCR = document.getElementById('creature-cr-remnants').value;
    
        let table;
        if (creatureCR >= 0 && creatureCR <= 4) {
            table = exoticRemnantsData.exoticRemnants["0-4"];
        } else if (creatureCR >= 5 && creatureCR <= 10) {
            table = exoticRemnantsData.exoticRemnants["5-10"];
        } else if (creatureCR >= 11 && creatureCR <= 16) {
            table = exoticRemnantsData.exoticRemnants["11-16"];
        } else {
            table = exoticRemnantsData.exoticRemnants["17+"];
        }
    
        const creatureTable = table[creatureType];
        const rollResult = rollDice(1, 100, 0);
    
        const result = creatureTable.find(entry => {
            const [min, max] = entry.range.split('-').map(Number);
            return rollResult >= min && rollResult <= max;
        });
    
        displayExoticRemnantsResults(creatureType, creatureCR, rollResult, result.result);
    }
    
    function displayExoticRemnantsResults(creatureType, creatureCR, rollResult, result) {
        const category = 'Exotic Remnants';
        const crDisplay = creatureCR;
        const diceResult = `${rollResult} (d100)`;
        const materialsFound = result;
    
        addResultToTable(category, 'N/A', crDisplay, diceResult, materialsFound, 'N/A', 'N/A');
    }

     // Mostrar u ocultar el campo de Proficiency Bonus según la casilla de verificación
     herbalismProficiencyCheckbox.addEventListener('change', function() {
        if (herbalismProficiencyCheckbox.checked) {
            proficiencyBonusSection.classList.remove('hide');
        } else {
            proficiencyBonusSection.classList.add('hide');
            proficiencyBonusInput.value = ''; // Limpiar el valor si se oculta
        }
    });

    // Función para calcular el resultado de Gathering Reagents
    function calculateGatheringReagentsResult() {
        const isTraveling = travelingCheckbox.checked;
        const biome = biomeSelect.value;
        const wisdomModifier = parseInt(wisdomModifierInput.value);
        const hasHerbalismProficiency = herbalismProficiencyCheckbox.checked;
        const proficiencyBonus = hasHerbalismProficiency ? parseInt(proficiencyBonusInput.value) : 0;
    
        let gatheringResults = [];
        let rolls = isTraveling ? 1 : 2;  // Si no está viajando, realiza dos tiradas
    
        for (let i = 0; i < rolls; i++) {
            let roll1 = rollDice(1, 20, 0);
            let roll2 = rollDice(1, 20, 0);
            let abilityRoll = isTraveling ? Math.min(roll1, roll2) : roll1;
    
            let totalRoll = abilityRoll + wisdomModifier + proficiencyBonus; // Sumamos el modificador y la competencia
    
            let d100Roll = rollDice(1, 100, 0);
            let reagent = findReagent(biome, d100Roll);
            
            let reagentObtained = totalRoll >= reagent.dc ? reagent.result : "Failed to gather reagent";
    
            gatheringResults.push({
                dc: reagent.dc, // Incluimos la DC desde la tabla de reagentes
                abilityRoll: abilityRoll,
                rolls: isTraveling ? [roll1, roll2] : [abilityRoll],
                abilityModifier: wisdomModifier,
                proficiencyBonus: proficiencyBonus,
                totalRoll: totalRoll, // Guardamos el resultado total
                d100Roll: d100Roll,
                reagent: reagentObtained
            });
        }

        displayGatheringResults(gatheringResults);
    }

    // Función para buscar el reagente en la tabla según el bioma y el d100
    function findReagent(biome, d100Roll) {
        const table = gatheringReagentsData[biome];
        for (const entry of table) {
            const [min, max] = entry.range.split('-').map(Number);
            if (d100Roll >= min && d100Roll <= max) {
                return entry;
            }
        }
        return null;
    }

    // Función para mostrar los resultados de Gathering
    function displayGatheringResults(gatheringResults) {
        gatheringResults.forEach(result => {
            const dc = result.dc || "N/A"; // Extraemos la dificultad de la tabla y mostramos "N/A" si no está definida
            const diceResult = `d100 result: ${result.d100Roll} \nd20 result: ${result.abilityRoll} (d20: ${result.rolls.map(elem => elem).join(', ')}) + ${result.abilityModifier} (Modifier) + ${result.proficiencyBonus} (Proficiency Bonus) = ${result.totalRoll}`;
            
            addResultToTable(
                'Gather Reagents', 
                dc, // Mostramos la DC en la columna correspondiente
                'N/A',
                diceResult, 
                result.reagent, 
                'N/A', 
                'N/A'
            );
        });
    }
    
    // Función para calcular el resultado de Gathering Materials
    function calculateGatheringMaterialsResult() {
        const isTraveling = travelingCheckboxMaterials.checked;
        const biome = biomeSelectMaterials.value;
        const abilityModifier = parseInt(abilityModifierInputMaterials.value);
        const hasSurvivalProficiency = survivalProficiencyCheckbox.checked;
        const proficiencyBonus = hasSurvivalProficiency ? parseInt(proficiencyBonusInputMaterials.value) : 0;
    
        let gatheringResults = [];
        let rolls = isTraveling ? 1 : 2;
        
        for (let i = 0; i < rolls; i++) {
            let roll1 = rollDice(1, 20, 0);
            let roll2 = rollDice(1, 20, 0);
            let abilityRoll = isTraveling ? Math.min(roll1, roll2) : roll1;
    
            let totalRoll = abilityRoll + abilityModifier + proficiencyBonus;
    
            let d100Roll = rollDice(1, 100, 0);
            let material = findMaterial(biome, d100Roll);
    
            let materialObtained = totalRoll >= material.dc ? material.result : "Failed to gather material";
    
            gatheringResults.push({
                dc: material.dc,
                abilityRoll: abilityRoll,
                rolls: isTraveling ? [roll1, roll2] : [abilityRoll], // Mostrar ambos resultados si está viajando
                abilityModifier: abilityModifier,
                proficiencyBonus: proficiencyBonus,
                totalRoll: totalRoll,
                d100Roll: d100Roll,
                material: materialObtained
            });
        }
    
        displayGatheringMaterialsResults(gatheringResults);
    }
    

    // Función para buscar el material en la tabla según el bioma y el d100
    function findMaterial(biome, d100Roll) {
        const table = gatheringMaterialsData[biome];
        for (const entry of table) {
            const [min, max] = entry.range.split('-').map(Number);
            if (d100Roll >= min && d100Roll <= max) {
                return entry;
            }
        }
        return null;
    }

    // Función para mostrar los resultados de Gathering Materials
    function displayGatheringMaterialsResults(gatheringResults) {
        gatheringResults.forEach(result => {
            const dc = result.dc || "N/A";
            const diceResult = `d100 result: ${result.d100Roll} \nd20 result: ${result.abilityRoll} (d20: ${result.rolls.map(elem => elem).join(', ')}) + ${result.abilityModifier} (Modifier) + ${result.proficiencyBonus} (Proficiency Bonus) = ${result.totalRoll}`;
    
            addResultToTable(
                'Gather Materials',
                dc,
                'N/A',
                diceResult,
                result.material,
                'N/A',
                'N/A'
            );
        });
    }
    
   
    function calculateHuntGameResult() {
        const isTraveling = travelingCheckboxHuntingGame.checked;
        const biome = biomeSelecthuntingGame.value;
        const abilityModifier = parseInt(abilityModifierInputHuntingGame.value);
        const hasSurvivalProficiency = survivalProficiencyCheckboxHuntingGame.checked;
        const proficiencyBonus = hasSurvivalProficiency ? parseInt(proficiencyBonusHuntingGame.value) : 0;
    
        let huntGameResults = [];
        let rolls = isTraveling ? 1 : 2;
    
        for (let i = 0; i < rolls; i++) {
            let roll1 = rollDice(1, 20, 0);
            let roll2 = rollDice(1, 20, 0);
            let abilityRoll = isTraveling ? Math.min(roll1, roll2) : roll1;
    
            let totalRoll = abilityRoll + abilityModifier + proficiencyBonus;
    
            let d100Roll = rollDice(1, 100, 0);
            let food = findHuntGame(biome, d100Roll);
    
            let foodObtained = totalRoll >= food.dc ? food.result : "Failed to gather food";
    
            huntGameResults.push({
                dc: food.dc,
                abilityRoll: abilityRoll,
                rolls: isTraveling ? [roll1, roll2] : [abilityRoll], // Mostrar ambos resultados si está viajando
                abilityModifier: abilityModifier,
                proficiencyBonus: proficiencyBonus,
                totalRoll: totalRoll,
                d100Roll: d100Roll,
                food: foodObtained
            });
        }
    
        displayHuntGameResults(huntGameResults);
    }
    
    
    function findHuntGame(biome, d100Roll) {
        const table = huntGameData[biome];
        for (const entry of table) {
            const [min, max] = entry.range.split('-').map(Number);
            if (d100Roll >= min && d100Roll <= max) {
                return entry;
            }
        }
        return null;
    }
    
    function displayHuntGameResults(huntGameResults) {
        huntGameResults.forEach(result => {
            const dc = result.dc || "N/A";
            const diceResult = `${result.abilityRoll} (d20: ${result.rolls.map(elem => elem).join(', ')}) + ${result.abilityModifier} (Modifier) + ${result.proficiencyBonus} (Proficiency) = ${result.totalRoll}`;
    
            addResultToTable(
                'Hunt Game',
                dc,
                'N/A',
                diceResult,
                result.food,
                'N/A',
                'N/A'
            );
        });
    }
        

    // Función para añadir un resultado a la tabla
    function addResultToTable(category, dc, cr, diceResult, materialsFound, extraMaterials, goldValue) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category}</td>
            <td>${dc}</td>
            <td>${cr}</td>
            <td>${diceResult}</td>
            <td>${materialsFound}</td>
            <td>${extraMaterials}</td>
            <td>${goldValue}</td>
        `;
        resultsTableBody.appendChild(row);
        closePopup();
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function rollDice(number, diceNumber, modifier) {
        let result = 0;
        for (let i = 0; i < number; i++) {
            result += getRandomInt(diceNumber);
        }
        return result + modifier;
    }

    // Función para crear un elemento de opción
    function createOption(option) {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('flex-1', 'option');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = option.title;

        const subTextSpan = document.createElement('span');
        subTextSpan.classList.add('sub-text');
        subTextSpan.textContent = option.subText;

        optionDiv.appendChild(titleSpan);
        optionDiv.appendChild(subTextSpan);

        // Asignar el evento de clic usando el callback proporcionado
        optionDiv.addEventListener('click', option.callback);

        return optionDiv;
    }

    // Función para cargar opciones en un contenedor
    function loadOptions(container, options) {
        container.innerHTML = '';  // Limpiar el contenedor
        options.forEach(option => {
            const optionElement = createOption(option);
            container.appendChild(optionElement);
        });
    }

    // Función para abrir el popup con las opciones correctas y añadir overflow: hidden al body
    function openPopup(options) {
        loadOptions(optionsContainer, options);
        hideAllForms();
        popupWrapper.classList.remove('hide');
        popupContainerWrapper.classList.remove('hide');
        document.body.style.overflow = 'hidden';  // Desactivar el scroll del body
    }

    // Función para cerrar el popup y restaurar el scroll del body
    function closePopup() {
        popupWrapper.classList.add('hide');
        popupContainerWrapper.classList.add('hide');
        document.body.style.overflow = '';  // Restaurar el scroll del body
        hideAllForms();
    }

    // Asignar eventos a los botones para abrir el popup con las opciones correspondientes
    addCreatureBtn.addEventListener('click', () => openPopup(creatureOptions));
    gatheringBtn.addEventListener('click', () => openPopup(gatheringOptions));

    // Cerrar el popup
    closePopupBtn.addEventListener('click', closePopup);

    // Cerrar el popup al hacer clic fuera de la caja
    popupWrapper.addEventListener('click', (event) => {
        if (event.target === popupWrapper || event.target === popupContainerWrapper) {
            closePopup();
        }
    });

    // Mostrar u ocultar opciones de materiales especiales
    lookingForInput.addEventListener('change', function() {
        if (specialMaterialsCheckbox.checked) {
            specialMaterialsSection.classList.remove('hide');
            loadSpecialMaterialOptions(lookingForInput.value);
        } else {
            specialMaterialsSection.classList.add('hide');
        }
    });

    // Cargar opciones específicas de materiales especiales
    function loadSpecialMaterialOptions(type) {
        creatureTypeInput.innerHTML = ''; // Limpiar opciones anteriores
    
        let options = [];
        if (type === 'hide') {
            options = [
                { value: 'tough hide/scales', text: 'Tough Hide/Scales' },
                { value: 'resistant hide/scales', text: 'Resistant Hide/Scales' },
                { value: 'dragon scales', text: 'Dragon Scales' }
            ];
        } else if (type === 'meat') {
            options = [
                { value: 'uncommon meat', text: 'Uncommon Meat' },
                { value: 'rare meat', text: 'Rare Meat' },
                { value: 'very rare meat', text: 'Very Rare Meat' },
                { value: 'legendary meat', text: 'Legendary Meat' }
            ];
        }
    
        // Añadir opciones al select de materiales especiales
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            creatureTypeInput.appendChild(opt);
        });
    }

    // Manejar el cambio en el checkbox de materiales especiales
    specialMaterialsCheckbox.addEventListener('change', function() {
        if (specialMaterialsCheckbox.checked) {
            specialMaterialsSection.classList.remove('hide');
            loadSpecialMaterialOptions(lookingForInput.value);
        } else {
            specialMaterialsSection.classList.add('hide');
        }
    });

    // Ejecución del harvesting
    startHarvestingBtn.addEventListener('click', () => {
        const harvestingInfo = getHarvestingInfo();
        const harvestingResult = calculateHarvestingResult(harvestingInfo);  // Calcula el resultado del harvesting
        displayHarvestingResults(harvestingResult);  // Muestra el resultado en la tabla
    });

    loadInitialCreatureSizeOptions();
    loadInitialLookingForOptions();

    // Mostrar u ocultar opciones de materiales especiales cuando cambia el select de "Looking For"
    lookingForInput.addEventListener('change', function() {
        loadSpecialMaterialOptions(lookingForInput.value);
    });

    // Inicializar con la opción por defecto
    loadSpecialMaterialOptions(lookingForInput.value);

    startExoticHarvestingBtn.addEventListener('click', calculateExoticHarvestingResult);

    creatureTypeInputExotic.addEventListener('change', function() {
        updateAbilityModifierLabel(creatureTypeInputExotic.value);
    });

    // Llama a la función inicialmente para establecer el valor correcto
    updateAbilityModifierLabel(creatureTypeInputExotic.value);

    startExoticRemnantBtn.addEventListener('click', calculateExoticRemnantsResult);

    // Mostrar u ocultar el campo de Proficiency Bonus según la casilla de verificación
    herbalismProficiencyCheckbox.addEventListener('change', function() {
        if (herbalismProficiencyCheckbox.checked) {
            proficiencyBonusSection.classList.remove('hide');
        } else {
            proficiencyBonusSection.classList.add('hide');
            proficiencyBonusInput.value = ''; // Limpiar el valor si se oculta
        }
    });

    // Añadir el evento para iniciar el Gathering
    startGatheringBtn.addEventListener('click', calculateGatheringReagentsResult);

    survivalProficiencyCheckbox.addEventListener('change', function() {
        if (this.checked) {
            proficiencyBonusSectionMaterials.classList.remove('hide');
        } else {
            proficiencyBonusSectionMaterials.classList.add('hide');
        }
    });
    
    // Asignar el botón para iniciar la recolección de materiales
    startGatheringMaterialsBtn.addEventListener('click', calculateGatheringMaterialsResult);

    survivalProficiencyCheckboxHuntingGame.addEventListener('change', function() {
        if (this.checked) {
            proficiencyBonusSectionHuntingGame.classList.remove('hide');
        } else {
            proficiencyBonusSectionHuntingGame.classList.add('hide');
        }
    });
    
    // Asignar el botón para iniciar la recolección de materiales
    startGatheringHuntingGameBtn.addEventListener('click', calculateHuntGameResult);  
});
