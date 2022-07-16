import * as fs from "fs";
import * as path from "path";
import {parse} from "csv-parse";
import { CovidData } from "./covidData";

/* 
1- Os três países com os maiores valores de "Confirmed". Os nomes devem estar em ordem alfabética.
2- Dentre os dez países com maiores valores de "Active", a soma dos "Deaths" dos cinco países com menores valres de "Confirmed".
3- O maior valor de "Deaths" entre os países do hemisfério sul.
4- O maior valor de "Deaths" entre os países do hemisfério norte.
5- A soma de "Active" de todos os países em que "Confirmed" é maior o igual que 1.000.000.
*/

type CovidData = {
	FIPS: string;
	Admin2: string;
	provinceState: string;
	countryRegion: string;
	lastUpdate: string;
	lat: string;
	long: string;
	Confirmed: number;
	deaths: number;
	recovered: number;
	active: number;
	combinedKey: string;
	incidenceRate: string;
	casefatalityRate: string;
};
//FIPS,Admin2,Province_State,Country_Region,Last_Update,Lat,
//Long_,Confirmed,Deaths,Recovered,Active,Combined_Key,Incident_Rate,Case_Fatality_Ratio
const csvFilePath = path.resolve(__dirname, "./01-01-2021.csv");

const headers = [
	"FIPS",
	"Admin2",
	"Province_State",
	"Country_Region",
	"Last_Update",
	"Lat",
	"Long_",
	"Confirmed",
	"Deaths",
	"Recovered",
	"Active",
	"Combined_Key",
	"Incident_Rate",
	"Case_Fatality_Ratio",
];

const fileContent = fs.readFileSync(csvFilePath, {encoding: "utf-8"});

parse(fileContent, {delimiter: ",", columns: headers}, (error, result: CovidData[]) => {
	
	if (error) {
		console.error(error);
	}

	result.shift() //removing header from the result array

	//ordena em ordem decrescente (parametro 'Country_Region' já em ordem alfabética). 
	let threeBiggerConfirmedOnList: CovidData[] = result
											.filter((a) => a.Confirmed > 0 )
											.sort((a,b) =>  b.Confirmed - a.Confirmed)
											.slice(0,3);
	console.log(threeBiggerConfirmedOnList);

	let sumOfDeaths = 0;
	result
		.sort((a,b) => a.active - b.active)
		.slice(0,10).sort((a,b) => b.Confirmed - a.Confirmed)
		.slice(0,5)
		.forEach((curr) => sumOfDeaths += curr.Deaths)

	//console.log(sumOfDeaths);


});