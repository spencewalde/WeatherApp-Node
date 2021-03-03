const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ef68ddd22e255b82c1bed49cb78b0a1a&query=' + latitude + ',' + longitude + '&units=f'
    
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find cooridate location. try another search',undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '
            + body.current.temperature + ' degrees out. It feels like ' 
            + body.current.feelslike + ' degrees out.')
        }


    })


}

module.exports = forecast

