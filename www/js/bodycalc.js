/*
	Package: 	bodycalc

	Version: 	150409

	## Common abbreviationss:
		BMR 	- Basal Metabolic Rate
		LBM 	- Lean Body Mass
		RDEE 	- Resting Daily Energy Expenditure
		RMR 	- Resting Metabolic Rate
		TDEE 	- Total Daily Energy Expenditure
		FFMI	- Fat Free Mass Index 
		nFFMI	- Normilized FFMI (for those whos hight is less 1.8 meter)

	## FFMI Special notes
		FFMI = LBM/(Height^2)
			Ref: http://www.nature.com/ijo/journal/v26/n7/full/0802037a.html
		[ for FFMI > 1.8m ]: nFFMI = FFMI + 6.1(1.8-H)
			https://thinksteroids.com/articles/muscle-profiling-steroids/
		
		FFMI Gold Staandard (Kouri et al., 1995)
		 Norms for FFMI in Men:
			16-17 = Well below average (< / - 20th percentile)
			18-19 = Average (25-50th percentile)
			20 = Above Average (50-75th percentile)
			21 = Well above average (75-90th percentile)
			22 = Excellent (95th percentile)
			23-25 = Superior [Off the charts for normal adult men (Schutz et al., 2002), but in the top 85-95th percentile for Natural bodybuilders (Kouri et al., 1995)]
			26-27 = Some Natural bodybuilders could get to this level (Genetics play a large role in attaining this level).
			28-29 = It is possible but very unlikely to reach this level Naturally as research and science have clearly shown NO non-users have ever gotten higher than 28.
			30 or above = We know this person is not a Natural bodybuilder through common-sense, but now science too (Kouri et al., 1995).

			Frank Zane's contest weight, at 5'9" and 180 lbs, his FFMI was ~25.3 
			Arnold Schwarzenegger, at 6'2" and 235 lbs, his FFMI was ~28.7

	## Description:
		This package allows to calculate standard body and dietary estimations:

	[ ] Revice TDEE Activity level multiplier selector
	[ ] Revice TDEE Goals multiplier selector
	
= ver 150409
	[x]	BMR (Harris-Benedict research, 1919)
	[ ] BMR (Harris–Benedict equations revised by Roza and Shizgal in 1984)
		Men		: 	BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)
		Women	: 	BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)
	[x] BMR (Mifflin-St.Jeor research, 1990)
	[x] BMR calibrated (Individual Calibration Factor applied)
	[x] BMR, LBM based RDEE, (Katch-McArdle research, 1986)
	[x] BMR, LBM based RMR (Cunningham JJ, 1980)0.32810
	[x] LBM calculation
	[ ] LBM estimation (Hume, 1966)
		Male 	: 	LBM = ( * W) + (0.33929 * H) – 29.5336
		Female 	: 	LBM = (0.29569 * W) + (0.41813 * H) - 43.2933
	[x] TDEE Activity Multiplier selector (Harris-Benedict research, 1919)
	[x]	FFMI (Vanitallie, Yang, 1990) with nFFMI (Kouri et al., 1995; Pope et al., 2000) support build in.
	[ ]	FFMI estimation (Kouri et al., 1995) - see "FFMI Special notes"
	[x]	TDC (Total Daily Calories) goal selector
	[x]	TDC (Total Daily Calories) calculator
	

/*
	Harris-Benedict algoritm for basal metabolic rate (BMR)
		Male     : BMR = 66 + 13.7*Weight + 5*Height – 6.8*Age
		Female   : BMR = 655 + 9.6*Weight + 1.8*Height – 4.7*Age  
*/
bmr_HarrisBenedict_Male = function( Wt, Ht, Age){
    return Math.round(66 + 13.7 * Wt + 5 * Ht - 6.8 * Age)};
bmr_HarrisBenedict_Female = function( Wt, Ht, Age){
    return Math.round(655 + 9.6 * Wt + 1.8 * Ht - 4.7 * Age)};

/*
	Mifflin-St.Jeor algoritm for basal metabolic rate (BMR)
		Male 	: 	BMR = 9.99*Weight + 6.25*Height – 4.92*Age + 5
		Female 	: 	BMR = 9.99*Weight + 6.25*Height – 4.92*Age - 161	
*/
bmr_MifflinStJeor_Male = function( Wt, Ht, Age){
    return Math.round(9.99 * Wt + 6.25 * Ht - 4.92 * Age + 5)};
bmr_MifflinStJeor_Female = function( Wt, Ht, Age){
    return Math.round(9.99 * Wt + 6.25 * Ht - 4.92 * Age -161)};

/*
	Loan Body Mass (LBM)
		LBM=BW − (BW * BF%)

	LBM Average (Rouhtly) Estimation
		Male 	: 	LBM = (0.32810 * W) + (0.33929 * H) – 29.5336
		Female 	: 	LBM = (0.29569 * W) + (0.41813 * H) - 43.2933
*/
lbm_Calculation = function(Wt, Fat){ 
	return Math.round(Wt * 100 - (Wt * Fat)) / 100;
};

/*
	Katch-McArdle algoritm for basal metabolic rate (BMR)
		370 + 21.6*LBM	
*/
bmr_KatchMcArdle = function(lbm){
    return Math.round(370 + 21.6 * lbm)};

/*
	Cunningham algoritm for basal metabolic rate (BMR)
		500 + 22*LBM
*/
bmr_Cunningham = function(lbm){
    return Math.round(500 + 22 * lbm)
};

/*
	Clibrated MBR (Individual Calibration Factor applied to mbr)

	Note: 
		The calibration procedure takes a month and I wont lie, the calorie counting 
		required is a lot of work. For most people, just using the equations that get 
		you within 10% is close enough and its not worth the bother to calibrate. 
		For serious bodybuilders though, having this accurate information is critical.
		
	The calibration procedure:

		1) Use the equations to determine how much you should eat and the predicted 
		weight in 30 days

		2) For 30 days, eat the specified amount

		3) At the end of the 30 days compare your expected weight with your actual 
		weight.  From this weight difference, calculate the calibration factor
*/
bmr_Calibrated = function(bmr, icf){
//	icf - individual calibration factor (positive or negative)
	return bmr + icf;
};

/*	
	Activity level multiplier for Daily calories to maintain weight (TDEE)
		0: Desk job with little exercise 			1.2
    	1: 1-3 hrs/wk of light exercise 			1.375
    	2: 3-5 hrs/wk of moderate exercise 			1.55
    	3: 5-6 hrs/wk of strenuous exercise 		1.725
    	4: 7-21 hrs/wk of strenuous exercise/work	1.9
*/
tdee_ActivityMultiplier = function(al){
// al - Activiti Level
	switch(al){
		case 0:
			return 1.2;		//	Desk job with little exercise 
			break;
		case 1:
			return 1.375;	//	1-3 hrs/wk of light exercise 
			break;
		case 2:
			return 1.55;	//	3-5 hrs/wk of moderate exercise
			break;
		case 3:
			return 1.725;	//	5-6 hrs/wk of strenuous exercise
			break;
		case 4:
			return 1.9;		//	7-21 hrs/wk of strenuous exercise/work
			break;
	}

};

/*
	Total Daily Energy Expenditure (TDEE) - diily calories to maintain weight 
		TDEE = BMR * ALM
		ALM = tdee_ActivityMultiplier(al)
		al - activity level multiplier
*/
tdee = function(bmr,al){
// al - Activiti Level
	return Math.round(bmr * tdee_ActivityMultiplier(al));
};

/*
	Fat Free Mass Index (FFMI) with Normilized FFMI (nFFMI) support build in
		FFMI = LBM/(Height^2)
		for FFMI>1.8m : nFFMI = FFMI + 6.1(1.8-H)
*/
ffmi = function(lbm, Ht){
//	return Math.round(lbm/(Ht * Ht)*1000000)/100
	//6.1(1.8-H)
	var h = Ht/100;
	return Math.round((lbm/(h * h) + ( h<1.8 ? 6.1*(1.8-h) : 0 ))*100)/100;
}

/*
	TDEE goal multiplier for selected dietary target
		0: 	Clean bulk
		1: 	Gain muscle, lose fat
		2: 	Lose fat - 5% calorie reduction
		3: 	Lose fat - 10% calorie reduction
		4: 	Lose fat - 15% calorie reduction
		5: 	Lose fat - 20% calorie reduction
		6: 	Lose fat - 25% calorie reduction
*/
tdc_GoalMultiplier = function(gl){
// gl - Goal Level
	switch(gl){
		case 0:
			return 1.1;		//	Clean bulk
			break;
		case 1:
			return 1;		//	Gain muscle, lose fat
			break;
		case 2:
			return 0.95;	//	Lose fat - 5% calorie reduction
			break;
		case 3:
			return 0.9;		//	Lose fat - 10% calorie reduction
			break;
		case 4:
			return 0.85;	//	Lose fat - 15% calorie reduction
			break;
		case 5:
			return 0.8;		//	Lose fat - 20% calorie reduction
			break;
		case 6:
			return 0.75;	//	Lose fat - 25% calorie reduction
			break;
	}
};

/*
	Total Daily Calories
		TDC = TDEE * Goal Multiplier
*/
tdc_Calculating = function(tdee,gl){
// gl - Goal Level
	return Math.round(tdee * tdc_GoalMultiplier(gl));
};

