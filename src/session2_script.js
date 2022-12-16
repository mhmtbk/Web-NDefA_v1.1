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
        var LGO_txt = list; // LGO_txt = Yüklenen .txt dosyasıdır.
        //document.write (LGO_txt[3]) ;
        //document.getElementById("demo").innerHTML = LGO_txt.length;

        // Strings Manipulate _______________________________________________________________________________________________________________ Start

        // ------------------------ Satırları Alma (Get Rows) ------------------------

        // ------------ İçerisinde "REF" geçen satırları alma (Referans noktalarının satırlarını alır.)
        var listCoorRefRaw = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if (LGO_txt[i].includes("REF")) {
                //document.write(LGO_txt[i] + '<br />');
                listCoorRefRaw.push(LGO_txt[i]);
            }
        }
        var CoorRefRaw = listCoorRefRaw; // CoorRefRaw = LGO_txt değişkeni içerisinde "REF" geçen satırları alır.
        // ------------

        // ------------ İçerisinde "@+ ve @-" geçen satırları alma (Bazlardaki durulan (@+) ve bakılan (@-) noktalarının satırlarını alır.)
        var listBazRaw = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if (LGO_txt[i].includes("@+")) {
                listBazRaw.push(LGO_txt[i]);
                listBazRaw.push(LGO_txt[i + 1]);
            }
        }
        var bazRaw = listBazRaw; // bazRaw = LGO_txt değişkeni içerisinde "@+" geçen satırları alır ve "@+ @-"  ifadesi geçen satırları yazdırarak toplam bazı bulur.
        // ------------

        // ------------ İçerisinde "@=" geçen satırları alma
        var listBazCovarianceRow = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if (LGO_txt[i].includes("@=")) {
                listBazCovarianceRow.push(LGO_txt[i]);
            }
        }
        var BazCovarianceRow = listBazCovarianceRow; // BazCovarianceRow = Variance-covariance information for baseline vector. LGO_txt değişkeni içerisinde "@=" geçen satırları alır. Bu satırlarda; m0 (s0) ve ölçülerin kovaryans matrisi (üst üçgensel) bulunur.
        // ------------

        // ------------ İçerisinde "@# ve REF veya  @# ve MEAN" geçen satırları alma
        var listRefMean = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if ((LGO_txt[i].includes("@#") && LGO_txt[i].includes("REF")) || (LGO_txt[i].includes("@#") && LGO_txt[i].includes("MEAN"))) {
                listRefMean.push(LGO_txt[i]);
            }
        }
        var bazRefMeanRaw = listRefMean; // bazRefMeanRaw = LGO_txt değişkeni içerisinde "@# ve "REF" veya "@#" ve "MEAN" " geçen satırları alır.
        // ------------

        // ------------------------ Satırları Manipule Etme (Manipulate The Rows) ------------------------

        // ------------------ Alınan Satırların İlk İki Harfini Silme

        // ------------ İçerisinde "REF" geçen satırlardaki nokta adları ve kartezyen koordinatları alma
        var list3 = [];
        var list4 = [];
        for (i = 0; i < CoorRefRaw.length; i++) {
            list3.push(CoorRefRaw[i].toString());
            list4.push(list3[i].slice(2, 64));
        }
        var CoorRef = list4; // Referans noktalarının kartezyen koordinatlarını içeririr.
        // ------------

        // ------------ İçerisinde "@# ve REF veya  @# ve MEAN" geçen satırların ilk iki harfini silme
        var listRefMean_1 = [];
        var listRefMean_2 = [];
        for (i = 0; i < bazRefMeanRaw.length; i++) {
            listRefMean_1.push(bazRefMeanRaw[i].toString());
            listRefMean_2.push(listRefMean_1[i].substr(2));
        }
        var ListRefMean = listRefMean_2; // "@# ve REF veya  @# ve MEAN" olan satırları içeririr.
        // ------------

        // ------------ İçerisinde "@+ ve @-" geçen satırların ilk iki harfini silme
        var listbazRaw1 = [];
        var listbazRaw2 = [];
        for (i = 0; i < bazRaw.length; i++) {
            listbazRaw1.push(bazRaw[i].toString());
            listbazRaw2.push(listbazRaw1[i].substr(2)); // @- ve @- işaretleri silme
        }
        var baz = listbazRaw2; // baz noktalarını içeririr.
        // ------------

        // ------------ İçerisinde "@=" geçen satırların ilk iki harfini silme
        var BazCovarianceRowSubs1 = [];
        var BazCovarianceRowSubs2 = [];
        for (i = 0; i < BazCovarianceRow.length; i++) {
            BazCovarianceRowSubs1.push(BazCovarianceRow[i].toString());
            BazCovarianceRowSubs2.push(BazCovarianceRowSubs1[i].substr(2));

        }
        var BazCofactor1 = BazCovarianceRowSubs2; // ölçülerin varyans ve kovaryansları içerir.
        // ------------

        // ------------------ Alınan Satırlardaki Boşlukları Silme

        // ------------ İçerisinde "REF" geçen satırlardaki boşlukları silme
        function myTrim(x) {
            return x.replace(/ +(?= )/g, '');
        }

        var list5 = [];
        var list6 = [];
        for (i = 0; i < list4.length; i++) {
            list5.push(myTrim(list4[i]));
            list6.push(list5[i].split(" "));
        }
        var CoorRefSplit = list6; // Referans noktalarının kartezyen koordinatlarının aralarındaki boşluklara göre split edilmiş halini içerir.
        //document.getElementById("split").innerHTML = CoorRefSplit[0][0];
        // ------------

        // ------------ İçerisinde "@+ ve @-" geçen satırlardaki boşlukları silme
        var listbaz1 = [];
        var listbaz2 = [];
        for (i = 0; i < baz.length; i++) {
            listbaz1.push(myTrim(baz[i]));
            listbaz2.push(listbaz1[i].split(" "));
        }
        var bazSplit = listbaz2; // baz noktalarının bulunduğu satırlardaki değerlerin arasındaki boşluklara göre split edilmiş halini içerir.
        //document.getElementById("split2").innerHTML = bazSplit[1];
        // ------------

        // ------------ İçerisinde "@=" geçen satırlardaki boşlukları silme
        var BazCof1 = [];
        var BazCof2 = [];
        var BazCof3 = [];
        for (i = 0; i < BazCofactor1.length; i++) {
            BazCof1.push(myTrim(BazCofactor1[i]));
            BazCof2.push(BazCof1[i].split(" "));
            BazCof3.push(BazCof2[i].splice(1, BazCof2[i].length));
        }

        // Ölçülerin kofaktör matrisinin (üst üçgensel) bulunduğu satırlardaki değerlerin arasındaki boşluklara göre split edilmiş halini içerir. *****
        var BazCofactor = BazCof3;
        //document.getElementById("split2").innerHTML = BazCofactor[0][6];
        // ------------

        // ------------ İçerisinde "@# ve REF veya  @# ve MEAN" geçen satırlardaki boşlukları silme.
        var listRefMean_3 = [];
        var listRefMean_4 = [];
        for (i = 0; i < ListRefMean.length; i++) {
            listRefMean_3.push(myTrim(ListRefMean[i]));
            listRefMean_4.push(listRefMean_3[i].split(" "));
        }
        var PointsRefMean = listRefMean_4; // listRefMean noktalarının koordinatları arasındaki boşluklara göre split edilmiş halini içerir.
        //document.getElementById("split2").innerHTML = PointsRefMean[1][0];
        // ------------

        // ------------------

        // ------------ İçerisinde "@+ ve @-" geçen satırlardaki nokta adlarını alma
        var listbazNN = [];
        for (i = 0; i < baz.length; i++) {
            listbazNN.push(bazSplit[i][0]);
        }
        // baz noktaları *****
        var bazNN = listbazNN;

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        // bazlardaki nokta unique adları *****
        bazNNunique_t2 = bazNN.filter(onlyUnique);
        Noktalar_t2 = bazNN.filter(onlyUnique); //T2 Nokta adları (Sgnf için)
        Noktalar_t2_t3t2 = bazNN.filter(onlyUnique); //T2T3 analizinde kullanılacak nokta (Sgnf için)

        bazNNunique_t2_lowerCase = [];
        for (i = 0; i < bazNNunique_t2.length; i++) {
            bazNNunique_t2_lowerCase.push(bazNNunique_t2[i].toLowerCase());
        }
        // ------------

        // ------------ İçerisinde "@-" geçen satırlardaki baz koordinatlarını alma
        var listbazCoor = [];
        for (i = 1; i < baz.length; i += 2) {
            listbazCoor.push(bazSplit[i][1]);
            listbazCoor.push(bazSplit[i][2]);
            listbazCoor.push(bazSplit[i][3]);
        }
        // baz koordinatları (∆x, ∆y, ∆z) *****
        var bazCoor = listbazCoor;
        // ------------

        const rowsCoorbaz = (bazCoor.length);
        const columnsCoorbaz = 1;
        let matrixZerosCoorbaz = math.zeros(rowsCoorbaz, columnsCoorbaz);

        for (i = 0; i < bazCoor.length; i++) {

            baz_Coor = bazCoor[i];

            matrixZerosCoorbaz.subset(math.index(i, 0), baz_Coor);
        }
        //matrix1Coorbaz: Baz koordinatlarının (∆x, ∆y, ∆z) matris formatında gösterilmesi *****
        matrix1Coorbaz = matrixZerosCoorbaz;

        // ------------------


        // ------------------------ Baz Denetimi İçin String Manipulate ----------------------
        //------------ İçerisinde "@# ve REF veya  @# ve MEAN" geçen satırları alma
        var BazDent_RefMean = [];
        for (i = 0; i < LGO_txt.length; i++) {
            if ((LGO_txt[i].includes("@#") && LGO_txt[i].includes("REF")) || (LGO_txt[i].includes("@#") && LGO_txt[i].includes("MEAN"))) {
                BazDent_RefMean.push(LGO_txt[i]);
            }
        }
        var BazDent_RefMean_Raw = BazDent_RefMean;
        // ------------

        // ------------ İçerisinde "@# ve REF veya  @# ve MEAN" geçen satırların ilk iki harfini silme
        var BazDent_RefMean_1 = [];
        var BazDent_RefMean_2 = [];
        for (i = 0; i < BazDent_RefMean_Raw.length; i++) {
            BazDent_RefMean_1.push(BazDent_RefMean_Raw[i].toString());
            BazDent_RefMean_2.push(BazDent_RefMean_1[i].substr(2));
        }
        var List_BazDent_RefMean = BazDent_RefMean_2;
        // ------------

        // ------------ İçerisinde "@# ve REF veya  @# ve MEAN" geçen satırlardaki boşlukları silme.
        var BazDent_RefMean_3 = [];
        var BazDent_RefMean_4 = [];
        for (i = 0; i < List_BazDent_RefMean.length; i++) {
            BazDent_RefMean_3.push(myTrim(List_BazDent_RefMean[i]));
            BazDent_RefMean_4.push(BazDent_RefMean_3[i].split(" "));
        }
        var BazDent_Points_t2RefMean = BazDent_RefMean_4;
        // ------------

        // ------------ İçerisinde "@# ve REF veya  @# ve MEAN" geçen satırların ilkini alma.
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
        // ------------------------

        // Strings Manipulate _________________________________________________________________________________________________________________ End

        // ------------------- Kartezyen Noktalar Enlem Bylam Hesabı
        // ʎ boylamının hesabı
        listboylam_kartezyen_t2 = [];
        for (var i = 0; i < BazDent_Points_t2.length; i++) {
            var Xcoor = BazDent_Points_t2[i][1];
            var Ycoor = BazDent_Points_t2[i][2];

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

            var x = boylam(Xcoor, Ycoor);
            listboylam_kartezyen_t2.push(x);
            //document.getElementById("demo").innerHTML = x;
        }
        //

        // φ enleminin hesabı
        listenlem_kartezyen_t2 = [];
        let listro = [];
        for (var j = 0; j < BazDent_Points_t2.length; j++) {
            X = parseFloat(BazDent_Points_t2[j][1]);
            Y = parseFloat(BazDent_Points_t2[j][2]);
            Z = parseFloat(BazDent_Points_t2[j][3]);

            //GRS80 elipsoidinin geometrik parametreleri
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

        // h elipsoit yüksekliğinin hesabı (tüm noktalar)
        h_elipsoit_yuk_t02 = [];
        for (var j = 0; j < BazDent_Points_t2.length; j++) {
            var X = parseFloat(BazDent_Points_t2[j][1]);
            var h1 = math.divide(X, (math.cos(listenlem_kartezyen_t2[j] * Math.PI / 180) * math.cos(listboylam_kartezyen_t2[j] * Math.PI / 180)));
            var payda_N = math.sqrt(1 - (e2_XYZ * (math.pow(math.sin(listenlem_kartezyen_t2[j] * Math.PI / 180), 2))))
            let N_GRS80 = math.divide(a_XYZ, payda_N);
            h_elipsoit_yuk_t02.push(h1 - N_GRS80);
        }
        //

        //XYZ Lat Long h Tamamı (Matris Formatında)
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
        // -------------------

        /*
                map.removeLayer(layerGroup_t1) ;
                map.removeLayer(layerGroup_t3) ;
        */
        var layerGroup_kartezyen = L.layerGroup().addTo(map);
        var layerGroup_tumiz = L.layerGroup().addTo(map);
        var layerGroup_zorlamasiz = L.layerGroup().addTo(map);
        layerGroup_t2 = L.layerGroup().addTo(map);
        // ------------------- Kartezyen Noktalar Marker
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
        const rowstumEnlem_Boylam = BazDent_Points_t2.length; //Nokta Sayısı
        const columnstumEnlem_Boylam = 3;
        let matrixZerostumEnlemBoylam = math.zeros(rowstumEnlem_Boylam, columnstumEnlem_Boylam);
        for (i = 0; i < BazDent_Points_t2.length; i++) {
            matrixZerostumEnlemBoylam.subset(math.index(i, 0), BazDent_Points_t2[i][0]);
            matrixZerostumEnlemBoylam.subset(math.index(i, 1), listenlem_kartezyen_t2[i]);
            matrixZerostumEnlemBoylam.subset(math.index(i, 2), listboylam_kartezyen_t2[i]);
        }
        // Tüm NN ve Enlem, Boylam olmak üzere 3 sütun  *****
        mtrx1tumEnlemBoylam = matrixZerostumEnlemBoylam;

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
        // Tüm baz noktalarının NN, Enlem, Boylam olmak üzere 3 sütun gösterimi *****
        matrix1bazEnlemBoylam = matrixZerosbazEnlemBoylam;

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

        // ------------ Ağdaki Toplam Nokta Sayısı ve Toplam Baz Miktarı ------------
        NoktaSayisi_t2 = bazNNunique_t2.length; // Ağdaki toplam nokta sayısı.
        BazSayisi_t2 = (baz.length) / 2; // Ağdaki toplam baz sayısı.
        // ------------

        // ------------ Referans noktaların adlarından oluşan dropdown ------------
        for (var i = 0; i < CoorRef.length; i++) {
            var option = document.createElement('option');
            option.text = CoorRefSplit[i][0];
            option.value = CoorRefSplit[i][0];
            var select = document.getElementById("Sta_t2");
            select.appendChild(option);
        }
        // ------------------------

        // ------------ "l" Küçültülmüş Ölçüler Matrisi ------------
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
        // PointsRefMean: l matrisi için "REF ve MEAN" özelliğindeki noktalar. *****
        var PointsRefMean = listRefandMean2
        //debugger;
        //document.getElementById("split").innerHTML = bazNNunique_t2;
        //document.getElementById("split2").innerHTML = PointsRefMean;
        //document.getElementById("split2").innerHTML = listRefandMean2.length;

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
        //console.log(matrix1l_t2) ;
        // ------------------------

        // ------------ "Qll" Ölçülerin Kofaktör (Ağırlık Katsayıları) Matrisi ------------
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
        //console.log(matrixQll) ;
        // ------------------------

        // ------------ Noktalar ve Koordinatları ------------
        var ListCoor = []; // Tüm Ağ noktaları (NN X Y Z)
        for (i = 0; i < PointsRefMean.length; i++) {
            ListCoor.push(PointsRefMean[i].splice(0, 4));
        }
        // Ağ Noktaları ve Koordinatları *****
        var Coor = ListCoor;
        // ------------

        // Enable Export Excel Button
        document.getElementById("KartezyenControlID_2").disabled = false;
        document.getElementById("baseline_vectors_2").disabled = false;
        $('#b_line_vectors_2').show();
        $('#cartesian_points_t2').show();
        // ------------


        // -------------------------- Tüm İz Minimum Dengeleme ---------------------------
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
            //map.removeLayer(layerGroup_kartezyen);

            // ------------------- Tüm İz Minimum Dengeleme İçin Matrisler -------------------
            // ------------ "A" Katsayılar Matrisi - Tüm İz Minimum Dengeleme------------
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
            console.log(TumIzMtrx1A_t2);
            // ------------

            // ------------ "GT" Katsayılar Matrisi - Tüm İz Minimum Dengeleme------------
            const rowsGT = 3;
            const columnsGT = NoktaSayisi_t2 * 3;
            let matrixZerosGT = math.zeros(rowsGT, columnsGT);

            for (k = 0; k < (NoktaSayisi_t2); k++) {

                matrixZerosGT.subset(math.index(0, (3 * k)), 1);
                matrixZerosGT.subset(math.index(1, ((3 * k) + 1)), 1);
                matrixZerosGT.subset(math.index(2, ((3 * k) + 2)), 1);
            }
            //console.log(matrixZerosGT);

            matrixGT_t2 = math.multiply((1 / (math.sqrt(NoktaSayisi_t2))), matrixZerosGT);
            //console.log(matrixGT_t2);
            // -------------------

            mtrx1P_t2 = math.inv(matrix1Qll_t2);

            mtrx1tum_N = math.multiply(math.transpose(TumIzMtrx1A_t2), mtrx1P_t2, TumIzMtrx1A_t2);
            mtrx1tum_n = math.multiply(math.transpose(TumIzMtrx1A_t2), mtrx1P_t2, matrix1l_t2);

            mtrx1tum_N_arti = math.subtract(math.inv(math.add(mtrx1tum_N, (math.multiply(math.transpose(matrixGT_t2), matrixGT_t2)))), (math.multiply(math.transpose(matrixGT_t2), matrixGT_t2)));
            mtrx1tum_QX_t2 = mtrx1tum_N_arti;

            mtrx1tum_x_t2 = math.multiply(mtrx1tum_QX_t2, mtrx1tum_n);

            mtrx1tum_V = math.subtract(math.multiply(TumIzMtrx1A_t2, mtrx1tum_x_t2), matrix1l_t2);

            // ------------------- Bilinmeyen Noktaların Kesin Değeri -------------------
            const rowstumCoorNN = NoktaSayisi_t2;
            const columnstumCoorNN = 1;
            let matrixZerostumCoorNN = math.zeros(rowstumCoorNN, columnstumCoorNN);
            for (i = 0; i < NoktaSayisi_t2; i++) {
                NN_tum = BazDent_Points_t2[i][0];

                matrixZerostumCoorNN.subset(math.index((3 * i), 0), NN_tum);
                matrixZerostumCoorNN.subset(math.index(((3 * i) + 1), 0), NN_tum);
                matrixZerostumCoorNN.subset(math.index(((3 * i) + 2), 0), NN_tum);
            }
            // matrix1tumCoor_t2NN: Nokta adlarının 1 sütunda matris formatında gösterilmesi *****
            matrix1tumCoor_t2NN = matrixZerostumCoorNN;

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
            // matrix1tumCoor_t2: Noktaların koordinatlarının 1 sütunda matris formatında gösterilmesi *****
            matrix1tumCoor_t2 = matrixZerostumCoor;

            // Koordinatlar dikey olmak üzere 1 sütun dengelenmiş koordinatlar *****
            mtrxDengtum_1_t2 = math.add(matrix1tumCoor_t2, mtrx1tum_x_t2);
            /*
            math.format(mtrxDengtum_1_t2, {
                                    notation: 'fixed',
                                    precision: 4
                                })
            */

            //NN ve Koordinatlar dikey olmak üzere 2 sütun dengelenmiş koordinatlar *****
            mtrxDengtum1_1 = math.concat(matrix1tumCoor_t2NN, mtrxDengtum_1_t2)



            //NN, Koordinatlar ve Küçültülmüş Bilimeyenler dikey olmak üzere 3 sütun dengelenmiş koordinatlar *****
            mtrxDengtum1_1_t2x = math.concat(matrix1tumCoor_t2NN, mtrxDengtum_1_t2, mtrx1tum_x_t2)



            const rowstumdeng = NoktaSayisi_t2;
            const columnstumdeng = 4;
            let matrixZerostumCoordeng = math.zeros(rowstumdeng, columnstumdeng);
            for (i = 0; i < NoktaSayisi_t2; i++) {

                matrixZerostumCoordeng.subset(math.index(i, 0), mtrxDengtum1_1.subset(math.index((3 * i), 0)));
                matrixZerostumCoordeng.subset(math.index(i, 1), mtrxDengtum1_1.subset(math.index((3 * i), 1)));
                matrixZerostumCoordeng.subset(math.index(i, 2), mtrxDengtum1_1.subset(math.index(((3 * i) + 1), 1)));
                matrixZerostumCoordeng.subset(math.index(i, 3), mtrxDengtum1_1.subset(math.index(((3 * i) + 2), 1)));
            }
            // mtrx1tumDeng: NN dikey ve Koordinatlar yatay olmak üzere 4 sütun dengelenmiş koordinatlar *****
            mtrx1tumDeng = matrixZerostumCoordeng;
            // -------------------

            // ------------------- Ölçülerin Dengelenmesi ve Denetimi -------------------
            //Dengelenmiş Ölçüler 1 sütun. *****
            let mtrxtumDengOlc1 = math.add(matrix1Coorbaz, mtrx1tum_V);

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
            var BaztumREF = listtumREF // BazREF: bazlardaki ref noktasının dengelenmiş koordinatları.

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
            var BaztumRVR = listtumRVR // BazRVR: bazlardaki rover noktasının dengelenmiş koordinatları.

            //Dengelenmiş Koordinat farklarından bulunan ölçüler 1 sütun. *****
            BaztumDengCoor = math.subtract(BaztumRVR, BaztumREF);

            const rowstumBazDengCoor = BazSayisi_t2 * 3;
            const columnstumBazDengCoor = 1;
            let matrixZerostumBazDengCoor = math.zeros(rowstumBazDengCoor, columnstumBazDengCoor);
            for (i = 0; i < BazSayisi_t2 * 3; i++) {
                tumDengBazCoor = BaztumDengCoor[i];

                matrixZerostumBazDengCoor.subset(math.index(i, 0), tumDengBazCoor);
            }

            // mtrxtumBazDengCoor: Dengelenmiş Koordinat farklarından bulunan matris formatında ölçüler 1 sütun. *****
            mtrxtumBazDengCoor = matrixZerostumBazDengCoor;

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
            //matrix1bazNN = Baz noktaların ∆X, ∆Y, ∆Z formatında matris formunda 1 sütunda gösterilmesi *****
            matrix1tumbazNN_t2 = matrixZerostumbazNN;

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

            // ------------------- Karesel ortalama hata ve Bilinmeyenlerin ortalama hatası -------------------
            // ------------ Ağın Serbestlik Derecesi ------------
            n_tumiz = BazSayisi_t2 * 3; // Ölçülen baz sayıları.
            u_tumiz = NoktaSayisi_t2 * 3; // Koordinatı kesin bilinmeyen noktaların koordinatları.
            d_tumiz = 3; // Defekt sayısı.
            f_tumiz_t2 = n_tumiz - u_tumiz + d_tumiz; // Serbestlik derecesi. Eğer f>0 ise dengeleme vardır.
            // ------------

            mtrxtumSo_t2 = math.sqrt(math.divide((math.multiply(math.transpose(mtrx1tum_V), mtrx1P_t2, mtrx1tum_V)), f_tumiz_t2))
            tumSo_t2 = mtrxtumSo_t2.get([0, 0]); //Karesel Ortalama Hata.

            const rowstumUnknownPointsCof = NoktaSayisi_t2 * 3;
            const columnstumUnknownPointsCof = 1;
            let matrixZerostumUnknownPointsCof = math.zeros(rowstumUnknownPointsCof, columnstumUnknownPointsCof);
            for (i = 0; i < NoktaSayisi_t2 * 3; i++) {
                matrixZerostumUnknownPointsCof.subset(math.index(i, 0), math.sqrt(mtrx1tum_QX_t2.get([i, i]))); //Kofaktörlerin karekökünün alınmış hali
            }
            mtrx1tumUnknownPointsCof = matrixZerostumUnknownPointsCof;
            mtrx1tumUnknownPointsOrtHata = math.multiply(tumSo_t2, mtrx1tumUnknownPointsCof);

            //NN ve Bilinmeyenlerin ortalama hataları dikey olmak üzere 2 sütun. *****
            mtrx1tumKOH_ = math.concat(matrix1tumCoor_t2NN, mtrx1tumUnknownPointsOrtHata)

            const rowstumKOH = NoktaSayisi_t2;
            const columnstumKOH = 3;
            let matrixZerostumKOH = math.zeros(rowstumKOH, columnstumKOH);
            for (i = 0; i < NoktaSayisi_t2; i++) {

                matrixZerostumKOH.subset(math.index(i, 0), mtrx1tumKOH_.subset(math.index((3 * i), 1)));
                matrixZerostumKOH.subset(math.index(i, 1), mtrx1tumKOH_.subset(math.index(((3 * i) + 1), 1)));
                matrixZerostumKOH.subset(math.index(i, 2), mtrx1tumKOH_.subset(math.index(((3 * i) + 2), 1)));
            }
            // Bilinmeyenlerin ortalama hataları yatay olmak üzere 3 sütun. *****
            mtrx1tumKOH = matrixZerostumKOH;

            // ---------- Dengeli koordinatlar ve Ortalama hataları
            //NN ve Bilinmeyenlerin dengeli koordinatları ve ortalama hataları dikey olmak üzere 7 sütun. *****
            mtrx1t2tumDeng_KOH = math.concat(mtrx1tumDeng, mtrx1tumKOH)
            // ----------
            // -------------------



            /*
                        //2. Periyottaki Koordinatları 1. Periyottaki Koordinatlara Göre Eşleştirme
                        var fark2_1_a = [];
                        for (i = 0; i < NoktaSayisi_t2; i++) {
                            for (j = 0; j < NoktaSayisi_t2; j++) {
                                NNt2 = (mtrx1t2tumDeng_KOH.subset(math.index(j, 0))).toLowerCase()
                                NNt1 = (mtrx1t1tumDeng_KOH.subset(math.index(i, 0))).toLowerCase()
                                if (NNt2.includes(NNt1)) {
                                    fark2_1_a.push(mtrx1t2tumDeng_KOH.subset(math.index(j, 1)));
                                    fark2_1_a.push(mtrx1t2tumDeng_KOH.subset(math.index(j, 2)));
                                    fark2_1_a.push(mtrx1t2tumDeng_KOH.subset(math.index(j, 3)));
                                }
                            }
                        }
                        listDengCoor_t2 = fark2_1_a ;


                        data1 = math.multiply(1000, math.subtract(listDengCoor_t2, listDengCoor_t1));

                    var fark_t2_t1_X_a = [];
                    var fark_t2_t1_Y_a = [];
                    var fark_t2_t1_Z_a = [];
                    for (var i = 0; i < NoktaSayisi_t2 * 3; i += 3) {
                        fark_t2_t1_X_a.push(data1[i]);
                        fark_t2_t1_Y_a.push(data1[i+1]);
                        fark_t2_t1_Z_a.push(data1[i+2]);
                    }
                    fark_t2_t1_X = fark_t2_t1_X_a;
                    fark_t2_t1_Y = fark_t2_t1_Y_a;
                    fark_t2_t1_Z = fark_t2_t1_Z_a;
            */
            // ----------


            // ------------------- Dengeli koordinatların Coğrafi Koordinatları (from XYZ to φʎ) ------------------
            // ʎ boylamının hesabı (tüm noktalar)
            listboylam_tumiz_t2 = [];
            listboylam_tumiz_t3t2_t2_splice = [];
            for (var i = 0; i < NoktaSayisi_t2; i++) {
                var Xcoor = mtrx1t2tumDeng_KOH.subset(math.index(i, 1));
                var Ycoor = mtrx1t2tumDeng_KOH.subset(math.index(i, 2));

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

                var x = boylam(Xcoor, Ycoor);
                listboylam_tumiz_t2.push(x);
                listboylam_tumiz_t3t2_t2_splice.push(x);
                //document.getElementById("demo").innerHTML = x;
            }
            //

            // φ enleminin hesabı (tüm noktalar)
            listenlem_tumiz_t2 = [];
            listenlem_tumiz_t3t2_t2_splice = [];
            let listro = [];
            for (var j = 0; j < NoktaSayisi_t2; j++) {
                X = mtrx1t2tumDeng_KOH.subset(math.index(j, 1));
                Y = mtrx1t2tumDeng_KOH.subset(math.index(j, 2));
                Z = mtrx1t2tumDeng_KOH.subset(math.index(j, 3));

                //GRS80 elipsoidinin geometrik parametreleri
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

            // h elipsoit yüksekliğinin hesabı (tüm noktalar)
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

            // ------------------- Dengeli koordinatların Enlem ve Boylamlarının Sağa-Yukarı Değerleri (from φʎ to N,E,U) ------------------
            var selVal_DOM_t2 = CM_t2.options[CM_t2.selectedIndex].innerHTML
            DOM_t2 = parseInt(selVal_DOM_t2);

            Dogu_t2 = [];
            Kuzey_t2 = [];
            for (var i = 0; i < NoktaSayisi_t2; i++) {
                // Jeo2Duzlem(Enlem, Boylam, DOM) şeklinde fonksiyon parametreleri yazılır. Doğu ve Kuzey bulmak için "Easting" ve "Northing" değişkenleri çağrılır.
                Jeo2Duzlem(listenlem_tumiz_t2[i], listboylam_tumiz_t2[i], DOM_t2)

                Dogu_t2.push(Easting);
                Kuzey_t2.push(Northing);
            }
            // -------------------

            //Dengeli Koordinatların Enlem-Boylamı ve Sağa-Yukarı Değerleri (Matrix Formu)
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

            //NN ve Bilinmeyenlerin dengeli koordinatları, ortalama hataları, enlem-boylamları; sağa-yukarı değerleri olmak üzere 12 sütun. (Matrix Formu)
            mtrx_TumDeng_KOH_EnlemBoylam_t2 = math.concat(mtrx1t2tumDeng_KOH, matrixTumDeng_EnlemBoylam_t2, matrixTumDeng_DoguKuzey_t2)



            // ---------- Koordinat Farkı İçin Hesaplar
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



            // ------------------- Tüm Noktalar
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

            // -------------------------- Redündans Payları ---------------------------
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

            // -------------------------- İç ve Dış Güven Ölçütleri ---------------------------
            var DeltaSifir_1_t1 = 3.42;
            var DeltaSifir_2_t1 = 4.13;

            mtrxdiagQii = math.diag(mtrx1Qii)
            mtrxsqrtdiagQii = math.sqrt(mtrxdiagQii);
            mtrxSi_t1 = math.multiply(tumSo_t2, mtrxsqrtdiagQii); //***

            mtrxdrafta = math.multiply(DeltaSifir_2_t1, mtrxSi_t1);
            mtrxdiagri = math.diag(mtrx1ri);
            mtrxsqrtdiagri = math.sqrt(mtrxdiagri);
            //İç Güven Ölçütü
            const mtrxTersDelta0li_t1 = math.dotDivide(mtrxdrafta, mtrxsqrtdiagri);

            mtrxdraftb = math.subtract(1, mtrxdiagri);
            mtrxdraftc = math.dotDivide(mtrxdraftb, mtrxdiagri);
            mtrxdraftd = math.sqrt(mtrxdraftc)
            //Dış Güven Ölçütü
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
            //İç ve Dış Güven Ölçütleri 4 sütun
            const mtrxIcDisGuven_t2 = math.concat(matrix_IcGuven_t1, matrix_DisGuven_t1);
            var mtrxIcDisGuven_t2_baz_t2 = math.concat(matrix1tumbazNN_t2, mtrxIcDisGuven_t2);
            // --------------------------

            // -------------------------- Uyuşumsuz Ölçüler Testi ---------------------------
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

            //Pope Testi İçin Güven Sınırı
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

            // ------------------------ Tablolar------------------------
            // ------------------------ Tüm-İz Min. dengeleme sonuçlarından oluşan dengeli koordinatlar tablosu
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

            // ------------------------ Tüm-İz Min. dengeleme sonuçlarından oluşan dengeli ölçüler denetim tablosu
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

            // ---------------------- Redündans Payları Tablosu
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

            // ---------------------- İç ve Dış Güven Ölçütleri Tablosu
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

            // ---------------------- Uyuşumsuz ÖlçülerTablosu
            var mytable_UyusumsuzOlculer_t1 = document.getElementById('Table_Uyusumsuz_t2')
            var tblBody_UyusumsuzOlculer_t1 = document.createElement("tbody");

            var caption = document.createElement("caption");
            var captionText = document.createTextNode("Confidence Limit for POPE Test: " + GuvenSiniri + " and Total Probability of Error: 5%");
            //POPE Testi İçin Güven Sınırı: ve Toplam Yanilma Olasiligi: %5
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

            //swal("Adjustment process successfully performed.", "") ;
            Swal.fire({
                //title: 'Error!',
                text: 'Adjustment process successfully performed.',
                icon: 'success',
                confirmButtonText: 'Ok',
                //html: '<p style="font-size: 22px; padding-bottom: 0px;">Adjustment process successfully performed.</p> <br> <p style="font-size: 16px; cursor: pointer;" id="myU"><u>Checking adjusted measurements</u></p>'
            })




        });
        // --------------------------

        // -------------------------- Zorlamasız Klasik Dengeleme --------------------------

        $(".dropdown-select_t2").on("change", function () {
            document.getElementById("zorlamasizdeng_2").disabled = false;

            var selVal = $(this).val();
            var selVal_Name = selVal;

            var unknownPoints = bazNNunique_t2 // unknownPoints: seçilen nokta haricinde kalan ağ noktaları
            unknownPoints.splice(unknownPoints.indexOf(selVal), 1);

            NoktaSayisi_t2Bilinmeyen = unknownPoints.length;

            // ------------ Ağın Serbestlik Derecesi ------------
            n = BazSayisi_t2 * 3; // Ölçülen baz sayıları.
            u = NoktaSayisi_t2Bilinmeyen * 3; // Koordinatı kesin bilinmeyen noktaların koordinatları.
            f = n - u; // Serbestlik derecesi. Eğer f>0 ise dengeleme vardır.
            // ------------

            // ------------ "A" Katsayılar Matrisi (Zorlamasız Deng.) ------------
            const rows = BazSayisi_t2 * 3;
            const columns = NoktaSayisi_t2Bilinmeyen * 3; // "(Tüm nokta sayısı) - (1)" olacak şekilde sütun saysı oluşturulur.
            let matrixZeros = math.zeros(rows, columns);
            //console.log(matrixZeros);
            //console.log(unknownPoints) ;

            for (k = 0, l = 0; k < BazSayisi_t2 && l < (BazSayisi_t2 * 2); k++, l += 2) {
                if (bazNN[l] === selVal) {
                    continue;
                }
                i = unknownPoints.indexOf(bazNN[l]);

                matrixZeros.subset(math.index((3 * k), (3 * i)), -1);
                matrixZeros.subset(math.index(((3 * k) + 1), ((3 * i) + 1)), -1);
                matrixZeros.subset(math.index(((3 * k) + 2), ((3 * i) + 2)), -1);
            }

            for (k = 0, l = 1; k < BazSayisi_t2 && l < (BazSayisi_t2 * 2); k++, l += 2) {
                if (bazNN[l] === selVal) {
                    continue;
                }
                j = unknownPoints.indexOf(bazNN[l]);

                matrixZeros.subset(math.index((3 * k), (3 * j)), 1);
                matrixZeros.subset(math.index(((3 * k) + 1), ((3 * j) + 1)), 1);
                matrixZeros.subset(math.index(((3 * k) + 2), ((3 * j) + 2)), 1);
            }
            matrix1A = matrixZeros;
            //console.log(matrixA) ;
            // ------------

            // ------------ Bilinmeyen Noktalar ve Koordinatları (Zorlamasız Deng.) ------------
            var listUnkwnCoor = [];
            for (i = 0; i < Coor.length; i++) {
                if (Coor[i][0] === selVal) {
                    Coor[i].splice(0, Coor[i].length);
                } else {
                    listUnkwnCoor.push(Coor[i]);
                }
            }
            // UnkwnCoor = Bilinmeyen Noktalar ve Koordinatları *****;
            var UnkwnCoor = listUnkwnCoor;

            const rowsCoorNN = (UnkwnCoor.length);
            const columnsCoorNN = 1;
            let matrixZerosCoorNN = math.zeros(rowsCoorNN, columnsCoorNN);

            for (i = 0; i < NoktaSayisi_t2Bilinmeyen; i++) {

                NN = UnkwnCoor[i][0];

                matrixZerosCoorNN.subset(math.index((3 * i), 0), NN);
                matrixZerosCoorNN.subset(math.index(((3 * i) + 1), 0), NN);
                matrixZerosCoorNN.subset(math.index(((3 * i) + 2), 0), NN);
            }
            // matrix1CoorNN: Bilinmeyen noktaların adlarının matris formatında gösterilmesi *****
            matrix1CoorNN = matrixZerosCoorNN;


            const rowsCoor = (UnkwnCoor.length);
            const columnsCoor = 1;
            let matrixZerosCoor = math.zeros(rowsCoor, columnsCoor);

            for (i = 0; i < NoktaSayisi_t2Bilinmeyen; i++) {

                CoorX = UnkwnCoor[i][1];
                CoorY = UnkwnCoor[i][2];
                CoorZ = UnkwnCoor[i][3];

                matrixZerosCoor.subset(math.index((3 * i), 0), CoorX);
                matrixZerosCoor.subset(math.index(((3 * i) + 1), 0), CoorY);
                matrixZerosCoor.subset(math.index(((3 * i) + 2), 0), CoorZ);
            }
            // matrixCoor1: Bilinmeyen nokta koordinatlarının tek sütunda matris formatında gösterilmesi *****
            matrix1Coor = matrixZerosCoor;

            // ------------ Zorlamasız Klasik Dengeleme Formulleri ------------

            mtrx1P_t2 = math.inv(matrix1Qll_t2);

            mtrx1N = math.multiply(math.transpose(matrix1A), mtrx1P_t2, matrix1A);

            mtrx1n = math.multiply(math.transpose(matrix1A), mtrx1P_t2, matrix1l_t2);

            mtrx1QX = math.inv(mtrx1N);

            mtrx1x = math.multiply(mtrx1QX, mtrx1n);

            mtrx1V = math.subtract(math.multiply(matrix1A, mtrx1x), matrix1l_t2);

            // ---------- Noktaların Dengelenmesi
            // mtrxDeng1: Koordinatlar dikey olmak üzere 1 sütun dengelenmiş koordinatlar *****
            mtrxDeng1 = math.add(matrix1Coor, mtrx1x);

            /*math.format(mtrxDeng1, {
                                    notation: 'fixed',
                                    precision: 4
                                })
            */

            // mtrxDeng1_1: NN ve Koordinatlar dikey olmak üzere 2 sütun dengelenmiş koordinatlar *****
            mtrxDeng1_1 = math.concat(matrix1CoorNN, mtrxDeng1)

            const rowsdeng = NoktaSayisi_t2Bilinmeyen;
            const columnsdeng = 4;
            let matrixZerosCoordeng = math.zeros(rowsdeng, columnsdeng);

            for (i = 0; i < NoktaSayisi_t2Bilinmeyen; i++) {

                matrixZerosCoordeng.subset(math.index(i, 0), mtrxDeng1_1.subset(math.index((3 * i), 0)));
                matrixZerosCoordeng.subset(math.index(i, 1), mtrxDeng1_1.subset(math.index((3 * i), 1)));
                matrixZerosCoordeng.subset(math.index(i, 2), mtrxDeng1_1.subset(math.index(((3 * i) + 1), 1)));
                matrixZerosCoordeng.subset(math.index(i, 3), mtrxDeng1_1.subset(math.index(((3 * i) + 2), 1)));
            }
            // mtrx1Deng: NN dikey ve Koordinatlar yatay olmak üzere 4 sütun dengelenmiş koordinatlar *****
            mtrx1Deng = matrixZerosCoordeng;
            // ----------

            // ---------- Ölçülerin Dengelenmesi ve Denetimi
            // mtrxDengOlc1: Dengelenmiş Ölçüler 1 sütun. *****
            mtrxDengOlc1 = math.add(matrix1Coorbaz, mtrx1V);

            var selValCoor = [];
            for (k = 0; k < BazDent_Points_t2.length; k++) {
                if (BazDent_Points_t2[k][0] === selVal) {
                    selValCoor.push(BazDent_Points_t2[k][1]);
                    selValCoor.push(BazDent_Points_t2[k][2]);
                    selValCoor.push(BazDent_Points_t2[k][3]);
                }
            }
            var selVal = {
                X: selValCoor[0],
                Y: selValCoor[1],
                Z: selValCoor[2]
            };
            //$(this).val()
            mtrxSelval = math.matrix([
                        [$(this).val(), parseFloat(selVal.X)],
                        [$(this).val(), parseFloat(selVal.Y)],
                        [$(this).val(), parseFloat(selVal.Z)]
                    ])
            mtrxDengveSelVal = math.concat(mtrxDeng1_1, mtrxSelval, 0); //dengelenmiş bilinmeyen nokta koordinatları ve seçilen nokta koordinatları NN ve Koord. 2 sütun.

            const rowsdengSel = NoktaSayisi_t2;
            const columnsdengSel = 4;
            let matrixZerosCoordengSel = math.zeros(rowsdengSel, columnsdengSel);

            for (i = 0; i < NoktaSayisi_t2; i++) {
                matrixZerosCoordengSel.subset(math.index(i, 0), mtrxDengveSelVal.subset(math.index((3 * i), 0)));
                matrixZerosCoordengSel.subset(math.index(i, 1), mtrxDengveSelVal.subset(math.index((3 * i), 1)));
                matrixZerosCoordengSel.subset(math.index(i, 2), mtrxDengveSelVal.subset(math.index(((3 * i) + 1), 1)));
                matrixZerosCoordengSel.subset(math.index(i, 3), mtrxDengveSelVal.subset(math.index(((3 * i) + 2), 1)));
            }
            mtrx1Deng_Sel = matrixZerosCoordengSel;

            listREF = [];
            for (i = 0; i < BazSayisi_t2 * 2; i += 2) {
                for (j = 0; j < NoktaSayisi_t2; j++) {
                    if (mtrx1Deng_Sel.subset(math.index(j, 0)) === bazNN[i]) {
                        listREF.push(mtrx1Deng_Sel.subset(math.index(j, 1)));
                        listREF.push(mtrx1Deng_Sel.subset(math.index(j, 2)));
                        listREF.push(mtrx1Deng_Sel.subset(math.index(j, 3)));
                    }
                }
            }
            var BazREF = listREF // BazREF: bazlardaki ref noktasının dengelenmiş koordinatları.

            listRVR = [];
            for (i = 1; i < BazSayisi_t2 * 2; i += 2) {
                for (j = 0; j < NoktaSayisi_t2Bilinmeyen; j++) {
                    if (mtrx1Deng.subset(math.index(j, 0)) === bazNN[i]) {
                        listRVR.push(mtrx1Deng.subset(math.index(j, 1)));
                        listRVR.push(mtrx1Deng.subset(math.index(j, 2)));
                        listRVR.push(mtrx1Deng.subset(math.index(j, 3)));
                    }
                }
            }
            var BazRVR = listRVR // BazRVR: bazlardaki rover noktasının dengelenmiş koordinatları.

            // Dengelenmiş Koordinat farklarından bulunan ölçüler 1 sütun. *****
            BazDengCoor = math.subtract(BazRVR, BazREF);

            const rowsBazDengCoor = BazSayisi_t2 * 3;
            const columnsBazDengCoor = 1;
            let matrixZerosBazDengCoor = math.zeros(rowsBazDengCoor, columnsBazDengCoor);
            for (i = 0; i < BazSayisi_t2 * 3; i++) {
                DengBazCoor = BazDengCoor[i];

                matrixZerosBazDengCoor.subset(math.index(i, 0), DengBazCoor);
            }
            //mtrxBazDengCoor: Dengelenmiş Koordinat farklarından bulunan matris formatında ölçüler 1 sütun. *****
            mtrxBazDengCoor = matrixZerosBazDengCoor;


            const rowsbazNN = BazSayisi_t2 * 3;
            const columnsbazNN = 1;
            let matrixZerosbazNN = math.zeros(rowsbazNN, columnsbazNN);
            for (k = 0, i = 0, j = 1; k < BazSayisi_t2, i < BazSayisi_t2 * 2, j < BazSayisi_t2 * 2; k++, i += 2, j += 2) {

                ref = bazNN[i];
                rvr = bazNN[j];

                matrixZerosbazNN.subset(math.index((3 * k), 0), ref + " - " + rvr + " (∆X)");
                matrixZerosbazNN.subset(math.index(((3 * k) + 1), 0), ref + " - " + rvr + " (∆Y)");
                matrixZerosbazNN.subset(math.index(((3 * k) + 2), 0), ref + " - " + rvr + " (∆Z)");
            }
            //matrix1bazNN: Baz noktaların ∆X, ∆Y, ∆Z formatında matris formunda 1 sütunda gösterilmesi *****
            matrix1bazNN = matrixZerosbazNN;

            //mtrxDengOlcDent: Dengeli ölçülerin denetimi 4 sütun. *****
            mtrxDengOlcDent = math.concat(matrix1bazNN, mtrxDengOlc1, mtrxBazDengCoor, math.subtract(mtrxBazDengCoor, mtrxDengOlc1));
            // ----------

            // ---------- Karesel ortalama hata ve Bilinmeyenlerin ortalama hatası
            mtrxSo = math.sqrt(math.divide((math.multiply(math.transpose(mtrx1V), mtrx1P_t2, mtrx1V)), f))
            So = mtrxSo.get([0, 0]); //Karesel Ortalama Hata.


            const rowsUnknownPointsCof = NoktaSayisi_t2Bilinmeyen;
            const columnsUnknownPointsCof = 1;
            let matrixZerosUnknownPointsCof = math.zeros(rowsUnknownPointsCof, columnsUnknownPointsCof);
            for (i = 0; i < NoktaSayisi_t2Bilinmeyen * 3; i++) {
                matrixZerosUnknownPointsCof.subset(math.index(i, 0), math.sqrt(mtrx1QX.get([i, i])));
            }
            mtrx1UnknownPointsKokCof = matrixZerosUnknownPointsCof; //Kofaktörlerin karekökünün alınmış hali
            mtrx1UnknownPointsOrtHata = math.multiply(So, mtrx1UnknownPointsKokCof);

            // NN ve Bilinmeyenlerin ortalama hataları dikey olmak üzere 2 sütun. *****
            mtrx1KOH_ = math.concat(matrix1CoorNN, mtrx1UnknownPointsOrtHata)

            const rowsKOH = NoktaSayisi_t2Bilinmeyen;
            const columnsKOH = 3;
            let matrixZerosKOH = math.zeros(rowsKOH, columnsKOH);

            for (i = 0; i < NoktaSayisi_t2Bilinmeyen; i++) {

                matrixZerosKOH.subset(math.index(i, 0), mtrx1KOH_.subset(math.index((3 * i), 1)));
                matrixZerosKOH.subset(math.index(i, 1), mtrx1KOH_.subset(math.index(((3 * i) + 1), 1)));
                matrixZerosKOH.subset(math.index(i, 2), mtrx1KOH_.subset(math.index(((3 * i) + 2), 1)));
            }
            // Bilinmeyenlerin ortalama hataları yatay olmak üzere 3 sütun. *****
            mtrx1KOH = matrixZerosKOH;
            // ----------

            // ---------- Dengeli koordinatlar ve Ortalama hataları
            //NN ve Bilinmeyenlerin dengeli koordinatları ve ortalama hataları yatay olmak üzere 7 sütun. *****
            mtrx1Deng_KOH = math.concat(mtrx1Deng, mtrx1KOH)
            // ----------


            // ------------------- Dengeli koordinatların Coğrafi Koordinatları (from XYZ to φʎ) ------------------
            // ʎ boylamının hesabı (bilinen nokta hariç)
            listboylam = [];
            for (var i = 0; i < NoktaSayisi_t2Bilinmeyen; i++) {
                var Xcoor = mtrx1Deng_KOH.subset(math.index(i, 1));
                var Ycoor = mtrx1Deng_KOH.subset(math.index(i, 2));

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

                var x = boylam(Xcoor, Ycoor);
                listboylam.push(x);
                //document.getElementById("demo").innerHTML = x;
            }

            // φ enleminin hesabı (bilinen nokta hariç)
            listenlem = [];
            let listro = [];
            for (var j = 0; j < NoktaSayisi_t2Bilinmeyen; j++) {
                X = mtrx1Deng_KOH.subset(math.index(j, 1));
                Y = mtrx1Deng_KOH.subset(math.index(j, 2));
                Z = mtrx1Deng_KOH.subset(math.index(j, 3));

                //GRS80 elipsoidinin geometrik parametreleri
                var a = 6378137.0;
                var b = 6356752.3141;
                var e2 = (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(a, 2);

                enlem = [];
                φ = [];
                ρ = [];
                ro = [];
                φ[0] = 0;
                for (i = 0; i < Infinity; i++) {
                    ρ[i] = (a / math.sqrt(1 - (e2 * math.pow(math.sin(φ[i] * Math.PI / 180), 2))))
                    φ[i + 1] = math.atan((Z + (e2 * ρ[i] * math.sin(φ[i] * Math.PI / 180))) / math.sqrt(math.pow(X, 2) + math.pow(Y, 2))) * (180 / Math.PI);

                    if ((math.abs((φ[i + 1] - φ[i])) * 3600) <= 0.00001) {
                        listenlem.push((φ[i + 1])); //enlem = (φ[i + 1]); //enlem.push(φ[i + 1]);

                        ro = (a / math.sqrt(1 - (e2 * math.pow(math.sin(φ[i + 1] * Math.PI / 180), 2))));
                        listro.push(ro);
                        break;
                    }
                }
            }
            // -------------------

            $("#zorlamasizdeng_2").click(function () {
                //alert("I am an alert box!");
                //swal("Good job!", "You clicked the button!", "success")
                //swal("Adjustment process successfully performed.", "") ;
                Swal.fire({
                    //title: 'Error!',
                    text: 'Adjustment process successfully performed.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                document.getElementById("ExportDengControlID2").disabled = false;
                //map.removeLayer(layerGroup_tumiz);
                map.addLayer(layerGroup_kartezyen);


                // ------------------- Bilinmeyen Noktalar
                for (var i = 0; i < NoktaSayisi_t2Bilinmeyen; i++) {
                    nokta_adi = mtrx1Deng_KOH.subset(math.index(i, 0));
                    x_val = (mtrx1Deng_KOH.subset(math.index(i, 1))).toFixed(3);
                    y_val = (mtrx1Deng_KOH.subset(math.index(i, 2))).toFixed(3);
                    z_val = (mtrx1Deng_KOH.subset(math.index(i, 3))).toFixed(3);
                    mx_val = (mtrx1Deng_KOH.subset(math.index(i, 4)) * 1000).toFixed(3);
                    my_val = (mtrx1Deng_KOH.subset(math.index(i, 5)) * 1000).toFixed(3);
                    mz_val = (mtrx1Deng_KOH.subset(math.index(i, 6)) * 1000).toFixed(3);

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
                                    <td id='table_td_1'>X</td>\
                                    <td id='table_td_2'>" + x_val + "</td>\
                                    <td id='table_td_3'>mx</td>\
                                    <td id='table_td_4'>" + mx_val + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_5'>Y</td>\
                                    <td id='table_td_6'>" + y_val + "</td>\
                                    <td id='table_td_7'>my</td>\
                                    <td id='table_td_8'>" + my_val + "</td>\
                                  </tr>\
                                  <tr id='table_popup'>\
                                    <td id='table_td_9'>Z</td>\
                                    <td id='table_td_10'>" + z_val + "</td>\
                                    <td id='table_td_11'>mz</td>\
                                    <td id='table_td_12'>" + mz_val + "</td>\
                                  </tr>\
                                </table>"

                    marker_zorlamasiz = new L.marker([listenlem[i], listboylam[i]], {
                            icon: sari_nirengi
                        })
                        .bindPopup(template)
                    layerGroup_zorlamasiz.addLayer(marker_zorlamasiz).addTo(map);
                    layerGroup_t2.addLayer(marker_zorlamasiz);
                }
                map.setView(new L.LatLng((math.sum(listenlem) / listenlem.length), (math.sum(listboylam) / listboylam.length)), 8);
                // -------------------
            });

            // ------------------------ Zorlamasız dengeleme sonuçlarından oluşan dengeli koordinatlar tablosu
            var mytable = document.getElementById('TableB_2')
            var tblBody = document.createElement("tbody");

            // creating all cells
            for (var i = 0; i < NoktaSayisi_t2Bilinmeyen; i++) {
                // creates a table row
                var row = document.createElement("tr");

                for (var j = 0; j < 7; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(mtrx1Deng_KOH.subset(math.index(i, j)));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }

            mytable.appendChild(tblBody);
            // ------------------------

            // ------------------------ Zorlamasız dengeleme sonuçlarından oluşan dengeli ölçüler denetim tablosu
            var mytable = document.getElementById('TableC_2')
            var tblBody = document.createElement("tbody");

            // creating all cells
            for (var i = 0; i < BazSayisi_t2 * 3; i++) {
                // creates a table row
                var row = document.createElement("tr");

                for (var j = 0; j < 4; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(mtrxDengOlcDent.subset(math.index(i, j)));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }

            mytable.appendChild(tblBody);
            // ------------------------
        });
        // --------------------------

        // --------------------------------------------- Tablolar ---------------------------------------------
        // ------------------------ Referans noktaların koordinatlarından oluşan tablo
        var mytable = document.getElementById('TableA_2')
        var tblBody = document.createElement("tbody");

        // creating all cells
        for (var i = 0; i < NoktaSayisi_t2; i++) {
            // creates a table row
            var row = document.createElement("tr");
            for (var j = 0; j < 7; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
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
