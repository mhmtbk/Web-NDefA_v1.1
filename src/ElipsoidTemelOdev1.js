//Fundamental calculation on the ellipsoid surface - 1
//Gauss mid-latitude method formulas were used.
function elipsoid_1nci_Temel_Odev(P1_Enlem, P1_Boylam, P1P2_Uzunluk, P1P2_Azimut) {
	//Geometric parameters of the GRS80 ellipsoid.
	var a = 6378137.0;
	var b = 6356752.3141;
	var c = Math.pow(a, 2) / b;
	var e2 = (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(a, 2);
	var eUssuKare = (e2) / (1 - e2); //e'^2 
	var ro = (180/ Math.PI) ;
	
	Enlem = P1_Enlem ;
	Boylam = P1_Boylam;
	S= P1P2_Uzunluk ;
	azimut= P1P2_Azimut;
	
	var u = S*(Math.cos(((Math.PI)*azimut)/180)) ;
	var v = S*(Math.sin(((Math.PI)*azimut)/180)) ;
	
	var Buyuk_V = Math.sqrt(1+((eUssuKare)*(Math.pow((Math.cos((Enlem*(Math.PI)/180))),2)))) ;
	var nUssuKare = eUssuKare*(Math.pow((Math.cos((Enlem*(Math.PI))/180)),2)) ; // n^2
	var t = Math.tan((Enlem*Math.PI)/180) ;
	
	
	var b1 = ((Math.pow(Buyuk_V,3) / c) * ro) * u ;
	var b2 = -((((Math.pow(Buyuk_V, 4) * t) / (2 * (Math.pow(c,2))) * ro * (Math.pow(v, 2))))) ;
	var b3 = -(((3*(Math.pow(Buyuk_V, 4)) * nUssuKare * t) / (2 * (Math.pow(c, 2)))) * ro * (Math.pow(u, 2))) ;
	var b4 = -(((Math.pow(Buyuk_V, 5)) / (6 * (Math.pow(c, 3)))) * (1 + (3 * Math.pow(t, 2)) + nUssuKare - (9 * nUssuKare * Math.pow(t, 2)))) * ro * u * Math.pow(v, 2) ;
	var b5 = -(((Math.pow(Buyuk_V, 5) * nUssuKare) / (2 * (Math.pow(c, 3)))) * (1 - ( Math.pow(t, 2)) + nUssuKare - (5 * nUssuKare * Math.pow(t, 2)))) * ro * Math.pow(u, 3) ;
	var b6 = (((Math.pow(Buyuk_V, 6) * t) / (24 * (Math.pow(c, 4)))) * (1 + (3 * Math.pow(t, 2)) + nUssuKare - (9 * nUssuKare * Math.pow(t, 2)))) * ro * Math.pow(v, 4) ;
	var b7 = -(((Math.pow(Buyuk_V, 6) * t) / (12 * (Math.pow(c, 4)))) * (4 + (6 * Math.pow(t, 2)) - (13 * nUssuKare) - (9 * nUssuKare * Math.pow(t, 2)))) * ro * Math.pow(u, 2) * Math.pow(v, 2) ;
	var b8 = ((Math.pow(Buyuk_V, 6) * nUssuKare * t) / (2 * (Math.pow(c, 4)))) * ro * Math.pow(u, 4) ;
	var b9 = (((Math.pow(Buyuk_V, 7)) / (120 * (Math.pow(c, 5)))) * (1 + (30 * Math.pow(t, 2)) + (45 * Math.pow(t, 4)))) * ro * u * Math.pow(v, 4) ;
	var b10 = -(((Math.pow(Buyuk_V, 7)) / (30 * (Math.pow(c, 5)))) * (2 + (15 * Math.pow(t, 2)) + (15 * Math.pow(t, 4)))) * ro * Math.pow(u, 3) * Math.pow(v, 2) ;
	
	DeltaEnlem = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 ;
	
	
	var l1 = (Buyuk_V / (c * Math.cos((Enlem * (Math.PI)/180)))) * ro * v ;
	var l2 = ((Math.pow(Buyuk_V, 2) * t) / (Math.pow(c, 2) * Math.cos((Enlem * (Math.PI)/180)))) * ro * u * v ;
	var l3 = -((Math.pow(Buyuk_V, 3) * Math.pow(t, 2)) / (3 * Math.pow(c, 3) * Math.cos((Enlem * (Math.PI)/180)))) * ro * Math.pow(v, 3) ;
	var l4 = ((Math.pow(Buyuk_V, 3)) / (3 * (Math.pow(c, 3)) * Math.cos((Enlem * (Math.PI)/180)))) * (1 + (3 * Math.pow(t, 2)) + nUssuKare) * ro * Math.pow(u, 2) * v ;
	var l5 = -((Math.pow(Buyuk_V, 4) * t) / (3 * (Math.pow(c, 4)) * Math.cos((Enlem * (Math.PI)/180)))) * (1 + (3 * Math.pow(t, 2)) + nUssuKare) * ro * u * Math.pow(v, 3) ;
	var l6 = ((Math.pow(Buyuk_V, 4) * t) / (3 * (Math.pow(c, 4)) * Math.cos((Enlem * (Math.PI)/180)))) * (2 + (3 * Math.pow(t, 2)) + nUssuKare) * ro * Math.pow(u, 3) * v ;
	var l7 = ((Math.pow(Buyuk_V, 5) * Math.pow(t, 2)) / (15 * (Math.pow(c, 5)) * Math.cos((Enlem * (Math.PI)/180)))) * (2 + (3 * Math.pow(t, 2)) + nUssuKare) * ro * Math.pow(v, 5) ;
	var l8 = -((Math.pow(Buyuk_V, 5)) / (15 * (Math.pow(c, 5)) * Math.cos((Enlem * (Math.PI)/180)))) * (1 + (20 * Math.pow(t, 2)) + (30 * Math.pow(t, 4))) * ro * Math.pow(u, 2) * Math.pow(v, 3);
	var l9 = ((Math.pow(Buyuk_V, 5)) / (15 * (Math.pow(c, 5)) * Math.cos((Enlem * (Math.PI)/180)))) * (2 + (15 * Math.pow(t, 2)) + (15 * Math.pow(t, 4))) * ro * Math.pow(u, 4) * v;
	
	DeltaBoylam = l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 + l9 ;
	
	EnlemNewPoint = Enlem + DeltaEnlem ;
	BoylamNewPoint = Boylam + DeltaBoylam ;
}