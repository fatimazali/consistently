
# consistent.ly

![consistently cover slide](https://user-images.githubusercontent.com/43034257/110910937-dbefe680-82c6-11eb-9ed0-ee7f9036446b.png)

# video presentation 

https://youtu.be/kZaJH84g96c 

# video demo: annie's week of workouts with consistent.ly

https://youtu.be/CBWAOBvz6Ds 

# sedentary lifestyles during the covid-19 pandemic

Many people don’t have much time to consistently workout while juggling commitments like schoolwork, jobs, and social activities. Especially during this global pandemic, most of us are staying home and sitting at our desks for a majority of the day. Having a good balance of strength and cardio exercises while including fun and diversified workout plans will promote overall health and increase energy throughout the day. 

Many of us also struggle to diversify our fitness plans and are intimidated by introducing ourselves to new activities. We’re hoping to integrate a variety of activity kinds to keep our workout recommendations fresh and to help students stay consistent in their new workout routines. 

# our solution

Current fitness apps such as Apple Health and Google Fit are utilized to track activity progress, and wearable devices like Apple and FitBit watches are used to monitor heart rate and record health-related metrics such as the number of steps users take per day and heart rate. However, users still have to rely on the recommendation features of systems like Youtube in order to discover new types of workout suggestions that can help diversify their fitness routine. Moreover, Apple Health and Google Fit do not recommend new activities for the user based on their personal activity type preferences or suggest best workouts that fit into the durations suitable for the user’s ever-changing schedule. 

# our project approach

We plan to build a system which recommends new fitness activities based on the user’s currently recorded activity history preferences with strength and cardio exercises, activity levels for the day, and personal exercise preferences. We will utilize several data sources to build a personal model as well as contextual information. 

From the user’s Apple Watch or iPhone, through a Workouts Exporter app into a CSV file, we will record all fitness activities that were completed. This file is then exported to a JSON format for use within our React Native app. The user’s input Google Form contains fields to build our personal model(age, height, weight, experience level, activities tried before, new activities preferred to try, specified fitness goals, weekly workout frequency). We will keep the user motivated to exercise by displaying weekly metrics, consisting of calorie goals, number of workouts logged, and strength/cardio balance. We also show statistics on their past workout activity habits and trends. 

Our algorithms will use the CHI 2018 compendium and CDC recommendations and guidelines for a healthy balance of strengthening and cardio activities, along with the user’s recorded activities for the current week and activity preferences, to provide workout recommendations and to help users diversify the kinds of activities in their weekly workouts. We used React Native Paper and Expo Client to develop our iOS app. 

Personal Model Data Sources: 
- Initial user survey on account creation (user profile and preferences)
- Daily check-in form that is filled out on the app
- Activity data based on Apple Health on Apple Watch and iPhone

Context Data Sources: 
- Weather information based on weather.com API
- Activity information from CHI 2018 compendium
- Location from smartphone GPS 


The application will feature a search function on our activities database. The top four recommended activities for the day are presented on the Your Picks page. The recommendation is based on the user’s past five days of workout activities, the ratio of cardio versus strength exercises, the desired intensity and focus of the workout. We use a pre-filtering strategy to eliminate implausible activities based on the weather and time data we retrieve for the user’s location. For example, on rainy days or if it is late at night, no outdoor activities are recommended. The feature vector of each activity includes {intensity, area target, cardio, strength, outdoors, caloric expenditure}. A post-filter is then applied based on the equipment the user has access to that day.
