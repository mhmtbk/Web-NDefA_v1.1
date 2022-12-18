# Web-NDefA: Web-'N'etwork 'Def'ormation 'A'nalysis
The Web-NDefA is a web-based open-source platform developed for the determination of deformations in univariate geodetic networks, which are periodically monitored with GNSS observations, with static model and S-Transformation matrix method for easy access to GNSS-based deformation analysis studies. Through this platform, it is possible to detect crustal and landslides movements, determine ground collapses and identify deformations in engineering structures.<br/><br/>
It was created with *HTML, CSS, and Client Side JavaScript*. JavaScript, one of the core technologies of web development, is a flexible and powerful programming language. Since the basic functions of the Web-NDefA platform are built with JavaScript, the enhancement and manipulation of web pages and client browsers is provided.<br/><br/>
This platform can also be accessed at [webndefa.com](https://www.webndefa.com/).

## Usage of the Web-NDefA Platform
Access to the functions of the Web NDefA platform is via the interface shown below.<br/>
<br/>![interface](https://github.com/mhmtbk/Web-NDefA/blob/main/images/Interface.jpg)<br/>
<br/>The left fixed sidebar consists of four sections, as the geodetic deformation network is measured periodically at different epochs. In order to properly interpret the results of the deformation analysis, at least 3 epochs should be observed. Therefore, the first three sections are the panel where the user uploads the baseline solution files acquired at different epochs to the platform, performs the free-network adjustment process and sets the reliability criteria.
The second main part is the area where the base maps created with the Leaflet libraries are displayed. The third main part has three sections. In the first section is where different maps type can be set as base maps (Satellite, Hybrid, Topographic, OpenStreetMap). In the second and third sections, respectively, Turkey’s boundary, province boundary, district boundary, and tectonic plates of Earth’s crust, as well as fault lines, can be added to the map. These data are in GeoJSON format and have been processed with the Leaflet libraries. Source codes are accessed from the "geojson" folder in the "src" folder.

### Upload Baseline Solution File
For the Web-NDefA Application to work, the baseline solution files of a GNSS-based geodetic network must be uploaded to the platform in .asc or .txt format. To perform the deformation analysis process, the platform processes and analyses baseline solution files. Baseline solution data is containing numerical expressions: approximate coordinates for stations, differences in X, Y, and Z coordinates (∆X, ∆Y, ∆Z), posterior value (m0), GNSS baseline cofactor matrix information. An example baseline solution file is shown in the figure below. Moreover the template baseline solution file can be downloaded from the platform or template folder.<br/>
<br/>![interface](https://github.com/mhmtbk/Web-NDefA/blob/main/images/BaselineSolutionF%C4%B0le_Sample.png)
<br/> The file to be uploaded to the platform is user-defined and the keywords and information in the file are given below.
-	@+ Individual baseline information (Reference point of baseline and its coordinates).
-	@- Baseline vector components (∆X, ∆Y, ∆Z).
-	@= Variance-covariance information for baseline vector.
-	REF: Reference point and coordinates.
-	MEAN: Rover point and coordinates.

The source codes for manipulating the baseline solution files are available in the files named "session1_script.js, session2_script.js, session3_script.js" in the src folder.

### Free-Network Adjustment
After the baseline solution files are uploaded to the platform, the step of adjustment the measurements with the free-network adjustment method is started. GPS-surveying measurements in epochs must be adjusted for Static deformation analysis. After the adjustment process, the reliability of the measures is tested with the analysis of reliability criteria. Coordinate information of the points in Geocentric ECEF(Earth-centered, Earth-fixed) (X, Y, Z) and geodetic (latitude, longitude, h) coordinate systems and the results of adjustment can be exported in Excel format. The source codes of free-network adjustment and reliability criteria functions are available in the files named "session1_script.js, session2_script.js, session3_script.js" in the src folder.

### Deformation Analysis
In the last section, the Web-NDefA platform statistically determines whether the points in the network are stable or unstable by using the coordinate differences of the network points obtained at the end of two periods and their cofactor matrices. To determine whether there is movement at the conjugate points, the global test is applied first. According to statistical tests, if it is calculated that there is movement in all or a part of the network, localization is performed with the S-transformation matrix method. Thus fixed datum points are found with 95% probability. Whether the movements of the remaining deformation points are significant or not is calculated with these datum points. After this step, the topocentric and TM/UTM coordinate differences of the deformation points in the compared epochs are calculated and these differences can be displayed by clicking the points on the map, and can also be exported in. In addition, the displacement vectors of the points and their error ellipses can be drawn on the map in a scaled form in order to make a visual inspection of the deformation rates. The source codes of the functions of static deformation analysis, coordinate differences and displacement vectors are available in the files named "significant_point_test_t2t1.js, significant_point_test_t3t1.js, significant_point_test_t3t2.js" in the src folder. In addition, the source codes developed for all functions to work properly are in the src folder.<br/>

For a sample deformation analysis application, GNSS observations for the periods 05 October 2016 (GPS Day 279 and filename: 2016_2) and 01 October 2019 (GPS Day 274 and file name: 2019_2) in the "BaselineSolutionFiles" folder can be used. GNSS observations are daily data of 13 stations acquiring from national and international Continuously Working Reference Networks (IGS, CORS-TR and ISKI-CORS) on the Gulf of Izmit and its vicinity on the North Anatolian Fault.






