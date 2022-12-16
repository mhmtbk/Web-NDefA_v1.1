//if (document.getElementById('DatumNokta_t2t1').clicked == true) {
$("#DeformationTest_t3t2").click(function () {
    //Static Noktalar Çıktıktan Sonra Kalan Nokta Adları
    Noktalar_t2_t3t2_sgnf = Noktalar_t2_t3t2;
    Noktalar_t3_t3t2_sgnf = Noktalar_t3_t3t2;
    for (let i = static_point_count_t2t3 - 1; i >= 0; i--) {
        Noktalar_t2_t3t2_sgnf.splice(static_points_name_index_t2t3_t2[i], 1); //Static nokta harici T1 Nokta adları
        Noktalar_t3_t3t2_sgnf.splice(static_points_name_index_t2t3_t3[i], 1); //Static nokta harici T3 Nokta adları
    };
    //

    // Tüm-iz Deng. ile bulunmuş noktaların koordinalarını static noktaları çıkartarak alma
    matrix1tumCoor_t2_t3t2_sgnf = math.zeros((NoktaSayisi_t2 - static_point_count_t2t3) * 3, 1) //Static nokta harici T2 Tüm-iz Ham Koordinatlar
    for (let i = 0; i < (NoktaSayisi_t2 - static_point_count_t2t3); i++) {
        var xt2_sgnf = matrix1tumCoor_t2.subset(math.index(3 * (bazNNunique_t2.indexOf(Noktalar_t2_t3t2_sgnf[i])), 0));
        var yt2_sgnf = matrix1tumCoor_t2.subset(math.index(3 * (bazNNunique_t2.indexOf(Noktalar_t2_t3t2_sgnf[i])) + 1, 0));
        var zt2_sgnf = matrix1tumCoor_t2.subset(math.index(3 * (bazNNunique_t2.indexOf(Noktalar_t2_t3t2_sgnf[i])) + 2, 0));

        matrix1tumCoor_t2_t3t2_sgnf.subset(math.index((3 * i), 0), xt2_sgnf);
        matrix1tumCoor_t2_t3t2_sgnf.subset(math.index(((3 * i) + 1), 0), yt2_sgnf);
        matrix1tumCoor_t2_t3t2_sgnf.subset(math.index(((3 * i) + 2), 0), zt2_sgnf);
    }

    matrix1tumCoor_t3_t3t2_sgnf = math.zeros((NoktaSayisi_t3 - static_point_count_t2t3) * 3, 1) //Static nokta harici T3 Tüm-iz Ham Koordinatlar
    for (let i = 0; i < (NoktaSayisi_t3 - static_point_count_t2t3); i++) {
        var xt3_sgnf = matrix1tumCoor_t3.subset(math.index(3 * (bazNNunique_t3.indexOf(Noktalar_t3_t3t2_sgnf[i])), 0));
        var yt3_sgnf = matrix1tumCoor_t3.subset(math.index(3 * (bazNNunique_t3.indexOf(Noktalar_t3_t3t2_sgnf[i])) + 1, 0));
        var zt3_sgnf = matrix1tumCoor_t3.subset(math.index(3 * (bazNNunique_t3.indexOf(Noktalar_t3_t3t2_sgnf[i])) + 2, 0));

        matrix1tumCoor_t3_t3t2_sgnf.subset(math.index((3 * i), 0), xt3_sgnf);
        matrix1tumCoor_t3_t3t2_sgnf.subset(math.index(((3 * i) + 1), 0), yt3_sgnf);
        matrix1tumCoor_t3_t3t2_sgnf.subset(math.index(((3 * i) + 2), 0), zt3_sgnf);
    }
    //

    // Tüm-iz Deng. ile bulunmuş A matrisinden static noktaların bulunduğu sütunları çıkartarak yeni A matrisi elde etme
    new_point_count_t3t2 = (NoktaSayisi_t3 - static_point_count_t2t3); //Static nokta harici nokta sayısı

    TumIzMtrx1A_t2_t3t2_sgnf = math.zeros(BazSayisi_t2 * 3, new_point_count_t3t2 * 3) //Static nokta harici T2 A matrisi
    for (let i = 0; i < new_point_count_t3t2; i++) {
        for (let j = 0; j < BazSayisi_t2 * 3; j++) {
            var xt2_A_sgnf = TumIzMtrx1A_t2.subset(math.index(j, (3 * (bazNNunique_t2.indexOf(Noktalar_t2_t3t2_sgnf[i])))));
            var yt2_A_sgnf = TumIzMtrx1A_t2.subset(math.index(j, (3 * (bazNNunique_t2.indexOf(Noktalar_t2_t3t2_sgnf[i])) + 1)));
            var zt2_A_sgnf = TumIzMtrx1A_t2.subset(math.index(j, (3 * (bazNNunique_t2.indexOf(Noktalar_t2_t3t2_sgnf[i])) + 2)));

            TumIzMtrx1A_t2_t3t2_sgnf.subset(math.index(j, (3 * i)), xt2_A_sgnf);
            TumIzMtrx1A_t2_t3t2_sgnf.subset(math.index(j, (3 * i) + 1), yt2_A_sgnf);
            TumIzMtrx1A_t2_t3t2_sgnf.subset(math.index(j, (3 * i) + 2), zt2_A_sgnf);
        }
    }

    TumIzMtrx1A_t3_t3t2_sgnf = math.zeros(BazSayisi_t3 * 3, new_point_count_t3t2 * 3) //Static nokta harici T3 A matrisi
    for (let i = 0; i < new_point_count_t3t2; i++) {
        for (let j = 0; j < BazSayisi_t3 * 3; j++) {
            var xt3_A_sgnf = TumIzMtrx1A_t3.subset(math.index(j, (3 * (bazNNunique_t3.indexOf(Noktalar_t3_t3t2_sgnf[i])))));
            var yt3_A_sgnf = TumIzMtrx1A_t3.subset(math.index(j, (3 * (bazNNunique_t3.indexOf(Noktalar_t3_t3t2_sgnf[i])) + 1)));
            var zt3_A_sgnf = TumIzMtrx1A_t3.subset(math.index(j, (3 * (bazNNunique_t3.indexOf(Noktalar_t3_t3t2_sgnf[i])) + 2)));

            TumIzMtrx1A_t3_t3t2_sgnf.subset(math.index(j, (3 * i)), xt3_A_sgnf);
            TumIzMtrx1A_t3_t3t2_sgnf.subset(math.index(j, (3 * i) + 1), yt3_A_sgnf);
            TumIzMtrx1A_t3_t3t2_sgnf.subset(math.index(j, (3 * i) + 2), zt3_A_sgnf);
        }
    }
    //

    //Fonksiyonel Model
    mtrx_N_t2_t3t2_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t2_t3t2_sgnf), mtrx1P_t2, TumIzMtrx1A_t2_t3t2_sgnf);
    mtrx_n_t2_t3t2_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t2_t3t2_sgnf), mtrx1P_t2, matrix1l_t2);

    mtrx_N_t3_t3t2_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t3_t3t2_sgnf), mtrx1P_t3, TumIzMtrx1A_t3_t3t2_sgnf);
    mtrx_n_t3_t3t2_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t3_t3t2_sgnf), mtrx1P_t3, matrix1l_t3);

    mtrx_QX_t2_t3t2_sgnf = math.inv(mtrx_N_t2_t3t2_sgnf);
    mtrx_QX_t3_t3t2_sgnf = math.inv(mtrx_N_t3_t3t2_sgnf);

    mtrx_x_t2_t3t2_sgnf = math.multiply(mtrx_QX_t2_t3t2_sgnf, mtrx_n_t2_t3t2_sgnf);
    mtrx_x_t3_t3t2_sgnf = math.multiply(mtrx_QX_t3_t3t2_sgnf, mtrx_n_t3_t3t2_sgnf);
    //

    //Dengeli Koordinatlar
    mtrx_Deng_t2_t3t2_sgnf = math.add(matrix1tumCoor_t2_t3t2_sgnf, mtrx_x_t2_t3t2_sgnf);
    mtrx_Deng_t3_t3t2_sgnf = math.add(matrix1tumCoor_t3_t3t2_sgnf, mtrx_x_t3_t3t2_sgnf);
    //

    //V - S02_t Matrisleri
    mtrx_V_t2_t3t2_sgnf = math.subtract(math.multiply(TumIzMtrx1A_t2_t3t2_sgnf, mtrx_x_t2_t3t2_sgnf), matrix1l_t2);
    mtrx_V_t3_t3t2_sgnf = math.subtract(math.multiply(TumIzMtrx1A_t3_t3t2_sgnf, mtrx_x_t3_t3t2_sgnf), matrix1l_t3);

    n_sgnf_t2_t3t2 = BazSayisi_t2 * 3; // Ölçülen baz sayıları.
    u_sgnf_t2_t3t2 = (NoktaSayisi_t2 - static_point_count_t2t3) * 3; // Static noktalar çıktıktan sonra bilinmeyen noktaların sayısı.
    f_sgnf_t2_t3t2 = n_sgnf_t2_t3t2 - u_sgnf_t2_t3t2; // Serbestlik derecesi. Eğer f>0 ise dengeleme vardır.

    n_sgnf_t3_t3t2 = BazSayisi_t3 * 3; // Ölçülen baz sayıları.
    u_sgnf_t3_t3t2 = (NoktaSayisi_t3 - static_point_count_t2t3) * 3; // Static noktalar çıktıktan sonra bilinmeyen noktaların sayısı.
    f_sgnf_t3_t3t2 = n_sgnf_t3_t3t2 - u_sgnf_t3_t3t2; // Serbestlik derecesi. Eğer f>0 ise dengeleme vardır.

    mtrx_S0_t2_t3t2 = math.sqrt(math.divide((math.multiply(math.transpose(mtrx_V_t2_t3t2_sgnf), mtrx1P_t2, mtrx_V_t2_t3t2_sgnf)), f_sgnf_t2_t3t2))
    mtrx_S0_t2_sgnf_t3t2 = mtrx_S0_t2_t3t2.get([0, 0]);
    mtrx_S0_t3_t3t2 = math.sqrt(math.divide((math.multiply(math.transpose(mtrx_V_t3_t3t2_sgnf), mtrx1P_t3, mtrx_V_t3_t3t2_sgnf)), f_sgnf_t3_t3t2))
    mtrx_S0_t3_sgnf_t3t2 = mtrx_S0_t3_t3t2.get([0, 0]);
    //Birleşik varyans değeri
    So2_t3t2_sgnf = math.divide(math.add(math.multiply(Math.pow(mtrx_S0_t2_sgnf_t3t2, 2), f_sgnf_t2_t3t2), math.multiply(Math.pow(mtrx_S0_t3_sgnf_t3t2, 2), f_sgnf_t3_t3t2)), math.add(f_sgnf_t2_t3t2, f_sgnf_t3_t3t2));
    //

    //--- 3. Periyottaki Nokta Adlarını 2. Periyoda Göre Eşleştir ve Eşleşen Noktaların Koordinatlarını Al
    let eslesmis_t3t2_DengCoord = [];
    for (let i = 0; i < new_point_count_t3t2; i++) {
        for (let j = 0; j < new_point_count_t3t2; j++) {
            NNt2_t3t2 = (Noktalar_t2_t3t2_sgnf[i]).toLowerCase()
            NNt3_t3t2 = (Noktalar_t3_t3t2_sgnf[j]).toLowerCase()
            if (NNt3_t3t2.includes(NNt2_t3t2)) {
                eslesmis_t3t2_DengCoord.push(mtrx_Deng_t3_t3t2_sgnf.subset(math.index((3 * j), 0)));
                eslesmis_t3t2_DengCoord.push(mtrx_Deng_t3_t3t2_sgnf.subset(math.index((3 * j) + 1, 0)));
                eslesmis_t3t2_DengCoord.push(mtrx_Deng_t3_t3t2_sgnf.subset(math.index((3 * j) + 2, 0)));
            }
        }
    }

    //Matris formatı
    let eslesmis_t3t2_DengCoord_mtrx = math.zeros(new_point_count_t3t2 * 3, 1);
    for (let i = 0; i < new_point_count_t3t2 * 3; i += 3) {
        eslesmis_t3t2_DengCoord_mtrx.subset(math.index(i, 0), eslesmis_t3t2_DengCoord[i]);
        eslesmis_t3t2_DengCoord_mtrx.subset(math.index(i + 1, 0), eslesmis_t3t2_DengCoord[i + 1]);
        eslesmis_t3t2_DengCoord_mtrx.subset(math.index(i + 2, 0), eslesmis_t3t2_DengCoord[i + 2]);
    }
    mtrx_Deng_t3_t3t2_esles_sgnf = eslesmis_t3t2_DengCoord_mtrx;
    //

    //Static Noktalara Göre Dengelenmiş Koordinatların Coğrafi Koordinatları (from XYZ to φʎh)
    //ʎ boylamının hesabı (Kısmi Noktalar)
    listboylam_kısmi_t2_t3t2 = [];
    listboylam_kısmi_t3_t3t2 = [];
    for (var i = 0; i < new_point_count_t3t2; i++) {
        var Xcoor_t2_kismi = mtrx_Deng_t2_t3t2_sgnf.subset(math.index((3 * i), 0));
        var Ycoor_t2_kismi = mtrx_Deng_t2_t3t2_sgnf.subset(math.index(((3 * i) + 1), 0));
        var Xcoor_t3_esles_kismi = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index((3 * i), 0));
        var Ycoor_t3_esles_kismi = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index(((3 * i) + 1), 0));

        function boylam(X, Y) {
            if (X === 0 && Y > 0) {
                return 0;
            } else if (X > 0 && Y > 0) {
                return (math.atan(Y / X)) * (180 / Math.PI); // ʎ doğu.
            } else if (X < 0 && Y >= 0) {
                return 180 - ((math.atan(math.abs(Y / X))) * (180 / Math.PI)); // ʎ doğu.
            } else if (X > 0 && Y < 0) {
                return (math.atan(Y / X)) * (180 / Math.PI); // ʎ batı.
            } else if (X < 0 && Y <= 0) {
                return -180 + ((math.atan(Y / X)) * (180 / Math.PI)); // ʎ batı.
            }
        }

        var boylam_t2_kismi = boylam(Xcoor_t2_kismi, Ycoor_t2_kismi);
        var boylam_t3_kismi = boylam(Xcoor_t3_esles_kismi, Ycoor_t3_esles_kismi);

        listboylam_kısmi_t2_t3t2.push(boylam_t2_kismi);
        listboylam_kısmi_t3_t3t2.push(boylam_t3_kismi);
    }
    //

    // φ enleminin hesabı (t2) (Kısmi noktalar)
    listenlem_kısmi_t2_t3t2 = [];
    let listro_t2_t2t3 = [];
    for (var j = 0; j < new_point_count_t3t2; j++) {
        var Xcoor_t2_kismi = mtrx_Deng_t2_t3t2_sgnf.subset(math.index((3 * j), 0));
        var Ycoor_t2_kismi = mtrx_Deng_t2_t3t2_sgnf.subset(math.index(((3 * j) + 1), 0));
        var Zcoor_t2_kismi = mtrx_Deng_t2_t3t2_sgnf.subset(math.index(((3 * j) + 2), 0));

        //GRS80 elipsoidinin geometrik parametreleri
        a_GRS80_t1 = 6378137.0;
        b_GRS80_t1 = 6356752.3141;
        e2_GRS80_t1 = (Math.pow(a_GRS80_t1, 2) - Math.pow(b_GRS80_t1, 2)) / Math.pow(a_GRS80_t1, 2);

        enlem = [];
        φ = [];
        ρ = [];
        ro = [];
        φ[0] = 0;
        for (var i = 0; i < Infinity; i++) {
            ρ[i] = (a_GRS80_t1 / math.sqrt(1 - (e2_GRS80_t1 * math.pow(math.sin(φ[i] * Math.PI / 180), 2))))
            φ[i + 1] = math.atan((Zcoor_t2_kismi + (e2_GRS80_t1 * ρ[i] * math.sin(φ[i] * Math.PI / 180))) / math.sqrt(math.pow(Xcoor_t2_kismi, 2) + math.pow(Ycoor_t2_kismi, 2))) * (180 / Math.PI);

            if ((math.abs((φ[i + 1] - φ[i])) * 3600) <= 0.00001) {
                listenlem_kısmi_t2_t3t2.push((φ[i + 1])); //enlem = (φ[i + 1]); //enlem.push(φ[i + 1]);

                ro = (a_GRS80_t1 / math.sqrt(1 - (e2_GRS80_t1 * math.pow(math.sin(φ[i + 1] * Math.PI / 180), 2))));
                listro_t2_t2t3.push(ro);
                break;
            }
        }
    }

    // φ enleminin hesabı (t3) (Kısmi noktalar)
    listenlem_kısmi_t3_t3t2 = [];
    let listro_t3_t2t3 = [];
    for (var j = 0; j < new_point_count_t3t2; j++) {
        var Xcoor_t3_esles_kismi = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index((3 * j), 0));
        var Ycoor_t3_esles_kismi = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index(((3 * j) + 1), 0));
        var Zcoor_t3_esles_kismi = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index(((3 * j) + 2), 0));

        //GRS80 elipsoidinin geometrik parametreleri
        a_GRS80_t1 = 6378137.0;
        b_GRS80_t1 = 6356752.3141;
        e2_GRS80_t1 = (Math.pow(a_GRS80_t1, 2) - Math.pow(b_GRS80_t1, 2)) / Math.pow(a_GRS80_t1, 2);

        enlem = [];
        φ = [];
        ρ = [];
        ro = [];
        φ[0] = 0;
        for (var i = 0; i < Infinity; i++) {
            ρ[i] = (a_GRS80_t1 / math.sqrt(1 - (e2_GRS80_t1 * math.pow(math.sin(φ[i] * Math.PI / 180), 2))))
            φ[i + 1] = math.atan((Zcoor_t3_esles_kismi + (e2_GRS80_t1 * ρ[i] * math.sin(φ[i] * Math.PI / 180))) / math.sqrt(math.pow(Xcoor_t3_esles_kismi, 2) + math.pow(Ycoor_t3_esles_kismi, 2))) * (180 / Math.PI);

            if ((math.abs((φ[i + 1] - φ[i])) * 3600) <= 0.00001) {
                listenlem_kısmi_t3_t3t2.push((φ[i + 1])); //enlem = (φ[i + 1]); //enlem.push(φ[i + 1]);

                ro = (a_GRS80_t1 / math.sqrt(1 - (e2_GRS80_t1 * math.pow(math.sin(φ[i + 1] * Math.PI / 180), 2))));
                listro_t3_t2t3.push(ro);
                break;
            }
        }
    }
    //

    // h elipsoit yüksekliğinin hesabı (Kısmi noktalar)
    h_elipsoit_yuk_kısmi_t2_t3t2 = [];
    h_elipsoit_yuk_kısmi_t3_t3t2 = [];
    for (var j = 0; j < new_point_count_t3t2; j++) {
        var X_kısmi_t2 = mtrx_Deng_t2_t3t2_sgnf.subset(math.index((3 * j), 0));
        var h1_kısmi_t2 = math.divide(X_kısmi_t2, (math.cos(listenlem_kısmi_t2_t3t2[j] * Math.PI / 180) * math.cos(listboylam_kısmi_t2_t3t2[j] * Math.PI / 180)));
        var payda_N_t2 = math.sqrt(1 - (e2_GRS80_t1 * (math.pow(math.sin(listenlem_kısmi_t2_t3t2[j] * Math.PI / 180), 2))))
        let N_GRS80_t2 = math.divide(a_GRS80_t1, payda_N_t2);

        var X_kısmi_t3 = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index((3 * j), 0));
        var h1_kısmi_t3 = math.divide(X_kısmi_t3, (math.cos(listenlem_kısmi_t3_t3t2[j] * Math.PI / 180) * math.cos(listboylam_kısmi_t3_t3t2[j] * Math.PI / 180)));
        var payda_N_t3 = math.sqrt(1 - (e2_GRS80_t1 * (math.pow(math.sin(listenlem_kısmi_t3_t3t2[j] * Math.PI / 180), 2))))
        let N_GRS80_t3 = math.divide(a_GRS80_t1, payda_N_t3);

        h_elipsoit_yuk_kısmi_t2_t3t2.push(h1_kısmi_t2 - N_GRS80_t2);
        h_elipsoit_yuk_kısmi_t3_t3t2.push(h1_kısmi_t3 - N_GRS80_t3);
    }
    //

    //h elipsoit yüksekliği farkları
    h_elipsoit_fark_kismi_t3t2 = math.subtract(h_elipsoit_yuk_kısmi_t3_t3t2, h_elipsoit_yuk_kısmi_t2_t3t2);
    //

    //Nokta Adları T1 (Kısmi) Ve h elipsoit yüksekliği farkları (Matrix Formu)
    let matrix_NN_kismi_t3t2 = math.zeros(new_point_count_t3t2, 1);
    let matrix_h_kismi_t3t2 = math.zeros(new_point_count_t3t2, 1);
    for (let i = 0; i < new_point_count_t3t2; i++) {
        var NN_t3t2 = Noktalar_t2_t3t2_sgnf[i];
        var h_fark = math.multiply(100, h_elipsoit_fark_kismi_t3t2[i]).toFixed(2);
        matrix_NN_kismi_t3t2.subset(math.index(i, 0), NN_t3t2);
        matrix_h_kismi_t3t2.subset(math.index(i, 0), h_fark);
    }
    //

    //Static Noktalara Göre Dengelenmiş Koordinatların Enlem ve Boylamlarının Sağa-Yukarı Değerleri (from φʎ to N,E,U)
    //T1
    Dogu_t2_t3t2 = [];
    Kuzey_t2_t3t2 = [];
    for (var i = 0; i < new_point_count_t3t2; i++) {
        // Jeo2Duzlem(Enlem, Boylam, DOM) şeklinde fonksiyon parametreleri yazılır. Doğu ve Kuzey bulmak için "Easting" ve "Northing" değişkenleri çağrılır.
        Jeo2Duzlem(listenlem_kısmi_t2_t3t2[i], listboylam_kısmi_t2_t3t2[i], DOM_t2)

        Dogu_t2_t3t2.push(Easting);
        Kuzey_t2_t3t2.push(Northing);
    }
    //

    //T2
    Dogu_t3_t3t2 = [];
    Kuzey_t3_t3t2 = [];
    for (var i = 0; i < new_point_count_t3t2; i++) {
        // Jeo2Duzlem(Enlem, Boylam, DOM) şeklinde fonksiyon parametreleri yazılır. Doğu ve Kuzey bulmak için "Easting" ve "Northing" değişkenleri çağrılır.
        Jeo2Duzlem(listenlem_kısmi_t3_t3t2[i], listboylam_kısmi_t3_t3t2[i], DOM_t2)

        Dogu_t3_t3t2.push(Easting);
        Kuzey_t3_t3t2.push(Northing);
    }
    //

    //Dengeli Koordinatların Enlem-Boylamı ve Sağa-Yukarı Değerleri (Matrix Formu)
    let matrixKismiDeng_DoguKuzey_t2_t3t2 = math.zeros(new_point_count_t3t2, 2);
    let matrixKismiDeng_DoguKuzey_t3_t3t2 = math.zeros(new_point_count_t3t2, 2);
    for (let i = 0; i < new_point_count_t3t2; i++) {
        var dogu_t2 = Dogu_t2_t3t2[i].toFixed(3);
        var kuzey_t2 = Kuzey_t2_t3t2[i].toFixed(3);
        var dogu_t3 = Dogu_t3_t3t2[i].toFixed(3);
        var kuzey_t3 = Kuzey_t3_t3t2[i].toFixed(3);

        matrixKismiDeng_DoguKuzey_t2_t3t2.subset(math.index(i, 0), dogu_t2);
        matrixKismiDeng_DoguKuzey_t2_t3t2.subset(math.index(i, 1), kuzey_t2);
        matrixKismiDeng_DoguKuzey_t3_t3t2.subset(math.index(i, 0), dogu_t3);
        matrixKismiDeng_DoguKuzey_t3_t3t2.subset(math.index(i, 1), kuzey_t3);
    }
    //

    //Sağa-Yukarı Koordinat Farkları (Matrix Formu)
    mtrx_SagaYukariFark_t3t2_Kismi = math.subtract(matrixKismiDeng_DoguKuzey_t3_t3t2, matrixKismiDeng_DoguKuzey_t2_t3t2);
    //

    //Nokta Adı ve Sağa-Yukarı Koordinat Farkları (cm cinsinden) ve h elipsoit farkları (Matrix Formu)
    mtrx_NN_EastNorth_h_t3t2 = math.concat(matrix_NN_kismi_t3t2, math.multiply(100, mtrx_SagaYukariFark_t3t2_Kismi), matrix_h_kismi_t3t2);
    //





    //Topocentric East/North/Up (U/V/W) from X/Y/Z (Toposentrik Koordinat Farkları)
    E_topocentric_t3t2 = [];
    N_topocentric_t3t2 = [];
    U_topocentric_t3t2 = [];
    for (let i = 0; i < new_point_count_t3t2; i++) {
        phi0_topoc_t3t2 = listenlem_kısmi_t2_t3t2[i];
        lamda0_topoc_t3t2 = listboylam_kısmi_t2_t3t2[i];
//Burada kalındı
        X0_topoc_t3t2 = mtrx_Deng_t2_t3t2_sgnf.subset(math.index((3 * i), 0));
        Y0_topoc_t3t2 = mtrx_Deng_t2_t3t2_sgnf.subset(math.index(((3 * i) + 1), 0));
        Z0_topoc_t3t2 = mtrx_Deng_t2_t3t2_sgnf.subset(math.index(((3 * i) + 2), 0));

        X_topoc_t3t2 = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index((3 * i), 0));
        Y_topoc_t3t2 = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index(((3 * i) + 1), 0));
        Z_topoc_t3t2 = mtrx_Deng_t3_t3t2_esles_sgnf.subset(math.index(((3 * i) + 2), 0));;

        E_topoc_t3t2 = (-(X_topoc_t3t2 - X0_topoc_t3t2) * math.sin(lamda0_topoc_t3t2 * Math.PI / 180)) + ((Y_topoc_t3t2 - Y0_topoc_t3t2) * math.cos(lamda0_topoc_t3t2 * Math.PI / 180));
        E_topocentric_t3t2.push(E_topoc_t3t2);

        N_topoc_t3t2 = (-(X_topoc_t3t2 - X0_topoc_t3t2) * math.sin(phi0_topoc_t3t2 * Math.PI / 180) * math.cos(lamda0_topoc_t3t2 * Math.PI / 180)) - ((Y_topoc_t3t2 - Y0_topoc_t3t2) * math.sin(phi0_topoc_t3t2 * Math.PI / 180) * math.sin(lamda0_topoc_t3t2 * Math.PI / 180)) + ((Z_topoc_t3t2 - Z0_topoc_t3t2) * math.cos(phi0_topoc_t3t2 * Math.PI / 180));
        N_topocentric_t3t2.push(N_topoc_t3t2);

        U_topoc_t3t2 = ((X_topoc_t3t2 - X0_topoc_t3t2) * math.cos(phi0_topoc_t3t2 * Math.PI / 180) * math.cos(lamda0_topoc_t3t2 * Math.PI / 180)) + ((Y_topoc_t3t2 - Y0_topoc_t3t2) * math.cos(phi0_topoc_t3t2 * Math.PI / 180) * math.sin(lamda0_topoc_t3t2 * Math.PI / 180)) + ((Z_topoc_t3t2 - Z0_topoc_t3t2) * math.sin(phi0_topoc_t3t2 * Math.PI / 180));
        U_topocentric_t3t2.push(U_topoc_t3t2);
    }

    //Topocentric Koordinatların Matrix Formu
    let matrixKismiDeng_Topocentric_t3t2 = math.zeros(new_point_count_t3t2, 3);
    for (let i = 0; i < new_point_count_t3t2; i++) {
        var E = E_topocentric_t3t2[i];
        var N = N_topocentric_t3t2[i];
        var U = U_topocentric_t3t2[i];

        matrixKismiDeng_Topocentric_t3t2.subset(math.index(i, 0), E);
        matrixKismiDeng_Topocentric_t3t2.subset(math.index(i, 1), N);
        matrixKismiDeng_Topocentric_t3t2.subset(math.index(i, 2), U);
    }

    //Nokta Adı, Sağa-Yukarı Koordinat Farkları (cm cinsinden), h elipsoit farkları ve toposentrik farklar (N,E,U) (cm cinsinden) (Matrix Formu)
    mtrx_NN_EastNorth_h_Topocentric_t3t2 = math.concat(mtrx_NN_EastNorth_h_t3t2, math.multiply(100, matrixKismiDeng_Topocentric_t3t2))
    //



















    // d fark vektörü
    mtrx_d_t3t2_sgnf = math.subtract(mtrx_Deng_t3_t3t2_esles_sgnf, mtrx_Deng_t2_t3t2_sgnf);
    //

    Noktalar_t2_t3t2_sgnf_lowerCase = [];
    Noktalar_t3_t3t2_sgnf_lowerCase = [];
    for (let i = 0; i < Noktalar_t2_t3t2_sgnf.length; i++) {
        Noktalar_t2_t3t2_sgnf_lowerCase.push(Noktalar_t2_t3t2_sgnf[i].toLowerCase());
        Noktalar_t3_t3t2_sgnf_lowerCase.push(Noktalar_t3_t3t2_sgnf[i].toLowerCase());
    }

    //3. Periyottaki kofaktör matrisinin 2. Periyoda göre düzenlenmesi (matrix_Qt3t2_sgnf)
    const rows_Qt3t2_sgnf = new_point_count_t3t2 * 3;
    const columns_Qt3t2_sgnf = new_point_count_t3t2 * 3;
    let matrix_Qt3t2_sgnf = math.zeros(rows_Qt3t2_sgnf, columns_Qt3t2_sgnf);
    for (let i = 0; i < new_point_count_t3t2; i++) {
        let l = Noktalar_t2_t3t2_sgnf_lowerCase.indexOf(Noktalar_t3_t3t2_sgnf_lowerCase[i]);
        for (let m = 0; m < new_point_count_t3t2; m++) {
            //Get the cofactor matrices of unknown in Period 2_sgnf
            var Qt3_11_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index((3 * i), (3 * m)));
            var Qt3_12_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index((3 * i), ((3 * m) + 1)));
            var Qt3_13_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index((3 * i), ((3 * m) + 2)));

            var Qt3_21_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index(((3 * i) + 1), (3 * m)));
            var Qt3_22_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index(((3 * i) + 1), ((3 * m) + 1)));
            var Qt3_23_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index(((3 * i) + 1), ((3 * m) + 2)));

            var Qt3_31_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index(((3 * i) + 2), (3 * m)));
            var Qt3_32_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index(((3 * i) + 2), ((3 * m) + 1)));
            var Qt3_33_t3t2_sgnf = mtrx_QX_t3_t3t2_sgnf.subset(math.index(((3 * i) + 2), ((3 * m) + 2)));

            n = Noktalar_t2_t3t2_sgnf_lowerCase.indexOf(Noktalar_t3_t3t2_sgnf_lowerCase[m]);
            //Replace the matrix_Qt2t1_sgnf with the cofactor matrices of unknown in Period 2_sgnf
            matrix_Qt3t2_sgnf.subset(math.index((3 * l), (3 * n)), Qt3_11_t3t2_sgnf);
            matrix_Qt3t2_sgnf.subset(math.index((3 * l), ((3 * n) + 1)), Qt3_12_t3t2_sgnf);
            matrix_Qt3t2_sgnf.subset(math.index((3 * l), ((3 * n) + 2)), Qt3_13_t3t2_sgnf);

            matrix_Qt3t2_sgnf.subset(math.index(((3 * l) + 1), (3 * n)), Qt3_21_t3t2_sgnf);
            matrix_Qt3t2_sgnf.subset(math.index(((3 * l) + 1), ((3 * n) + 1)), Qt3_22_t3t2_sgnf);
            matrix_Qt3t2_sgnf.subset(math.index(((3 * l) + 1), ((3 * n) + 2)), Qt3_23_t3t2_sgnf);

            matrix_Qt3t2_sgnf.subset(math.index(((3 * l) + 2), (3 * n)), Qt3_31_t3t2_sgnf);
            matrix_Qt3t2_sgnf.subset(math.index(((3 * l) + 2), ((3 * n) + 1)), Qt3_32_t3t2_sgnf);
            matrix_Qt3t2_sgnf.subset(math.index(((3 * l) + 2), ((3 * n) + 2)), Qt3_33_t3t2_sgnf);
        }
    }
    //

    //d nin kofaktör matrisi
    mtrxQdd_t3t2_fark_deneme = math.subtract(matrix_Qt3t2_sgnf, mtrx_QX_t2_t3t2_sgnf);
    mtrx_Qdd_t3t2_Sgnf = math.add(mtrx_QX_t2_t3t2_sgnf, matrix_Qt3t2_sgnf);
    //

    //Bir noktaya ait d vektörü, T test ve F değeri
    d_vector_t3t2_sgnf = [];
    T_test_t3t2_sgnf = [];
    F_t3t2_sgnf = [];
    Test_Sonucu_t3t2 = [];
    for (let k = 0; k < new_point_count_t3t2; k++) {
        //Bir P noktasının d fark vektörü
        matrix_d_t3t2_i = math.zeros(3, 1);
        dx_t3t2 = mtrx_d_t3t2_sgnf.subset(math.index((3 * k), 0));
        dy_t3t2 = mtrx_d_t3t2_sgnf.subset(math.index(((3 * k) + 1), 0));
        dz_t3t2 = mtrx_d_t3t2_sgnf.subset(math.index(((3 * k) + 2), 0));

        matrix_d_t3t2_i.subset(math.index(0, 0), dx_t3t2);
        matrix_d_t3t2_i.subset(math.index(1, 0), dy_t3t2);
        matrix_d_t3t2_i.subset(math.index(2, 0), dz_t3t2);

        //P noktasına ait d fark vektörünün kofaktörü
        matrix_Qdd_t3t2_i = math.zeros(3, 3);
        matrix_Qdd_t3t2_i.subset(math.index(0, 0), mtrx_Qdd_t3t2_Sgnf.subset(math.index((3 * k), (3 * k))));
        matrix_Qdd_t3t2_i.subset(math.index(0, 1), mtrx_Qdd_t3t2_Sgnf.subset(math.index((3 * k), ((3 * k) + 1))));
        matrix_Qdd_t3t2_i.subset(math.index(0, 2), mtrx_Qdd_t3t2_Sgnf.subset(math.index((3 * k), ((3 * k) + 2))));

        matrix_Qdd_t3t2_i.subset(math.index(1, 0), mtrx_Qdd_t3t2_Sgnf.subset(math.index(((3 * k) + 1), (3 * k))));
        matrix_Qdd_t3t2_i.subset(math.index(1, 1), mtrx_Qdd_t3t2_Sgnf.subset(math.index(((3 * k) + 1), ((3 * k) + 1))));
        matrix_Qdd_t3t2_i.subset(math.index(1, 2), mtrx_Qdd_t3t2_Sgnf.subset(math.index(((3 * k) + 1), ((3 * k) + 2))));

        matrix_Qdd_t3t2_i.subset(math.index(2, 0), mtrx_Qdd_t3t2_Sgnf.subset(math.index(((3 * k) + 2), (3 * k))));
        matrix_Qdd_t3t2_i.subset(math.index(2, 1), mtrx_Qdd_t3t2_Sgnf.subset(math.index(((3 * k) + 2), ((3 * k) + 1))));
        matrix_Qdd_t3t2_i.subset(math.index(2, 2), mtrx_Qdd_t3t2_Sgnf.subset(math.index(((3 * k) + 2), ((3 * k) + 2))));

        //P noktasına ait 3B deformasyon vektörünün büyüklüğü
        d_t3t2_Sgnf_mtrx = math.sqrt(math.abs(math.multiply(math.transpose(matrix_d_t3t2_i), matrix_d_t3t2_i)));
        d_t3t2_Sgnf = d_t3t2_Sgnf_mtrx.subset(math.index(0, 0));
        d_vector_t3t2_sgnf.push(d_t3t2_Sgnf);
        //

        //P noktasına ait Test büyüklüğü
        T_Test_t3t2_Sgnf_mtrx = math.divide((math.multiply(math.transpose(matrix_d_t3t2_i), math.inv(matrix_Qdd_t3t2_i), matrix_d_t3t2_i)), math.multiply(3, So2_t3t2_sgnf));
        T_t3t2_Sgnf = T_Test_t3t2_Sgnf_mtrx.subset(math.index(0, 0));
        T_test_t3t2_sgnf.push(T_t3t2_Sgnf);
        //

        // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
        F_Value_t3t2_Sgnf = jStat.centralF.inv(0.95, 3, math.add(f_sgnf_t2_t3t2, f_sgnf_t3_t3t2));
        F_t3t2_sgnf.push(F_Value_t3t2_Sgnf);
        //

        if (T_t3t2_Sgnf < F_Value_t3t2_Sgnf) {
            Test_Sonucu_t3t2.push("Insignificant.");
        } else {
            Test_Sonucu_t3t2.push("Point motion is significant.");
        }
    }

    let matrix_Sgnf_Results_t3t2 = math.zeros(new_point_count_t3t2, 4);
    for (let i = 0; i < new_point_count_t3t2; i++) {
        matrix_Sgnf_Results_t3t2.subset(math.index(i, 0), Noktalar_t2_t3t2_sgnf[i]);
        matrix_Sgnf_Results_t3t2.subset(math.index(i, 1), T_test_t3t2_sgnf[i].toFixed(2));
        matrix_Sgnf_Results_t3t2.subset(math.index(i, 2), F_t3t2_sgnf[i].toFixed(2));
        matrix_Sgnf_Results_t3t2.subset(math.index(i, 3), Test_Sonucu_t3t2[i]);
    };
    //

    $("#ExportSgnfTest").show();

    // Change Sgnf_Analysis Button Text
    document.getElementById("ExportSgnfTest").innerHTML = "<i class='fa fa-file-excel-o'></i> Export Significance Test Results to Excel <sub>(t3-t2)</sub>"
    document.getElementById("sgnf_PN").innerHTML = "Point Name <sub>(t3-t2)</sub>"
    document.getElementById("sgnf_T").innerHTML = "Test Value <sub>(t3-t2)</sub>"
    document.getElementById("sgnf_F").innerHTML = "F Value <sub>(t3-t2)</sub>"

    //Anlamlı nokta hareket sonuçlarına ait tablo
    var mytable_sgnf_t3t2 = document.getElementById('TableSgnf_t2t1')
    var tblBody_sgnf_t3t2 = document.createElement("tbody");

    // creating all cells
    for (let i = 0; i < new_point_count_t3t2; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (let j = 0; j < 4; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matrix_Sgnf_Results_t3t2.subset(math.index(i, j)));
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        // add the row to the end of the table body
        tblBody_sgnf_t3t2.appendChild(row);
    }
    mytable_sgnf_t3t2.appendChild(tblBody_sgnf_t3t2);
    //

    // Enable CoordDifference Button
    document.getElementById("CoordDifference").disabled = false;

    //Sağa-Yukari Değer Fark PopUp
    $("#CoordDifference").click(function () {
        //document.getElementById("VelocityVectors").disabled = false;
        //if (typeof layerGroup_t1 === 'undefined' || layerGroup_t1 === null) {
        //    // variable is undefined or null
        //    console.log('the layerGroup_t1 is not available...'); // print into console
        //} else if (map.hasLayer(layerGroup_t1)) {
        //    map.removeLayer(layerGroup_t1);
        //};
        //if (typeof layerGroup_t2 === 'undefined' || layerGroup_t2 === null) {
        //    // variable is undefined or null
        //    console.log('the layerGroup_t2 is not available...'); // print into console
        //} else if (map.hasLayer(layerGroup_t2)) {
        //    map.removeLayer(layerGroup_t2);
        //};
        //if (typeof layerGroup_t3 === 'undefined' || layerGroup_t3 === null) {
        //    // variable is undefined or null
        //    console.log('the layerGroup_t3 is not available...'); // print into console
        //} else if (map.hasLayer(layerGroup_t3)) {
        //    map.removeLayer(layerGroup_t3);
        //};
        if (typeof layerGroup_fark_t2_t1 === 'undefined' || layerGroup_fark_t2_t1 === null) {
            // variable is undefined or null
            console.log('the layerGroup_fark_t2_t1 is not available...'); // print into console
        } else if (map.hasLayer(layerGroup_fark_t2_t1)) {
            map.removeLayer(layerGroup_fark_t2_t1);
        };
        if (typeof layerGroup_fark_t3_t1 === 'undefined' || layerGroup_fark_t3_t1 === null) {
            // variable is undefined or null
            console.log('the layerGroup_fark_t3_t1 is not available...'); // print into console
        } else if (map.hasLayer(layerGroup_fark_t3_t1)) {
            map.removeLayer(layerGroup_fark_t3_t1);
        };
        layerGroup_fark_t3_t2 = L.layerGroup().addTo(map);

        for (var i = 0; i < new_point_count_t3t2; i++) {
            nokta_adi_t3_t2 = Noktalar_t2_t3t2_sgnf[i];
            SagaDeger_fark_t3t2 = math.multiply(100, mtrx_SagaYukariFark_t3t2_Kismi.subset(math.index(i, 0))).toFixed(2);
            YukariDeger_fark_t3t2 = math.multiply(100, mtrx_SagaYukariFark_t3t2_Kismi.subset(math.index(i, 1))).toFixed(2);
            h_fark_kismi_t3t2 = math.multiply(100, h_elipsoit_fark_kismi_t3t2[i]).toFixed(2);

            var template_fark_t3_t2 =
                "<table id='table_popup_main'>\
                          <caption id='table_caption'>Coordinate Differences Table</caption>\
                          <tr>\
                            <th id='table_th_1'>Point</th>\
                            <th id='table_th_2' colspan='2'>Coordinate Difference (cm)</th> \
                          </tr>\
                          <tr>\
                            <th id='table_th_4' rowspan='4'>" + nokta_adi_t3_t2 + "</th>\
                          </tr>\
                          <tr id='table_popup'>\
                            <td id='table_td_1'>Easting <sub>3-2</sub></td>\
                            <td id='table_td_2'>" + SagaDeger_fark_t3t2 + "</td>\
                          </tr>\
                          <tr id='table_popup'>\
                            <td id='table_td_5'>Northing <sub>3-2</sub></td>\
                            <td id='table_td_6'>" + YukariDeger_fark_t3t2 + "</td>\
                          </tr>\
                          <tr id='table_popup'>\
                            <td id='table_td_9'>h <sub>3-2</sub></td>\
                            <td id='table_td_10'>" + h_fark_kismi_t3t2 + "</td>\
                          </tr>\
                    </table>"
            marker_fark_t3_t2 = new L.marker([listenlem_kısmi_t2_t3t2[i], listboylam_kısmi_t2_t3t2[i]], {
                    icon: beyaz_nirengi
                })
                .bindPopup(template_fark_t3_t2)
            layerGroup_fark_t3_t2.addLayer(marker_fark_t3_t2).addTo(map);
        }
        map.setView(new L.LatLng((math.sum(listenlem_kısmi_t2_t3t2) / listenlem_kısmi_t2_t3t2.length), (math.sum(listboylam_kısmi_t2_t3t2) / listboylam_kısmi_t2_t3t2.length)), 8);



        // Show CoordDifference t3t2
        $("#ExportCoordDifference").hide();
        $("#ExportCoordDifference_t3t1").hide();
        $("#ExportCoordDifference_t3t2").show();



//        // Enable CoordDifference Button
//        document.getElementById("ExportCoordDifference").disabled = false;
//        // Change CoordDifference Button Text
//        document.getElementById("ExportCoordDifference").innerHTML = "<i class='fa fa-file-excel-o'></i> Export Coordinate Differences <sub>(t3-t2)</sub>"
//
//        document.getElementById("farkCapt").innerHTML = "Coordinate Differences Table (t3-t22)"
//        document.getElementById("farkE").innerHTML = "Easting <sub>(t3-t2)</sub> cm"
//        document.getElementById("farkN").innerHTML = "Northing <sub>(t3-t2)</sub> cm"
//        document.getElementById("farkh").innerHTML = "h <sub>(t3-t2)</sub> cm"
//        document.getElementById("farkE").innerHTML = "Easting <sub>(t3-t2)</sub> cm"
//        document.getElementById("farkN").innerHTML = "Northing <sub>(t3-t2)</sub> cm"
//        document.getElementById("farkh").innerHTML = "h <sub>(t3-t22)</sub> cm"





        //---- Statik Noktalara Göre Kısmi-İz Min. Dengelenmiş sonuçlardan oluşan Koordinat Fark Tablosu ----
        var mytable = document.getElementById('TableDiff_t3t2')
        var tblBody = document.createElement("tbody");
        // creating all cells
        for (var i = 0; i < new_point_count_t3t2; i++) {
            // creates a table row
            var row = document.createElement("tr");
            for (var j = 0; j < 7; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                var cellText = document.createTextNode(mtrx_NN_EastNorth_h_Topocentric_t3t2.subset(math.index(i, j)));
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }
        mytable.appendChild(tblBody);
        //----
    });

    //Legend
    legend.addTo(map);
    //

    // Show Velocity_t3t2
    $("#VelocityVectors").hide();
    $("#Velocity_t2t1").hide();
    $("#Velocity_t3t1").hide();
    $("#Velocity_t3t2").show();
});

//--- Velocity Vectors ---
$("#Velocity_t3t2").click(function () {
    //--- Elipsoit Üzerinde 2. Temel Ödev ---
    list_AzimutP2P3 = [];
    for (var i = 0; i < (NoktaSayisi_t3 - static_point_count_t2t3); i++) {
        // elipsoid_2nci_Temel_Odev(P1_Enlem, P1_Boylam, P2_Enlem, P2_Boylam) şeklinde fonksiyon parametreleri yazılır. Azimutu bulmak için "azimut_P1_P2" değişkeni çağrılır.
        elipsoid_2nci_Temel_Odev(listenlem_kısmi_t2_t3t2[i], listboylam_kısmi_t2_t3t2[i], listenlem_kısmi_t3_t3t2[i], listboylam_kısmi_t3_t3t2[i])

        list_AzimutP2P3.push(azimut_P1_P2);
    }
    //---

    //---Hız Vektörleri (Sağa ve Yukarı değerlere göre)
    VectorDist_t3t2 = [];
    VectorDist_Fixed_t3t2 = [];
    for (var i = 0; i < new_point_count_t3t2; i++) {
        var distSaga_t3t2 = Math.pow(mtrx_SagaYukariFark_t3t2_Kismi.subset(math.index(i, 0)), 2); //metre cinsinden;
        var distYukari_t3t2 = Math.pow(mtrx_SagaYukariFark_t3t2_Kismi.subset(math.index(i, 1)), 2); //metre cinsinden

        var VectorDist_t3t2_a = math.sqrt(distSaga_t3t2 + distYukari_t3t2);
        VectorDist_t3t2.push(VectorDist_t3t2_a); //metre cinsinden

        //VectorDist_t3t2.toFixed(2) ;
        VectorDist_Fixed_t3t2.push(VectorDist_t3t2[i].toFixed(2));
    }
    //---





    //--- Düşey Yer Değiştirme Vektörü (Elipsoit Üzerinde 1. Temel Ödev) ---
    list_Vertical_NewPoint_Enlem_t3t2 = [];
    list_Vertical_NewPoint_Boylam_t3t2 = [];
    for (var i = 0; i < new_point_count_t3t2; i++) {
        // elipsoid_1nci_Temel_Odev(P1_Enlem, P1_Boylam, P1P2_Uzunluk, P1P2_Azimut) şeklinde fonksiyon parametreleri yazılır. Yeni noktanın coğrafi koordinatlarını bulmak için EnlemNewPoint ve BoylamNewPoint değişkenleri çağrılır.
        GenisletmeKatsayisi_t3t2 = 450000; // VectorDist_t2t1'in metreye çevrilmesi için 100 ile genişletilerek bulunan değer
        P1PNewPoint_Vertical_t3t2 = (GenisletmeKatsayisi_t3t2 * h_elipsoit_fark_kismi_t3t2[i]) // Birinci periyottaki nokta ile Yeni nokta arasındaki uzunluğa xxxx metre gibi keyfi bir değer girilir.
        list_Vertical_AzimutP1P2_t3t2 = 180
        elipsoid_1nci_Temel_Odev(listenlem_kısmi_t2_t3t2[i], listboylam_kısmi_t2_t3t2[i], P1PNewPoint_Vertical_t3t2, list_Vertical_AzimutP1P2_t3t2)

        list_Vertical_NewPoint_Enlem_t3t2.push(EnlemNewPoint);
        list_Vertical_NewPoint_Boylam_t3t2.push(BoylamNewPoint);
    }
    //---

    //--- Vertical Vectors t3t2 ---
    layerGroup_t3t2 = L.layerGroup().addTo(map);
    for (var i = 0; i < new_point_count_t3t2; i++) {
        var arrow_Vertical_t3t2 = L.polyline([[listenlem_kısmi_t2_t3t2[i], listboylam_kısmi_t2_t3t2[i]], [list_Vertical_NewPoint_Enlem_t3t2[i], list_Vertical_NewPoint_Boylam_t3t2[i]]], {
            color: '#00fff5',
            weight: 2,
            opacity: 1,
            smoothFactor: 1
        }).bindPopup('Route 1');
        var arrowHead_Vertical_t3t2 = L.polylineDecorator(arrow_Vertical_t3t2, {
            patterns: [
                {
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({
                        pixelSize: 5,
                        polygon: false,
                        pathOptions: {
                            fillOpacity: 0.75,
                            color: '#00fff5',
                            weight: 2,
                            stroke: true
                        }
                    })
                    }
                    ]
        });

        arrow_Vertical_t3t2.bindPopup(math.multiply(1000, h_elipsoit_fark_kismi_t3t2[i]).toFixed(2) + ' mm');
        arrow_Vertical_t3t2.on('mouseover', function (e) {
            this.openPopup();
        });
        arrow_Vertical_t3t2.on('mouseout', function (e) {
            this.closePopup();
        });

        layerGroup_t3t2.addLayer(arrow_Vertical_t3t2).addTo(map);
        layerGroup_t3t2.addLayer(arrowHead_Vertical_t3t2).addTo(map);
    }
    //---





    //--- Elipsoit Üzerinde 1. Temel Ödev ---
    list_NewPoint_Enlem_t3t2 = [];
    list_NewPoint_Boylam_t3t2 = [];
    for (var i = 0; i < new_point_count_t3t2; i++) {
        // elipsoid_1nci_Temel_Odev(P1_Enlem, P1_Boylam, P1P2_Uzunluk, P1P2_Azimut) şeklinde fonksiyon parametreleri yazılır. Yeni noktanın coğrafi koordinatlarını bulmak için EnlemNewPoint ve BoylamNewPoint değişkenleri çağrılır.
        GenisletmeKatsayisi_t3t2 = 450000; // VectorDist_t3t2'in metreye çevrilmesi için 100 ile genişletilerek bulunan değer
        P1PNewPoint_t3t2 = (GenisletmeKatsayisi_t3t2 * VectorDist_t3t2[i]) // Birinci periyottaki nokta ile Yeni nokta arasındaki uzunluğa xxxx metre gibi keyfi bir değer girilir.
        elipsoid_1nci_Temel_Odev(listenlem_kısmi_t2_t3t2[i], listboylam_kısmi_t2_t3t2[i], P1PNewPoint_t3t2, list_AzimutP2P3[i])

        list_NewPoint_Enlem_t3t2.push(EnlemNewPoint);
        list_NewPoint_Boylam_t3t2.push(BoylamNewPoint);
    }
    //---

    //--- Velocity Vectors t3t2 ---
    layerGroup_t3t2 = L.layerGroup().addTo(map);
    for (var i = 0; i < (new_point_count_t3t2); i++) {
        var arrow_t3t2 = L.polyline([[listenlem_kısmi_t2_t3t2[i], listboylam_kısmi_t2_t3t2[i]], [list_NewPoint_Enlem_t3t2[i], list_NewPoint_Boylam_t3t2[i]]], {
            color: '#00fff5',
            weight: 2,
            opacity: 1,
            smoothFactor: 1
        }).bindPopup('Route 1');
        var arrow_t3t2_Head = L.polylineDecorator(arrow_t3t2, {
            patterns: [
                {
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({
                        pixelSize: 5,
                        polygon: false,
                        pathOptions: {
                            fillOpacity: 0.75,
                            color: '#00fff5',
                            weight: 2,
                            stroke: true
                        }
                    })
                    }
                    ]
        });

        arrow_t3t2.bindPopup(math.multiply(1000, VectorDist_t3t2[i]).toFixed(2) + ' mm');
        arrow_t3t2.on('mouseover', function (e) {
            this.openPopup();
        });
        arrow_t3t2.on('mouseout', function (e) {
            this.closePopup();
        });

        layerGroup_t3t2.addLayer(arrow_t3t2).addTo(map);
        layerGroup_t3t2.addLayer(arrow_t3t2_Head).addTo(map);
    }
    //---

    // Show Remove Velocity Vektor Label
    $("#velocity_vectors_t3t2").show();

    //--- Hata Elipsleri ---
    for (i = 0; i < (NoktaSayisi_t2 - static_point_count_t2t3); i++) {
        var ro = (200 / Math.PI) // Gon cinsinden

        var QXX = parseFloat(mtrx_Qdd_t3t2_Sgnf.subset(math.index((3 * i), (3 * i)))); //mtrx_Qdd_t3t2_Sgnf ---------- mtrx1tum_QX_t2
        var QXY = parseFloat(mtrx_Qdd_t3t2_Sgnf.subset(math.index((3 * i), ((3 * i) + 1))));
        var QYY = parseFloat(mtrx_Qdd_t3t2_Sgnf.subset(math.index(((3 * i) + 1), ((3 * i) + 1))));

        var pay_teta = (2 * QXY);
        var payda_teta = (QXX - QYY);
        var teta_Elips_t3t2_Ham = (1 / 2) * Math.atan(pay_teta / payda_teta) * ro; // Dönüklük Açısı
        if (pay_teta > 0 && payda_teta > 0) {
            // 1. Bölge
            teta_Elips_t3t2 = teta_Elips_t3t2_Ham + 0;
        } else if (pay_teta > 0 && payda_teta < 0) {
            // 2. Bölge
            teta_Elips_t3t2 = teta_Elips_t3t2_Ham + 200;
        } else if (pay_teta < 0 && payda_teta < 0) {
            // 3. Bölge
            teta_Elips_t3t2 = teta_Elips_t3t2_Ham + 200;
        } else if (pay_teta < 0 && payda_teta > 0) {
            // 4. Bölge
            teta_Elips_t3t2 = teta_Elips_t3t2_Ham + 400;
        }

        var W = math.sqrt(Math.pow((QXX - QYY), 2) + (4 * Math.pow(QXY, 2)));

        var lamda1 = ((QXX + QYY + W) / 2);
        var lamda2 = ((QXX + QYY - W) / 2);

        var A_Elps_t3t2 = tumSo_t2 * math.sqrt(lamda1);
        var B_Elps_t3t2 = tumSo_t2 * math.sqrt(lamda2);

        var Elips_YarıEksen_Carpani = GenisletmeKatsayisi_t3t2; // A ve B yarı eksen uzunlukları P1PNewPoint_t3t2 değeri ile genişletilir.

        A_Elips_t3t2 = A_Elps_t3t2 * Elips_YarıEksen_Carpani;
        B_Elips_t3t2 = B_Elps_t3t2 * Elips_YarıEksen_Carpani;
        A_Elps_t3t2_mm = A_Elps_t3t2 * 1000;
        B_Elps_t3t2_mm = B_Elps_t3t2 * 1000;

        tilt_t3t2 = ((0.9 * teta_Elips_t3t2) + 90);

        var ellipse = L.ellipse([list_NewPoint_Enlem_t3t2[i], list_NewPoint_Boylam_t3t2[i]], [A_Elips_t3t2, B_Elips_t3t2], tilt_t3t2, {
                color: '#80ff00',
                fillColor: '#80ff00',
                weight: 2,
                fillOpacity: 0.1
            })
            .bindPopup('a: ' + A_Elps_t3t2_mm.toFixed(2) + ' mm' + '<br>' + 'b: ' + B_Elps_t3t2_mm.toFixed(2) + ' mm' + '<br>' + 'θ: ' + teta_Elips_t3t2_Ham.toFixed(2));
        /*
            L.ellipse( <LatLng> latlng, <Radii> radii, <Number> tilt, <Path options> options? )
            
            latlng - The position of the center of the ellipse.
            radii - The semi-major and semi-minor axis in meters
            tilt - The rotation of the ellipse in degrees from west
            options - Options dictionary to pass to L.Path
        */

        layerGroup_t3t2.addLayer(ellipse).addTo(map);
    }
    //---

    scale.addTo(map)

    //--- Show/Hide Velocity Vector and Ellips ---
    $('input:checkbox[name=velocity_vectors_t3t2]').click(function () {
        if (map.hasLayer(layerGroup_t3t2)) {
            map.removeLayer(layerGroup_t3t2);
        } else {
            map.addLayer(layerGroup_t3t2);
        };
    });
    //---
});
//---
