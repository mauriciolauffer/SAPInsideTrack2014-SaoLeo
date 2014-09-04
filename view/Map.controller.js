sap.ui.controller("view.Map", {

	__oMap : "",
	
	onInit : function() {
		var sURL = "./model/mock.json";
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData(sURL, false, false);
		this.getView().setModel(oModel);
	},


	onAfterRendering : function() {
		$('#mapCanvas').height($(window).height());
		var oLatlng = new google.maps.LatLng(-30.0222, -51.1597);
		var mapOptions = {
			zoom : 10,
			center : oLatlng
		};
		var oMap = new google.maps.Map(this.getView().byId("mapCanvas").getDomRef(), mapOptions);
		this.__oMap = oMap;

		var oModel = this.getView().getModel();
		var oData = oModel.getProperty("/AddressCollection");

		if (oData instanceof Array) {
			oData.forEach(function(oValue, i) {
				var oLatlng = new google.maps.LatLng(oValue.Latitude,
						oValue.Longitude);
				new google.maps.Marker({
					position : oLatlng,
					map : oMap,
					title : oValue.CompanyName
				});
			});
		}
	},
	
	
	hadleGetPosition : function() {	
		if (navigator.geolocation) {
			var that = this;
	        navigator.geolocation.getCurrentPosition(function(position) {
	        	var oLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				new google.maps.Marker({
					position : oLatlng,
					map : that.__oMap,
					title : 'Estou aqui!',
					icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
				});
	        });
	    } else { 
	        alert("Geolocation não suportado!");
	    }
	}
	
});