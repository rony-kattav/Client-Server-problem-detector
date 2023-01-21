/**
 * Returns the appropriate error message based on the user input.
 * 
 * @param {object} userData the user input
 * @returns {string} the error message
 */
function calcMsg(userData){
    let {serialNum, lightsStatus, NumberOfLights} = userData;
    serialNum = serialNum.toUpperCase();
    // cut the start of the serial number
    let serialStart = serialNum.slice(0, 4);
    let res = {
        msg: String,
        statusIndex: Number // 1 - valid input, 0 - invlid input
    }

    const status = getLightStatus(lightsStatus);

    if(serialStart === '24-X'){
        res.msg = "please upgrade your device";
        res.statusIndex = 1;
        return res 
    }
    else if(serialStart === '36-X'){
        return getRes36(res, status, NumberOfLights)
    }
    else if (serialStart === '51-B'){
        return getRes51(res, status)
    }
    // if serial number consists only numbers
    else if(/^\d+$/.test(serialNum)){
        res.msg = "Bad serial number";
        res.statusIndex = 0;
        return res
    }
    else {
        res.msg = "Unknown device";
        res.statusIndex = 0;
        return res
    }
}

/**
 * Returns the appropriate error message for serial number that starts with 36.
 * 
 * @param {object} res the appropriate message
 * @param {object} status number of lights that on/off/blinking
 * @param {int} NumberOfLights the number of lights in the device
 * @returns {object} the appropriate message
 */
function getRes36(res, status, NumberOfLights){
    if(status.off === NumberOfLights){
        res.msg = "turn on the device";
        res.statusIndex = 1;
        return res
    }
    else if(status.on === NumberOfLights){
        res.msg = "ALL is ok";
        res.statusIndex = 1;
        return res
    }
    else if(status.blinking >= 2){
        res.msg = "Please wait";
        res.statusIndex = 1;
        return res
    }
    else {
        res.msg = "not a valid option, please select a different light indicator sequence";
        res.statusIndex = 0;
        return res
    }
}

/**
 * Returns the appropriate error message for serial number that starts with 51.
 * 
 * @param {object} res the appropriate message
 * @param {object} status number of lights that on/off/blinking
 * @returns {object} the appropriate message
 */
function getRes51(res, status){
    if(status.off === 3){
        res.msg = "turn on the device";
        res.statusIndex = 1;
        return res
    }
    else if(status.blinking >= 1){
        res.msg = "Please wait";
        res.statusIndex = 1;
        return res
    }
    else if(status.on > 1){
        res.msg = "ALL is ok";
        res.statusIndex = 1;
        return res
    } else {
        res.msg = "not a valid option, please select a different light indicator sequence";
        res.statusIndex = 0;
        return res
    }
}

/**
 * Returns object with the number of lights that are on/off/blinking.
 *  
 * @param {object} lightsStatus the user input of the lights
 * @returns {object} the number of lights that are on/off/blinking
 */
function getLightStatus(lightsStatus){
    let lightsArr = [];
    lightsStatus.forEach(light => {
        lightsArr.push(light.status)
    });

    let status = {
        off: 0,
        on: 0,
        blinking: 0
    }

    // count number of accurances from each light
    lightsArr.forEach(light => {
        if(light === 'off'){
            status.off++;
        }
        else if(light === 'on'){
            status.on++;
        }
        else {
            status.blinking++;
        }
    })

    return status
}

/**
 * Returns the curent date and time.
 * 
 * @returns {string} current date and time
 */
function getCurrDate(){
    const date = new Date();
    const day = date.getDate();
    // indexed from 0
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();
    return `${day}-${month}-${year} ${time}`
}

module.exports = { calcMsg, getCurrDate }
