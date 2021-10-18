function elipsoid_2nci_Temel_Odev(P1_Enlem, P1_Boylam, P2_Enlem, P2_Boylam) {
    //Gauss Ortalama Enlem formulleri kullanarak yapýlmýþtýr. Ýki Nokta arasý 1000m' ye kadar iyi sonuç vermektedir.
    //GRS80 elipsoidinin geometrik parametreleri
    var a = 6378137.0;
    var b = 6356752.3141;
    var c = Math.pow(a, 2) / b;
    var e2 = (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(a, 2);
    var eUssuKare = (e2) / (1 - e2); //e'^2

    var ro = (180 / Math.PI);
    var ro_saniye = (180 / Math.PI) * 3600;

    Enlem1 = P1_Enlem;
    Boylam1 = P1_Boylam;
    Enlem2 = P2_Enlem;
    Boylam2 = P2_Boylam;


    Deltafi = Enlem2 - Enlem1;
    Deltalamda = Boylam2 - Boylam1;
    Deltalamda_Bolu_2 = Deltalamda / 2;
    fi = (Enlem1 + Enlem2) / 2;

    var Buyuk_V = Math.sqrt(1 + ((eUssuKare) * (Math.pow((Math.cos((fi * (Math.PI) / 180))), 2))));
    var nUssuKare = eUssuKare * (Math.pow((Math.cos((fi * (Math.PI)) / 180)), 2)); // n^2
    var t = Math.tan((fi * Math.PI) / 180);
    var M = (c / Math.pow(Buyuk_V, 3));
    var N = (c / Buyuk_V);

    var esitlik_1 = (1 / M) * ro_saniye;
    var esitlik_2 = (1 / N) * ro_saniye;
    var esitlik_3 = (1 / (24 * (Math.pow(ro_saniye, 2))));
    var esitlik_4 = (1 + nUssuKare - (9 * nUssuKare * Math.pow(t, 2))) / (24 * Math.pow(Buyuk_V, 4) * (Math.pow(ro_saniye, 2)));
    var esitlik_5 = (1 - (2 * nUssuKare)) / (24 * (Math.pow(ro_saniye, 2)));
    var esitlik_6 = (nUssuKare * (1 - (Math.pow(t, 2)))) / (8 * (Math.pow(Buyuk_V, 4)) * (Math.pow(ro_saniye, 2))); // Bakýlacak
    var esitlik_7 = (1 + nUssuKare) / (12 * (Math.pow(ro_saniye, 2)));
    var esitlik_8 = (3 + (8 * nUssuKare)) / (24 * (Math.pow(Buyuk_V, 4)) * (Math.pow(ro_saniye, 2)));

    var cos_fi = (Math.cos((fi * (Math.PI) / 180)));
    var sin_fi = (Math.sin((fi * (Math.PI) / 180)));
    var cos_Deltalamda_Bolu_2 = (Math.cos((Deltalamda_Bolu_2 * (Math.PI) / 180)));

    var esitlik_A = ((1 / esitlik_2) * Deltalamda * cos_fi) * (1 - ((esitlik_3 * Math.pow((Deltalamda * sin_fi), 2) * (Math.pow(ro_saniye, 2))) / 3600) + (((esitlik_4 * Math.pow(Deltafi, 2)) * (Math.pow(ro_saniye, 2))) / 3600));
    var esitlik_B = ((1 / esitlik_1) * Deltafi * cos_Deltalamda_Bolu_2) * (1 + ((esitlik_5 * Math.pow((Deltalamda * cos_fi), 2) * (Math.pow(ro_saniye, 2))) / 3600) + (((esitlik_6 * Math.pow(Deltafi, 2)) * (Math.pow(ro_saniye, 2))) / 3600));
    var esitlik_DeltaAlfa = (Deltalamda * sin_fi) * (1 + ((esitlik_7 * Math.pow((Deltalamda * cos_fi), 2) * (Math.pow(ro_saniye, 2))) / 3600) + (((esitlik_8 * Math.pow(Deltafi, 2)) * (Math.pow(ro_saniye, 2))) / 3600));

    var esitlik_DeltaAlfa_Bolu_2 = esitlik_DeltaAlfa / 2;

    var esitlik_alfa = Math.atan(esitlik_A / esitlik_B) * ro;


    if (Enlem2 > Enlem1 && Boylam2 > Boylam1) {
        azimut_P1_P2 = esitlik_alfa - esitlik_DeltaAlfa_Bolu_2;
        azimut_P2_P1 = esitlik_alfa + esitlik_DeltaAlfa_Bolu_2 + 180;
        S_P1_P2 = Math.sqrt(Math.pow(esitlik_A * 3600, 2) + Math.pow(esitlik_B * 3600, 2));

    } else if (Enlem2 > Enlem1 && Boylam1 > Boylam2) {
        azimut_P1_P2 = esitlik_alfa - esitlik_DeltaAlfa_Bolu_2;
        azimut_P2_P1 = esitlik_alfa + esitlik_DeltaAlfa_Bolu_2 + 180;
        S_P1_P2 = Math.sqrt(Math.pow(esitlik_A * 3600, 2) + Math.pow(esitlik_B * 3600, 2));

    } else if (Enlem1 > Enlem2 && Boylam1 > Boylam2) {
        azimut_P1_P2 = esitlik_alfa - esitlik_DeltaAlfa_Bolu_2 + 180;
        azimut_P2_P1 = esitlik_alfa + esitlik_DeltaAlfa_Bolu_2;
        S_P1_P2 = Math.sqrt(Math.pow(esitlik_A * 3600, 2) + Math.pow(esitlik_B * 3600, 2));

    } else if (Enlem1 > Enlem2 && Boylam2 > Boylam1) {
        azimut_P1_P2 = esitlik_alfa - esitlik_DeltaAlfa_Bolu_2 - 180;
        azimut_P2_P1 = esitlik_alfa + esitlik_DeltaAlfa_Bolu_2 + 180 + 180;;
        S_P1_P2 = Math.sqrt(Math.pow(esitlik_A * 3600, 2) + Math.pow(esitlik_B * 3600, 2));
    }

    if (azimut_P1_P2 < 0 || azimut_P2_P1 < 0) {
        azimut_P1_P2 = azimut_P1_P2 + 360;
        azimut_P2_P1 = azimut_P2_P1 + 360;
    }
}
