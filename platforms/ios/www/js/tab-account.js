angular.module('AppDep').controller('AccountCtrl', function($scope, $ionicPopup, $timeout, $localstorage, fBio) {

/* 	NOTES 
#1:
	To make a translation of UI easy, all language spacific strings are grouped in	
	a single array "langS". These values are used in assignations in the code. To	
	avoid direct references to these and make it as isolated as even possible,	
	the whola array is leaved outside of the "$scope" visibility.

#2:
	Each HTML group of an UI element has an appropriate object in the controller. This group
	and its controller have the same names (find the names in html comments of the template)

#3:
	To make an identification easier, the following abbreviations are used in code:
	 	btn  -  Button 
		cb   -  CheckBox 
		cbl  -  CheckBoxList 
		dd   -  DropDownList 
		hl   -  Hyperlink 
		img  -  Image 
		ib   -  ImageButton 
		lbl  -  Label 
		lbtn -  LinkButton 
		lb   -  ListBox 
		lit  -  Literal 
		pnl  -  Panel 
		ph   -  PlaceHolder 
		rb   -  RadioButton 
		rbl  -  RadioButtonList 
		tb   -  Textbox 
	Ref: http://stackoverflow.com/questions/181597/what-are-the-naming-guidelines-for-asp-net-controls
		val - value

#4:
	Because of absence a stacked select drop down element in Ionic, two additional CSS classes are 
	created in "style.css": "item-stacked-select-kd" and "item-stacked-select-ngOption-kd".

	The "item-stacked-select-kd" class alone allow to creaate "stacked select" within "option" tags 
	inside:

		<label class="item item-stacked-select-kd">
    		<div>Color</div>
    		<select>
      			<option>Blue</option>
      			<option selected>Green (It's a very long option to see how it will be hendled)</option>
      			<option>Red</option>
    		</select>
  		</label>

  	Both classes together allow to create advanced "stacked select" based on "ng-option" property:

   		<label class="item item-stacked-select-kd">
  			<div>Select</div>
				<select class="item-stacked-select-ngOption-kd"
						ng-options="item.lbl for item in list" 
				></select>
		</label>

#5:
	Number imputs are limited by dirty trick js handler of "onkeypress" event. The handler allows
	to use only digits and dot in the values:

		allow_only_number:function(event) {
			return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46);}

#6:
	Storing data locally is implemented in "$localstorage" factory placed in "storage.js". This 
	factory allows to store any value or object as a text string (JSON-string for an objeсt) under 
	some original name. In fact, this mechanism is very similar to the one used in "ini" files.

	WARNING:
	Logical values are storing as true/false strings. It make neccesary some additional conversion
	after the data loading and can be tricky while both type of data (boolean and string) have to
	be recognized correctly:

		x = val.toString() == 'true' ? y : z;

#7: "setVal" property allows to set value of a drop down selector by its "val" property instead of a
	visual string label.
	"getVal" property allows to get value of drop down select field. It also allows to get numeric
	value of an edit field even while "status" field become string for any reason. 

#8: "angular-touch.js" is used to avoide 300ms delay.
	about the delay: http://blog.ionic.io/hybrid-apps-and-the-curse-of-the-300ms-delay/
	doc/details: https://docs.angularjs.org/api/ngTouch
	download: https://github.com/angular/bower-angular-touch

#9: Ionic doesn't fire "ng-click" event for unusual tags like "a" or "i" placed inside of a label 
	which also contains an input. It's an unsolved bug:
		https://github.com/driftyco/ionic/issues/2311

	It forces me to create my own button style to implement "icon-only" buttons which work inside
	such labels.

#10:There is no smart way to get ionic popups of several different sizes. The only option I found 
	working is to redefine "popup" class during the message generation. Surprisingly, but this silly 
	solution works fine. 

#11:Bug: Popup scroll doesn't work on Samsung Galaxy II. Looks like the one discussed here:
		https://github.com/driftyco/ionic/issues/1433
		https://github.com/driftyco/ionic/issues/3008
		
	And explained here:
		http://stackoverflow.com/questions/29618368/css-after-content-and-absolute-position-for-button-makes-it-not-clickable/29618475#29618475


TODO:
[ ] Little round button
[ ] Splash screen
[ ] Info popup fix for Samsung
[ ] Value text color fix for Samsung

*/

/***	DEBUG TOOLS 	***/

	$scope.myAlert = function(x){alert(x)};
/*	Debug function which can be used in ng events like "ng-change" or "ng-click" directly.	*/

//	$localstorage.clear();
//	This line uncommented clears the application's data

/*** End of Debug Tools ***/

showAlert = function(title, text) {
/*	An ionic alert dialog	

	Note: it can be freely moved in separete file or included into "$scope":
		$scope.showAlert = function(title, text) {

*/
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: text
		});
		alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});
};	

showInfo = function(title, text){
/*	This function will show a wide popup message - 90% of the screen */
	showAlert(title, 
		"<style>.popup{ width:90%!important;max-width:90%!important;}</style>" + text)
};

langS = [
/*	Keeps all text snippets that can be localized.	*/

	"I agree to consult with my physician before starting",

	"Gender",
		"Female",
		"Male",

	"Age",

	"Weight",

	"Height",

	"Fat (%)",
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan massa ut felis tristique, ut egestas erat rutrum. Proin convallis ante mollis ligula eleifend venenatis. Nunc quis ipsum non ligula volutpat ultrices placerat nec magna. Donec nec elementum massa. Proin fermentum vestibulum auctor. Sed in leo et elit tempus lobortis. Proin ultrices neque vitae ex commodo blandit. Nullam vitae ornare risus. Pellentesque felis tortor, convallis eget nisl ut, porta aliquet neque. Phasellus dictum neque in nisi maximus ultrices. Praesent interdum quam urna, non tristique turpis imperdiet nec. Pellentesque gravida, lacus vitae consectetur molestie, tellus eros efficitur ante, sed suscipit erat sem ut purus. Mauris volutpat consequat sodales. Phasellus lacinia lacinia tortor ac vestibulum. Duis vel placerat purus, non molestie erat. Mauris rhoncus iaculis lacus, quis auctor turpis.<br><br>Maecenas id rhoncus lectus. Aenean posuere neque at eros efficitur ornare. Morbi et justo nunc. Morbi vehicula ipsum massa, sed cursus purus hendrerit non. Praesent nisl arcu, feugiat ut tincidunt id, pulvinar non lectus. Nulla sollicitudin augue sit amet rhoncus blandit. In vulputate lacus non magna ultrices, id imperdiet arcu fermentum. Ut tortor ipsum, eleifend eu massa ac, laoreet gravida mi. In nec justo in magna placerat egestas vel dignissim nibh. Integer accumsan, tortor vitae maximus gravida, lectus quam fermentum dui, sed porttitor urna turpis a sapien. Ut ut odio id eros cursus volutpat nec vitae ante. Aliquam vitae arcu eget lorem varius hendrerit in vel orci. Phasellus id pharetra ex.<br>Integer viverra mi vitae massa accumsan, sed cursus dui laoreet. Nam vitae sem dolor. Mauris scelerisque ligula id mollis blandit. Fusce imperdiet lorem at mollis molestie. Duis in tellus et neque laoreet suscipit. Morbi ac ex magna. Mauris porta auctor massa, eget interdum sapien porttitor sit amet.",

	"Calibrator",

	"Research Model",
		"Harris-Benedict",
      	"Mifflin-St.Jeor",
      	"Katch-McArdle",
      	"Cunningham",

	"Activity level",
		"Desk job with little exercise",
		"1-3 hrs/wk of light exercise",
		"3-5 hrs/wk of moderate exercise",
      	"5-6 hrs/wk of strenuous exercise",
      	"7-21 hrs/wk of strenuous exercise",

	"Diet goal",
		"Clean bulk",
		"Gain muscle, lose fat",
		"Lose fat - 5% calorie reduction",
		"Lose fat - 10% calorie reduction",	
		"Lose fat - 15% calorie reduction",	
		"Lose fat - 20% calorie reduction",	
		"Lose fat - 25% calorie reduction ",

	"Warning!",
		"Reducing your caloric intake this much can be very dangerous, you must consult your physician!",
];

var li = 0;
/*	Used together with "langS" to select "next element" of langS (usage: "langS[li++]") 	*/

	$scope.ui = {
/*	Keeps the global interface disable status and appropriate CSS colors for different UI elements.	*/
		disabled: true,
		lblColor: "gray",
		valColor: "white",	
		enable: function(sts){
			this.disabled = !sts;
			this.lblColor = sts ? "black" : "gray";
			this.valColor = sts ? "black" : "white";
		},
	};

	$scope.cbWarn = {
/*	Disclaimer confirmation checkbox ("cbWarn" HTML group of tab-account.html)	*/
		status: false, 
		text: langS[li++],		//	"I agree to consult with my physician before starting"
		color: "red",
		doChanged: function(){
			this.color = this.status ? "green" : "red";
			$scope.ui.enable(this.status);
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.status = $localstorage.get('cbWarn', def).toString() == 'true';
			this.doChanged();
		},
		store: function(){
			$localstorage.set('cbWarn', this.status);
		},
		init: function(){
			this.load(this.status);
			return this;
		}
	}.init();

	$scope.ddGender = {
/*	"Gender" selector	
	Use isFemaile() - true/falce - to know what is selected
	use setFemaile(true/false) - to set the correct value
*/
		value: 	null,			//	( see "init" method )
		label: 	langS[li++],	//	"Gender"
		list: 	[
			langS[li++],		//	"Female"
			langS[li++],		//	"Male"
		],
		isFemale: function(){
		//	returns true if Femaile selected
			return this.value == this.list[0];
		},
		setFemale: function(val){
		//	this approuch allows to use both type of values: boolean and its string equivalents
			this.value = val.toString() == 'true' ? this.list[0] : this.list [1];
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.setFemale($localstorage.get('ddGender', def));
		},
		store: function(){
			$localstorage.set('ddGender', this.isFemale());
		},
		init: function(){
			this.load(true);
			return this;
		}
	}.init();

	$scope.tbAge = {
/*	"Age" input field	*/
		value: 	0,
		label: 	langS[li++],	//	"Age"
		getVal: function(){
			return Number(this.value)
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.value = $localstorage.get('tbAge', def);
		},
		store: function(){
			$localstorage.set('tbAge', this.value);
		},
		init: function(){
			this.load(this.value);
			return this;
		}
	}.init();

	$scope.tbWeight = {
/*	"Weight" input field	*/
		value: 	0,
		label: 	langS[li++],	//	"Weight"
		getVal: function(){
			return Number(this.value)
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.value = $localstorage.get('tbWeight', def);
		},
		store: function(){
			$localstorage.set('tbWeight', this.value);
		},
		init: function(){
			this.load(this.value);
			return this;
		}
	}.init();

	$scope.tbHeight = {
/*	"Height" input field	*/
		value: 	0,
		label: 	langS[li++],	//	"Height"
		getVal: function(){
			return Number(this.value)
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.value = $localstorage.get('tbHeight', def);
		},
		store: function(){
			$localstorage.set('tbHeight', this.value);
		},
		init: function(){
			this.load(this.value);
			return this;
		}
	}.init();

	$scope.tbFat = {
/*	"Fat" input field	*/
		value: 	0,
		label: 	langS[li++],	//	"Fat (%)"
		info:  langS[li++],
		showInfo: function(){
			showInfo(this.label, this.info)
		},
		getVal: function(){
			return Number(this.value)
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.value = $localstorage.get('tbFat', def);
		},
		store: function(){
			$localstorage.set('tbFat', this.value);
		},
		init: function(){
			this.load(this.value);
			return this;
		}
	}.init();

	$scope.tbCalibration = {
/*	"BMR Calibration Factor" input field	*/
		value: 	0,
		label: 	langS[li++],	//	"BMR Calibration Factor"
		getVal: function(){
			return Number(this.value)
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.value = $localstorage.get('tbCalibration', def);
		},
		store: function(){
			$localstorage.set('tbCalibration', this.value);
		},
		init: function(){
			this.load(this.value);
			return this;
		}
	}.init();

	$scope.ddResearch = {
/*	"Research model" drop down selector	*/
		status: null,
		label: langS[li++],					//	"Research model"
		list: [
			{lbl: langS[li++], 	val: 0	},	//	"Harris-Benedict"
			{lbl: langS[li++], 	val: 1	},	//	"Mifflin-St.Jeor"
			{lbl: langS[li++], 	val: 2	},	//	"Katch-McArdle"
			{lbl: langS[li++], 	val: 3	},	//	"Cunningham"
		],	
		getVal: function(){
			return this.status.val;
		},
		setVal: function(val){
		//	This method returns true when the val is found in the list and false other case.
			var i = 0;
			for (i = 0; i < this.list.length; i++) {
				if (val == this.list[i].val){
					this.status = this.list[i];
					return true
				}
			};
			return false;
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.setVal($localstorage.get('ddResearch', def));
		},
		store: function(){
			$localstorage.set('ddResearch', this.getVal());
		},
		init: function(){
			this.load(this.list[0].val);
			return this;
		}
	}.init();

	$scope.ddActivity = {
/*	"Activity level" drop down selector	*/
		status: null,
		label: langS[li++],					//	"Activity level"
		list: [
			{lbl: langS[li++], 	val: 0	},	//	"Desk job with little exercise"
			{lbl: langS[li++], 	val: 1	},	//	"1-3 hrs/wk of light exercise"
			{lbl: langS[li++], 	val: 2	},	//	"3-5 hrs/wk of moderate exercise"
			{lbl: langS[li++], 	val: 3	},	//	"5-6 hrs/wk of strenuous exercise"
			{lbl: langS[li++], 	val: 4	},	//	"7-21 hrs/wk of strenuous exercise"
		],	
		getVal: function(){
			return this.status.val;
		},
		setVal: function(val){
		//	This method returns true when the val is found in the list and false other case.
			var i = 0;
			for (i = 0; i < this.list.length; i++) {
				if (val == this.list[i].val){
					this.status = this.list[i];
					return true
				}
			};
			return false;
		},
		doChanged: function(){
			//	...	
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.setVal($localstorage.get('ddActivity', def));
		},
		store: function(){
			$localstorage.set('ddActivity', this.getVal());
		},
		init: function(){
			this.load(this.list[0].val);
			return this;
		}
	}.init();

	$scope.ddGoal = {
/*	"Diet goal" multiplier ("val") drop down selector	*/
		status: null,
		label: langS[li++],						//	"Diet goal"
		list: [
			{lbl: langS[li++], 	val: 0	},	//	"Clean bulk"
			{lbl: langS[li++], 	val: 1	},	//	"Gain muscle, lose fat"
			{lbl: langS[li++], 	val: 2	},	//	"Lose fat - 5% calorie reduction"
			{lbl: langS[li++], 	val: 3	},	//	"Lose fat - 10% calorie reduction"
			{lbl: langS[li++], 	val: 4	},	//	"Lose fat - 15% calorie reduction"
			{lbl: langS[li++], 	val: 5	},	//	"Lose fat - 20% calorie reduction"
			{lbl: langS[li++], 	val: 6	}	//	"Lose fat - 25% calorie reduction"
		],
		msgTitle: langS[li++],
		msgBody: langS[li++],
		getVal: function(){
			return this.status.val;
		},
		setVal: function(val){
		//	This method returns true when the val is found in the list and false other case.
			var i = 0;
			for (i = 0; i < this.list.length; i++) {
				if (val == this.list[i].val){
					this.status = this.list[i];
					return true
				}
			};
			return false;
		},
		doChanged: function(){
			if (tdc_GoalMultiplier(this.status.val) < 0.8) {
					showAlert(this.msgTitle, 
						"<div style='color:red'>".concat(this.msgBody).concat("</div>")
					)
			};
			this.store();	//	REMOVE IT!
		},
		load: function(def){
			this.setVal($localstorage.get('ddGoal', def));
		},
		store: function(){
			$localstorage.set('ddGoal', this.getVal());
		},
		init: function(){
			this.load(this.list[0].val);
			return this;
		}
	}.init();

	$scope.LBM = function(){
/*	Lean Body Mass	*/
//		console.log("LBM is calculated")
  		with($scope){
  			return lbm_Calculation(tbWeight.getVal(), tbFat.getVal());
		}		
	};

	$scope.FFMI = function(){
/*	Fat-Free Mass Index	*/
		with($scope){
			return ffmi(LBM(), tbHeight.getVal());
		}
	};

  	$scope.BMR = function(){
/*	Basal Metabolic Rate */
//		console.log("BMR is calculated")

		with($scope){

  			switch (ddResearch.getVal()){

  				case 0: 	//	"Harris-Benedict":
  					return  !ddGender.isFemale()
  					?	bmr_HarrisBenedict_Male(tbWeight.getVal(), tbHeight.getVal(), tbAge.getVal())
  					: 	bmr_HarrisBenedict_Female(tbWeight.getVal(), tbHeight.getVal() , tbAge.getVal());
  					break;

  				case 1: 	//	"Mifflin-St.Jeor":
  					return  !ddGender.isFemale()
  					?	bmr_MifflinStJeor_Male(tbWeight.getVal(), tbHeight.getVal() , tbAge.getVal())
  					: 	bmr_MifflinStJeor_Female(tbWeight.getVal(), tbHeight.getVal() , tbAge.getVal());
  					break;

  				case 2: 	//	"Katch-McArdle":
  					return  bmr_KatchMcArdle(LBM());
  					break;

  				case 3: 	//	"Cunningham":
  					return  bmr_Cunningham(LBM());
  					break;

  				default: 

  			}	
		}
	};

	$scope.BMRC = function(){
/*	Basal Metabolic Rate Calibrated */
		with($scope){
			return bmr_Calibrated(BMR(), tbCalibration.getVal());	
		}
	};


	$scope.TDEE = function(){
/*	Total Daily Energy Expenditure (TDEE) - diily calories to maintain weight 	*/
		with($scope){
			return tdee(BMR(), ddActivity.getVal());	
		}
	};

	$scope.TDC = function(){
/*	Total Daily Calories 	*/
		with($scope){
			return tdc_Calculating(TDEE(), ddGoal.getVal());
		}
	};

  ionic.Platform.ready(function(){
    // will execute when device is ready, or immediately if the device is already ready.
//	    console.log("cordova:",ionic.Platform.isCordova()); 
    	console.log("paltform:",ionic.Platform.platform()); 
    	console.log("version:",ionic.Platform.version());
    	console.log("device:",ionic.Platform.device().platform);
//    	console.log("device.platform:",device.platform); 
  });
 
//	console.log("Object::");
//	console.log($localstorage.getObject('post'));
/*

  	$scope.$on('$ionicView.enter', function() {
    	console.log('Detected: $ionicView.enter');
    	$scope.loadBio();
  	});	

  	$scope.$on('$ionicView.leave', function() {
    	console.log('Detected: $ionicView.leave');
    	$scope.saveBio();	//	Store data in the factory each time when the view is leaved.
  	});
*/
});