//if (document.getElementById('DatumNokta_t2t1').clicked == true) {
$("#DeformationTest_t2t1").click(function () {
    // Static Noktalar Çıktıktan Sonra Kalan Nokta Adları
    Noktalar_t1_sgnf = Noktalar_t1;
    for (let i = 0; i < static_point_count_t1t2; i++) {
        for (let j = 0; j < NoktaSayisi_t1; j++) {
            if (Noktalar_t1_sgnf[j] === static_points_name_t1t2[i]) {
                Noktalar_t1_sgnf.splice(j, 1); //Static nokta harici T1 Nokta adları
            }
        }
    }

    Noktalar_t2_sgnf = Noktalar_t2;
    for (let i = 0; i < static_point_count_t1t2; i++) {
        for (let j = 0; j < NoktaSayisi_t2; j++) {
            if (Noktalar_t2_sgnf[j] === static_points_name_t1t2[i]) {
                Noktalar_t2_sgnf.splice(j, 1); //Static nokta harici T2 Nokta adları
            }
        }
    }
    //

    // Tüm-iz Deng. ile bulunmuş noktaların koordinalarını static noktaları çıkartarak alma
    matrix1tumCoor_t1_sgnf = math.zeros((NoktaSayisi_t1 - static_point_count_t1t2) * 3, 1) //Static nokta harici T1 Tüm-iz Ham Koordinatlar
    for (let i = 0; i < (NoktaSayisi_t2 - static_point_count_t1t2); i++) {
        var xt1_sgnf = matrix1tumCoor_t1.subset(math.index(3 * (bazNNunique_t1.indexOf(Noktalar_t1_sgnf[i])), 0));
        var yt1_sgnf = matrix1tumCoor_t1.subset(math.index(3 * (bazNNunique_t1.indexOf(Noktalar_t1_sgnf[i])) + 1, 0));
        var zt1_sgnf = matrix1tumCoor_t1.subset(math.index(3 * (bazNNunique_t1.indexOf(Noktalar_t1_sgnf[i])) + 2, 0));

        matrix1tumCoor_t1_sgnf.subset(math.index((3 * i), 0), xt1_sgnf);
        matrix1tumCoor_t1_sgnf.subset(math.index(((3 * i) + 1), 0), yt1_sgnf);
        matrix1tumCoor_t1_sgnf.subset(math.index(((3 * i) + 2), 0), zt1_sgnf);
    }

    matrix1tumCoor_t2_sgnf = math.zeros((NoktaSayisi_t2 - static_point_count_t1t2) * 3, 1) //Static nokta harici T2 Tüm-iz Ham Koordinatlar
    for (let i = 0; i < (NoktaSayisi_t2 - static_point_count_t1t2); i++) {
        var xt2_sgnf = matrix1tumCoor_t2.subset(math.index(3 * (bazNNunique_t2.indexOf(Noktalar_t2_sgnf[i])), 0));
        var yt2_sgnf = matrix1tumCoor_t2.subset(math.index(3 * (bazNNunique_t2.indexOf(Noktalar_t2_sgnf[i])) + 1, 0));
        var zt2_sgnf = matrix1tumCoor_t2.subset(math.index(3 * (bazNNunique_t2.indexOf(Noktalar_t2_sgnf[i])) + 2, 0));

        matrix1tumCoor_t2_sgnf.subset(math.index((3 * i), 0), xt2_sgnf);
        matrix1tumCoor_t2_sgnf.subset(math.index(((3 * i) + 1), 0), yt2_sgnf);
        matrix1tumCoor_t2_sgnf.subset(math.index(((3 * i) + 2), 0), zt2_sgnf);
    }
    //

    // Tüm-iz Deng. ile bulunmuş A matrisinden static noktaların bulunduğu sütunları çıkartarak yeni A matrisi elde etme
    new_point_count_t2t1 = (NoktaSayisi_t2 - static_point_count_t1t2); //Static nokta harici nokta sayısı

    TumIzMtrx1A_t1_sgnf = math.zeros(BazSayisi_t1 * 3, new_point_count_t2t1 * 3) //Static nokta harici T1 A matrisi
    for (let i = 0; i < new_point_count_t2t1; i++) {
        for (let j = 0; j < BazSayisi_t1 * 3; j++) {
            var xt1_A_sgnf = TumIzMtrx1A_t1.subset(math.index(j, (3 * (bazNNunique_t1.indexOf(Noktalar_t1_sgnf[i])))));
            var yt1_A_sgnf = TumIzMtrx1A_t1.subset(math.index(j, (3 * (bazNNunique_t1.indexOf(Noktalar_t1_sgnf[i])) + 1)));
            var zt1_A_sgnf = TumIzMtrx1A_t1.subset(math.index(j, (3 * (bazNNunique_t1.indexOf(Noktalar_t1_sgnf[i])) + 2)));

            TumIzMtrx1A_t1_sgnf.subset(math.index(j, (3 * i)), xt1_A_sgnf);
            TumIzMtrx1A_t1_sgnf.subset(math.index(j, (3 * i) + 1), yt1_A_sgnf);
            TumIzMtrx1A_t1_sgnf.subset(math.index(j, (3 * i) + 2), zt1_A_sgnf);
        }
    }

    TumIzMtrx1A_t2_sgnf = math.zeros(BazSayisi_t2 * 3, new_point_count_t2t1 * 3) //Static nokta harici T2 A matrisi
    for (let i = 0; i < new_point_count_t2t1; i++) {
        for (let j = 0; j < BazSayisi_t2 * 3; j++) {
            var xt2_A_sgnf = TumIzMtrx1A_t2.subset(math.index(j, (3 * (bazNNunique_t2.indexOf(Noktalar_t2_sgnf[i])))));
            var yt2_A_sgnf = TumIzMtrx1A_t2.subset(math.index(j, (3 * (bazNNunique_t2.indexOf(Noktalar_t2_sgnf[i])) + 1)));
            var zt2_A_sgnf = TumIzMtrx1A_t2.subset(math.index(j, (3 * (bazNNunique_t2.indexOf(Noktalar_t2_sgnf[i])) + 2)));

            TumIzMtrx1A_t2_sgnf.subset(math.index(j, (3 * i)), xt2_A_sgnf);
            TumIzMtrx1A_t2_sgnf.subset(math.index(j, (3 * i) + 1), yt2_A_sgnf);
            TumIzMtrx1A_t2_sgnf.subset(math.index(j, (3 * i) + 2), zt2_A_sgnf);
        }
    }
    //

    //Fonksiyonel Model
    mtrx_N_t1_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t1_sgnf), mtrx1P_t1, TumIzMtrx1A_t1_sgnf);
    mtrx_n_t1_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t1_sgnf), mtrx1P_t1, matrix1l_t1);

    mtrx_N_t2_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t2_sgnf), mtrx1P_t2, TumIzMtrx1A_t2_sgnf);
    mtrx_n_t2_sgnf = math.multiply(math.transpose(TumIzMtrx1A_t2_sgnf), mtrx1P_t2, matrix1l_t2);

    mtrx_QX_t1_sgnf = math.inv(mtrx_N_t1_sgnf);
    mtrx_QX_t2_sgnf = math.inv(mtrx_N_t2_sgnf);

    mtrx_x_t1_sgnf = math.multiply(mtrx_QX_t1_sgnf, mtrx_n_t1_sgnf);
    mtrx_x_t2_sgnf = math.multiply(mtrx_QX_t2_sgnf, mtrx_n_t2_sgnf);
    //

    //Dengeli Koordinatlar
    mtrx_Deng_t1_sgnf = math.add(matrix1tumCoor_t1_sgnf, mtrx_x_t1_sgnf);
    mtrx_Deng_t2_sgnf = math.add(matrix1tumCoor_t2_sgnf, mtrx_x_t2_sgnf);
    //

    //V - S02_t Matrisleri
    mtrx_V_t1_sgnf = math.subtract(math.multiply(TumIzMtrx1A_t1_sgnf, mtrx_x_t1_sgnf), matrix1l_t1);
    mtrx_V_t2_sgnf = math.subtract(math.multiply(TumIzMtrx1A_t2_sgnf, mtrx_x_t2_sgnf), matrix1l_t2);

    n_sgnf_t1 = BazSayisi_t1 * 3; // Ölçülen baz sayıları.
    u_sgnf_t1 = (NoktaSayisi_t1 - static_point_count_t1t2) * 3; // Static noktalar çıktıktan sonra bilinmeyen noktaların sayısı.
    f_sgnf_t1 = n_sgnf_t1 - u_sgnf_t1; // Serbestlik derecesi. Eğer f>0 ise dengeleme vardır.

    n_sgnf_t2 = BazSayisi_t2 * 3; // Ölçülen baz sayıları.
    u_sgnf_t2 = (NoktaSayisi_t2 - static_point_count_t1t2) * 3; // Static noktalar çıktıktan sonra bilinmeyen noktaların sayısı.
    f_sgnf_t2 = n_sgnf_t2 - u_sgnf_t2; // Serbestlik derecesi. Eğer f>0 ise dengeleme vardır.

    mtrx_S0_t1 = math.sqrt(math.divide((math.multiply(math.transpose(mtrx_V_t1_sgnf), mtrx1P_t1, mtrx_V_t1_sgnf)), f_sgnf_t1))
    mtrx_S0_t1_sgnf = mtrx_S0_t1.get([0, 0]);
    mtrx_S0_t2 = math.sqrt(math.divide((math.multiply(math.transpose(mtrx_V_t2_sgnf), mtrx1P_t2, mtrx_V_t2_sgnf)), f_sgnf_t2))
    mtrx_S0_t2_sgnf = mtrx_S0_t2.get([0, 0]);
    //Birleşik varyans değeri
    So2_t2t1_sgnf = math.divide(math.add(math.multiply(Math.pow(mtrx_S0_t1_sgnf, 2), f_sgnf_t1), math.multiply(Math.pow(mtrx_S0_t2_sgnf, 2), f_sgnf_t2)), math.add(f_sgnf_t1, f_sgnf_t2));
    //

    //--- 2. Periyottaki Nokta Adlarını 1. Periyoda Göre Eşleştir ve Eşleşen Noktaların Koordinatlarını Al
    let eslesmis_t2t1_DengCoord = [];
    for (let i = 0; i < new_point_count_t2t1; i++) {
        for (let j = 0; j < new_point_count_t2t1; j++) {
            NNt1 = (Noktalar_t1_sgnf[i]).toLowerCase()
            NNt2 = (Noktalar_t2_sgnf[j]).toLowerCase()
            if (NNt2.includes(NNt1)) {
                eslesmis_t2t1_DengCoord.push(mtrx_Deng_t2_sgnf.subset(math.index((3 * j), 0)));
                eslesmis_t2t1_DengCoord.push(mtrx_Deng_t2_sgnf.subset(math.index((3 * j) + 1, 0)));
                eslesmis_t2t1_DengCoord.push(mtrx_Deng_t2_sgnf.subset(math.index((3 * j) + 2, 0)));
            }
        }
    }

    //Matris formatı
    let eslesmis_t2t1_DengCoord_mtrx = math.zeros(new_point_count_t2t1 * 3, 1);
    for (let i = 0; i < new_point_count_t2t1 * 3; i += 3) {
        eslesmis_t2t1_DengCoord_mtrx.subset(math.index(i, 0), eslesmis_t2t1_DengCoord[i]);
        eslesmis_t2t1_DengCoord_mtrx.subset(math.index(i + 1, 0), eslesmis_t2t1_DengCoord[i + 1]);
        eslesmis_t2t1_DengCoord_mtrx.subset(math.index(i + 2, 0), eslesmis_t2t1_DengCoord[i + 2]);
    }
    mtrx_Deng_t2_esles_sgnf = eslesmis_t2t1_DengCoord_mtrx;
    //

    // d fark vektörü
    mtrx_d_t2t1_sgnf = math.subtract(mtrx_Deng_t2_esles_sgnf, mtrx_Deng_t1_sgnf);
    //




    Noktalar_t1_sgnf_lowerCase = [];
    Noktalar_t2_sgnf_lowerCase = [];
    for (let i = 0; i < Noktalar_t1_sgnf.length; i++) {
        Noktalar_t1_sgnf_lowerCase.push(Noktalar_t1_sgnf[i].toLowerCase());
        Noktalar_t2_sgnf_lowerCase.push(Noktalar_t2_sgnf[i].toLowerCase());
    }

    //2. Periyottaki kofaktör matrisinin 1. Periyoda göre düzenlenmesi (matrix_Qt2t1_sgnf)
    const rows_Qt2t1_sgnf = new_point_count_t2t1 * 3;
    const columns_Qt2t1_sgnf = new_point_count_t2t1 * 3;
    let matrix_Qt2t1_sgnf = math.zeros(rows_Qt2t1_sgnf, columns_Qt2t1_sgnf);
    for (let i = 0; i < new_point_count_t2t1; i++) {
        let l = Noktalar_t1_sgnf_lowerCase.indexOf(Noktalar_t2_sgnf_lowerCase[i]);
        for (let m = 0; m < new_point_count_t2t1; m++) {
            //Get the cofactor matrices of unknown in Period 2_sgnf
            var Qt2_11_sgnf = mtrx_QX_t2_sgnf.subset(math.index((3 * i), (3 * m)));
            var Qt2_12_sgnf = mtrx_QX_t2_sgnf.subset(math.index((3 * i), ((3 * m) + 1)));
            var Qt2_13_sgnf = mtrx_QX_t2_sgnf.subset(math.index((3 * i), ((3 * m) + 2)));

            var Qt2_21_sgnf = mtrx_QX_t2_sgnf.subset(math.index(((3 * i) + 1), (3 * m)));
            var Qt2_22_sgnf = mtrx_QX_t2_sgnf.subset(math.index(((3 * i) + 1), ((3 * m) + 1)));
            var Qt2_23_sgnf = mtrx_QX_t2_sgnf.subset(math.index(((3 * i) + 1), ((3 * m) + 2)));

            var Qt2_31_sgnf = mtrx_QX_t2_sgnf.subset(math.index(((3 * i) + 2), (3 * m)));
            var Qt2_32_sgnf = mtrx_QX_t2_sgnf.subset(math.index(((3 * i) + 2), ((3 * m) + 1)));
            var Qt2_33_sgnf = mtrx_QX_t2_sgnf.subset(math.index(((3 * i) + 2), ((3 * m) + 2)));

            n = Noktalar_t1_sgnf_lowerCase.indexOf(Noktalar_t2_sgnf_lowerCase[m]);
            //Replace the matrix_Qt2t1_sgnf with the cofactor matrices of unknown in Period 2_sgnf
            matrix_Qt2t1_sgnf.subset(math.index((3 * l), (3 * n)), Qt2_11_sgnf);
            matrix_Qt2t1_sgnf.subset(math.index((3 * l), ((3 * n) + 1)), Qt2_12_sgnf);
            matrix_Qt2t1_sgnf.subset(math.index((3 * l), ((3 * n) + 2)), Qt2_13_sgnf);

            matrix_Qt2t1_sgnf.subset(math.index(((3 * l) + 1), (3 * n)), Qt2_21_sgnf);
            matrix_Qt2t1_sgnf.subset(math.index(((3 * l) + 1), ((3 * n) + 1)), Qt2_22_sgnf);
            matrix_Qt2t1_sgnf.subset(math.index(((3 * l) + 1), ((3 * n) + 2)), Qt2_23_sgnf);

            matrix_Qt2t1_sgnf.subset(math.index(((3 * l) + 2), (3 * n)), Qt2_31_sgnf);
            matrix_Qt2t1_sgnf.subset(math.index(((3 * l) + 2), ((3 * n) + 1)), Qt2_32_sgnf);
            matrix_Qt2t1_sgnf.subset(math.index(((3 * l) + 2), ((3 * n) + 2)), Qt2_33_sgnf);
        }
    }
    //

    //d nin kofaktör matrisi
    mtrxQdd_t2t1_fark_deneme = math.subtract(matrix_Qt2t1_sgnf, mtrx_QX_t1_sgnf);
    mtrx_Qdd_t2t1_Sgnf = math.add(mtrx_QX_t1_sgnf, matrix_Qt2t1_sgnf);
    //

    //Bir noktaya ait d vektörü, T test ve F değeri
    d_vector_t2t1_sgnf = [];
    T_test_t2t1_sgnf = [];
    F_t2t1_sgnf = [];
    for (let k = 0; k < new_point_count_t2t1; k++) {
        //Bir P noktasının d fark vektörü
        matrix_d_t2t1_i = math.zeros(3, 1);
        dx_t2t1 = mtrx_d_t2t1_sgnf.subset(math.index((3 * k), 0));
        dy_t2t1 = mtrx_d_t2t1_sgnf.subset(math.index(((3 * k) + 1), 0));
        dz_t2t1 = mtrx_d_t2t1_sgnf.subset(math.index(((3 * k) + 2), 0));

        matrix_d_t2t1_i.subset(math.index(0, 0), dx_t2t1);
        matrix_d_t2t1_i.subset(math.index(1, 0), dy_t2t1);
        matrix_d_t2t1_i.subset(math.index(2, 0), dz_t2t1);

        //P noktasına ait d fark vektörünün kofaktörü
        matrix_Qdd_t2t1_i = math.zeros(3, 3);
        matrix_Qdd_t2t1_i.subset(math.index(0, 0), mtrx_Qdd_t2t1_Sgnf.subset(math.index((3 * k), (3 * k))));
        matrix_Qdd_t2t1_i.subset(math.index(0, 1), mtrx_Qdd_t2t1_Sgnf.subset(math.index((3 * k), ((3 * k) + 1))));
        matrix_Qdd_t2t1_i.subset(math.index(0, 2), mtrx_Qdd_t2t1_Sgnf.subset(math.index((3 * k), ((3 * k) + 2))));

        matrix_Qdd_t2t1_i.subset(math.index(1, 0), mtrx_Qdd_t2t1_Sgnf.subset(math.index(((3 * k) + 1), (3 * k))));
        matrix_Qdd_t2t1_i.subset(math.index(1, 1), mtrx_Qdd_t2t1_Sgnf.subset(math.index(((3 * k) + 1), ((3 * k) + 1))));
        matrix_Qdd_t2t1_i.subset(math.index(1, 2), mtrx_Qdd_t2t1_Sgnf.subset(math.index(((3 * k) + 1), ((3 * k) + 2))));

        matrix_Qdd_t2t1_i.subset(math.index(2, 0), mtrx_Qdd_t2t1_Sgnf.subset(math.index(((3 * k) + 2), (3 * k))));
        matrix_Qdd_t2t1_i.subset(math.index(2, 1), mtrx_Qdd_t2t1_Sgnf.subset(math.index(((3 * k) + 2), ((3 * k) + 1))));
        matrix_Qdd_t2t1_i.subset(math.index(2, 2), mtrx_Qdd_t2t1_Sgnf.subset(math.index(((3 * k) + 2), ((3 * k) + 2))));

        //P noktasına ait 3B deformasyon vektörünün büyüklüğü
        d_t2t1_Sgnf_mtrx = math.sqrt(math.abs(math.multiply(math.transpose(matrix_d_t2t1_i), matrix_d_t2t1_i)));
        d_t2t1_Sgnf = d_t2t1_Sgnf_mtrx.subset(math.index(0, 0));
        d_vector_t2t1_sgnf.push(d_t2t1_Sgnf);
        //

        //P noktasına ait Test büyüklüğü
        T_Test_t2t1_Sgnf_mtrx = math.divide((math.multiply(math.transpose(matrix_d_t2t1_i), math.inv(matrix_Qdd_t2t1_i), matrix_d_t2t1_i)), math.multiply(3, So2_t2t1_sgnf));
        T_Test_t2t1_Sgnf = T_Test_t2t1_Sgnf_mtrx.subset(math.index(0, 0));
        T_test_t2t1_sgnf.push(T_Test_t2t1_Sgnf);
        //

        // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
        F_Value_t2t1_Sgnf = jStat.centralF.inv(0.95, 3, math.add(f_sgnf_t1, f_sgnf_t2));
        F_t2t1_sgnf.push(F_Value_t2t1_Sgnf);
        //
    }









})
