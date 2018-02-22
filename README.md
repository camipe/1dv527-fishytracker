# FishyTracker

## Background
The fishing club "Den svartmunnade smörbultens banne" needs an API for collection fishing reports and wants your help. They are thinking of building a client application but want a separated web API before taking this process along. The idea is that fishermen should be able to report their catch and that this data could be made public. They want data like:

* The user which catches the fish
* The position (longitude and latitude) of the catch
* Specie of the fish
* Weight
* Length
* Image-url
* Timestamp
* Other information: like equipment, fishing method and so on
* A text describing the catch

To do un-safe HTTP calls the API must have some kind of Authentication/Authorization. A user should be able to sign in through the API in a safe way. You are free to choose your authentication strategy.

Of course you are free to implement further feature in your web API.

## Requirements

* The API should be a web API meaning working through HTTP and/or HTTPS.
* The API should only support representations with application/json
* The API should follow the constraints for Restful APIs
* The API should embrace the idea of HATEOAS as good as possible.
* The API should be self-descriptive and easy to browse/explore
* The API should support CRUD operations where all data in the system should be available through API calls.
* Unsafe HTTP methods and data about users in the system should require some kind of authentication done through the API (you are free to choose implementation method for this).
* The API should give some ability to register a web hook which will trigger on some, of you chosen, event.
* In your examination repository you should provide a POSTMAN collection. The examiner should be able to load this into the POSTMAN application or a NEWMAN CLI and test your API without any further configuration. For more information about POSTMAN and NEWMAN se this article: https://scotch.io/tutorials/write-api-tests-with-postman-and-newman
* No visual UI is needed - We want just an API.
* We recommend writing your API in Node.js, if you choose another platform provide a configured virtual machine (vagrant or docker) or publish your API on a public URL (recommended in all cases!)
* The code should be published in your examination repository along with a report (see below)
* The code should be individual created, the examiners may run a code anti-plagiarism tool on your code. Plagiarism will be reported.
* Make a seed-file that automatically populated your application with some data for testing

## Testing
Important information:
1. Import the Fishytracker.postman_collection.json in Postman
2. Run the numbered request, login, get users and get fishes. This sets up variables used in the other requests.

To test Create Hook I used https://webhook.site for quickly making sure my server posts to the urls saved in hooks.

## Report

# Report
## Introduction
*Author:* Micael Persson
*Course:* 1DV527 - The web as an application platform

I did not have any ideas of my own so I picked the provided one. It’s a simple ”fish tracker” where user can record their catches with position, type of fish and more.
They can also subscribe to a web hook which posts all new fishes as they gets created.

## Questions 
1. How have you implemented the idea of HATEOAS in your API? Motivate your choices and how it support the idea of HATEOAS.
 *Answer:*
I chose to add a field for links to the objects, linking to the itself and related objects to get some simple hyperlinking and navigation between them.  The user object links to a collection of the fishes related to it and the fish object has links to the user who uploaded it. 
I think in an API with more models you could build some interesting and intuitive representations with this kind if thinking (HATEOAS) but since I only have two, I had trouble coming up with other ways without making the object seem unnecessarily cluttered.

2. If your solution should implement multiple representations of the resources. How would you do it?
*Answer:*
I don’t think my solution supports that scenario very well. Currently I have made my own toJSON-function to represent the objects in the API, so it basically supports one representation. 
A solution I had in mind is to create something like a formatter object which can have different functions for different representation and move the logic to create an object representation there. It could then be used to change the format/representation depending on which routes is called.

3. Motivate and defend your authentication solution? Why did you choose the one you did? Pros/Cons.
*Answer:* 
I chose to use a combination of local users and JWTs for two reasons mostly.
* I had used passport-local in Wes Bos’ course ”Learn Node”, which I did a while back so I hade some experience.
* I did not want to use any third party services and have to learn their API etc.

I’m not 100% sure that I have implemented JWT correctly but I’m starting to wrap my head around it and it seems to work. I like that I can have different service issuing the tokens if I wanted to but they can still be verified by my server and should therefore be secure (can’t be faked without knowing signing secret).

4. Explain how your web hook works.
 *Answer:* 
I have made a really simple web hook route where you can register an url where all new fishes will be posted. I just loop over all hooks in the database and post to each one. In a production environment this would be a bad idea as it is, since it’s basically a DDOS machine where you can enter targets. In a real life I would probably implement some kind of limit per account to minimize that risk.

5. Since this is your first own web API there are probably things you would solve in an other way looking back at this assignment. Write your thoughts down.
*Answer:* 
As I mentioned in my second answer, I would move the logic of JSON-formatting to a separate class instead of the toJSON-function. Makes it much easier to create different formats.

Improve the web hook.

I think I followed REST pretty well in my routes, working with HTTP-methods and collections (the talk by Stormpath CTO was great) but I think could handle my status codes better, I haven’t really had time to think about but feels like there is much room for improvement there. 

I might also think about let a third party handle users.

Another thing I would improve is to make the fishes get mapped the user adding them automatically, currently all fishes are hardcoded to the admin user when they are created.

6. Did you do something extra besides the fundamental requirements? Explain them.
*Answer:* Don’t think I added anything outside the fundamental requirements.

