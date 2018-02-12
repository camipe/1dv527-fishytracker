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

## Report questions

* Coming soon.