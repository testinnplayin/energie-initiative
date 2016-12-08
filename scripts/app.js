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
			"all" : "160312"
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
	},
	capRegions : {
		"auvergne-rhone-alpes" : "Auvergne-Rhône-Alpes",
		"bourgogne-franche-comte" : "Bourgogne-Franche-Comté",
		"bretagne" : "Bretagne",
		"centre-val-de-loire": "Centre-Val de Loire",
		"corse" : "Corse",
		"guadeloupe" : "Guadeloupe",
		"guyane" : "Guyane",
		"grand-est" : "Grand-Est",
		"hauts-de-france" : "Hauts-de-France",
		"ile-de-france" : "Île-de-France",
		"la-reunion" : "La Réunion",
		"martinique" : "Martinique",
		"normandie" : "Normandie",
		"nouvelle-aquitaine" : "Nouvelle-Aquitaine",
		"occitanie" : "Occitanie",
		"pays-de-la-loire" : "Pays de la Loire",
		"provence-alpes-cote-dazur" : "Provence-Alpes-Côte d'Azur"
	}
};



//display functions

function drawInitialMap() {
	var map = AmCharts.makeChart("mapdiv", {
		"type" : "map",
		"theme" : "light",
		"zoomControl" : {
			"homeButtonEnabled" : false,
			"zoomControlEnabled" : false
		},
		"dataProvider" : {
			"map" : "france2016Low",
			"getAreasFromMap" : true,
			"areas" : [
				{
					'id' : 'FR-E',
					'showAsSelected' : true
				}
			]
		},
		"areasSettings" : {
			"autoZoom" : false,
			"rollOverColor" : "#0F0",
			"selectedColor" : "#66FF66",
			"selectable" : false
		}
	});
	return map;
}

function drawResultsMap(chartData, newRegion) {
	var mapId = convertToMapId(newRegion);
	var newMap = AmCharts.makeChart("mapdiv", {
		"type" : "map",
		"theme" : "light",
		"zoomControl" : {
			"homeButtonEnabled" : false,
			"buttonFillColor" : "#66FF66",
			"buttonBorderThickness" : 2
		},
		"dataProvider" : {
			"map" : "france2016Low",
			"getAreasFromMap" : true,
		}
	});

	newMap.dataProvider.areas.push({ 'id': mapId, 'selectable' : false, 'showAsSelected' : true });
	newMap.areasSettings = {
		autoZoom: true,
		rollOverColor : "#0F0",
		selectedColor : "#66FF66"
	};
	newMap.write("mapdiv");

	var prettyRegion = prettifyRegion(newRegion);

	setTimeout(function(){
		$('path[aria-label="' + prettyRegion + '  "]').mouseup(); //for some reason there's a space at the end of every path aria-label entry
	},200);

	var chart = drawChart(chartData, prettyRegion);
}

function drawChart(chartData, newRegion) {
	var chart = new AmCharts.AmPieChart();

	chart.dataProvider = chartData;
	chart.titleField = "theme";
	chart.valueField = "frequency";
	chart.backgroundColor = "#000000";
	chart.backgroundAlpha = 0.4;
	chart.addLabel("0", "!20", newRegion, "center", 18);
	chart.labelsEnabled = false;
	chart.write("chartdiv");
	$('#chartdiv').position({
		my: "right bottom",
		at: "right bottom",
		of: ".map"
	});
	let cssObj = {
		'right':'5%',
		'left':'unset'
	};
	$('#chartdiv').css(cssObj);
}

function displayResult(obj) {
	var result = '',
		region = convertToNewReg(obj.region),
		prettyRegion = prettifyRegion(region),
		prettyDept;

	(obj.department === 'NULL' || obj.department === 'false') ? prettyDept = "Aucune précision" : prettyDept = obj.department; //data from government shows NULL and rarely false as strings for the department

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
						+ "<p>Thème: " + obj.theme + "</p>"
					+ "</li>"
					+ "<li>"
						+ "<p>Région: " + prettyRegion + "</p>" //Note: Can prettify this later on if feel need; data[i][i-1].location.region
					+ "</li>"
					+ "<li>"
						+ "<p>Département: " + prettyDept + "</p>"
					+ "</li>"
					+ "<li>"
						+ "<p><a href=\"" + obj.url + "\" target=\"_blank\">Lire l'initiative</a></p>"
					+ "</li>"
				+ "</ul>"
		+ "</div>"
	+ "</div>";

	return result;
}

function renderState(currentState, data, addressCont) {
	if (currentState === "results") {
		var result;
		$('.js-result-container').find('.panel').remove();
		$('.col-xs-2').last().removeClass('hidden');
		if (Array.isArray(addressCont)) {
			var lng = Object.keys(data[1]).length;

			if (lng > 0) {
				$('#mapdiv').empty();
				result = searchDataAndBuildObj(addressCont, data);
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

function getData(addressCont, newQuery) { //the addresses will either be a single string representing one url or an array of strings containing the regions and the url for the large file with the latter being the last item
	var address;

	(Array.isArray(addressCont)) ? address = addressCont.pop() : address = addressCont;

	$.ajax(address)
	.done(function(data) {
		var currentState = state.currentView,
			status = checkState(currentState);

		(Array.isArray(addressCont)) ? renderState(status, data, addressCont) : renderState(status, data, newQuery);

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
		$('.js-search-form-group > p').remove();
		$('.js-search-form-group').append('<p>Saisissez le nom d\'une région valide.</p>')
	} else { 
		$('.js-search-form-group > p').remove();
		var newQuery = processQuery(query),
			region = checkRegion(newQuery);

		return region;
	}
}

function checkRegion(region) {
	var newKeys = Object.keys(regionLibrary.newRegions),
		oldKeys = Object.keys(regionLibrary.oldRegions),
		error = 'erreur';

	for (var key of newKeys) {
		if (region === key) {
			var lng = Object.keys(regionLibrary.newRegions[region]).length;

			if (lng > 0) {
				var newRegion = regionLibrary.newRegions[key];
				return newRegion;
			}
		}
	}

	for (var key of oldKeys) {
		if (region === key) {
			var lng = Object.keys(regionLibrary.oldRegions[region]).length;

			if (lng > 0) {
				var oldRegion = regionLibrary.oldRegions[key];
				return oldRegion;
			}
		}
	}
	$('input[type="text"]').val('');
	$('.js-search-form-group > p').remove();
	$('.js-search-form-group').append('<p>Saisissez le nom d\'une région valide.</p>');
	
	return error;
}

function checkState(currentState) {
	if (currentState === 'index') {
		currentState = 'results';
		return currentState;
	}
	return currentState;
}



//other functions

function calculateThemeFreq(objArr) { //an example chartData will be [{ 'theme' : 'renovations', 'frequency' : 3 }, { 'theme' : 'dechets', 'frequency' : 5}]
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

	for (var theme in themeFreq) {
		var themeObj = {};

		themeObj["theme"] = theme;
		themeObj["frequency"] = themeFreq[theme];
		chartData.push(themeObj);
	}
	drawResultsMap(chartData, newRegion);
}


function generateEndpoint(query) { //for nouvelle-aquitaine we have an object containing three different old regions and their times of addition to the database, for alsace we have a string
	var regionContainer = [],
		newRegion = convertToNewReg(query);

	if (typeof query === 'object') { //branch followed for a new region containing multiple old regions, goes to the large file containing all regions
		var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-" + regionLibrary.newRegions['lensemble']['all']
		+ "/initiatives_all.json";

		for (var region in query) {
			regionContainer.push(region);
		}
		regionContainer.push(newUrl);
		return regionContainer; //"nouvelle-aquitaine" becomes ["aquitaine", "limousin", "poitou-charentes", "https://www.data.gouv.fr....."]
	} else if (query === 'erreur') {
		console.log("url not valid");
	}

	var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-" + regionLibrary.newRegions[newRegion][query] + "/initiatives_"
	+ query + ".json";

	return newUrl;
}



//processing functions

function prettifyRegion(region) {
	var keys = Object.keys(regionLibrary.capRegions);

	for (var key of keys) {
		if (region === key) {
			return regionLibrary.capRegions[region];
		}
	}
}

function convertToMapId(newRegion) { //converts the new region name to the mapId for the region in order for display purposes
	for (var region in regionLibrary.mapRegions) {
		if (newRegion === regionLibrary.mapRegions[region]) {
			return region;
		}
	}
}

function buildDataObj(data) { //for the files for each individual region (old regions)
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
	calculateThemeFreq(objArr); //see comment under searchData
	return result;
}

function searchDataAndBuildObj(addressCont, data) { //for the file containing all regions put together, all of the data is stored in a large array of objects, not an object containing an array of objects like in ind regions
	var lng = Object.keys(data[1]).length, //each new region and its data is contained in an object that is the property of 'index' of the new object after the empty object
		result = "";

	for (var region of addressCont) {
		var objArr = [];

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
						objArr.push(obj);
					}
				}
			}
		}
	}
	calculateThemeFreq(objArr);//calculates the number of articles for each theme for pie chart
	return result;
}

function convertToNewReg(query) { //converts an old region name to a new region for display purposes; query can be either an array or an object
	var newRegion = "";

	for (var oldRegion in regionLibrary.oldRegions) {
		if (query === oldRegion && typeof query !== 'object') {
			newRegion = regionLibrary.oldRegions[oldRegion];
			return newRegion;
		} else if (Array.isArray(query)) {
			for (var item of query) {
				if (item === oldRegion) {
					newRegion = regionLibrary.oldRegions[oldRegion];
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

function processQuery(query) { //renders all letters to lowercase and has function to strip accents and apostrophes from letters of strings going to URLs, replaces whitespaces with -
	var processedQ = query.toLowerCase().replace("'", "").replace(/ /g, '-'), 
		strippedQ = stripAccent(processedQ);

	if (strippedQ === "mobilite-et-transports-durables") { //mobilite-et-transports-durables doesn't exist in the government's database
		strippedQ = "mobilite-durable";
		return strippedQ;
	}
	return strippedQ;
}

//event handler functions

function handleActions(e, map) {
	e.preventDefault();

	var query = $('input[type="text"]').val() || $('input[type="radio"]:checked').val(), //query can be either typed in or clicked on radio button
		newQuery = checkQuery(query),
		newUrlCont = generateEndpoint(newQuery),
		data = getData(newUrlCont, newQuery);
	//reset input and radio
	$('input[type="text"]').val('');
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

	$('path').click(function(e) {
		var region = $(this).attr('aria-label');
		console.log(region);
		//handleActions(e, map);
	});
}

function handleInitialState() {
	$('#inline-check-3').attr('checked', true);
	var map = drawInitialMap();

	handleSubmit(map);
}

$(document).ready(handleInitialState);
