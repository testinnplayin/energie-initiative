#Energie-Initiative
A web app to look at green intiatives published in Metropolitan France in 2015 on the French government website www.votreenergiepourlafrance.fr.

##Introduction
This is a Thinkful capstone project for the Frontend Web Development course. It asks us to design a web application that uses at least one API to present data in at least a somewhat useful way. 

The French government has a mass of open source data it encourages developers to play around with. France was the host of the COP21 (http://www.cop21paris.org/) last year. The author of this app thought it would be useful to look at what France is doing as far as green initiatives the year the COP21 took place. This app is a viewer that gives the user an idea of what initiatives were published in 2015 as well as what environmental aspects seemed the most interesting to people living in various regions of France. Please note that many of the region names changed between 2015 and 2016.

Here is a screenshot of the initial view:

![Alt text](/images/Initial-view-energie-init.png)

As you can see, the view is divided between an introduction with instructions in French, a list of regions (with pre-2016 region names) and their associated radio buttons, a search box and a map of France underneath. The map is drawn with the current regions though users can type an old region name in the search box. Even so, please note that the resulting pie chart is for the new region.

##Instructions:

Click on a region in the map. You can also choose to click on a radio button or type in a region name and hit the Search (Recherche) button.

Below is a screenshot of a result:

![Alt text](/images/Result-view-energie-init.png)

The pie chart shows a breakdown of the number of articles published for each environmental theme (waste, renewables and so on). It's interactive: hovering over the sections will tell you the theme and give its percentage weight with respect to the number of articles published for the region. Clicking on a section will 'draw' it out from the rest of the pie.

You can find a list of result panels underneath the map that provide you with the title of the articles, a picture that comes from the government's website, the region, theme and department the article was published in and finally a link to the article.

##Technology Used:

For this project, two APIs were used, though one of them was comprised of two "mini-APIs". The first one is that of the French government's open data project found at https://www.data.gouv.fr/en/. The part we used was for green initiative proposals published in 2015 on the site www.votreenergiepourlafrance.fr. The data can be found here: https://www.data.gouv.fr/fr/datasets/liste-des-initiatives-geolocalisees-issues-du-site-votreenergiepourlafrance-fr/

The second API is the map- and chart-drawing API called ammcharts found at https://www.amcharts.com/. The map and chart portions are slightly distinct from one another.

Other resources used: Bootstrap, jQuery, jQuery UI, Font-Awesome, Font Squirrel, Sublime, Atom and of course Git/Github.
