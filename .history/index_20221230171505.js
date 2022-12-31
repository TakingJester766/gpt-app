// A express server, which will handle api requests come in and respond with a json object, it will use body parser as well as cors to handle the requests.
const config = require('./config.js');
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-Tp1wF8jaCJ2iV7r5alT4EQBX",
    apiKey: config.apiKey
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        A good deal of media coverage and commentary has argued that immigration needs to be increased because arrivals slowed during Covid-19 and immigrant workers are now “missing” from the labor market, creating a “shortfall” for the economy. But an analysis of the government data from November of this year shows that there are actually 1.9 million more legal and illegal immigrants working than before the pandemic. (Immigrants are also referred to as the “foreign-born” in government data.)
To the extent workers are “missing”, it is due to the dramatic decline in the labor force participation rate — the share working or looking for work — of the U.S.-born in recent decades as the immigrant population has grown. This decline deprives the economy of workers and contributes to a host of social problems. If the labor force participation rate returned to where it was as recently as 2000, there would be millions more U.S.-born workers in the labor force.
Among the findings:
•	In November 2022, there were 29.6 million immigrants (legal and illegal together) working in the United States — 1.9 million more than in November 2019, before the pandemic.
•	The 29.6 million immigrant workers in November of this year was one million above the long-term trend in the pre-Covid growth rate of immigrant workers — immigrant workers are not “missing”.
•	In contrast to immigrants, there were 2.1 million fewer U.S.-born Americans working in November 2022 than in November 2019, before the pandemic.
•	There has been a long-term decline in the labor force participation rate — the share of the working-age (16-64) working or looking for work — among U.S.-born Americans, primarily those without a bachelor’s degree. These individuals do not show up as unemployed because they have not looked for work in the last four weeks.
•	In November of this year, there were 44.9 million working-age U.S.-born Americans not in the labor force — nearly 10 million more than in 2000.
•	The U.S.-born working-age population has increased in size since 2000, but if their labor force participation rate was what it was in 2000, there would be 6.5 million more Americans in the labor force.
The overall foreign-born:
•	The overall legal and illegal immigrant or foreign-born population — both workers and non-workers — was 48.4 million in November of this year, a new record high in American history and 3.4 million more than in January 2021 when President Biden took office.
•	Our analysis of the monthly data in prior months indicates that about 60 percent or roughly two million of the 3.4 million increase in the overall immigrant population since January 2021 is due to illegal immigration.
•	Immigrants are now 14.7 percent of the total U.S. population, which matches their share in 1910, and is just slightly below the all-time high reached in 1890 of 14.8 percent.
•	The enormous number of immigrants already in the country matters because those calling for more immigration on behalf of employers seem unaware of the current scale of immigration and its impact on American society.
•	Adding even more people to the country has important implications for the nation’s schools, healthcare system, infrastructure, and environmental conservation goals. Perhaps most important, there is the question of whether the county can assimilate a record number of i mmigrants.
Introduction
Reflecting in part media coverage of the tight labor market, and resulting pressure from employers in their districts and states, a number of Democratic and Republican politicians have argued that America needs to allow in more immigrant workers. This argument is often made based on the idea that because immigration slowed significantly during Covid-19, admissions now need to be accelerated to provide employers with more workers. The slowdown has recently been described as, “two years of lost immigration”. But as we will see in this analysis, the overall number of immigrant workers (legal and illegal together) is now a good deal larger than before the pandemic. Moreover, pressure to bring in more immigrants ignores the enormous number of U.S.-born Americans on the economic sidelines who could be brought into the labor force.
Equally important, the immigrant share of the U.S. population is already just below the all-time high reached 132 years ago in 1890. Those calling for more immigration have to at least acknowledge this fact and address the issues this situation creates for everything from America’s schools to its health system, to say nothing of the challenges associated with assimilating an unprecedented number of immigrants.
We use the public-use data from the Current Population Survey (CPS) collected by the Census Bureau for the Bureau of Labor Statistics (BLS) each month. The survey is of the non-institutionalized, so it does not include inmates. Both the Census Bureau and the Bureau of Labor Statistics are clear that illegal immigrants are included in the data. We rely on the CPS because it is really the only source of information that reflects the recent dramatic increase in immigration caused by the ongoing border crisis and the restarting of visa processing overseas in 2021. Like other researchers, we often use the larger American Community Survey (ACS) to study the foreign-born. However, the 2021 ACS reflects the population in July 2021 and the 2022 ACS will not be released for another year. So the ACS does not capture the rapidly evolving immigration situation. Throughout this report, we use the terms “immigrant” and “foreign-born” interchangeably; this includes all those who were not U.S. citizens at birth, such as naturalized citizens, permanent residents, long-term visitors (e.g. guestworkers and foreign students), and illegal immigrants.1
The Growth in Immigrant Workers
Number of Immigrant Workers. Figure 1 reports the total number of foreign-born workers in November of each year since 2000 based on the CPS.2 The BLS reports figures on the employment of the foreign-born in Table A-7 each month. Results from the public-use data are only trivially different from what is reported in Table A-7. We follow the BLS’s example and report seasonally unadjusted figures, but by looking at the same month each year the data is essentially seasonally adjusted. Figure 1 shows 29.6 million immigrants employed in November 2022, 1.9 million more than in November 2019 before Covid-19. On its face, this is a clear indication that the number of immigrants working has not only returned to pre-pandemic levels, it now significantly exceeds it.
Long-Term Trend. Figure 1 includes a trend line from 2000 to 2019, carried forward to 2022. The 29.6 million immigrant workers in November 2022 are one million above the long-term trend in the growth of foreign-born workers assuming the pre-Covid 19 rate. It should be noted that our trend line goes back to November 2000 and ends in November 2019, before the pandemic.3 Below, we will look at research that uses a trend line that begins in 2010 instead of 2000.
Figure 2 shows the same information as Figure 1, but starting in 2010. The 2010 to 2019 trend line shows that by November 2022 the number of immigrant workers was slightly below (320,000) the trend line. Of course, it is not clear how relevant trend lines are. Immigration is a discretionary policy of the federal government. The American people acting through their elected representatives determine the level of legal immigration and the level of resources devoted to controlling illegal immigration. The long-term increases in immigrant workers was certainly not inevitable, but rather reflected decisions taken by the federal government. If a different set of policies had been pursued, then the trends would have looked quite different.
        
        ${message}`,
        max_tokens: 500,
        temperature: 0,
    });
    console.log(response.data);
    if (response.data.choices[0].text) {
        res.json({
            message: response.data.choices[0].text
        });
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

