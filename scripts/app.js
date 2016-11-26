'use strict'

var state = {
	regions : ["auvergne-rhone-alpes", "bourgogne-franche-comte", "bretagne","centre-val-de-loire", 
	"corse", "grand-est", "guadeloupe", "guyane", "hauts-de-france", "ile-de-france", "la-reunion", 
	"martinique", "mayotte", "normandie", "nouvelle-aquitaine", "occitanie", "pays-de-la-loire", 
	"provence-alpes-cote-dazure"],
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
	views : ["index", "results"]
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

//event handler functions

function handleSubmit() {
	$('.js-search-btn').click(function(e) {
		e.preventDefault();

		var query = $('input[type="text"]').val();
		console.log(query);

		var newUrl = "https://www.data.gouv.fr/s/resources/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/20151029-161307/initiatives_aquitaine.json";
		console.log(newUrl);

		getData(newUrl);
	});
}

$(document).ready(handleSubmit);