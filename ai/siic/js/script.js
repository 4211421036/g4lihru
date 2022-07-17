class CurrentWeather {
    changeProperties(city, date, temperature, description, icon, feelslike, sunrise, sunset, country) {
        this.city = city;
        this.temperature = temperature;
        this.description = description;
        this.icon = icon;
        this.date = date;
        this.feelslike = feelslike;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.country = country;
    }
}

class ForecastWeather {
    changeProperties(date, time, icon, description, temperature, feelslike, wind) {
        this.date = date;
        this.time = time;
        this.icon = icon;
        this.description = description;
        this.temperature = temperature;
        this.feelslike = feelslike;
        this.wind = wind;
    }
}

class Weekday {
    constructor(name, day, month, icon, description, temperature) {
        this.name = name;
        this.day = day;
        this.month = month;
        this.icon = icon;
        this.description = description;
        this.temperature = temperature;
        this.forecast = [];
    }
}

class NetworkManager {
    static getCurrentWeather(cityname) {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=921e83b9da8a40a760ad74d5cedd6bbd`;
        return $.getJSON(url, function (data) {
            current_weather.changeProperties(data.name, getDate(),
                parseInt(data.main.temp, 10), data.weather[0].main,
                data.weather[0].icon, parseInt(data.main.feels_like, 10), getTime(data.sys.sunrise),
                getTime(data.sys.sunset), data.sys.country);

            updateCurrentWeatherHTML();
        }).fail(function () {
            searchError();
        });
    }

    static getForecast(cityname) {
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=921e83b9da8a40a760ad74d5cedd6bbd`;

        $.getJSON(url, function (data) {
            forecast = [];
            for (let i = 0; i < data.list.length; i++) {
                let tmp_weather = new ForecastWeather();
                let wind_speed = parseInt(data.list[i].wind.speed * (60 * 60) / 1000, 10);
                let time = data.list[i].dt_txt.split(" ");
                tmp_weather.changeProperties(time[0], time[1].substring(0, 5), data.list[i].weather[0].icon,
                    data.list[i].weather[0].main, parseInt(data.list[i].main.temp, 10),
                    parseInt(data.list[i].main.feels_like, 10), `${wind_speed} ${degToCompass(data.list[i].wind.deg)}`);

                forecast.push(tmp_weather);
            }
            updateCurrentForecastHTML();
            $("#search-input").val("");
        });

    }
}

function getTime(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
}

function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return dd + '.' + mm + '.' + yyyy;
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

function updateCurrentWeatherHTML() {
    $("#date").html(current_weather.date);
    $("#current-weather-description").html(current_weather.description);
    $("#current-temperature").html(current_weather.temperature);
    $("#feels-like").html(current_weather.feelslike);
    $("#today-sunrise").html(current_weather.sunrise);
    $("#today-sunset").html(current_weather.sunset);
    $("#search-input").attr("placeholder", `${current_weather.city}, ${current_weather.country}`);
    $("#current-weather-icon").attr("src", `http://openweathermap.org/img/wn/${current_weather.icon}@2x.png`);
}

let time = document.getElementsByClassName('time');
let forecast_icons = document.getElementsByClassName('forecast-weather-icon');
let forecast_description = document.getElementsByClassName('forecast-description');
let forecast_temp = document.getElementsByClassName('forecast-temp');
let forecast_templike = document.getElementsByClassName('forecast-templike');
let forecast_wind = document.getElementsByClassName('forecast-wind');

function updateCurrentForecastHTML() {
    for (let i = 0; i < time.length; i++) {
        time[i].innerHTML = forecast[i].time;
        forecast_icons[i].src = `http://openweathermap.org/img/wn/${forecast[i].icon}@2x.png`;
        forecast_description[i].innerHTML = forecast[i].description;
        forecast_temp[i].innerHTML = forecast[i].temperature;
        forecast_templike[i].innerHTML = forecast[i].feelslike;
        forecast_wind[i].innerHTML = forecast[i].wind;
    }
    getWeekdays();

}

$("#search-btn").click(function () {
    searchCity();
})

$("#search-input").keydown(function (e) {
    if (e.which == 13) {
        searchCity();
        $('#search-input').blur();
    }
})

function searchCity() {
    $("body").css("overflow-y", "visible");
    $("#search-error").css("display", "none");
    $("main").css("display", "block");
    NetworkManager.getCurrentWeather($("#search-input").val());
    NetworkManager.getForecast($("#search-input").val());
    
}

function searchError() {
    $("body").css("overflow-y", "hidden");
    $("#search-error").css("display", "block");
    $("main").css("display", "none");
    $("#search-error-input").text($('#search-input').val());
}


let current_weather = new CurrentWeather();
let forecast = [];
getCityByGeolocation();

//----------------------------GEOLOCATION

function getCityByGeolocation() {
    $.get("http://ipinfo.io", function (response) {
        city_name = response.city;
        NetworkManager.getCurrentWeather(city_name);
        NetworkManager.getForecast(city_name);
    }, "jsonp").fail(function () {
        city_name = "Kyiv";
        NetworkManager.getCurrentWeather(city_name);
        NetworkManager.getForecast(city_name);
    }
    );
}

//-----------------------WEEKDAYS

let selected_weekday;
let selected_weekday_index = 0;
$(".weekday-info").each(function (index) {
    if (selected_weekday == null) {
        selected_weekday = this;
        $(this).css("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
    }
    $(this).click(function () {
        selected_weekday_index = $(this).attr('data-id');
        $(selected_weekday).css("box-shadow", "none");
        $(this).css("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
        updateWeekdayForecast();
        selected_weekday = this;
    })
});

let weekdays = []; //all week
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let weekdayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getWeekdays() {
    weekdays = [];
    let todays_date = forecast[0].date;
    let date = forecast[0].date;
    addWeekday(0, "today");

    for (let i = 0; i < forecast.length; i++) {
        if(forecast[i].date == todays_date || forecast[i].date == date){
            continue;
        }
        date_weekday = new Date(forecast[i].date);
        addWeekday(i, weekdayNames[date_weekday.getDay()]);
        date = forecast[i].date;
    }

    updateWeekdaysWeather();
}

function addWeekday(start_index, name) {
    let weekday = new Weekday();
    let day_number = forecast[start_index].date.split("-");
    weekday.name = name;
    weekday.day = day_number[2];
    if (day_number[1][0] == "0") {
        weekday.month = monthNames[day_number[1][1] - 1];
    }
    else {
        weekday.month = monthNames[day_number[1] - 1];
    }

    let avg_temp = 0;
    let avg_weather = [];
    for (let i = 0; i < 6; i++ , start_index++) {
        if(forecast[start_index] == undefined){
            continue;
        }
        if (avg_weather.map(x => x[1]).includes(forecast[start_index].description)) {
            avg_weather.filter(x => x[1] == forecast[start_index].description).map(x => x[2] += 1);
        }
        else {
            avg_weather.push([forecast[start_index].icon, forecast[start_index].description, 1]);
        }
        avg_temp += forecast[start_index].temperature;
        weekday.forecast.push(forecast[start_index]);
    }

    weekday.temperature = avg_temp / 6;
    max_desc = avg_weather[0];
    avg_weather.filter(x => {
        if (x[2] > max_desc[2]) {
            max_desc = x;
        }
    });

    weekday.description = max_desc[1];
    weekday.icon = max_desc[0];

    weekdays.push(weekday);
}

let week_time = document.getElementsByClassName('week-time');
let week_forecast_icons = document.getElementsByClassName('week-forecast-weather-icon');
let week_forecast_description = document.getElementsByClassName('week-forecast-description');
let week_forecast_temp = document.getElementsByClassName('week-forecast-temp');
let week_forecast_templike = document.getElementsByClassName('week-forecast-templike');
let week_forecast_wind = document.getElementsByClassName('week-forecast-wind');

function updateWeekdaysWeather() {
    $(".weekday").each(function (index) {
        $(this).text(weekdays[index].name);
    });
    $(".weekday-date").each(function (index) {
        $(this).text(`${weekdays[index].day} ${weekdays[index].month}`);
    });
    $(".weekday-weather-icon").each(function (index) {
        $(this).attr("src", `http://openweathermap.org/img/wn/${weekdays[index].icon}@2x.png`);
    });
    $(".weekday-temperature").each(function (index) {
        $(this).text(parseInt(weekdays[index].temperature, 10));
    });
    $(".weekday-temperature-description").each(function (index) {
        $(this).text(weekdays[index].description);
    });

    updateWeekdayForecast();
}

function updateWeekdayForecast() {
    for (let i = 0; i < 6; i++) {
        week_time[i].innerHTML = weekdays[selected_weekday_index].forecast[i].time;
        week_forecast_icons[i].src = `http://openweathermap.org/img/wn/${weekdays[selected_weekday_index].forecast[i].icon}@2x.png`;
        week_forecast_description[i].innerHTML = weekdays[selected_weekday_index].forecast[i].description;
        week_forecast_temp[i].innerHTML = weekdays[selected_weekday_index].forecast[i].temperature;
        week_forecast_templike[i].innerHTML = weekdays[selected_weekday_index].forecast[i].feelslike;
        week_forecast_wind[i].innerHTML = weekdays[selected_weekday_index].forecast[i].wind;
    }
}


