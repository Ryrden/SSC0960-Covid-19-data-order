import * as fs from "fs";
import * as path from "path";
import {parse} from "csv-parse";

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
	confirmed: number;
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
	result.shift() //removing header result array
	let threeBiggerConfirmedOnList: CovidData[] = result
											.filter((a) => a.confirmed > 0 )
											.sort((a,b) =>  a.confirmed - b.confirmed)
											.slice(0,3);
	//console.log(threeBiggerConfirmedOnList) -> Não funciona corretamente, corrigir. (Erro: "a.confirmed" e "b.confirmed" retorna Undefinied)

	let sumOfDeaths = 0;
	result
		.sort((a,b) => a.active - b.active)
		.slice(0,10).sort((a,b) => b.confirmed - a.confirmed)
		.slice(0,5)
		.forEach((curr) => sumOfDeaths += curr.deaths)

	console.log(sumOfDeaths);


});
