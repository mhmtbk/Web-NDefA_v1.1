$('#periods').change(function () {
    if ($('#periods').val() == '1') {
        map.removeControl(legend);
        //--- 2. Periyottaki Nokta Adlarını 1. Periyoda Göre Eşleştir ve Eşleşen Noktaların Koordinatlarını Al ---
        var esles2_1_a = [];
        var eslesx2_1_a = [];
        var eslesCoor2_1_a = [];
        for (let i = 0; i < NoktaSayisi_t2; i++) {
            for (j = 0, k = 0; j < NoktaSayisi_t2, k < NoktaSayisi_t2 * 3; j++, k += 3) {
                NNt2 = (mtrx1t2tumDeng_KOH.subset(math.index(j, 0))).toLowerCase()
                NNt1 = (mtrx1t1tumDeng_KOH.subset(math.index(i, 0))).toLowerCase()
                if (NNt2.includes(NNt1)) {
                    esles2_1_a.push(mtrx1t2tumDeng_KOH.subset(math.index(j, 1)));
                    esles2_1_a.push(mtrx1t2tumDeng_KOH.subset(math.index(j, 2)));
                    esles2_1_a.push(mtrx1t2tumDeng_KOH.subset(math.index(j, 3)));

                    eslesCoor2_1_a.push(parseFloat(matrix1tumCoor_t2.subset(math.index(k, 0))));
                    eslesCoor2_1_a.push(parseFloat(matrix1tumCoor_t2.subset(math.index(k + 1, 0))));
                    eslesCoor2_1_a.push(parseFloat(matrix1tumCoor_t2.subset(math.index(k + 2, 0))));

                    eslesx2_1_a.push(mtrxDengtum1_1_t2x.subset(math.index(k, 2)));
                    eslesx2_1_a.push(mtrxDengtum1_1_t2x.subset(math.index(k + 1, 2)));
                    eslesx2_1_a.push(mtrxDengtum1_1_t2x.subset(math.index(k + 2, 2)));
                }
            }
        }
        listDengCoor_t2_t1 = esles2_1_a;
        fark_t2_t1 = math.multiply(100, math.subtract(listDengCoor_t2_t1, listDengCoor_t1)); //cm'ye çevirme.
        mtrxd_fark_t2_t1 = math.subtract(listDengCoor_t2_t1, listDengCoor_t1);

        list_xBil_t2_t1 = eslesx2_1_a;
        list_Coor_t2_t1 = eslesCoor2_1_a;

        const rows_list_xBil_t2 = NoktaSayisi_t1;
        const columns_list_xBil_t2 = 1;
        let matrixZeros_list_xBil_t2 = math.zeros(rows_list_xBil_t2, columns_list_xBil_t2);
        for (i = 0; i < NoktaSayisi_t1 * 3; i += 3) {
            matrixZeros_list_xBil_t2.subset(math.index(i, 0), list_xBil_t2_t1[i]);
            matrixZeros_list_xBil_t2.subset(math.index(i + 1, 0), list_xBil_t2_t1[i + 1]);
            matrixZeros_list_xBil_t2.subset(math.index(i + 2, 0), list_xBil_t2_t1[i + 2]);
        }
        mtrx_xBil_t2_t1 = matrixZeros_list_xBil_t2; //Matris formatında.

        var fark_t2_t1_X_a = [];
        var fark_t2_t1_Y_a = [];
        var fark_t2_t1_Z_a = [];
        for (var i = 0; i < NoktaSayisi_t2 * 3; i += 3) {
            fark_t2_t1_X_a.push(fark_t2_t1[i]);
            fark_t2_t1_Y_a.push(fark_t2_t1[i + 1]);
            fark_t2_t1_Z_a.push(fark_t2_t1[i + 2]);
        }
        farkX_t2_t1 = fark_t2_t1_X_a;
        farkY_t2_t1 = fark_t2_t1_Y_a;
        farkZ_t2_t1 = fark_t2_t1_Z_a;

        let matrixZeros_fark_t2_t1 = math.zeros(NoktaSayisi_t1, 4);
        for (i = 0; i < NoktaSayisi_t1; i++) {
            matrixZeros_fark_t2_t1.subset(math.index(i, 0), mtrx1t1tumDeng_KOH.subset(math.index(i, 0)));
            matrixZeros_fark_t2_t1.subset(math.index(i, 1), farkX_t2_t1[i].toFixed(2));
            matrixZeros_fark_t2_t1.subset(math.index(i, 2), farkY_t2_t1[i].toFixed(2));
            matrixZeros_fark_t2_t1.subset(math.index(i, 3), farkZ_t2_t1[i].toFixed(2));
        };
        const matrix_fark_t2_t1 = matrixZeros_fark_t2_t1;
        //---

        /*        $("#CoordDifference").click(function () {
                    //document.getElementById("VelocityVectors").disabled = false;
                    if (typeof layerGroup_t1 === 'undefined' || layerGroup_t1 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t1 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t1)) {
                        map.removeLayer(layerGroup_t1);
                    };
                    if (typeof layerGroup_t2 === 'undefined' || layerGroup_t2 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t2 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t2)) {
                        map.removeLayer(layerGroup_t2);
                    };
                    if (typeof layerGroup_t3 === 'undefined' || layerGroup_t3 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t3 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t3)) {
                        map.removeLayer(layerGroup_t3);
                    };
                    if (typeof layerGroup_fark_t3_t1 === 'undefined' || layerGroup_fark_t3_t1 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_fark_t3_t1 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_fark_t3_t1)) {
                        map.removeLayer(layerGroup_fark_t3_t1);
                    };
                    if (typeof layerGroup_fark_t3_t2 === 'undefined' || layerGroup_fark_t3_t2 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_fark_t3_t1 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_fark_t3_t2)) {
                        map.removeLayer(layerGroup_fark_t3_t2);
                    };
                    layerGroup_fark_t2_t1 = L.layerGroup().addTo(map);

                    for (var i = 0; i < NoktaSayisi_t1; i++) {
                        nokta_adi_t2_t1 = mtrx1t1tumDeng_KOH.subset(math.index(i, 0));
                        x_fark_t2_t1 = farkX_t2_t1[i].toFixed(2);
                        y_fark_t2_t1 = farkY_t2_t1[i].toFixed(2);
                        z_fark_t2_t1 = farkZ_t2_t1[i].toFixed(2);
                        var template_fark_t2_t1 =
                            "<table id='table_popup_main'>\
                                  <caption id='table_caption'>Koordinat Fark Tablosu</caption>\
                                  <tr>\
                                    <th id='table_th_1'>Nokta</th>\
                                    <th id='table_th_2' colspan='2'>Koordinat Farkı (cm)</th> \
                                  </tr>\
                                  <tr>\
                                    <th id='table_th_4' rowspan='4'>" + nokta_adi_t2_t1 + "</th>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_1'>X<sub>2-1</sub></td>\
                                    <td id='table_td_2'>" + x_fark_t2_t1 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_5'>Y<sub>2-1</sub></td>\
                                    <td id='table_td_6'>" + y_fark_t2_t1 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_9'>Z<sub>2-1</sub></td>\
                                    <td id='table_td_10'>" + z_fark_t2_t1 + "</td>\
                                  </tr>\
                            </table>"
                        marker_fark_t2_t1 = new L.marker([listenlem_tumiz_t1[i], listboylam_tumiz_t1[i]], {
                                icon: beyaz_nirengi
                            })
                            .bindPopup(template_fark_t2_t1)
                        layerGroup_fark_t2_t1.addLayer(marker_fark_t2_t1).addTo(map);
                    }
                    map.setView(new L.LatLng((math.sum(listenlem_tumiz_t1) / listenlem_tumiz_t1.length), (math.sum(listboylam_tumiz_t1) / listboylam_tumiz_t1.length)), 8);

                    // Enable CoordDifference Button
                    document.getElementById("ExportCoordDifference").disabled = false;
                    // Change CoordDifference Button Text
                    document.getElementById("ExportCoordDifference").innerHTML = "<i class='fa fa-file-excel-o'></i> Koordinat Farklarını Exel'e Aktar <sub>(t2-t1)</sub>"

                    document.getElementById("farkCapt").innerHTML = "Koordinat Fark Tablosu (t2-t1)"
                    document.getElementById("farkX").innerHTML = "X <sub>(t2-t1)</sub> cm"
                    document.getElementById("farkY").innerHTML = "Y <sub>(t2-t1)</sub> cm"
                    document.getElementById("farkZ").innerHTML = "Z <sub>(t2-t1)</sub> cm"

                    //---- Tüm-İz Min. dengeleme sonuçlarından oluşan Koordinat Fark Tablosu ----
                    var mytable = document.getElementById('TableDiff')
                    var tblBody = document.createElement("tbody");

                    // creating all cells
                    for (var i = 0; i < NoktaSayisi_t1; i++) {
                        // creates a table row
                        var row = document.createElement("tr");

                        for (var j = 0; j < 4; j++) {
                            // Create a <td> element and a text node, make the text
                            // node the contents of the <td>, and put the <td> at
                            // the end of the table row
                            var cell = document.createElement("td");
                            var cellText = document.createTextNode(matrix_fark_t2_t1.subset(math.index(i, j)));
                            cell.appendChild(cellText);
                            row.appendChild(cell);
                        }
                        // add the row to the end of the table body
                        tblBody.appendChild(row);
                    }
                    mytable.appendChild(tblBody);
                    //----
                });*/

        $("#GlobalTest").hide();
        $("#GlobalTest_t2t1").show();
        $("#GlobalTest_t3t1").hide();
        $("#GlobalTest_t3t2").hide();

        //--- Global Test ---
        $("#GlobalTest_t2t1").click(function () {
            //Yer değiştirme vektörü
            mtrxd_t2t1 = mtrxd_fark_t2_t1;

            //d nin kofaktör matrisi
            const rows_Qt2t1 = NoktaSayisi_t1 * 3;
            const columns_Qt2t1 = NoktaSayisi_t1 * 3;
            let matrixZeros_Qt2t1 = math.zeros(rows_Qt2t1, columns_Qt2t1);
            for (var i = 0; i < NoktaSayisi_t1; i++) {
                l = bazNNunique_t1_lowerCase.indexOf(bazNNunique_t2_lowerCase[i]);
                for (var m = 0; m < NoktaSayisi_t1; m++) {
                    //Get the cofactor matrices of unknown in Period 2
                    var Qt2_11 = mtrx1tum_QX_t2.subset(math.index((3 * i), (3 * m)));
                    var Qt2_12 = mtrx1tum_QX_t2.subset(math.index((3 * i), ((3 * m) + 1)));
                    var Qt2_13 = mtrx1tum_QX_t2.subset(math.index((3 * i), ((3 * m) + 2)));

                    var Qt2_21 = mtrx1tum_QX_t2.subset(math.index(((3 * i) + 1), (3 * m)));
                    var Qt2_22 = mtrx1tum_QX_t2.subset(math.index(((3 * i) + 1), ((3 * m) + 1)));
                    var Qt2_23 = mtrx1tum_QX_t2.subset(math.index(((3 * i) + 1), ((3 * m) + 2)));

                    var Qt2_31 = mtrx1tum_QX_t2.subset(math.index(((3 * i) + 2), (3 * m)));
                    var Qt2_32 = mtrx1tum_QX_t2.subset(math.index(((3 * i) + 2), ((3 * m) + 1)));
                    var Qt2_33 = mtrx1tum_QX_t2.subset(math.index(((3 * i) + 2), ((3 * m) + 2)));

                    n = bazNNunique_t1_lowerCase.indexOf(bazNNunique_t2_lowerCase[m]);
                    //Replace the matrixZeros_Qt2t1 with the cofactor matrices of unknown in Period 2
                    matrixZeros_Qt2t1.subset(math.index((3 * l), (3 * n)), Qt2_11);
                    matrixZeros_Qt2t1.subset(math.index((3 * l), ((3 * n) + 1)), Qt2_12);
                    matrixZeros_Qt2t1.subset(math.index((3 * l), ((3 * n) + 2)), Qt2_13);

                    matrixZeros_Qt2t1.subset(math.index(((3 * l) + 1), (3 * n)), Qt2_21);
                    matrixZeros_Qt2t1.subset(math.index(((3 * l) + 1), ((3 * n) + 1)), Qt2_22);
                    matrixZeros_Qt2t1.subset(math.index(((3 * l) + 1), ((3 * n) + 2)), Qt2_23);

                    matrixZeros_Qt2t1.subset(math.index(((3 * l) + 2), (3 * n)), Qt2_31);
                    matrixZeros_Qt2t1.subset(math.index(((3 * l) + 2), ((3 * n) + 1)), Qt2_32);
                    matrixZeros_Qt2t1.subset(math.index(((3 * l) + 2), ((3 * n) + 2)), Qt2_33);
                }
            }
            matrix_Qt2t1 = matrixZeros_Qt2t1

            //mtrxQdd_t2t1_f = math.subtract(mtrx1tum_QX, matrix_Qt2t1);
            mtrxQdd_t2t1 = math.add(mtrx1tum_QX, matrix_Qt2t1);

            //Karesel form (R)
            mtrxQdd_Pseudo_t2t1 = math.subtract(math.inv(math.add(mtrxQdd_t2t1, (math.multiply(math.transpose(matrixGT_t1), matrixGT_t1)))), (math.multiply(math.transpose(matrixGT_t1), matrixGT_t1)));
            mtrxR_t2t1 = math.multiply(math.transpose(mtrxd_t2t1), mtrxQdd_Pseudo_t2t1, mtrxd_t2t1);

            //Birleşik varyans değeri
            So2_t2t1 = math.divide(math.add(math.multiply(Math.pow(tumSo_t1, 2), f_tumiz_t1), math.multiply(Math.pow(tumSo_t2, 2), f_tumiz_t2)), math.add(f_tumiz_t1, f_tumiz_t2));

            //Test değeri
            h_t2t1 = math.subtract(math.multiply(NoktaSayisi_t1, 3), 3);
            T_Test_t2t1 = math.divide(mtrxR_t2t1, math.multiply(So2_t2t1, h_t2t1));

            // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
            F_Value_t2t1 = jStat.centralF.inv(0.95, h_t2t1, math.add(f_tumiz_t1, f_tumiz_t2));
            //jStat.centralF.inv(0.95, 9, 3)

            //Alert T and F
            if (T_Test_t2t1 > F_Value_t2t1) {
                Swal.fire({
                    title: 'T > F',
                    html: 'There is deformation at the conjugate points. <p style="font-size:16px;"><br>"T" Test Value = ' + T_Test_t2t1.toFixed(2) + '<br> "F" Limit Value = ' + F_Value_t2t1.toFixed(2) + '</br></p>',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                $("#DatumNokta_t2t1").show();
            } else if (T_Test_t2t1 < F_Value_t2t1) {
                Swal.fire({
                    title: 'T < F',
                    html: 'Eşlenik noktalarda deformasyon yoktur. <p style="font-size:16px;"><br>"T" Test Value = ' + T_Test_t2t1 + '<br> "F" Limit Value = ' + F_Value_t2t1 + '</br></p>',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }


            //-----Calculate Rmin (T>F Durumunda)
            $("#DatumNokta_t2t1").click(function () {

                let index_Rmin = []; //Rmin_indexleri (buradaki değerler nokta sıralarını göstermektedir.)
                for (var ab = 0; ab < NoktaSayisi_t1; ab++) {

                    //E Birim Matris
                    matrixE_t2t1 = math.identity(NoktaSayisi_t1 * 3)
                    //

                    //"GT" Katsayılar Matrisi
                    const rowsGT = 3;
                    const columnsGT = NoktaSayisi_t1 * 3;
                    let matrixZerosGT = math.zeros(rowsGT, columnsGT);
                    for (var i = 0; i < (NoktaSayisi_t1); i++) {
                        matrixZerosGT.subset(math.index(0, (3 * i)), 1);
                        matrixZerosGT.subset(math.index(1, ((3 * i) + 1)), 1);
                        matrixZerosGT.subset(math.index(2, ((3 * i) + 2)), 1);
                    }
                    matrixGT_t2t1 = math.multiply((1 / (math.sqrt(NoktaSayisi_t1))), matrixZerosGT);
                    //

                    //"BT" Katsayılar Matrisi
                    const rowsBT = 3;
                    const columnsBT = NoktaSayisi_t1 * 3;
                    let matrixZerosBT = math.zeros(rowsBT, columnsBT);
                    for (var i = 0; i < (NoktaSayisi_t1); i++) {
                        matrixZerosBT.subset(math.index(0, (3 * i)), 1);
                        matrixZerosBT.subset(math.index(1, ((3 * i) + 1)), 1);
                        matrixZerosBT.subset(math.index(2, ((3 * i) + 2)), 1);
                    }
                    matrixBT_t2t1 = math.multiply((1 / (math.sqrt(NoktaSayisi_t1))), matrixZerosGT);
                    //


                    var R_t2t1 = [];
                    var Test_t2t1 = [];
                    for (var i = 0; i < NoktaSayisi_t1; i++) {
                        //a[i] = 10;
                        matrixBT_t2t1.subset(math.index(0, (3 * i)), 0);
                        matrixBT_t2t1.subset(math.index(1, ((3 * i) + 1)), 0);
                        matrixBT_t2t1.subset(math.index(2, ((3 * i) + 2)), 0);
                        if (i > 0) {
                            for (var k = i - 1; k >= 0; k--) {
                                //R değeri hesaplanmış geride kalan noktalara GT değerlerini yazdırıyor.
                                matrixBT_t2t1.subset(math.index(0, (3 * k)), matrixGT_t2t1.subset(math.index(0, (3 * k))));
                                matrixBT_t2t1.subset(math.index(1, ((3 * k) + 1)), matrixGT_t2t1.subset(math.index(1, ((3 * k) + 1))));
                                matrixBT_t2t1.subset(math.index(2, ((3 * k) + 2)), matrixGT_t2t1.subset(math.index(2, ((3 * k) + 2))));
                            }
                        }



                        //BT Matrisinde Rmin olan nokta yerine 0 değerinin yazılması
                        if (index_Rmin.length > 0) {
                            for (var a = 0; a < index_Rmin.length; a++) {
                                matrixBT_t2t1.subset(math.index(0, (3 * index_Rmin[a])), 0);
                                matrixBT_t2t1.subset(math.index(1, ((3 * index_Rmin[a]) + 1)), 0);
                                matrixBT_t2t1.subset(math.index(2, ((3 * index_Rmin[a]) + 2)), 0);
                            }
                        }
                        //



                        //S Transformasyon matrisi
                        mtrxS_t2t1 = math.subtract(matrixE_t2t1, math.multiply(math.transpose(matrixGT_t2t1), math.inv(math.multiply(matrixBT_t2t1, math.transpose(matrixGT_t2t1))), matrixBT_t2t1));
                        //

                        //Kısmi-iz Minimum dengelemede "xi" Küçültülmüş Bilinmeyenleri ve "Qi" Bilinmeyenlerin Kofaktör Matrisi
                        mtrx_xi_t1 = math.multiply(mtrxS_t2t1, mtrx1tum_x_t1);
                        mtrx_Qi_t1 = math.multiply(mtrxS_t2t1, mtrx1tum_QX, math.transpose(mtrxS_t2t1));

                        mtrx_xi_t2 = math.multiply(mtrxS_t2t1, mtrx_xBil_t2_t1);
                        mtrx_Qi_t2 = math.multiply(mtrxS_t2t1, matrix_Qt2t1, math.transpose(mtrxS_t2t1));
                        //

                        //Dengeli Koordinatlar
                        let mtrxKismiDeng_t1 = math.add(matrix1tumCoor_t1, mtrx_xi_t1); //Matris formatında.

                        //---------------
                        const rowslist_Coor_t2 = NoktaSayisi_t1;
                        const columnslist_Coor_t2 = 1;
                        let matrixZeroslist_Coor_t2 = math.zeros(rowslist_Coor_t2, columnslist_Coor_t2);
                        for (var j = 0; j < NoktaSayisi_t1 * 3; j += 3) {
                            matrixZeroslist_Coor_t2.subset(math.index(j, 0), list_Coor_t2_t1[j]);
                            matrixZeroslist_Coor_t2.subset(math.index(j + 1, 0), list_Coor_t2_t1[j + 1]);
                            matrixZeroslist_Coor_t2.subset(math.index(j + 2, 0), list_Coor_t2_t1[j + 2]);
                        }
                        mtrx_list_Coor_t2_t1 = matrixZeroslist_Coor_t2; //Matris formatında.

                        let mtrxKismiDeng_t2 = math.add(mtrx_list_Coor_t2_t1, mtrx_xi_t2); //Matris formatında.
                        //---------------
                        //


                        //Global Test Öncesi Eşlenik Noktaları Alma
                        //---Dengeli Koordinatlar (Kısmi iz Min.)
                        var list_x_t1_GlobalTest = [];
                        var list_x_t2_GlobalTest = [];
                        for (var k = 0; k < NoktaSayisi_t1; k++) {
                            if (matrixBT_t2t1.subset(math.index(0, (3 * k))) == 0) {
                                continue;
                            }
                            list_x_t1_GlobalTest.push(mtrxKismiDeng_t1.subset(math.index((3 * k), 0)));
                            list_x_t1_GlobalTest.push(mtrxKismiDeng_t1.subset(math.index(((3 * k) + 1), 0)));
                            list_x_t1_GlobalTest.push(mtrxKismiDeng_t1.subset(math.index(((3 * k) + 2), 0)));

                            list_x_t2_GlobalTest.push(mtrxKismiDeng_t2.subset(math.index((3 * k), 0)));
                            list_x_t2_GlobalTest.push(mtrxKismiDeng_t2.subset(math.index(((3 * k) + 1), 0)));
                            list_x_t2_GlobalTest.push(mtrxKismiDeng_t2.subset(math.index(((3 * k) + 2), 0)));
                        }

                        const rows_t1_GlobalTest = list_x_t1_GlobalTest.length;
                        const columns_t1_GlobalTest = 1;
                        let matrix_t1_GlobalTest = math.zeros(rows_t1_GlobalTest, columns_t1_GlobalTest);
                        let matrix_t2_GlobalTest = math.zeros(rows_t1_GlobalTest, columns_t1_GlobalTest);
                        for (var m = 0; m < (list_x_t1_GlobalTest.length); m++) {
                            matrix_t1_GlobalTest.subset(math.index(m, 0), list_x_t1_GlobalTest[m]);
                            matrix_t2_GlobalTest.subset(math.index(m, 0), list_x_t2_GlobalTest[m]);
                        }
                        let matrix_x_t1_EslenikNokta = matrix_t1_GlobalTest; //Matris formatında eşlenik noktalar.
                        let matrix_x_t2_EslenikNokta = matrix_t2_GlobalTest; //Matris formatında eşlenik noktalar.
                        //---

                        //---Bilinmeyenlerin Kofaktör Matrisi (Kısmi iz Min.) (Qff yani eşlenik noktalar için satır ve sütunların silinmesi)
                        const rows_Q_t1_GlobalTest = list_x_t1_GlobalTest.length;
                        const columns_Q_t1_GlobalTest = list_x_t1_GlobalTest.length;
                        matrix_Qti_1_EslenikNokta = math.zeros(rows_Q_t1_GlobalTest, columns_Q_t1_GlobalTest); //Matris formatında eşlenik noktaların kofaktörü.
                        matrix_Qti_2_EslenikNokta = math.zeros(rows_Q_t1_GlobalTest, columns_Q_t1_GlobalTest); //Matris formatında eşlenik noktaların kofaktörü.

                        var list_Qti_1_EslenikNokta = [];
                        var list_Qti_2_EslenikNokta = [];
                        for (var l = 0; l < NoktaSayisi_t1; l++) {
                            if (matrixBT_t2t1.subset(math.index(0, (3 * l))) == 0) {
                                continue;
                            }
                            for (var p = 0; p < NoktaSayisi_t1; p++) {
                                if (matrixBT_t2t1.subset(math.index(0, (3 * p))) == 0) {
                                    continue;
                                }
                                //Get the cofactor matrices of unknown conjugate points in Period 1
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index((3 * l), (3 * p))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index((3 * l), ((3 * p) + 1))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index((3 * l), ((3 * p) + 2))));

                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 1), (3 * p))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 1), ((3 * p) + 1))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 1), ((3 * p) + 2))));

                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 2), (3 * p))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 2), ((3 * p) + 1))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 2), ((3 * p) + 2))));

                                //Get the cofactor matrices of unknown conjugate points in Period 2
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index((3 * l), (3 * p))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index((3 * l), ((3 * p) + 1))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index((3 * l), ((3 * p) + 2)))) //;

                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 1), (3 * p))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 1), ((3 * p) + 1))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 1), ((3 * p) + 2)))) //;

                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 2), (3 * p))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 2), ((3 * p) + 1))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 2), ((3 * p) + 2))));
                            }
                        }

                        for (var s = 0; s < (list_x_t1_GlobalTest.length / 3); s++) {
                            for (var r = 0, t = ((list_x_t1_GlobalTest.length / 3) * s); r < (list_x_t1_GlobalTest.length / 3) && t < ((list_x_t1_GlobalTest.length / 3) * (s + 1)); r++, t++) {
                                //Replace the matrix_Qti_1_EslenikNokta with list_Qti_1_EslenikNokta
                                matrix_Qti_1_EslenikNokta.subset(math.index((3 * s), (3 * r)), list_Qti_1_EslenikNokta[9 * t]);
                                matrix_Qti_1_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 1)), list_Qti_1_EslenikNokta[(9 * t) + 1]);
                                matrix_Qti_1_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 2)), list_Qti_1_EslenikNokta[(9 * t) + 2]);

                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 1), (3 * r)), list_Qti_1_EslenikNokta[(9 * t) + 3]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 1)), list_Qti_1_EslenikNokta[(9 * t) + 4]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 2)), list_Qti_1_EslenikNokta[(9 * t) + 5]);

                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 2), (3 * r)), list_Qti_1_EslenikNokta[(9 * t) + 6]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 1)), list_Qti_1_EslenikNokta[(9 * t) + 7]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 2)), list_Qti_1_EslenikNokta[(9 * t) + 8]);

                                //Replace the matrix_Qti_2_EslenikNokta with list_Qti_2_EslenikNokta
                                matrix_Qti_2_EslenikNokta.subset(math.index((3 * s), (3 * r)), list_Qti_2_EslenikNokta[9 * t]);
                                matrix_Qti_2_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 1)), list_Qti_2_EslenikNokta[(9 * t) + 1]);
                                matrix_Qti_2_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 2)), list_Qti_2_EslenikNokta[(9 * t) + 2]);

                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 1), (3 * r)), list_Qti_2_EslenikNokta[(9 * t) + 3]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 1)), list_Qti_2_EslenikNokta[(9 * t) + 4]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 2)), list_Qti_2_EslenikNokta[(9 * t) + 5]);

                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 2), (3 * r)), list_Qti_2_EslenikNokta[(9 * t) + 6]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 1)), list_Qti_2_EslenikNokta[(9 * t) + 7]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 2)), list_Qti_2_EslenikNokta[(9 * t) + 8]);
                            }
                        }
                        //---

                        //---GT_t2t1 (Kısmi iz Min.)
                        const rows_GT_t2t1_GlobalTest = 3;
                        const columns_GT_t2t1_GlobalTest = list_x_t1_GlobalTest.length;
                        matrix_GT_t2t1_EslenikNokta = math.zeros(rows_GT_t2t1_GlobalTest, columns_GT_t2t1_GlobalTest); //Matris formatında GT eşlenik noktalar.

                        var list_GT_t2t1_GlobalTest = [];
                        for (var t = 0; t < NoktaSayisi_t1; t++) {
                            if (matrixBT_t2t1.subset(math.index(0, (3 * t))) == 0) {
                                continue;
                            }
                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(0, (3 * t))));
                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(0, ((3 * t) + 1))));
                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(0, ((3 * t) + 2))));

                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(1, (3 * t))));
                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(1, ((3 * t) + 1))));
                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(1, ((3 * t) + 2))));

                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(2, (3 * t))));
                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(2, ((3 * t) + 1))));
                            list_GT_t2t1_GlobalTest.push(matrixGT_t2t1.subset(math.index(2, ((3 * t) + 2))));
                        }

                        for (var u = 0; u < (list_x_t1_GlobalTest.length / 3); u++) {
                            matrix_GT_t2t1_EslenikNokta.subset(math.index(0, (3 * u)), list_GT_t2t1_GlobalTest[9 * u]);
                            matrix_GT_t2t1_EslenikNokta.subset(math.index(0, ((3 * u) + 1)), list_GT_t2t1_GlobalTest[(9 * u) + 1]);
                            matrix_GT_t2t1_EslenikNokta.subset(math.index(0, ((3 * u) + 2)), list_GT_t2t1_GlobalTest[(9 * u) + 2]);

                            matrix_GT_t2t1_EslenikNokta.subset(math.index(1, (3 * u)), list_GT_t2t1_GlobalTest[(9 * u) + 3]);
                            matrix_GT_t2t1_EslenikNokta.subset(math.index(1, ((3 * u) + 1)), list_GT_t2t1_GlobalTest[(9 * u) + 4]);
                            matrix_GT_t2t1_EslenikNokta.subset(math.index(1, ((3 * u) + 2)), list_GT_t2t1_GlobalTest[(9 * u) + 5]);

                            matrix_GT_t2t1_EslenikNokta.subset(math.index(2, (3 * u)), list_GT_t2t1_GlobalTest[(9 * u) + 6]);
                            matrix_GT_t2t1_EslenikNokta.subset(math.index(2, ((3 * u) + 1)), list_GT_t2t1_GlobalTest[(9 * u) + 7]);
                            matrix_GT_t2t1_EslenikNokta.subset(math.index(2, ((3 * u) + 2)), list_GT_t2t1_GlobalTest[(9 * u) + 8]);
                        }
                        //---
                        //


                        //---Global Test (T>F Durumunda)
                        //Yer değiştirme vektörü
                        mtrxd_t2i_t1i = math.subtract(matrix_x_t2_EslenikNokta, matrix_x_t1_EslenikNokta);

                        //d nin kofaktör matrisi
                        mtrxQdd_t2i_t1i = math.add(matrix_Qti_1_EslenikNokta, matrix_Qti_2_EslenikNokta);

                        //Karesel form (R)
                        var mtrxQdd_Pseudo_t2i_t1i = math.subtract(math.inv(math.add(mtrxQdd_t2i_t1i, (math.multiply(math.transpose(matrix_GT_t2t1_EslenikNokta), matrix_GT_t2t1_EslenikNokta)))), (math.multiply(math.transpose(matrix_GT_t2t1_EslenikNokta), matrix_GT_t2t1_EslenikNokta)));
                        mtrxR_t2i_t1i = math.multiply(math.transpose(mtrxd_t2i_t1i), mtrxQdd_Pseudo_t2i_t1i, mtrxd_t2i_t1i);

                        //R_t2t1_a = mtrxR_t2i_t1i.get([0, 0]);
                        R_t2t1_b = mtrxR_t2i_t1i.subset(math.index(0, 0));

                        R_t2t1.push(R_t2t1_b);

                        //Birleşik varyans değeri
                        So2_t2i_t1i = math.divide(math.add(math.multiply(Math.pow(tumSo_t1, 2), f_tumiz_t1), math.multiply(Math.pow(tumSo_t2, 2), f_tumiz_t2)), math.add(f_tumiz_t1, f_tumiz_t2));

                        //Test değeri
                        datum_nokta_sayisi_t2t1 = NoktaSayisi_t1 - (ab + 1);
                        //---

                        var h_t2i_t1i = math.subtract(math.multiply(datum_nokta_sayisi_t2t1, 3), 3); // test için datum nokta sayısı kullanılacak
                        T_Test_t2t1 = math.divide(mtrxR_t2i_t1i, math.multiply(So2_t2i_t1i, h_t2i_t1i));

                        Test_t2t1.push(T_Test_t2t1);

                        // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
                        F_Value_t2i_t1i = jStat.centralF.inv(0.95, h_t2i_t1i, math.add(f_tumiz_t1, f_tumiz_t2));
                        //---
                    }

                    Rmin = Math.min.apply(null, R_t2t1);
                    Rmin_index_value = R_t2t1.indexOf(Rmin)
                    index_Rmin.push(Rmin_index_value);
                    R_t2t1 = [];

                    Test_T_t2t1_ = Test_t2t1[Rmin_index_value];
                    Test_T_t2t1 = Test_T_t2t1_.subset(math.index(0, 0));
                    Test_t2t1 = [];

                    //---Global Test (T>F Durumunda)
                    if (index_Rmin.length === (NoktaSayisi_t1 - 1)) {
                        //alert("I am an alert box!");
                        break;
                    }
                    //---Global Test (T<F Durumunda)
                    if (Test_T_t2t1 < F_Value_t2i_t1i) {
                        break;
                    }
                }

                //---Global Test (T>F Durumunda)
                if (index_Rmin.length === (NoktaSayisi_t1 - 1)) {
                    //alert("I am an alert box!");
                    Swal.fire({
                        text: 'Static points not found.',
                        icon: 'info',
                        confirmButtonText: 'Ok',
                    })
                } else {
                    //---Analiz Sonrası Statik Noktaları Getirme
                    static_points_name_t1t2 = [];
                    for (var c = 0; c < NoktaSayisi_t1; c++) {
                        if (index_Rmin.includes(c)) {
                            continue;
                        }
                        static_points_name_t1t2.push(mtrx1t1tumDeng_KOH.subset(math.index(c, 0)));
                    }
                    static_point_count_t1t2 = static_points_name_t1t2.length;
                    //---

                    //---Analiz Sonrası Statik Noktaların Noktalar İçindeki İndex'i
                    static_points_name_index_t2t1_t1 = [];
                    static_points_name_index_t2t1_t2 = [];
                    for (let i = 0; i < static_point_count_t1t2; i++) {
                        let index_static_point_t1 = bazNNunique_t1_lowerCase.indexOf(static_points_name_t1t2[i].toLowerCase());
                        let index_static_point_t2 = bazNNunique_t2_lowerCase.indexOf(static_points_name_t1t2[i].toLowerCase());
                        static_points_name_index_t2t1_t1.push(index_static_point_t1);
                        static_points_name_index_t2t1_t2.push(index_static_point_t2);
                    }
                    static_points_name_index_t2t1_t1.sort(function(a, b){return a-b});
                    static_points_name_index_t2t1_t2.sort(function(a, b){return a-b});
                    //---

                    //---Statik Noktaları Alert'ın içine tablo halinde yazdırma
                    var table_swal_t2t1 = document.createElement('table'),
                        tr, th, td, row, cell;
                    table_swal_t2t1.setAttribute("border", "1 solid black");
                    table_swal_t2t1.setAttribute("style", "border-collapse: collapse; margin-left:auto; margin-right:auto;");

                    for (var row = 0; row < (static_points_name_t1t2.length + 1); row++) { //+1 = başlık olduğu için)
                        tr = document.createElement('tr');
                        if (row === 0) {
                            for (var column1 = 0; column1 < 2; column1++) {
                                if (column1 === 0) {
                                    th = document.createElement('th');
                                    tr.appendChild(th);
                                    th.innerHTML = "Number";
                                } else if (column1 === 1) {
                                    th = document.createElement('th');
                                    tr.appendChild(th);
                                    th.innerHTML = "Point Name";
                                }
                            }
                            table_swal_t2t1.appendChild(tr);
                        } else if (row > 0) {
                            for (j = 0; j < 2; j++) {
                                if (j === 0) {
                                    td = document.createElement('td');
                                    td.innerHTML = row;
                                    tr.appendChild(td);
                                } else if (j === 1) {
                                    td = document.createElement('td');
                                    td.innerHTML = static_points_name_t1t2[(row - 1)]; // hareketsiz nokta adı gelecek
                                    tr.appendChild(td);
                                }
                            }
                            table_swal_t2t1.appendChild(tr);
                        }
                    }

                    TestStatic_T2T1 = table_swal_t2t1.createCaption();
                    TestStatic_T2T1.innerHTML = '<b>T</b> (' + Test_T_t2t1.toFixed(2) + ')<b> < F </b>(' + F_Value_t2i_t1i.toFixed(2) + ')';
                    TestStatic_T2T1.setAttribute("style", "caption-side: top; text-align:center; color: #ffffff;");

                    Swal.fire({
                        title: '<strong>Static Points</strong>',
                        icon: 'info',
                        html: table_swal_t2t1,
                        focusConfirm: false,
                        confirmButtonText: 'Ok',
                    })
                    //---

                    $("#DeformationTest_t2t1").show();
                    $("#DeformationTest_t3t1").hide();
                    $("#DeformationTest_t3t2").hide();

                    //---Statik ve Statik olmayan noktaların harita üzerinde işaretlenmesi
                    layerGroup_t1t2_StaticPoints = L.layerGroup().addTo(map);
                    layerGroup_t1t2_Non_StaticPoints = L.layerGroup().addTo(map);

                    for (var i = 0; i < static_points_name_t1t2.length; i++) {
                        var sp_index = bazNNunique_t1.indexOf(static_points_name_t1t2[i]);
                        marker_t1t2_StaticPoints = new L.marker([listenlem_tumiz_t1[sp_index], listboylam_tumiz_t1[sp_index]], {
                                icon: sari_nirengi_static_point
                            })
                            .bindPopup(BazDent_Points_t1[sp_index][0])
                        layerGroup_t1t2_StaticPoints.addLayer(marker_t1t2_StaticPoints).addTo(map);
                    }

                    map.setView(new L.LatLng((math.sum(listenlem_kartezyen) / listenlem_kartezyen.length), (math.sum(listboylam_kartezyen) / listboylam_kartezyen.length)), 8);
                }
            });
            //-----
        });
        //---





    } else if ($('#periods').val() == '2') {
        map.removeControl(legend);
        //--- 3. Periyottaki Nokta Adlarını 1. Periyoda Göre Eşleştir ve Eşleşen Noktaların Koordinatlarını Al
        var esles3_1_a = [];
        var eslesx3_1_a = [];
        var eslesCoor3_1_a = [];
        for (i = 0; i < NoktaSayisi_t3; i++) {
            for (j = 0, k = 0; j < NoktaSayisi_t3, k < NoktaSayisi_t3 * 3; j++, k += 3) {
                NNt3 = (mtrx1t3tumDeng_KOH.subset(math.index(j, 0))).toLowerCase()
                NNt1 = (mtrx1t1tumDeng_KOH.subset(math.index(i, 0))).toLowerCase()
                if (NNt3.includes(NNt1)) {
                    esles3_1_a.push(mtrx1t3tumDeng_KOH.subset(math.index(j, 1)));
                    esles3_1_a.push(mtrx1t3tumDeng_KOH.subset(math.index(j, 2)));
                    esles3_1_a.push(mtrx1t3tumDeng_KOH.subset(math.index(j, 3)));

                    eslesCoor3_1_a.push(matrix1tumCoor_t3.subset(math.index(k, 0)));
                    eslesCoor3_1_a.push(matrix1tumCoor_t3.subset(math.index(k + 1, 0)));
                    eslesCoor3_1_a.push(matrix1tumCoor_t3.subset(math.index(k + 2, 0)));

                    eslesx3_1_a.push(mtrxDengtum1_1_t3x.subset(math.index(k, 2)));
                    eslesx3_1_a.push(mtrxDengtum1_1_t3x.subset(math.index(k + 1, 2)));
                    eslesx3_1_a.push(mtrxDengtum1_1_t3x.subset(math.index(k + 2, 2)));
                }
            }
        }
        listDengCoor_t3_t1 = esles3_1_a;
        fark_t3_t1 = math.multiply(100, math.subtract(listDengCoor_t3_t1, listDengCoor_t1));
        mtrxd_fark_t3_t1 = math.subtract(listDengCoor_t3_t1, listDengCoor_t1);

        list_xBil_t3_t1 = eslesx3_1_a
        list_Coor_t3_t1 = eslesCoor3_1_a

        const rows_list_xBil_t3 = NoktaSayisi_t1;
        const columns_list_xBil_t3 = 1;
        let matrixZeros_list_xBil_t3 = math.zeros(rows_list_xBil_t3, columns_list_xBil_t3);
        for (i = 0; i < NoktaSayisi_t1 * 3; i += 3) {
            matrixZeros_list_xBil_t3.subset(math.index(i, 0), list_xBil_t3_t1[i]);
            matrixZeros_list_xBil_t3.subset(math.index(i + 1, 0), list_xBil_t3_t1[i + 1]);
            matrixZeros_list_xBil_t3.subset(math.index(i + 2, 0), list_xBil_t3_t1[i + 2]);
        }
        mtrx_xBil_t3_t1 = matrixZeros_list_xBil_t3; //Matris formatında.

        var fark_t3_t1_X_a = [];
        var fark_t3_t1_Y_a = [];
        var fark_t3_t1_Z_a = [];
        for (var i = 0; i < NoktaSayisi_t3 * 3; i += 3) {
            fark_t3_t1_X_a.push(fark_t3_t1[i]);
            fark_t3_t1_Y_a.push(fark_t3_t1[i + 1]);
            fark_t3_t1_Z_a.push(fark_t3_t1[i + 2]);
        }
        farkX_t3_t1 = fark_t3_t1_X_a;
        farkY_t3_t1 = fark_t3_t1_Y_a;
        farkZ_t3_t1 = fark_t3_t1_Z_a;

        let matrixZeros_fark_t3_t1 = math.zeros(NoktaSayisi_t1, 4);
        for (i = 0; i < NoktaSayisi_t1; i++) {
            matrixZeros_fark_t3_t1.subset(math.index(i, 0), mtrx1t1tumDeng_KOH.subset(math.index(i, 0)));
            matrixZeros_fark_t3_t1.subset(math.index(i, 1), farkX_t3_t1[i].toFixed(2));
            matrixZeros_fark_t3_t1.subset(math.index(i, 2), farkY_t3_t1[i].toFixed(2));
            matrixZeros_fark_t3_t1.subset(math.index(i, 3), farkZ_t3_t1[i].toFixed(2));
        };
        const matrix_fark_t3_t1 = matrixZeros_fark_t3_t1;
        //---

        /*        $("#CoordDifference").click(function () {
                    //document.getElementById("VelocityVectors").disabled = false;
                    if (typeof layerGroup_t1 === 'undefined' || layerGroup_t1 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t1 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t1)) {
                        map.removeLayer(layerGroup_t1);
                    };
                    if (typeof layerGroup_t2 === 'undefined' || layerGroup_t2 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t2 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t2)) {
                        map.removeLayer(layerGroup_t2);
                    };
                    if (typeof layerGroup_t3 === 'undefined' || layerGroup_t3 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t3 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t3)) {
                        map.removeLayer(layerGroup_t3);
                    };
                    if (typeof layerGroup_fark_t2_t1 === 'undefined' || layerGroup_fark_t2_t1 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_fark_t2_t1 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_fark_t2_t1)) {
                        map.removeLayer(layerGroup_fark_t2_t1);
                    };
                    if (typeof layerGroup_fark_t3_t2 === 'undefined' || layerGroup_fark_t3_t2 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_fark_t3_t1 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_fark_t3_t2)) {
                        map.removeLayer(layerGroup_fark_t3_t2);
                    };
                    layerGroup_fark_t3_t1 = L.layerGroup().addTo(map);
                    for (var i = 0; i < NoktaSayisi_t1; i++) {
                        nokta_adi_t3_t1 = mtrx1t1tumDeng_KOH.subset(math.index(i, 0));
                        x_fark_t3_t1 = farkX_t3_t1[i].toFixed(2);
                        y_fark_t3_t1 = farkY_t3_t1[i].toFixed(2);
                        z_fark_t3_t1 = farkZ_t3_t1[i].toFixed(2);
                        var template_fark_t3_t1 =
                            "<table id='table_popup_main'>\
                                  <caption id='table_caption'>Koordinat Fark Tablosu</caption>\
                                  <tr>\
                                    <th id='table_th_1'>Nokta</th>\
                                    <th id='table_th_2' colspan='2'>Koordinat Farkı (cm)</th> \
                                  </tr>\
                                  <tr>\
                                    <th id='table_th_4' rowspan='4'>" + nokta_adi_t3_t1 + "</th>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_1'>X<sub>2-1</sub></td>\
                                    <td id='table_td_2'>" + x_fark_t3_t1 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_5'>Y<sub>2-1</sub></td>\
                                    <td id='table_td_6'>" + y_fark_t3_t1 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_9'>Z<sub>2-1</sub></td>\
                                    <td id='table_td_10'>" + z_fark_t3_t1 + "</td>\
                                  </tr>\
                            </table>"
                        marker_fark_t3_t1 = new L.marker([listenlem_tumiz_t1[i], listboylam_tumiz_t1[i]], {
                                icon: beyaz_nirengi
                            })
                            .bindPopup(template_fark_t3_t1)
                        layerGroup_fark_t3_t1.addLayer(marker_fark_t3_t1).addTo(map);
                    }
                    map.setView(new L.LatLng((math.sum(listenlem_tumiz_t1) / listenlem_tumiz_t1.length), (math.sum(listboylam_tumiz_t1) / listboylam_tumiz_t1.length)), 8);

                    // Enable CoordDifference Button
                    document.getElementById("ExportCoordDifference").disabled = false;
                    // Change CoordDifference Button Text
                    document.getElementById("ExportCoordDifference").innerHTML = "<i class='fa fa-file-excel-o'></i> Koordinat Farklarını Exel'e Aktar <sub>(t3-t1)</sub>"

                    document.getElementById("farkCapt").innerHTML = "Koordinat Fark Tablosu (t3-t1)"
                    document.getElementById("farkX").innerHTML = "X <sub>(t3-t1)</sub> cm"
                    document.getElementById("farkY").innerHTML = "Y <sub>(t3-t1)</sub> cm"
                    document.getElementById("farkZ").innerHTML = "Z <sub>(t3-t1)</sub> cm"

                    //--- Tüm-İz Min. dengeleme sonuçlarından oluşan Koordinat Fark Tablosu ---
                    var mytable = document.getElementById('TableDiff')
                    var tblBody = document.createElement("tbody");

                    // creating all cells
                    for (var i = 0; i < NoktaSayisi_t1; i++) {
                        // creates a table row
                        var row = document.createElement("tr");

                        for (var j = 0; j < 4; j++) {
                            // Create a <td> element and a text node, make the text
                            // node the contents of the <td>, and put the <td> at
                            // the end of the table row
                            var cell = document.createElement("td");
                            var cellText = document.createTextNode(matrix_fark_t3_t1.subset(math.index(i, j)));
                            cell.appendChild(cellText);
                            row.appendChild(cell);
                        }
                        // add the row to the end of the table body
                        tblBody.appendChild(row);
                    }
                    mytable.appendChild(tblBody);
                    //---
                });*/

        $("#GlobalTest").hide();
        $("#GlobalTest_t2t1").hide();
        $("#GlobalTest_t3t1").show();
        $("#GlobalTest_t3t2").hide();

        //--- Global Test ---
        $("#GlobalTest_t3t1").click(function () {
            //Yer değiştirme vektörü
            mtrxd_t3t1 = mtrxd_fark_t3_t1;

            //d nin kofaktör matrisi
            const rows_Qt3t1 = NoktaSayisi_t1 * 3;
            const columns_Qt3t1 = NoktaSayisi_t1 * 3;
            let matrixZeros_Qt3t1 = math.zeros(rows_Qt3t1, columns_Qt3t1);
            for (i = 0; i < NoktaSayisi_t1; i++) {
                l = bazNNunique_t1_lowerCase.indexOf(bazNNunique_t3_lowerCase[i]);
                for (m = 0; m < NoktaSayisi_t1; m++) {
                    //Get the cofactor matrices of unknown in Period 3
                    var Qt3_11 = mtrx1tum_QX_t3.subset(math.index((3 * i), (3 * m)));
                    var Qt3_12 = mtrx1tum_QX_t3.subset(math.index((3 * i), ((3 * m) + 1)));
                    var Qt3_13 = mtrx1tum_QX_t3.subset(math.index((3 * i), ((3 * m) + 2)));

                    var Qt3_21 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 1), (3 * m)));
                    var Qt3_22 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 1), ((3 * m) + 1)));
                    var Qt3_23 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 1), ((3 * m) + 2)));

                    var Qt3_31 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 2), (3 * m)));
                    var Qt3_32 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 2), ((3 * m) + 1)));
                    var Qt3_33 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 2), ((3 * m) + 2)));

                    n = bazNNunique_t1_lowerCase.indexOf(bazNNunique_t3_lowerCase[m]);
                    //Replace the matrixZeros_Qt2t1 with the cofactor matrices of unknown in Period 3
                    matrixZeros_Qt3t1.subset(math.index((3 * l), (3 * n)), Qt3_11);
                    matrixZeros_Qt3t1.subset(math.index((3 * l), ((3 * n) + 1)), Qt3_12);
                    matrixZeros_Qt3t1.subset(math.index((3 * l), ((3 * n) + 2)), Qt3_13);

                    matrixZeros_Qt3t1.subset(math.index(((3 * l) + 1), (3 * n)), Qt3_21);
                    matrixZeros_Qt3t1.subset(math.index(((3 * l) + 1), ((3 * n) + 1)), Qt3_22);
                    matrixZeros_Qt3t1.subset(math.index(((3 * l) + 1), ((3 * n) + 2)), Qt3_23);

                    matrixZeros_Qt3t1.subset(math.index(((3 * l) + 2), (3 * n)), Qt3_31);
                    matrixZeros_Qt3t1.subset(math.index(((3 * l) + 2), ((3 * n) + 1)), Qt3_32);
                    matrixZeros_Qt3t1.subset(math.index(((3 * l) + 2), ((3 * n) + 2)), Qt3_33);
                }
            }
            matrix_Qt3t1 = matrixZeros_Qt3t1

            //mtrxQdd_t3t1_f = math.subtract(mtrx1tum_QX, matrix_Qt3t1);
            mtrxQdd_t3t1 = math.add(mtrx1tum_QX, matrix_Qt3t1);

            //Karesel form (R)
            mtrxQdd_Pseudo_t3t1 = math.subtract(math.inv(math.add(mtrxQdd_t3t1, (math.multiply(math.transpose(matrixGT_t1), matrixGT_t1)))), (math.multiply(math.transpose(matrixGT_t1), matrixGT_t1)));
            mtrxR_t3t1 = math.multiply(math.transpose(mtrxd_t3t1), mtrxQdd_Pseudo_t3t1, mtrxd_t3t1);

            //Birleşik varyans değeri
            So2_t3t1 = math.divide(math.add(math.multiply(Math.pow(tumSo_t1, 2), f_tumiz_t1), math.multiply(Math.pow(tumSo_t3, 2), f_tumiz_t3)), math.add(f_tumiz_t1, f_tumiz_t3));

            //Test değeri
            h_t3t1 = math.subtract(math.multiply(NoktaSayisi_t1, 3), 3);
            T_Test_t3t1 = math.divide(mtrxR_t3t1, math.multiply(So2_t3t1, h_t3t1));

            // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
            F_Value_t3t1 = jStat.centralF.inv(0.95, h_t3t1, math.add(f_tumiz_t1, f_tumiz_t3));
            //jStat.centralF.inv(0.95, 9, 3)


            if (T_Test_t3t1 > F_Value_t3t1) {
                Swal.fire({
                    title: 'T > F',
                    html: 'There is deformation at the conjugate points. <p style="font-size:16px;"><br>"T" Test Value = ' + T_Test_t3t1.toFixed(2) + '<br> "F" Limit Value = ' + F_Value_t3t1.toFixed(2) + '</br></p>',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                $("#DatumNokta_t3t1").show();
            } else if (T_Test_t2t1 < F_Value_t2t1) {
                Swal.fire({
                    title: 'T < F',
                    html: 'Eşlenik noktalarda deformasyon yoktur. <p style="font-size:16px;"><br>"T" Test Value = ' + T_Test_t3t1 + '<br> "F" Limit Value = ' + F_Value_t3t1 + '</br></p>',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }


            //-----Calculate Rmin (T>F Durumunda)
            $("#DatumNokta_t3t1").click(function () {

                let index_Rmin = []; //Rmin_indexleri (buradaki değerler nokta sıralarını göstermektedir.)
                for (var ab = 0; ab < NoktaSayisi_t1; ab++) {

                    //E Birim Matris
                    matrixE_t3t1 = math.identity(NoktaSayisi_t1 * 3)
                    //

                    //"GT" Katsayılar Matrisi
                    const rowsGT = 3;
                    const columnsGT = NoktaSayisi_t1 * 3;
                    let matrixZerosGT = math.zeros(rowsGT, columnsGT);
                    for (var i = 0; i < (NoktaSayisi_t1); i++) {
                        matrixZerosGT.subset(math.index(0, (3 * i)), 1);
                        matrixZerosGT.subset(math.index(1, ((3 * i) + 1)), 1);
                        matrixZerosGT.subset(math.index(2, ((3 * i) + 2)), 1);
                    }
                    matrixGT_t3t1 = math.multiply((1 / (math.sqrt(NoktaSayisi_t1))), matrixZerosGT);
                    //

                    //"BT" Katsayılar Matrisi
                    const rowsBT = 3;
                    const columnsBT = NoktaSayisi_t1 * 3;
                    let matrixZerosBT = math.zeros(rowsBT, columnsBT);
                    for (var i = 0; i < (NoktaSayisi_t1); i++) {
                        matrixZerosBT.subset(math.index(0, (3 * i)), 1);
                        matrixZerosBT.subset(math.index(1, ((3 * i) + 1)), 1);
                        matrixZerosBT.subset(math.index(2, ((3 * i) + 2)), 1);
                    }
                    matrixBT_t3t1 = math.multiply((1 / (math.sqrt(NoktaSayisi_t1))), matrixZerosGT);
                    //

                    var R_t3t1 = [];
                    var Test_t3t1 = [];
                    for (var i = 0; i < NoktaSayisi_t1; i++) {
                        //a[i] = 10;
                        matrixBT_t3t1.subset(math.index(0, (3 * i)), 0);
                        matrixBT_t3t1.subset(math.index(1, ((3 * i) + 1)), 0);
                        matrixBT_t3t1.subset(math.index(2, ((3 * i) + 2)), 0);
                        if (i > 0) {
                            for (var k = i - 1; k >= 0; k--) {
                                //a[k] = b[k];
                                matrixBT_t3t1.subset(math.index(0, (3 * k)), matrixGT_t3t1.subset(math.index(0, (3 * k))));
                                matrixBT_t3t1.subset(math.index(1, ((3 * k) + 1)), matrixGT_t3t1.subset(math.index(1, ((3 * k) + 1))));
                                matrixBT_t3t1.subset(math.index(2, ((3 * k) + 2)), matrixGT_t3t1.subset(math.index(2, ((3 * k) + 2))));
                            }
                        }

                        //BT Matrisinde Rmin olan nokta yerine 0 değerinin yazılması
                        if (index_Rmin.length > 0) {
                            for (var a = 0; a < index_Rmin.length; a++) {
                                matrixBT_t3t1.subset(math.index(0, (3 * index_Rmin[a])), 0);
                                matrixBT_t3t1.subset(math.index(1, ((3 * index_Rmin[a]) + 1)), 0);
                                matrixBT_t3t1.subset(math.index(2, ((3 * index_Rmin[a]) + 2)), 0);
                            }
                        }
                        //

                        //S Transformasyon matrisi
                        mtrxS_t3t1 = math.subtract(matrixE_t3t1, math.multiply(math.transpose(matrixGT_t3t1), math.inv(math.multiply(matrixBT_t3t1, math.transpose(matrixGT_t3t1))), matrixBT_t3t1));
                        //

                        //Kısmi-iz Minimum dengelemede "xi" Küçültülmüş Bilinmeyenleri ve "Qi" Bilinmeyenlerin Kofaktör Matrisi
                        let mtrx_xi_t1 = math.multiply(mtrxS_t3t1, mtrx1tum_x_t1);
                        let mtrx_Qi_t1 = math.multiply(mtrxS_t3t1, mtrx1tum_QX, math.transpose(mtrxS_t3t1));

                        let mtrx_xi_t3 = math.multiply(mtrxS_t3t1, mtrx_xBil_t3_t1);
                        let mtrx_Qi_t3 = math.multiply(mtrxS_t3t1, matrix_Qt3t1, math.transpose(mtrxS_t3t1));
                        //

                        //Dengeli Koordinatlar
                        let mtrxKismiDeng_t1 = math.add(matrix1tumCoor_t1, mtrx_xi_t1); //Matris formatında.

                        //---------------
                        const rowslist_Coor_t3 = NoktaSayisi_t1;
                        const columnslist_Coor_t3 = 1;
                        let matrixZeroslist_Coor_t3 = math.zeros(rowslist_Coor_t3, columnslist_Coor_t3);
                        for (var j = 0; j < NoktaSayisi_t1 * 3; j += 3) {
                            matrixZeroslist_Coor_t3.subset(math.index(j, 0), list_Coor_t3_t1[j]);
                            matrixZeroslist_Coor_t3.subset(math.index(j + 1, 0), list_Coor_t3_t1[j + 1]);
                            matrixZeroslist_Coor_t3.subset(math.index(j + 2, 0), list_Coor_t3_t1[j + 2]);
                        }
                        mtrx_list_Coor_t3_t1 = matrixZeroslist_Coor_t3; //Matris formatında.

                        let mtrxKismiDeng_t3 = math.add(mtrx_list_Coor_t3_t1, mtrx_xi_t3); //Matris formatında.
                        //---------------
                        //

                        //Global Test Öncesi Eşlenik Noktaları Alma
                        //---Dengeli Koordinatlar (Kısmi iz Min.)
                        let list_x_t1_GlobalTest = [];
                        let list_x_t3_GlobalTest = [];
                        for (let k = 0; k < NoktaSayisi_t1; k++) {
                            if (matrixBT_t3t1.subset(math.index(0, (3 * k))) == 0) {
                                continue;
                            }
                            list_x_t1_GlobalTest.push(mtrxKismiDeng_t1.subset(math.index((3 * k), 0)));
                            list_x_t1_GlobalTest.push(mtrxKismiDeng_t1.subset(math.index(((3 * k) + 1), 0)));
                            list_x_t1_GlobalTest.push(mtrxKismiDeng_t1.subset(math.index(((3 * k) + 2), 0)));

                            list_x_t3_GlobalTest.push(mtrxKismiDeng_t3.subset(math.index((3 * k), 0)));
                            list_x_t3_GlobalTest.push(mtrxKismiDeng_t3.subset(math.index(((3 * k) + 1), 0)));
                            list_x_t3_GlobalTest.push(mtrxKismiDeng_t3.subset(math.index(((3 * k) + 2), 0)));
                        }

                        let rows_t1_GlobalTest = list_x_t1_GlobalTest.length;
                        let columns_t1_GlobalTest = 1;
                        let matrix_t1_GlobalTest = math.zeros(rows_t1_GlobalTest, columns_t1_GlobalTest);
                        let matrix_t3_GlobalTest = math.zeros(rows_t1_GlobalTest, columns_t1_GlobalTest);
                        for (let m = 0; m < (list_x_t1_GlobalTest.length); m++) {
                            matrix_t1_GlobalTest.subset(math.index(m, 0), list_x_t1_GlobalTest[m]);
                            matrix_t3_GlobalTest.subset(math.index(m, 0), list_x_t3_GlobalTest[m]);
                        }
                        matrix_x_t1_EslenikNokta = matrix_t1_GlobalTest; //Matris formatında eşlenik noktalar.
                        matrix_x_t3_EslenikNokta = matrix_t3_GlobalTest; //Matris formatında eşlenik noktalar.
                        //---

                        //---Bilinmeyenlerin Kofaktör Matrisi (Kısmi iz Min.)
                        let rows_Q_t1_GlobalTest = list_x_t1_GlobalTest.length;
                        let columns_Q_t1_GlobalTest = list_x_t1_GlobalTest.length;
                        let matrix_Qti_1_EslenikNokta = math.zeros(rows_Q_t1_GlobalTest, columns_Q_t1_GlobalTest); //Matris formatında eşlenik noktaların kofaktörü.
                        let matrix_Qti_3_EslenikNokta = math.zeros(rows_Q_t1_GlobalTest, columns_Q_t1_GlobalTest); //Matris formatında eşlenik noktaların kofaktörü.

                        let list_Qti_1_EslenikNokta = [];
                        let list_Qti_3_EslenikNokta = [];
                        for (let l = 0; l < NoktaSayisi_t1; l++) {
                            if (matrixBT_t3t1.subset(math.index(0, (3 * l))) == 0) {
                                continue;
                            }
                            for (let p = 0; p < NoktaSayisi_t1; p++) {
                                if (matrixBT_t3t1.subset(math.index(0, (3 * p))) == 0) {
                                    continue;
                                }
                                //Get the cofactor matrices of unknown conjugate points in Period 1
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index((3 * l), (3 * p))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index((3 * l), ((3 * p) + 1))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index((3 * l), ((3 * p) + 2))));

                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 1), (3 * p))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 1), ((3 * p) + 1))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 1), ((3 * p) + 2))));

                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 2), (3 * p))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 2), ((3 * p) + 1))));
                                list_Qti_1_EslenikNokta.push(mtrx_Qi_t1.subset(math.index(((3 * l) + 2), ((3 * p) + 2))));

                                //Get the cofactor matrices of unknown conjugate points in Period 2
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index((3 * l), (3 * p))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index((3 * l), ((3 * p) + 1))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index((3 * l), ((3 * p) + 2)))) //;

                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 1), (3 * p))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 1), ((3 * p) + 1))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 1), ((3 * p) + 2)))) //;

                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 2), (3 * p))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 2), ((3 * p) + 1))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 2), ((3 * p) + 2))));
                            }
                        }

                        for (let s = 0; s < (list_x_t1_GlobalTest.length / 3); s++) {
                            for (let r = 0, t = ((list_x_t1_GlobalTest.length / 3) * s); r < (list_x_t1_GlobalTest.length / 3) && t < ((list_x_t1_GlobalTest.length / 3) * (s + 1)); r++, t++) {
                                //Replace the matrix_Qti_1_EslenikNokta with list_Qti_1_EslenikNokta
                                matrix_Qti_1_EslenikNokta.subset(math.index((3 * s), (3 * r)), list_Qti_1_EslenikNokta[9 * t]);
                                matrix_Qti_1_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 1)), list_Qti_1_EslenikNokta[(9 * t) + 1]);
                                matrix_Qti_1_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 2)), list_Qti_1_EslenikNokta[(9 * t) + 2]);

                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 1), (3 * r)), list_Qti_1_EslenikNokta[(9 * t) + 3]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 1)), list_Qti_1_EslenikNokta[(9 * t) + 4]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 2)), list_Qti_1_EslenikNokta[(9 * t) + 5]);

                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 2), (3 * r)), list_Qti_1_EslenikNokta[(9 * t) + 6]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 1)), list_Qti_1_EslenikNokta[(9 * t) + 7]);
                                matrix_Qti_1_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 2)), list_Qti_1_EslenikNokta[(9 * t) + 8]);

                                //Replace the matrix_Qti_2_EslenikNokta with list_Qti_2_EslenikNokta
                                matrix_Qti_3_EslenikNokta.subset(math.index((3 * s), (3 * r)), list_Qti_3_EslenikNokta[9 * t]);
                                matrix_Qti_3_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 1)), list_Qti_3_EslenikNokta[(9 * t) + 1]);
                                matrix_Qti_3_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 2)), list_Qti_3_EslenikNokta[(9 * t) + 2]);

                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 1), (3 * r)), list_Qti_3_EslenikNokta[(9 * t) + 3]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 1)), list_Qti_3_EslenikNokta[(9 * t) + 4]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 2)), list_Qti_3_EslenikNokta[(9 * t) + 5]);

                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 2), (3 * r)), list_Qti_3_EslenikNokta[(9 * t) + 6]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 1)), list_Qti_3_EslenikNokta[(9 * t) + 7]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 2)), list_Qti_3_EslenikNokta[(9 * t) + 8]);
                            }
                        }
                        //---

                        //---GT_t3t1 (Kısmi iz Min.)
                        let rows_GT_t3t1_GlobalTest = 3;
                        let columns_GT_t3t1_GlobalTest = list_x_t1_GlobalTest.length;
                        matrix_GT_t3t1_EslenikNokta = math.zeros(rows_GT_t3t1_GlobalTest, columns_GT_t3t1_GlobalTest); //Matris formatında GT eşlenik noktalar.

                        let list_GT_t3t1_GlobalTest = [];
                        for (let t = 0; t < NoktaSayisi_t1; t++) {
                            if (matrixBT_t3t1.subset(math.index(0, (3 * t))) == 0) {
                                continue;
                            }
                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(0, (3 * t))));
                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(0, ((3 * t) + 1))));
                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(0, ((3 * t) + 2))));

                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(1, (3 * t))));
                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(1, ((3 * t) + 1))));
                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(1, ((3 * t) + 2))));

                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(2, (3 * t))));
                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(2, ((3 * t) + 1))));
                            list_GT_t3t1_GlobalTest.push(matrixGT_t3t1.subset(math.index(2, ((3 * t) + 2))));
                        }

                        for (let u = 0; u < (list_x_t1_GlobalTest.length / 3); u++) {
                            matrix_GT_t3t1_EslenikNokta.subset(math.index(0, (3 * u)), list_GT_t3t1_GlobalTest[9 * u]);
                            matrix_GT_t3t1_EslenikNokta.subset(math.index(0, ((3 * u) + 1)), list_GT_t3t1_GlobalTest[(9 * u) + 1]);
                            matrix_GT_t3t1_EslenikNokta.subset(math.index(0, ((3 * u) + 2)), list_GT_t3t1_GlobalTest[(9 * u) + 2]);

                            matrix_GT_t3t1_EslenikNokta.subset(math.index(1, (3 * u)), list_GT_t3t1_GlobalTest[(9 * u) + 3]);
                            matrix_GT_t3t1_EslenikNokta.subset(math.index(1, ((3 * u) + 1)), list_GT_t3t1_GlobalTest[(9 * u) + 4]);
                            matrix_GT_t3t1_EslenikNokta.subset(math.index(1, ((3 * u) + 2)), list_GT_t3t1_GlobalTest[(9 * u) + 5]);

                            matrix_GT_t3t1_EslenikNokta.subset(math.index(2, (3 * u)), list_GT_t3t1_GlobalTest[(9 * u) + 6]);
                            matrix_GT_t3t1_EslenikNokta.subset(math.index(2, ((3 * u) + 1)), list_GT_t3t1_GlobalTest[(9 * u) + 7]);
                            matrix_GT_t3t1_EslenikNokta.subset(math.index(2, ((3 * u) + 2)), list_GT_t3t1_GlobalTest[(9 * u) + 8]);
                        }
                        //---
                        //

                        //---Global Test (T>F Durumunda)
                        //Yer değiştirme vektörü
                        mtrxd_t3i_t1i = math.subtract(matrix_x_t3_EslenikNokta, matrix_x_t1_EslenikNokta);

                        //d nin kofaktör matrisi
                        mtrxQdd_t3i_t1i = math.add(matrix_Qti_1_EslenikNokta, matrix_Qti_3_EslenikNokta);

                        //Karesel form (R)
                        let mtrxQdd_Pseudo_t3i_t1i = math.subtract(math.inv(math.add(mtrxQdd_t3i_t1i, (math.multiply(math.transpose(matrix_GT_t3t1_EslenikNokta), matrix_GT_t3t1_EslenikNokta)))), (math.multiply(math.transpose(matrix_GT_t3t1_EslenikNokta), matrix_GT_t3t1_EslenikNokta)));
                        mtrxR_t3i_t1i = math.multiply(math.transpose(mtrxd_t3i_t1i), mtrxQdd_Pseudo_t3i_t1i, mtrxd_t3i_t1i);

                        //R_t3t1_a = mtrxR_t3i_t1i.get([0, 0]);
                        R_t3t1_b = mtrxR_t3i_t1i.subset(math.index(0, 0));

                        R_t3t1.push(R_t3t1_b);

                        //Birleşik varyans değeri
                        So2_t3i_t1i = math.divide(math.add(math.multiply(Math.pow(tumSo_t1, 2), f_tumiz_t1), math.multiply(Math.pow(tumSo_t3, 2), f_tumiz_t3)), math.add(f_tumiz_t1, f_tumiz_t3));

                        //Test değeri
                        datum_nokta_sayisi_t3t1 = NoktaSayisi_t1 - (ab + 1);
                        //---

                        let h_t3i_t1i = math.subtract(math.multiply(datum_nokta_sayisi_t3t1, 3), 3); // test için datum nokta sayısı kullanılacak
                        T_Test_t3t1 = math.divide(mtrxR_t3i_t1i, math.multiply(So2_t3i_t1i, h_t3i_t1i));

                        Test_t3t1.push(T_Test_t3t1);

                        // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
                        F_Value_t3i_t1i = jStat.centralF.inv(0.95, h_t3i_t1i, math.add(f_tumiz_t1, f_tumiz_t3));
                        //---
                    }

                    Rmin_t3t1 = Math.min.apply(null, R_t3t1);
                    Rmin_index_value_t3t1 = R_t3t1.indexOf(Rmin_t3t1)
                    index_Rmin.push(Rmin_index_value_t3t1);
                    R_t3t1 = [];

                    Test_T_t3t1_ = Test_t3t1[Rmin_index_value_t3t1];
                    Test_T_t3t1 = Test_T_t3t1_.subset(math.index(0, 0));
                    Test_t3t1 = [];

                    //---Global Test (T>F Durumunda)
                    if (index_Rmin.length === (NoktaSayisi_t1 - 1)) {
                        //alert("I am an alert box!");
                        break;
                    }

                    //---Global Test (T<F Durumunda)
                    if (Test_T_t3t1 < F_Value_t3i_t1i) {
                        break;
                    }
                }


                //---Global Test (T>F Durumunda)
                if (index_Rmin.length === (NoktaSayisi_t1 - 1)) {
                    //alert("I am an alert box!");
                    Swal.fire({
                        text: 'Static points not found.',
                        icon: 'info',
                        confirmButtonText: 'Ok',
                    })
                } else {
                    //---Analiz Sonrası Statik Noktaları Getirme
                    static_points_name_t1t3 = [];
                    for (let c = 0; c < NoktaSayisi_t1; c++) {
                        if (index_Rmin.includes(c)) {
                            continue;
                        }
                        static_points_name_t1t3.push(mtrx1t1tumDeng_KOH.subset(math.index(c, 0)));
                    }
                    static_point_count_t1t3 = static_points_name_t1t3.length;
                    //---

                    //---Analiz Sonrası Statik Noktaların Noktalar İçindeki İndex'i
                    static_points_name_index_t1t3_t1 = [];
                    static_points_name_index_t1t3_t3 = [];
                    for (let i = 0; i < static_point_count_t1t3; i++) {
                        let index_static_point_t1 = bazNNunique_t1_lowerCase.indexOf(static_points_name_t1t3[i].toLowerCase());
                        let index_static_point_t3 = bazNNunique_t3_lowerCase.indexOf(static_points_name_t1t3[i].toLowerCase());
                        static_points_name_index_t1t3_t1.push(index_static_point_t1);
                        static_points_name_index_t1t3_t3.push(index_static_point_t3);
                    }
                    static_points_name_index_t1t3_t1.sort(function(a, b){return a-b});
                    static_points_name_index_t1t3_t3.sort(function(a, b){return a-b});
                    //---

                    //---Statik Noktaları Alert'ın içine tablo halinde yazdırma
                    var table_swal_t3t1 = document.createElement('table'),
                        tr, th, td, row, cell;
                    table_swal_t3t1.setAttribute("border", "1 solid black");
                    table_swal_t3t1.setAttribute("style", "border-collapse: collapse; margin-left:auto; margin-right:auto;");

                    for (let row = 0; row < (static_points_name_t1t3.length + 1); row++) { //+1 = başlık olduğu için)
                        tr = document.createElement('tr');
                        if (row === 0) {
                            for (var column1 = 0; column1 < 2; column1++) {
                                if (column1 === 0) {
                                    th = document.createElement('th');
                                    tr.appendChild(th);
                                    th.innerHTML = "Number";
                                } else if (column1 === 1) {
                                    th = document.createElement('th');
                                    tr.appendChild(th);
                                    th.innerHTML = "Point Name";
                                }
                            }
                            table_swal_t3t1.appendChild(tr);
                        } else if (row > 0) {
                            for (let j = 0; j < 2; j++) {
                                if (j === 0) {
                                    td = document.createElement('td');
                                    td.innerHTML = row;
                                    tr.appendChild(td);
                                } else if (j === 1) {
                                    td = document.createElement('td');
                                    td.innerHTML = static_points_name_t1t3[(row - 1)]; // hareketsiz nokta adı gelecek
                                    tr.appendChild(td);
                                }
                            }
                            table_swal_t3t1.appendChild(tr);
                        }
                    }

                    TestStatic_T3T1 = table_swal_t3t1.createCaption();
                    TestStatic_T3T1.innerHTML = '<b>T</b> (' + Test_T_t3t1.toFixed(2) + ')<b> < F </b>(' + F_Value_t3i_t1i.toFixed(2) + ')';
                    TestStatic_T3T1.setAttribute("style", "caption-side: top; text-align:center; color: #ffffff;");

                    Swal.fire({
                        title: '<strong>Static Points</strong>',
                        icon: 'info',
                        html: table_swal_t3t1,
                        focusConfirm: false,
                        confirmButtonText: 'Ok',
                    })
                    //---

                    $("#DeformationTest_t3t1").show();
                    $("#DeformationTest_t2t1").hide();
                    $("#DeformationTest_t3t2").hide();

                    //---Statik ve Statik olmayan noktaların harita üzerinde işaretlenmesi
                    layerGroup_t1t3_StaticPoints = L.layerGroup().addTo(map);
                    layerGroup_t1t3_Non_StaticPoints = L.layerGroup().addTo(map);

                    for (let i = 0; i < static_points_name_t1t3.length; i++) {
                        let sp_index = bazNNunique_t1.indexOf(static_points_name_t1t3[i]);
                        marker_t1t3_StaticPoints = new L.marker([listenlem_tumiz_t1[sp_index], listboylam_tumiz_t1[sp_index]], {
                                icon: sari_nirengi_static_point
                            })
                            .bindPopup(BazDent_Points_t1[sp_index][0])
                        layerGroup_t1t3_StaticPoints.addLayer(marker_t1t3_StaticPoints).addTo(map);
                    }

                    map.setView(new L.LatLng((math.sum(listenlem_kartezyen) / listenlem_kartezyen.length), (math.sum(listboylam_kartezyen) / listboylam_kartezyen.length)), 8);
                }
            })
            //-----
        });
        //---








    } else if ($('#periods').val() == '3') {
        map.removeControl(legend);
        //--- 3. Periyottaki Nokta Adlarını 2. Periyoda Göre Eşleştir ve Eşleşen Noktaların Koordinatlarını Al ---
        var esles3_2_a = [];
        var eslesx3_2_a = [];
        var eslesCoor3_2_a = [];
        for (i = 0; i < NoktaSayisi_t3; i++) {
            for (j = 0, k = 0; j < NoktaSayisi_t3, k < NoktaSayisi_t3 * 3; j++, k += 3) {
                NNt3 = (mtrx1t3tumDeng_KOH.subset(math.index(j, 0))).toLowerCase()
                NNt2 = (mtrx1t2tumDeng_KOH.subset(math.index(i, 0))).toLowerCase()
                if (NNt3.includes(NNt2)) {
                    esles3_2_a.push(mtrx1t3tumDeng_KOH.subset(math.index(j, 1)));
                    esles3_2_a.push(mtrx1t3tumDeng_KOH.subset(math.index(j, 2)));
                    esles3_2_a.push(mtrx1t3tumDeng_KOH.subset(math.index(j, 3)));

                    eslesCoor3_2_a.push(matrix1tumCoor_t3.subset(math.index(k, 0)));
                    eslesCoor3_2_a.push(matrix1tumCoor_t3.subset(math.index(k + 1, 0)));
                    eslesCoor3_2_a.push(matrix1tumCoor_t3.subset(math.index(k + 2, 0)));

                    eslesx3_2_a.push(mtrxDengtum1_1_t3x.subset(math.index(k, 2)));
                    eslesx3_2_a.push(mtrxDengtum1_1_t3x.subset(math.index(k + 1, 2)));
                    eslesx3_2_a.push(mtrxDengtum1_1_t3x.subset(math.index(k + 2, 2)));
                }
            }
        }
        listDengCoor_t3_t2 = esles3_2_a;
        fark_t3_t2 = math.multiply(100, math.subtract(listDengCoor_t3_t2, listDengCoor_t2));
        mtrxd_fark_t3_t2 = math.subtract(listDengCoor_t3_t2, listDengCoor_t2);

        list_xBil_t3_t2 = eslesx3_2_a;
        list_Coor_t3_t2 = eslesCoor3_2_a;

        const rows_list_xBil_t3_2 = NoktaSayisi_t2;
        const columns_list_xBil_t3_2 = 1;
        let matrixZeros_list_xBil_t3_2 = math.zeros(rows_list_xBil_t3_2, columns_list_xBil_t3_2);
        for (i = 0; i < NoktaSayisi_t2 * 3; i += 3) {
            matrixZeros_list_xBil_t3_2.subset(math.index(i, 0), list_xBil_t3_t2[i]);
            matrixZeros_list_xBil_t3_2.subset(math.index(i + 1, 0), list_xBil_t3_t2[i + 1]);
            matrixZeros_list_xBil_t3_2.subset(math.index(i + 2, 0), list_xBil_t3_t2[i + 2]);
        }
        mtrx_xBil_t3_t2 = matrixZeros_list_xBil_t3_2; //Matris formatında.

        var fark_t3_t2_X_a = [];
        var fark_t3_t2_Y_a = [];
        var fark_t3_t2_Z_a = [];
        for (var i = 0; i < NoktaSayisi_t3 * 3; i += 3) {
            fark_t3_t2_X_a.push(fark_t3_t2[i]);
            fark_t3_t2_Y_a.push(fark_t3_t2[i + 1]);
            fark_t3_t2_Z_a.push(fark_t3_t2[i + 2]);
        }
        farkX_t3_t2 = fark_t3_t2_X_a;
        farkY_t3_t2 = fark_t3_t2_Y_a;
        farkZ_t3_t2 = fark_t3_t2_Z_a;

        let matrixZeros_fark_t3_t2 = math.zeros(NoktaSayisi_t2, 4);
        for (i = 0; i < NoktaSayisi_t2; i++) {
            matrixZeros_fark_t3_t2.subset(math.index(i, 0), mtrx1t2tumDeng_KOH.subset(math.index(i, 0)));
            matrixZeros_fark_t3_t2.subset(math.index(i, 1), farkX_t3_t2[i].toFixed(2));
            matrixZeros_fark_t3_t2.subset(math.index(i, 2), farkY_t3_t2[i].toFixed(2));
            matrixZeros_fark_t3_t2.subset(math.index(i, 3), farkZ_t3_t2[i].toFixed(2));
        };
        const matrix_fark_t3_t2 = matrixZeros_fark_t3_t2;
        //---

        /*        $("#CoordDifference").click(function () {
                    //document.getElementById("VelocityVectors").disabled = false;
                    if (typeof layerGroup_t1 === 'undefined' || layerGroup_t1 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t1 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t1)) {
                        map.removeLayer(layerGroup_t1);
                    };
                    if (typeof layerGroup_t2 === 'undefined' || layerGroup_t2 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t2 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t2)) {
                        map.removeLayer(layerGroup_t2);
                    };
                    if (typeof layerGroup_t3 === 'undefined' || layerGroup_t3 === null) {
                        // variable is undefined or null
                        console.log('the layerGroup_t3 is not available...'); // print into console
                    } else if (map.hasLayer(layerGroup_t3)) {
                        map.removeLayer(layerGroup_t3);
                    };
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
                    for (var i = 0; i < NoktaSayisi_t2; i++) {
                        nokta_adi_t3_t2 = mtrx1t2tumDeng_KOH.subset(math.index(i, 0));
                        x_fark_t3_t2 = farkX_t3_t2[i].toFixed(2);
                        y_fark_t3_t2 = farkY_t3_t2[i].toFixed(2);
                        z_fark_t3_t2 = farkZ_t3_t2[i].toFixed(2);
                        var template_fark_t3_t2 =
                            "<table id='table_popup_main'>\
                                  <caption id='table_caption'>Koordinat Fark Tablosu</caption>\
                                  <tr>\
                                    <th id='table_th_1'>Nokta</th>\
                                    <th id='table_th_2' colspan='2'>Koordinat Farkı (cm)</th> \
                                  </tr>\
                                  <tr>\
                                    <th id='table_th_4' rowspan='4'>" + nokta_adi_t3_t2 + "</th>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_1'>X<sub>2-1</sub></td>\
                                    <td id='table_td_2'>" + x_fark_t3_t2 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_5'>Y<sub>2-1</sub></td>\
                                    <td id='table_td_6'>" + y_fark_t3_t2 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_9'>Z<sub>2-1</sub></td>\
                                    <td id='table_td_10'>" + z_fark_t3_t2 + "</td>\
                                  </tr>\
                            </table>"
                        marker_fark_t3_t2 = new L.marker([listenlem_tumiz_t2[i], listboylam_tumiz_t2[i]], {
                                icon: mavi_nirengi
                            })
                            .bindPopup(template_fark_t3_t2)
                        layerGroup_fark_t3_t2.addLayer(marker_fark_t3_t2).addTo(map);
                    }
                    map.setView(new L.LatLng((math.sum(listenlem_tumiz_t2) / listenlem_tumiz_t2.length), (math.sum(listboylam_tumiz_t2) / listboylam_tumiz_t2.length)), 8);


                    // Enable CoordDifference Button
                    document.getElementById("ExportCoordDifference").disabled = false;
                    // Change CoordDifference Button Text
                    document.getElementById("ExportCoordDifference").innerHTML = "<i class='fa fa-file-excel-o'></i> Koordinat Farklarını Exel'e Aktar <sub>(t3-t2)</sub>"

                    document.getElementById("farkCapt").innerHTML = "Koordinat Fark Tablosu (t3-t2)"
                    document.getElementById("farkX").innerHTML = "X <sub>(t3-t2)</sub> cm"
                    document.getElementById("farkY").innerHTML = "Y <sub>(t3-t2)</sub> cm"
                    document.getElementById("farkZ").innerHTML = "Z <sub>(t3-t2)</sub> cm"

                    //--- Tüm-İz Min. dengeleme sonuçlarından oluşan Koordinat Fark Tablosu ---
                    var mytable = document.getElementById('TableDiff')
                    var tblBody = document.createElement("tbody");

                    // creating all cells
                    for (var i = 0; i < NoktaSayisi_t2; i++) {
                        // creates a table row
                        var row = document.createElement("tr");

                        for (var j = 0; j < 4; j++) {
                            // Create a <td> element and a text node, make the text
                            // node the contents of the <td>, and put the <td> at
                            // the end of the table row
                            var cell = document.createElement("td");
                            var cellText = document.createTextNode(matrix_fark_t3_t2.subset(math.index(i, j)));
                            cell.appendChild(cellText);
                            row.appendChild(cell);
                        }
                        // add the row to the end of the table body
                        tblBody.appendChild(row);
                    }
                    mytable.appendChild(tblBody);
                    //---
                });*/

        $("#GlobalTest").hide();
        $("#GlobalTest_t2t1").hide();
        $("#GlobalTest_t3t1").hide();
        $("#GlobalTest_t3t2").show();

        //--- Global Test ---
        $("#GlobalTest_t3t2").click(function () {
            //Yer değiştirme vektörü
            mtrxd_t3t2 = mtrxd_fark_t3_t2;

            //d nin kofaktör matrisi
            const rows_Qt3t2 = NoktaSayisi_t2 * 3;
            const columns_Qt3t2 = NoktaSayisi_t2 * 3;
            let matrixZeros_Qt3t2 = math.zeros(rows_Qt3t2, columns_Qt3t2);
            for (i = 0; i < NoktaSayisi_t2; i++) {
                l = bazNNunique_t2_lowerCase.indexOf(bazNNunique_t3_lowerCase[i]);
                for (m = 0; m < NoktaSayisi_t2; m++) {
                    //Get the cofactor matrices of unknown in Period 3
                    var Qt3_11 = mtrx1tum_QX_t3.subset(math.index((3 * i), (3 * m)));
                    var Qt3_12 = mtrx1tum_QX_t3.subset(math.index((3 * i), ((3 * m) + 1)));
                    var Qt3_13 = mtrx1tum_QX_t3.subset(math.index((3 * i), ((3 * m) + 2)));

                    var Qt3_21 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 1), (3 * m)));
                    var Qt3_22 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 1), ((3 * m) + 1)));
                    var Qt3_23 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 1), ((3 * m) + 2)));

                    var Qt3_31 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 2), (3 * m)));
                    var Qt3_32 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 2), ((3 * m) + 1)));
                    var Qt3_33 = mtrx1tum_QX_t3.subset(math.index(((3 * i) + 2), ((3 * m) + 2)));

                    n = bazNNunique_t2_lowerCase.indexOf(bazNNunique_t3_lowerCase[m]);
                    //Replace the matrixZeros_Qt2t1 with the cofactor matrices of unknown in Period 3
                    matrixZeros_Qt3t2.subset(math.index((3 * l), (3 * n)), Qt3_11);
                    matrixZeros_Qt3t2.subset(math.index((3 * l), ((3 * n) + 1)), Qt3_12);
                    matrixZeros_Qt3t2.subset(math.index((3 * l), ((3 * n) + 2)), Qt3_13);

                    matrixZeros_Qt3t2.subset(math.index(((3 * l) + 1), (3 * n)), Qt3_21);
                    matrixZeros_Qt3t2.subset(math.index(((3 * l) + 1), ((3 * n) + 1)), Qt3_22);
                    matrixZeros_Qt3t2.subset(math.index(((3 * l) + 1), ((3 * n) + 2)), Qt3_23);

                    matrixZeros_Qt3t2.subset(math.index(((3 * l) + 2), (3 * n)), Qt3_31);
                    matrixZeros_Qt3t2.subset(math.index(((3 * l) + 2), ((3 * n) + 1)), Qt3_32);
                    matrixZeros_Qt3t2.subset(math.index(((3 * l) + 2), ((3 * n) + 2)), Qt3_33);
                }
            }
            matrix_Qt3t2 = matrixZeros_Qt3t2

            mtrxQdd_t3t2_f = math.subtract(mtrx1tum_QX_t2, matrix_Qt3t2);
            mtrxQdd_t3t2 = math.add(mtrx1tum_QX_t2, matrix_Qt3t2);

            //Karesel form (R)
            mtrxQdd_Pseudo_t3t2 = math.subtract(math.inv(math.add(mtrxQdd_t3t2, (math.multiply(math.transpose(matrixGT_t2), matrixGT_t2)))), (math.multiply(math.transpose(matrixGT_t2), matrixGT_t2)));
            mtrxR_t3t2 = math.multiply(math.transpose(mtrxd_t3t2), mtrxQdd_Pseudo_t3t2, mtrxd_t3t2);

            //Birleşik varyans değeri
            So2_t3t2 = math.divide(math.add(math.multiply(Math.pow(tumSo_t2, 2), f_tumiz_t2), math.multiply(Math.pow(tumSo_t3, 2), f_tumiz_t3)), math.add(f_tumiz_t2, f_tumiz_t3));

            //Test değeri
            h_t3t2 = math.subtract(math.multiply(NoktaSayisi_t2, 3), 3);
            T_Test_t3t2 = math.divide(mtrxR_t3t2, math.multiply(So2_t3t2, h_t3t2));

            // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
            F_Value_t3t2 = jStat.centralF.inv(0.95, h_t3t2, math.add(f_tumiz_t2, f_tumiz_t3));
            //jStat.centralF.inv(0.95, 9, 3)


            if (T_Test_t3t2 > F_Value_t3t2) {
                Swal.fire({
                    title: 'T > F',
                    html: 'There is deformation at the conjugate points. <p style="font-size:16px;"><br>"T" Test Value = ' + T_Test_t3t2.toFixed(2) + '<br> "F" Limit Value = ' + F_Value_t3t2.toFixed(2) + '</br></p>',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                $("#DatumNokta_t3t2").show();
            } else if (T_Test_t2t1 < F_Value_t2t1) {
                Swal.fire({
                    title: 'T < F',
                    html: 'Eşlenik noktalarda deformasyon yoktur. <p style="font-size:16px;"><br>"T" Test Value = ' + T_Test_t3t2 + '<br> "F" Limit Value = ' + F_Value_t3t2 + '</br></p>',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }


            //-----Calculate Rmin (T>F Durumunda)
            $("#DatumNokta_t3t2").click(function () {

                let index_Rmin = []; //Rmin_indexleri (buradaki değerler nokta sıralarını göstermektedir.)
                for (var ab = 0; ab < NoktaSayisi_t2; ab++) {

                    //E Birim Matris
                    matrixE_t3t2 = math.identity(NoktaSayisi_t2 * 3)
                    //

                    //"GT" Katsayılar Matrisi
                    const rowsGT = 3;
                    const columnsGT = NoktaSayisi_t2 * 3;
                    let matrixZerosGT = math.zeros(rowsGT, columnsGT);
                    for (var i = 0; i < (NoktaSayisi_t2); i++) {
                        matrixZerosGT.subset(math.index(0, (3 * i)), 1);
                        matrixZerosGT.subset(math.index(1, ((3 * i) + 1)), 1);
                        matrixZerosGT.subset(math.index(2, ((3 * i) + 2)), 1);
                    }
                    matrixGT_t3t2 = math.multiply((1 / (math.sqrt(NoktaSayisi_t2))), matrixZerosGT);
                    //

                    //"BT" Katsayılar Matrisi
                    const rowsBT = 3;
                    const columnsBT = NoktaSayisi_t2 * 3;
                    let matrixZerosBT = math.zeros(rowsBT, columnsBT);
                    for (var i = 0; i < (NoktaSayisi_t2); i++) {
                        matrixZerosBT.subset(math.index(0, (3 * i)), 1);
                        matrixZerosBT.subset(math.index(1, ((3 * i) + 1)), 1);
                        matrixZerosBT.subset(math.index(2, ((3 * i) + 2)), 1);
                    }
                    matrixBT_t3t2 = math.multiply((1 / (math.sqrt(NoktaSayisi_t2))), matrixZerosGT);
                    //

                    var R_t3t2 = [];
                    var Test_t3t2 = [];
                    for (var i = 0; i < NoktaSayisi_t2; i++) {
                        //a[i] = 10;
                        matrixBT_t3t2.subset(math.index(0, (3 * i)), 0);
                        matrixBT_t3t2.subset(math.index(1, ((3 * i) + 1)), 0);
                        matrixBT_t3t2.subset(math.index(2, ((3 * i) + 2)), 0);
                        if (i > 0) {
                            for (var k = i - 1; k >= 0; k--) {
                                //a[k] = b[k];
                                matrixBT_t3t2.subset(math.index(0, (3 * k)), matrixGT_t3t2.subset(math.index(0, (3 * k))));
                                matrixBT_t3t2.subset(math.index(1, ((3 * k) + 1)), matrixGT_t3t2.subset(math.index(1, ((3 * k) + 1))));
                                matrixBT_t3t2.subset(math.index(2, ((3 * k) + 2)), matrixGT_t3t2.subset(math.index(2, ((3 * k) + 2))));
                            }
                        }

                        //BT Matrisinde Rmin olan nokta yerine 0 değerinin yazılması
                        if (index_Rmin.length > 0) {
                            for (var a = 0; a < index_Rmin.length; a++) {
                                matrixBT_t3t2.subset(math.index(0, (3 * index_Rmin[a])), 0);
                                matrixBT_t3t2.subset(math.index(1, ((3 * index_Rmin[a]) + 1)), 0);
                                matrixBT_t3t2.subset(math.index(2, ((3 * index_Rmin[a]) + 2)), 0);
                            }
                        }
                        //

                        //S Transformasyon matrisi
                        mtrxS_t3t2 = math.subtract(matrixE_t3t2, math.multiply(math.transpose(matrixGT_t3t2), math.inv(math.multiply(matrixBT_t3t2, math.transpose(matrixGT_t3t2))), matrixBT_t3t2));
                        //

                        //Kısmi-iz Minimum dengelemede "xi" Küçültülmüş Bilinmeyenleri ve "Qi" Bilinmeyenlerin Kofaktör Matrisi
                        let mtrx_xi_t2 = math.multiply(mtrxS_t3t2, mtrx1tum_x_t2);
                        let mtrx_Qi_t2 = math.multiply(mtrxS_t3t2, mtrx1tum_QX_t2, math.transpose(mtrxS_t3t2));

                        let mtrx_xi_t3 = math.multiply(mtrxS_t3t2, mtrx_xBil_t3_t2);
                        let mtrx_Qi_t3 = math.multiply(mtrxS_t3t2, matrix_Qt3t2, math.transpose(mtrxS_t3t2));
                        //

                        //Dengeli Koordinatlar
                        let mtrxKismiDeng_t2 = math.add(matrix1tumCoor_t2, mtrx_xi_t2); //Matris formatında.

                        //---------------
                        const rowslist_Coor_t3_2 = NoktaSayisi_t2;
                        const columnslist_Coor_t3_2 = 1;
                        let matrixZeroslist_Coor_t3_2 = math.zeros(rowslist_Coor_t3_2, columnslist_Coor_t3_2);
                        for (var j = 0; j < NoktaSayisi_t2 * 3; j += 3) {
                            matrixZeroslist_Coor_t3_2.subset(math.index(j, 0), list_Coor_t3_t2[j]);
                            matrixZeroslist_Coor_t3_2.subset(math.index(j + 1, 0), list_Coor_t3_t2[j + 1]);
                            matrixZeroslist_Coor_t3_2.subset(math.index(j + 2, 0), list_Coor_t3_t2[j + 2]);
                        }
                        mtrx_list_Coor_t3_t2 = matrixZeroslist_Coor_t3_2; //Matris formatında.

                        let mtrxKismiDeng_t3 = math.add(mtrx_list_Coor_t3_t2, mtrx_xi_t3); //Matris formatında.
                        //---------------
                        //

                        //Global Test Öncesi Eşlenik Noktaları Alma
                        //---Dengeli Koordinatlar (Kısmi iz Min.)
                        let list_x_t2_GlobalTest = [];
                        let list_x_t3_GlobalTest = [];
                        for (let k = 0; k < NoktaSayisi_t2; k++) {
                            if (matrixBT_t3t2.subset(math.index(0, (3 * k))) == 0) {
                                continue;
                            }
                            list_x_t2_GlobalTest.push(mtrxKismiDeng_t2.subset(math.index((3 * k), 0)));
                            list_x_t2_GlobalTest.push(mtrxKismiDeng_t2.subset(math.index(((3 * k) + 1), 0)));
                            list_x_t2_GlobalTest.push(mtrxKismiDeng_t2.subset(math.index(((3 * k) + 2), 0)));

                            list_x_t3_GlobalTest.push(mtrxKismiDeng_t3.subset(math.index((3 * k), 0)));
                            list_x_t3_GlobalTest.push(mtrxKismiDeng_t3.subset(math.index(((3 * k) + 1), 0)));
                            list_x_t3_GlobalTest.push(mtrxKismiDeng_t3.subset(math.index(((3 * k) + 2), 0)));
                        }

                        let rows_t2_GlobalTest = list_x_t2_GlobalTest.length;
                        let columns_t2_GlobalTest = 1;
                        let matrix_t2_GlobalTest = math.zeros(rows_t2_GlobalTest, columns_t2_GlobalTest);
                        let matrix_t3_GlobalTest = math.zeros(rows_t2_GlobalTest, columns_t2_GlobalTest);
                        for (let m = 0; m < (list_x_t2_GlobalTest.length); m++) {
                            matrix_t2_GlobalTest.subset(math.index(m, 0), list_x_t2_GlobalTest[m]);
                            matrix_t3_GlobalTest.subset(math.index(m, 0), list_x_t3_GlobalTest[m]);
                        }
                        let matrix_x_t2_EslenikNokta = matrix_t2_GlobalTest; //Matris formatında eşlenik noktalar.
                        let matrix_x_t3_EslenikNokta = matrix_t3_GlobalTest; //Matris formatında eşlenik noktalar.
                        //---

                        //---Bilinmeyenlerin Kofaktör Matrisi (Kısmi iz Min.)
                        let rows_Q_t2_GlobalTest = list_x_t2_GlobalTest.length;
                        let columns_Q_t2_GlobalTest = list_x_t2_GlobalTest.length;
                        let matrix_Qti_2_EslenikNokta = math.zeros(rows_Q_t2_GlobalTest, columns_Q_t2_GlobalTest); //Matris formatında eşlenik noktaların kofaktörü.
                        let matrix_Qti_3_EslenikNokta = math.zeros(rows_Q_t2_GlobalTest, columns_Q_t2_GlobalTest); //Matris formatında eşlenik noktaların kofaktörü.

                        let list_Qti_2_EslenikNokta = [];
                        let list_Qti_3_EslenikNokta = [];
                        for (let l = 0; l < NoktaSayisi_t2; l++) {
                            if (matrixBT_t3t2.subset(math.index(0, (3 * l))) == 0) {
                                continue;
                            }
                            for (let p = 0; p < NoktaSayisi_t2; p++) {
                                if (matrixBT_t3t2.subset(math.index(0, (3 * p))) == 0) {
                                    continue;
                                }
                                //Get the cofactor matrices of unknown conjugate points in Period 1
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index((3 * l), (3 * p))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index((3 * l), ((3 * p) + 1))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index((3 * l), ((3 * p) + 2))));

                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 1), (3 * p))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 1), ((3 * p) + 1))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 1), ((3 * p) + 2))));

                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 2), (3 * p))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 2), ((3 * p) + 1))));
                                list_Qti_2_EslenikNokta.push(mtrx_Qi_t2.subset(math.index(((3 * l) + 2), ((3 * p) + 2))));

                                //Get the cofactor matrices of unknown conjugate points in Period 2
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index((3 * l), (3 * p))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index((3 * l), ((3 * p) + 1))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index((3 * l), ((3 * p) + 2)))) //;

                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 1), (3 * p))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 1), ((3 * p) + 1))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 1), ((3 * p) + 2)))) //;

                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 2), (3 * p))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 2), ((3 * p) + 1))));
                                list_Qti_3_EslenikNokta.push(mtrx_Qi_t3.subset(math.index(((3 * l) + 2), ((3 * p) + 2))));
                            }
                        }

                        for (let s = 0; s < (list_x_t2_GlobalTest.length / 3); s++) {
                            for (let r = 0, t = ((list_x_t2_GlobalTest.length / 3) * s); r < (list_x_t2_GlobalTest.length / 3) && t < ((list_x_t2_GlobalTest.length / 3) * (s + 1)); r++, t++) {
                                //Replace the matrix_Qti_2_EslenikNokta with list_Qti_2_EslenikNokta
                                matrix_Qti_2_EslenikNokta.subset(math.index((3 * s), (3 * r)), list_Qti_2_EslenikNokta[9 * t]);
                                matrix_Qti_2_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 1)), list_Qti_2_EslenikNokta[(9 * t) + 1]);
                                matrix_Qti_2_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 2)), list_Qti_2_EslenikNokta[(9 * t) + 2]);

                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 1), (3 * r)), list_Qti_2_EslenikNokta[(9 * t) + 3]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 1)), list_Qti_2_EslenikNokta[(9 * t) + 4]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 2)), list_Qti_2_EslenikNokta[(9 * t) + 5]);

                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 2), (3 * r)), list_Qti_2_EslenikNokta[(9 * t) + 6]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 1)), list_Qti_2_EslenikNokta[(9 * t) + 7]);
                                matrix_Qti_2_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 2)), list_Qti_2_EslenikNokta[(9 * t) + 8]);

                                //Replace the matrix_Qti_2_EslenikNokta with list_Qti_2_EslenikNokta
                                matrix_Qti_3_EslenikNokta.subset(math.index((3 * s), (3 * r)), list_Qti_3_EslenikNokta[9 * t]);
                                matrix_Qti_3_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 1)), list_Qti_3_EslenikNokta[(9 * t) + 1]);
                                matrix_Qti_3_EslenikNokta.subset(math.index((3 * s), ((3 * r) + 2)), list_Qti_3_EslenikNokta[(9 * t) + 2]);

                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 1), (3 * r)), list_Qti_3_EslenikNokta[(9 * t) + 3]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 1)), list_Qti_3_EslenikNokta[(9 * t) + 4]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 1), ((3 * r) + 2)), list_Qti_3_EslenikNokta[(9 * t) + 5]);

                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 2), (3 * r)), list_Qti_3_EslenikNokta[(9 * t) + 6]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 1)), list_Qti_3_EslenikNokta[(9 * t) + 7]);
                                matrix_Qti_3_EslenikNokta.subset(math.index(((3 * s) + 2), ((3 * r) + 2)), list_Qti_3_EslenikNokta[(9 * t) + 8]);
                            }
                        }
                        //---

                        //---GT_t3t2 (Kısmi iz Min.)
                        let rows_GT_t3t2_GlobalTest = 3;
                        let columns_GT_t3t2_GlobalTest = list_x_t2_GlobalTest.length;
                        matrix_GT_t3t2_EslenikNokta = math.zeros(rows_GT_t3t2_GlobalTest, columns_GT_t3t2_GlobalTest); //Matris formatında GT eşlenik noktalar.

                        let list_GT_t3t2_GlobalTest = [];
                        for (let t = 0; t < NoktaSayisi_t2; t++) {
                            if (matrixBT_t3t2.subset(math.index(0, (3 * t))) == 0) {
                                continue;
                            }
                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(0, (3 * t))));
                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(0, ((3 * t) + 1))));
                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(0, ((3 * t) + 2))));

                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(1, (3 * t))));
                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(1, ((3 * t) + 1))));
                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(1, ((3 * t) + 2))));

                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(2, (3 * t))));
                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(2, ((3 * t) + 1))));
                            list_GT_t3t2_GlobalTest.push(matrixGT_t3t2.subset(math.index(2, ((3 * t) + 2))));
                        }

                        for (let u = 0; u < (list_x_t2_GlobalTest.length / 3); u++) {
                            matrix_GT_t3t2_EslenikNokta.subset(math.index(0, (3 * u)), list_GT_t3t2_GlobalTest[9 * u]);
                            matrix_GT_t3t2_EslenikNokta.subset(math.index(0, ((3 * u) + 1)), list_GT_t3t2_GlobalTest[(9 * u) + 1]);
                            matrix_GT_t3t2_EslenikNokta.subset(math.index(0, ((3 * u) + 2)), list_GT_t3t2_GlobalTest[(9 * u) + 2]);

                            matrix_GT_t3t2_EslenikNokta.subset(math.index(1, (3 * u)), list_GT_t3t2_GlobalTest[(9 * u) + 3]);
                            matrix_GT_t3t2_EslenikNokta.subset(math.index(1, ((3 * u) + 1)), list_GT_t3t2_GlobalTest[(9 * u) + 4]);
                            matrix_GT_t3t2_EslenikNokta.subset(math.index(1, ((3 * u) + 2)), list_GT_t3t2_GlobalTest[(9 * u) + 5]);

                            matrix_GT_t3t2_EslenikNokta.subset(math.index(2, (3 * u)), list_GT_t3t2_GlobalTest[(9 * u) + 6]);
                            matrix_GT_t3t2_EslenikNokta.subset(math.index(2, ((3 * u) + 1)), list_GT_t3t2_GlobalTest[(9 * u) + 7]);
                            matrix_GT_t3t2_EslenikNokta.subset(math.index(2, ((3 * u) + 2)), list_GT_t3t2_GlobalTest[(9 * u) + 8]);
                        }
                        //---
                        //

                        //---Global Test (T>F Durumunda)
                        //Yer değiştirme vektörü
                        mtrxd_t3i_t2i = math.subtract(matrix_x_t3_EslenikNokta, matrix_x_t2_EslenikNokta);

                        //d nin kofaktör matrisi
                        mtrxQdd_t3i_t2i = math.add(matrix_Qti_2_EslenikNokta, matrix_Qti_3_EslenikNokta);

                        //Karesel form (R)
                        let mtrxQdd_Pseudo_t3i_t2i = math.subtract(math.inv(math.add(mtrxQdd_t3i_t2i, (math.multiply(math.transpose(matrix_GT_t3t2_EslenikNokta), matrix_GT_t3t2_EslenikNokta)))), (math.multiply(math.transpose(matrix_GT_t3t2_EslenikNokta), matrix_GT_t3t2_EslenikNokta)));
                        mtrxR_t3i_t2i = math.multiply(math.transpose(mtrxd_t3i_t2i), mtrxQdd_Pseudo_t3i_t2i, mtrxd_t3i_t2i);

                        //R_t3t2_a = mtrxR_t3i_t2i.get([0, 0]);
                        R_t3t2_b = mtrxR_t3i_t2i.subset(math.index(0, 0));

                        R_t3t2.push(R_t3t2_b);

                        //Birleşik varyans değeri
                        So2_t3i_t2i = math.divide(math.add(math.multiply(Math.pow(tumSo_t2, 2), f_tumiz_t2), math.multiply(Math.pow(tumSo_t3, 2), f_tumiz_t3)), math.add(f_tumiz_t2, f_tumiz_t3));

                        //Test değeri
                        datum_nokta_sayisi_t3t2 = NoktaSayisi_t2 - (ab + 1);
                        //---

                        let h_t3i_t2i = math.subtract(math.multiply(datum_nokta_sayisi_t3t2, 3), 3); // test için datum nokta sayısı kullanılacak
                        T_Test_t3t2 = math.divide(mtrxR_t3i_t2i, math.multiply(So2_t3i_t2i, h_t3i_t2i));

                        Test_t3t2.push(T_Test_t3t2);

                        // Critical F-value = jStat.centralF.inv(Probability, Deg_freedom1, Deg_freedom2);
                        F_Value_t3i_t2i = jStat.centralF.inv(0.95, h_t3i_t2i, math.add(f_tumiz_t2, f_tumiz_t3));
                        //---
                    }

                    Rmin_t3t2 = Math.min.apply(null, R_t3t2);
                    Rmin_index_value_t3t2 = R_t3t2.indexOf(Rmin_t3t2)
                    index_Rmin.push(Rmin_index_value_t3t2);
                    R_t3t2 = [];

                    Test_T_t3t2_ = Test_t3t2[Rmin_index_value_t3t2];
                    Test_T_t3t2 = Test_T_t3t2_.subset(math.index(0, 0));
                    Test_t3t2 = [];

                    //---Global Test (T>F Durumunda)
                    if (index_Rmin.length === (NoktaSayisi_t2 - 1)) {
                        //alert("I am an alert box!");
                        break;
                    }

                    //---Global Test (T<F Durumunda)
                    if (Test_T_t3t2 < F_Value_t3i_t2i) {
                        break;
                    }
                }


                //---Global Test (T>F Durumunda)
                if (index_Rmin.length === (NoktaSayisi_t2 - 1)) {
                    //alert("I am an alert box!");
                    Swal.fire({
                        text: 'Static points not found.',
                        icon: 'info',
                        confirmButtonText: 'Ok',
                    })
                } else {
                    //---Analiz Sonrası Statik Noktaları Getirme
                    static_points_name_t2t3 = [];
                    for (let c = 0; c < NoktaSayisi_t2; c++) {
                        if (index_Rmin.includes(c)) {
                            continue;
                        }
                        static_points_name_t2t3.push(mtrx1t2tumDeng_KOH.subset(math.index(c, 0)));
                    }
                    static_point_count_t2t3 = static_points_name_t2t3.length;
                    //---

                    //---Analiz Sonrası Statik Noktaların Noktalar İçindeki İndex'i
                    static_points_name_index_t2t3_t2 = [];
                    static_points_name_index_t2t3_t3 = [];
                    for (let i = 0; i < static_point_count_t2t3; i++) {
                        let index_static_point_t2 = bazNNunique_t2_lowerCase.indexOf(static_points_name_t2t3[i].toLowerCase());
                        let index_static_point_t3 = bazNNunique_t3_lowerCase.indexOf(static_points_name_t2t3[i].toLowerCase());
                        static_points_name_index_t2t3_t2.push(index_static_point_t2);
                        static_points_name_index_t2t3_t3.push(index_static_point_t3);
                    }
                    static_points_name_index_t2t3_t2.sort(function(a, b){return a-b});
                    static_points_name_index_t2t3_t3.sort(function(a, b){return a-b});
                    //---

                    //---Statik Noktaları Alert'ın içine tablo halinde yazdırma
                    var table_swal_t3t2 = document.createElement('table'),
                        tr, th, td, row, cell;
                    table_swal_t3t2.setAttribute("border", "1 solid black");
                    table_swal_t3t2.setAttribute("style", "border-collapse: collapse; margin-left:auto; margin-right:auto;");

                    for (let row = 0; row < (static_points_name_t2t3.length + 1); row++) { //+1 = başlık olduğu için)
                        tr = document.createElement('tr');
                        if (row === 0) {
                            for (var column1 = 0; column1 < 2; column1++) {
                                if (column1 === 0) {
                                    th = document.createElement('th');
                                    tr.appendChild(th);
                                    th.innerHTML = "Number";
                                } else if (column1 === 1) {
                                    th = document.createElement('th');
                                    tr.appendChild(th);
                                    th.innerHTML = "Point Name";
                                }
                            }
                            table_swal_t3t2.appendChild(tr);
                        } else if (row > 0) {
                            for (let j = 0; j < 2; j++) {
                                if (j === 0) {
                                    td = document.createElement('td');
                                    td.innerHTML = row;
                                    tr.appendChild(td);
                                } else if (j === 1) {
                                    td = document.createElement('td');
                                    td.innerHTML = static_points_name_t2t3[(row - 1)]; // hareketsiz nokta adı gelecek
                                    tr.appendChild(td);
                                }
                            }
                            table_swal_t3t2.appendChild(tr);
                        }
                    }

                    TestStatic_T3T2 = table_swal_t3t2.createCaption();
                    TestStatic_T3T2.innerHTML = '<b>T</b> (' + Test_T_t3t2.toFixed(2) + ')<b> < F </b>(' + F_Value_t3i_t2i.toFixed(2) + ')';
                    TestStatic_T3T2.setAttribute("style", "caption-side: top; text-align:center; color: #ffffff;");

                    Swal.fire({
                        title: '<strong>Static Points</strong>',
                        icon: 'info',
                        html: table_swal_t3t2,
                        focusConfirm: false,
                        confirmButtonText: 'Ok',
                    })
                    //---

                    $("#DeformationTest_t3t2").show();
                    $("#DeformationTest_t2t1").hide();
                    $("#DeformationTest_t3t1").hide();

                    //---Statik ve Statik olmayan noktaların harita üzerinde işaretlenmesi
                    layerGroup_t2t3_StaticPoints = L.layerGroup().addTo(map);
                    layerGroup_t2t3_Non_StaticPoints = L.layerGroup().addTo(map);

                    for (let i = 0; i < static_points_name_t2t3.length; i++) {
                        let sp_index = bazNNunique_t2.indexOf(static_points_name_t2t3[i]);
                        marker_t2t3_StaticPoints = new L.marker([listenlem_tumiz_t2[sp_index], listboylam_tumiz_t2[sp_index]], {
                                icon: sari_nirengi_static_point
                            })
                            .bindPopup(BazDent_Points_t2[sp_index][0])
                        layerGroup_t2t3_StaticPoints.addLayer(marker_t2t3_StaticPoints).addTo(map);
                    }

                    map.setView(new L.LatLng((math.sum(listenlem_kartezyen) / listenlem_kartezyen.length), (math.sum(listboylam_kartezyen) / listboylam_kartezyen.length)), 8);
                }
            })
            //-----
        });
        //---



    }
});
