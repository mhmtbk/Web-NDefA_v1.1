function Jeo2Duzlem(Enlem, Boylam, DOM) {
    //GRS80 elipsoidinin geometrik parametreleri
    var a = 6378137.0;
    var b = 6356752.3141;
    var c = Math.pow(a, 2) / b;
    var e2 = (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(a, 2);
    var eUssuKare = (e2) / (1 - e2); //e'^2
    var ro_UTM = (a) / Math.sqrt(1 - (e2 * (Math.pow((Math.sin((Enlem * (Math.PI) / 180))), 2))));
    var delta_lamda = Boylam - DOM;
    var ro = (180 / Math.PI);
    var G_UTM = (Boylam - DOM) * (Math.cos((Enlem * (Math.PI) / 180))) * (1/ro);
    var T_UTM = (Math.pow((Math.tan((Enlem * (Math.PI) / 180))), 2));
    var C_UTM = eUssuKare * (Math.pow((Math.cos((Enlem * (Math.PI) / 180))), 2));

    var M_a1 = (1 - (e2 / 4) - ((3 * (Math.pow(e2, 2))) / 64) - ((5 * (Math.pow(e2, 3))) / 256)) * Enlem * (1/ro) ;
    var M_a2 = (((3 * e2) / 8) + ((3 * (Math.pow(e2, 2))) / 32) + ((45 * (Math.pow(e2, 3))) / 1024)) * Math.sin((2 * Enlem) * (Math.PI) / 180);
    var M_a3 = (((15 * (Math.pow(e2, 2))) / 256) + ((45 * (Math.pow(e2, 3))) / 1024)) * Math.sin((4 * Enlem) * (Math.PI) / 180);
    var M_a4 = ((35 * (Math.pow(e2, 3))) / 3072) * Math.sin((6 * Enlem) * (Math.PI) / 180);
    var M_UTM = a * (M_a1 - M_a2 + M_a3 - M_a4);

    var y_Duzlem = ro_UTM * (G_UTM + ((1-T_UTM+C_UTM)*(Math.pow(G_UTM, 3) / 6)) + ((5-(18*T_UTM)+(Math.pow(T_UTM, 2))+(72*C_UTM)-(58*eUssuKare))*(Math.pow(G_UTM, 5)/120)));

    var x_1 = (Math.pow(G_UTM, 2) / 2);
    var x_2 = (5-T_UTM+(9*C_UTM)+(4*Math.pow(C_UTM, 2)))*(Math.pow(G_UTM, 4) / 24);
    var x_3 = (61-(58*T_UTM)+(Math.pow(T_UTM, 2))+(600*C_UTM)-(330*eUssuKare))*(Math.pow(G_UTM, 6) / 720);
    var x_Duzlem = M_UTM + (ro_UTM * Math.tan((Enlem * (Math.PI) / 180)) * (x_1 + x_2 + x_3));

    Easting =  m0_UTM * y_Duzlem + 500000 //500000 eklenir, m0_UTM  düzenlenecek
    Northing = m0_UTM * x_Duzlem
}