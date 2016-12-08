#Energie-Initiative
A web app to look at green intiatives published in Metropolitan France in 2015 on the French government website www.votreenergiepourlafrance.fr.

##Introduction
This is a Thinkful capstone project for the Frontend Web Development course. It asks us to design a web application that uses at least one API to present data in at least a somewhat useful way. 

For this project, two APIs were used, though one of them was comprised of two "mini-APIs". The first one is that of the French government's open data project found at https://www.data.gouv.fr/en/. The part we used was for green initiative proposals published in 2015 on the site www.votreenergiepourlafrance.fr. This website is a place where people with ideas come and publish proposals on various different environmental themes. The author of this web app thought it might be useful to visualize that data on a map and show a breakdown of the number of initiatives proposed by theme. These initiatives are also drawn up from the data so that interested users can go to the articles and read them directly on the government's website.

The second API is the map and chart drawing API called ammcharts found at https://www.amcharts.com/. The map was drawn from the map API portion while the pie chart was derived from the chart API portion.

Region names changed between 2015 and 2016 in France. We decided to let users use either the old names or the new names. However, data is not shown only for the old regions, just for the new regions at the moment.

Other resources used: Bootstrap, jQuery, jQuery UI, Font-Awesome, Font Squirrel, Sublime and Atom.
