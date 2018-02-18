var abWorkouts = ["Do 100 Crunches!", "Plank for one minute.", "Do 30 Russian Twists", "Do 50 Oblique Side Crunches, 25 each side.", "Do 50 Toe Touches!"];
var cardioWorkouts = ["Go for a 2 mile run!", "Climb 75 flights of stairs", "Cycle for 30 minutes.", "Do Zumba for 6 songs!", "Do 45 Jumping Jacks"];
var upperWorkouts = ["10 Bicep Curls each arm", "30 Overhead dumbell presses", "Do 10 Pull ups", "Do 25 kettle bell rows", "DROP AND GIVE ME 15 Push Ups!!!"];
var lowerWorkouts = ["Do 30 deadlifts of 60 lbs", "Do 100 Weighted Squats", "Do 30 Lunges", "Do 30 fire-hydrants each side!", "Do 25 Leg Presses"];
var motivations = [
  "fitness is 20% exercise and 80% nutrition",
  "you can’t control everything in life, but you can control what you put in your body",
  "small progress is still progress",
  "eating healthy is not a diet, its a lifestyle",
  "what you eat in private you wear in public",
  "this month’s diet is next month’s body",
  "you are stronger than you think",
  "success doesn’t come from what you do occasionally. it comes from what you do consistently",
  "eat better not less",
  "stop letting food be the boss of you",
  "a moment on the lips is a lifetime on the hips",
  "fall in love with taking care of your body",
  "its never too early or too late to work towards being the healthiest you",
  "get 8 hours of sleep every night!",
  "you dont have to go fast, you just have to go",
  "3 months from now, you will thank yourself",
  "if you were able to believe in santa claus for around 8 years, you can believe in yourself for at least 5 min"];
var facts=[
  "Eating fruits and vegetables may help the human body make its own aspirin", 
  "A 60-minute nap can improve alertness",
  "Using a food diary can double a persons weight-loss efforts",
  "Added sugar provides empty calories and is believed to be a leading cause of diseases that kill millions of people each year.",
  "The best diet for YOU is the one you get results with and that you can stick to in the long term.",
  "Trans Fats are chemically processed fats that cause all sorts of damage in the body. You should avoid them like the plague.",
  "Vegetables are rich in all sorts of nutrients. Eating vegetables each day is associated with improved health and a lower risk of disease.",
  "Vitamin D is a crucial hormone in the body and many people are deficient in it. Reversing a deficiency can have powerful health benefits.",
  "Refined carbohydrates like processed grains are unhealthy. They are lacking in nutrients and lead to rapid spikes in blood sugar and insulin, which can cause all sorts of problems down the line.",
  "It is much more important to eat real, nutritious foods than to count on supplements to provide the nutrients you need.",
  "Adopting a healthy lifestyle is the only way to ensure long term weight loss and a lifetime of improved health.",
  "Unprocessed food is healthiest."];
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

    // if (event.session.application.applicationId !== "") {
    //     context.fail("Invalid Application ID");
    //  }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback);
    
}


/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;
    if (intentName == "cardioIntent")
    {
        handleCardioWorkoutResponse(intent, session, callback);
    }
    else if (intentName == "upperIntent")
    {
        handleUpperWorkoutResponse(intent, session, callback);
    }
    else if (intentName == "lowerIntent")
    {
        handleLowerWorkoutResponse(intent, session, callback);
    }
    else if (intentName == "absIntent")
    {
        handleAbsWorkoutResponse(intent, session, callback);
    }
    else if (intentName == "motivationIntent")
    {
        handleMotivationResponse(intent, session, callback);
    }
    else if (intentName == "factIntent")
    {
        handleFactResponse(intent, session, callback);
    }
    else if (intentName == "workoutIntent")
    {
        handleWorkoutResponse(intent, session, callback)
    }
    else if (intentName == "AMAZON.YesIntent")
    {
        handleYesResponse(intent, session, callback);
    }
    else if (intentName == "AMAZON.NoIntent")
    {
        handleNoResponse(intent, session,callback)
    }
    else if (intentName == "AMAZON.HelpIntent")
    {
        handleGetHelpRequest(intent, session, callback)
    }
    else if (intentName == "AMAZON.StopIntent")
    {
        handleFinishSessionRequest(intent, session, callback)
    }
    else if (intentName == "AMAZON.CancelIntent")
    {
        handleFinishSessionRequest(intent, session, callback)
    }
    else
    {
        throw "Invalid Intent"
    }
  
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Welcome to the health coach skill. Do you want a workout idea for cardio, abs, upper or lower body? Or motivation or a health fact?."
    
    var reprompt = "What kind of work out do you want to do?"
    
    var header = "Health Coach"
    
    var shouldEndSession = false
    
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        }
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession))
}
function handleCardioWorkoutResponse(intent, session, callback)
{
    var randomIndex = Math.floor(Math.random()*4);
    var speechOutput =  cardioWorkouts[randomIndex];
    var reprompt = "Do you want another workout workout, motivation, or a fact?";
    var header = "cardio";
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        };
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession));
}

function handleLowerWorkoutResponse(intent, session, callback)
{
    var randomIndex = Math.floor(Math.random()*4);
    var speechOutput =  lowerWorkouts[randomIndex];
    var reprompt = "Do you want another workout workout, motivation, or a fact?"
    var header = "lower"
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        };
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession));
}

function handleUpperWorkoutResponse(intent, session, callback)
{
    var randomIndex = Math.floor(Math.random()*4);
    var speechOutput =  upperWorkouts[randomIndex];
    var reprompt = "Do you want another workout workout, motivation, or a fact?"
    var header = "Upper"
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        };
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession));
}

function handleWorkoutResponse(intent, session, callback)
{
    var speechOutput =  "You can chose to do a cardio, upper body, lower body, or ab workout!"
    var reprompt = "Do you want another workout workout, motivation, or a fact?"
    var header = "abs"
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        };
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession));
}


function handleAbsWorkoutResponse(intent, session, callback)
{
    var randomIndex = Math.floor(Math.random()*4);
    var speechOutput =  abWorkouts[randomIndex];
    var reprompt = "Do you want another workout workout, motivation, or a fact?"
    var header = "abs"
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        };
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession));
}

function handleMotivationResponse(intent, session, callback)
{
    var randomIndex = Math.floor(Math.random()*16);
    var speechOutput =  motivations[randomIndex];
    var reprompt = "Do you want another workout workout, motivation, or a fact?"
    var header = "motivation"
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        };
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession));
}

function handleFactResponse(intent, session, callback)
{
    var randomIndex = Math.floor(Math.random()*11);
    var speechOutput =  facts[randomIndex];
    var reprompt = "Do you want another workout workout, motivation, or a fact?"
    var header = "motivation"
    let sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
        };
    var shouldEndSession = false;
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput , reprompt, shouldEndSession));
}

function handleYesResponse(intent, session, callback)
{
    var speechOutput = "Great! What workout?"
    var repromptText = speechOutput
    var shouldEndSession = false
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleNoResponse(intent, session, callback)
{
    handleFinishSessionRequest(intent, session, callback)
}
function handleGetHelpRequest(intent, session, callback) {
    var speechOutput = "I can give you a workout idea for cardio, abs, upper or lower body. Or ask for motivation or a health fact."
    var reprompt = speechOutput
    let sessionAttributes = {
    "speechOutput" : speechOutput,
    "repromptText" : reprompt
    };
    var shouldEndSession = false
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, reprompt, shouldEndSession))
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) 
{
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    }
};

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
