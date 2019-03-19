const Scrape = require("./avanzaScraper")
const TIME_CONSTANT = 1000 * 60 * 2;

function SetTimers () {
    try {
        console.log('set avanza timer')
        AvanzaTimer(TIME_CONSTANT)
    } catch (error) {
        console.log(error)
    }

}
    
function AvanzaTimer (timerInterval) {
    console.log('AvanzaTimer')
    setInterval(Scrape,timerInterval);
}

module.exports = SetTimers