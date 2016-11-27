'use strict'

var state = {
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
		"grand-est" : {
			"alsace" : "161326",
			"lorraine" : "160729"
		},
		"guadeloupe" : {
			"guadeloupe" : "161008"
		},
		"guyane" : {
			"guyane" : "160941"
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
		"mayotte" : {
			"mayotte" : "161405"
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
		"provence-alpes-cote-dazure" : {
			"provence-alpes-cote-dazure" : "160434"
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
		"centre" : "centre-val-de-loire",
		"champagne-ardenne" : "grand-est",
		"franche-comte" : "bourgogne-franche-comte",
		"haute-normandie" : "normandie",
		"languedoc-rousillon" : "occitanie",
		"limousin" : "nouvelle-aquitaine",
		"lorraine" : "grand-est",
		"midi-pyrenees" : "occitanie",
		"nord-pas-de-calais" : "hauts-de-france",
		"picardie" : "hauts-de-france",
		"poitou-charentes" : "nouvelle-aquitaine",
		"rhone-alpes" : "auvergne-rhone-alpes",
	},
	views : ["index", "results"],
};

//display functions

//ajax call functions

function getData(addressCont) {
	var address;
	if (Array.isArray(addressCont)) {
		address = addressCont.pop();
		console.log("address from array " + address);
	} else {
		address = addressCont;
	}

	$.ajax(address)
	.done(function(data) {
		console.log('successful call');
		console.log(data);
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
	var keys = Object.keys(state.newRegions);
	for (var key of keys) {
		if (region === key) {
			var newRegion = state.newRegions[key];
			console.log("new region " + newRegion);

			return newRegion;
		}
	}
	
	return region;
}

function convertToNewReg(query) {
	var newRegion = "";
	
	for (var oldRegion in state.oldRegions) {
		if (query === oldRegion) {
			newRegion = state.oldRegions[oldRegion];
			console.log("convertToNewReg " + newRegion);
			return newRegion;
		}
	}

	return query;
}

//other functions

function generateEndpoint(query) { //for nouvelle-aquitaine we have an object containing three different old regions and their times of addition to the database
	var regionContainer = [];
	console.log("The query is " + query);

	
	var newRegion = convertToNewReg(query);

	if (typeof query === 'object') {
		var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-" + state.newRegions['lensemble']['lensemble'] 
		+ "/initiatives_lensemble.json";

		for (var region in query) {
			regionContainer.push(region);
		}
		regionContainer.push(newUrl);
		console.log(regionContainer);

		return regionContainer;
	}

	var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-" + state.newRegions[newRegion][query] + "/initiatives_" 
	+ query + ".json";

	console.log(newUrl);

	return newUrl;

	
}

//processing functions

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
	var processedQ = query.toLowerCase().replace("'", "").replace(/ /g, '-'); //"île-de-france"
	console.log(processedQ);

	var strippedQ = stripAccent(processedQ); //ile-de-france

	return strippedQ;
}

//event handler functions

function handleSubmit() {
	$('.js-search-btn').click(function(e) {
		e.preventDefault();

		var query = $('input[type="text"]').val();
		console.log("old q " + query);

		var newQuery = checkQuery(query);
		console.log("new q " + newQuery);
		
		var newUrlCont = generateEndpoint(newQuery);

		

		getData(newUrlCont);
	});
}

$(document).ready(handleSubmit);
