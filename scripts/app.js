'use strict';

var state = {
	currentView : 'index',
};

var regionLibrary = {
	newRegions : {
		"auvergne-rhone-alpes" : {
			"auvergne" : "161248",
			"rhone-alpes" : "160406"
		},
		"bourgogne-franche-comte" : {
			"bourgogne" : "161209",
			"franche-comte" : "161030"
		},
		"bretagne" : {
			"bretagne" : "161146"
		},
		"centre-val-de-loire" : {
			"centre" : "161127"
		},
		"corse" : {
			"corse" : "161049"
		},
		"guadeloupe" : {
			"guadeloupe" : "161008"
		},
		"guyane" : {
			"guyane" : "160941"
		},
		"grand-est" : {
			"alsace" : "161326",
			"lorraine" : "160729"
		},
		"hauts-de-france" : {
			"nord-pas-de-calais" : "160629",
			"picardie" : "160537"
		},
		"ile-de-france" : {
			"ile-de-france" : "160859"
		},
		"la-reunion" : {
			"la-reunion" : "160815"
		},
		"martinique" : {
			"martinique" : "160711"
		},
		"normandie" : {
			"basse-normandie" : "161229",
			"haute-normandie" : "160915"
		},
		"nouvelle-aquitaine" : {
			"aquitaine" : "161307",
			"limousin" : "160754",
			"poitou-charentes" : "160506"
		},
		"occitanie" : {
			"midi-pyrenees" : "160653"
		},
		"pays-de-la-loire" : {
			"pays-de-la-loire" : "160601"
		},
		"provence-alpes-cote-dazur" : {
			"provence-alpes-cote-dazur" : "160434"
		},
		"lensemble" : {
			"lensemble" : "160312"
		}
	},
	oldRegions : {
		"alsace" : "grand-est",
		"aquitaine" : "nouvelle-aquitaine",
		"auvergne" : "auvergne-rhone-alpes",
		"basse-normandie" : "normandie",
		"bourgogne" : "bourgogne-franche-comte",
		"bretagne" : "bretagne",
		"centre" : "centre-val-de-loire",
		"champagne-ardenne" : "grand-est",
		"corse" : "corse",
		"franche-comte" : "bourgogne-franche-comte",
		"guadeloupe" : "guadeloupe",
		"guyane" : "guyane",
		"haute-normandie" : "normandie",
		"ile-de-france" : "ile-de-france",
		"languedoc-rousillon" : "occitanie",
		"la-reunion" : "la-reunion",
		"limousin" : "nouvelle-aquitaine",
		"lorraine" : "grand-est",
		"martinique" : "martinique",
		"midi-pyrenees" : "occitanie",
		"nord-pas-de-calais" : "hauts-de-france",
		"pays-de-la-loire" : "pays-de-la-loire",
		"picardie" : "hauts-de-france",
		"poitou-charentes" : "nouvelle-aquitaine",
		"provence-alpes-cote-dazur" : "provence-alpes-cote-dazur",
		"rhone-alpes" : "auvergne-rhone-alpes",
	},
	mapRegions : {
		"FR-A" : "grand-est",
		"FR-B" : "nouvelle-aquitaine",
		"FR-C" : "auvergne-rhone-alpes",
		"FR-D" : "bourgogne-franche-comte",
		"FR-E" : "bretagne",
		"FR-F" : "centre-val-de-loire",
		"FR-G" : "corse",
		"FR-H" : "ile-de-france",
		"FR-I" : "occitanie",
		"FR-J" : "hauts-de-france",
		"FR-K" : "normandie",
		"FR-L" : "pays-de-la-loire",
		"FR-M" : "provence-alpes-cote-dazur" 
	}
};



//display functions

function drawInitialMap() {

	var map = AmCharts.makeChart("mapdiv", {
		"type" : "map",
		"theme" : "light",
		"dataProvider" : {
			"map" : "france2016Low",
			"getAreasFromMap" : true,
			"areas" : []
		},
		"areasSettings" : {
			"autoZoom" : false,
		//	"selectedColor" : "#00CCCC",
		//	"selectable" : true
		},
		// "listeners" : [{
		// 	"event" : "clickMapObject",
		// 	"method" : function(e) {
		// 		if (e.mapObject.objectType !== "MapArea") {
		// 			return;
		// 		}

		// 		var area = e.mapObject;

		// 		area.showAsSelected = !area.showAsSelected;
		// 		e.chart.returnInitialColor(area);
		// 	}
		// }]
	});

	return map;
}


function drawResultsMap(data) {
	var newMap = AmCharts.makeChart("mapdiv", {
		"type" : "map",
		"theme" : "light",
		"dataProvider" : {
			"map" : "france2016Low",
			"getAreasFromMap" : true,
		}
	});

	newMap.areasSettings = {
		unlistedAreas: "#CCCCCC",
		rollOverOutlineColor: "#888888",
		rollOverColor: "#00CCCC"
	};

	newMap.write("mapdiv");
}

function drawChart(chartData, newRegion) {
	var chart = new AmCharts.AmPieChart();

	chart.dataProvider = chartData;
	chart.titleField = "theme";
	chart.valueField = "frequency";
	chart.backgroundColor = "#000000";
	chart.backgroundAlpha = 0.4;
	chart.addLabel("0", "0", newRegion, "center", 18);

	chart.write("chartdiv");
}

function displayResult(obj) {
	var result = '';

	result += "<div class=\"col-xs-12 col-md-6 col-lg-4 result-box\">"
		+ "<div class=\"panel panel-default js-panel\">"
				+ "<div class=\"panel-heading\">"
					+ obj.title
				+ "</div>"
				+ "<div class=\"panel-body\">"
					+ "<img src=\"http://www.votreenergiepourlafrance.fr/medias/patterns/" + processQuery(obj.theme) + "/large.jpg\" class=\"img-responsive\" />"
				+ "</div>"
				+ "<ul class=\"info-list\">"
					+ "<li>"
						+ "<p>Theme: " + obj.theme + "</p>"
					+ "</li>"
					+ "<li>"
						+ "<p>Old region: " + convertToNewReg(obj.region) + "</p>" //Note: Can prettify this later on if feel need; data[i][i-1].location.region
					+ "</li>"
					+ "<li>"
						+ "<p>Department: " + obj.department + "</p>"
					+ "</li>"
					+ "<li>"
						+ "<p><a href=\"" + obj.url + "\" target=\"_blank\">Link to Source</a></p>"
					+ "</li>"
				+ "</ul>"
		+ "</div>"
	+ "</div>";

	return result;
}

function renderState(currentState, data, addressCont) {
	if (currentState === "results") {
		$('.js-result-container').find('.panel').remove();

		console.log(addressCont);

		var result;

		if (Array.isArray(addressCont)) {
			var lng = Object.keys(data[1]).length;
			console.log("second array branch triggered");

			if (lng > 0) {
				$('#mapdiv').empty();
				result = searchData(addressCont, data);
			}

			$('.js-result-container').html(result);
		} else {
			var lng = data.initiatives.length;

			if (lng > 0) {
				$('#mapdiv').empty();
				result = buildDataObj(data);
			}

			$('.js-result-container').html(result);
		}

	}
}



//ajax call functions

function getData(addressCont, newQuery) {
	var address;

	if (Array.isArray(addressCont)) {
		address = addressCont.pop();
		console.log("address from array " + address);
		console.log(addressCont);
	} else {
		address = addressCont;

	}

	$.ajax(address)
	.done(function(data) {
		var currentState = state.currentView,
			status = checkState(currentState);

		if (Array.isArray(addressCont)) {
			console.log("array branch triggered");
			renderState(status, data, addressCont);
		} else {
			renderState(status, data, newQuery);
		}

		console.log('successful call');
		console.log(data);
		return data;
	})
	.fail(function(err) {
		console.log('unsuccessful call');
		console.log('The error is ' + err);
	})
	.always(function() {
		console.log('request complete');
	});
}



//logic functions

function checkQuery(query) {
	if (query === "" || query === undefined) {
		$('.js-search-form-group').append('<p>Please enter a valid region name</p>')
	} else { //this will change when adding theme search capabilities
		var newQuery = processQuery(query);
		var region = checkRegion(newQuery);

		return region;
	}
}

function checkRegion(region) {
	var keys = Object.keys(regionLibrary.newRegions);

	for (var key of keys) {
		if (region === key) {
			var lng = Object.keys(regionLibrary.newRegions[region]).length;

			if (lng > 1) {
				var newRegion = regionLibrary.newRegions[key];

				return newRegion;
			}
		}
	}

	return region;
}

function checkState(currentState) {
	if (currentState === 'index') {
		currentState = 'results';
		return currentState;
	}

	return currentState;
}

//other functions


function calculateThemeFreq(objArr) {
	var themeFreq = {},
		themeArray = [],
		regionArray = [],
		chartData = [];

	for (var obj of objArr) {
		themeArray.push(obj.theme);
		regionArray.push(obj.region);
	}

	var newRegion = convertToNewReg(regionArray);

	themeArray.forEach(function(theme) {
		themeFreq[theme] = (themeFreq[theme] || 0) + 1;
	});

	console.log(themeFreq);

	for (var theme in themeFreq) {
		var themeObj = {};
		themeObj["theme"] = theme;
		themeObj["frequency"] = themeFreq[theme];
		console.log(themeObj);
		chartData.push(themeObj);
		console.log(chartData);
	}
	var chart = drawChart(chartData, newRegion);
	drawResultsMap(chart);
}

function generateEndpoint(query) { //for nouvelle-aquitaine we have an object containing three different old regions and their times of addition to the database
	var regionContainer = [];
	console.log("The query is " + query);

	var newRegion = convertToNewReg(query);

	if (typeof query === 'object') {
		var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-" + regionLibrary.newRegions['lensemble']['lensemble']
		+ "/initiatives_all.json";

		for (var region in query) {
			regionContainer.push(region);
		}

		regionContainer.push(newUrl);
		console.log(regionContainer);

		return regionContainer; //"nouvelle-aquitaine" becomes ["aquitaine", "limousin", "poitou-charentes", "https://www.data.gouv.fr....."]
	}

	var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-" + regionLibrary.newRegions[newRegion][query] + "/initiatives_"
	+ query + ".json";

	console.log(newUrl);

	return newUrl;
}



//processing functions

// function processSelectedRegion(selection) {
// 	var mapKeys = Object.keys(regionLibrary.mapRegions),
// 		lng = mapKeys.length;

// 	for (var i = 0; i < lng; i ++) {
// 		if (selection[0].id === mapKeys[i]) {
// 			var newRegion = regionLibrary.mapRegions[selection[0].id];

// 			return newRegion;
// 		}
// 	}
// }

// function getSelectedRegion(map) {
// 	//var selected = [{id: "FR-H", showAsSelected: true}];
// 	console.log("getSelectedRegion triggered");

// 	var selected = [];
// 	if (map.dataProvider.areas.showAsSelected) {
// 		selected.push({id: map.dataProvider.areas.showAsSelected.id})
// 	}
// 	console.log(selected);
// 	return selected;
	
// }

function buildDataObj(data) {
	var lng = data.count,
		objArr = [],
		result = "";

	for (var i = 0; i < lng; i++) {
		var obj = {
			title : data.initiatives[i].title,
			theme : data.initiatives[i].theme,
			region : data.initiatives[i].location.region,
			department : data.initiatives[i].location.department,
			url: data.initiatives[i].url
		};

		result += displayResult(obj);
		objArr.push(obj);
	}
	calculateThemeFreq(objArr);
	return result;
}

function searchData(addressCont, data) { //for the file containing all regions put together, all of the data is stored in a large array of objects, not an object containing an array of objects like in ind regions
	var lng = Object.keys(data[1]).length,
		result = "";

	console.log("search data triggered");

	for (var region of addressCont) {

		for(var i=0; i < data.length; i++)
		{
			if( Object.keys(data[i]).length )
			{
				for(var j in data[i])
				{
					if (region == data[i][j].location.region) {
						var obj = {
							title : data[i][j].title,
							theme : data[i][j].theme,
							region : data[i][j].location.region,
							department : data[i][j].location.department,
							url : data[i][j].url
						};
						result += displayResult(obj);
					}
				}
			}
		}
	}

	return result;
}

function convertToNewReg(query) {
	var newRegion = "";
	console.log("region conversion triggered");

	for (var oldRegion in regionLibrary.oldRegions) {
		if (query === oldRegion && typeof query !== 'object') {
			newRegion = regionLibrary.oldRegions[oldRegion];
			console.log("convertToNewReg " + newRegion);
			return newRegion;
		} else if (Array.isArray(query)) {
			for (var item of query) {
				if (item === oldRegion) {
					newRegion = regionLibrary.oldRegions[oldRegion];
					console.log(newRegion);
					return newRegion;
				}
			}
		}
	}
}

function stripAccent(processedQ) {
	var noAccentQ = "";

	for (var letter of processedQ) {
		var reggie = new RegExp(letter, "g");

		switch(letter) {
				case "à":
				case "â":
					noAccentQ = processedQ.replace(reggie, "a");
					return noAccentQ;
				case "ç":
					noAccentQ = processedQ.replace(reggie, "c");
					return noAccentQ;
				case "é":
				case "ë":
				case "è":
					noAccentQ = processedQ.replace(reggie, "e");
					return noAccentQ;
				case "î":
				case "ï":
					noAccentQ = processedQ.replace(reggie, "i");
					return noAccentQ;
				case "ü":
				case "ù":
				case "û":
					noAccentQ = processedQ.replace(reggie, "u");
					return noAccentQ;
				default:
					noAccentQ = processedQ;
		}
	}
	return noAccentQ;
}

function processQuery(query) {
	var processedQ = query.toLowerCase().replace("'", "").replace(/ /g, '-'), //"île-de-france"
		strippedQ = stripAccent(processedQ); //ile-de-france

	if (strippedQ === "mobilite-et-transports-durables") {
		strippedQ = "mobilite-durable";
		return strippedQ;
	}

	return strippedQ;
}

//event handler functions


function handleActions(e, map) {
	e.preventDefault();

	// var selectedRegion = getSelectedRegion(map);
	// console.log("selectedRegion " + selectedRegion[0].id);
	// var processedMapRegion = processSelectedRegion(selectedRegion);
	// console.log("processedMapRegion " + processedMapRegion);

	// var query = $('input[type="text"]').val() || $('input[type="radio"]:checked').val() || processedMapRegion,
	var query = $('input[type="text"]').val() || $('input[type="radio"]:checked').val(),
		newQuery = checkQuery(query),
		newUrlCont = generateEndpoint(newQuery),
		data = getData(newUrlCont, newQuery);
}

function handleSubmit(map) {
	$('.js-search-btn').click(function(e) {
		handleActions(e, map);
	});



	$('input[type="text"]').keypress(function(e) {
		var enterKey = 13;

		if (e.which === enterKey) {
			handleActions(e, map);
		}
	});
}

function handleInitialState() {
	var map = drawInitialMap();

	handleSubmit(map);
}

$(document).ready(handleInitialState);
