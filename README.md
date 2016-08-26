# Final Project - Recipe-Sharing Site

### description
This website will allow users to share recipes with others by uploading new recipes with instructions and ingredients listed, viewing existing recipes, and keeping a list of favorite recipes.

### MVP
- login/signup
  - the user will be able to log in with an existing account or create a new one. Authentication is only required for favoriting recipes and uploading new ones
- create a new recipe (ingredients, and instructions)
  - a logged in user will have a navigation option to add a recipe. This will involve adding ingredients and adding instructions as steps
- list of all recipes
  - each will be displayed with the recipe name, keywords, and description
- view individual recipe
  - user can see the list of ingredients as bullet points and the instructions as a paragraph
- favorite recipes
  - the user can keep track of favorited (recommended) recipes, visible on their profile
- user profile shows user's recipes

#### serverside data
- users
- recipes
- favorites join table

#### later features
- recipes show how many times it has been favorited
- when adding recipe, user will also choose from several keywords, such as "breakfast" or "quick"
- filter recipes by keywords
- checklist of steps when "trying" a recipe
- when creating a new recipe, should be able to mark an ingredient as optional. Will be reflected when a user views list of ingredients
- allow user to upload photo for the recipe when creating new one
- when adding favorite, user can write comment and upload their own photo






## Development Process
- at the moment (mid day, 8/15), I have created most of the routes and finished with user authentication. I have run into a couple of issues. The first is that I want to be able to fetch the recipes collection without having to log in, since not every user of this app needs an account. I have also run into the issue of the recipes pages clashing. I have a route '/recipes' and '/recipes/:id'. The former shows a list of recipes, while the latter is the details of a specific one. I don't want to be using this.props.children in the first component, I just want that info to disappear, while being able to access an 'id' parameter. I will try un-nesting the ':id' route.

- the fix for the recipes/:id route worked! They are not on separate pages

- I am back at it, currently working on creating a VERY simple set of inputs for creating a new recipe. I will then test it out to create a few recipes and look in Kinvey to verify that it has my (jdlee93) username and id stored, as I will be the user creating it.

- The model should be set up, with everything being set in the initialize function aside from the number of times favorited, which always starts at 0 (default). In the new recipe page, the create function will take care of passing this information into a new Recipe model that it will save on the recipe collection. To simulate adding steps and having them update on the page before finally submitting info, I will use the page's state to keep track of how many ingredients and steps to display. Adding a new step/ingredient should therefore re-render the page with the added step/ingredient listed

- Input acts as intended, with the list of ingredients and steps adding without refreshing the page. Now, to use this to create a new piece of data on the recipe collection. First, I will have to fetch the collection when I go to the home page, but only when signed in? **This will be a block to mention on 8/16** I want to see the collection even without signing in. I also had a good suggestion, which is to add a delete button to any ingredient or step. Not an issue, will just remove that item from its array in this.state

- Success! The data is now added to the Kinvey collection, with all the proper values. I checked the collection's contents by going back to the home page, where it fetches each time, and the new model is there. I will add a couple more as filler.

- 8/16, I am going to create an anonymous user that automatically logs in. This will allow me to fetch recipes and user data whenever I run the program, rather than only after logging in with my own username. Once I have implemented this, I will add a fetch call for recipes on the home page, and it should be authorized.

- Anonymous user has been created, and when going to the recipe page, if there is no user logged in, it will use the anonymous one. Data is fetched correctly, and I now have to display it somehow.

- Ran into an issue earlier with creating a new user. It may have been passing the id of the anonymous user as the id of a new on upon signing up, so in the signup function, I cleared the session, which solved the issue. I will now add new users to the user collection when they create their account, so their favorites and recipes can be tracked later

- A question to ask on 8/17: Would it make sense to use the backbone method "where" to get an array of models matching a specified attribute, for example, all the recipes with a creator id matching the user's id?

- Got recipes to work, they show up on a user's profile. The solution, suggested by Jess, was to fetch recipes using a query that checks if `_acl.creator` matches the profile page's `this.props.params.id` meaning the recipe was created by the user whose profile you are viewing. Although my project still lacks styling whatsoever, it works as a functional site. I will add styling, and of course, a lot more functionality! Confidence is back up a little after fixing last night's block

- I am working on allowing the user to upload an image when creating a new recipe. I am using the Kinvey File API, and it is mostly working. I will have to use GET requests to test it, but I am successfully POSTing.

- As of 8/21, my block is uploading images to Google Cloud using Kinvey's File API.
- Today, I will tackle the "like" and "bookmark" functionality. A user will not be able to unlike, but WILL be able to un-bookmark. Bookmarked recipes will be shown on a user's profile, liked ones will not.

- like and bookmark functionality is in place and should be working. I had issues with overwriting the collection and not being able to remove models, but that has been resolved. I am now working on adding an "edit" functionality to recipe pages of which the current user is the creator. This involves an edit button, which toggles a state property "editing" to true. When this is true, most content will be re-rendered as input, with values already set, but able to be edited. The user will be able to toggle "editing" back to false either through a "cancel" button or by "saving changes", which updates the data on the recipe model before toggling and thus, re-rendering without inputs.

- instead of changing the contents of the page, I will use a similar set up as the "new recipe page", but it will save instead of create, and will use an existing recipe.

- I have created a separate "made" collection which keeps track of userIds and recipeIds. This way, I can reliably keep track of the number of times a recipe has been made. I can also modify this by adding a new "made" model whenever a user completes the step-by-step walkthrough. By doing a query for how many of these "made"s have a matching recipeId, I can get the number and show it on the RecipeHome component. Before, I had the number stored on the recipe itself, but it could not be modified by other users.

- As of 8/24, I am working on the step-by-step modal, which I am calling the Cookit modal. At this very moment, it only has a list of ingredients on the first page, along with a navigation arrow. Each page, at a minimum, will have navigation arrows (useful for revisiting previous steps), a button to close the modal, and some content. The content of the first page is a list of ingredients, which the user will confirm they have by marking as complete.

#### Giving credit where credit is due
- Icons downloaded from thenounproject.com
  - pot by Francielly Costantin Senra
  - Sign Up by Charlene Chen
  - Login by Bluetip Design
  - Log Out by Bluetip Design
  - Home by David
  - User by To Uyen
  - add camera by arejoenah
  - add to list by Nikolay Necheuhin
  - Heart by Alexander Bickov
  - Delete by Huu Nguyen
  - bookmark by Julynn B.
  - Kitchen Timer by joe pictos
  - Place Setting by Creative Stall
  - Pencil by vijay sekhar
  - Serving Dish by misirlou
  - Arrow by Tahsin Tahil
  - Close by Vicons Design
  - Tick Circle by Hea Poh Lin
  - Circle by Leinad Lehmko
  - Arrow by Tahsin Tahil

- Other
  - Shannon Riester for help with File Reader









*******************************************************
