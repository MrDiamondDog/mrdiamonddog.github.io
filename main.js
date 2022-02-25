var loreSpace = "]','[{\"text\":\" \"}"

var allEnchants = [
    "sharpness",
    "smite",
    "bane_of_arthropods",
    "knockback",
    "fire_aspect",
    "looting",
    "sweeping",
    "vanishing_curse",
    "effciency",
    "silk_touch",
    "fortune",
    "protection",
    "fire_protection",
    "feather_falling",
    "blast_protection",
    "projectile_protection",
    "thorns",
    "depth_strider",
    "frost_walker",
    "soul_speed",
    "respiration",
    "aqua_affinity",
    "binding_curse",
]

function generate(){
    var command = "/give @p "

    var name = document.getElementsByClassName("name-field")[0].value
    var id = document.getElementsByClassName("id-field")[0].value
    var dungeonItem = document.getElementsByClassName("dungeon-item-field")[0].checked
    var stars = document.getElementsByClassName("stars")[0].value
    var recombobulated = document.getElementsByClassName("recom-field")[0].checked
    var rarity = document.getElementsByClassName("rarity-field")[0].value
    var rarityColor = document.getElementsByClassName("color-field")[0].value
    var type = document.getElementsByClassName("type-field")[0].value
    var description = document.getElementsByClassName("description")[0].value

    var damage = document.getElementsByClassName("damage-value")[0].value
    var strength = document.getElementsByClassName("strength-value")[0].value

    var custom1name = document.getElementsByClassName("custom-1-name")[0].value
    var custom1value = document.getElementsByClassName("custom-1-val")[0].value

    var custom2name = document.getElementsByClassName("custom-2-name")[0].value
    var custom2value = document.getElementsByClassName("custom-2-val")[0].value

    var custom3name = document.getElementsByClassName("custom-3-name")[0].value
    var custom3value = document.getElementsByClassName("custom-3-val")[0].value

    var custom4name = document.getElementsByClassName("custom-4-name")[0].value
    var custom4value = document.getElementsByClassName("custom-4-val")[0].value

    var ability1name = document.getElementsByClassName("ability-1-name")[0].value
    var ability1type = document.getElementsByClassName("ability-1-type")[0].value
    var ability1desc = document.getElementsByClassName("ability-1-desc")[0].value
    var ability1mana = document.getElementsByClassName("ability-1-mana")[0].value
    var ability1cool = document.getElementsByClassName("ability-1-cool")[0].value

    var ability2name = document.getElementsByClassName("ability-2-name")[0].value
    var ability2type = document.getElementsByClassName("ability-2-type")[0].value
    var ability2desc = document.getElementsByClassName("ability-2-desc")[0].value
    var ability2mana = document.getElementsByClassName("ability-2-mana")[0].value
    var ability2cool = document.getElementsByClassName("ability-2-cool")[0].value

    var ability3name = document.getElementsByClassName("ability-3-name")[0].value
    var ability3type = document.getElementsByClassName("ability-3-type")[0].value
    var ability3desc = document.getElementsByClassName("ability-3-desc")[0].value
    var ability3mana = document.getElementsByClassName("ability-3-mana")[0].value
    var ability3cool = document.getElementsByClassName("ability-3-cool")[0].value

    var enchantments = document.getElementsByClassName("enchantments")[0].value
    var ultimate = document.getElementsByClassName("ult-enchantment")[0].value
    var actualEnchantments = document.getElementsByClassName("actual-enchant")
    var glintonly = document.getElementsByClassName("glint-only")[0].checked
    
    var damageOutput = getOutputForAttribute("Damage", damage)
    var strengthOutput = getOutputForAttribute("Strength", strength)

    var custom1Output = getCustomOutputForAttribute(custom1name, custom1value)
    var custom2Output = getCustomOutputForAttribute(custom2name, custom2value)
    var custom3Output = getCustomOutputForAttribute(custom3name, custom3value)
    var custom4Output = getCustomOutputForAttribute(custom4name, custom4value)

    var ability1Output = getAbilityOutput(ability1name, ability1type, ability1desc, ability1mana, ability1cool)
    var ability2Output = getAbilityOutput(ability2name, ability2type, ability2desc, ability2mana, ability2cool)
    var ability3Output = getAbilityOutput(ability3name, ability3type, ability3desc, ability3mana, ability3cool)

    rarity = fixQuotes(rarity)
    if (!dungeonItem && !recombobulated){
        rarityOutput = "{\"text\":\"" + rarity.toUpperCase() + " " + type.toUpperCase() + "\",\"italic\":false,\"obfuscated\":false,\"color\":\"" + rarityColor +"\",\"bold\":true}"
    }
    else if (dungeonItem && recombobulated){
        rarityOutput = "{\"text\":\"e\",\"color\":\"" + rarityColor +"\",\"obfuscated\":true,\"bold\":true,\"italic\":false},{\"text\":\" \",\"obfuscated\":false},{\"text\":\"" + rarity.toUpperCase() + " DUNGEON " + type.toUpperCase() + "\",\"color\":\"" + rarityColor + "\",\"italic\":false,\"obfuscated\":false,\"bold\":true},{\"text\":\" \",\"obfuscated\":false},{\"text\":\"e\",\"color\":\"" + rarityColor + "\",\"obfuscated\":true,\"bold\":true,\"italic\":false}"
    }
    else if (dungeonItem){
        rarityOutput = "{\"text\":\"" + rarity.toUpperCase() + " DUNGEON " + type.toUpperCase() + "\",\"italic\":false,\"obfuscated\":false,\"color\":\"" + rarityColor +"\",\"bold\":true}"
    } 
    else if (recombobulated){
        rarityOutput = "{\"text\":\"e\",\"color\":\"" + rarityColor +"\",\"obfuscated\":true,\"bold\":true,\"italic\":false},{\"text\":\" \",\"obfuscated\":false},{\"text\":\"" + rarity.toUpperCase() + " " + type.toUpperCase() + "\",\"color\":\"" + rarityColor + "\",\"italic\":false,\"obfuscated\":false,\"bold\":true},{\"text\":\" \",\"obfuscated\":false},{\"text\":\"e\",\"color\":\"" + rarityColor + "\",\"obfuscated\":true,\"bold\":true,\"italic\":false}"
    }

    var enchantmentOutput = generateEnchants(enchantments, ultimate)

    var actualEnchantOutput = generateActualEnchants(actualEnchantments, glintonly)

    var descriptionOutput = generateDescription(description)

    var starsOutput = generateStars(stars)

    command += id
    command += "{"

    command += "HideFlags:63,Unbreakable:1b,"

    command += "Enchantments:["

    command += actualEnchantOutput

    command += "],"

    command += "display:{Name:'[{\"text\":\"" + name + " \",\"color\":\"" + rarityColor + "\",\"italic\":false}," + starsOutput + "]',"

    command += "Lore:['["
    command += damageOutput + "]','["
    command += strengthOutput + "]','["
    
    command += custom1Output + "]','["
    command += custom2Output + "]','["
    command += custom3Output + "]','["
    command += custom4Output + "]','["

    command += (enchantmentOutput != "" ? loreSpace + "]','[" : "")

    command += enchantmentOutput + "]','["

    command += (enchantmentOutput != "" ? loreSpace + "]','[" : "")
    
    command += ability1Output + (ability1Output != "" ? loreSpace + "]','[" : "")
    command += ability2Output + (ability2Output != "" ? loreSpace + "]','[" : "")
    command += ability3Output + (ability3Output != "" ? loreSpace + "]','[" : "") + "]','["

    command += descriptionOutput + "]','["

    command += rarityOutput

    command += "]']}}"
    $('.result-field').text(command)
}

function getOutputForAttribute(name, value){
    name = fixQuotes(name)
    if (value != ""){
        return "{\"text\":\"" + name + ": \",\"color\":\"gray\",\"italic\":false},{\"text\":\"+" + value + "\",\"color\":\"red\",\"italic\":false}"
    } 
    return ""
}

function getCustomOutputForAttribute(name, value){
    name = fixQuotes(name)
    if (name != ""){
        return "{\"text\":\"" + name + ": \",\"color\":\"gray\",\"italic\":false},{\"text\":\"+" + value + "\",\"color\":\"red\",\"italic\":false}"
    } 
    return ""
}

function getAbilityOutput(name, type, desc, mana, cooldown){
    name = fixQuotes(name)
    desc = fixQuotes(desc)
    
    var descSplit = desc.split('\n')
    if (name != ""){
        if (type == "right click"){
            return "{\"text\":\"Item Ability: " + name + "\",\"color\":\"gold\",\"italic\":false},{\"text\":\" RIGHT CLICK\",\"bold\":true,\"italic\":false,\"color\":\"yellow\"}]','{\"text\":\"" + descSplit[0] + "\",\"color\":\"gray\",\"italic\":false}','" + (descSplit[1] != undefined ? "{\"text\":\"" + descSplit[1] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','" + (descSplit[2] != undefined ? "{\"text\":\"" + descSplit[2] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','[" + (mana != "" ? "{\"text\":\"Mana Cost: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + mana + "\",\"color\":\"dark_aqua\",\"italic\":false}" : "") + "]','[" + (cooldown != "" ? "{\"text\":\"Cooldown: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + cooldown + "s\",\"color\":\"green\"}" : "")
        }
        if (type == "passive"){
            return "{\"text\":\"Item Ability: " + name + "\",\"color\":\"gold\",\"italic\":false}]','{\"text\":\"" + descSplit[0] + "\",\"color\":\"gray\",\"italic\":false}','" + (descSplit[1] != undefined ? "{\"text\":\"" + descSplit[1] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','" + (descSplit[2] != undefined ? "{\"text\":\"" + descSplit[2] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','[" + (mana != "" ? "{\"text\":\"Mana Cost: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + mana + "\",\"color\":\"dark_aqua\",\"italic\":false}" : "") + "]','[" + (cooldown != "" ? "{\"text\":\"Cooldown: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + cooldown + "s\",\"color\":\"green\"}" : "")
        }
        if (type == "full set bonus"){
            return "{\"text\":\"Full Set Bonus: " + name + "\",\"color\":\"gold\",\"italic\":false}]','{\"text\":\"" + descSplit[0] + "\",\"color\":\"gray\",\"italic\":false}','" + (descSplit[1] != undefined ? "{\"text\":\"" + descSplit[1] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','" + (descSplit[2] != undefined ? "{\"text\":\"" + descSplit[2] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','[" + (mana != "" ? "{\"text\":\"Mana Cost: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + mana + "\",\"color\":\"dark_aqua\",\"italic\":false}" : "") + "]','[" + (cooldown != "" ? "{\"text\":\"Cooldown: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + cooldown + "s\",\"color\":\"green\"}" : "")
        }
        if (type == "sneak"){
            return "{\"text\":\"Item Ability: " + name + "\",\"color\":\"gold\",\"italic\":false},{\"text\":\" SNEAK\",\"bold\":true,\"italic\":false,\"color\":\"yellow\"}]','{\"text\":\"" + descSplit[0] + "\",\"color\":\"gray\",\"italic\":false}','" + (descSplit[1] != undefined ? "{\"text\":\"" + descSplit[1] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','" + (descSplit[2] != undefined ? "{\"text\":\"" + descSplit[2] + "\",\"color\":\"gray\",\"italic\":false}" : "") + "','[" + (mana != "" ? "{\"text\":\"Mana Cost: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + mana + "\",\"color\":\"dark_aqua\",\"italic\":false}" : "") + "]','[" + (cooldown != "" ? "{\"text\":\"Cooldown: \",\"color\":\"dark_gray\",\"italic\":false},{\"text\":\"" + cooldown + "s\",\"color\":\"green\"}" : "")
        }
    }
    return ""
}

function fixQuotes(str){
    return str.replace("'", "\\'")
}

function generateEnchants(str, ultimate){
    var output = ""
    var ultimated = false
    if (ultimate != ""){
        output += "{\"text\":\"" + ultimate + ", \",\"color\":\"light_purple\",\"italic\":false,\"bold\":true},"
    }
    var splitStr = str.split('\n')
    for (var i = 0; i < splitStr.length; i++){
        if (i != splitStr.length - 1){
            if (ultimate != "" && !ultimated){
                output += "{\"text\":\"" + splitStr[i] + "\",\"color\":\"blue\",\"italic\":false,\"bold\":false}]','["
                ultimated = true
            } else if (ultimate != "" && ultimated){
                output += "{\"text\":\"" + splitStr[i] + "\",\"color\":\"blue\",\"italic\":false,\"bold\":false}]','["
            }
        } else {
            output += "{\"text\":\"" + splitStr[i] + "\",\"color\":\"blue\",\"italic\":false,\"bold\":false}"
        }
    }
    return output
}

function generateActualEnchants(enchants, glint_only){
    var output = ""
    if (glint_only){
        return "{}"
    }
    for (var i = 0; i < enchants.length; i++){
        if (enchants[i].value != ""){
            output += "{id:\"" + allEnchants[i] + "\",lvl:" + enchants[i].value +"s},"
        }
    }
    return output
}

function generateStars(stars){
    var output = ""
    var output2 = ""
    for (var i = 0; i < stars; i++){
        output2 += "✪"
    }
    output = "{\"text\":\"" + output2 + "\",\"color\":\"gold\",\"italic\":false}"
    return output
}

function generateDescription(str){
    var output = ""
    var splitStr = str.split('\n')
    for (var i = 0; i < splitStr.length; i++){
        if (i != splitStr.length - 1){
            output += "{\"text\":\"" + splitStr[i] + "\",\"color\":\"gray\",\"italic\":false,\"bold\":false}]','["
        } else {
            output += "{\"text\":\"" + splitStr[i] + "\",\"color\":\"gray\",\"italic\":false,\"bold\":false}"
        }
    }
    return output
}


function generateCrafting(){
    var name = document.getElementsByClassName("cc-name-field")[0].value
    var id = document.getElementsByClassName("cc-id-field")[0].value

    var rname = document.getElementsByClassName("cc-name-field")[8].value
    var r = document.getElementsByClassName("cc-field")[8].value

    var output = "/execute at @a run execute if block ~ ~-1 ~ "
    output += id
    
    for (i = 0; i <= 8; i++){
        output += generateItems(i, document.getElementsByClassName("cc-field")[i].value, ccname0 = document.getElementsByClassName("cc-name-field")[i].value, 1)
    }

    $('.result-field').text(output)
}

function generateItems(slot, id, name, count){
    var output = "{Slot:" + slot + "b,id:\"" + id + "\",Count:" + count + "b"
    if (name != ""){
        output += ",tag:{display:{Name:'{\"text\":\"e\"}'}}"
    } 
    output += "},"
    return output
}