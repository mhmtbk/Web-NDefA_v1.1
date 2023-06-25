function doOpen_t2(evt) {
    var files = evt.target.files,
        reader = new FileReader();
    reader.addEventListener("load", function () {
        showout.value = this.result;
        // Entire file
        //console.log(this.result);

        //Choose Label
    var a_123_t2 = document.getElementById('openselect_t2');
    if(a_123_t2.value == "")
    {
        fileLabel_t2.innerHTML = "Choose file";
    }
    else
    {
        var theSplit = a_123_t2.value.split('\\');
        fileLabel_t2.innerHTML = theSplit[theSplit.length-1];
    }

        // By lines
        var lines = this.result.split('\n');
        var list = [];
        for (var line = 0; line < lines.length; line++) {
            list.push(lines[line]);
        }
        var LGO_txt = list; //Baseline Solution file in .txt format uploaded.

        // Strings Manipulate _____________________________________________ Start

        // ------------------------ Gets Rows - Start
        // ------------ Gets rows with "REF" in them (Gets rows of reference points.)
        var listCoorRefRaw = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if (LGO_txt[i].includes("REF")) {
                listCoorRefRaw.push(LGO_txt[i]);
            }
        }
        var CoorRefRaw = listCoorRefRaw; //CoorRefRaw = Get the rows with "REF" in the LGO_txt variable.
        // ------------

        // ------------ Gets rows with "@+ and @-" in them (Get rows of referance (@+) and rover (@-) stations in Baselines.)
        var listBazRaw = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if (LGO_txt[i].includes("@+")) {
                listBazRaw.push(LGO_txt[i]);
                listBazRaw.push(LGO_txt[i + 1]);
            }
        }
        var bazRaw = listBazRaw; //bazRaw = LGO_txt takes the rows with "@+" and prints the lines with "@+ @-" to find the total baselines.
        // ------------

        // ------------ Gets rows with "@=" in them.
        var listBazCovarianceRow = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if (LGO_txt[i].includes("@=")) {
                listBazCovarianceRow.push(LGO_txt[i]);
            }
        }
        var BazCovarianceRow = listBazCovarianceRow; // BazCovarianceRow = Variance-covariance information for baseline vector. Gets rows with "@=" in the LGO_txt variable. These rows contain m0 (s0) and the covariance matrix of measures (upper triangular).
        // ------------

        // ------------ Gets rows with "@# and REF or @# and MEAN" in them.
        var listRefMean = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if ((LGO_txt[i].includes("@#") && LGO_txt[i].includes("REF")) || (LGO_txt[i].includes("@#") && LGO_txt[i].includes("MEAN"))) {
                listRefMean.push(LGO_txt[i]);
            }
        }
        var bazRefMeanRaw = listRefMean; //bazRefMeanRaw = Gets rosws with "@# and "REF" or "@#" and "MEAN" " in the LGO_txt variable.
        // ------------
        // ------------------------ Gets Rows - End

        // ------------------------ Manipulate The Rows - Start
        // ------------ Deleting the first two letters in the rows containing "REF", getting stations names and cartesian coordinates.
        var list3 = [];
        var list4 = [];
        for (i = 0; i < CoorRefRaw.length; i++) {
            list3.push(CoorRefRaw[i].toString());
            list4.push(list3[i].slice(2, 64));
        }
        var CoorRef = list4; //It contains the Cartesian coordinates of the reference points.
        // ------------

        // ------------ Deleting the first two letters in the rows containing "@# and REF or @# and MEAN".
        var listRefMean_1 = [];
        var listRefMean_2 = [];
        for (i = 0; i < bazRefMeanRaw.length; i++) {
            listRefMean_1.push(bazRefMeanRaw[i].toString());
            listRefMean_2.push(listRefMean_1[i].substr(2));
        }
        var ListRefMean = listRefMean_2; //Contains rows with "@# and REF or @# and MEAN".
        // ------------

        // ------------ Deleting the first two letters in the rows containing "@+ ve @-".
        var listbazRaw1 = [];
        var listbazRaw2 = [];
        for (i = 0; i < bazRaw.length; i++) {
            listbazRaw1.push(bazRaw[i].toString());
            listbazRaw2.push(listbazRaw1[i].substr(2));
        }
        var baz = listbazRaw2; //Contains baseline stations.
        // ------------

        // ------------ Deleting the first two letters in the rows containing "@=".
        var BazCovarianceRowSubs1 = [];
        var BazCovarianceRowSubs2 = [];
        for (i = 0; i < BazCovarianceRow.length; i++) {
            BazCovarianceRowSubs1.push(BazCovarianceRow[i].toString());
            BazCovarianceRowSubs2.push(BazCovarianceRowSubs1[i].substr(2));
        }
        var BazCofactor1 = BazCovarianceRowSubs2; //It includes variances and covariances of measures.
        // ------------

        // ------------ Deleting spaces in rows containing "REF"
        function myTrim(x) {
            return x.replace(/ +(?= )/g, '');
        }

        var list5 = [];
        var list6 = [];
        for (i = 0; i < list4.length; i++) {
            list5.push(myTrim(list4[i]));
            list6.push(list5[i].split(" "));
        }
        var CoorRefSplit = list6; //It contains the Cartesian coordinates of the reference points splited by the spaces between them.
        // ------------

        // ------------ İçerisinde "@+ ve @-" geçen satırlardaki boşlukları silme
        var listbaz1 = [];
        var listbaz2 = [];
        for (i = 0; i < baz.length; i++) {
            listbaz1.push(myTrim(baz[i]));
            listbaz2.push(listbaz1[i].split(" "));
        }
        var bazSplit = listbaz2; //The values in the lines with the baseline stations are split according to the spaces between them.
        // ------------

        // ------------ Deleting spaces in rows containing "@="
        var BazCof1 = [];
        var BazCof2 = [];
        var BazCof3 = [];
        for (i = 0; i < BazCofactor1.length; i++) {
            BazCof1.push(myTrim(BazCofactor1[i]));
            BazCof2.push(BazCof1[i].split(" "));
            BazCof3.push(BazCof2[i].splice(1, BazCof2[i].length));
        }
        var BazCofactor = BazCof3; //It contains the values in the rows where the cofactor matrix (upper triangular) of the measures are splitted according to the spaces between them.*****
        // ------------

        // ------------ Deleting spaces in rows containing "@# ve REF veya  @# ve MEAN"
        var listRefMean_3 = [];
        var listRefMean_4 = [];
        for (i = 0; i < ListRefMean.length; i++) {
            listRefMean_3.push(myTrim(ListRefMean[i]));
            listRefMean_4.push(listRefMean_3[i].split(" "));
        }
        var PointsRefMean = listRefMean_4; // listRefMean contains its points split according to the spaces between their coordinates.
        // ------------

        // ------------ Gets rows with "@+ and @-" in them.
        var listbazNN = [];
        for (i = 0; i < baz.length; i++) {
            listbazNN.push(bazSplit[i][0]);
        }
        // baseline stations *****
        var bazNN = listbazNN;

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        //Stations unique names in baselines
        bazNNunique_t2 = bazNN.filter(onlyUnique);
        Noktalar_t2 = bazNN.filter(onlyUnique); //Station names, T2 (for Sgnf)
        Noktalar_t2_t3t2 = bazNN.filter(onlyUnique); //Stations names to be used in T3T2 analysis (for Sgnf)

        bazNNunique_t2_lowerCase = [];
        for (i = 0; i < bazNNunique_t2.length; i++) {
            bazNNunique_t2_lowerCase.push(bazNNunique_t2[i].toLowerCase());
        }
        // ------------

        // ------------ Gets rows with "@-" in them.
        var listbazCoor = [];
        for (i = 1; i < baz.length; i += 2) {
            listbazCoor.push(bazSplit[i][1]);
            listbazCoor.push(bazSplit[i][2]);
            listbazCoor.push(bazSplit[i][3]);
        }
        //Baseline Coordinates (∆x, ∆y, ∆z) *****
        var bazCoor = listbazCoor;
        // ------------

        const rowsCoorbaz = (bazCoor.length);
        const columnsCoorbaz = 1;
        let matrixZerosCoorbaz = math.zeros(rowsCoorbaz, columnsCoorbaz);
        for (i = 0; i < bazCoor.length; i++) {
            baz_Coor = bazCoor[i];
            matrixZerosCoorbaz.subset(math.index(i, 0), baz_Coor);
        }
        //matrix1Coorbaz: Display of baseline coordinates (∆x, ∆y, ∆z) in matrix format. *****
        matrix1Coorbaz = matrixZerosCoorbaz;
        // ------------------------ Manipulate The Rows - End

        // ------------------------ Manipulate The Rows (For Baseline Control) - Start
        //------------ Gets rows with "@# and REF or @# and MEAN" in them.
        var BazDent_RefMean = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if ((LGO_txt[i].includes("@#") && LGO_txt[i].includes("REF")) || (LGO_txt[i].includes("@#") && LGO_txt[i].includes("MEAN"))) {
                BazDent_RefMean.push(LGO_txt[i]);
            }
        }
        var BazDent_RefMean_Raw = BazDent_RefMean;
        // ------------

        // ------------ Deleting the first two letters in the rows containing "@# ve REF veya  @# ve MEAN".
        var BazDent_RefMean_1 = [];
        var BazDent_RefMean_2 = [];
        for (i = 0; i < BazDent_RefMean_Raw.length; i++) {
            BazDent_RefMean_1.push(BazDent_RefMean_Raw[i].toString());
            BazDent_RefMean_2.push(BazDent_RefMean_1[i].substr(2));
        }
        var List_BazDent_RefMean = BazDent_RefMean_2;
        // ------------

        // ------------ Deleting spaces in rows containing "@# ve REF veya  @# ve MEAN".
        var BazDent_RefMean_3 = [];
        var BazDent_RefMean_4 = [];
        for (i = 0; i < List_BazDent_RefMean.length; i++) {
            BazDent_RefMean_3.push(myTrim(List_BazDent_RefMean[i]));
            BazDent_RefMean_4.push(BazDent_RefMean_3[i].split(" "));
        }
        var BazDent_Points_t2RefMean = BazDent_RefMean_4;
        // ------------

        // ------------ Getting the first of the rows with "@# and REF or @# and MEAN" in it.
        var BazDent_listRefandMean1 = [];
        var BazDent_listRefandMean2 = [];
        for (i = 0; i < bazNNunique_t2.length; i++) {
            for (j = 0; j < BazDent_Points_t2RefMean.length; j++) {
                if (BazDent_Points_t2RefMean[j].includes(bazNNunique_t2[i])) {
                    BazDent_listRefandMean1.push(BazDent_Points_t2RefMean[j]);
                }
            }
            BazDent_listRefandMean2.push(BazDent_listRefandMean1[0]);
            BazDent_listRefandMean1.splice(0, BazDent_listRefandMean1.length);
        }
        BazDent_Points_t2 = BazDent_listRefandMean2
        // ------------------------ Manipulate The Rows (For Baseline Control) - End

        // Strings Manipulate _____________________________________________ End

        // ------------------- Cartesian Points Latitude, Longitude Calc.
        // ʎ longitude calc.
        listboylam_kartezyen_t2 = [];
        for (var i = 0; i < BazDent_Points_t2.length; i++) {
            var Xcoor = BazDent_Points_t2[i][1];
            var Ycoor = BazDent_Points_t2[i][2];
            function boylam(X, Y) {
                if (X === 0 && Y > 0) {
                    return 0;
                } else if (X > 0 && Y > 0) {
                    return (math.atan(Y / X)) * (180 / Math.PI); // ʎ east.
                } else if (X < 0 && Y >= 0) {
                    return 180 - ((math.atan(math.abs(Y / X))) * (180 / Math.PI)); // ʎ east.
                } else if (X > 0 && Y < 0) {
                    return (math.atan(Y / X)) * (180 / Math.PI); // ʎ west.
                } else if (X < 0 && Y <= 0) {
                    return -180 + ((math.atan(Y / X)) * (180 / Math.PI)); // ʎ west.
                }
            }
            var x = boylam(Xcoor, Ycoor);
            listboylam_kartezyen_t2.push(x);
        }
        //

        // φ latitude calc
        listenlem_kartezyen_t2 = [];
        let listro = [];
        for (var j = 0; j < BazDent_Points_t2.length; j++) {
            X = parseFloat(BazDent_Points_t2[j][1]);
            Y = parseFloat(BazDent_Points_t2[j][2]);
            Z = parseFloat(BazDent_Points_t2[j][3]);

            //Geometric parameters of the GRS80 ellipsoid
            a_XYZ = 6378137.0;
            b_XYZ = 6356752.3141;
            e2_XYZ = (Math.pow(a_XYZ, 2) - Math.pow(b_XYZ, 2)) / Math.pow(a_XYZ, 2);

            enlem = [];
            φ = [];
            ρ = [];
            ro = [];
            φ[0] = 0;
            for (i = 0; i < Infinity; i++) {
                ρ[i] = (a_XYZ / math.sqrt(1 - (e2_XYZ * math.pow(math.sin(φ[i] * Math.PI / 180), 2))))
                φ[i + 1] = math.atan((Z + (e2_XYZ * ρ[i] * math.sin(φ[i] * Math.PI / 180))) / math.sqrt(math.pow(X, 2) + math.pow(Y, 2))) * (180 / Math.PI);

                if ((math.abs((φ[i + 1] - φ[i])) * 3600) <= 0.00001) {
                    listenlem_kartezyen_t2.push((φ[i + 1])); //enlem = (φ[i + 1]); //enlem.push(φ[i + 1]);

                    ro = (a_XYZ / math.sqrt(1 - (e2_XYZ * math.pow(math.sin(φ[i + 1] * Math.PI / 180), 2))));
                    listro.push(ro);
                    break;
                }
            }
        }
        //

        // h calculation of ellipsoid height (all points)
        h_elipsoit_yuk_t02 = [];
        for (var j = 0; j < BazDent_Points_t2.length; j++) {
            var X = parseFloat(BazDent_Points_t2[j][1]);
            var h1 = math.divide(X, (math.cos(listenlem_kartezyen_t2[j] * Math.PI / 180) * math.cos(listboylam_kartezyen_t2[j] * Math.PI / 180)));
            var payda_N = math.sqrt(1 - (e2_XYZ * (math.pow(math.sin(listenlem_kartezyen_t2[j] * Math.PI / 180), 2))))
            let N_GRS80 = math.divide(a_XYZ, payda_N);
            h_elipsoit_yuk_t02.push(h1 - N_GRS80);
        }
        //
        //-------------------

        //XYZ Lat Long h All (Matrix Format)
        XYZ_LatLong_t2 = math.zeros(BazDent_Points_t2.length, 7);
        for (let i = 0; i < BazDent_Points_t2.length; i++) {
            let P_XYZ = BazDent_Points_t2[i][0];
            let X_XYZ = parseFloat(BazDent_Points_t2[i][1]).toFixed(3);
            let Y_XYZ = parseFloat(BazDent_Points_t2[i][2]).toFixed(3);
            let Z_XYZ = parseFloat(BazDent_Points_t2[i][3]).toFixed(3);
            let Enlem_XYZ = listenlem_kartezyen_t2[i].toFixed(7);
            let Boylam_XYZ = listboylam_kartezyen_t2[i].toFixed(7);
            let h_XYZ = h_elipsoit_yuk_t02[i].toFixed(5);

            XYZ_LatLong_t2.subset(math.index(i, 0), P_XYZ);
            XYZ_LatLong_t2.subset(math.index(i, 1), X_XYZ);
            XYZ_LatLong_t2.subset(math.index(i, 2), Y_XYZ);
            XYZ_LatLong_t2.subset(math.index(i, 3), Z_XYZ);
            XYZ_LatLong_t2.subset(math.index(i, 4), Enlem_XYZ);
            XYZ_LatLong_t2.subset(math.index(i, 5), Boylam_XYZ);
            XYZ_LatLong_t2.subset(math.index(i, 6), h_XYZ);
        }
        //

        var layerGroup_kartezyen = L.layerGroup().addTo(map);
        var layerGroup_tumiz = L.layerGroup().addTo(map);
        var layerGroup_zorlamasiz = L.layerGroup().addTo(map);
        layerGroup_t2 = L.layerGroup().addTo(map);

        // ------------------- Cartesian Points Marker
        for (var i = 0; i < BazDent_Points_t2.length; i++) {
            marker_kartezyen = new L.marker([listenlem_kartezyen_t2[i], listboylam_kartezyen_t2[i]], {
                    icon: beyaz_nirengi
                })
                .bindPopup(BazDent_Points_t2[i][0])
                .bindTooltip(BazDent_Points_t2[i][0], {permanent: true, className: 'leaflet-tooltip-own'})
            layerGroup_kartezyen.addLayer(marker_kartezyen).addTo(map);
            layerGroup_t2.addLayer(marker_kartezyen);
        }
        map.setView(new L.LatLng((math.sum(listenlem_kartezyen_t2) / listenlem_kartezyen_t2.length), (math.sum(listboylam_kartezyen_t2) / listboylam_kartezyen_t2.length)), 8);


        var cartesian_marker_t2 = layerGroup_kartezyen;
        $('input:checkbox[name=cartesian_t2]').click(function () {
            if (map.hasLayer(cartesian_marker_t2)) {
                map.removeLayer(cartesian_marker_t2);
            } else {
                map.addLayer(cartesian_marker_t2);
            };
        });
        // -------------------

        // ------------------- Baseline Vectors
        const rowstumEnlem_Boylam = BazDent_Points_t2.length; //Points Number
        const columnstumEnlem_Boylam = 3;
        let matrixZerostumEnlemBoylam = math.zeros(rowstumEnlem_Boylam, columnstumEnlem_Boylam);
        for (i = 0; i < BazDent_Points_t2.length; i++) {
            matrixZerostumEnlemBoylam.subset(math.index(i, 0), BazDent_Points_t2[i][0]);
            matrixZerostumEnlemBoylam.subset(math.index(i, 1), listenlem_kartezyen_t2[i]);
            matrixZerostumEnlemBoylam.subset(math.index(i, 2), listboylam_kartezyen_t2[i]);
        }
        mtrx1tumEnlemBoylam = matrixZerostumEnlemBoylam; //3 columns all Point Name and Latitude, Longitude  *****

        const rowsbazEnlemBoylam = baz.length * 2;
        const columnsbazEnlemBoylam = 3;
        let matrixZerosbazEnlemBoylam = math.zeros(rowsbazEnlemBoylam, columnsbazEnlemBoylam);
        for (i = 0; i < baz.length * 2; i++) {
            for (j = 0; j < BazDent_Points_t2.length; j++) {
                if (mtrx1tumEnlemBoylam.subset(math.index(j, 0)) === bazNN[i]) {
                    matrixZerosbazEnlemBoylam.subset(math.index(i, 0), mtrx1tumEnlemBoylam.subset(math.index((j), 0)));
                    matrixZerosbazEnlemBoylam.subset(math.index(i, 1), mtrx1tumEnlemBoylam.subset(math.index((j), 1)));
                    matrixZerosbazEnlemBoylam.subset(math.index(i, 2), mtrx1tumEnlemBoylam.subset(math.index((j), 2)));
                }
            }
        }
        matrix1bazEnlemBoylam = matrixZerosbazEnlemBoylam; //3 column display of all baseline stations Point Name, Latitude, Longitude *****

        var baselines = [];
        for (i = 0; i < baz.length; i += 2) {
            j = i;
            k = i + 1;
            enlem1 = matrix1bazEnlemBoylam.subset(math.index((j), 1));
            boylam1 = matrix1bazEnlemBoylam.subset(math.index((j), 2));
            enlem2 = matrix1bazEnlemBoylam.subset(math.index((k), 1));
            boylam2 = matrix1bazEnlemBoylam.subset(math.index((k), 2));

            var multiCoords1 = [
                            [[enlem1, boylam1],
                             [enlem2, boylam2]]
                            ];

            var baseline_polyline = L.polyline(multiCoords1, {
                color: 'red', //rgb(255, 255, 255)
                weight: 1,
                //smoothFactor: 1
            });

            var baseline_vector = L.polylineDecorator(multiCoords1, {
                patterns: [{
                    offset: 25,
                    repeat: 250,
                    symbol: L.Symbol.arrowHead({
                        pixelSize: 10,
                        pathOptions: {
                            color: 'red', //rgb(255, 255, 255)
                            fillOpacity: 1,
                            weight: 0
                        }
                    })
                            }]
            });
            baselines.push(baseline_polyline);
            baselines.push(baseline_vector);
        }
        var BaselinesVector = L.layerGroup(baselines).addTo(map);

        $('input:checkbox[name=baseline_t2]').click(function () {
            if (map.hasLayer(BaselinesVector)) {
                map.removeLayer(BaselinesVector);
            } else {
                map.addLayer(BaselinesVector);
            };
        });
        // -------------------

        // ------------ Total Number of Points and Total Number of Baselines in the Network
        NoktaSayisi_t2 = bazNNunique_t2.length; //Total Number of Points.
        BazSayisi_t2 = (baz.length) / 2; //Total Number of Baselines.
        // ------------

        // ------------ Points dropdown
        for (var i = 0; i < CoorRef.length; i++) {
            var option = document.createElement('option');
            option.text = CoorRefSplit[i][0];
            option.value = CoorRefSplit[i][0];
            var select = document.getElementById("Sta_t2");
            select.appendChild(option);
        }
        // ------------------------

        // ------------ "l" Matrix
        var listRefandMean1 = [];
        var listRefandMean2 = [];
        for (i = 0; i < bazNNunique_t2.length; i++) {
            for (j = 0; j < PointsRefMean.length; j++) {
                if (PointsRefMean[j].includes(bazNNunique_t2[i])) {
                    listRefandMean1.push(PointsRefMean[j]);
                }
            }
            listRefandMean2.push(listRefandMean1[0]);
            listRefandMean1.splice(0, listRefandMean1.length);
        }
        var PointsRefMean = listRefandMean2 //PointsRefMean: Points in the "REF and MEAN" property for the l matrix. *****

        const rows_l = BazSayisi_t2 * 3;
        const columns_l = 1;
        let matrixZeros_l = math.zeros(rows_l, columns_l);

        for (k = 0, l = 1; k < BazSayisi_t2 && l < (BazSayisi_t2 * 2); k++, l += 2) {
            i = bazNNunique_t2.indexOf(bazNN[l - 1]);
            j = bazNNunique_t2.indexOf(bazNN[l]);

            RefCoorX = PointsRefMean[i][1];
            RefCoorY = PointsRefMean[i][2];
            RefCoorZ = PointsRefMean[i][3];

            RvrCoorX = PointsRefMean[j][1];
            RvrCoorY = PointsRefMean[j][2];
            RvrCoorZ = PointsRefMean[j][3];

            BazMeasX = bazSplit[l][1];
            BazMeasY = bazSplit[l][2];
            BazMeasZ = bazSplit[l][3];

            matrixZeros_l.subset(math.index((3 * k), 0), -(RvrCoorX - RefCoorX - BazMeasX));
            matrixZeros_l.subset(math.index(((3 * k) + 1), 0), -(RvrCoorY - RefCoorY - BazMeasY));
            matrixZeros_l.subset(math.index(((3 * k) + 2), 0), -(RvrCoorZ - RefCoorZ - BazMeasZ));
        }
        matrix1l_t2 = matrixZeros_l
        // ------------------------

        // ------------ "Qll" Matrix
        const rows_Qll = BazSayisi_t2 * 3;
        const columns_Qll = BazSayisi_t2 * 3;;
        let matrixZeros_Qll = math.zeros(rows_Qll, columns_Qll);

        for (k = 0; k < BazSayisi_t2; k++) {
            Q11 = BazCofactor[k][1];
            Q12 = BazCofactor[k][2];
            Q13 = BazCofactor[k][3];
            Q22 = BazCofactor[k][4];
            Q23 = BazCofactor[k][5];
            Q33 = BazCofactor[k][6];

            matrixZeros_Qll.subset(math.index((3 * k), (3 * k)), Q11);
            matrixZeros_Qll.subset(math.index((3 * k), ((3 * k) + 1)), Q12);
            matrixZeros_Qll.subset(math.index((3 * k), ((3 * k) + 2)), Q13);

            matrixZeros_Qll.subset(math.index(((3 * k) + 1), (3 * k)), Q12);
            matrixZeros_Qll.subset(math.index(((3 * k) + 1), ((3 * k) + 1)), Q22);
            matrixZeros_Qll.subset(math.index(((3 * k) + 1), ((3 * k) + 2)), Q23);

            matrixZeros_Qll.subset(math.index(((3 * k) + 2), (3 * k)), Q13);
            matrixZeros_Qll.subset(math.index(((3 * k) + 2), ((3 * k) + 1)), Q23);
            matrixZeros_Qll.subset(math.index(((3 * k) + 2), ((3 * k) + 2)), Q33);
        }
        matrix1Qll_t2 = matrixZeros_Qll
        // ------------------------

        // ------------ Points and Coordinates
        var ListCoor = []; //All network points (SN X Y Z)
        for (i = 0; i < PointsRefMean.length; i++) {
            ListCoor.push(PointsRefMean[i].splice(0, 4));
        }
        //Network Points and Coordinates *****
        var Coor = ListCoor;
        // ------------

        // Enable Export Excel Button and Basline Vectors Button
        document.getElementById("KartezyenControlID_2").disabled = false;
        document.getElementById("baseline_vectors_2").disabled = false;
        $('#b_line_vectors_2').show();
        $('#cartesian_points_t2').show();
        // ------------

        // -------------------------- Free Adjustment
        document.getElementsByName("DOM_CM_t2")[0].disabled = false;
        document.getElementById("WZ_t2").disabled = false;

        //--- Show/Hide Central Meridians ---
        $('input:checkbox[name=DOM_CM_t2]').click(function () {
            if (map.hasLayer(DOM_CM_t2)) {
                map.removeLayer(DOM_CM_t2);
            } else {
                map.addLayer(DOM_CM_t2);
            }
        });

        $("#WZ_t2").change(function () {
            document.getElementById("CM_t2").disabled = false;
            if ($(this).val() == "WZ_t2_6") {
                $('#CM_t2 option[value="CM_t2_2"]').hide();
                $('#CM_t2 option[value="CM_t2_4"]').hide();
                $('#CM_t2 option[value="CM_t2_6"]').hide();
                m0_UTM = 0.9996;
            } else {
                $('#CM_t2 option[value="CM_t2_2"]').show();
                $('#CM_t2 option[value="CM_t2_4"]').show();
                $('#CM_t2 option[value="CM_t2_6"]').show();
                m0_UTM = 1;
            }
        });

        $("#CM_t2").change(function () {
            document.getElementById("tumizdeng_2").disabled = false;
        });

        $("#tumizdeng_2").click(function () {
            document.getElementById("ExportTumIzDengControlID2").disabled = false;
            document.getElementById("ExportTumIzDengDentControlID2").disabled = false;
            document.getElementById("ExportRedundans_t2").disabled = false;
            document.getElementById("ExportIcDisGuven_t2").disabled = false;
            document.getElementById("UyusumsuzOlcu_t2").disabled = false;

            // ------------------- Matrix for Free Adjustment
            // ------------ "A" Matrix
            const rowsTumIz = BazSayisi_t2 * 3;
            const columnsTumIz = NoktaSayisi_t2 * 3;
            let matrixZerosTumIzMtrxA = math.zeros(rowsTumIz, columnsTumIz);

            for (k = 0, l = 0; k < BazSayisi_t2 && l < (BazSayisi_t2 * 2); k++, l += 2) {
                i = bazNNunique_t2.indexOf(bazNN[l]);
                j = bazNNunique_t2.indexOf(bazNN[l + 1]);

                matrixZerosTumIzMtrxA.subset(math.index((3 * k), [(3 * i), (3 * j)]), [-1, 1]);
                matrixZerosTumIzMtrxA.subset(math.index(((3 * k) + 1), [((3 * i) + 1), ((3 * j) + 1)]), [-1, 1]);
                matrixZerosTumIzMtrxA.subset(math.index(((3 * k) + 2), [((3 * i) + 2), ((3 * j) + 2)]), [-1, 1]);
            }
            TumIzMtrx1A_t2 = matrixZerosTumIzMtrxA
            // ------------

            // ------------ "GT" Matrix
            const rowsGT = 3;
            const columnsGT = NoktaSayisi_t2 * 3;
            let matrixZerosGT = math.zeros(rowsGT, columnsGT);

            for (k = 0; k < (NoktaSayisi_t2); k++) {
                matrixZerosGT.subset(math.index(0, (3 * k)), 1);
                matrixZerosGT.subset(math.index(1, ((3 * k) + 1)), 1);
                matrixZerosGT.subset(math.index(2, ((3 * k) + 2)), 1);
            }

            matrixGT_t2 = math.multiply((1 / (math.sqrt(NoktaSayisi_t2))), matrixZerosGT);
            // -------------------

            mtrx1P_t2 = math.inv(matrix1Qll_t2);

            mtrx1tum_N = math.multiply(math.transpose(TumIzMtrx1A_t2), mtrx1P_t2, TumIzMtrx1A_t2);
            mtrx1tum_n = math.multiply(math.transpose(TumIzMtrx1A_t2), mtrx1P_t2, matrix1l_t2);

            mtrx1tum_N_arti = math.subtract(math.inv(math.add(mtrx1tum_N, (math.multiply(math.transpose(matrixGT_t2), matrixGT_t2)))), (math.multiply(math.transpose(matrixGT_t2), matrixGT_t2)));
            mtrx1tum_QX_t2 = mtrx1tum_N_arti;

            mtrx1tum_x_t2 = math.multiply(mtrx1tum_QX_t2, mtrx1tum_n);

            mtrx1tum_V = math.subtract(math.multiply(TumIzMtrx1A_t2, mtrx1tum_x_t2), matrix1l_t2);

            // ------------------- Final Value of Unknown Points
            const rowstumCoorNN = NoktaSayisi_t2;
            const columnstumCoorNN = 1;
            let matrixZerostumCoorNN = math.zeros(rowstumCoorNN, columnstumCoorNN);
            for (i = 0; i < NoktaSayisi_t2; i++) {
                NN_tum = BazDent_Points_t2[i][0];

                matrixZerostumCoorNN.subset(math.index((3 * i), 0), NN_tum);
                matrixZerostumCoorNN.subset(math.index(((3 * i) + 1), 0), NN_tum);
                matrixZerostumCoorNN.subset(math.index(((3 * i) + 2), 0), NN_tum);
            }
            matrix1tumCoor_t2NN = matrixZerostumCoorNN; //Display of point names in matrix format in 1 column *****

            const rowstumCoor = (NoktaSayisi_t2 * 3);
            const columnstumCoor = 1;
            let matrixZerostumCoor = math.zeros(rowstumCoor, columnstumCoor);
            for (i = 0; i < NoktaSayisi_t2; i++) {
                CoortumX = BazDent_Points_t2[i][1];
                CoortumY = BazDent_Points_t2[i][2];
                CoortumZ = BazDent_Points_t2[i][3];

                matrixZerostumCoor.subset(math.index((3 * i), 0), CoortumX);
                matrixZerostumCoor.subset(math.index(((3 * i) + 1), 0), CoortumY);
                matrixZerostumCoor.subset(math.index(((3 * i) + 2), 0), CoortumZ);
            }
            matrix1tumCoor_t2 = matrixZerostumCoor; //Displaying the coordinates of the points in matrix format in 1 column *****

            mtrxDengtum_1_t2 = math.add(matrix1tumCoor_t2, mtrx1tum_x_t2); //Display of adjusted coordinates in 1 column. *****

            mtrxDengtum1_1 = math.concat(matrix1tumCoor_t2NN, mtrxDengtum_1_t2) //Display of adjusted coordinates in 2 columns (SN and Coordinates)

            mtrxDengtum1_1_t2x = math.concat(matrix1tumCoor_t2NN, mtrxDengtum_1_t2, mtrx1tum_x_t2) //Displaying NN, Coordinates and Unknowns in 3 columns *****

            const rowstumdeng = NoktaSayisi_t2;
            const columnstumdeng = 4;
            let matrixZerostumCoordeng = math.zeros(rowstumdeng, columnstumdeng);
            for (i = 0; i < NoktaSayisi_t2; i++) {
                matrixZerostumCoordeng.subset(math.index(i, 0), mtrxDengtum1_1.subset(math.index((3 * i), 0)));
                matrixZerostumCoordeng.subset(math.index(i, 1), mtrxDengtum1_1.subset(math.index((3 * i), 1)));
                matrixZerostumCoordeng.subset(math.index(i, 2), mtrxDengtum1_1.subset(math.index(((3 * i) + 1), 1)));
                matrixZerostumCoordeng.subset(math.index(i, 3), mtrxDengtum1_1.subset(math.index(((3 * i) + 2), 1)));
            }
            mtrx1tumDeng = matrixZerostumCoordeng; //4 columns, adjusted coordinates with Station Name and Coordinates horizontal *****
            // -------------------

            // ------------------- Adjusting and Controlling Measures
            let mtrxtumDengOlc1 = math.add(matrix1Coorbaz, mtrx1tum_V); //Adjusted measures. *****

            listtumREF = [];
            for (i = 0; i < BazSayisi_t2 * 2; i += 2) {
                for (j = 0; j < NoktaSayisi_t2; j++) {
                    if (mtrx1tumDeng.subset(math.index(j, 0)) === bazNN[i]) {
                        listtumREF.push(mtrx1tumDeng.subset(math.index(j, 1)));
                        listtumREF.push(mtrx1tumDeng.subset(math.index(j, 2)));
                        listtumREF.push(mtrx1tumDeng.subset(math.index(j, 3)));
                    }
                }
            }
            var BaztumREF = listtumREF //Adjusted coordinates of the REF point in the baselines.

            listtumRVR = [];
            for (i = 1; i < BazSayisi_t2 * 2; i += 2) {
                for (j = 0; j < NoktaSayisi_t2; j++) {
                    if (mtrx1tumDeng.subset(math.index(j, 0)) === bazNN[i]) {
                        listtumRVR.push(mtrx1tumDeng.subset(math.index(j, 1)));
                        listtumRVR.push(mtrx1tumDeng.subset(math.index(j, 2)));
                        listtumRVR.push(mtrx1tumDeng.subset(math.index(j, 3)));
                    }
                }
            }
            var BaztumRVR = listtumRVR //Adjusted coordinates of the rover point in the baselines.
            BaztumDengCoor = math.subtract(BaztumRVR, BaztumREF); //Measures found from Adjusted Coordinate differences, 1 column. *****

            const rowstumBazDengCoor = BazSayisi_t2 * 3;
            const columnstumBazDengCoor = 1;
            let matrixZerostumBazDengCoor = math.zeros(rowstumBazDengCoor, columnstumBazDengCoor);
            for (i = 0; i < BazSayisi_t2 * 3; i++) {
                tumDengBazCoor = BaztumDengCoor[i];
                matrixZerostumBazDengCoor.subset(math.index(i, 0), tumDengBazCoor);
            }
            mtrxtumBazDengCoor = matrixZerostumBazDengCoor; //Measures in matrix format from Adjusted Coordinate differences, 1 column. *****

            const rowstumbazNN = BazSayisi_t2 * 3;
            const columnstumbazNN = 1;
            let matrixZerostumbazNN = math.zeros(rowstumbazNN, columnstumbazNN);
            for (k = 0, i = 0, j = 1; k < BazSayisi_t2, i < BazSayisi_t2 * 2, j < BazSayisi_t2 * 2; k++, i += 2, j += 2) {
                ref_tum = bazNN[i];
                rvr_tum = bazNN[j];
                matrixZerostumbazNN.subset(math.index((3 * k), 0), ref_tum + " - " + rvr_tum + " (∆X)");
                matrixZerostumbazNN.subset(math.index(((3 * k) + 1), 0), ref_tum + " - " + rvr_tum + " (∆Y)");
                matrixZerostumbazNN.subset(math.index(((3 * k) + 2), 0), ref_tum + " - " + rvr_tum + " (∆Z)");
            }
            matrix1tumbazNN_t2 = matrixZerostumbazNN; //Display of baseline points in ∆X, ∆Y, ∆Z format in 1 column in matrix form *****

            let farkbazdengdent_t2 = math.subtract(mtrxtumBazDengCoor, mtrxtumDengOlc1);

            let matrixfarkbazdengdent_check_t2 = math.zeros(BazSayisi_t2 * 3, 1);
            for (let i = 0; i < BazSayisi_t2 * 3; i++) {
                if (Math.round(farkbazdengdent_t2.subset(math.index(i, 0))) === 0) {
                    matrixfarkbazdengdent_check_t2.subset(math.index(i, 0), "Ok.");
                } else {
                    matrixfarkbazdengdent_check_t2.subset(math.index(i, 0), "Err.");
                }
            }
            mtrxtumDengOlcDent_t2 = math.concat(matrix1tumbazNN_t2, mtrxtumDengOlc1, mtrxtumBazDengCoor, farkbazdengdent_t2, matrixfarkbazdengdent_check_t2);
            // -------------------

            // ------------------- Square mean error and mean error of unknowns
            // ------------ Degrees of Freedom
            n_tumiz = BazSayisi_t2 * 3; // //Measured baseline numbers.
            u_tumiz = NoktaSayisi_t2 * 3; //Coordinates of points whose coordinates are unknown.
            d_tumiz = 3; // Defekt number.
            f_tumiz_t2 = n_tumiz - u_tumiz + d_tumiz; //Degrees of freedom. If f > 0, adjustment process can be done.
            // ------------

            mtrxtumSo_t2 = math.sqrt(math.divide((math.multiply(math.transpose(mtrx1tum_V), mtrx1P_t2, mtrx1tum_V)), f_tumiz_t2))
            tumSo_t2 = mtrxtumSo_t2.get([0, 0]); //Mean Square Error.

            const rowstumUnknownPointsCof = NoktaSayisi_t2 * 3;
            const columnstumUnknownPointsCof = 1;
            let matrixZerostumUnknownPointsCof = math.zeros(rowstumUnknownPointsCof, columnstumUnknownPointsCof);
            for (i = 0; i < NoktaSayisi_t2 * 3; i++) {
                matrixZerostumUnknownPointsCof.subset(math.index(i, 0), math.sqrt(mtrx1tum_QX_t2.get([i, i]))); //square root of cofactors.
            }
            mtrx1tumUnknownPointsCof = matrixZerostumUnknownPointsCof;
            mtrx1tumUnknownPointsOrtHata = math.multiply(tumSo_t2, mtrx1tumUnknownPointsCof);

            mtrx1tumKOH_ = math.concat(matrix1tumCoor_t2NN, mtrx1tumUnknownPointsOrtHata) //Mean errors of Unknowns and Point Names, 2 columns.

            const rowstumKOH = NoktaSayisi_t2;
            const columnstumKOH = 3;
            let matrixZerostumKOH = math.zeros(rowstumKOH, columnstumKOH);
            for (i = 0; i < NoktaSayisi_t2; i++) {
                matrixZerostumKOH.subset(math.index(i, 0), mtrx1tumKOH_.subset(math.index((3 * i), 1)));
                matrixZerostumKOH.subset(math.index(i, 1), mtrx1tumKOH_.subset(math.index(((3 * i) + 1), 1)));
                matrixZerostumKOH.subset(math.index(i, 2), mtrx1tumKOH_.subset(math.index(((3 * i) + 2), 1)));
            }
            mtrx1tumKOH = matrixZerostumKOH; // Mean errors of unknowns, 3 columns. *****

            // ---------- Adjusted coordinates and mean errors
            mtrx1t2tumDeng_KOH = math.concat(mtrx1tumDeng, mtrx1tumKOH) //Adjusted coordinates and mean errors of Unknowns and SN, 7 columns. *****
            // ----------
            // -------------------





            // ------------------- Geographical Coordinates of adjusted coordinates (from XYZ to φʎ)
            // ------------------- (from XYZ to φʎh)
            // ʎ (all points)

            listboylam_tumiz_t2 = [];
            listboylam_tumiz_t3t2_t2_splice = [];
            for (var i = 0; i < NoktaSayisi_t2; i++) {
                var Xcoor = mtrx1t2tumDeng_KOH.subset(math.index(i, 1));
                var Ycoor = mtrx1t2tumDeng_KOH.subset(math.index(i, 2));

                function boylam(X, Y) {
                    if (X === 0 && Y > 0) {
                        return 0;
                    } else if (X > 0 && Y > 0) {
                        return (math.atan(Y / X)) * (180 / Math.PI); // ʎ east.
                    } else if (X < 0 && Y >= 0) {
                        return 180 - ((math.atan(math.abs(Y / X))) * (180 / Math.PI)); // ʎ east.
                    } else if (X > 0 && Y < 0) {
                        return (math.atan(Y / X)) * (180 / Math.PI); // ʎ west.
                    } else if (X < 0 && Y <= 0) {
                        return -180 + ((math.atan(Y / X)) * (180 / Math.PI)); // ʎ west.
                    }
                }

                var x = boylam(Xcoor, Ycoor);
                listboylam_tumiz_t2.push(x);
                listboylam_tumiz_t3t2_t2_splice.push(x);
                //document.getElementById("demo").innerHTML = x;
            }
            //


            // φ (all points)
            listenlem_tumiz_t2 = [];
            listenlem_tumiz_t3t2_t2_splice = [];
            let listro = [];
            for (var j = 0; j < NoktaSayisi_t2; j++) {
                X = mtrx1t2tumDeng_KOH.subset(math.index(j, 1));
                Y = mtrx1t2tumDeng_KOH.subset(math.index(j, 2));
                Z = mtrx1t2tumDeng_KOH.subset(math.index(j, 3));

                //GRS80 parameters
                a_GRS80_t2 = 6378137.0;
                b_GRS80_t2 = 6356752.3141;
                e2_GRS80_t2 = (Math.pow(a_GRS80_t2, 2) - Math.pow(b_GRS80_t2, 2)) / Math.pow(a_GRS80_t2, 2);

                enlem = [];
                φ = [];
                ρ = [];
                ro = [];
                φ[0] = 0;
                for (i = 0; i < Infinity; i++) {
                    ρ[i] = (a_GRS80_t2 / math.sqrt(1 - (e2_GRS80_t2 * math.pow(math.sin(φ[i] * Math.PI / 180), 2))))
                    φ[i + 1] = math.atan((Z + (e2_GRS80_t2 * ρ[i] * math.sin(φ[i] * Math.PI / 180))) / math.sqrt(math.pow(X, 2) + math.pow(Y, 2))) * (180 / Math.PI);

                    if ((math.abs((φ[i + 1] - φ[i])) * 3600) <= 0.00001) {
                        listenlem_tumiz_t2.push((φ[i + 1])); //enlem = (φ[i + 1]); //enlem.push(φ[i + 1]);
                        listenlem_tumiz_t3t2_t2_splice.push((φ[i + 1])); //enlem = (φ[i + 1]); //enlem.push(φ[i + 1]);

                        ro = (a_GRS80_t2 / math.sqrt(1 - (e2_GRS80_t2 * math.pow(math.sin(φ[i + 1] * Math.PI / 180), 2))));
                        listro.push(ro);
                        break;
                    }
                }
            }
            //


            //h ellipsoid heights (all points)
            h_elipsoit_yuk_t2 = [];
            for (var j = 0; j < NoktaSayisi_t2; j++) {
                var X = mtrx1t2tumDeng_KOH.subset(math.index(j, 1));
                var h1 = math.divide(X, (math.cos(listenlem_tumiz_t2[j] * Math.PI / 180) * math.cos(listboylam_tumiz_t2[j] * Math.PI / 180)));
                var payda_N = math.sqrt(1 - (e2_GRS80_t2 * (math.pow(math.sin(listenlem_tumiz_t2[j] * Math.PI / 180), 2))))
                N_GRS80 = math.divide(a_GRS80_t2, payda_N);
                h_elipsoit_yuk_t2.push(h1 - N_GRS80);
            }
            //
            // -------------------

            // ------------------- Adjusted Coordinates (from φʎ to N,E,U)
            var selVal_DOM_t2 = CM_t2.options[CM_t2.selectedIndex].innerHTML
            DOM_t2 = parseInt(selVal_DOM_t2);

            Dogu_t2 = [];
            Kuzey_t2 = [];
            for (var i = 0; i < NoktaSayisi_t2; i++) {
                //Function parameters are written in the form of Jeo2Duzlem(Latitude, Longitude, DOM). The variables "Easting" and "Northing" are called to find East and North.
                Jeo2Duzlem(listenlem_tumiz_t2[i], listboylam_tumiz_t2[i], DOM_t2)

                Dogu_t2.push(Easting);
                Kuzey_t2.push(Northing);
            }
            // -------------------

            //Adjusted Coordinates N,E,U Matrix Form
            let matrixTumDeng_EnlemBoylam_t2 = math.zeros(NoktaSayisi_t2, 3);
            let matrixTumDeng_DoguKuzey_t2 = math.zeros(NoktaSayisi_t2, 2);
            for (let i = 0; i < NoktaSayisi_t2; i++) {
                var enlem = listenlem_tumiz_t2[i].toFixed(7);
                var boylam = listboylam_tumiz_t2[i].toFixed(7);
                var h_elipsoit_t2 = h_elipsoit_yuk_t2[i].toFixed(5);

                var dogu = Dogu_t2[i].toFixed(3);
                var kuzey = Kuzey_t2[i].toFixed(3);

                matrixTumDeng_EnlemBoylam_t2.subset(math.index(i, 0), enlem);
                matrixTumDeng_EnlemBoylam_t2.subset(math.index(i, 1), boylam);
                matrixTumDeng_EnlemBoylam_t2.subset(math.index(i, 2), h_elipsoit_t2);

                matrixTumDeng_DoguKuzey_t2.subset(math.index(i, 0), dogu);
                matrixTumDeng_DoguKuzey_t2.subset(math.index(i, 1), kuzey);
            }

            mtrx_TumDeng_KOH_EnlemBoylam_t2 = math.concat(mtrx1t2tumDeng_KOH, matrixTumDeng_EnlemBoylam_t2, matrixTumDeng_DoguKuzey_t2) //NN, Adjusted coordinates of unknowns, mean errors, latitude-longitude; 12 columns with east-north values. (Matrix Form)

            // ---------- Calc. for Coordinate Difference
            let listCoor_t2 = [];
            let listCoor_EastNorth_t2 = [];
            for (var j = 0; j < NoktaSayisi_t2; j++) {
                var X = mtrx_TumDeng_KOH_EnlemBoylam_t2.subset(math.index(j, 1));
                var Y = mtrx_TumDeng_KOH_EnlemBoylam_t2.subset(math.index(j, 2));
                var Z = mtrx_TumDeng_KOH_EnlemBoylam_t2.subset(math.index(j, 3));

                var Easth_t2 = mtrx_TumDeng_KOH_EnlemBoylam_t2.subset(math.index(j, 10));
                var North_t2 = mtrx_TumDeng_KOH_EnlemBoylam_t2.subset(math.index(j, 11));

                listCoor_t2.push(X);
                listCoor_t2.push(Y);
                listCoor_t2.push(Z);

                listCoor_EastNorth_t2.push(Easth_t2);
                listCoor_EastNorth_t2.push(North_t2);
            }
            listDengCoor_t2 = listCoor_t2;
            listDengCoor_EastNorth_t1 = listCoor_EastNorth_t2;

            // ------------------- All Points (Popup Table)
            for (var i = 0; i < NoktaSayisi_t2; i++) {
                nokta_adi = mtrx1t2tumDeng_KOH.subset(math.index(i, 0));
                x_val_t2 = (mtrx1t2tumDeng_KOH.subset(math.index(i, 1))).toFixed(3);
                y_val_t2 = (mtrx1t2tumDeng_KOH.subset(math.index(i, 2))).toFixed(3);
                z_val_t2 = (mtrx1t2tumDeng_KOH.subset(math.index(i, 3))).toFixed(3);
                mx_val_t2 = (mtrx1t2tumDeng_KOH.subset(math.index(i, 4)) * 1000).toFixed(3);
                my_val_t2 = (mtrx1t2tumDeng_KOH.subset(math.index(i, 5)) * 1000).toFixed(3);
                mz_val_t2 = (mtrx1t2tumDeng_KOH.subset(math.index(i, 6)) * 1000).toFixed(3);

                sagadeger_t2_val = Dogu_t2[i].toFixed(3);
                yukarideger_t2_val = Kuzey_t2[i].toFixed(3);
                h_elipsoit_t2_val = h_elipsoit_yuk_t2[i].toFixed(5);

                var template =
                    "<table id='table_popup_main'>\
                                  <caption id='table_caption'>Adjusted Coordinates and RMS</caption>\
                                  <tr>\
                                    <th id='table_th_1'>Point</th>\
                                    <th id='table_th_2' colspan='2'>Coordinates (m)</th> \
                                    <th id='table_th_3' colspan='2'>RMS (mm)</th>\
                                  </tr>\
                                  <tr>\
                                    <th id='table_th_4' rowspan='4'>" + nokta_adi + "</th>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_1'>Easting</td>\
                                    <td id='table_td_2'>" + sagadeger_t2_val + "</td>\
                                    <td id='table_td_3'>my</td>\
                                    <td id='table_td_4'>" + my_val_t2 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_5'>Northing</td>\
                                    <td id='table_td_6'>" + yukarideger_t2_val + "</td>\
                                    <td id='table_td_7'>mx</td>\
                                    <td id='table_td_8'>" + mx_val_t2 + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_9'>h</td>\
                                    <td id='table_td_10'>" + h_elipsoit_t2_val + "</td>\
                                    <td id='table_td_11'>mz</td>\
                                    <td id='table_td_12'>" + mz_val_t2 + "</td>\
                                  </tr>\
                                </table>"

                marker_tumiz = new L.marker([listenlem_tumiz_t2[i], listboylam_tumiz_t2[i]], {
                        icon: yesil_nirengi
                    })
                    .bindPopup(template)
                layerGroup_tumiz.addLayer(marker_tumiz).addTo(map);
                layerGroup_t2.addLayer(marker_tumiz);
            }

            map.setView(new L.LatLng((math.sum(listenlem_tumiz_t2) / listenlem_tumiz_t2.length), (math.sum(listboylam_tumiz_t2) / listboylam_tumiz_t2.length)), 8);

            $('#adjusted_points_t2').show();
            var adjusted_marker_t2 = layerGroup_tumiz;
            $('input:checkbox[name=adjusted_t2]').click(function () {
                if (map.hasLayer(adjusted_marker_t2)) {
                    map.removeLayer(adjusted_marker_t2);
                } else {
                    map.addLayer(adjusted_marker_t2);
                };
            });
            // -------------------
            // --------------------------

            // -------------------------- Redundant Parts
            mtrx1Qii = math.multiply(TumIzMtrx1A_t2, mtrx1tum_QX_t2, math.transpose(TumIzMtrx1A_t2));
            mtrx1ri = math.subtract(1, math.multiply(mtrx1Qii, mtrx1P_t2));

            const rows = BazSayisi_t2 * 3;
            const columns = 2;
            let matrixZeros_ri = math.zeros(rows, columns);

            for (i = 0; i < (BazSayisi_t2 * 3); i++) {
                if (mtrx1ri.subset(math.index(i, i)) <= 0.1) {
                    matrixZeros_ri.subset(math.index(i, 0), mtrx1ri.subset(math.index(i, i)));
                    matrixZeros_ri.subset(math.index(i, 1), "Poorly Controlled.");
                } else if (mtrx1ri.subset(math.index(i, i)) > 0.1 && mtrx1ri.subset(math.index(i, i)) < 0.3) {
                    matrixZeros_ri.subset(math.index(i, 0), mtrx1ri.subset(math.index(i, i)));
                    matrixZeros_ri.subset(math.index(i, 1), "Medium Controlled.");
                } else if (mtrx1ri.subset(math.index(i, i)) >= 0.3) {
                    matrixZeros_ri.subset(math.index(i, 0), mtrx1ri.subset(math.index(i, i)));
                    matrixZeros_ri.subset(math.index(i, 1), "Ok.");
                }
            }
            var mtrx1ri_kontrol_t2 = matrixZeros_ri;
            var mtrx1ri_kontrol_t2_baz_t2 = math.concat(matrix1tumbazNN_t2, mtrx1ri_kontrol_t2);
            // --------------------------

            // -------------------------- Interior and Exterior Reliability Criteria
            var DeltaSifir_1_t1 = 3.42;
            var DeltaSifir_2_t1 = 4.13;

            mtrxdiagQii = math.diag(mtrx1Qii)
            mtrxsqrtdiagQii = math.sqrt(mtrxdiagQii);
            mtrxSi_t1 = math.multiply(tumSo_t2, mtrxsqrtdiagQii); //***

            mtrxdrafta = math.multiply(DeltaSifir_2_t1, mtrxSi_t1);
            mtrxdiagri = math.diag(mtrx1ri);
            mtrxsqrtdiagri = math.sqrt(mtrxdiagri);
            //Interior Reliability Criteria
            const mtrxTersDelta0li_t1 = math.dotDivide(mtrxdrafta, mtrxsqrtdiagri);

            mtrxdraftb = math.subtract(1, mtrxdiagri);
            mtrxdraftc = math.dotDivide(mtrxdraftb, mtrxdiagri);
            mtrxdraftd = math.sqrt(mtrxdraftc)
            //Exterior Reliability Criteria
            const mtrxDelta0li_t1 = math.multiply(DeltaSifir_2_t1, mtrxdraftd);

            const rowsIcGuven = BazSayisi_t2 * 3;
            const columnsIcGuven = 2;
            let matrixZeros_IcGuven_t1 = math.zeros(rowsIcGuven, columnsIcGuven);
            for (i = 0; i < (BazSayisi_t2 * 3); i++) {
                if (mtrxTersDelta0li_t1.subset(math.index(i)) < math.multiply(mtrxSi_t1.subset(math.index(i)), 8)) {
                    matrixZeros_IcGuven_t1.subset(math.index(i, 0), mtrxTersDelta0li_t1.subset(math.index(i)));
                    matrixZeros_IcGuven_t1.subset(math.index(i, 1), "Ok.");
                } else {
                    matrixZeros_IcGuven_t1.subset(math.index(i, 0), mtrxTersDelta0li_t1.subset(math.index(i)));
                    matrixZeros_IcGuven_t1.subset(math.index(i, 1), "Poor value.");
                }
            };
            const matrix_IcGuven_t1 = matrixZeros_IcGuven_t1;

            const rowsDisGuven = BazSayisi_t2 * 3;
            const columnsDisGuven = 2;
            let matrixZeros_DisGuven_t1 = math.zeros(rowsDisGuven, columnsDisGuven);
            for (i = 0; i < (BazSayisi_t2 * 3); i++) {
                if (mtrxDelta0li_t1.subset(math.index(i)) < 10) {
                    matrixZeros_DisGuven_t1.subset(math.index(i, 0), mtrxDelta0li_t1.subset(math.index(i)));
                    matrixZeros_DisGuven_t1.subset(math.index(i, 1), "Ok.");
                } else {
                    matrixZeros_DisGuven_t1.subset(math.index(i, 0), mtrxDelta0li_t1.subset(math.index(i)));
                    matrixZeros_DisGuven_t1.subset(math.index(i, 1), "Poor value.");
                }
            };
            const matrix_DisGuven_t1 = matrixZeros_DisGuven_t1;
            //Internal and External Reliability Criteria 4 columns
            const mtrxIcDisGuven_t2 = math.concat(matrix_IcGuven_t1, matrix_DisGuven_t1);
            var mtrxIcDisGuven_t2_baz_t2 = math.concat(matrix1tumbazNN_t2, mtrxIcDisGuven_t2);
            // --------------------------

            // -------------------------- OutlierTests
            const mtrx1diagtum_Qvivi = math.diag(math.subtract(math.divide(1, mtrx1P_t2), mtrx1Qii));

            const mtrx1_calc1 = math.abs(mtrx1tum_V);
            const mtrx1_calc2 = (math.multiply(tumSo_t2, math.sqrt(mtrx1diagtum_Qvivi)));

            const rows_uyusumsuz = BazSayisi_t2 * 3;
            const columns_uyusumsuz = 1;
            let matrixZeros_uyusumsuz = math.zeros(rows_uyusumsuz, columns_uyusumsuz);
            for (i = 0; i < (BazSayisi_t2 * 3); i++) {
                matrixZeros_uyusumsuz.subset(math.index(i, 0), mtrx1_calc2.subset(math.index(i)));
            };

            const matrixCalc_uyusumsuz = matrixZeros_uyusumsuz;
            const mtrx1_Vip = math.dotDivide(mtrx1_calc1, matrixCalc_uyusumsuz); //***

            var CriticalF = jStat.centralF.inv(0.95, 1, (f_tumiz_t2 - 1)); // Critical F-value

            //Confidence Limit for the Pope Test
            var GuvenSiniri = Math.sqrt((f_tumiz_t2 * CriticalF) / ((f_tumiz_t2 - 1) + CriticalF));

            let matrixZeros_Uyusumsuz_t1 = math.zeros(rows_uyusumsuz, 2);
            for (i = 0; i < (BazSayisi_t2 * 3); i++) {
                if (mtrx1_Vip.subset(math.index(i, 0)) < GuvenSiniri) {
                    matrixZeros_Uyusumsuz_t1.subset(math.index(i, 0), mtrx1_Vip.subset(math.index(i, 0)));
                    matrixZeros_Uyusumsuz_t1.subset(math.index(i, 1), "Ok.");
                } else {
                    matrixZeros_Uyusumsuz_t1.subset(math.index(i, 0), mtrx1_Vip.subset(math.index(i, 0)));
                    matrixZeros_Uyusumsuz_t1.subset(math.index(i, 1), "Outlier.");
                }
            };
            const matrix_Uyusumsuz_t2 = matrixZeros_Uyusumsuz_t1;
            const matrix_Uyusumsuz_t2_baz_t2 = math.concat(matrix1tumbazNN_t2, matrix_Uyusumsuz_t2);
            // --------------------------

            // -------------------------- Tables
            // ------------------------ Adjusted Coordinates Table from Free Adjustment
            var mytable = document.getElementById('TableD_2')
            var tblBody = document.createElement("tbody");

            // creating all cells
            for (var i = 0; i < NoktaSayisi_t2; i++) {
                // creates a table row
                var row = document.createElement("tr");

                for (var j = 0; j < 12; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(mtrx_TumDeng_KOH_EnlemBoylam_t2.subset(math.index(i, j)));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                // add the row to the end of the table body
                tblBody.appendChild(row);
            }
            mytable.appendChild(tblBody);
            // ------------------------

            // ------------------------ Adjusted Measurements Control Table from Free Adjustment
            var mytable = document.getElementById('TableE_2')
            var tblBody = document.createElement("tbody");
            // creating all cells
            for (var i = 0; i < BazSayisi_t2 * 3; i++) {
                // creates a table row
                var row = document.createElement("tr");
                for (var j = 0; j < 5; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(mtrxtumDengOlcDent_t2.subset(math.index(i, j)));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                // add the row to the end of the table body
                tblBody.appendChild(row);
            }
            mytable.appendChild(tblBody);
            // ------------------------

            // ---------------------- Redundant Part Table
            var mytable_redundans = document.getElementById('Table_Redundans_t2')
            var tblBody_redundans = document.createElement("tbody");
            // creating all cells
            for (var i = 0; i < BazSayisi_t2 * 3; i++) {
                // creates a table row
                var row = document.createElement("tr");
                for (var j = 0; j < 3; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(mtrx1ri_kontrol_t2_baz_t2.subset(math.index(i, j)));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                // add the row to the end of the table body
                tblBody_redundans.appendChild(row);
            }
            mytable_redundans.appendChild(tblBody_redundans);
            // ------------------------

            // ---------------------- Interior and Exterior Reliability Table
            var mytable_IcDisGuven_t1 = document.getElementById('Table_IcDisGuven_t2')
            var tblBody_IcDisGuven_t1 = document.createElement("tbody");
            // creating all cells
            for (var i = 0; i < BazSayisi_t2 * 3; i++) {
                // creates a table row
                var row = document.createElement("tr");
                for (var j = 0; j < 5; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(mtrxIcDisGuven_t2_baz_t2.subset(math.index(i, j)));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                // add the row to the end of the table body
                tblBody_IcDisGuven_t1.appendChild(row);
            }
            mytable_IcDisGuven_t1.appendChild(tblBody_IcDisGuven_t1);
            // ------------------------

            // ---------------------- Outlier Table
            var mytable_UyusumsuzOlculer_t1 = document.getElementById('Table_Uyusumsuz_t2')
            var tblBody_UyusumsuzOlculer_t1 = document.createElement("tbody");

            var caption = document.createElement("caption");
            var captionText = document.createTextNode("Confidence Limit for POPE Test: " + GuvenSiniri + " and Total Probability of Error: 5%");
            //Confidence Limit for POPE Test: and Total Error Probability: 5%
            caption.appendChild(captionText);
            mytable_UyusumsuzOlculer_t1.appendChild(caption);
            // creating all cells
            for (var i = 0; i < BazSayisi_t2 * 3; i++) {
                // creates a table row
                var row = document.createElement("tr");
                for (var j = 0; j < 3; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(matrix_Uyusumsuz_t2_baz_t2.subset(math.index(i, j)));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                // add the row to the end of the table body
                tblBody_UyusumsuzOlculer_t1.appendChild(row);
            }
            mytable_UyusumsuzOlculer_t1.appendChild(tblBody_UyusumsuzOlculer_t1);
            // ------------------------

            //Alert
            //swal("Adjustment process successfully performed.", "") ;
            Swal.fire({
                text: 'Adjustment process successfully performed.',
                icon: 'success',
                confirmButtonText: 'Ok',
            })
            //
            //------------------------
        });
        // --------------------------

        // ---------------------- Table of Coordinates of Reference Points
        var mytable = document.getElementById('TableA_2')
        var tblBody = document.createElement("tbody");
        // creating all cells
        for (var i = 0; i < NoktaSayisi_t2; i++) {
            // creates a table row
            var row = document.createElement("tr");
            for (var j = 0; j < 7; j++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(XYZ_LatLong_t2.subset(math.index(i, j)));
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }
        mytable.appendChild(tblBody);
        // ------------------------
        // ---------------------------------------------
    });
    reader.readAsText(files[0]);
}

var openbtn = document.getElementById("openselect_t2"),
    showout = document.getElementById("showresult_2");
openselect_t2.addEventListener("change", doOpen_t2, false);