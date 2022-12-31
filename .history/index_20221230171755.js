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
•	There has been a long-term decline in the labor force participation rate — the share of the working-age (16-64) working or looking for work — among U.S.-born Americans, primarily those without a bachelors degree. These individuals do not show up as unemployed because they have not looked for work in the last four weeks.
•	In November of this year, there were 44.9 million working-age U.S.-born Americans not in the labor force — nearly 10 million more than in 2000.
•	The U.S.-born working-age population has increased in size since 2000, but if their labor force participation rate was what it was in 2000, there would be 6.5 million more Americans in the labor force.
The overall foreign-born:
•	The overall legal and illegal immigrant or foreign-born population — both workers and non-workers — was 48.4 million in November of this year, a new record high in American history and 3.4 million more than in January 2021 when President Biden took office.
•	Our analysis of the monthly data in prior months indicates that about 60 percent or roughly two million of the 3.4 million increase in the overall immigrant population since January 2021 is due to illegal immigration.
•	Immigrants are now 14.7 percent of the total U.S. population, which matches their share in 1910, and is just slightly below the all-time high reached in 1890 of 14.8 percent.
•	The enormous number of immigrants already in the country matters because those calling for more immigration on behalf of employers seem unaware of the current scale of immigration and its impact on American society.
•	Adding even more people to the country has important implications for the nations schools, healthcare system, infrastructure, and environmental conservation goals. Perhaps most important, there is the question of whether the county can assimilate a record number of i mmigrants.
Introduction
Reflecting in part media coverage of the tight labor market, and resulting pressure from employers in their districts and states, a number of Democratic and Republican politicians have argued that America needs to allow in more immigrant workers. This argument is often made based on the idea that because immigration slowed significantly during Covid-19, admissions now need to be accelerated to provide employers with more workers. The slowdown has recently been described as, “two years of lost immigration”. But as we will see in this analysis, the overall number of immigrant workers (legal and illegal together) is now a good deal larger than before the pandemic. Moreover, pressure to bring in more immigrants ignores the enormous number of U.S.-born Americans on the economic sidelines who could be brought into the labor force.
Equally important, the immigrant share of the U.S. population is already just below the all-time high reached 132 years ago in 1890. Those calling for more immigration have to at least acknowledge this fact and address the issues this situation creates for everything from Americas schools to its health system, to say nothing of the challenges associated with assimilating an unprecedented number of immigrants.
We use the public-use data from the Current Population Survey (CPS) collected by the Census Bureau for the Bureau of Labor Statistics (BLS) each month. The survey is of the non-institutionalized, so it does not include inmates. Both the Census Bureau and the Bureau of Labor Statistics are clear that illegal immigrants are included in the data. We rely on the CPS because it is really the only source of information that reflects the recent dramatic increase in immigration caused by the ongoing border crisis and the restarting of visa processing overseas in 2021. Like other researchers, we often use the larger American Community Survey (ACS) to study the foreign-born. However, the 2021 ACS reflects the population in July 2021 and the 2022 ACS will not be released for another year. So the ACS does not capture the rapidly evolving immigration situation. Throughout this report, we use the terms “immigrant” and “foreign-born” interchangeably; this includes all those who were not U.S. citizens at birth, such as naturalized citizens, permanent residents, long-term visitors (e.g. guestworkers and foreign students), and illegal immigrants.1
The Growth in Immigrant Workers
Number of Immigrant Workers. Figure 1 reports the total number of foreign-born workers in November of each year since 2000 based on the CPS.2 The BLS reports figures on the employment of the foreign-born in Table A-7 each month. Results from the public-use data are only trivially different from what is reported in Table A-7. We follow the BLSs example and report seasonally unadjusted figures, but by looking at the same month each year the data is essentially seasonally adjusted. Figure 1 shows 29.6 million immigrants employed in November 2022, 1.9 million more than in November 2019 before Covid-19. On its face, this is a clear indication that the number of immigrants working has not only returned to pre-pandemic levels, it now significantly exceeds it. Missing Immigrant Workers? Despite the evidence presented above, the idea that immigration is down or below pre-Covid levels has gained a lot of traction in the media. The Economist, CBS News, NPR, the New York Times, and many other outlets have reported that there are not enough workers due to a decline in immigration during Covid-19. A lot of the coverage cites an article from January 2022 published in EconoFact, which uses the CPS. The authors, Giovanni Peri and Reem Zaiour, argue that because the pace of increase in the number of working-age immigrants, defined as ages 18 to 65, was slower though December 2021 than between 2010 and 2019, there are two million “missing” immigrant workers. An update of their analysis in Bloomberg News through June 2022 finds the “gap” in immigrant workers is still 1.7 million. There are a number of issues with this analysis.
Long-Term Growth in Immigrant Workers. As reported in Figure 1 the actual number of immigrants working by November of this year was 1.9 million above the number in November 2019, and one million above the long-term trend from November 2000 to November 2019. Figure 2 shows that if we use the years 2010 to 2019 to create the trend line, then by November 2022 the number of immigrants is just slightly below the trend. If we compare the total number of immigrants working in June 2019 (27.6 million) before the pandemic to June 2022 (28.4 million) — the last month of Peri and Zaiours updated analysis — we still find 820,000 more immigrants working than in 2019. However, it is true that the June 2022 number is one million below the trend from June 2010 to June 2019 projected forward. This is not trivial, but it is quite a bit less than the 1.7 million Peri and Zaiour report.
Furthermore, if we take a longer view and create a trend line from June 2000 to June 2019 and project it, it shows 28.48 million immigrant workers in June 2022, which is basically identical to the 28.43 million actual immigrant workers in June 2022. So it very much depends on what starting date is used to create a trend line. But most important, by November of this year, the number of immigrant workers significantly exceeded the pre-Covid 2000 to 2019 trend line. If November 2010 to 2019 is used to create a trend line, then the number of workers in November 2022 is slightly below trend. So, even if one thinks the whole idea of projecting prior trends forward makes sense, it is still not really possible to argue that the number of immigrant workers is now significantly below the trend line.
Workers vs. the Working Age. As already mentioned, Peri and Zaiour are not looking at workers, but instead immigrants who are of working age, defined as 18 to 65. A little over one quarter, or eight to nine million immigrants ages 18 to 65, are typically not working at any one time, as they are unemployed or out of the labor force entirely. It is unclear why Peri and his coauthor do not look at actual workers.4 Their decision to look at the working-age and not workers means that they also underestimate the impact of immigration on the supply of labor because the labor force participation of immigrants is somewhat higher now than before Covid. In the appendix of this report, we discuss our unsuccessful attempt to match their findings. Whatever the reason they chose to look at the working-age, their approach is part of the reason they show much larger numbers of “missing workers” than if actual workers are used. In our view, comparing the same month year-over-year and looking at the number of actual workers makes the most sense.
Other Issues. Peri and Zaiours central assumption is that the working-age immigrant population must grow at the same pace as in the past, otherwise it will create a worker “shortage”. For one thing, an ever-growing immigrant population requires an endlessly increasing number of new arrivals to offset the rise in deaths and emigration that comes as the immigrant population increases in size. Equally important, as already mentioned, the discretionary nature of immigration means there is no reason immigration has to be maintained at any level. Finally, it is puzzling that Peri and Zaiour, who are very concerned about a lack of workers, never mention the long-term and well-documented decline in labor force participation among the U.S.-born. Moreover, a host of EEOC cases, and other research, including by the U.S. Civil Rights Commission, indicates that immigrants sometimes displace U.S.-born workers. However, none of this comes up in their analysis.
The Decline in Work Among the U.S.-Born
Labor Force Participation. Economists typically refer to the share of working-age people who are working or looking for work as the “labor force participation rate”. While there is some fluctuation with the economy, in general the participation rate of working-age, U.S.-born men has fallen since the 1960s. This decline has been studied by numerous researchers for quite some time, including the Obama White House and the Federal Reserve. For women, labor force participation generally increased until about 2000, but has fallen some since then. The decline for men and women is mainly among those without a bachelors degree, though it has also impacted teenagers. In contrast, the labor force participation rate of the foreign-born has not declined in the same way. Of the 54 million working-age people (ages 16 to 64) not in the labor force in November 2022, more than eight out of 10 were U.S.-born.
It should be noted that the BLS includes what it calls the “the labor force participation rate” in its monthly Employment Situation Report. But that statistic is for the entire population 16 and older, including those 65 and older, only a modest fraction of whom work. This definition of labor force participation is heavily impacted by the slow, steady aging of American society. It is not really a measure of the share of potential workers who are actually working or looking for work. For the remainder of this report, we look at labor force participation of working-age people, defined in different ways, but all of which exclude those 65 and older.
Decline in Participation of U.S.-Born Americans. Figure 3 reports the labor force participation rate for the U.S.-born with different levels of education and ages. The black line in the middle of the figure shows the decline among the entire U.S.-born working-age (16-64) population, both men and women. While there certainly has been recovery since the depths of the Covid recession, the rates have not returned to pre-Covid levels, to say nothing of the rate in 2006 before the Great Recession or the peak in 2000 for any of the groups in Figure 3. Moreover, while the labor force participation of the young — ages 16 to 24 — has certainly declined, Figure 3 makes clear that the falloff is by no means confined to youths.5

Economists often look at “prime-age” men aged 25 to 54 because men traditionally have higher rates of work, especially in this age group. The rate for these men, shown in purple, has declined since 2000. The decline is particularly pronounced for prime-age, U.S.-born men without a bachelors degree, shown in blue. This fall in labor force participation goes back to the 1960s, though we cannot use the CPS to distinguish the U.S.-born and foreign-born before 1994. The labor force participation of prime-age, less-educated women, shown in orange, has also declined, though not as much as it has for men.
“Missing” U.S.-Born Workers. Figure 4 shows the total number of U.S.-born Americans 16 to 64 and the number in this age group in the labor force. If the labor force participation rate of the U.S.-born had remained at the same level as it was in 2000, there would be 6.5 million more people in the labor force in November 2022. If the rate was what it was in 2006, before the Great Recession, then 3.7 million more would be in the labor force, and even if it was the same as 2019 then one million more U.S.-born, working-age Americans would be in the labor force. To the extent workers are “missing”, it seems fair to say it is due to this dramatic decline in the participation rate of working-age, U.S.-born Americans, rather than a falloff in immigrant workers.6 To be clear, not all or even most of the 44.9 million U.S.-born Americans not in the labor force should be working or wish to do so. Some are taking care of young children or elderly relatives, others are legitimately disabled, still others are in school, and some are independently wealthy. But the fact remains that all of these things were true in the past, and yet a much higher percentage were in the labor force as recently as 2000.
Whats Causing the Decline in Participation. The reasons offered for why fewer of the U.S.-born that are of working age are in the labor force are as varied as the proposed solutions. Some researchers emphasize overly generous and easily accessed disability and welfare systems. Others emphasize the large share of less-educated men with criminal records, while others argue that structural changes in the economy, particularly declining wages for the non-college educated are the primary reason for the decline. As already mentioned, competition with immigrants likely explains some of the falloff in labor force participation.
The reason for the decline in labor force participation goes beyond the scope of this analysis, but there are two things we can say about this situation. First, the decline is extremely troubling because it is associated with many social problems, from crime and opioid addiction to mental health issues and obesity. Second, high levels of immigration — legal and illegal — reduce political pressure from employers and society in general to address this decline. To be sure, a big part of the reason the problem has not been addressed is that doing so would require a sustained effort across a broad range of policy areas. But it seems certain that the country is much less likely to undertake this difficult task if employers continue to be given access to millions of eager immigrant workers.
The Overall Foreign-Born Population
A New Record Number. Figure 5 reports the total number of foreign-born residents in the United States from May 2019 to November 2022. This includes legal and illegal immigrants of all ages as well as workers and non-workers. The November 2022 CPS showed that the total immigrant or foreign-born population was 48.4 million, a new record high in American history and 3.4 million more than in January 2019, when President Biden took office. What is so striking about the recent run-up in the number of immigrants is that the growth represents the net change in their numbers. For the foreign-born population to grow so much, significantly more than 3.4 million new immigrants had to arrive to offset emigration, which we previously estimated at about one million annually, and deaths among the existing foreign-born population of about 300,000 each year.7 Births to immigrants in the United States, by definition, can only add to the native-born population.8
A Rapid Increase in the Numbers. Despite a strong economy before Covid-19 affected the country in March 2020, Figure 5 shows the that foreign-born population had already declined some in the latter part of 2019. Once travel restrictions were imposed and Title 42 expulsions began at the border, the immigrant population declined through the middle of 2020, hitting a low of 43.8 million in August and September of that year. The foreign-born population has rebounded by 4.6 million since late summer 2020, though some of the increase immediately after the summer of 2020 may be due to better data collection as the pandemic abated rather than an actual increase in the immigrant population. That said, the BLS does state that it has confidence in the quality of the data even at the height of Covid-19 in 2020.9
The Biden Administration. The 3.4 million increase in the last 23 months can be seen as unprecedented. As Figure 5 shows, the big upturn in growth in the foreign-born numbers seems to have begun the month president Biden won office. Table 1 shows immigrants by region in January 2021 and November 2022. Immigration from Latin American countries other than Mexico, which actually declined a little, accounted for 71 percent of the growth in the foreign-born population since January 2021.10 South America accounts for 29 percent of the increase, Central America 23 percent, and the Caribbean 18 percent. As discussed in our prior analysis, the substantial increase in immigrants from the Western Hemisphere is an indication that illegal immigration has played a very large role in the growth of the foreign-born population since the beginning of 2021.
Longer-Term Growth in the Foreign-Born Population. Figure 6 shows the size of the foreign-born population from the start of President Obams first term in January 2009 to November of this year. While the monthly CPS is a very large survey of about 130,000 individuals, the total foreign-born population in the data still has a margin of error of about ±500,000 using a 90 percent confidence level. The shaded areas in Figure 6 show the margin of error around the point estimate for each month since 2009. The margin of error means there is fluctuation from month to month in the size of this population, making it necessary to compare longer periods of time when trying to determine trends based on this data.11 Since January 2009, the foreign-born population has grown by 11.3 million. Figure 6 also shows that the average monthly increase in the foreign-born population was much faster during Obamas and Bidens presidencies relative to the first three years of Trumps (January 2017 to February 2020), before the arrival of Covid-19.12

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

