'use strict'

var state = {
	newRegions : {
		"auvergne-rhone-alpes" : {
			"auvergne" : "161248",
			"rhone-alpes" : "160406"
		},
		"bourgogne-franche-comte" : {
			"bourgogne" : "161209",
			"franche-comte" : "161030",
		},
		"bretagne" : {
			"bretagne" : "161146"
		},
		"centre-val-de-loire" : {
			"centre" : "161127",
		},
		"corse" : {
			"corse" : "161049",
		},
		"grand-est" : {
			"alsace" : "161326",
			"lorraine" : "160729",
		},
		"guadeloupe" : {
			"guadeloupe" : "161008",
		},
		"guyane" : {
			"guyane" : "160941",
		},
		"hauts-de-france" : {
			"nord-pas-de-calais" : "160629",
			"picardie" : "160537",
		},
		"ile-de-france" : {
			"ile-de-france" : "160859",
		},
		"la-reunion" : {
			"la-reunion" : "160815",
		},
		"martinique" : {
			"martinique" : "160711",
		},
		"mayotte" : {
			"mayotte" : "161405",	
		},
		"normandie" : {
			"basse-normandie" : "161229",
			"haute-normandie" : "160915",
		},
		"nouvelle-aquitaine" : {
			"aquitaine" : "161307",
			"limousin" : "160754",
			"poitou-charentes" : "160506",
		},
		"occitanie" : {
			"midi-pyrenees" : "160653",
		},
		"pays-de-la-loire" : {
			"pays-de-la-loire" : "160601",
		},
		"provence-alpes-cote-dazure" : {
			"provence-alpes-cote-dazure" : "160434",
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

function getData(address) {
	

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

function convertToNewReg(query) {
	var newRegion = "";
	
	for (var oldRegion in state.oldRegions) {
		if (query === oldRegion) {
			newRegion = state.oldRegions[oldRegion];

			return newRegion;
		}
	}

	return query;
}

//other functions

function processQuery(query) {
	var processedQ = query.toLowerCase().replace(/ /g, '-').replace("'", "");

	return processedQ;
}

//event handler functions

function handleSubmit() {
	$('.js-search-btn').click(function(e) {
		e.preventDefault();

		var query = $('input[type="text"]').val();
		console.log("old q " + query);

		var newQuery = processQuery(query);
		console.log("new q " + newQuery);
		
		var newRegion = convertToNewReg(newQuery);
		console.log("new region " + newRegion);

		var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-" + state.newRegions[newRegion][newQuery] + "/initiatives_" 
		+ newQuery + ".json";
		console.log(newUrl);

		//getData(newUrl);
	});
}

$(document).ready(handleSubmit);
