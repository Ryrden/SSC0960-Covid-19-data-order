import * as fs from "fs";
import * as path from "path";
import {parse} from "csv-parse";
import { CovidData } from "./covidData";

/* 
1- Os três países com os maiores valores de "Confirmed". Os nomes devem estar em ordem alfabética.
2- Dentre os dez países com maiores valores de "Active", a soma dos "Deaths" dos cinco países com menores valres de "Confirmed".
3- O maior valor de "Deaths" entre os países do hemisfério sul.
4- O maior valor de "Deaths" entre os países do hemisfério norte.
5- A soma de "Active" de todos os países em que "Confirmed" é maior ou igual que 1.000.000.
*/

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
											.sort((a,b) =>  b.Confirmed - a.Confirmed)
											.slice(0,3)

	let sumOfDeaths: Number = result
				.sort((a,b) => a.Active - b.Active)
				.slice(0,10).sort((a,b) => b.Confirmed - a.Confirmed)
				.slice(0,5)
				.reduce((acc,curr) => +acc + +curr.Deaths,0)

	let HigherSouthHemisphereDeaths = result.filter((data) => data.Lat < 0).sort((a,b) => b.Deaths - a.Deaths).slice(0,1);
	
	let HigherNorthHemisphereDeaths = result.filter((data) => data.Lat > 0).sort((a,b) => b.Deaths - a.Deaths).slice(0,1);
	
	let ActiveSumWhereConfirmedCountrysIsBiggerThan1000000: number = result.reduce((acc,curr) => {
		if (curr.Confirmed >= 1_000_000)
		return +acc + +curr.Active
		return +acc;
	},0)
	
	
	
	console.log("1-",threeBiggerConfirmedOnList)
	console.log("2-",sumOfDeaths);
	console.log("3-",HigherSouthHemisphereDeaths)
	console.log("4-",HigherNorthHemisphereDeaths)
	console.log("5-",ActiveSumWhereConfirmedCountrysIsBiggerThan1000000)

	/*
	let sumOfDeaths = 0;
	let tenBiggerActiveOnList : CovidData[] = result.sort((a,b) => b.Active - a.Active).slice(0,10);
	/*
		.sort((a,b) => b.Confirmed - a.Confirmed)
		.slice(0,5)
		.forEach((curr) => sumOfDeaths += curr.Deaths)
		


	//console.log("\n\n\n");
	//console.log(tenBiggerActiveOnList);

	let fiveSmallestConfirmedBetweenTenBiggerActivate : CovidData[] = tenBiggerActiveOnList
	.sort((a,b) => a.Confirmed - b.Confirmed)
	.slice(0,5);
	//.forEach((curr) => sumOfDeaths += curr.Deaths);

	console.log("\n\n\n");
	console.log(fiveSmallestConfirmedBetweenTenBiggerActivate);

	//console.log(sumOfDeaths);   ---> Aqui falta fazer o forEach funcionar, mas já está filtrado apropriadamente
	*/
});
