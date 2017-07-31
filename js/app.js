new Vue ({
 el: '#app',

	 data: {
	 	name: '',
	 	visible: false,
	 	countryName: '',
	 	alpha2Code: '',
	 	topLevelDomain: '',
	 	callingCode: '',
	 	capital: '',
	 	region: '',
	 	subRegion: '',
	 	timeZones: '',
	 	population: '',
	 	latitude: '',
	 	longitude: '',
	 	area: '',
	 	nativeName: '',
	 	flag: ''
	 },
		 methods: {
		 	countrySearch: function () {
		 		var app = this;
		 		app.visible = true;
		 		axios.get('https://restcountries.eu/rest/v1/name/' + this.name)
		 		.then(function (response) {
		 			app.countryName = response.data[0].name;
		 			app.topLevelDomain = response.data[0].topLevelDomain[0];
		 			app.callingCode = '+'+ response.data[0].callingCodes[0];
		 			app.alpha2Code = response.data[0].alpha2Code.toLowerCase();
		 			app.flag = 'http://flagpedia.net/data/flags/small/' + app.alpha2Code +'.png';
		 			app.capital = response.data[0].capital;
		 			app.region = response.data[0].region;
		 			app.subRegion = response.data[0].subregion;
		 			app.timeZones = response.data[0].timezones;
		 			
		 			app.population = numeral(response.data[0].population ).format('0,0');
		 			
		 			app.nativeName = response.data[0].nativeName;
		 			app.longitude = response.data[0].latlng[1];
		 			app.latitude = response.data[0].latlng[0];
		 			app.area = response.data[0].area;
		 		}).catch(function(error){
                    app.countryName = 'Please Enter Valid Country Name';
			
                }) ;
				var target = $("#target");
				$('html, body').animate({
					scrollTop: target.offset().top
				 }, 2000);
		 	},
		 	initMap: function () {
		 		var app = this;
		 		var mapZoom;
		 		if (app.area <= 400000) {
		 			mapZoom = 5;
		 		}else {
		 			mapZoom = 3;
		 		}
		 		var uluru = {lat: app.latitude, lng: app.longitude};
		        var map = new google.maps.Map(document.getElementById('map'), {
		          scrollwheel: false,
		          zoom: mapZoom,
		          center: uluru
		        });
		        var marker = new google.maps.Marker({
		          position: uluru,
		          map: map
		        });
		 	}
		 },

	 watch: {
	 	countryName: function () {
	 		this.initMap();
	 	}
	 }

});
