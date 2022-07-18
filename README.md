# SSC0960 - Programação Funcional

## Trabalho 2

Implementação em Java (usando stream) ou Javascript/Typescript (usando node para rodar
em linha de comando). Pode-se utilizar uma biblioteca para leitura do CSV.

Baixe um CSV do seguinte link:
<https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports>

Faça UM programa nas linguagens indicadas, sem a utilização de loops, apenas funções,
que recebe por linha de comando o nome de um arquivo CSV, e imprima as seguintes
informações:

1. Os três países com os maiores valores de "Confirmed".Os nomes devem estar em ordem alfabética.
2. Dentre os dez países com maiores valores de "Active",a soma dos "Deaths" dos cinco países com menores valres de "Confirmed".
3. O maior valor de "Deaths" entre os países do hemisfériosul.
4. O maior valor de "Deaths" entre os países do hemisférionorte.
5. A soma de "Active" de todos os países em que "Confirmed"é maior o igual que 1.000.000.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente do [`NodeJs`](https://nodejs.org/en/download/)
- Você instalou todas as depedências com o comando

  ```
  npm install 
  ```

## 🚀 Usando o Programa

Para usar Programa, siga estas etapas:

Faça download de algum csv pelo seguinte link: [CovidData](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports)

```
npm run app <nomeDoCSV>
```

### **Exemplo**

Por exemplo, o CSV do dia 1 de janeiro de 2021 é:
<https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/01-01-2021.csv>

ele foi salvo em um arquivo chamado ```01-01-2021.csv```
logo, o proximo passo é usar o comando:

```
npm run app 01-01-2021.csv
```

a saida do programa foi:

```
Q1- France,Turkey,United Kingdom
Q2- 41902
Q3- 46775
Q4- 64731
Q5- 5528620
```
